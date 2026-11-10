// THE ALCOTT lookbook content. Source of truth for facts: Documents\The Alcott
// (The Alcott - Series Overview.md, Series Bible.md, Season One.md, the pilot .fdx)
// and the pitch deck slides in Prep\_build\deck. Edit here; the page reads everything from this file.
//
// Script excerpts are quoted exactly from the pilot, and only from the four scenes the
// writer rewrote himself: the cold open in 4B, the glass room, the elevator, the roof railing.
// Only the pilot is written. Episodes 102-110 are mapped, not scripted.

export const alcott = {
  title: "The Alcott",
  kicker: "A half-hour single-camera comedy",
  credit: "Created by C. T. Herndon",
  tagline: "Everyone's building the future. Nobody can make rent.",
  banner: "The Alcott: A Founder Community",
  logline:
    "In a crumbling San Francisco hotel rebranded as a “founder community,” a coder who can build anything but pitch nothing falls for the venture capitalist who passed on him, while a hallway of misfit founders chases the AI gold rush.",
  facts: [
    { k: "Format", v: "Half-hour, single-camera" },
    { k: "Pilot", v: "Written, 35 pages" },
    { k: "Season one", v: "10 episodes, mapped" },
    { k: "Setting", v: "A 1924 hotel, San Francisco" },
  ],
  contact: { name: "C. T. Herndon", email: "chris@resonanceinstitutellc.com" },
};

export const premise = {
  head: "The AI gold rush, from the cheap seats.",
  body: [
    "The AI boom is minting billionaires on demos and slide decks. On the border of Mid-Market and the Tenderloin, the people trying to break in can barely afford the bus.",
    "The Alcott is a grand, decaying 1924 residential hotel whose crypto-rich landlord has hung a banner calling it “A Founder Community.” Behind the peeling wallpaper and the elevator that works only if you know the trick, a fourth floor of engineers, hustlers and dreamers race to build the future before their savings run out.",
  ],
  centerHead: "Two escapes. Only one is hiding it.",
  center: [
    {
      name: "Owen Kubiak, 27",
      role: "The coder · Gearwise · 4B",
      text: "A mechanic's son from Dayton who can diagnose an engine by ear and can't explain why his own company matters. When he was fourteen, a private equity chain priced his father's garage out of business.",
    },
    {
      name: "Margot Pruitt, 29",
      role: "The VC · Halcyon Partners · 4A",
      text: "Eighteen months to make partner or be quietly let go. She reads as Connecticut boarding school. She is really Maggie, a long-haul trucker's daughter from Bakersfield, paying for her father's heart surgery.",
    },
  ],
  hinge:
    "She knows his product is the real thing and his pitch is a disaster. He knows she isn't from Connecticut the moment she ties a trucker's hitch.",
};

export const rule = {
  costume: "The startup is the costume.",
  wound: "The wound is universal.",
  body: "Nobody needs to understand a term sheet to recognize the rent, the parents and the crush.",
};

// ---------- The building ----------

export type Space = {
  id: string;
  label: string; // short label for chips and the drawing
  kicker: string;
  name: string;
  who: string;
  happens: string;
  detail: string;
  card?: string; // an index card on the radiator, quoted from the cold open
  line?: { text: string; who: string; from: string };
  episodes: string[];
  offsite?: boolean;
};

export const building = {
  head: "Five stages. One address.",
  intro:
    "A converted 1924 residential hotel with grand bones and a broken elevator. Brass mailboxes, a lobby chandelier missing half its crystals, radiators that clank all night. Four of the show's five standing sets are inside it. The fifth is one conference room an hour south.",
  hint: "Select any space in the building.",
};

