import { AbsoluteFill, Audio, Img, interpolate, Sequence, staticFile, useCurrentFrame, Easing } from "remotion";
import shots from "../public/walk/shots.json";
import voice from "../public/voice/voice.json";
import { useSerif } from "./Film";

// THE WALKTHROUGH (2026-10-16, on the operator's word): the real product, not drawings. scripts/capture_walkthrough.py
// drives the demonstration (replay mode, nothing spent) through a plant manager's morning and the owner's view, and
// keeps a 1920 by 1080 screenshot per step with the box on screen that matters. Here each screen eases in toward that
// box, the box is outlined in the logo's blue, and the caption says what it is, in the operator's words.

type Shot = { file: string; caption: string; box: number[] | null };
const SHOTS = shots as Shot[];

// NARRATED (2026-10-17, on the operator's word): VERUS reads a line over each screen (narration.json, voiced by
// scripts/narrate.py into public/voice). Each screen stays as long as its line needs, and never less than it did.
const SPOKEN = voice as Record<string, number>;
const key = (file: string) => file.replace(/^walk\//, "").replace(/\.png$/, "");
const LEAD = 0.5; // the line starts just after the screen does
const TAIL = 0.9; // and a breath after it ends
const lasting = (k: string, least: number) => Math.max(least, LEAD + (SPOKEN[k] ?? 0) + TAIL);

export const WALK_FPS = 30;
const INTRO = lasting("intro", 3.5);
const EACHS = SHOTS.map((s) => lasting(key(s.file), 6));
const STARTS = EACHS.reduce<number[]>((at, d, i) => [...at, (at[i] ?? INTRO) + d], [INTRO]);
const OUTRO = lasting("outro", 4);
const BODY = EACHS.reduce((a, b) => a + b, 0);
export const WALK_FRAMES = Math.round((INTRO + BODY + OUTRO) * WALK_FPS);

// every line, at its screen's start
function Voice() {
  const at = (k: string, t: number) =>
    SPOKEN[k] ? (
      <Sequence key={k} from={Math.round((t + LEAD) * WALK_FPS)}>
        <Audio src={staticFile(`voice/${k}.wav`)} />
      </Sequence>
    ) : null;
  return (
    <>
      {at("intro", 0)}
      {SHOTS.map((s, i) => at(key(s.file), STARTS[i]))}
      {at("outro", INTRO + BODY)}
    </>
  );
}

const SERIF = "Newsreader, Georgia, serif";
const NAVY = "#0b1426";
const SKY = "#8eb9dc";
const IW = 1920;
const IH = 1080;

// Where the camera ends on a screen: close enough to read the box, never past the picture's edge, and in the space
// above the caption (`below` is how much of the frame's foot the caption takes).
function framing(box: number[] | null, vw: number, vh: number, below = 0) {
  const fit = Math.min(vw / IW, vh / IH);
  if (!box) return { scale: fit, x: (vw - IW * fit) / 2, y: (vh - IH * fit) / 2, fit };
  const [bx, by, bw, bh] = box;
  const room = vh - below;
  const scale = Math.max(fit, Math.min((vw * 0.86) / bw, (room * 0.82) / bh, fit * 1.75));
  const cx = bx + bw / 2;
  const cy = by + bh / 2;
  let x = vw / 2 - cx * scale;
  let y = room / 2 - cy * scale;
  x = Math.min(0, Math.max(vw - IW * scale, x));
  y = Math.min(0, Math.max(vh - IH * scale, y));
  if (IW * scale < vw) x = (vw - IW * scale) / 2;
  if (IH * scale < vh) y = (vh - IH * scale) / 2;
  return { scale, x, y, fit };
}

function Screen({ shot, local, vw, vh, below = 0 }: { shot: Shot; local: number; vw: number; vh: number; below?: number }) {
  const start = framing(null, vw, vh);
  const end = framing(shot.box, vw, vh, below);
  const k = interpolate(local, [0.6, 2.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const scale = start.scale + (end.scale - start.scale) * k;
  const x = start.x + (end.x - start.x) * k;
  const y = start.y + (end.y - start.y) * k;
  const fadeIn = interpolate(local, [0, 0.35], [0, 1], { extrapolateRight: "clamp" });
  const ring = interpolate(local, [2.2, 2.8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: NAVY, opacity: fadeIn, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: x, top: y, width: IW, height: IH, transform: `scale(${scale})`, transformOrigin: "0 0" }}>
        <Img src={staticFile(shot.file)} style={{ width: IW, height: IH, display: "block" }} />
        {shot.box && (
          <div
            style={{
              position: "absolute",
              left: shot.box[0] - 8,
              top: shot.box[1] - 8,
              width: shot.box[2] + 16,
              height: shot.box[3] + 16,
              borderRadius: 12,
              border: `4px solid ${SKY}`,
              boxShadow: `0 0 0 9999px rgba(11, 20, 38, ${0.28 * ring}), 0 0 24px rgba(142, 185, 220, ${0.8 * ring})`,
              opacity: ring,
            }}
          />
        )}
      </div>
    </AbsoluteFill>
  );
}

function Caption({ text, local, square }: { text: string; local: number; square: boolean }) {
  const opacity = interpolate(local, [0.3, 0.9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        padding: square ? "28px 56px 40px" : "70px 120px 46px",
        background: square ? NAVY : "linear-gradient(to top, rgba(11,20,38,.92), rgba(11,20,38,.75) 60%, transparent)",
        textAlign: "center",
      }}
    >
      <p style={{ margin: 0, fontFamily: SERIF, fontSize: square ? 46 : 54, lineHeight: 1.2, color: "#fff", opacity }}>{text}</p>
    </div>
  );
}

function Card({ local, title, line, small }: { local: number; title: string; line: string; small: string }) {
  const opacity = interpolate(local, [0, 0.6], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 50% 40%, #121b2a 0%, #0b1220 75%)",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        textAlign: "center",
        padding: 60,
      }}
    >
      <Img src={staticFile("verus-logo-full.png")} style={{ width: 760, maxWidth: "80%" }} />
      <p style={{ margin: "26px 0 0", fontFamily: SERIF, fontSize: 52, color: "#fff" }}>{title}</p>
      <p style={{ margin: "14px 0 0", fontFamily: SERIF, fontSize: 34, color: "rgba(255,255,255,.75)" }}>{line}</p>
      <p style={{ margin: "34px 0 0", fontFamily: "Segoe UI, system-ui, sans-serif", fontSize: 24, color: "rgba(255,255,255,.5)" }}>
        {small}
      </p>
    </AbsoluteFill>
  );
}

