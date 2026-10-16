import { Composition } from "remotion";
import { FPS, FRAMES, Film } from "./Film";
import { WALK_FPS, WALK_FRAMES, Walkthrough } from "./Walkthrough";

// Two shapes of the same film: widescreen for YouTube, email and slides; square for the LinkedIn feed.
export function Root() {
  return (
    <>
      <Composition id="MeetVerus" component={Film} durationInFrames={FRAMES} fps={FPS} width={1920} height={1080} defaultProps={{ square: false }} />
      <Composition id="MeetVerusSquare" component={Film} durationInFrames={FRAMES} fps={FPS} width={1080} height={1080} defaultProps={{ square: true }} />
      {/* the real product, captured from the demonstration (scripts/capture_walkthrough.py) */}
      <Composition id="Walkthrough" component={Walkthrough} durationInFrames={WALK_FRAMES} fps={WALK_FPS} width={1920} height={1080} defaultProps={{ square: false }} />
      <Composition id="WalkthroughSquare" component={Walkthrough} durationInFrames={WALK_FRAMES} fps={WALK_FPS} width={1080} height={1080} defaultProps={{ square: true }} />
    </>
  );
}
