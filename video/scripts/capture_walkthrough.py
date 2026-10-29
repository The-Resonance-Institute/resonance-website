"""Captures the walkthrough: drives the VERUS demonstration through the owner's view, then a plant manager's day,
and keeps a 1920 by 1080 screenshot per step, with the box on screen that matters, in public/walk (with shots.json).

The order (2026-10-28, on the operator's word): owner first, as the site and the white paper are. Run the
demonstration first, in replay mode so nothing is spent (in the VERUS repository: VERUS_DEMO_LLM_MODE=replay make
demo), then from this folder: uv run --with playwright --with pymupdf python scripts/capture_walkthrough.py

The "Right now" screen needs a day still running, which the demonstration's fixed date is not. It is captured on its
own, with the demonstration's date set to a day its HB03 spike was running and the all-day scrap agent run on it:
    uv run --with playwright python scripts/capture_walkthrough.py right-now
and the main run then takes it from public/walk/right-now.json. It expects the VERUS repository beside this one, and
reads the demonstration's sign-ins from it at run time.
"""
import json
import shutil
import subprocess
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

VIDEO = Path(__file__).resolve().parents[1]
VERUS = VIDEO.parents[1] / "verus"  # the VERUS repository, beside this one


def logins() -> dict[str, str]:
    out = subprocess.run(
        ["docker", "compose", "-p", "verus-demo", "-f", "docker-compose.yml", "-f", "docker-compose.demo.yml",
         "exec", "-T", "api", "cat", "/data/demo_logins"],
        cwd=VERUS, capture_output=True, text=True, check=True,
    ).stdout
    return {p[0]: p[1] for p in (line.split() for line in out.splitlines()) if len(p) >= 2 and "@" in p[0]}


BASE = "http://localhost:8088"
OUT = VIDEO / "public" / "walk"
OUT.mkdir(parents=True, exist_ok=True)
# the logo cut from its ground, for the walkthrough's opening and closing cards
shutil.copyfile(VERUS / "frontend" / "public" / "verus-logo-full.png", VIDEO / "public" / "verus-logo-full.png")
shutil.copyfile(VERUS / "frontend" / "public" / "icon-192.png", VIDEO / "public" / "verus-icon.png")  # the phone's banner
SCALE = 1.2  # 1600 by 900 CSS pixels drawn at 1920 by 1080
L = logins()
shots: list[dict] = []


def card_of(loc):
    return loc.locator("xpath=ancestor::section[contains(@class,'shadow-sm')][1]")


def shot(pg, name, caption, target=None, at_foot=False):
    box = None
    if target is not None and at_foot:  # a card at the page's foot: settled just above the window's bottom edge
        pg.evaluate("document.body.style.paddingBottom = '60px'")
        target.evaluate("el => el.scrollIntoView({block: 'end'})")
        pg.wait_for_timeout(500)
    elif target is not None:
        target.evaluate("el => el.scrollIntoView({block: 'start'})")  # the part that matters near the top
        pg.evaluate("window.scrollBy(0, -150)")
    if target is not None:
        pg.wait_for_timeout(500)
        b = target.bounding_box()
        if b:
            x0, y0 = max(0, b["x"]), max(0, b["y"])
            x1, y1 = min(1600, b["x"] + b["width"]), min(900, b["y"] + b["height"])
            box = [round(v * SCALE) for v in (x0, y0, x1 - x0, y1 - y0)]
    pg.mouse.move(1, 899)  # out of the way: no chart tooltip left showing
    pg.wait_for_timeout(300)
    pg.screenshot(path=str(OUT / f"{name}.png"))
    shots.append({"file": f"walk/{name}.png", "caption": caption, "box": box})
    print(name, box)


def shot_as_is(pg, name, caption, parts):
    """A screenshot where it stands (VERUS has already scrolled it), boxed round several parts at once."""
    pg.mouse.move(1, 899)
    pg.wait_for_timeout(300)
    boxes = [b for b in (part.bounding_box() for part in parts) if b]
    box = None
    if boxes:
        x0, y0 = max(0, min(b["x"] for b in boxes)), max(0, min(b["y"] for b in boxes))
        x1 = min(1600, max(b["x"] + b["width"] for b in boxes))
        y1 = min(900, max(b["y"] + b["height"] for b in boxes))
        box = [round(v * SCALE) for v in (x0, y0, x1 - x0, y1 - y0)]
    pg.screenshot(path=str(OUT / f"{name}.png"))
    shots.append({"file": f"walk/{name}.png", "caption": caption, "box": box})
    print(name, box)


