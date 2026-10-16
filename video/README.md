# Meet VERUS, as a video file

The website's animated explainer (`components/verus-explainer.tsx`), rendered to MP4 with
[Remotion](https://www.remotion.dev) so it can be posted where the site cannot go: LinkedIn, email, slides, YouTube.
It is the same film drawn by the same code, with the captions burned in, the site's sound baked into the track, and
a three-second end card with the logo and the address.

This folder is not part of the website. It has its own dependencies, the site's build, type check and lint ignore it,
and its `node_modules`, `public` (generated) and `out` (renders) are not committed.

Remotion is free for a company of up to three people; past that it needs Remotion's company license.

## Make the videos

From this folder, on a machine with Chrome installed:

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