export const spaces: Space[] = [
  {
    id: "roof",
    label: "Roof",
    kicker: "Up top · the relief valve",
    name: "The roof",
    who: "Everyone, eventually",
    happens: "Launch parties, late-night confessions, breakups, and wakes for dead companies.",
    detail:
      "String lights, about half of them working. A broken hot tub used as a planter, full of tomato plants. Folding chairs, and a view of the Bay Bridge between two towers. Moon will notice when another bulb goes out. Nobody else will.",
    line: { text: "Most people from Connecticut can't tie a trucker's hitch.", who: "Owen", from: "The pilot, at the railing" },
    episodes: ["101", "110"],
  },
  {
    id: "4a",
    label: "4A",
    kicker: "Fourth floor · 4A",
    name: "Margot's apartment",
    who: "Margot Pruitt",
    happens:
      "Halcyon wants an associate “embedded with founders,” and covers the lease. She also secretly can't afford Pacific Heights while paying for her father's heart surgery.",
    detail:
      "Scuffed hardwood, one bare bulb, and a dozen color-coded moving boxes. At the bottom of one, under two binders, her dad's old country records. She listens to them alone at night.",
    episodes: ["101", "102", "105"],
  },
  {
    id: "4b",
    label: "4B",
    kicker: "Fourth floor · 4B",
    name: "Owen and Ellis",
    who: "Owen Kubiak, Dr. Ellis Booker",
    happens: "The main living room of the show. The cold open. The tag. The argument about building AI fast or building it right.",
    detail:
      "Whiteboards on every wall and a server rack humming in the coat closet. The room is split like a custody agreement: Ellis's side labeled and alphabetized under a framed, laminated Dishwasher Protocol v3.2; Owen's side cables, cold coffee and a steel pinion gear from his father's garage.",
    line: { text: "So does a trillion. Investors can smell rounding.", who: "Ellis", from: "The pilot, cold open" },
    episodes: ["101", "103"],
  },
  {
    id: "4c",
    label: "4C",
    kicker: "Fourth floor · 4C, across the hall",
    name: "Val and Wren",
    who: "Val Ochoa, Wren Nakamura",
    happens:
      "The doors open constantly and the walls are thin, so both sides of the hall overhear things they should not.",
    detail:
      "Val's custom mechanical keyboards and 2 a.m. desserts share the place with Wren's tarot deck, a candle company whose inventory lives under her bed, and a rotating cast of plants named after failed startups.",
    episodes: ["101", "102"],
  },
  {
    id: "4d",
    label: "4D",
    kicker: "Fourth floor · 4D and the fire escape",
    name: "Kabir's apartment",
    who: "Kabir Sethi",
    happens: "Kabir's apartment, and the fire escape where the founder mindset happens at thirty-eight degrees.",
    detail:
      "A galvanized horse trough full of ice water on the fire escape. He plunges with his phone held overhead in a plastic bag, so he never misses the family group chat: 147 members, no mute button.",
    line: { text: "Your sister Priya gets her dopamine from saving lives. Indoors.", who: "His mother, from the bag", from: "The pilot, cold open" },
    episodes: ["101", "103"],
  },
  {
    id: "hall",
    label: "Hallway",
    kicker: "Fourth floor · the hallway",
    name: "The radiator",
    who: "Whoever needs it",
    happens:
      "Peeling wallpaper, brass room numbers from the hotel days, and a cast-iron radiator that clanks like someone is trapped inside it.",
    detail:
      "Val stress-bakes tres leches at 2 a.m. and leaves it on the radiator with a card that excludes Kabir by name. He keeps eating it. By the end of the pilot there's a thank-you underneath, signed “Mag,” with the name crossed out to “M.”",
    card: "FOR WHOEVER NEEDS IT. NOT YOU, KABIR.",
    line: { text: "It says Kabir. That's brand awareness.", who: "Kabir", from: "The pilot, cold open" },
    episodes: ["101", "105"],
  },
  {
    id: "2a",
    label: "2A",
    kicker: "Second floor · 2A, by the boiler",
    name: "Dutch's place",
    who: "Dutch Callahan; his daughter Maddie, every other weekend",
    happens:
      "Home for a barefoot surf legend who sold his first company for $180 million and lost everything on the second. He opened Moonshot Commons with what was left.",
    detail:
      "He lives next to the boiler, surfs Ocean Beach at dawn every day, and arrives downstairs with wet hair and sand in his laptop. Maddie, 11, is the only person who can make him go to bed on time.",
    episodes: ["104"],
  },
  {
    id: "moonshot",
    label: "Moonshot",
    kicker: "Ground floor · the old hotel lobby",
    name: "Moonshot Commons",
    who: "Dutch, barefoot, and every startup in the building",
    happens: "A failing coworking space in the old hotel lobby, where every startup in the building collides during the workday.",
    detail:
      "Mismatched furniture, a rack of surfboards by the door, a kombucha tap that dispenses mostly foam, phone booths made from retired elevator cabs, and a wall of framed pitch decks from companies that died there. Behind the counter, a framed photo hangs turned to the wall. Nobody asks.",
    episodes: ["101", "104", "108", "109"],
  },
  {
    id: "lobby",
    label: "Elevator",
    kicker: "Lobby · mailboxes · the freight elevator",
    name: "The elevator trick",
    who: "Whoever knows the trick",
    happens:
      "The main elevator has been out of order for as long as anyone can remember. The freight elevator works, but only for whoever knows the trick.",
    detail:
      "Pry open the brass service panel with a thumbnail. Tap the relay twice. Wiggle the connector. Kick the base of the door in the spot worn shiny by years of other kicks. Owen shows Margot on her first night, and that's a choice.",
    episodes: ["101", "109", "110"],
  },
  {
    id: "basement",
    label: "Basement",
    kicker: "Below street level",
    name: "The basement",
    who: "Moon's next amenity, and briefly Ellis",
    happens: "Whatever Moon has decided it is this week.",
    detail:
      "Wren talks Moon into turning it into a sensory-deprivation wellness tank. Ellis gets locked in it and calculates his remaining air supply out loud.",
    episodes: ["106"],
  },
  {
    id: "bodega",
    label: "Bodega",
    kicker: "Next door · the corner store",
    name: "Mrs. Okonkwo's bodega",
    who: "Mrs. Okonkwo, her nephew Chidi, a cat asleep on the bread",
    happens:
      "A retired Nigerian civil engineer who has watched three tech booms come and go from behind the register, and gives sharper business advice than anyone at Halcyon.",
    detail:
      "She extends credit to broke founders in a ledger of first names and small amounts. The oldest unpaid line in it: Moon, three dollars, from before the joke coin.",
    episodes: ["101", "104"],
  },
  {
    id: "van",
    label: "The van",
    kicker: "Parked out front, more or less",
    name: "Dutch's 1987 camper van",
    who: "Dutch, and anyone desperate",
    happens:
      "The van he wrote his first company in. It barely runs, and he still drives it, because it is the only thing from the old life that is still his.",
    detail:
      "Sun-bleached to the color of old cream. It climbs hills in the slow lane, passed by everything, including a cyclist. When the engine light comes on, Dutch taps it twice like a friend's shoulder.",
    episodes: ["101", "106"],
  },
  {
    id: "glass",
    label: "Glass room",
    kicker: "Off-site · Sand Hill Road",
    name: "The glass room at Halcyon",
    who: "Reed Halvorsen, Margot Pruitt, and whoever is pitching",
    happens:
      "A conference room with one glass wall and a view of nothing but oak trees and money. Characters walk in as one person and leave as another. Pitch episodes live here. Halcyon Partners is fictional.",
    detail:
      "The motorized shade has a knock every third turn. In the pilot, Owen hears it from his chair: a cheap nylon gear in a housing built for torque. Two weeks, maybe three. It finally goes in the finale, mid-pitch.",
    line: { text: "Your shade motor's got a knock.", who: "Owen", from: "The pilot, the glass room" },
    episodes: ["101", "110"],
    offsite: true,
  },
];