def sign_in(ctx, who):
    pg = ctx.new_page()
    pg.goto(BASE + "/", wait_until="networkidle")
    pg.get_by_label("Email").fill(who)
    pg.get_by_label("Password").fill(L[who])
    pg.get_by_role("button", name="Sign in").click()
    pg.wait_for_url("**/feed")
    pg.wait_for_load_state("networkidle")
    # VERUS offers a walk the first time each screen is opened; the walkthrough asks for one only where it wants it
    pg.evaluate("""async () => {
        const me = await (await fetch('/api/auth/me')).json();
        for (const s of ['/feed','/dashboards','/ask','/agents','/documents','/market','/briefs','/saved','/metrics',
                         '/business','/business/first-hundred-days'])
            localStorage.setItem(`verus.guide.walked.${me.id}.${s}`, '1');
    }""")
    pg.reload(wait_until="networkidle")
    pg.wait_for_timeout(1500)
    return pg


def open_level(pg, rung, wait_for):
    pg.goto(f"{BASE}/business?rung={rung}", wait_until="networkidle")
    pg.get_by_text(wait_for, exact=False).first.wait_for(timeout=180000)
    pg.wait_for_load_state("networkidle")
    pg.wait_for_timeout(2500)


def board_pack_screen(pg, name, caption):
    """A page of the real board pack (the owner's export, made as the owner), set on a 1920 by 1080 screen."""
    import fitz  # pymupdf

    r = pg.request.post(f"{BASE}/api/exports/board-pack?format=pdf",
                        headers={"x-csrf-token": next(c["value"] for c in pg.context.cookies() if c["name"] == "verus_csrf")})
    assert r.ok, r.status
    pack = fitz.open(stream=r.body(), filetype="pdf")
    page = next(p for p in pack if "Brightwater Castings" in p.get_text() and "P&L from the ledger" in p.get_text())
    pix = page.get_pixmap(dpi=200)
    from PIL import Image

    img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    img = img.crop((0, 0, img.width, int(img.width * 0.62)))  # the month and the P&L, top of the page
    img.thumbnail((1700, 1000))
    canvas = Image.new("RGB", (1920, 1080), (236, 239, 244))
    x, y = (1920 - img.width) // 2, (1080 - img.height) // 2
    canvas.paste(img, (x, y))
    canvas.save(OUT / f"{name}.png")
    shots.append({"file": f"walk/{name}.png", "caption": caption, "box": [x, y, img.width, img.height]})
    print(name, "board pack page", img.size)


def right_now(b):
    """Only with the demonstration's date on a day HB03 was running high, and the all-day agent run on it."""
    ctx = b.new_context(viewport={"width": 1600, "height": 900}, device_scale_factor=SCALE)
    pg = sign_in(ctx, "pm-hb@demo.test")
    tab = pg.get_by_role("button", name="All in my access")
    if tab.count():
        tab.first.click()
        pg.wait_for_load_state("networkidle")
        pg.wait_for_timeout(1500)
    card = card_of(pg.locator("main h2", has_text="already running high today").first)
    shot(pg, "10-right-now", "During the shift: HB03's scrap already far past its normal, flagged while the shift "
         "can still act.", card)
    (OUT / "right-now.json").write_text(json.dumps(shots[-1], indent=1), encoding="utf-8")


