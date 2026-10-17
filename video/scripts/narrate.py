# /// script
# requires-python = ">=3.12"
# dependencies = ["kokoro-onnx", "soundfile", "praat-parselmouth"]
# ///
"""Voices the walkthrough: each line of narration.json, in VERUS's voice, into public/voice (with voice.json, how long
each line runs, which Walkthrough.tsx uses to give each screen the time its line needs).

His voice (2026-10-17, chosen by the operator by ear, "Y2"): Kokoro's Puck voice, made younger. George, the Windows
voice used before, was still too robotic for a character with his whimsy. Kokoro is a free, open voice model
(Apache 2.0, commercial use allowed) that runs on this machine; nothing is paid for and nothing is sent anywhere.
Puck reads each line a little quick; Praat then shortens his vocal tract (formants up 13%), sets his pitch about a
semitone and a half above Puck's own, and widens his range by a fifth, so he sounds young, bright and lively without
sounding like a child. He speaks in the first person: he is the one showing you around.

The model files (kokoro-v1.0.fp16.onnx and voices-v1.0.bin, about 205 MB, from the kokoro-onnx project's
model-files-v1.0 release) live outside the repository, in %LOCALAPPDATA%\\kokoro, or wherever KOKORO_DIR points:
    uv run scripts/narrate.py
"""
import json
import os
import subprocess
import wave
from pathlib import Path

import numpy as np
import parselmouth
import soundfile as sf
from kokoro_onnx import Kokoro
from parselmouth.praat import call

VIDEO = Path(__file__).resolve().parents[1]
OUT = VIDEO / "public" / "voice"
MODEL = Path(os.environ.get("KOKORO_DIR") or Path(os.environ["LOCALAPPDATA"]) / "kokoro")
VOICE = "am_puck"
SPEED = 1.05  # a touch quicker than Puck's default: eager, not rushed
FORMANTS = 1.13  # a shorter vocal tract: younger
PITCH_HZ = 121  # his median pitch: Puck's own (about 111 Hz) raised a semitone and a half
RANGE = 1.2  # more up and down in the voice: livelier
FFMPEG = next((VIDEO / "node_modules" / "@remotion").glob("compositor-*/ffmpeg*"))  # Remotion's own


def speak(k: Kokoro, text: str, raw: Path) -> None:
    s, sr = k.create(text, voice=VOICE, speed=SPEED, lang="en-us")
    young = call(parselmouth.Sound(s, sampling_frequency=sr), "Change gender", 75, 500, FORMANTS, PITCH_HZ, RANGE, 1.0)
    sf.write(raw, np.clip(young.values[0], -1, 1), sr)


def level(raw: Path, out: Path) -> None:
    subprocess.run(
        [str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y", "-i", str(raw),
         "-af", "aresample=44100,loudnorm=I=-16:TP=-1.5", "-ar", "44100", str(out)],
        check=True,
    )


def seconds(path: Path) -> float:
    with wave.open(str(path)) as w:
        return w.getnframes() / w.getframerate()


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    k = Kokoro(str(MODEL / "kokoro-v1.0.fp16.onnx"), str(MODEL / "voices-v1.0.bin"))
    lines = json.loads((VIDEO / "narration.json").read_text(encoding="utf-8"))
    lengths = {}
    for key, text in lines.items():
        raw = OUT / f"{key}.raw.wav"
        speak(k, text, raw)
        level(raw, OUT / f"{key}.wav")
        raw.unlink()
        lengths[key] = round(seconds(OUT / f"{key}.wav"), 2)
        print(key, lengths[key])
    (OUT / "voice.json").write_text(json.dumps(lengths, indent=1), encoding="utf-8")
    print("total spoken", round(sum(lengths.values()), 1), "seconds")


if __name__ == "__main__":
    main()
