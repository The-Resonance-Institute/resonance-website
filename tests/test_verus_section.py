"""Project VERUS, 2026-10-13, on the operator's word: five pages under /verus, in the header after Research.

WHAT THIS HOLDS. The section is listed, ordered and in the sitemap, so it is a decision rather than a page that
happens to exist. Every picture a page names is served. The still pictures on Inside VERUS are drawn from one
file of the demonstration's numbers, so the page carries no number of its own.

WHAT IT DOES NOT HOLD. That the numbers are right: they are measured in the VERUS repository, captured from a run
of its demonstration, and carried here. A number changes here only when it was measured again there.
"""
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]
PAGES = ("", "/how-it-works", "/inside", "/evidence", "/see-it")


def test_the_five_pages_exist():
    for p in PAGES:
        assert (ROOT / "app" / "verus" / p.lstrip("/") / "page.tsx").exists(), f"/verus{p} has no page"


def test_the_header_lists_project_verus_right_after_research():
    links = json.loads((ROOT / "content" / "nav.json").read_text(encoding="utf-8"))["links"]
    order = [l["href"] for l in links]
    assert order.index("/verus") == order.index("/research") + 1, order
    assert next(l["label"] for l in links if l["href"] == "/verus") == "Project VERUS"


def test_the_sitemap_lists_every_page():
    paths = set(re.findall(r'path:\s*"([^"]*)"', (ROOT / "app" / "sitemap.ts").read_text(encoding="utf-8")))
    assert {f"/verus{p}" for p in PAGES} <= paths


def test_every_picture_a_page_names_is_served():
    missing = []
    for page in (ROOT / "app" / "verus").rglob("page.tsx"):
        for src in re.findall(r'"(/verus/[^"]+\.png)"', page.read_text(encoding="utf-8")):
            if not (ROOT / "public" / src.lstrip("/")).exists():
                missing.append(f"{page.relative_to(ROOT).as_posix()}: {src}")
    assert not missing, missing


def test_the_still_pictures_are_drawn_from_the_demonstration_data():
    data = json.loads((ROOT / "content" / "verus-demo.json").read_text(encoding="utf-8"))
    assert "never edit a number by hand" in data["note"]
    assert data["owner"]["tiles"] and data["plant"]["tiles"] and data["feed"] and data["brief"]["summary"]
    inside = (ROOT / "app" / "verus" / "inside" / "page.tsx").read_text(encoding="utf-8")
    assert "content/verus-demo.json" in inside