with sync_playwright() as p:
    b = p.chromium.launch(channel="chrome", headless=True)
    if sys.argv[1:] == ["right-now"]:
        right_now(b)
        b.close()
        sys.exit(0)

    ctx = b.new_context(viewport={"width": 1600, "height": 900}, device_scale_factor=SCALE)
    pg = ctx.new_page()
    pg.goto(BASE + "/", wait_until="networkidle")
    pg.wait_for_timeout(800)
    shot(pg, "01-sign-in", "VERUS runs inside your network, and it only reads.")
    pg.close()

    # the owner
    po = sign_in(ctx, "owner@demo.test")
    open_level(po, "portfolio", "Brightwater")
    shot(po, "02-portfolio", "Every company side by side, on one set of definitions, each in its own currency.")
    open_level(po, "group:C3:West", "Operating profit")
    shot(po, "03-region-pnl", "The West region's P&L, plant by plant: Phoenix lost $17,923 in August.",
         card_of(po.locator("main h2", has_text="P&L").first), at_foot=True)
    open_level(po, "plant:C3:AZ1", "Reported, and from the systems")
    shot(po, "04-reported", "What Phoenix reported, beside what its systems say, seen by everyone at once.",
         card_of(po.locator("main h2", has_text="Reported, and from the systems").first), at_foot=True)
    po.goto(f"{BASE}/business/first-hundred-days?rung=company:C3", wait_until="networkidle")
    po.get_by_text("Customers shipped to", exact=False).first.wait_for(timeout=180000)
    po.wait_for_timeout(2500)
    shot(po, "05-first100", "Day one with a company: what it is, what normal looks like, where to look first.")
    board_pack_screen(po, "06-board-pack", "Every month, a board pack, with the source of every number.")
    po.goto(BASE + "/feed", wait_until="networkidle")
    po.wait_for_timeout(1500)
    quiet = card_of(po.locator("main h2", has_text="No customer activity").first)
    shot(po, "07-quiet", "A key customer gone quiet: no contact in 107 days.", quiet)
    po.close()

    # the plant
    ctx2 = b.new_context(viewport={"width": 1600, "height": 900}, device_scale_factor=SCALE)
    pg = sign_in(ctx2, "pm-hb@demo.test")
    brief = card_of(pg.locator("main h2", has_text="Your brief for").first)
    shot(pg, "08-brief", "Every morning, the plant manager's brief: what changed, and what needs a decision.",
         brief.locator("ul").first)
    line = pg.locator("main li", has_text="Overtime").first  # VERUS flies to the numbers the line stands on
    line.evaluate("el => el.scrollIntoView({block: 'start'})")
    pg.evaluate("window.scrollBy(0, -170)")
    line.get_by_role("button", name="Show me").click()
    pg.wait_for_timeout(1900)
    shot_as_is(pg, "09-show-me", "Press Show me on any line, and VERUS lights the numbers behind it.",
               [line, pg.locator(".vr-lit").last, pg.locator(".vr-flier").first])
    pg.wait_for_timeout(5500)  # he leaves
    rn = json.loads((OUT / "right-now.json").read_text(encoding="utf-8"))
    shots.append(rn)
    finding = card_of(pg.locator("main h2", has_text="C00002").first)
    show = finding.get_by_role("button", name="Plan", exact=True)
    if show.count():
        show.first.click()
        pg.wait_for_load_state("networkidle")
        pg.wait_for_timeout(1500)
    shot(pg, "11-finding-plan", "Each problem names the customer and the number, with a plan judged on its review date.",
         finding)
    open_level(pg, "company:A1", "Every plant, side by side")
    shot(pg, "12-sisters", "Your plant in full, and your sister plant's headline numbers beside it.",
         pg.locator("main section[aria-label='Every plant, side by side']").first)

    pg.goto(BASE + "/ask", wait_until="networkidle")
    pg.get_by_role("button", name="Ask in your own words").click()
    pg.locator("main textarea").first.fill("How much scrap did HB03 make on shift 2 in March 2026?")
    pg.get_by_role("button", name="Ask", exact=True).click()
    pg.wait_for_timeout(600)
    pg.get_by_text("Working:", exact=False).first.wait_for(state="detached", timeout=120000)
    pg.wait_for_load_state("networkidle")
    pg.wait_for_timeout(1500)
    shot(pg, "13-ask", "Ask in plain words. It answers, and shows how the answer was worked out.",
         pg.locator("main section.shadow-sm").last)

    pg.goto(BASE + "/agents", wait_until="networkidle")
    pg.on("dialog", lambda d: d.accept())
    drafts = pg.locator("main section.shadow-sm").filter(has_text="Backtest a year").filter(has_text="draft")
    for old in drafts.all():  # an earlier run's draft
        old.get_by_role("button", name="Remove").click()
        pg.wait_for_timeout(1500)
    pg.reload(wait_until="networkidle")
    pg.locator("main textarea").first.fill("Warn me when scrap on any work center runs more than twice its usual in a month.")
    pg.get_by_role("button", name="Draft it").click()
    pg.get_by_text("Drafted", exact=False).first.wait_for(timeout=90000)
    pg.wait_for_load_state("networkidle")
    pg.wait_for_timeout(1500)
    draft = pg.locator("main section.shadow-sm").filter(has_text="Backtest a year").filter(has_text="draft").first
    draft.get_by_role("button", name="Backtest a year").click()
    pg.get_by_text("would have raised", exact=False).first.wait_for(timeout=180000)
    pg.wait_for_timeout(1500)
    shot(pg, "14-agent", "One sentence becomes an agent, and it shows what it would have caught last year.",
         pg.locator("main section.shadow-sm").filter(has_text="would have raised").first)

    pg.goto(BASE + "/documents", wait_until="networkidle")
    pg.locator("main input").first.fill("What does the quality manual say about using scrap code 99?")
    pg.get_by_role("button", name="Ask", exact=True).click()
    pg.get_by_role("button", name="Searching").wait_for(state="detached", timeout=90000)
    pg.wait_for_load_state("networkidle")
    pg.wait_for_timeout(1500)
    shot(pg, "15-documents", "Your own documents answer too, with the page they came from.",
         pg.locator("main section.shadow-sm").filter(has_text="QM-001").first)
    b.close()

(OUT / "shots.json").write_text(json.dumps(shots, indent=1), encoding="utf-8")
print("saved", len(shots))
