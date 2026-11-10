"""VERUS is off this site (2026-11-09, the operator's word: "separate Verusops from the resonance institute ...
completely"). It was here from 2026-10-13, then linked to its own site from 2026-10-17. Now nothing here links to it,
the old /verus addresses come to the front page, and none of its pages, pictures or code is kept in this repository.
"""
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]


def _read(rel: str) -> str:
    return (ROOT / rel).read_text(encoding="utf-8")


def test_nothing_links_to_verus():
    hits = []
    for path in [*(ROOT / "app").rglob("*.ts*"), *(ROOT / "components").rglob("*.ts*")]:
        code = " ".join(l for l in path.read_text(encoding="utf-8").splitlines() if not l.lstrip().startswith("//"))
        if "verusops" in code:  # a comment recording the history is not a link
            hits.append(path.relative_to(ROOT).as_posix())
    assert not hits, hits
    links = json.loads(_read("content/nav.json"))["links"]
    assert not [l for l in links if "VERUS" in l["label"] or "verusops" in l["href"]]


def test_old_addresses_come_to_the_front_page():
    config = _read("next.config.ts")
    assert re.search(r'source: "/verus",\s*destination: "/",', config)
    assert re.search(r'source: "/verus/:path\*",\s*destination: "/",', config)
    assert "verusops" not in config


def test_none_of_it_is_kept_here():
    for rel in ("app/verus", "public/verus", "archive/verus-section-2026-10-17", "components/verus-explainer.tsx",
                "components/verus-explainer-sound.ts"):
        assert not (ROOT / rel).exists(), rel