// ---------- People and companies ----------

export type Group = "six" | "orbit" | "company";

export type Person = {
  id: string;
  name: string;
  role: string;
  group: Group;
  x: number; // network layout, 0-1000
  y: number; // network layout, 0-660
  bio: string;
  line?: string;
};

export const people: Person[] = [
  {
    id: "owen",
    name: "Owen",
    role: "The coder · Gearwise · 27",
    group: "six",
    x: 440,
    y: 300,
    bio: "Owen Kubiak grew up in his father's two-bay garage in Dayton and can hear a bad wheel bearing from the curb. When he was fourteen, a private equity chain priced Walt's supply lines out of existence, and Walt now works the parts counter for the company that choked him out. Owen wants to prove the person who does the work deserves the win. He cannot sell himself. He freezes in pitch meetings, then delivers the perfect answer to the elevator doors.",
    line: "The whole company is cars.",
  },
  {
    id: "margot",
    name: "Margot",
    role: "The VC · Halcyon · 29",
    group: "six",
    x: 640,
    y: 250,
    bio: "On Sand Hill Road she is Margot. In Bakersfield she is Maggie, a long-haul trucker's daughter who did homework in the cab of her dad's rig and decided at 13 she would never be told what she was worth again. A scholarship, Wall Street, business school, and eighteen months to make partner. Color-codes everything, including friendships. Can back a semi into a loading dock perfectly, a fact that will destroy everyone the day it comes out.",
    line: "Nobody builds audio diagnostic apps for old cars because of the market size.",
  },
  {
    id: "ellis",
    name: "Ellis",
    role: "The PhD · Lantern · 29",
    group: "six",
    x: 560,
    y: 420,
    bio: "Dr. Ellis Booker was raised by his grandmother in East Oakland, went to Berkeley at 16, and spent three years as a safety researcher at Meridian before quitting in a public 14-page resignation letter. Now he warns that AI might end civilization while raising $20 million to build it right. Assigns a probability of catastrophe to everything, including brunch. Rigid about rules, and the warmest person in the building with kids, old people and anyone who is broke.",
    line: "I'd put the intern at sixty percent.",
  },
  {
    id: "kabir",
    name: "Kabir",
    role: "The founder · Prism · 30",
    group: "six",
    x: 320,
    y: 170,
    bio: "Kabir Sethi is the youngest of four from Edison, New Jersey, and the only one who isn't a doctor. A born salesman whose AI does “everything” and who keeps getting the meetings Owen can't. His first company was funded by eleven uncles on one phone call each and ended in Chapter Eleven. The most connected man in San Francisco, and the loneliest on Sunday nights. He is also Owen's most loyal friend, which is exactly what makes losing to him hurt.",
    line: "Love that for us, though. Rising tide, brother.",
  },
  {
    id: "val",
    name: "Val",
    role: "The engineer · Handoff · 28",
    group: "six",
    x: 300,
    y: 420,
    bio: "Valentina Ochoa is an ER nurse's daughter from San Antonio's West Side who has been the adult in every room since she was eleven. She designed a system that shipped to 200 million users and watched her manager present it as his own. The best engineer in the building, and she will not ship until it's perfect. Dismantles men's architecture and egos in the same sentence. Terrified of a first date.",
  },
  {
    id: "wren",
    name: "Wren",
    role: "The free spirit · 26",
    group: "six",
    x: 150,
    y: 320,
    bio: "Wren Nakamura grew up on a lavender and cannabis farm in Mendocino County, homeschooled with no grades and no deadlines. Eleven cities in seven years. Names her plants after failed startups and reads tarot for investors before pitches, unnervingly accurately. The flakiest person in the building reads people more precisely than anyone in it. Always right about who will fall for whom, and never about herself.",
  },
  {
    id: "dutch",
    name: "Dutch",
    role: "Runs Moonshot Commons · 41",
    group: "orbit",
    x: 170,
    y: 90,
    bio: "Dennis “Dutch” Callahan wrote his first company in a 1987 camper van and sold it at 28 for $180 million. His best friend and co-founder sided with the board, voted him out of the second, and took it to a billion dollars without him. Now he lives in 2A by the boiler, surfs Ocean Beach at dawn, and calls everyone “brother” except the people he respects, whom he calls by their full name.",
  },
  {
    id: "bea",
    name: "Bea",
    role: "Kabir's assistant · 26",
    group: "orbit",
    x: 470,
    y: 80,
    bio: "Bernadette Castillo is an Army veteran from Vallejo who ran logistics for a battalion on two deployments. Hired as Kabir's executive assistant, she quietly runs Prism: payroll, investors, legal and the roadmap he keeps forgetting. She writes his index cards. The only person Kabir cannot charm, and the strongest breakout candidate in the building.",
  },
  {
    id: "moon",
    name: "Moon",
    role: "The landlord · 31",
    group: "orbit",
    x: 70,
    y: 200,
    bio: "Trevor “Moon” Pike was an Orange County mortgage broker who turned $400 in a joke coin into $38 million and bought The Alcott in cash. Holds weekly town halls nobody attends, renames the amenities constantly and offers rent discounts for equity. Means well, understands nothing. Underneath, the bullied kid who finally got a seat at the table and has no idea what to do with it.",
  },
  {
    id: "reed",
    name: "Reed",
    role: "Senior partner, Halcyon · 64",
    group: "orbit",
    x: 790,
    y: 150,
    bio: "Reed Halvorsen speaks almost entirely in aphorisms. Never wrong about money, always wrong about people, including his own four ex-wives. He pushes Margot to choose the deal over the person, every time. The audience slowly learns he grew up in a North Dakota farm town, also changed his name, and sees in her the version of himself he buried.",
    line: "It's refreshing. It isn't fundable. But it's refreshing.",
  },
  {
    id: "adrian",
    name: "Adrian Kell",
    role: "CEO, Meridian · 43",
    group: "orbit",
    x: 820,
    y: 440,
    bio: "A composite of the industry, not any one person. Warns about the dangers of AI on every podcast while racing to build it faster than anyone. Identical outfits, a soft voice, and an island bought for “resilience.” Appears a few times a season to acquire, crush or poach someone in the building. Sincerely believes he is the good guy.",
  },
  {
    id: "okonkwo",
    name: "Mrs. Okonkwo",
    role: "The bodega · 67",
    group: "orbit",
    x: 120,
    y: 500,
    bio: "A retired Nigerian civil engineer who runs the corner store with her nephew Chidi. She has watched three tech booms come and go from behind the register, extends credit to broke founders, and gives sharper business advice than anyone at Halcyon. She and Ellis's grandmother become instant allies and terrify the building together. Written as a full person, never as a gag.",
  },
  {
    id: "gearwise",
    name: "Gearwise",
    role: "Owen's company",
    group: "company",
    x: 420,
    y: 590,
    bio: "A phone app that listens to your car and tells you what's wrong before it leaves you on the shoulder. It puts his father's ear in everybody's pocket, so nobody gets sold eight hundred dollars of work they don't need. Unglamorous, genuinely useful, and in a city where nobody owns a car, nobody thinks it is sexy. Its one pilot customer, a two-bay shop in Stockton, pays in brake pads and oil filters.",
  },
  {
    id: "handoff",
    name: "Handoff",
    role: "Val's company",
    group: "company",
    x: 220,
    y: 600,
    bio: "An AI tool that makes nurse shift changes safe, inspired by the mistakes Val's mother saw at 7 a.m. after 12-hour nights. Brilliant, and 90 percent finished for nine months.",
  },
  {
    id: "prism",
    name: "Prism",
    role: "Kabir's company",
    group: "company",
    x: 640,
    y: 70,
    bio: "An AI agent that does “everything,” and pivots almost every episode. A pre-seed round from the uncle network, twelve slides, a navy blazer and a voice that never wavers. Bea is the only reason it has payroll.",
  },
  {
    id: "lantern",
    name: "Lantern",
    role: "Ellis's lab",
    group: "company",
    x: 660,
    y: 590,
    bio: "A lab dedicated to provably safe AI. A 47-page manifesto, a waitlist of zero, and a pitch that warns investors the technology may end civilization before asking for $20 million to build it.",
  },
  {
    id: "halcyon",
    name: "Halcyon",
    role: "Sand Hill Road firm · fictional",
    group: "company",
    x: 900,
    y: 290,
    bio: "Halcyon Partners, a top Sand Hill Road venture firm, invented for the show. In season one it writes its seed check to Kabir, not Owen: Kabir has the story Reed loves, and Owen has the unglamorous utility Reed dismisses.",
  },
  {
    id: "meridian",
    name: "Meridian",
    role: "AI lab · fictional",
    group: "company",
    x: 900,
    y: 590,
    bio: "The most valuable AI lab in the world, invented for the show. Ellis worked there and resigned publicly, which its CEO has never forgotten.",
  },
  {
    id: "cadence",
    name: "Cadence",
    role: "Halcyon portfolio · fictional",
    group: "company",
    x: 900,
    y: 60,
    bio: "Halcyon's portfolio darling, invented for the show. Its customers' voice recordings sit in a public bucket that anybody can open. Val opened it.",
  },
];

