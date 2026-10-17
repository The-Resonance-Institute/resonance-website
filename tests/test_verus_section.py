"""VERUS, on this site since 2026-10-13, moved to its own site, www.verusops.com, on 2026-10-17 (the operator's word).

WHAT THIS HOLDS. Every way into VERUS from this site goes to verusops.com: the header (third, after the books), the
home page card, the About page and the footer. Every old /verus page address forwards to the page of the same name
there, in one hop, so links already sent keep working. The pages themselves are archived, not served, and are not in
the sitemap. The pictures and the walkthrough under /verus/ are still served, because those file links went out too.

WHAT IT DOES NOT HOLD. That verusops.com is up: it is a separate site in its own repository.
"""
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]
VERUS = "https://www.verusops.com"
PAGES = ("what-its-for", "how-it-works", "inside", "evidence", "pricing", "see-it")


def _read(rel: str) -> str:
    return (ROOT / rel).read_text(encoding="utf-8")


def test_the_header_lists_verus_right_after_the_books():
    """2026-10-17, on the operator's word: "Project" came off, and VERUS sits right after The Philosophy;
    MORIS Research moved to the end beside Ask MORIS. Same day, the entry points at VERUS's own site."""
    links = json.loads(_read("content/nav.json"))["links"]
    order = [l["href"] for l in links]
    assert order.index(VERUS) == order.index("/resonance") + 1, order
    assert order.index("/research") == order.index("https://askmoris.ai") - 1, order
    assert next(l["label"] for l in links if l["href"] == VERUS) == "VERUS"


def test_every_link_to_verus_goes_to_its_own_site():
    for rel in ("app/page.tsx", "app/about/page.tsx", "components/site-footer.tsx"):
        text = _read(rel)
        assert f'"{VERUS}"' in text or f"{VERUS}" in text, f"{rel} has no link to {VERUS}"
    # A page address under /verus ("/verus" or "/verus/pricing"), not a file ("/verus/verus-logo.jpg").
    stale = []
    for path in [*(ROOT / "app").rglob("*.ts*"), *(ROOT / "components").rglob("*.ts*"), ROOT / "content" / "nav.json"]:
        for m in re.finditer(r'"(/verus(?:/[a-z-]+)?)"', path.read_text(encoding="utf-8")):
            stale.append(f"{path.relative_to(ROOT).as_posix()}: {m.group(1)}")
    assert not stale, stale


def test_every_old_page_address_forwards_to_its_page_there():
    config = _read("next.config.ts")
    assert re.search(r'source: "/verus",\s*destination: "https://www\.verusops\.com",', config)
    m = re.search(r'source: "/verus/:page\(([^)]*)\)",\s*destination: "https://www\.verusops\.com/:page",', config)
    assert m, "the /verus/<page> forward is missing"
    assert set(m.group(1).split("|")) == set(PAGES)
    # Only the pages: a wildcard would swallow the pictures and the walkthrough, whose links went out.
    assert '"/verus/:path*"' not in config


def test_the_pages_are_archived_not_served_and_not_in_the_sitemap():
    assert not (ROOT / "app" / "verus").exists()
    assert (ROOT / "archive" / "verus-section-2026-10-17" / "app" / "verus" / "page.tsx").exists()
    paths = set(re.findall(r'path:\s*"([^"]*)"', _read("app/sitemap.ts")))
    assert not {p for p in paths if p.startswith("/verus")}, paths


def test_the_files_that_went_out_are_still_served():
    for name in ("verus-walkthrough.mp4", "verus-walkthrough-poster.jpg", "verus-logo.jpg"):
        assert (ROOT / "public" / "verus" / name).exists(), name
