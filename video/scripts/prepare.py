"""Prepares video/public for a render: the logo, and the soundtrack rendered ahead of time.

The soundtrack is the website's own sound (components/verus-explainer-sound.ts) played through offline: esbuild bundles
the engine and the film's cues for a browser, the installed Chrome renders them with an OfflineAudioContext, and the
result is written as a 16-bit stereo WAV. Run it from the video folder with Playwright for Python available:
    uv run --with playwright python scripts/prepare.py
"""

from __future__ import annotations

import base64
import shutil
import subprocess
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

VIDEO = Path(__file__).resolve().parents[1]
SITE = VIDEO.parent
PUBLIC = VIDEO / "public"
END = 3  # seconds of end card, as in src/Film.tsx

ENTRY = """
import { Sound } from "../../components/verus-explainer-sound";
import { CUES, TOTAL } from "../../components/verus-explainer";

function wav(buf) {
  const ch = buf.numberOfChannels, n = buf.length, rate = buf.sampleRate;
  const out = new DataView(new ArrayBuffer(44 + n * ch * 2));
  const str = (o, s) => { for (let i = 0; i < s.length; i++) out.setUint8(o + i, s.charCodeAt(i)); };
  str(0, "RIFF"); out.setUint32(4, 36 + n * ch * 2, true); str(8, "WAVE"); str(12, "fmt ");
  out.setUint32(16, 16, true); out.setUint16(20, 1, true); out.setUint16(22, ch, true);
  out.setUint32(24, rate, true); out.setUint32(28, rate * ch * 2, true); out.setUint16(32, ch * 2, true);
  out.setUint16(34, 16, true); str(36, "data"); out.setUint32(40, n * ch * 2, true);
  const data = [...Array(ch)].map((_, c) => buf.getChannelData(c));
  let o = 44, peak = 0;
  for (let i = 0; i < n; i++) for (let c = 0; c < ch; c++) {
    const v = Math.max(-1, Math.min(1, data[c][i])); peak = Math.max(peak, Math.abs(v));
    out.setInt16(o, v < 0 ? v * 0x8000 : v * 0x7fff, true); o += 2;
  }
  return { bytes: new Uint8Array(out.buffer), peak };
}

window.soundtrack = async (end) => {
  const buf = await Sound.soundtrack(TOTAL + end, CUES);
  const { bytes, peak } = wav(buf);
  let s = ""; for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return { b64: btoa(s), seconds: buf.duration, peak };
};
"""


def main() -> None:
    PUBLIC.mkdir(exist_ok=True)
    shutil.copyfile(SITE / "public" / "verus" / "verus-logo.jpg", PUBLIC / "verus-logo.jpg")

    entry = VIDEO / "scripts" / "_soundtrack_entry.js"
    bundle = VIDEO / "scripts" / "_soundtrack_bundle.js"
    entry.write_text(ENTRY, encoding="utf-8")
    esbuild = VIDEO / "node_modules" / ".bin" / ("esbuild.cmd" if sys.platform == "win32" else "esbuild")
    subprocess.run(
        [str(esbuild), str(entry), "--bundle", "--format=iife", "--jsx=automatic", "--loader:.tsx=tsx",
         f"--outfile={bundle}", "--log-level=warning"],
        check=True,
    )
    try:
        with sync_playwright() as p:
            b = p.chromium.launch(channel="chrome", headless=True)
            page = b.new_page()
            page.goto("about:blank")
            page.add_script_tag(path=str(bundle))
            out = page.evaluate("end => window.soundtrack(end)", END)
            b.close()
    finally:
        entry.unlink(missing_ok=True)
        bundle.unlink(missing_ok=True)
    (PUBLIC / "soundtrack.wav").write_bytes(base64.b64decode(out["b64"]))
    print(f"soundtrack.wav: {out['seconds']:.1f} s, peak {out['peak']:.2f}; logo copied")


if __name__ == "__main__":
    main()
