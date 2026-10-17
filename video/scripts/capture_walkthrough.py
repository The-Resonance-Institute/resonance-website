"""Captures the walkthrough: drives the VERUS demonstration through a plant manager's morning and the owner's view,
and keeps a 1920 by 1080 screenshot per step, with the box on screen that matters, in public/walk (with shots.json).

Run the demonstration first, in replay mode so nothing is spent (in the VERUS repository: VERUS_DEMO_LLM_MODE=replay
make demo), then from this folder: uv run --with playwright python scripts/capture_walkthrough.py
It expects the VERUS repository beside this one, and reads the demonstration's sign-ins from it at run time.
"""
import json
import shutil
import subprocess
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
SCALE = 1.2  # 1600 by 900 CSS pixels drawn at 1920 by 1080
L = logins()
shots = []


def card_of(loc):
    return loc.locator("xpath=ancestor::section[contains(@class,'shadow-sm')][1]")


def shot(pg, name, caption, target=None):
    box = None
    if target is not None:
        target.evaluate("el => el.scrollIntoView({block: 'start'})")  # the part that matters near the top
        pg.evaluate("window.scrollBy(0, -150)")
        pg.wait_for_timeout(500)
        b = target.bounding_box()
        if b:
            x0, y0 = max(0, b["x"]), max(0, b["y"])
            x1, y1 = min(1600, b["x"] + b["width"]), min(900, b["y"] + b["height"])
            box = [round(v * SCALE) for v in (x0, y0, x1 - x0, y1 - y0)]
    pg.screenshot(path=str(OUT / f"{name}.png"))
    shots.append({"file": f"walk/{name}.png", "caption": caption, "box": box})
    print(name, box)


