// PIVOT LABS ON YOUTUBE, 2026-11-18: all five seasons are live, ten chapters each, on the Pivot Labs
// channel (@PivotLabsshow). One list, read by /pivot-labs (the season buttons and the "The seasons"
// section) and /screen (the Film & TV card), so the two pages can never disagree.
//
// EACH LINE IS THE OPERATOR'S OWN, from the season's YouTube playlist or chapter descriptions. The
// runtime is the ten chapters added up, read from YouTube on 2026-11-18, and rounded.
//
// SEASON 4'S PLAYLIST went public later on 2026-11-18 (all ten chapters, in order); until then its
// link opened Chapter 1. It is not shown on the channel's Playlists tab, but the link works.
//
// NO "WHOLE SEASON IN ONE SITTING" LINKS. The two the site had (Seasons 1 and 2) both answered "Video
// unavailable" on 2026-11-18 and were taken out. Where a playlist carries the full season as an
// eleventh video, the playlist link reaches it.

export const CHANNEL = "https://www.youtube.com/@PivotLabsshow";

export type Season = {
  n: number;
  name: string;
  line: string;
  runtime: string;
  href: string;
};

export const seasons: Season[] = [
  {
    n: 1,
    name: "Runway",
    line: "A San Francisco startup with thirty days of money left, from Day One of Thirty to Demo Night.",
    runtime: "about thirty-five minutes",
    href: "https://www.youtube.com/playlist?list=PLaVVUGmRTBDU",
  },
  {
    n: 2,
    name: "The Raise",
    line: "They won Demo Night. Now they need someone to lead the round. Sixty days. A hundred noes.",
    runtime: "about seventy-five minutes",
    href: "https://www.youtube.com/playlist?list=PLa-MD9CYl4Qw",
  },
  {
    n: 3,
    name: "Hypergrowth",
    line: "They raised nine million dollars and one clause: forty people in ninety days.",
    runtime: "about eighty minutes",
    href: "https://www.youtube.com/playlist?list=PLZnhDEU9Gk-U",
  },
  {
    n: 4,
    name: "The Board",
    line: "The board hires a search firm to find a “real” CEO. Tanner volunteers to help.",
    runtime: "about two hours and forty minutes",
    href: "https://www.youtube.com/playlist?list=PLNkn1VK2xOlU",
  },
  {
    n: 5,
    name: "The Premiere",
    line: "The documentary premieres in thirty-one days, and the money runs out the same Thursday. So the company goes public.",
    runtime: "about an hour and fifty minutes",
    href: "https://www.youtube.com/playlist?list=PLFu5_yAdBuvA",
  },
];
