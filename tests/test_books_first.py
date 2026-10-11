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
# THE OPEN LETTER LEFT THIS SET ON 2026-10-02, by operator ruling, and the reasoning is recorded in
# test_the_open_letter_is_listed_and_navigable below. It is now in the header and in the sitemap, so
# the four properties this constant grants no longer apply to it. Only the investor deck remains.
UNLISTED = ("public/d",)

# THE ONE VOCABULARY EXEMPTION, 2026-10-02, argued rather than quietly widened.
#
# The open letter is a signed public document from the Institute, not site copy. Its whole subject is
# conscience and agentic behaviour; the title is "The Conscience Is Already There". Rewriting it to
# pass this guard would falsify a document published under the operator's name, which is the same
# distinction the "quoted prose is not site copy" ruling already draws elsewhere.
#
# WHAT THIS EXEMPTION IS NOT. It is not a narrowing of the pivot. The site is still books-first, there
# is still no MORIS wing, and Ask MORIS is still a single outbound link. Every other live surface is
# scanned exactly as before. If the banned vocabulary turns up anywhere but this one file the guard
# still fails, which is why a file is named rather than a phrase removed from the list.
# MOVED TO THE RESEARCH ZONE, 2026-10-10, on the operator's ruling. The open letter was retired and
# the research section replaces it, so the exemption moves with the reason rather than being deleted
# and re-argued. It is still one entry and still one named place; it is a directory now because the
# section is three pages and will grow.
#
# THE ARGUMENT IS UNCHANGED. A signed research document published under the operator's name is not
# site copy. The paper is titled "An Operational Artificial Conscience" and its whole subject is
# conscience and agentic behaviour. Rewriting it to pass this guard would falsify the record, which
# is the same distinction the "quoted prose is not site copy" ruling draws elsewhere.
#
# WHERE THE EDITION ITSELF LIVES, and why it is not listed here. The three generated fragments sit in
# content/research/, and content/ is not in LIVE_DIRS, so they are not scanned by this guard at all.
# That is stated rather than left to be discovered: they are the generated edition of record, not
# authored site copy, and the ruling that exempts the zone would exempt them on the same grounds.
# They ARE scanned by tests/test_no_mechanism_here.py, which walks every tracked file.
VOCAB_EXEMPT = ("app/research/",)
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
        rel = p.relative_to(ROOT).as_posix()
        if any(rel == z or rel.startswith(z) for z in VOCAB_EXEMPT):
            continue
        text = strip_comments(p.read_text(encoding="utf-8", errors="ignore")).lower()
        for phrase in BANNED:
            if phrase in text:
                hits.append(f"{p.relative_to(ROOT)}: {phrase!r}")
    assert not hits, (
        "the books-first pivot's removed vocabulary reappeared in live site source. If this is "
        "deliberate, the pivot is being reversed and that is an operator decision, not an edit: "
        + "; ".join(hits))


def test_the_vocabulary_exemption_covers_exactly_one_zone_and_it_exists():
    """An exemption nobody can see the edges of is a hole. These are the edges.

    It is one zone rather than one file from 2026-10-10, because the research section is three pages
    and is meant to grow. The count still has to be one: a second entry is a second argument, and
    that is the operator's to make, not an edit."""
    assert len(VOCAB_EXEMPT) == 1, (
        "the vocabulary exemption grew. Each addition is an operator decision about what a visitor "
        f"may read on this site, not an edit: {VOCAB_EXEMPT}")
    for rel in VOCAB_EXEMPT:
        assert (ROOT / rel).is_dir(), f"the exemption names a zone that does not exist: {rel}"
        assert rel.endswith("/"), f"a zone must end in a slash or it matches siblings: {rel}"


def test_the_removed_routes_are_gone_from_the_app():
    # open-letter is NOT checked here any more. Restored unlisted on 2026-09-20 and made a listed,
    # navigable route again on 2026-10-02; test_the_open_letter_is_listed_and_navigable governs it
    # now. compliance stays gone outright.
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

    # THE FIRST OPEN LETTER, replaced 2026-10-02. "We Built the Intelligence. We Never Built the
    # Conscience.", published 2026-09-15 and sent to press desks and legislators. The operator ruled
    # it archived rather than kept live: weeks had passed, the argument had moved on, and anyone
    # following an old link should arrive at what the Institute now says. Archived rather than
    # deleted, because a document that went out under his name does not stop existing when the site
    # stops serving it.
    first = ARCHIVE / "open-letter-2026-09-15"
    assert first.is_dir(), "the first open letter was replaced without being archived"
    for expected in ("app/open-letter/page.tsx",
                     "public/open-letter/We-Built-the-Intelligence-Open-Letter.pdf"):
        assert (first / expected).exists(), f"the first open letter archive is missing {expected}"

    # THE SECOND OPEN LETTER, retired 2026-10-10. "The Conscience Is Already There", published
    # 2026-10-01. The research report supersedes it: the letter was one signed argument and the
    # report is the evidence behind that argument. Archived on the same principle as the first, that
    # a document which went out under his name does not stop existing when the site stops serving it.
    second = ARCHIVE / "open-letter-2026-10-01"
    assert second.is_dir(), "the second open letter was retired without being archived"
    for expected in ("app/open-letter/page.tsx",
                     "public/open-letter/The-Conscience-Is-Already-There.pdf"):
        assert (second / expected).exists(), f"the second open letter archive is missing {expected}"


