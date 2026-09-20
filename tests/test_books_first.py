"""The books-first pivot, 2026-09-19, enforced rather than remembered.

THE OPERATOR'S RULING. The site is a books site. The compliance page and the MORIS wing are gone,
and no surface a visitor can reach may call anything a conscience or describe agentic work.

WHAT "GONE" MEANS, AND WHAT IT DOES NOT. Two things are kept but UNLISTED: the investor deck at /d/
and, from 2026-09-20, the open letter. Neither is linked from any page, neither is in the sitemap,
both carry noindex. They are kept because their URLs went out in outreach already sent. Removing
MORIS from the website was a positioning decision; breaking links in correspondence is a different
decision, and only the first one was made.

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
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / "archive"
LIVE_DIRS = ("app", "components", "lib", "public")

# UNLISTED, NOT PART OF THE PUBLIC FACE. Reachable by direct link only: no link from any page, out of
# the sitemap, noindex in metadata and as a response header. These are kept because their URLs went
# out in outreach already sent and those links still have to resolve; breaking correspondence is a
# different decision from changing the site's positioning, and the operator made only the second one.
#
# The vocabulary guard does not scan them, and that exemption is the whole reason this constant has a
# comment. The open letter IS the artificial-conscience argument; that is what it was written to be.
# Rewriting it to pass a guard would falsify a document people were sent. What the guard protects is
# what a visitor to this site reads, and nothing here is reachable from anything a visitor sees.
# Everything else still applies to them: they may never be linked (test_no_live_page_links_to_a_route
# _that_was_removed keeps /open-letter in its removed prefixes on purpose) and never indexed.
UNLISTED = ("app/open-letter", "public/open-letter", "public/d")
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


def _is_unlisted(p) -> bool:
    rel = p.relative_to(ROOT).as_posix()
    return any(rel.startswith(u + "/") or rel == u for u in UNLISTED)


def live_files(include_unlisted: bool = False):
    for d in LIVE_DIRS:
        for p in (ROOT / d).rglob("*"):
            if not (p.is_file() and p.suffix in SUFFIXES and ARCHIVE not in p.parents):
                continue
            if not include_unlisted and _is_unlisted(p):
                continue
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
    # open-letter is NOT checked here any more. It was restored on 2026-09-20 as an unlisted
    # document, reachable by direct link only; test_the_open_letter_is_unlisted_not_deleted governs
    # it now. compliance stays gone outright.
    present = [d for d in ("compliance",) if (ROOT / "app" / d).exists()]
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
    for expected in ("app/compliance/page.tsx", "app/moris/page.tsx",
                     "app/moris/conscience/page.tsx", "app/moris/terms/page.tsx",
                     "public/moris/shift.html", "public/moris/judge.html"):
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


import json
import subprocess


def test_the_nav_has_exactly_one_source():
    """SINGLE SOURCE, 2026-09-19. content/nav.json is the only place the header is defined.

    components/site-nav.tsx must IMPORT it rather than carry its own list. A literal array in that
    file is how the three copies started, and it is the thing this check exists to prevent coming
    back: the moment someone re-inlines the links "just for a second", the static pages stop being
    generated from the same truth and nothing reports it.
    """
    src = (ROOT / "components" / "site-nav.tsx").read_text(encoding="utf-8")
    assert "content/nav.json" in src, "site-nav.tsx no longer reads the single source"
    assert not re.search(r'\{\s*href:\s*"', src), (
        "site-nav.tsx defines nav links inline again. Put them in content/nav.json and run "
        "scripts/sync_static_nav.py.")

    links = json.loads((ROOT / "content" / "nav.json").read_text(encoding="utf-8"))["links"]
    assert links, "content/nav.json lists no links"
    for l in links:
        assert set(l) == {"href", "label"}, f"unexpected keys in a nav entry: {l}"


def test_the_static_headers_are_generated_and_current():
    """THE FAILURE THIS REPLACES. The header used to exist in three hand-maintained places, and on
    2026-09-19 public/moris/pair.html shipped live carrying the pre-pivot one: MORIS, Demos,
    Compliance. It had been in the archive during the nav sweep and came back untouched. Every dead
    link answered 307 rather than 404 because of the pivot's own redirects, so nothing looked broken
    and only the operator caught it.

    The static pages are served as plain HTML with deliberately isolated stylesheets and cannot
    import the React component, so they are GENERATED from content/nav.json instead. This runs the
    generator in check mode: if the JSON changed and the pages were not regenerated, this fails and
    names the command that fixes it, rather than the drift reaching the site.
    """
    r = subprocess.run([sys.executable, "scripts/sync_static_nav.py", "--check"],
                       cwd=ROOT, capture_output=True, text=True)
    assert r.returncode == 0, (
        "the generated headers are out of date with content/nav.json. "
        + r.stdout + r.stderr)


def test_the_generator_is_actually_writing_the_header_it_claims():
    """The positive control. A generator whose check mode passes because it silently found nothing
    to compare would make the test above decoration. This asserts the rendered block is present in
    both targets, with every link from the source in it."""
    links = json.loads((ROOT / "content" / "nav.json").read_text(encoding="utf-8"))["links"]
    for name in ("chat.html", "pair.html"):
        html = (ROOT / "public" / "moris" / name).read_text(encoding="utf-8")
        m = re.search(r'<div class="site-nav__links">(.*?)</div>', html, flags=re.S)
        assert m, f"{name} has no header block for the generator to write"
        for l in links:
            anchor = f'<a href="{l["href"]}">{l["label"]}</a>'
            assert anchor in m.group(1), f"{name} is missing {anchor}"


def test_the_open_letter_is_unlisted_not_deleted():
    """RESTORED UNLISTED 2026-09-20, on the operator's word, for the same reason as the deck: the
    letter's URL and the PDF beside it went out in a great deal of outreach and those links are still
    in people's inboxes.

    Unlisted here means exactly four things, and all four are asserted: it is served rather than
    redirected, no page links to it, it is out of the sitemap, and it carries noindex both in the
    page's own metadata and as a response header. The header is not redundant with the meta tag: the
    PDF has no metadata to carry one, and it is the file most likely to be fetched directly.

    UNLISTED IS NOT SECRET, and it is weaker here than for the deck. /d/ sits behind an unguessable
    path; /open-letter is memorable and Google has already crawled it, so noindex asks for removal
    rather than preventing discovery. That is the accepted trade, recorded here so nobody later reads
    this arrangement as a promise of privacy.
    """
    page = ROOT / "app" / "open-letter" / "page.tsx"
    assert page.exists(), "the open letter is gone; it is kept unlisted, not removed"
    pdf = ROOT / "public" / "open-letter" / "We-Built-the-Intelligence-Open-Letter.pdf"
    assert pdf.exists(), "the distribution PDF is gone, and that is the link most people were sent"

    src = page.read_text(encoding="utf-8")
    assert re.search(r"robots:\s*\{[^}]*index:\s*false", src),         "the open letter lost its noindex metadata"

    cfg = (ROOT / "next.config.ts").read_text(encoding="utf-8")
    # Served, not redirected: a redirect here would break every link already sent.
    assert not re.search(r'source:\s*"/open-letter[^"]*",\s+destination', cfg), \
        "the open letter is being redirected again, which breaks the links it exists to preserve"
    # And noindex as a header, for the page and for the PDF beside it.
    for route in ('"/open-letter"', '"/open-letter/:path*"'):
        i = cfg.find(f"source: {route}")
        assert i != -1, f"no header entry for {route}"
        assert "noindex" in cfg[i:i + 220], f"{route} has no X-Robots-Tag noindex header"

    # Out of the sitemap, and linked from nowhere. The dead-link guard keeps /open-letter in its
    # removed prefixes precisely so this stays true.
    sitemap = (ROOT / "app" / "sitemap.ts").read_text(encoding="utf-8")
    assert "/open-letter" not in sitemap, "the unlisted open letter is in the sitemap"
    for f in live_files():
        text = strip_comments(f.read_text(encoding="utf-8", errors="ignore"))
        assert 'href="/open-letter' not in text and 'href="/letter"' not in text,             f"{f.relative_to(ROOT)} links the unlisted open letter"