export type LinkKind = "romance" | "friends" | "rivals" | "business" | "wound";

export type Link = { a: string; b: string; label: string; kind: LinkKind };

export const links: Link[] = [
  { a: "owen", b: "margot", label: "The main romance. Builder meets money. Both blue-collar kids who escaped: he wears it, she hides it. Every feeling is a conflict of interest.", kind: "romance" },
  { a: "owen", b: "val", label: "The two best engineers in the building. Mutual respect, mutual threat, and the long-game alternative to Margot.", kind: "romance" },
  { a: "owen", b: "kabir", label: "Best friends, rivals. Kabir raises on worse ideas; Owen builds better ones nobody funds. Every win for one is a small betrayal of the other.", kind: "rivals" },
  { a: "owen", b: "ellis", label: "Anchor roommates, and the show's running argument about building AI fast or building it right.", kind: "friends" },
  { a: "val", b: "wren", label: "Roommates. The finisher who never ships and the starter who never finishes. Each is the other's missing half.", kind: "friends" },
  { a: "kabir", b: "bea", label: "Boss and the real boss. Bea runs Prism while Kabir pitches it. The question is when everyone, Bea included, notices.", kind: "business" },
  { a: "kabir", b: "margot", label: "He is the deal she is assigned to make work. She is the first person he cannot sell, and the first investor he is tempted to tell the truth.", kind: "business" },
  { a: "kabir", b: "val", label: "The cake feud. She labels it against him by name; he keeps eating it. She thinks he is the only person in the building who would never steal her work, and she is right.", kind: "rivals" },
  { a: "ellis", b: "val", label: "Sparring partners. Both got out of neighborhoods that still claim them.", kind: "friends" },
  { a: "margot", b: "reed", label: "Mentor and test. He pushes her to choose the deal over the person. Their buried roots surface late.", kind: "business" },
  { a: "ellis", b: "adrian", label: "The old wound: a public resignation. Adrian returns to buy, poach or humiliate.", kind: "wound" },
  { a: "dutch", b: "owen", label: "Bad mentorship. Dutch sees his younger self in Owen, the builder outmaneuvered by the talker, and is terrified of watching it happen twice.", kind: "friends" },
  { a: "dutch", b: "kabir", label: "The mirror. Dutch once had a charming best friend. He cannot decide whether Kabir is that man or Dutch at 28. Neither can the audience, until the finale.", kind: "wound" },
  { a: "moon", b: "wren", label: "Rent for equity, and a basement wellness tank. She is the only one who signs up.", kind: "business" },
  { a: "okonkwo", b: "owen", label: "Credit at the register, and advice: when they ask the question you're afraid of, answer that one.", kind: "friends" },
  { a: "okonkwo", b: "moon", label: "The oldest unpaid line in her ledger: Moon, three dollars, from before the joke coin.", kind: "business" },
  { a: "gearwise", b: "handoff", label: "The company romance. Both run on signal anomaly detection: one reads engine vibration, the other patient vitals across a shift change. Neither founder wants to give up the CEO seat. Season two's main engine.", kind: "romance" },
  { a: "wren", b: "handoff", label: "Wren sees the merger first.", kind: "business" },
  { a: "owen", b: "gearwise", label: "Founder. His father's ear, in everybody's pocket.", kind: "business" },
  { a: "val", b: "handoff", label: "Founder. Entirely hers, and nobody can take it.", kind: "business" },
  { a: "kabir", b: "prism", label: "Founder, believer, pitchman.", kind: "business" },
  { a: "bea", b: "prism", label: "The only reason it has payroll.", kind: "business" },
  { a: "ellis", b: "lantern", label: "Founder, and author of all 47 pages.", kind: "business" },
  { a: "margot", b: "halcyon", label: "Associate. Eighteen months, one company.", kind: "business" },
  { a: "reed", b: "halcyon", label: "Senior partner.", kind: "business" },
  { a: "halcyon", b: "prism", label: "The seed check goes to the wrong founder.", kind: "business" },
  { a: "halcyon", b: "gearwise", label: "Passed. Reed liked the product and not the founder.", kind: "wound" },
  { a: "halcyon", b: "cadence", label: "The portfolio darling Reed tells Margot to sit on.", kind: "business" },
  { a: "val", b: "cadence", label: "She found the public bucket. She opened it.", kind: "rivals" },
  { a: "adrian", b: "meridian", label: "CEO.", kind: "business" },
  { a: "meridian", b: "lantern", label: "Adrian comes to acquire Lantern, which is really a way to bring Ellis back.", kind: "rivals" },
];

