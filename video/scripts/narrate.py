"""Voices the walkthrough: each line of narration.json, in VERUS's voice, into public/voice (with voice.json, how long
each line runs, which Walkthrough.tsx uses to give each screen the time its line needs).

His voice (2026-10-17, chosen by the operator by ear): George, the British voice Windows adds with English (United
Kingdom) text-to-speech, spoken a little slowly, raised about a seventh in pitch, no echo. Nothing is fetched by this
script and nothing is paid for. Runs on Windows (the voice is Windows'):
    uv run python scripts/narrate.py
"""
import json
import subprocess
import wave
from pathlib import Path

VIDEO = Path(__file__).resolve().parents[1]
OUT = VIDEO / "public" / "voice"
VOICE = "George"
SPEAKING_RATE = 0.85  # a slightly slower cadence than his default (1.0), on the operator's word
RAISE = 1.14  # pitch, by playing faster ...
SLOW = 0.92  # ... then slowing back down a little past where it was
FFMPEG = next((VIDEO / "node_modules" / "@remotion").glob("compositor-*/ffmpeg*"))  # Remotion's own


def say(text: str, raw: Path) -> None:
    subprocess.run(
        ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", str(VIDEO / "scripts" / "say_onecore.ps1"),
         "-Text", text, "-Out", str(raw), "-Voice", VOICE, "-Rate", str(SPEAKING_RATE)],
        check=True,
    )


def cute(raw: Path, out: Path) -> None:
    with wave.open(str(raw)) as w:
        rate = w.getframerate()  # the newer voices speak at 16 kHz, the older at 44.1
    subprocess.run(
        [str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y", "-i", str(raw),
         "-af", f"asetrate={rate}*{RAISE},aresample=44100,atempo={SLOW},loudnorm=I=-16:TP=-1.5", "-ar", "44100", str(out)],
        check=True,
    )


def seconds(path: Path) -> float:
    with wave.open(str(path)) as w:
        return w.getnframes() / w.getframerate()


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    lines = json.loads((VIDEO / "narration.json").read_text(encoding="utf-8"))
    lengths = {}
    for key, text in lines.items():
        raw = OUT / f"{key}.raw.wav"
        say(text, raw)
        cute(raw, OUT / f"{key}.wav")
        raw.unlink()
        lengths[key] = round(seconds(OUT / f"{key}.wav"), 2)
        print(key, lengths[key])
    (OUT / "voice.json").write_text(json.dumps(lengths, indent=1), encoding="utf-8")
    print("total spoken", round(sum(lengths.values()), 1), "seconds")


if __name__ == "__main__":
    main()
