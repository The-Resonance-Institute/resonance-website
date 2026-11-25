"""VERUS on this site. It was here from 2026-10-13, moved to its own site (www.verusops.com) on 2026-10-17, was taken
off this site entirely on 2026-11-09 to keep it apart from the Institute, and came back on 2026-11-25, on the operator's
word, once its first pilot was agreed ("it no longer needs to be hidden").

WHAT THIS HOLDS. Every way into VERUS from this site goes to verusops.com: the header (right after Research), the home
page card, the About page and the Pivot Labs page that VERUS sponsors. Every old /verus address forwards there, to its
own page where one exists. Its pages, pictures and code are not kept in this public repository.

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


def test_the_header_lists_verus_right_after_research():
    links = json.loads(_read("content/nav.json"))["links"]
    order = [l["href"] for l in links]
    assert order.index(VERUS) == order.index("/research") + 1, order
    assert next(l["label"] for l in links if l["href"] == VERUS) == "VERUS"


def test_the_pages_that_name_verus_link_to_its_own_site():
    for rel in ("app/page.tsx", "app/about/page.tsx", "app/pivot-labs/page.tsx"):
        assert VERUS in _read(rel), f"{rel} has no link to {VERUS}"
    # no page address under /verus is linked from here: they only forward
    stale = []
    for path in [*(ROOT / "app").rglob("*.ts*"), *(ROOT / "components").rglob("*.ts*"), ROOT / "content" / "nav.json"]:
        for m in re.finditer(r'"(/verus(?:/[a-z-]+)?)"', path.read_text(encoding="utf-8")):
            stale.append(f"{path.relative_to(ROOT).as_posix()}: {m.group(1)}")
    assert not stale, stale


def test_every_old_address_forwards_to_verusops():
    config = _read("next.config.ts")
    assert re.search(r'source: "/verus",\s*destination: "https://www\.verusops\.com",', config)
    m = re.search(r'source: "/verus/:page\(([^)]*)\)",\s*destination: "https://www\.verusops\.com/:page",', config)
    assert m, "the /verus/<page> forward is missing"
    assert set(m.group(1).split("|")) == set(PAGES)
    # anything else under /verus (the old pictures, the walkthrough) goes to the site, after the named pages
    assert config.index('"/verus/:path*"') > m.start()
    assert re.search(r'source: "/verus/:path\*",\s*destination: "https://www\.verusops\.com",', config)


def test_none_of_it_is_kept_here():
    for rel in ("app/verus", "public/verus", "archive/verus-section-2026-10-17", "components/verus-explainer.tsx",
                "components/verus-explainer-sound.ts"):
        assert not (ROOT / rel).exists(), rel