// ---------- Season one ----------

export type Episode = {
  n: string;
  title: string;
  tag?: string;
  written?: boolean;
  pages?: number;
  engine: string;
  summary: string;
  notes?: { k: string; v: string }[];
};

export const season = {
  head: "Halcyon funds the wrong founder.",
  oneLine:
    "The associate assigned to babysit him falls for the right one, while the real company quietly assembles itself across the hall. The wrong founder is the right one's best friend.",
  engineRule: "Every episode has a comic engine, not just a plot. The plot is the costume; the engine is why people watch.",
  rules: [
    "Plant more than you pay. Each episode pays off at most one pilot seed and plants at least two new ones.",
    "The merger is season two. Owen and Val discover their engines fit together. They do not merge, incorporate or decide who is CEO.",
    "Margot stays at Halcyon. Her secret cracks open only for Owen, and only partway, until the final scene.",
  ],
};

export const episodes: Episode[] = [
  {
    n: "101",
    title: "Founder Community",
    tag: "Pilot",
    written: true,
    pages: 35,
    engine: "A building full of people performing for one person.",
    summary:
      "Owen bombs his first VC pitch at Halcyon, an hour before his best friend down the hall, Kabir, pitches the same partners and gets a second meeting. That night the associate who watched Owen bomb, Margot, moves in down the hall. The whole fourth floor pitches her at Moon's rooftop mixer except Owen, and that is exactly why she trusts him. Val offers him an olive branch disguised as an insult.",
  },
  {
    n: "102",
    title: "Harmonics",
    engine: "Two proud engineers who would rather die than say “you're right.”",
    summary:
      "Owen shows up at Val's to learn what she means by vibration harmonics. She makes him sign an NDA written on a napkin, then a second napkin covering the first. Halcyon sends Kabir a term sheet and Reed makes Margot his diligence lead, so she now has to make sense of a company that does “everything.” Kabir finally has real news for his mother's Sunday call and spends the episode trying to get her to hear it. Ellis, taking “send me page two” literally, starts slipping Margot one page of his manifesto under her door every morning.",
    notes: [{ k: "Plants", v: "Bea quietly hiding Prism's burn rate. Val's model reads patient vitals with the same math Owen uses on machines. Neither of them notices yet." }],
  },
  {
    n: "103",
    title: "Embedded",
    engine: "Observation changes the thing observed, and Ellis says so constantly.",
    summary:
      "Reed wants weekly reports on the building, so Margot tries to observe the founders naturally. The building finds out within an hour and starts performing: staged whiteboard sessions, fake investor calls, and Kabir cold plunging twice a day while selling “access to the VC” by the half hour, in the middle of her diligence on his own company. Owen, still sulking, is the only one who ignores her, which makes his apartment the only real thing she sees all week. Moon rolls out rent-for-equity, and Wren signs up with a company she founded that morning.",
    notes: [{ k: "Plants", v: "Margot's weekly report to Reed includes one paragraph about Gearwise that she deletes before sending." }],
  },
  {
    n: "104",
    title: "Brake Pads",
    engine: "Kabir's double life as Halcyon's next big bet and Owen's secret sales coach.",
    summary:
      "The Stockton shop wants a real contract, which means Owen has to put a price on his own work, the one thing he cannot do. Kabir secretly coaches him, ducking into Moonshot's phone booths so Bea and Margot won't catch him running a sales bootcamp for a competitor. Owen tries to turn 400 brake pads and oil filters into rent money. Dutch gets his daughter Maddie for the weekend, and she runs Moonshot Commons better than he does.",
    notes: [{ k: "Plants", v: "Owen finally pays Mrs. Okonkwo his dollar fifty, and she shows him the oldest unpaid line in her ledger. Maddie mentions her mom still keeps a picture of the bluff house. Dutch catches Kabir leaving a phone booth and says nothing, which is worse." }],
  },
  {
    n: "105",
    title: "Public Bucket",
    engine: "Ellis's ethics consult escalating into a full peer-reviewed process.",
    summary:
      "Margot checks out Val's tip and confirms that Cadence, Halcyon's portfolio darling, is leaking voice uploads. Reed already knows and tells her to sit on it until Cadence closes its Series B. Margot brings the dilemma to Ellis as a hypothetical; Ellis builds a forty-cell decision matrix and correctly identifies that it isn't hypothetical. Val waits to see what Margot does. Margot does nothing, and Val stops leaving cake on the radiator for her.",
    notes: [{ k: "Plants", v: "The empty radiator. Margot keeps a copy of the evidence in the box with her dad's records." }],
  },
  {
    n: "106",
    title: "Stockton",
    tag: "Midpoint",
    engine: "The road trip, plus Ellis trapped in a tank, calculating his air supply out loud.",
    summary:
      "Gearwise's only paying customer threatens to walk unless Owen shows up in person, and the only car that might make it is Dutch's van. Margot comes along, claiming it's diligence. The van dies at a truck stop at 2 a.m. To get them out, Margot climbs into a stranger's semi and backs it into a loading dock in one perfect move. Owen stares. She claims she learned it online. Neither of them believes it. Back home, Wren talks Moon into turning the basement into a sensory-deprivation wellness tank, and Ellis gets locked in it.",
    notes: [
      { k: "Payoff", v: "The truck. Owen now knows Margot is not from Connecticut. He doesn't push." },
      { k: "Plants", v: "An almost-kiss at the truck stop, interrupted by the semi's owner pounding on the window and asking who parked his rig better than he can." },
    ],
  },
  {
    n: "107",
    title: "Shift Change",
    engine: "Val and Owen pulling an all-nighter on a budget of conchas and spite.",
    summary:
      "Gearwise flags a brake failure on a minivan that came through the Stockton shop, and its owner waves off the alert. Owen can't prove the call with his model alone. Val runs his data through her harmonics method at 4 a.m., and the failure signature lights up. The shop gets the van off the road an hour before its owner would have taken her kids down the Grapevine. Owen calls his father to tell him, and Walt goes quiet for a long time. Then he asks Owen to explain how it works, slowly, from the beginning.",
    notes: [
      { k: "Payoff", v: "The vibration harmonics from the pilot roof." },
      { k: "Plants", v: "Val sees that her vitals model and his engine model are the same math. She closes her laptop and tells no one." },
    ],
  },
  {
    n: "108",
    title: "Demo Day",
    engine: "A live demo held together with tape and lies, run from a phone booth in Moonshot Commons.",
    summary:
      "Prism demos for Halcyon's limited partners. Twenty minutes before it starts, the platform collapses, and Kabir doesn't know. Bea goes across the hall and asks Owen and Val to run the Gearwise engine underneath Prism's interface. Val refuses. Owen says yes, because Margot's job is riding on this demo, and because it's Kabir. It works. Kabir takes a standing ovation, the best moment of his life, and calls his mother from the stage. Margot is the only person in the room who recognizes what she's looking at, and Owen asks her not to say anything.",
    notes: [{ k: "Plants", v: "On his way out, glowing, Kabir finds Owen's pinion gear on the floor of the phone booth. Margot asks Bea who really runs Prism, and Bea says, “Ask me in a year.” Val and Owen stop speaking." }],
  },
  {
    n: "109",
    title: "The Forty-Seventh Page",
    engine: "The most powerful man in tech being bossed around by two grandmothers.",
    summary:
      "Adrian Kell visits The Alcott in person to acquire Lantern, which is really a way to bring Ellis back into Meridian. Ellis's grandmother, Miss Lorraine, picks the same day to visit, and she and Mrs. Okonkwo interrogate a $910 billion CEO in the lobby. Ellis says no. Adrian leaves an offer letter anyway, and Ellis puts it in his drawer unopened. Dutch, seeing this, finally tells Owen the story of the bluff house: the charming best friend who took the credit and kept it. Owen thinks of Kabir and can't stop.",
    notes: [
      { k: "Payoff", v: "Dutch's unfinished story from the pilot roof, and what the turned-around photo is." },
      { k: "Plants", v: "Ellis's unopened letter, mirroring the holiday cards Dutch keeps unopened in a drawer." },
    ],
  },
  {
    n: "110",
    title: "Stripped Gears",
    tag: "Finale",
    engine: "The gear, the glass room and a partner summit coming apart in real time.",
    summary:
      "At Halcyon's partner summit, Kabir pitches Prism's Series A in the glass room, and the shade motor Owen diagnosed in the pilot finally strips its gear and crashes down mid-pitch. In the silence after, Kabir sets the pinion gear on the table and tells the room the truth: the demo ran on Owen's engine. Reed turns to Margot, who already knew. He doesn't fire her. He gives her a choice: lead Prism's Series A or kill it, by Monday. On the roof that night, Owen and Margot finally kiss. Then they go downstairs together, and standing in the lobby with a casserole dish and a suitcase is Margot's mother, who looks up and says, “Maggie?” Owen turns. Cut to black.",
    notes: [
      { k: "Payoffs", v: "The nylon gear, Dutch's question about Kabir, the kiss." },
      { k: "Cliffhanger", v: "Maggie." },
    ],
  },
];