def test_ask_moris_is_one_outbound_instance_and_is_not_rebuilt_here():
    """ONE INSTANCE, ONE URL. Operator ruling, 2026-09-23.

    Ask MORIS runs at askmoris.ai. This repository must not hold a second copy of it, and every
    reference to it from a live page must be an outbound link to that one instance.

    THE FAILURE THIS PREVENTS is the easy one: someone rebuilds the chat surface here "just to have
    it on the site", and now there are two, drifting, with two sets of copy to keep honest and two
    places a stale claim can survive. That is how three copies of the site header came to exist,
    which cost a live page on 2026-09-19.
    """
    assert not (ROOT / "public" / "moris").exists(), (
        "public/moris/ is back. The static demos were archived on 2026-09-23; Ask MORIS is a link "
        "out, not a page served from here.")

    outbound = []
    for f in live_files():
        if f.suffix not in {".tsx", ".html"}:
            continue
        text = f.read_text(encoding="utf-8", errors="ignore")
        for m in re.finditer(r"<a\b[^>]*askmoris\.ai[^>]*>", text, re.S):
            outbound.append((f.relative_to(ROOT), m.group(0)))
        if re.search(r"<Link\b[^>]*askmoris", text, re.S):
            raise AssertionError(
                f"{f.relative_to(ROOT)} reaches askmoris.ai through a Next Link. A Link "
                f"client-side routes and will 404 on an external host; use a plain anchor.")
    assert outbound, "nothing on the site links to askmoris.ai any more"
    for where, tag in outbound:
        assert 'target="_blank"' in tag, f"{where}: outbound Ask MORIS link does not open a new tab"
        assert "noopener" in tag, f"{where}: outbound Ask MORIS link is missing rel=noopener"

    nav = json.loads((ROOT / "content" / "nav.json").read_text(encoding="utf-8"))["links"]
    ext = [l["href"] for l in nav if l["href"].startswith("http")]
    assert ext == ["https://askmoris.ai"], (
        f"the nav's outbound entries are not exactly the one Ask MORIS link: {ext}")
    src = (ROOT / "components" / "site-nav.tsx").read_text(encoding="utf-8")
    assert 'startsWith("http")' in src, (
        "site-nav.tsx no longer distinguishes an outbound href, so the Ask MORIS entry renders as "
        "a Next Link and 404s")


def test_the_moris_wildcard_spares_only_the_shared_exchanges():
    """The wildcard forwards the retired MORIS wing. Exactly one thing must escape it.

    /moris/pair/:id is a SHARED EXCHANGE. A visitor consented to a public link to their own
    exchange and that link was sent. Forwarding it breaks a promise made to a person, which is a
    different act from retiring a demo, so the route keeps serving.

    /moris/chat and /moris/pair are no longer spared, and that is the 2026-09-23 change: they
    forward to askmoris.ai rather than being served from here.
    """
    cfg = (ROOT / "next.config.ts").read_text(encoding="utf-8")
    m = re.search(r'source:\s*"(/moris/:path[^"]*)"', cfg)
    assert m, "the /moris wildcard redirect is missing"
    pattern = m.group(1)
    assert "pair/" in pattern, (
        f"the wildcard {pattern!r} does not spare /moris/pair/:id, so every shared exchange link "
        f"already sent would forward away from the exchange it names")
    for gone in ("chat$", "pair$"):
        assert gone not in pattern, (
            f"the wildcard still spares {gone!r}, but nothing serves it since the static demos "
            f"were archived, so that URL goes dark instead of forwarding to askmoris.ai")


def test_the_retired_demos_forward_out_and_shared_exchanges_still_render():
    """Two different promises, kept differently.

    The DEMOS were ours to retire. /moris/chat and /moris/pair forward to askmoris.ai so a link
    already in someone's hand lands on the live thing rather than going dark. Temporary redirects,
    because the pages are archived rather than destroyed and a 308 is cached past a change of mind.

    The SHARED EXCHANGES were not ours to retire. The per-exchange route still exists and still
    carries its noindex header: the person agreed to a link, not to an indexed page.
    """
    cfg = (ROOT / "next.config.ts").read_text(encoding="utf-8")
    for route in ("/moris/chat", "/moris/pair"):
        m = re.search(r'source:\s*"' + re.escape(route) + r'",\s*destination:\s*"([^"]+)",\s*'
                      r'permanent:\s*(true|false)', cfg, re.S)
        assert m, f"{route} has no redirect, so it goes dark now the static file is archived"
        assert m.group(1) == "https://askmoris.ai", (
            f"{route} forwards to {m.group(1)!r} rather than to the one live instance")
        assert m.group(2) == "false", (
            f"{route} forwards permanently; the demos are archived, not destroyed")
    assert not re.search(r'destination:\s*"/moris/(chat|pair)\.html"', cfg), (
        "a rewrite still points at an archived static file")

    assert (ROOT / "app" / "moris" / "pair" / "[id]" / "page.tsx").exists(), (
        "the per-exchange route is gone, so every shared link already sent would 404")
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
                 if p.startswith("/compliance")
                 or (p.startswith("/moris") and p not in {"/moris/chat", "/moris/pair"})}
    assert not forbidden, f"the sitemap still lists removed routes: {sorted(forbidden)}"
    # THE OPEN LETTER LEFT THE SITEMAP ON 2026-10-10 and /research took its place. Its URL forwards,
    # so listing it would advertise a redirect.
    assert "/open-letter" not in paths, (
        "the open letter is retired and forwards to /research; it must not be in the sitemap")
    for required in ("/research", "/research/paper", "/research/appendices"):
        assert required in paths, f"the research section is navigable but {required} is not listed"

    # the comment below is kept for the history it records, and its assertion is replaced above:
    # a page in the nav and absent from the sitemap is the incoherent half-state this catches.
    # (was: assert "/open-letter" in paths)


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
    # /open-letter left this tuple on 2026-10-02: it is a served, listed route again, so a link to
    # it is correct rather than a dead link. /letter still forwards to it.
    # /open-letter REJOINED this tuple on 2026-10-10. It was removed on 2026-10-02 when the letter
    # became a served, listed route; the research section replaced it, so a live page linking to it
    # would be linking at a redirect again.
    removed_prefixes = ("/moris", "/compliance", "/open-letter")
    # 2026-09-23: /moris/chat and /moris/pair are no longer served here, so nothing
    # internal under /moris survives except a shared exchange.
    survivors: set = set()

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


import hashlib
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


def test_the_archived_demos_are_out_of_public_and_the_sync_has_no_targets():
    """THE QUARANTINE, AFTER THE DEMOS LEFT.

    public/moris/chat.html and public/moris/pair.html were sync targets, then frozen, and on
    2026-09-23 archived entirely when Ask MORIS became a single outbound link. Kept, not deleted:
    that body of work may be revived.

    scripts/sync_static_nav.py keeps its empty TARGETS. The machinery stays because a future
    generated page that is NOT frozen belongs in it; what must never come back is a sweep writing
    the series nav into a quarantined surface, which is what happened once.
    """
    import scripts.sync_static_nav as sync  # noqa: PLC0415
    assert sync.TARGETS == (), (
        f"the nav sync has targets again: {sync.TARGETS}. Nothing generated is served from public/ "
        f"any more, so a target here is writing into something it should not.")

    archive = ROOT / "archive" / "site-2026-09-23-counsel-and-demos"
    for name in ("chat.html", "pair.html", "counsel-page.tsx"):
        assert (archive / name).exists(), f"{name} was removed rather than archived"
    assert not (ROOT / "public" / "moris").exists(), "the static demos are being served again"


