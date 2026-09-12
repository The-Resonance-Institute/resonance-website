"""Refuse a commit that would put an em dash (U+2014) into any tracked file.

Operator's ruling, 2026-09-11: no em dash on any public surface, and the guard lives in the
repository so the sweep never has to be done twice. Every tracked file is checked as it would be
committed (the index, not the working tree), so a regenerated block that reintroduces the character
is refused at the moment someone stages it. En dashes (U+2013) are not checked here: numeric ranges
keep them; sentence punctuation with them is a reading, not a byte.

    python scripts/check_no_em_dash.py            # the index, as the pre-commit hook runs it
    python scripts/check_no_em_dash.py --tree     # the whole tracked working tree
"""
import subprocess
import sys

EM = chr(0x2014)   # the character itself never appears in this file; the guard would refuse its own source


def staged_files():
    out = subprocess.run(["git", "ls-files", "--cached", "-z"], capture_output=True, check=True).stdout
    return [f.decode("utf-8") for f in out.split(b"\0") if f]


def content(path, index=True):
    if index:
        r = subprocess.run(["git", "show", f":{path}"], capture_output=True)
        if r.returncode != 0:
            return None
        return r.stdout
    try:
        return open(path, "rb").read()
    except OSError:
        return None


def main() -> int:
    index = "--tree" not in sys.argv
    bad = []
    for f in staged_files():
        b = content(f, index=index)
        if b is None:
            continue
        try:
            t = b.decode("utf-8")
        except UnicodeDecodeError:
            continue
        n = t.count(EM)
        if n:
            bad.append((f, n))
    if bad:
        print("em dash (U+2014) present; the commit is refused. Rewrite the sentence, do not substitute a comma:", file=sys.stderr)
        for f, n in bad:
            print(f"  {n:4} {f}", file=sys.stderr)
        return 1
    print("no em dash in any tracked file")
    return 0


if __name__ == "__main__":
    sys.exit(main())