// ---------- Pilot pages (quoted exactly; rewritten scenes only) ----------

// ---------- The long game ----------

export const holdsBack = {
  head: "What season one holds back",
  intro: "Every season plants more than it pays off. These stay on the hooks.",
  keys: [
    "The Gearwise and Handoff merger, and the fight over who is CEO.",
    "The full story of Owen's father and the garage. Owen tells it in pieces.",
    "Margot's decision on Prism.",
    "What Kabir does after telling the truth, and whether his father ever hears about it.",
    "Bea's move to the core, and her own company.",
    "What Ellis does with Adrian's letter.",
    "Reed's buried roots in North Dakota.",
    "Dutch's idea number three.",
    "Who Val is falling for. She doesn't know either.",
    "Wren's grandmother's letters.",
  ],
  ahead: [
    { label: "Season two", text: "Owen's and Val's companies run on the same engine, and neither will give up the CEO seat. Bea steps out of Kabir's shadow and graduates to the core." },
    { label: "Beyond", text: "Maggie and Margot collide. Dutch's third idea. The letter in Ellis's drawer. Who Val is falling for." },
  ],
  pull: "Season one opens doors. It doesn't close them.",
};

// ---------- Tone, why now, production ----------

export const comps = {
  head: "Satirical teeth. A warm heart.",
  register: [
    { title: "Silicon Valley", why: "The satire of money, hype and founders who believe their own decks." },
    { title: "New Girl", why: "The shared-apartment hangout, where the doors never stay closed." },
    { title: "Abbott Elementary", why: "A working-class heart that makes the cynicism land softer." },
  ],
  tone: ["Single-camera", "Hangout", "Satirizes the economics", "Loves the people", "Working-class heart", "No headline jokes"],
};

