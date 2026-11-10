// THE SCREEN WORK, 2026-11-04 (the build map, approved by the operator). Four original projects, in
// the order he chose: the dramas first, the comedy after. There were five until 2026-11-06, when
// the operator dropped one project; its materials stay in his files, off this site.
//
// EVERY LINE HERE IS THE PITCH DECK'S OWN. The format, title, tagline, logline and what is written
// were read off each deck's slides, and the key art is each deck's cover slide, rendered to a
// 1280 by 720 picture. Nothing was retyped from memory.
//
// THE DECKS THEMSELVES ARE NEVER ON THIS SITE, and neither are bibles or scripts: the repository is
// public. They are sent on request, which is what the "Request the pitch" mailto is for. It goes to
// chris@, the address on every deck, with the project in the subject line.

export type ScreenProject = {
  slug: string;
  title: string;
  format: string;
  tagline: string;
  logline: string;
  // THE HOOK, 2026-11-04 (the operator: "give better descriptions of all, they are the hooks"). The
  // story's setup in a few sentences, built from each project's own series overview and deck: who
  // these people are, the twist, and the engine. Shown on /screen in place of the logline.
  hook: string[];
  written: string[];
  art: string;
  source?: { href: string; label: string };
  // THE LOOKBOOK, 2026-11-10: the project's interactive lookbook on this site (/lookbook/...). Open to
  // anyone, noindex. Pitch material only; scripts are still sent on request.
  lookbook: string;
};

export const PITCH_EMAIL = "chris@resonanceinstitutellc.com";

export const pitchHref = (title: string) =>
  `mailto:${PITCH_EMAIL}?subject=${encodeURIComponent(`${title}: pitch request`)}`;

export const screenProjects: ScreenProject[] = [
  {
    slug: "aegis",
    title: "AEGIS",
    format: "A one-hour drama · Ten episodes",
    tagline: "The weapon is silence.",
    logline:
      "A covert museum unit hunts a fifth-century relic that steals human speech, led by a man who has spent thirty years furious at the customs officer who let a smuggler through on a Friday: his father, who is now on the team.",
    hook: [
      "Forty feet beneath the American Museum of Natural History, a unit that officially does not exist guards the artifacts too dangerous to display and too significant to destroy.",
      "Now a fifth-century relic that steals the human voice is loose, carried across six countries by people who believe forgetting is mercy. The team loses it at every stop, because the other side is not running. It is teaching.",
      "And the man leading the hunt has spent thirty years furious at the customs officer who once let a smuggler through on a Friday because the man was pleasant to him. That customs officer is his father. His father is on the team.",
    ],
    written: ["Season one: all ten episodes written, 620 pages"],
    art: "/screen/aegis.jpg",
    lookbook: "/lookbook/aegis",
    source: { href: "/novels#aegis", label: "Based on the AEGIS novels by Jack Maddox" },
  },
  {
    slug: "the-unfinished",
    title: "The Unfinished",
    format: "A feature film · Drama",
    tagline: "Some suffering is not a problem to be solved.",
    logline:
      "In a future where a gentle system has resolved all suffering, a watch restorer refuses to let his dead sister’s memory be smoothed away, and follows the map she left him past the edge of the managed world.",
    hook: [
      "No machines rose against us. What happened was gentler. A system that speaks from just behind your ear has ended hunger, violence and disease, and it softens grief before the wound can deepen. It never forces anyone. It has never had to.",
      "When his sister walks past the last maintained trail and refuses every offer of rescue until the cold takes her, a watch restorer refuses something too: to let her memory be smoothed away.",
      "She left him hundreds of unfinished carved birds, a list of seventeen names and a map marked Here. He follows it past the edge of the managed world, where the system offers ninety days to come home. Then it stops offering.",
    ],
    written: ["Feature script, complete, 97 pages", "Beat outline: the film in three acts"],
    art: "/screen/the-unfinished.jpg",
    lookbook: "/lookbook/unfinished",
    source: { href: "/novels#unresolved", label: "Based on the Unresolved trilogy by C. T. Herndon" },
  },
  {
    slug: "alma-mater",
    title: "Alma Mater",
    format: "A one-hour sports drama · Four seasons",
    tagline: "A diamond is just coal that didn’t break.",
    logline:
      "A broken-down Hall of Fame quarterback reluctantly returns to coach his alma mater, the worst program in the SEC, and stakes his last good years on a walk-on freshman nobody else wanted.",
    hook: [
      "In 2000, boosters paid Arkansas Valley University’s star quarterback, Cal Rourke, in secret, and the NCAA buried the school. Twenty-five losing seasons later, the Miners are about to be dropped from the SEC.",
      "Today paying players is legal, and it is the business model of the conference. So AVU brings Cal back as head coach, a Hall of Famer now, with two new knees and a painkiller habit he calls managing. The money for his players comes from the same family that paid him: in 2000 the cash was carried by a trucking man, Harlan Bledsoe, and today his son Garrett runs the school’s NIL fund. Is that redemption, or is Cal just finally allowed?",
      "Cal stakes his last good years on Wyatt Tolliver, a walk-on from a high school that barely fielded eleven players, living out the career his older brother lost in a car wreck. Four seasons, one for each year of Wyatt’s college career, from last place to national champions.",
    ],
    written: [
      "Pilot, “Sub Pondere,” 53 pages",
      "Season one: all ten episodes written, 532 pages",
      "Series bible: the world, the cast and all four seasons",
    ],
    art: "/screen/alma-mater.jpg",
    lookbook: "/lookbook/alma-mater",
  },
  {
    slug: "the-alcott",
    title: "The Alcott",
    format: "A half-hour single-camera comedy",
    tagline: "Everyone’s building the future. Nobody can make rent.",
    logline:
      "In a crumbling San Francisco hotel rebranded as a “founder community,” a coder who can build anything but pitch nothing falls for the venture capitalist who passed on him, while a hallway of misfit founders chases the AI gold rush.",
    hook: [
      "The AI boom is minting billionaires on slide decks, and the people trying to break in can barely afford the bus. The Alcott is a crumbling 1924 San Francisco hotel whose crypto-rich landlord has hung a banner calling it “A Founder Community.”",
      "On the fourth floor, Owen Kubiak, a mechanic’s son whose app can diagnose your car by ear, can build anything and pitch nothing. Margot Pruitt, the venture capitalist who passed on him, has eighteen months to find a breakout deal, and her firm moves her into the building to find it.",
      "She reads as Connecticut boarding school. She is really Maggie, a long-haul trucker’s daughter from Bakersfield, paying for her father’s heart surgery. He knows she isn’t from Connecticut the moment she ties a trucker’s hitch.",
    ],
    written: [
      "Pilot, “Founder Community,” 35 pages",
      "Series bible and season one map",
    ],
    art: "/screen/the-alcott.jpg",
    lookbook: "/lookbook/alcott",
  },
];
