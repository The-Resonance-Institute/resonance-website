"""This repository is public. The mechanism must never appear in it.

WHY THIS TEST IS IN THE PUBLIC REPO AND NOT THE PRIVATE ONE. The private API repo can prove things
about itself all day; none of that stops a well-meaning change HERE from vendoring the runtime to make
a build work. The mistake this guards against does not look like a mistake at the time. It looks like
"the API call is awkward in local dev, I'll just import the judge directly", or a bundler configured to
copy a sibling directory, or someone committing a debugging fixture with a semantic card pasted into
it. Each of those publishes, irreversibly, the runtime that is the subject of a filed utility
patent. Anyone can clone this repo; a git revert does not un-clone it.

WHAT CHANGED ON 2026-09-23, AND WHY THIS GUARD DID NOT. The stakes used to be stated as "the thing
the site itself says is disclosed only under NDA". That NDA is gone: askmoris.ai now publishes the
reading, the primitives that fired with the passages behind them, and the packet delivered to the
answering model with its digests. So the reason is no longer confidentiality.

It is that DISCLOSING THE OUTPUT AND SHIPPING THE ENGINE ARE DIFFERENT ACTS. Showing what a judgment
weighed, on a service you control, is the product. Committing the runtime and the 93 semantic cards
into a public repository hands anyone a copy of the patented mechanism, permanently, with no service
and no attribution around it. A stale rationale is worse than none, because the next person to read
it can check that the NDA no longer exists and conclude the guard has expired. It has not.

WHAT IS ALLOWED. This site may talk to the judging service over HTTPS and render what it returns. It
may not contain the runtime, the semantic cards, or a path that reaches into the research repository.

IF THIS GOES RED, DO NOT ADD AN EXCEPTION. Move the code behind the API instead.
"""
import pathlib
import re
import subprocess

ROOT = pathlib.Path(__file__).resolve().parents[1]

# Only files git actually tracks. Untracked scratch files are the developer's business; the exposure is
# what gets pushed, and what gets pushed is what git knows about.
def tracked() -> list:
    out = subprocess.run(["git", "ls-files"], cwd=ROOT, capture_output=True, text=True, check=True)
    return [p for p in out.stdout.splitlines() if p.strip()]


SELF = "tests/test_no_mechanism_here.py"


def test_the_runtime_package_is_not_here():
    """A `moris` directory holding PYTHON. The site has a perfectly legitimate `app/moris/` route, and
    a matcher that flagged any path containing "moris" would be red on a clean tree from day one --
    which is worse than no guard at all, because the first person to hit it deletes it. The runtime is
    a Python package; this site contains no Python but its own tests. That is the distinguishing fact,
    so that is what the test keys on."""
    offenders = [p for p in tracked()
                 if p.endswith(".py") and "moris" in pathlib.PurePosixPath(p).parts[:-1]]
    assert not offenders, (
        f"the MORIS runtime is in the public repo: {offenders[:5]}. "
        f"It belongs in the private API repo. Move it back and call the endpoint instead.")


def test_no_semantic_card_is_here():
    """The cards are the authored law. One is as disclosing as ninety-three."""
    offenders = [p for p in tracked()
                 if re.search(r"(^|/)CP\d{3}[^/]*\.(ya?ml|json|md)$", p, re.I)
                 or "semantic_cards/" in p]
    assert not offenders, f"semantic cards in the public repo: {offenders[:5]}"


def test_nothing_reaches_into_the_research_repo():
    """A relative path out of this tree is a build that works on one laptop and publishes on the next."""
    bad = []
    for rel in tracked():
        if rel == SELF or not re.search(r"\.(ts|tsx|js|jsx|mjs|cjs|json|py|yml|yaml)$", rel):
            continue
        p = ROOT / rel
        if not p.exists():
            continue
        try:
            text = p.read_text(encoding="utf-8", errors="strict")
        except (UnicodeDecodeError, OSError):
            continue
        for pat in (r"Moris_Final", r"Moris_asset", r"resonance-api[/\\]", r"\.\./\.\./Moris"):
            if re.search(pat, text):
                bad.append(f"{rel}: {pat}")
    assert not bad, f"references into the research or API repo: {bad[:5]}"


def test_no_card_or_primitive_text_is_pasted_anywhere():
    """Guards the copy-paste route, which no path check would catch."""
    hits = []
    for rel in tracked():
        if rel == SELF or not re.search(r"\.(ts|tsx|js|jsx|json|md|html)$", rel):
            continue
        p = ROOT / rel
        if not p.exists():
            continue
        try:
            text = p.read_text(encoding="utf-8", errors="strict")
        except (UnicodeDecodeError, OSError):
            continue
        if re.search(r"\bCP\d{3}\b", text):
            hits.append(f"{rel}: primitive id")
        for marker in ("canonical_test", "text_anchor", "activation_signature",
                       "MORIS CONSCIENCE :: CONSIDER"):
            if marker in text:
                hits.append(f"{rel}: {marker}")
    assert not hits, f"mechanism detail pasted into the public repo: {hits[:5]}"


def test_the_guard_is_looking_at_something():
    """The positive control. If `git ls-files` returned nothing -- wrong cwd, not a repo -- every
    assertion above would pass over an empty list and this file would be decoration."""
    files = tracked()
    assert len(files) > 20, f"only {len(files)} tracked files; the guard is not seeing the repo"
    assert any(f.startswith("app/") for f in files), "no app/ files found; wrong tree?"
