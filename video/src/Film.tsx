import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  continueRender,
  delayRender,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { ASSETS, CSS, Defs, SCENES, STARTS, TOTAL, type Scene } from "../../components/verus-explainer";

// MEET VERUS AS A VIDEO FILE (2026-10-16, on the operator's word: "I do want to be able to post the video
// elsewhere"). The website's own scenes, drawn by the website's own code, so the film is the one he approved. The
// site plays them on the clock; here each frame sets every CSS animation to the moment it should show, so a frame is
// the same however and whenever it is drawn. The captions are burned in, because feeds play video muted; the sound is
// the site's own, rendered ahead of time into soundtrack.wav. An end card names the address, for the viewer who meets
// the film away from the site.

ASSETS.logo = staticFile("verus-logo.jpg");

export const FPS = 30;
const END = 3; // the end card, in seconds
export const FRAMES = Math.round((TOTAL + END) * FPS);
const ADDRESS = "resonanceinstitutellc.com/verus";
const SERIF = "Newsreader, Georgia, serif";
const NAVY = "#0b1426";

// The captions' face is the site's, Newsreader; the frame waits for it so no caption is drawn in a fallback.
export function useSerif() {
  const [handle] = useState(() => delayRender("Newsreader"));
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400&display=block";
    const done = () => continueRender(handle);
    link.onload = () => void document.fonts.load(`400 48px Newsreader`).then(done, done);
    link.onerror = done;
    document.head.appendChild(link);
  }, [handle]);
}

// One scene, every animation in it held at `local` seconds. Remotion freezes the page's clock while it draws, so the
// animations are not seeked through their timeline (that never ticks); each is paused instead, with its delay moved
// back by `local`, which makes the browser draw exactly that moment from style alone.
function SceneAt({ scene, local }: { scene: Scene; local: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    ref.current?.querySelectorAll<HTMLElement | SVGElement>("*").forEach((el) => {
      if (el.dataset.vxDelay === undefined) {
        const cs = getComputedStyle(el);
        if (cs.animationName === "none") return;
        el.dataset.vxDelay = cs.animationDelay;
      }
      const delays = el.dataset.vxDelay.split(",").map((d) => {
        const v = d.trim();
        const sec = v.endsWith("ms") ? parseFloat(v) / 1000 : parseFloat(v);
        return `${(sec - local).toFixed(3)}s`;
      });
      el.style.setProperty("animation-delay", delays.join(", "), "important");
      el.style.setProperty("animation-play-state", "paused", "important");
    });
  });
  return (
    <div ref={ref} className="vx-stage" style={{ position: "absolute", inset: 0 }}>
      <svg viewBox="0 0 640 360" style={{ display: "block", width: "100%", height: "100%" }}>
        <Defs />
        {scene.draw()}
      </svg>
    </div>
  );
}

function Caption({ text, local, dark, size, overlay }: { text: string; local: number; dark: boolean; size: number; overlay: boolean }) {
  const opacity = interpolate(local, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
  const lift = interpolate(local, [0, 0.5], [10, 0], { extrapolateRight: "clamp" });
  const band = overlay
    ? dark
      ? "linear-gradient(to top, rgba(0,0,0,.55), transparent)"
      : "linear-gradient(to top, rgba(255,255,255,.88), transparent)"
    : "none";
  return (
    <div
      style={{
        position: overlay ? "absolute" : "relative",
        left: 0,
        right: 0,
        bottom: 0,
        padding: overlay ? `${size * 1.2}px ${size}px ${size * 0.8}px` : `0 ${size}px`,
        background: band,
        textAlign: "center",
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: SERIF,
          fontSize: size,
          lineHeight: 1.2,
          color: overlay && !dark ? "#1f2937" : "#ffffff",
          opacity,
          transform: `translateY(${lift}px)`,
        }}
      >
        {text}
      </p>
    </div>
  );
}

function EndCard({ local, square }: { local: number; square: boolean }) {
  const opacity = interpolate(local, [0, 0.6], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 50% 42%, #172234 0%, #0d1625 75%)",
        alignItems: "center",
        justifyContent: "center",
        opacity,
      }}
    >
      <Img
        src={staticFile("verus-logo.jpg")}
        style={{
          width: square ? 860 : 1100,
          WebkitMaskImage: "radial-gradient(ellipse at center, #000 60%, transparent 78%)",
          maskImage: "radial-gradient(ellipse at center, #000 60%, transparent 78%)",
        }}
      />
      <p style={{ margin: 0, marginTop: square ? 10 : 0, fontFamily: SERIF, fontSize: square ? 46 : 52, color: "#ffffff" }}>
        {ADDRESS}
      </p>
    </AbsoluteFill>
  );
}

export function Film({ square }: { square: boolean }) {
  useSerif();
  const frame = useCurrentFrame();
  const t = frame / FPS;
  let index = 0;
  STARTS.forEach((s, i) => {
    if (t >= s) index = i;
  });
  const ended = t >= TOTAL;
  const scene = SCENES[index];
  const local = t - STARTS[index];

  return (
    <AbsoluteFill style={{ background: NAVY }}>
      <style>{CSS}</style>
      <Audio src={staticFile("soundtrack.wav")} />
      {ended ? (
        <EndCard local={t - TOTAL} square={square} />
      ) : square ? (
        <AbsoluteFill style={{ background: NAVY, color: "#fff" }}>
          <p
            style={{
              position: "absolute",
              top: 58,
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
            MEET VERUS
          </p>
          <div style={{ position: "absolute", top: 128, left: 0, width: 1080, height: 608, overflow: "hidden" }}>
            <SceneAt key={index} scene={scene} local={local} />
          </div>
          <div style={{ position: "absolute", top: 780, left: 0, right: 0 }}>
            <Caption key={`c${index}`} text={scene.caption} local={local} dark size={50} overlay={false} />
          </div>
          <p
            style={{
              position: "absolute",
              bottom: 46,
              left: 0,
              right: 0,
              margin: 0,
              textAlign: "center",
              fontFamily: "Segoe UI, system-ui, sans-serif",
              fontSize: 24,
              color: "#94a3b8",
            }}
          >
            {ADDRESS}
          </p>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <SceneAt key={index} scene={scene} local={local} />
          <Caption key={`c${index}`} text={scene.caption} local={local} dark={scene.dark} size={60} overlay />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
}