export function Walkthrough({ square }: { square: boolean }) {
  useSerif();
  return (
    <>
      <Frame square={square} />
      <Voice />
    </>
  );
}

function Frame({ square }: { square: boolean }) {
  const frame = useCurrentFrame();
  const t = frame / WALK_FPS;
  const vw = square ? 1080 : 1920;
  const vh = square ? 1080 : 1080;
  if (t < INTRO)
    return (
      <Card
        local={t}
        title="A walk through VERUS"
        line="The real product, on its demonstration company."
        small="Two fictional manufacturers, three plants, built for demonstrations."
      />
    );
  const i = STARTS.findIndex((start, n) => n === SHOTS.length || t < start + EACHS[n]);
  if (i >= SHOTS.length)
    return (
      <Card
        local={t - INTRO - BODY}
        title="See it on your own data."
        line="Read-only, inside your network."
        small="verusops.com"
      />
    );
  const shot = SHOTS[i];
  const local = t - STARTS[i];
  if (!square)
    return (
      <AbsoluteFill style={{ background: NAVY }}>
        <Screen shot={shot} local={local} vw={vw} vh={vh} below={230} />
        <Caption text={shot.caption} local={local} square={false} />
      </AbsoluteFill>
    );
  // the square: the screen in a 16:9 window under a small heading, the caption beneath
  return (
    <AbsoluteFill style={{ background: NAVY }}>
      <p
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          margin: 0,
          textAlign: "center",
          fontFamily: "Segoe UI, system-ui, sans-serif",
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: 6,
          color: "#5eead4",
        }}
      >
        INSIDE VERUS
      </p>
      <div style={{ position: "absolute", top: 120, left: 0, width: 1080, height: 608, overflow: "hidden" }}>
        <Screen shot={shot} local={local} vw={1080} vh={608} />
      </div>
      <div style={{ position: "absolute", top: 760, left: 0, right: 0 }}>
        <p
          style={{
            margin: 0,
            padding: "0 60px",
            textAlign: "center",
            fontFamily: SERIF,
            fontSize: 46,
            lineHeight: 1.2,
            color: "#fff",
            opacity: interpolate(local, [0.3, 0.9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          {shot.caption}
        </p>
      </div>
      <p
        style={{
          position: "absolute",
          bottom: 44,
          left: 0,
          right: 0,
          margin: 0,
          textAlign: "center",
          fontFamily: "Segoe UI, system-ui, sans-serif",
          fontSize: 24,
          color: "#94a3b8",
        }}
      >
        verusops.com
      </p>
    </AbsoluteFill>
  );
}
