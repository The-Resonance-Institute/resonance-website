"""The books-first pivot, 2026-09-19, enforced rather than remembered.

THE OPERATOR'S RULING. The site is a books site. The open letter and the compliance page are gone,
the MORIS wing is gone, and all mention of an artificial conscience and of agentic work goes with
them. MORIS survives as one thing only: /moris/chat, a novelty, a way to put a question to a language
model through the lens of the Resonance series.

WHY THIS IS A TEST. A sweep is a rule you performed once. The site is edited by whoever is in it
next, and the phrases removed here are the ones most likely to come back by habit, because they were
the site's whole vocabulary for months. This fails the moment one of them reappears.

WHAT IS DELIBERATELY NOT FORBIDDEN. The word MORIS itself, because the surviving novelty is called
Ask MORIS, and the archive, which exists to be brought back and is excluded throughout.
"""
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / "archive"
LIVE_DIRS = ("app", "components", "lib", "public")
SUFFIXES = {".tsx", ".ts", ".html", ".css", ".mts"}

# Phrases the pivot removed. Matched case-insensitively on live source only.
BANNED = ("artificial conscience", "agentic", "a conscience", "the conscience",
          "control plane for moral thought", "open letter")


def strip_comments(text: str) -> str:
    """Remove comments before scanning.

    The pivot is DOCUMENTED in comments throughout: next.config, the nav, the sitemap and the home
    page all explain what was removed and why, and several of them have to name the thing to do it.
    A guard that flagged those would force the explanation out of the code, which is the opposite of
    what this repository does everywhere else. What matters is what a visitor reads, so block, line
    and JSX comments come out first. The line-comment pattern is guarded against `https://`.
    """
    text = re.sub(r"<!--.*?-->", " ", text, flags=re.S)      # HTML
    text = re.sub(r"\{/\*.*?\*/\}", " ", text, flags=re.S)   # JSX
    text = re.sub(r"/\*.*?\*/", " ", text, flags=re.S)        # block
    text = re.sub(r"(?<!:)//.*", " ", text)                  # line, not a URL scheme
    return text


def live_files():
    for d in LIVE_DIRS:
        for p in (ROOT / d).rglob("*"):
            if p.is_file() and p.suffix in SUFFIXES and ARCHIVE not in p.parents:
                yield p


def test_the_removed_vocabulary_does_not_come_back():
    hits = []
    for p in live_files():
        text = strip_comments(p.read_text(encoding="utf-8", errors="ignore")).lower()
        for phrase in BANNED:
            if phrase in text:
                hits.append(f"{p.relative_to(ROOT)}: {phrase!r}")
    assert not hits, (
        "the books-first pivot's removed vocabulary reappeared in live site source. If this is "
        "deliberate, the pivot is being reversed and that is an operator decision, not an edit: "
        + "; ".join(hits))


def test_the_removed_routes_are_gone_from_the_app():
    gone = ["open-letter", "compliance", "moris"]
    present = [d for d in gone if (ROOT / "app" / d).exists()]
    assert not present, f"a removed route is back under app/: {present}"


def test_the_archive_actually_holds_what_was_removed():
    """An archive that does not contain the material is not an archive, and the operator's
    instruction was explicitly that this may come back."""
    a = ARCHIVE / "site-2026-09-19"
    assert a.is_dir(), "the archive directory is missing"
    for expected in ("app/open-letter/page.tsx", "app/compliance/page.tsx", "app/moris/page.tsx",
                     "app/moris/conscience/page.tsx", "app/moris/terms/page.tsx",
                     "public/moris/shift.html", "public/moris/judge.html",
                     "public/open-letter/We-Built-the-Intelligence-Open-Letter.pdf"):
        assert (a / expected).exists(), f"archive is missing {expected}"


def test_ask_moris_survives_and_is_reachable():
    """The one MORIS surface kept. It is served from public/ and needs its rewrite entry: adding the
    file is not adding the page, which this site has learned once already."""
    chat = ROOT / "public" / "moris" / "chat.html"
    assert chat.exists(), "the surviving chat surface is missing"
    cfg = (ROOT / "next.config.ts").read_text(encoding="utf-8")
    assert '"/moris/chat"' in cfg and '"/moris/chat.html"' in cfg, \
        "/moris/chat has no rewrite, so the clean URL will 404 while the .html answers 200"


def test_the_moris_wildcard_redirect_does_not_swallow_the_chat_page():
    """The redirect that forwards the removed wing must not catch the page that survived it."""
    cfg = (ROOT / "next.config.ts").read_text(encoding="utf-8")
    m = re.search(r'source:\s*"(/moris/:path[^"]*)"', cfg)
    assert m, "the /moris wildcard redirect is missing"
    assert "chat" in m.group(1), \
        f"the wildcard {m.group(1)!r} does not exclude chat, so /moris/chat redirects away"


def test_the_unlisted_deck_is_kept_and_stays_unlinked():
    """Operator's condition: the deck stays, reachable by direct link only, because that link is
    live in outreach already sent. It must not be linked from any page or appear in the sitemap."""
    deck = ROOT / "public" / "d"
    assert deck.is_dir() and any(deck.rglob("*.pdf")), "the unlisted deck was removed"
    for p in live_files():
        if p.suffix == ".pdf":
            continue
        text = p.read_text(encoding="utf-8", errors="ignore")
        assert "/d/" not in text or "public/d" in str(p), f"{p.relative_to(ROOT)} links the deck"
    sitemap = (ROOT / "app" / "sitemap.ts").read_text(encoding="utf-8")
    assert "/d/" not in sitemap, "the unlisted deck is in the sitemap"


def test_the_sitemap_lists_no_removed_route():
    sitemap = (ROOT / "app" / "sitemap.ts").read_text(encoding="utf-8")
    paths = set(re.findall(r'path:\s*"([^"]*)"', sitemap))
    forbidden = {p for p in paths
                 if p.startswith("/open-letter") or p.startswith("/compliance")
                 or (p.startswith("/moris") and p != "/moris/chat")}
    assert not forbidden, f"the sitemap still lists removed routes: {sorted(forbidden)}"
