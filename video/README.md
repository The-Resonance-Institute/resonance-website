# Meet VERUS, as a video file

The website's animated explainer (`components/verus-explainer.tsx`), rendered to MP4 with
[Remotion](https://www.remotion.dev) so it can be posted where the site cannot go: LinkedIn, email, slides, YouTube.
It is the same film drawn by the same code, with the captions burned in, the site's sound baked into the track, and
a three-second end card with the logo and the address.

This folder is not part of the website. It has its own dependencies, the site's build, type check and lint ignore it,
and its `node_modules`, `public` (generated) and `out` (renders) are not committed.

Remotion is free for a company of up to three people; past that it needs Remotion's company license.

## Make the videos

From this folder. To draw the frames with the Chrome already installed, set `REMOTION_CHROME` to its location first;
without it, Remotion downloads a browser of its own.

```bash
npm install
uv run --with playwright python scripts/prepare.py
npx remotion render src/index.ts MeetVerus out/meet-verus-1080p.mp4
npx remotion render src/index.ts MeetVerusSquare out/meet-verus-square.mp4
```

`prepare.py` copies the logo and renders the soundtrack ahead of time (`public/soundtrack.wav`) from the site's own
sound engine. Run it again whenever the film's scenes, timing or sound change. `npx remotion studio src/index.ts`
opens a preview to scrub through the film.

| Composition | Size | For |
|---|---|---|
| `MeetVerus` | 1920 by 1080 | YouTube, email, slides, the website |
| `MeetVerusSquare` | 1080 by 1080 | The LinkedIn feed |

## How a frame is drawn

Remotion freezes the page's clock while it draws, so the site's CSS animations cannot run. Each frame pauses every
animation and moves its delay back by the scene's elapsed time, which makes the browser draw exactly that moment
(`SceneAt` in `src/Film.tsx`). Change a scene on the site and the video follows on its next render.

## The walkthrough: the real product

`Walkthrough` and `WalkthroughSquare` (src/Walkthrough.tsx) show the real VERUS on its demonstration company: fourteen
screens of a plant manager's morning (VERUS's Show me and his walk round a screen among them) and the owner's view, each easing in toward the part that matters, outlined in
the logo's blue, with a caption. The screens are captured from a running demonstration:

```bash
uv run --with playwright python scripts/capture_walkthrough.py
uv run scripts/narrate.py
npx remotion render src/index.ts Walkthrough out/verus-walkthrough-1080p.mp4
npx remotion render src/index.ts WalkthroughSquare out/verus-walkthrough-square.mp4
```

Start the demonstration first in replay mode, so the capture spends nothing (in the VERUS repository:
`VERUS_DEMO_LLM_MODE=replay make demo`). A question whose model answer is not recorded yet shows "Could not answer"
in replay mode; record it once in fill mode, then capture again.

VERUS narrates it, in the first person: `narration.json` holds one line per screen (and the opening and closing
cards), and `scripts/narrate.py` voices them with Kokoro, a free, open voice model (Apache 2.0, commercial use allowed)
that runs on this machine: its Puck voice, made younger with Praat (chosen by ear on 2026-10-17; George, the Windows
voice before it, was too robotic for him). The model files, about 205 MB from the kokoro-onnx project's
model-files-v1.0 release, live outside the repository in `~/.cache/kokoro` (or `KOKORO_DIR`). Each screen stays as long as its line
needs. Change a line, run the script again, render again.