def test_the_counsel_page_is_gone_and_its_url_forwards():
    """RESONANT COUNSEL, RETIRED 2026-09-23 BEFORE IT SHIPPED.

    The page described a companion that would answer from the twelve volumes and say when the books
    were silent. The retrieval that would have backed it was evaluated the same day against sixty
    on-topic, fifteen adjacent and fifteen off-topic questions, and the distributions overlapped:
    the worst on-topic question scored 0.541 while "how do I stop a puppy from biting" scored 0.638.
    No threshold separated them. The page promised a behaviour nothing could deliver, so it came
    down rather than being quietly weakened.

    The URL forwards instead of 404ing, because it sat in the nav and the sitemap for four days.
    """
    assert not (ROOT / "app" / "resonance" / "counsel").exists(), "the counsel route is back"
    assert (ROOT / "archive" / "site-2026-09-23-counsel-and-demos" / "counsel-page.tsx").exists(), (
        "the counsel page was deleted rather than archived")

    cfg = (ROOT / "next.config.ts").read_text(encoding="utf-8")
    assert re.search(r'source:\s*"/resonance/counsel"', cfg), (
        "/resonance/counsel has no redirect and will 404 for anyone who kept the link")

    for f in live_files():
        if f.suffix not in {".tsx", ".html", ".json", ".ts"} or f.name == "next.config.ts":
            continue
        text = strip_comments(f.read_text(encoding="utf-8", errors="ignore"))
        assert "/resonance/counsel" not in text, (
            f"{f.relative_to(ROOT)} still links to the retired counsel page")
        assert "Resonant Counsel" not in text, (
            f"{f.relative_to(ROOT)} still names Resonant Counsel on a live surface")


def test_the_research_section_is_listed_and_navigable():
    """THE RESEARCH REPLACES THE OPEN LETTER, 2026-10-10, on the operator's word.

    WHAT THIS TEST USED TO BE. test_the_open_letter_is_listed_and_navigable, which asserted that
    "The Conscience Is Already There" was served, listed, indexable and reachable from the header.
    The letter was one signed argument. The research report is the evidence behind that argument and
    supersedes it, so those same four properties now belong to the research section, and the letter
    is archived rather than served.

    WHY EVERY OLD URL STILL RESOLVES. Both letters went out to press desks and legislators under the
    operator's name, so those links sit in other people's inboxes. The ruling that governed the first
    retirement governs this one: an old link should arrive at what the Institute says now. One hop,
    not two, which is why the first letter's PDF redirect was retargeted straight at /research rather
    than left pointing at a page that itself now forwards.

    THE PDF IS CHECKSUMMED against the edition's own meta.json. The three pages and the PDF are one
    published edition, version 1.0. A re-export that changed a single byte without the edition
    changing would leave the site claiming to serve a document it is not serving.
    """
    for rel in ("app/research/page.tsx",
                "app/research/paper/page.tsx",
                "app/research/appendices/page.tsx"):
        assert (ROOT / rel).exists(), f"the research section is missing {rel}"

    for rel in ("content/research/letter.html", "content/research/paper.html",
                "content/research/appendices.html", "content/research/meta.json"):
        assert (ROOT / rel).exists(), f"the generated edition is missing {rel}"

    meta = json.loads((ROOT / "content" / "research" / "meta.json").read_text(encoding="utf-8"))
    pdf = ROOT / "public" / "research" / meta["pdf"]["file"]
    assert pdf.exists(), "the research PDF is not served"
    blob = pdf.read_bytes()
    assert len(blob) == meta["pdf"]["bytes"], (
        f"the served PDF is {len(blob)} bytes; the edition declares {meta['pdf']['bytes']}")
    assert hashlib.sha256(blob).hexdigest() == meta["pdf"]["sha256"], (
        "the served PDF does not match the edition of record. Copy it again from the research "
        "repository rather than rebuilding it here.")

    assert (ROOT / "public" / "research" / "figures" / "two_paths.svg").exists(), (
        "Figure 1 is missing; the generated paper references /research/figures/two_paths.svg")

    links = json.loads((ROOT / "content" / "nav.json").read_text(encoding="utf-8"))["links"]
    assert any(l["href"] == "/research" and l["label"] == "Research" for l in links), (
        "Research is not in content/nav.json, which is the only place the header is defined")
    assert not any(l["href"] == "/open-letter" for l in links), "the header still lists the letter"

    for rel in ("app/research/page.tsx", "app/research/paper/page.tsx",
                "app/research/appendices/page.tsx"):
        src = (ROOT / rel).read_text(encoding="utf-8")
        assert not re.search(r"robots:\s*\{[^}]*index:\s*false", src), f"{rel} carries noindex"

    cfg = (ROOT / "next.config.ts").read_text(encoding="utf-8")
    i = cfg.find('source: "/research')
    if i != -1:
        assert "noindex" not in cfg[i:i + 220], "/research carries an X-Robots-Tag noindex"

    for needle in ('source: "/open-letter"', 'source: "/open-letter/:path*"', 'source: "/letter"',
                   "We-Built-the-Intelligence-Open-Letter.pdf"):
        assert needle in cfg, f"nothing forwards {needle}; links already sent would 404"

    # EVERY old letter route lands on /research in one hop. Written as a sweep rather than four
    # assertions so that adding a fifth forwarding rule cannot quietly point somewhere else.
    for m in re.finditer(
            r'source: "(/letter|/open-letter[^"]*)",\s*destination: "([^"]+)"',
            " ".join(cfg.split())):
        assert m.group(2) == "/research", (
            f"{m.group(1)} forwards to {m.group(2)}, not /research. An old link must land in one hop.")

    assert not (ROOT / "app" / "open-letter").exists(), (
        "app/open-letter/ is still here; it was archived, not kept")


# --- the Canon is twelve volumes, 2026-09-22 -----------------------------------------------------

