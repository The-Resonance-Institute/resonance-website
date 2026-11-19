// PIVOT LABS ON YOUTUBE, 2026-11-18: all five seasons are live, ten chapters each, on the Pivot Labs
// channel (@PivotLabsshow). One list, read by /pivot-labs (the season buttons and the "The seasons"
// section) and /screen (the Film & TV card), so the two pages can never disagree.
//
// EACH LINE IS THE OPERATOR'S OWN, from the season's YouTube playlist or chapter descriptions. The
// runtime is the ten chapters added up, read from YouTube on 2026-11-18, and rounded.
//
// SEASON 4'S PLAYLIST went public later on 2026-11-18 (all ten chapters, in order); until then its
// link opened Chapter 1.
//
// THE WHOLE SEASON IN ONE SITTING. The first full-season uploads were deleted in a re-upload and their
// links answered "Video unavailable", so they came off the site. New ones for all five seasons went
// public later on 2026-11-18, each the eleventh video in its season's playlist, and each checked
// here: public, on the Pivot Labs channel, and as long as its ten chapters added up.

export const CHANNEL = "https://www.youtube.com/@PivotLabsshow";

export type Season = {
  n: number;
  name: string;
  line: string;
  runtime: string;
  href: string;
  // The whole season as one video, with YouTube chapters at each chapter's start.
  full?: string;
};

export const seasons: Season[] = [
  {
    n: 1,
    name: "Runway",
    line: "A San Francisco startup with thirty days of money left, from Day One of Thirty to Demo Night.",
    runtime: "about thirty-five minutes",
    href: "https://www.youtube.com/playlist?list=PLaVVUGmRTBDU",
    full: "https://youtu.be/PealZL745Os",
  },
  {
    n: 2,
    name: "The Raise",
    line: "They won Demo Night. Now they need someone to lead the round. Sixty days. A hundred noes.",
    runtime: "about seventy-five minutes",
    href: "https://www.youtube.com/playlist?list=PLa-MD9CYl4Qw",
    full: "https://youtu.be/OH2jOuHE79Y",
  },
  {
    n: 3,
    name: "Hypergrowth",
    line: "They raised nine million dollars and one clause: forty people in ninety days.",
    runtime: "about eighty minutes",
    href: "https://www.youtube.com/playlist?list=PLZnhDEU9Gk-U",
    full: "https://youtu.be/RL1bceDOKok",
  },
  {
    n: 4,
    name: "The Board",
    line: "The board hires a search firm to find a “real” CEO. Tanner volunteers to help.",
    runtime: "about two hours and forty minutes",
    href: "https://www.youtube.com/playlist?list=PLNkn1VK2xOlU",
    full: "https://youtu.be/Gf7PdDV_0eA",
  },
  {
    n: 5,
    name: "The Premiere",
    line: "The documentary premieres in thirty-one days, and the money runs out the same Thursday. So the company goes public.",
    runtime: "about an hour and fifty minutes",
    href: "https://www.youtube.com/playlist?list=PLFu5_yAdBuvA",
    full: "https://youtu.be/Jfvyq_KAfKk",
  },
];