export const whyNow = {
  body: [
    "Every year of the AI boom produces a fresh class of founders and fresh absurdities, but the people living it are the oldest characters in comedy: strivers, frauds, romantics and the friends who keep them honest. The show satirizes the economics and loves the people.",
    "No real executives or companies are parodied. Meridian, Halcyon and Cadence are invented. Recognizable types are built as composites, which age better and clear legal.",
  ],
  pull: "TV development runs two to three years and AI news runs in weeks, so no joke depends on a current event.",
};

export const production = [
  { head: "One address.", text: "Four of the five standing sets are inside one building. The fifth is a single conference room on Sand Hill Road." },
  { head: "Six regulars.", text: "Three men and three women, so every character can carry a real B-story in a half hour. Bea is the first to graduate from the orbit, in season two." },
  { head: "Families on video calls.", text: "A dad at a parts counter, a grandmother in Oakland, eleven uncles who each know a guy. The parents arrive through a phone screen, and occasionally the lobby." },
  { head: "Built to last.", text: "Satire lives in human archetypes and absurd economics, never headlines." },
];

export const creator = {
  body: [
    "C. T. Herndon has run a $500 million manufacturing business, founded AI companies, and written and published novels. He played Division I college baseball at Coastal Carolina University.",
    "He has sat on both sides of the glass room, and he knows what happens to the people who do the work when someone else runs the numbers.",
  ],
  ready: ["Pilot script, 35 pages", "Series bible", "Season one map", "Pitch deck"],
  position: "The pilot is written and the season is mapped. He also has a one-hour drama and a feature, both adapted from his own published novels.",
};