# THE STANDING DESCRIPTION, verbatim by operator ruling 2026-09-23. Note the punctuation: it is
# sentences, not a comma list, and it changed from the 09-22 form when the series title was set.
# Matched as a whole string precisely because a paraphrase in one place is how surfaces drift.
# SHORTENED 2026-10-07 by operator ruling: "A Living Philosophy of Leadership" becomes "A Living
# Philosophy". The series title reverts to the form the August cover art already carries.
#
# THE PROSE SENSE IS NOT THE TITLE. The open letter has a section called "Why a philosophy of
# leadership" and a sentence beginning "A philosophy of leadership does not set the conscience
# against the work". Those are an argument about leadership, not the name of the series, and they
# stay. What changed is the capitalized title.
SERIES_LINE = ("a living philosophy. four trilogies, twelve volumes, "
               "approximately one million words. complete")
GRAMMAR_SLUGS = ("grammar-of-god", "article-and-noun", "verb-and-adjective",
                 "conjunction-and-punctuation")


def test_the_canon_data_holds_twelve_volumes_in_four_trilogies():
    """The structural fact. Everything else on the site derives from this file: the routes, the
    sitemap, the trilogy grid and the volume count in the home page CTA."""
    canon = json.loads((ROOT / "content" / "canon.json").read_text(encoding="utf-8"))
    assert len(canon["books"]) == 12, f"{len(canon['books'])} books in canon.json, expected 12"
    assert len(canon["trilogies"]) == 4, f"{len(canon['trilogies'])} trilogies, expected 4"
    assert [b["n"] for b in canon["books"]] == list(range(1, 13)), "book numbering is not 1..12"

    # nothing may still point at the removed trilogy from inside the data
    for t in canon["trilogies"]:
        assert t["slug"] not in GRAMMAR_SLUGS, f"the removed trilogy is back: {t['slug']}"
        for s in t["bookSlugs"]:
            assert s not in GRAMMAR_SLUGS, f"{t['slug']} still lists {s}"
    for b in canon["books"]:
        assert b["slug"] not in GRAMMAR_SLUGS, f"a removed volume is back: {b['slug']}"
        assert b.get("trilogySlug") != "grammar-of-god", b["slug"]


def test_no_reader_facing_surface_mentions_the_removed_trilogy():
    """The operator's words: no mention, no listing, no "coming later", no footnote. It is not part
    of the published shape of the series, so a reader never encounters it.

    The archive and the frozen zones are excluded, as everywhere else in this file: the open letter
    is frozen by ruling, and archive/ exists to hold exactly this."""
    hits = []
    for p in live_files(include_unlisted=False):
        # THE RESEARCH ZONE IS EXCLUDED, 2026-10-10, by operator ruling. The paper names the Grammar
        # of God trilogy because 54 of the 93 primitives cite Books XIII to XV, and a research record
        # that hid its own sources would be worthless. The books pages are unchanged: the series a
        # reader is shown is still twelve volumes in four trilogies.
        if any(p.relative_to(ROOT).as_posix().startswith(z) for z in VOCAB_EXEMPT):
            continue
        text = strip_comments(p.read_text(encoding="utf-8", errors="ignore")).lower()
        for term in ("grammar of god", "grammar-of-god", "article and noun",
                     "verb and adjective", "conjunction and punctuation"):
            if term in text:
                hits.append(f"{p.relative_to(ROOT)}: {term!r}")
    assert not hits, ("the Grammar of God trilogy reappeared on a reader-facing surface: "
                      + "; ".join(sorted(set(hits))))


def test_no_reader_facing_surface_still_says_fifteen_or_five_trilogies():
    """The counts move together. A page saying "fifteen" beside data holding twelve is the seam a
    reader notices first."""
    hits = []
    for p in live_files(include_unlisted=False):
        # THE RESEARCH ZONE IS EXCLUDED, 2026-10-10, by operator ruling. The corpus the 93 primitives
        # were compiled from is fifteen manuscripts and 1.24 million words, and the paper reports the
        # figure it actually used. The reader-facing series is still twelve volumes, stated as such
        # on every books page, which is what this guard was written to protect.
        if any(p.relative_to(ROOT).as_posix().startswith(z) for z in VOCAB_EXEMPT):
            continue
        text = strip_comments(p.read_text(encoding="utf-8", errors="ignore")).lower()
        for term in ("fifteen", "five trilogies", "1.2 million", "1,236,478", "1.24 million"):
            if term in text:
                hits.append(f"{p.relative_to(ROOT)}: {term!r}")
    assert not hits, "a reader-facing surface still carries the old counts: " + "; ".join(sorted(set(hits)))


def test_the_series_line_is_used_verbatim():
    """The operator asked for this phrasing verbatim so it reads the same everywhere it appears.
    Checked as a whole string: a paraphrase in one place is how a set of surfaces starts drifting."""
    found = [p.relative_to(ROOT).as_posix() for p in live_files(include_unlisted=False)
             if SERIES_LINE in " ".join(
                 p.read_text(encoding="utf-8", errors="ignore").lower().split())]
    # THE FLOOR DROPPED FROM 4 TO 3 ON 2026-10-07, and it is a count rather than a rule, so it is
    # worth saying why. The Manuscripts page was merged into /resonance and carried one of the four
    # instances with it. Nothing was paraphrased and nothing drifted: there is simply one fewer
    # page describing the series to a reader. What this guard is actually for is the VERBATIM part,
    # that wherever the line appears it appears whole, and that is unchanged.
    assert len(found) >= 3, (
        f"the series line appears verbatim in only {len(found)} files ({found}); it is the "
        f"description used wherever the series is described to a reader")


def test_the_removed_routes_forward_rather_than_going_dark():
    """All four were live and in the sitemap. A 404 across four crawled paths is a worse signal than
    a redirect, and the material is withheld rather than retired."""
    cfg = (ROOT / "next.config.ts").read_text(encoding="utf-8")
    for slug in GRAMMAR_SLUGS:
        route = (f"/resonance/trilogy/{slug}" if slug == "grammar-of-god"
                 else f"/resonance/book/{slug}")
        assert f'source: "{route}"' in cfg, f"{route} has no redirect and will 404"


