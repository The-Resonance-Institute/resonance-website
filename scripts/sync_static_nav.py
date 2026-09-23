"""Generate the site header inside the static pages from content/nav.json.

WHY THIS SCRIPT EXISTS. The header lived in three hand-maintained places: components/site-nav.tsx and
a copied block inside each of public/moris/chat.html and public/moris/pair.html. Those two are served
as plain HTML with deliberately isolated stylesheets, so they cannot import the React component. On
2026-09-19 that cost a live page: pair.html was sitting in archive/ when the books-first nav sweep
ran, came back hours later still carrying the pre-pivot header, and shipped pointing at MORIS, Demos
and Compliance. Every one of those links answered 307 rather than 404 because of the pivot's own
redirects, so nothing looked broken and only the operator noticed.

content/nav.json is now the single source. site-nav.tsx imports it. This script writes it into the
static pages. Nobody edits a header by hand again.

USAGE
    python scripts/sync_static_nav.py          rewrite the static pages from the JSON
    python scripts/sync_static_nav.py --check  report drift and exit 1, changing nothing

The --check mode is what the test runs, so a change to nav.json that was never synced fails the
suite rather than reaching the site.
"""
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
SOURCE = ROOT / "content" / "nav.json"
# Every generated page that carries its own copy of the header.
#
# EMPTY SINCE 2026-09-23, AND THAT IS THE POINT. The two static pages that used to be synced here,
# public/moris/chat.html and public/moris/pair.html, are FROZEN by operator ruling: no edits, no
# sweeps, no consistency pass. They keep the old series title, the old volume count and their own
# Ask MORIS header, because they are a separate body of work that may be revived.
#
# This script ran against them once by habit during the Resonant Counsel rename and wrote a series
# link into a quarantined surface. That is the exact failure the quarantine exists to prevent, and
# it is why the list is empty rather than the script deleted: a future generated page that is NOT
# frozen belongs here, and the machinery should be waiting for it.
TARGETS: tuple = ()

OPEN = '<div class="site-nav__links">'
CLOSE = "</div>"


def render(links) -> str:
    """The exact markup the static pages use: one anchor per link, no whitespace between them.

    The run is deliberately unbroken. These pages style the row with flex and a gap; whitespace
    between anchors renders as an extra text node and shifts the spacing away from the React nav's.
    """
    inner = "".join(f'<a href="{l["href"]}">{l["label"]}</a>' for l in links)
    return OPEN + inner + CLOSE


def block_span(text: str, path: str):
    start = text.find(OPEN)
    if start == -1:
        raise SystemExit(f"{path}: no {OPEN} block found; the header markup has changed shape")
    end = text.find(CLOSE, start + len(OPEN))
    if end == -1:
        raise SystemExit(f"{path}: {OPEN} is never closed")
    return start, end + len(CLOSE)


def main() -> int:
    check = "--check" in sys.argv
    links = json.loads(SOURCE.read_text(encoding="utf-8"))["links"]
    if not links:
        raise SystemExit("content/nav.json lists no links; refusing to empty every header")
    wanted = render(links)

    drifted = []
    for rel in TARGETS:
        p = ROOT / rel
        # newline="" keeps the file's own line endings; this repo has a guard that trips when a
        # write flips them, and a whole-file rewrite is exactly where that happens.
        with open(p, "r", encoding="utf-8", newline="") as f:
            text = f.read()
        start, end = block_span(text, rel)
        if text[start:end] == wanted:
            continue
        drifted.append(rel)
        if not check:
            with open(p, "w", encoding="utf-8", newline="") as f:
                f.write(text[:start] + wanted + text[end:])

    if check:
        if drifted:
            print("static headers are out of date with content/nav.json: " + ", ".join(drifted))
            print("run: python scripts/sync_static_nav.py")
            return 1
        print("static headers match content/nav.json")
        return 0

    print(f"synced {len(drifted)} of {len(TARGETS)} static headers"
          + (": " + ", ".join(drifted) if drifted else " (all already current)"))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
