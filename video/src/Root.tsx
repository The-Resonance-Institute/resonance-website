import { Composition } from "remotion";
import { FPS, FRAMES, Film } from "./Film";

// Two shapes of the same film: widescreen for YouTube, email and slides; square for the LinkedIn feed.
export function Root() {
  return (
    <>
      <Composition id="MeetVerus" component={Film} durationInFrames={FRAMES} fps={FPS} width={1920} height={1080} defaultProps={{ square: false }} />
      <Composition id="MeetVerusSquare" component={Film} durationInFrames={FRAMES} fps={FPS} width={1080} height={1080} defaultProps={{ square: true }} />
    </>
  );
}