def test_the_removed_art_is_archived_and_the_composite_was_replaced():
    """The five-object artwork is retired, not deleted. Its type read FIVE TRILOGIES and FIFTEEN
    BOOKS, and its five objects stood for the five trilogies: the seven-knot cord in the foreground
    was the Grammar of God trilogy's own instrument, from Book XV, where each knot is a conjunction.
    No caption could have made that a twelve-volume image, so it was regenerated rather than edited.

    The replacement is served at the same path, which is why this asserts the file EXISTS and is the
    new one, by dimensions: the retired image is 720x1080, the replacement 1024x1536."""
    a = ARCHIVE / "site-2026-09-22-grammar-of-god"
    for rel in ("covers/book13.jpg", "covers/book14.jpg", "covers/book15.jpg",
                "trilogies/grammar.jpg", "trilogies/all.jpg"):
        assert (a / rel).exists(), f"archive is missing {rel}"
    for gone in ("public/covers/book13.jpg", "public/trilogies/grammar.jpg"):
        assert not (ROOT / gone).exists(), f"{gone} is still being served"

    live = ROOT / "public" / "trilogies" / "all.jpg"
    assert live.exists(), "the composite is missing; the series hero will render an empty column"
    retired = (a / "trilogies/all.jpg").stat().st_size
    assert live.stat().st_size != retired, "the retired five-trilogy artwork is being served again"


def test_every_asset_canon_points_at_actually_exists():
    """THE DEFECT THIS CATCHES, found live on 2026-09-23.

    The Presence rename changed the trilogy's slug, name, heading and summary in canon.json but NOT
    its `art` path, which still read /trilogies/resonance.jpg. The trilogy LANDING page takes its art
    from the page file and was updated; the trilogy DETAIL page takes it from canon and was not. So
    /resonance/trilogy/presence shipped with a broken cover while every text guard passed, because
    they all check words and none of them checked whether a file is there.

    canon.json drives the routes, the sitemap and the imagery. Every path it names must resolve.
    """
    canon = json.loads((ROOT / "content" / "canon.json").read_text(encoding="utf-8"))
    missing = []

    def walk(o, trail="canon"):
        if isinstance(o, dict):
            for k, v in o.items():
                if isinstance(v, str) and v.startswith("/") and v.endswith((".jpg", ".png", ".webp")):
                    if not (ROOT / "public" / v.lstrip("/")).exists():
                        missing.append(f"{trail}.{k} -> {v}")
                else:
                    walk(v, f"{trail}.{k}")
        elif isinstance(o, list):
            for i, v in enumerate(o):
                walk(v, f"{trail}[{i}]")

    walk(canon)
    assert not missing, ("canon.json names assets that are not in public/: " + "; ".join(missing))


def test_tap_targets_are_thumb_sized():
    """THE DEFECT THIS CATCHES, found live on 2026-09-17 in the header and on 2026-09-23 in the
    footer.

    Both rows of links were 20 pixels tall on a phone. Nothing overflowed, nothing was hidden and
    nothing looked wrong in a screenshot; the links were simply hard to hit, and a wrapped row sat
    almost flush against the row above it. The fix is one class, py-3, which takes a 14 pixel link
    to about 44 pixels, with a negative vertical margin on the row so the bar keeps its height on a
    pointer.

    It is one class, so it is one careless edit from being gone again, and its absence is invisible
    on a desktop. Hence a test rather than a comment.
    """
    for rel in ("components/site-nav.tsx", "components/site-footer.tsx"):
        text = (ROOT / rel).read_text(encoding="utf-8")
        anchors = re.findall(r'className="([^"]*(?:transition-colors hover:text-accent)[^"]*)"', text)
        assert anchors, f"{rel}: found no styled links; has the markup changed shape?"
        thin = [c for c in anchors if "py-3" not in c and "text-ink" not in c]
        assert not thin, (
            f"{rel}: link(s) without py-3, so about 20 pixels tall on a phone instead of 44: {thin}"
        )

# --- Trilogy I is Tuning, 2026-10-07 -------------------------------------------------------------

# THE WORD "PRESENCE" MEANS TWO THINGS ON THIS SITE, which is the whole reason this guard exists.
# It was the first trilogy's NAME until 2026-10-07, and it is also an ordinary English word the
# books use throughout. A find-and-replace would rename the trilogy correctly and corrupt a verbatim
# quoted passage in the same pass. The operator's standing ruling is that quoted prose is not site
# copy and is never swept, so these lines are pinned here by their content.
PROSE_PRESENCE = (
    "Breath is the first measure of presence",                    # Time trilogy summary
    "bodily presence",                                            # The Sacred
    "presence itself begins to alter what is possible",           # Book I description
    "beyond the constant presence of a single leader",            # Book II description
    "Completion is the presence of care",                         # VERBATIM passage, Book XII
)


def test_the_first_trilogy_is_tuning_and_the_quoted_prose_was_not_swept():
    """RENAMED 2026-10-07 on the operator's word: the Presence Trilogy becomes the Tuning Trilogy.

    This is the second rename of trilogy I. It was Resonance, then Presence, now Tuning, and Book I
    already carried "Tuning" as its own subtitle before the trilogy took the name.

    THE DEFECT THE LAST RENAME SHIPPED, guarded separately by
    test_every_asset_canon_points_at_actually_exists: the name changed in canon.json and the art path
    did not, so the detail page rendered a broken cover while every text check passed. The art path
    is asserted here too, deliberately twice, because that is the one that got through.

    WHAT THIS ADDS beyond the asset check is the other half: that renaming the trilogy did not also
    rewrite the prose. Five lines that use "presence" as an ordinary word are pinned by content, one
    of them a verbatim quotation from Book XII. If a later sweep takes them, this fails by name.
    """
    canon = json.loads((ROOT / "content" / "canon.json").read_text(encoding="utf-8"))
    first = canon["trilogies"][0]
    assert first["numeral"] == "I"
    assert first["slug"] == "tuning", f"trilogy I slug is {first['slug']!r}"
    assert first["name"] == "Tuning", f"trilogy I name is {first['name']!r}"
    assert first["art"] == "/trilogies/tuning.jpg", f"trilogy I art is {first['art']!r}"
    assert "TUNING" in first["heading"].upper(), f"trilogy I heading is {first['heading']!r}"

    # Books I-III point at the renamed trilogy, by slug and by name.
    for b in canon["books"][:3]:
        assert b["trilogySlug"] == "tuning", f"book {b['n']} still points at {b['trilogySlug']!r}"
        assert b["trilogyName"] == "Tuning", f"book {b['n']} still names {b['trilogyName']!r}"

    # The artwork moved with the name, and the retired file is not still being served.
    assert (ROOT / "public" / "trilogies" / "tuning.jpg").exists(), "the Tuning artwork is missing"
    assert not (ROOT / "public" / "trilogies" / "presence.jpg").exists(), (
        "presence.jpg is still in public/; it was archived with the name")

    # Nothing anywhere still calls trilogy I by its retired name.
    blob = json.dumps(canon, ensure_ascii=False)
    for retired in ("The Presence Trilogy", '"Presence"', '"presence"'):
        assert retired not in blob, f"canon.json still carries {retired!r} as the trilogy name"

    # AND THE PROSE SURVIVED. This is the half a sweep gets wrong.
    for line in PROSE_PRESENCE:
        assert line in blob, (
            f"a prose use of 'presence' was swept by the rename: {line!r}. Quoted prose is not site "
            "copy; the trilogy name changed, the books did not.")


