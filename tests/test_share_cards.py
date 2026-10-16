"""EVERY PAGE LEADS ITS OWN LINK PREVIEW (2026-10-16). Next.js replaces the layout's openGraph and
twitter objects rather than merging them, so a page that sets only a title and a description is
shared with the layout's card: a link to See VERUS once previewed as a card about the books. Every
page with metadata either calls lib/share.ts or sets its own openGraph."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def test_every_page_with_metadata_sets_its_own_card():
    bare = []
    for p in sorted((ROOT / "app").rglob("page.tsx")):
        text = p.read_text(encoding="utf-8")
        has_meta = "export const metadata" in text or "generateMetadata" in text
        if has_meta and "share(" not in text and "openGraph" not in text:
            bare.append(p.relative_to(ROOT).as_posix())
    assert not bare, "pages shared with the site's default card instead of their own: " + ", ".join(bare)


def test_the_default_card_describes_the_studio_not_only_the_series():
    layout = (ROOT / "app" / "layout.tsx").read_text(encoding="utf-8")
    assert "software held to the same standard" in layout