def shot_as_is(pg, name, caption, parts):
    """A screenshot where it stands (VERUS has already scrolled it), boxed round several parts at once."""
    pg.mouse.move(1, 899)  # out of the way: no chart tooltip left showing
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
        for (const s of ['/feed','/dashboards','/ask','/agents','/documents','/market','/briefs','/saved','/metrics'])
            localStorage.setItem(`verus.guide.walked.${me.id}.${s}`, '1');
    }""")
    pg.reload(wait_until="networkidle")
    pg.wait_for_timeout(1500)
    return pg


with sync_playwright() as p:
    b = p.chromium.launch(channel="chrome", headless=True)
    ctx = b.new_context(viewport={"width": 1600, "height": 900}, device_scale_factor=SCALE)
    pg = ctx.new_page()
    pg.goto(BASE + "/", wait_until="networkidle")
    pg.wait_for_timeout(800)
    shot(pg, "01-sign-in", "VERUS runs inside your network, and it only reads.")
    pg.close()

    pg = sign_in(ctx, "pm-hb@demo.test")
    brief = card_of(pg.locator("main h2", has_text="Your brief for").first)
    shot(pg, "02-brief", "Every morning, the plant manager's brief: what changed, and what needs a decision.",
         brief.locator("ul").first)
    # "Show me": VERUS flies to the numbers the overtime line stands on
    line = pg.locator("main li", has_text="Overtime spiked").first
    line.evaluate("el => el.scrollIntoView({block: 'start'})")
    pg.evaluate("window.scrollBy(0, -170)")
    line.get_by_role("button", name="Show me").click()
    pg.wait_for_timeout(1900)
    shot_as_is(pg, "02b-show-me", "Press Show me on any line, and VERUS lights the numbers behind it.",
               [line, pg.locator(".vr-lit").last, pg.locator(".vr-flier").first])
    pg.wait_for_timeout(5500)  # he leaves
    finding = card_of(pg.locator("main h2", has_text="Harbor Windows").first)
    shot(pg, "03-finding", "Each problem names the customer and the number: 75% on time, against an 85% limit.",
         finding)
    finding.get_by_role("button", name="Plan").click()
    pg.wait_for_load_state("networkidle")
    pg.wait_for_timeout(1500)
    shot(pg, "04-plan", "A plan to fix it, with its steps and owner, judged on its review date.", finding)

    pg.goto(BASE + "/dashboards", wait_until="networkidle")
    pg.wait_for_timeout(2500)
    shot(pg, "05-dashboard", "Yesterday's numbers by line and department, with a caution where the data can't be trusted.")
    # VERUS shows you round: on any screen, click him in the bar
    pg.locator("header button[title^='Show me around']").click()
    pg.wait_for_timeout(1400)
    pg.get_by_role("button", name="Next").click()
    pg.wait_for_timeout(1800)
    shot_as_is(pg, "05b-verus-tour", "Lost? Click VERUS on any screen and he shows you around.",
               [pg.locator(".vr-lit").first, pg.locator("[role=dialog]").first])
    pg.keyboard.press("Escape")
    pg.wait_for_timeout(1000)

    pg.goto(BASE + "/ask", wait_until="networkidle")
    pg.get_by_role("button", name="Ask in your own words").click()
    pg.locator("main textarea").first.fill("How much scrap did HB03 make on shift 2 in March 2026?")
    pg.get_by_role("button", name="Ask", exact=True).click()
    pg.wait_for_timeout(600)
    working = pg.locator("main [role=status]", has_text="Working:").first
    if working.count():  # a recorded answer can come back before there is anything to see
        shot_as_is(pg, "06a-working", "While it works, VERUS goes through the steps with you.",
                   [pg.locator("main textarea").first, working])
    pg.get_by_text("Working:", exact=False).first.wait_for(state="detached", timeout=90000)
    pg.wait_for_load_state("networkidle")
    pg.wait_for_timeout(1500)
    answer = pg.locator("main section.shadow-sm").last
    shot(pg, "06-ask", "Ask in plain words. It answers, and shows how the answer was worked out.", answer)

    pg.goto(BASE + "/agents", wait_until="networkidle")
    pg.on("dialog", lambda d: d.accept())
    for old in pg.locator("main section.shadow-sm").filter(has_text="scrap alert").all():  # an earlier run's draft
        old.get_by_role("button", name="Remove").click()
        pg.wait_for_timeout(1500)
    pg.reload(wait_until="networkidle")
    box = pg.locator("main textarea").first
    box.fill("Warn me when scrap on any work center runs more than twice its usual in a month.")
    shot(pg, "07a-sentence", "Need to dig deeper? Describe an agent in one sentence.",
         card_of(box))
    pg.evaluate("window.scrollTo(0, 0)")
    pg.get_by_role("button", name="Draft it").click()
    pg.get_by_text("Drafted", exact=False).first.wait_for(timeout=60000)
    pg.wait_for_load_state("networkidle")
    pg.wait_for_timeout(1500)
    draft = pg.locator("main section.shadow-sm").filter(has_text="Backtest a year").filter(has_text="draft").first
    shot(pg, "07b-agent", "VERUS reads it back in plain words. Nothing runs until you switch it on.", draft)
    draft.get_by_role("button", name="Backtest a year").click()
    pg.get_by_text("would have raised", exact=False).first.wait_for(timeout=120000)
    pg.wait_for_timeout(1500)
    draft = pg.locator("main section.shadow-sm").filter(has_text="would have raised").first
    shot(pg, "08-backtest", "First it shows what it would have caught last year: HB03's scrap spike in March.", draft)

    pg.goto(BASE + "/documents", wait_until="networkidle")
    pg.locator("main input").first.fill("What does the quality manual say about using scrap code 99?")
    pg.get_by_role("button", name="Ask", exact=True).click()
    pg.get_by_role("button", name="Searching").wait_for(state="detached", timeout=90000)
    pg.wait_for_load_state("networkidle")
    pg.wait_for_timeout(1500)
    doc = pg.locator("main section.shadow-sm").filter(has_text="QM-001").first
    shot(pg, "09-documents", "Your own documents answer too, with the page they came from.", doc)

    ctx2 = b.new_context(viewport={"width": 1600, "height": 900}, device_scale_factor=SCALE)
    po = sign_in(ctx2, "owner@demo.test")
    po.goto(BASE + "/dashboards", wait_until="networkidle")
    po.wait_for_timeout(2500)
    shot(po, "10-owner", "The owner sees every company side by side, on one set of definitions.")
    po.goto(BASE + "/feed", wait_until="networkidle")
    po.wait_for_timeout(1500)
    quiet = card_of(po.locator("main h2", has_text="No customer activity").first)
    shot(po, "11-quiet", "And hears when a key customer goes quiet: no contact in 107 days.", quiet)
    b.close()

(OUT / "shots.json").write_text(json.dumps(shots, indent=1), encoding="utf-8")
print("saved", len(shots))