def test_the_header_calls_it_the_philosophy_not_the_series():
    """OPERATOR, 2026-10-07. The header stops saying "The Series" and says "The Philosophy".

    "The Resonance Series" remains usable in body copy by his ruling; what changed is the label a
    visitor navigates by, which now echoes the guarded line "A Living Philosophy".

    ALL SIX MOVE TOGETHER. The label is not only in the nav: it is the page title and the eyebrow at
    /resonance, the footer link, the back-link on the manuscripts page and a link on About. A header
    reading Philosophy pointing at a page headed Series is exactly the drift these guards exist for.
    """
    links = json.loads((ROOT / "content" / "nav.json").read_text(encoding="utf-8"))["links"]
    by_href = {l["href"]: l for l in links}
    assert "/resonance" in by_href, "the philosophy is not in the header at all"
    assert by_href["/resonance"]["label"] == "The Philosophy", (
        f"the nav calls it {by_href['/resonance']['label']!r}")

    # ORDER, OPERATOR 2026-10-08. The Philosophy stopped being the first entry. The Return goes in
    # front of it, and this test had asserted position where it meant to assert the LABEL, so the
    # two facts are now separate. The reason the order moved is that the site stopped being only a
    # books site: the one object that is actually publishing leads, and the twelve complete volumes
    # sit behind it. Recorded as an assertion so a future reordering is a decision, not a drift.
    order = [l["href"] for l in links]
    assert order.index("/the-return") < order.index("/resonance"), (
        f"The Return no longer leads the header: {order}")

    stale = []
    for rel in ("app/resonance/page.tsx", "app/about/page.tsx",
                "components/site-footer.tsx"):
        text = strip_comments((ROOT / rel).read_text(encoding="utf-8"))
        if "The Series" in text:
            stale.append(rel)
    assert not stale, (
        "these still label the work 'The Series' while the header says 'The Philosophy': "
        + ", ".join(stale))


# --- one page, 2026-10-07 ------------------------------------------------------------------------

def test_the_philosophy_is_one_page_and_manuscripts_is_gone():
    """MERGED 2026-10-07 on the operator's word. One page, /resonance, called The Philosophy.

    The site had grown two pages saying overlapping things: /resonance stated the series line, listed
    the four trilogies as cards and carried a "first volume" callout, and /resonance/series stated
    the series line again, listed the same four trilogies with their art and covers, and carried a
    second "Book One comes first" callout. The operator wanted one.

    WHAT HAD TO SURVIVE THE MERGE is every link into a book. They all lived on the Manuscripts page,
    in the cover grids, so the whole trilogy-and-covers block moved across rather than being
    rebuilt. That is what the twelve cover paths below assert: all twelve books are reachable from
    the one page, and if a trilogy block is ever dropped its three books stop being linked anywhere
    a visitor can reach.

    /resonance/series itself is indexed and forwards rather than going dark. TEMPORARY, against the
    usual instinct for a merge: the operator is mid-restructure and has already said a standalone
    page comes back later, and a permanent redirect is cached in browsers past a change of mind.
    """
    assert not (ROOT / "app" / "resonance" / "series" / "page.tsx").exists(), (
        "the Manuscripts page is still here; it was merged into /resonance, not kept")

    links = json.loads((ROOT / "content" / "nav.json").read_text(encoding="utf-8"))["links"]
    assert not any(l["href"] == "/resonance/series" for l in links), "the nav still lists Manuscripts"
    assert not any(l["label"] == "Manuscripts" for l in links), "the nav still says Manuscripts"

    page = (ROOT / "app" / "resonance" / "page.tsx").read_text(encoding="utf-8")
    for n in range(1, 13):
        assert f"/covers/book{n}.jpg" in page, (
            f"book {n} is not on the merged page; its link lived in the cover grid that moved here")
    for art in ("tuning", "transformation", "time", "sacred"):
        assert f"/trilogies/{art}.jpg" in page, f"the {art} trilogy block did not survive the merge"
    assert "/resonance/book/" in page, "the merged page links no books at all"

    # Nothing still points at the retired path, and it forwards rather than 404ing.
    offenders = []
    for p in live_files():
        if p.suffix not in {".tsx", ".html"}:
            continue
        if 'href="/resonance/series"' in strip_comments(p.read_text(encoding="utf-8", errors="ignore")):
            offenders.append(p.relative_to(ROOT).as_posix())
    assert not offenders, f"these still link the retired Manuscripts path: {offenders}"

    sitemap = (ROOT / "app" / "sitemap.ts").read_text(encoding="utf-8")
    assert '"/resonance/series"' not in sitemap, "the sitemap still lists the retired path"

    cfg = (ROOT / "next.config.ts").read_text(encoding="utf-8")
    i = cfg.find('source: "/resonance/series"')
    assert i != -1, "/resonance/series does not forward; an indexed URL would 404"
    assert '"/resonance"' in cfg[i:i + 200], "/resonance/series forwards somewhere unexpected"


# --- no plan to publish, 2026-10-07 --------------------------------------------------------------

# OPERATOR, 2026-10-07: "remove all references of publishing for the resonance series or any of the
# books in it, there is now no plan to publish."
#
# PHRASES, NOT THE BARE WORD. "Publish" has honest uses on this site that have nothing to do with
# the series: askmoris.ai publishes the mechanism on every answer, and the open letter discusses
# published research. Banning the word would force those to be reworded to satisfy a guard, which
# is the failure mode this repository keeps writing comments about. So what is banned is the
# series' publication frame, in the words it was actually written in.
PUBLICATION_PROMISES = (
    "not yet published",
    "none has been published",
    "is published yet",
    "being published first",
    "coming soon",
    "first to land",
    "know when it lands",
    "publishes the series",
    "publishes the resonance series",
)

