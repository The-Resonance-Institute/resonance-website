"""The shared page's noindex rides as a response header too, not only as a meta tag.

The meta tag covers a crawler that parses the HTML. A header covers everything else that fetches the
URL, and it is what the first live verification (2026-09-08) found absent: the tag was there and the
X-Robots-Tag header was empty. Both now, from the site's own config, for the shared route only.
"""
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]
CONFIG = ROOT / "next.config.ts"


def test_the_shared_route_sends_x_robots_tag_noindex():
    s = CONFIG.read_text(encoding="utf-8")
    assert "async headers()" in s or "headers()" in s, "next.config.ts must declare headers()"
    block = re.search(r"source:\s*['\"]/moris/pair/:id['\"](.*?)\]\s*,?\s*\}", s, re.S)
    assert block, "a headers entry for /moris/pair/:id"
    assert "X-Robots-Tag" in block.group(1) and "noindex, nofollow" in block.group(1)
