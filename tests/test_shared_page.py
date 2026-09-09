"""The shared-exchange page: a fetch and never the mechanism, out of the index, a generic preview.

Operator's ruling, 2026-09-08. One URL renders one consented exchange whole: the message, both answers,
the seat, the verdict and its weight, a way to run your own, the disclosure, and the expiry. The page
carries noindex, is not in the sitemap, and its link preview carries nothing of the person's: the same
title and description for every shared page.
"""
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]
PAGE = ROOT / "app" / "moris" / "pair" / "[id]" / "page.tsx"
SITEMAP = ROOT / "app" / "sitemap.ts"


def src():
    assert PAGE.exists(), "app/moris/pair/[id]/page.tsx does not exist"
    return PAGE.read_text(encoding="utf-8")


def test_the_page_exists_and_is_a_fetch_of_the_api_and_nothing_more():
    s = src()
    assert "fetch(" in s and "/api/pair/share/" in s
    assert "force-dynamic" in s or "no-store" in s, "a shared page is read at request time, never cached at build"


def test_the_page_is_out_of_the_index_and_out_of_the_sitemap():
    s = src()
    assert re.search(r"robots:\s*\{[^}]*index:\s*false", s), "noindex in the page's metadata"
    assert re.search(r"follow:\s*false", s)
    assert "pair/[id]" not in SITEMAP.read_text(encoding="utf-8") and "share" not in SITEMAP.read_text(encoding="utf-8").lower()


def test_the_preview_is_generic_and_carries_nothing_of_theirs():
    s = src()
    meta = s[s.index("generateMetadata"):s.index("export default")]
    assert "Two answers, one conscience" in meta
    # THE SIGNATURE IS EMPTY. The framework hands generateMetadata the route's params and the parent
    # metadata; a function that declares neither cannot read the id, and so cannot fetch the row. A
    # framework upgrade cannot change what a function with no parameters can see. It also awaits
    # nothing: a preview that is computed and not fetched has nothing to wait for.
    assert re.search(r"export\s+async\s+function\s+generateMetadata\s*\(\s*\)", s), \
        "generateMetadata must take no parameters at all"
    assert "await" not in meta, "the preview must not wait on anything; it reads nothing"
    # It takes no params, fetches nothing and reads no row, so it cannot leak what it never saw.
    for leak in ("params", "fetch(", "row", "API"):
        assert leak not in meta, f"the preview must not carry the person's words: {leak}"


def test_the_page_renders_the_whole_exchange_and_the_way_to_run_your_own():
    s = src()
    for needle in ("message", "raw_answer", "governed_answer", "verdict", "concern_mass", "blank_count",
                   "expires_at", 'href="/moris/pair"', "Output is generated automatically"):
        assert needle in s, needle
    assert "notFound()" in s, "an unknown or expired id is a 404, not an empty page"