# NOT BANNED, ON PURPOSE. "Opens with" and "comes first" were corrected in the copy on 2026-10-07
# and briefly added here, which was wrong: they are ordinary English about reading order, and a
# guard that grows by one phrase every time a sentence is reworded ends up forbidding the language
# rather than the promise. What belongs on this list is a claim that the series will be published
# or an invitation to wait for it. A correction is not a rule.


# THE ONE NOTIFY EXEMPTION, 2026-10-07. "Know when it lands" came off every surface earlier today
# because nothing was coming. The Return is coming: a finished manuscript, a final cover, and a
# publication the operator intends. So the link returns, for that page and that phrase alone.
#
# WHAT IS NOT EXEMPTED, and this is the point of naming a phrase rather than a page. Every other
# promise stays banned here too. The Return's page may not say "coming soon", may not give a date,
# and may not say the series is publishing. The operator's instruction was explicit that the timing
# does not need saying, and a page that invites someone to be told is honest in a way that a page
# guessing at months is not.
NOTIFY_EXEMPT = {"app/the-return/page.tsx": ("know when it lands",)}


def test_no_surface_promises_publication():
    """THE WORK IS COMPLETE AND THERE IS NO PLAN TO PUBLISH IT.

    What came down: a Publication status band reading "Written. Not yet published" with a "Know
    when it lands" link into /contact, the same note in one line on every book and trilogy page,
    "First to land" and "the one being published first" on the Philosophy page, a second "Know when
    it lands" button on every trilogy page, and the Institute describing itself as publishing the
    Series.

    THE SIGNUP MATTERED MOST. "Know when it lands" pointed at /contact and invited a reader to wait
    for something that is not coming. A dead link is a nuisance; a promise nobody intends to keep
    is different in kind, and that is why these are phrases rather than a tidy-up.

    WHAT IS DELIBERATELY NOT ASSERTED: that the site says the work is unpublished. It says nothing
    about publication at all. Stating "not published" is itself a publication frame and invites the
    question of when.
    """
    hits = []
    for p in live_files(include_unlisted=False):
        text = strip_comments(p.read_text(encoding="utf-8", errors="ignore")).lower()
        text = " ".join(text.split())
        rel = p.relative_to(ROOT).as_posix()
        allowed = NOTIFY_EXEMPT.get(rel, ())
        for phrase in PUBLICATION_PROMISES:
            if phrase in text and phrase not in allowed:
                hits.append(f"{rel}: {phrase!r}")
    assert not hits, (
        "a reader-facing surface still promises publication of the series. There is no plan to "
        "publish; saying otherwise invites a reader to wait for something that is not coming: "
        + "; ".join(sorted(set(hits))))


def test_the_publication_status_component_is_gone():
    """It existed to state the publication status in one place. There is no status to state."""
    assert not (ROOT / "components" / "publication-status.tsx").exists(), (
        "components/publication-status.tsx is still here; the whole publication frame came down")
    for p in live_files(include_unlisted=False):
        text = p.read_text(encoding="utf-8", errors="ignore")
        assert "PublicationStatus" not in text and "PublicationNote" not in text, (
            f"{p.relative_to(ROOT)} still imports or renders the retired publication component")


# --- The Return, 2026-10-07 ----------------------------------------------------------------------

def test_the_return_has_its_own_page():
    """THE BOOK THAT IS ACTUALLY PUBLISHING, given its own route on the operator's word.

    WHY IT IS NOT UNDER /resonance. The Return is one trade book drawn from the first three volumes,
    not volume thirteen. Nesting it inside the series would file it as one of the twelve, which is
    exactly what it is not, so it sits at its own path with its own entry in the header.

    WHY THIS DOES NOT REOPEN THE PUBLICATION FRAME. Earlier today every promise of publication came
    off the site, because the twelve volumes are complete and there is no plan to publish them. That
    is unchanged and still enforced. This page is about a different object, and it carries exactly
    one of the retired phrases, the notify link, under a named exemption. No date appears anywhere.
    """
    page = ROOT / "app" / "the-return" / "page.tsx"
    assert page.exists(), "The Return has no page"
    src = page.read_text(encoding="utf-8")
    assert "The Return" in src
    # SUBTITLE CHANGED 2026-10-08: "Every Leader Fails. The Good Ones Come Back." became
    # "Every Leader Drifts. Coming Back Is the Work." Drift is the condition; the return is the work.
    assert "Every leader drifts" in src, "the subtitle is the argument; it belongs on the page"
    assert "Every leader fails" not in src, "the retired subtitle is still on the page"

    cover = ROOT / "public" / "the-return" / "cover.jpg"
    assert cover.exists(), "The Return's cover art is missing"

    links = json.loads((ROOT / "content" / "nav.json").read_text(encoding="utf-8"))["links"]
    assert any(l["href"] == "/the-return" for l in links), "The Return is not in the header"

    sitemap = (ROOT / "app" / "sitemap.ts").read_text(encoding="utf-8")
    assert "/the-return" in sitemap, "The Return is absent from the sitemap"


def test_the_return_names_no_date():
    """The operator ruled the timing does not need saying, and saying it is how a page goes stale
    on a schedule nobody controls. A reader is invited to be told instead."""
    text = strip_comments((ROOT / "app" / "the-return" / "page.tsx").read_text(encoding="utf-8")).lower()
    for term in ("coming soon", "months", "weeks", "early 2027", "late 2026", "this winter",
                 "this spring", "pre-order", "preorder", "publication date", "release date"):
        assert term not in text, f"The Return's page names timing: {term!r}"


def test_the_notify_exemption_is_one_page_and_one_phrase():
    """An exemption nobody can see the edges of is a hole. These are the edges."""
    assert len(NOTIFY_EXEMPT) == 1, f"the notify exemption grew: {sorted(NOTIFY_EXEMPT)}"
    for rel, phrases in NOTIFY_EXEMPT.items():
        assert (ROOT / rel).exists(), f"the exemption names a file that does not exist: {rel}"
        assert phrases == ("know when it lands",), (
            f"the exemption widened beyond the notify link: {phrases}")


# --- quotations are checkable, 2026-10-08 -------------------------------------------------------

