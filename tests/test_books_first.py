"""The books-first pivot, 2026-09-19, enforced rather than remembered.

THE OPERATOR'S RULING. The site is a books site. The open letter and the compliance page are gone,
the MORIS wing is gone, and no surface may call anything a conscience or describe agentic work.

WHAT SURVIVES, and it is allowed to be honest about itself: /moris/chat and the side-by-side
demonstration at /moris/pair, with its per-exchange route. Both may say plainly that a mechanical
gate derives a judgment from the philosophy in the series, because that is what they do. What they
may not do is call it a conscience, or position it for agents.

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
          "one conscience", "control plane for moral thought", "open letter")


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
    present = [d for d in ("open-letter", "compliance") if (ROOT / "app" / d).exists()]
    assert not present, f"a removed route is back under app/: {present}"

    # app/moris is NOT banned wholesale. The side-by-side demonstration was restored on 2026-09-19
    # and its per-exchange route lives at app/moris/pair/[id], so the wing is checked page by page
    # rather than by forbidding the directory.
    wing = ROOT / "app" / "moris"
    if wing.exists():
        back = sorted(p.name for p in wing.iterdir() if p.is_dir() and p.name != "pair")
        assert not back, f"a removed MORIS page is back under app/moris/: {back}"
        assert not (wing / "page.tsx").exists(), "the MORIS landing page is back"


def test_the_archive_actually_holds_what_was_removed():
    """An archive that does not contain the material is not an archive, and the operator's
    instruction was explicitly that this may come back."""
    a = ARCHIVE / "site-2026-09-19"
    assert a.is_dir(), "the archive directory is missing"
    for expected in ("app/open-letter/page.tsx", "app/compliance/page.tsx", "app/moris/page.tsx",
                     "app/moris/conscience/page.tsx", "app/moris/terms/page.tsx",
                     "public/moris/shift.html", "public/moris/judge.html",
                     "public/open-letter/We-Built-the-Intelligence-Open-Letter.pdf"):
        # pair.html and app/moris/pair/[id] are deliberately absent: archived on 2026-09-19
        # and restored the same day, so the archive no longer holds them.
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
    for survivor in ("chat", "pair"):
        assert survivor in m.group(1), (
            f"the wildcard {m.group(1)!r} does not exclude {survivor}, so /moris/{survivor} "
            f"redirects away. For pair this would also forward every per-exchange link already "
            f"sent to the book series instead of rendering the exchange.")


def test_the_side_by_side_is_reachable_and_its_links_are_not_indexed():
    """Restored 2026-09-19. Adding the file is not adding the page: it needs its rewrite entry. And
    a consented link was agreed to as a link, not as an indexed page, so it keeps its header."""
    assert (ROOT / "public" / "moris" / "pair.html").exists(), "the side-by-side page is missing"
    assert (ROOT / "app" / "moris" / "pair" / "[id]" / "page.tsx").exists(), \
        "the per-exchange route is missing, so every link already sent would 404"
    cfg = (ROOT / "next.config.ts").read_text(encoding="utf-8")
    assert '"/moris/pair"' in cfg and '"/moris/pair.html"' in cfg, "/moris/pair has no rewrite"
    assert "noindex" in cfg, "the per-exchange noindex header is missing"


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
                 or (p.startswith("/moris") and p not in {"/moris/chat", "/moris/pair"})}
    assert not forbidden, f"the sitemap still lists removed routes: {sorted(forbidden)}"


def test_no_live_page_links_to_a_route_that_was_removed():
    """THE GAP THIS CLOSES, found on the live site 2026-09-19 and not by any test.

    public/moris/pair.html carries its own hand-copied nav, because it is a generated static page
    with an isolated stylesheet rather than a React route. When the books-first nav sweep ran, that
    file was sitting in the archive, so it missed the sweep entirely. It was restored later the same
    day still carrying the OLD nav: MORIS, Demos, Compliance, plus a breadcrumb into /moris/demos and
    a consent modal pointing at the archived terms page. Four dead links, shipped and live.

    The vocabulary guard could not see it. Nothing on that page said "conscience"; it linked to pages
    that no longer exist, which is a different failure and needs its own check. Every one of those
    links resolved with a 307 rather than a 404, so nothing looked broken from the outside either.

    This is the check that generalises: whatever a live page links to internally must be a route this
    site still serves.
    """
    removed_prefixes = ("/moris", "/open-letter", "/compliance")
    survivors = {"/moris/chat", "/moris/pair"}

    hits = []
    for p in live_files():
        if p.suffix not in {".tsx", ".html"}:
            continue
        text = strip_comments(p.read_text(encoding="utf-8", errors="ignore"))
        for href in re.findall(r'href="(/[^"#?]*)"', text):
            href = href.rstrip("/") or "/"
            if href in survivors or href.startswith("/moris/pair/"):
                continue
            if any(href == pre or href.startswith(pre + "/") for pre in removed_prefixes):
                hits.append(f"{p.relative_to(ROOT)} -> {href}")
    assert not hits, (
        "a live page links to a route removed in the books-first pivot. The link will redirect "
        "rather than 404, so it looks fine and silently sends the visitor somewhere else: "
        + "; ".join(sorted(set(hits))))


def _react_nav():
    src = (ROOT / "components" / "site-nav.tsx").read_text(encoding="utf-8")
    block = src[src.index("const links = ["):src.index("];", src.index("const links = ["))]
    return re.findall(r'href:\s*"([^"]*)",\s*label:\s*"([^"]*)"', block)


def _static_nav(name):
    src = (ROOT / "public" / "moris" / name).read_text(encoding="utf-8")
    m = re.search(r'<div class="site-nav__links">(.*?)</div>', src, flags=re.S)
    assert m, f"{name} has no site-nav__links block"
    return re.findall(r'<a href="([^"]*)">([^<]*)</a>', m.group(1))


def test_the_three_hand_maintained_navs_do_not_diverge():
    """THE FAILURE THIS CATCHES IS THE ONE THE DEAD-LINK GUARD CANNOT SEE.

    The site header exists in THREE places: components/site-nav.tsx for React routes, and a
    hand-copied block inside each of public/moris/chat.html and public/moris/pair.html, which are
    generated pages with deliberately isolated stylesheets. On 2026-09-19 pair.html shipped live
    still carrying the pre-pivot header, because it was in the archive when the sweep ran.

    A dead-link check only fires when a nav points at a route that no longer exists. If someone ADDS
    an item to the React nav, or renames a label, every link stays valid and the static pages simply
    stop matching the rest of the site. Nothing would report it and the pages would look fine in
    isolation. This asserts the three are identical, item for item, in order.

    If these ever need to differ on purpose, that is a design decision and this test is where it gets
    written down. The real fix is one source for the nav, which is a build change rather than a test.
    """
    react = _react_nav()
    assert react, "the React nav could not be parsed; the guard is not looking at anything"
    for page in ("chat.html", "pair.html"):
        assert _static_nav(page) == react, (
            f"public/moris/{page} carries a header that no longer matches components/site-nav.tsx. "
            f"It is hand-copied and does not update itself.\n"
            f"  site-nav.tsx: {react}\n"
            f"  {page}: {_static_nav(page)}")