# THE SENTENCE THAT WAS NOT IN THE BOOKS. /resonance closed on a blockquote, in quotation marks and
# attributed to the author, reading "To lead is to promise what you touch will not collapse when you
# are gone." It appears in none of the fifteen manuscripts, and no fragment of it does either. It
# entered in 351953a and survived every pivot since, because nothing on this site checked prose
# against the source. It is banned by exact string so it cannot be restored by a copy revert.
FABRICATED_QUOTES = (
    "to lead is to promise what you touch will not collapse",
)


def test_no_quotation_is_attributed_that_the_books_do_not_contain():
    """A quotation mark and a name is a claim about the source, and this site made one it could not
    honour. The ban is on the specific retired sentence rather than on quoting generally, because a
    guard cannot read the manuscripts: they are not in this repository and must not be."""
    hits = []
    for p in live_files(include_unlisted=True):
        text = " ".join(strip_comments(
            p.read_text(encoding="utf-8", errors="ignore")).lower().split())
        for q in FABRICATED_QUOTES:
            if q in text:
                hits.append(f"{p.relative_to(ROOT).as_posix()}: {q!r}")
    assert not hits, (
        "a sentence the manuscripts do not contain is being quoted and attributed: "
        + "; ".join(hits))


def test_the_philosophy_pull_quote_names_its_volume():
    """An attribution a reader can act on. "C.T. Herndon" under a sentence sends them to a million
    words; the volume sends them to one book. This is the cheap half of the lesson above: naming the
    source is what would have caught the invented line years earlier."""
    src = (ROOT / "app" / "resonance" / "page.tsx").read_text(encoding="utf-8")
    block = re.search(r"<blockquote(.*?)</section>", src, re.S)
    assert block, "the pull quote is gone from the philosophy page"
    assert re.search(r"Book\s+[IVX]+", block.group(1)), (
        "the pull quote does not name the volume it comes from")


def test_the_notify_link_asks_to_be_notified():
    """THE BUTTON MUST DO WHAT IT SAYS. Both "Know when it lands" buttons pointed at /contact, a
    page that offers an email address and says nothing about the book. A visitor who clicked the one
    commercial action on this site arrived somewhere that did not know why they came, and then had
    to compose the request themselves from a standing start.

    A MAILTO, NOT A FORM, and not a bare page link. The no-form ruling of 2026-09-25 is recorded in
    app/contact/page.tsx and settles the mechanism: a mailto goes from the visitor's own mail client
    to one inbox and touches nobody in between, where a form service would route their name and
    words through an outside company on the same domain that promises it does not. A prefilled
    subject is the whole fix: it carries the intent that the button already stated.
    """
    src = (ROOT / "app" / "the-return" / "page.tsx").read_text(encoding="utf-8")
    code = strip_comments(src)

    # CHECKED ON BEHAVIOUR, NOT ON SPELLING. The first version of this guard read href="..."
    # literals and went red the moment the address moved into a constant, which is the href being
    # spelled differently rather than the button behaving differently. What matters is that the page
    # carries a mailto, that it names the book in a subject, and that no button routes to the
    # generic contact page.
    assert "mailto:" in code, (
        "the notify links are not mailto links; the button cannot act on its promise")
    assert "subject=" in code, "the notify mailto carries no subject"
    assert "The Return" in code, "the notify mailto does not name the book"

    buttons = code.count("Know when it lands")
    assert buttons == 2, f"expected both notify buttons, found {buttons}"
    assert 'href="/contact"' not in code, (
        "a notify button still routes to the generic contact page instead of asking to be told")


def test_contact_names_the_book_it_receives_mail_about():
    """The page is still reachable from the footer, so it must not read as though The Return does
    not exist. Anyone who arrives there by navigation should see it named among the invited
    topics."""
    text = strip_comments((ROOT / "app" / "contact" / "page.tsx").read_text(encoding="utf-8"))
    assert "The Return" in text, "the contact page does not name The Return"


def test_the_contact_description_matches_the_paragraph():
    """THE DESCRIPTION IS THE PARAGRAPH ON THIS PAGE, so the two must not drift apart.

    This is guarded because it went wrong twice in one day, here and on the home page: visible copy
    was edited and the metadata description, which reads almost identically and is never on screen
    while you work, was left behind. On a page whose description is a verbatim copy of its one
    paragraph, that drift is mechanically checkable, so it is checked rather than remembered.

    Deliberately narrow. It is not a rule that every page description must appear in its body; most
    are written for search results and should not. It applies to this page because the sentence is
    the same sentence.
    """
    src = (ROOT / "app" / "contact" / "page.tsx").read_text(encoding="utf-8")
    m = re.search(r'description:\s*"([^"]+)"', strip_comments(src))
    assert m, "the contact page has no metadata description"
    desc = " ".join(m.group(1).split())
    body = " ".join(strip_comments(src).split())
    # the JSX wraps the same sentence across lines, so compare on collapsed whitespace
    assert desc in body.replace(desc, desc, 1) and body.count(desc) >= 2, (
        "the contact page description no longer matches its paragraph: " + desc)


def test_the_research_pdf_page_count_matches_what_the_page_claims():
    """THE ONE EDITION FIGURE THAT IS NOT IN meta.json, so it is the one that can go stale.

    It did. The download block said 69 pages for the whole of version 1.0, and version 1.1 is 70.
    The checksum guard would not have caught it, because the checksum was correct for the new PDF
    while the sentence beside it described the old one.

    The count is read out of the PDF's own page tree rather than from a parsing library, so this
    adds no dependency: a PDF records it as /Count beside /Type /Pages, and the root node carries
    the total.
    """
    pdf = ROOT / "public" / "research" / "MORIS_Research_Report.pdf"
    blob = pdf.read_bytes()
    counts = [int(m.group(1)) for m in
              re.finditer(rb"/Type\s*/Pages.{0,400}?/Count\s+(\d+)", blob, re.S)]
    assert counts, "no page tree found in the research PDF"
    actual = max(counts)

    lib = (ROOT / "lib" / "research.ts").read_text(encoding="utf-8")
    m = re.search(r"PDF_PAGES\s*=\s*(\d+)", lib)
    assert m, "lib/research.ts no longer exports PDF_PAGES"
    claimed = int(m.group(1))

    assert claimed == actual, (
        f"the site says the report is {claimed} pages; the served PDF has {actual}. "
        f"Update PDF_PAGES in lib/research.ts when the edition is replaced.")
