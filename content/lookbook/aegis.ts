// AEGIS lookbook content. Source of truth for facts: Jack Maddox Books\SCREENPLAY
// (AEGIS_PITCH.md, SEASON_ONE_BEATS.md, AEGIS_TIMELINE.md, the ten .fountain scripts)
// and the book copy in cover_blurbs.json / cover_books_extra.json / cover_taglines.json.
// Edit here; the page reads everything from this file.

export const aegis = {
  title: "AEGIS",
  kicker: "A television series",
  credit: "Created by C. T. Herndon · Based on the AEGIS novels by Jack Maddox",
  tagline: "The weapon is silence.",
  logline:
    "A covert museum unit hunts a fifth-century relic that steals human speech, led by a man who has spent thirty years furious at the customs officer who let a smuggler through on a Friday: his father, who is now on the team.",
  facts: [
    { k: "Format", v: "One-hour drama" },
    { k: "Season one", v: "10 episodes, all written" },
    { k: "Pages", v: "620, revised" },
    { k: "Source", v: "15 novels, series complete" },
  ],
  contact: { name: "C. T. Herndon", email: "chris@resonanceinstitutellc.com" },
};

export const premise = [
  "A covert conservation unit beneath the American Museum of Natural History hunts a fifth-century relic that takes the human voice, across six countries, against an organization that believes forgetting is mercy. They lose it at every stop, because the other side is not running. It is teaching.",
  "The man leading the hunt has spent thirty years furious with a customs officer who let something through on a Friday because a man was pleasant to him. The customs officer is his father. His father is on the team.",
];

export const engine = {
  line: "Relic of the season, operation of the week, and one family at the center of it.",
  argument: { left: "Memory is survival", right: "Forgetting is freedom" },
  body: [
    "Each episode is a recovery in a new city. The season is one object and one argument, and the show never lets either side be stupid. The antagonist is not wrong about what the object is for. He is wrong about whose hand it belongs in, and he believes that is a small disagreement between colleagues. It is the only disagreement there is.",
    "Underneath the argument is a father and a son. Quint tells the story of the customs officer on a bridge in Vienna in the pilot, in the past tense, as though the man were gone. The man is three streets away holding a paper cone of chestnuts. The season is the two of them getting to the point where one can ask and the other can answer.",
  ],
};

export const silence = {
  head: "Several times an episode, the sound stops.",
  body: [
    "Several times an episode the sound design stops. A gunfight with no report. A knife fight scored only by breath that is not there. Two port guards on their knees on wet concrete with their hands at their throats, and the audience hears exactly what they hear, which is nothing.",
    "The team has trained for bad communications. They have never trained for none. By the second episode they are building a language out of hands, because the man who has been loud since he was six cannot warn anybody anymore.",
  ],
  kicker: "No franchise on television owns that. It costs nothing to shoot.",
};

export const world = {
  relic: [
    "The Mask of Arsenius was made in the fifth century from the wood of a dead saint's cell and the bone of his jaw, by brothers who loved him and were frightened the world would forget him. Arsenius had chosen forty years of silence in the desert. His followers preserved the shadow of that gift instead of the gift.",
    "In 1943 an Ahnenerbe captain opened the crypt, made a villager wear it, and wrote in his notebook while the man clawed at his own throat. The file says the Mask burned on a mountain road. A Viennese cataloguing clerk named Marta Voss changed two digits in a manifest and made sure it did not.",
    "In the present day, a crate erases itself from every customs system in the world, and a museum unit that officially does not exist goes to find out why.",
  ],
  rule: { chosen: "Silence chosen is sacred.", taken: "Silence taken is something else." },
  burrow:
    "The Burrow: forty feet under the American Museum of Natural History, run off a conservation line item since 2011 without a single name on it, because the protection is that nobody has read it.",
};

export type Group = "aegis" | "circle" | "past";

export type Person = {
  id: string;
  name: string;
  role: string;
  group: Group;
  x: number; // network layout, 0-1000
  y: number; // network layout, 0-640
  bio: string;
  line?: string;
};

export const people: Person[] = [
  {
    id: "quint",
    name: "Quint Carter",
    role: "Field lead",
    group: "aegis",
    x: 330,
    y: 250,
    bio: "The story is his. Counts three breaths before deciding: in, hold, out. A conservator asked to go to Cyprus for eleven days eighteen years ago, who has been going for eleven days ever since. When two innocent men go down at Varna he signs hold, because moving loses Istanbul, then walks over and hands them a story about crane resonance they will believe for the rest of their lives. He counts them. It is the only thing that separates him from his father. Carries something called Denver, named once, in a mine shaft, and not explained.",
    line: "I'm not chasing objects. I'm chasing a man at the end of a shift.",
  },
  {
    id: "pops",
    name: "Pops Carter",
    role: "Quint's father · the customs officer",
    group: "aegis",
    x: 170,
    y: 120,
    bio: "Thirty-one years at JFK. The Friday is real. The story is not quite right: he never counted the four crates, he learned the number from a newspaper, and he has let his son's version stand for thirty years because the boy needed one. He has carried one page from a convent well in Bukovina against his chest since he was twenty-six. He was given sixteen months in March. He was on a plane to Prague eleven days later.",
    line: "That is not a promise, it is a preference.",
  },
  {
    id: "ellie",
    name: "Ellie Hart",
    role: "Registrar · co-lead",
    group: "aegis",
    x: 470,
    y: 120,
    bio: "She carries discovery; Quint carries decision. Writes in two inks: black for what the document says, red for what she thinks it means. Keeps two lists in one ruined notebook. The back is for the people it was done to. The front is for what it does. By the finale the back is a compliance annex going to four agencies, and the front is the only honest account of the object in the world.",
    line: "It's not hope. It's method.",
  },
  {
    id: "marco",
    name: "Marco Santos",
    role: "Field second",
    group: "aegis",
    x: 520,
    y: 300,
    bio: "Jokes constantly. When his hands go still, the danger is real. He made himself hard to put down, deliberately, like a project. An object in a room in Porto left scars down his right arm. Near the Mask they warm. He is the only one of them it has ever chosen, and the only one who has ever been offered the rest and said no.",
    line: "Loud since I was six. It's a system.",
  },
  {
    id: "sam",
    name: "Sam Chen",
    role: "Fabrication",
    group: "aegis",
    x: 380,
    y: 420,
    bio: "Builds the countermeasures, and builds the last one so that it is armed by the thing going wrong, because that is the only sensor he trusts. Does not discuss the second prototype, until he does: it worked, it saved four people, and then somebody asked him what else it could do, and he answered.",
  },
  {
    id: "ravi",
    name: "Ravi Sharma",
    role: "Cyber and signals",
    group: "aegis",
    x: 200,
    y: 420,
    bio: "Runs the Glasshouse from a rented flat above a bakery in a third country, with no diplomatic cover and a sister who has asked him to stop saying Wednesday. Goes into the field once, badly, and learns exactly what he is for. Talks to himself on an open channel, which is how a woman in Istanbul knows about Norway before he does.",
  },
  {
    id: "evelyn",
    name: "Evelyn Cross",
    role: "Director",
    group: "aegis",
    x: 120,
    y: 280,
    bio: "The red ledger is her conscience. In 2009 she signed for nineteen crates from Beirut knowing four were looted. Nobody found out, and this unit is the account she has been paying into since.",
    line: "I am sixty-one and unpromotable and you are useful.",
  },
  {
    id: "leyla",
    name: "Leyla Osman",
    role: "Curator without permission",
    group: "aegis",
    x: 640,
    y: 180,
    bio: "Runs a foundation in Istanbul that takes memory back from people who call their theft stewardship. Trades in favors, never names. Bought a ticket into the Circle's convoy and rode it for two hundred kilometers before introducing herself.",
    line: "It is a smaller readership. They do not change the wording.",
  },
  {
    id: "grey",
    name: "Grey",
    role: "The antagonist",
    group: "circle",
    x: 790,
    y: 300,
    bio: "A three-season problem. He believes the Mask is a mercy and that the world is drowning in words, and he has been making that case, beautifully, since a room in Lisbon in 1994. He is losing an argument he thinks he is winning. Late in the season he learns he has been an argument for thirty-three years. He is not beaten in season one. He is delayed, and he has decided that before he stops he would like to be a correction.",
    line: "I want you to be tedious.",
  },
  {
    id: "keeper",
    name: "The Keeper",
    role: "Grey's superior",
    group: "circle",
    x: 880,
    y: 160,
    bio: "Worse than Grey because he is not trying to convince anyone. Wants nobody to have it. Carries something the size of a cigarette case in his coat and never takes it out. Will not kill them, because dead men turn into sermons.",
    line: "Dead men turn into sermons.",
  },
  {
    id: "anya",
    name: "Anya Richter",
    role: "The Circle · money and logistics",
    group: "circle",
    x: 880,
    y: 410,
    bio: "Has moved four hundred crates through a Varna ward by never once being interesting.",
  },
  {
    id: "klaus",
    name: "Klaus Richter",
    role: "The Circle · Anya's father",
    group: "circle",
    x: 880,
    y: 520,
    bio: "Has known Grey for forty years and still cannot tell whether he is a fanatic or a technician.",
  },
  {
    id: "melnic",
    name: "Viktor Melnic",
    role: "The Circle · Odessa and Istanbul",
    group: "circle",
    x: 700,
    y: 440,
    bio: "Genuinely warm, which is the problem with him.",
  },
  {
    id: "patron",
    name: "The Patron",
    role: "The Circle · never seen",
    group: "circle",
    x: 760,
    y: 70,
    bio: "Above all of them, unseen. Wants demonstrations done on somebody ordinary, because a demonstration on a willing man only proves the article works.",
  },
  {
    id: "marta",
    name: "Marta Voss",
    role: "Vienna, 1942–1998",
    group: "past",
    x: 520,
    y: 560,
    bio: "Conscripted into a Reich cataloguing office and told she is a librarian. In her first week she opens a crate docketed provenance unrecorded and finds brass candlesticks with a child's name scratched into the base. She writes what she is told. Then she puts two words in her shoe. In 1968, alone, she finds all seven pieces of the thing the Circle is still assembling, separates them, and leaves one line: I have separated them. Do not look for them.",
    line: "Memoria est vita.",
  },
  {
    id: "clerk",
    name: "The Clerk",
    role: "Her mirror",
    group: "past",
    x: 690,
    y: 600,
    bio: "Watches her build the method and comes back a year later to say he will be wanting her lists.",
    line: "I do not need it to be true. I need it to be the only one.",
  },
  {
    id: "heine",
    name: "Capt. Klaus Heine",
    role: "Ahnenerbe, 1943",
    group: "past",
    x: 330,
    y: 600,
    bio: "Opens the crypt in the Carpathians with a scholar's care, makes a villager wear the Mask, and takes notes.",
    line: "Someone will finish this.",
  },
  {
    id: "hannah",
    name: "Hannah",
    role: "The first family found, 1961",
    group: "past",
    x: 150,
    y: 560,
    bio: "Found after thirteen years. In 1998 Marta hands her the folder, a person and not an institution. At ninety-six, she begins writing to a registrar in New York.",
  },
];

export type Link = { a: string; b: string; label: string; kind?: "blood" | "ally" | "enemy" | "thread" };

export const links: Link[] = [
  { a: "quint", b: "pops", label: "Father and son. A Friday thirty years ago that has never been explained.", kind: "blood" },
  { a: "quint", b: "ellie", label: "Co-leads. She carries discovery; he carries decision.", kind: "ally" },
  { a: "quint", b: "marco", label: "Seventeen years in the field together.", kind: "ally" },
  { a: "marco", b: "ellie", label: "Something unsaid. “Ask me again in Norway.”", kind: "ally" },
  { a: "evelyn", b: "quint", label: "“You are useful.” She is the leash.", kind: "ally" },
  { a: "sam", b: "marco", label: "Sam's hypothesis: the Mask has chosen Marco.", kind: "ally" },
  { a: "ravi", b: "leyla", label: "An open channel. She hears about Norway before he does.", kind: "thread" },
  { a: "leyla", b: "quint", label: "Favors, never names.", kind: "ally" },
  { a: "grey", b: "quint", label: "The argument. Grey explains why Varna disqualifies Quint from his own side of it.", kind: "enemy" },
  { a: "keeper", b: "grey", label: "His secret superior. Tells Grey what he was made for.", kind: "enemy" },
  { a: "keeper", b: "pops", label: "A glass of tea on a dock, and an accurate account of what is in his inside pocket.", kind: "enemy" },
  { a: "pops", b: "grey", label: "A page from a well, shown to the one man it stops.", kind: "enemy" },
  { a: "klaus", b: "anya", label: "Father and daughter.", kind: "blood" },
  { a: "klaus", b: "grey", label: "Forty years, and still not sure: fanatic or technician.", kind: "thread" },
  { a: "melnic", b: "grey", label: "The Circle's warm hand in Odessa and Istanbul.", kind: "thread" },
  { a: "patron", b: "grey", label: "Wants the demonstrations done on somebody ordinary.", kind: "thread" },
  { a: "marta", b: "clerk", label: "He learns her method, and wants her lists.", kind: "enemy" },
  { a: "heine", b: "marta", label: "1943. Two digits changed in a manifest.", kind: "enemy" },
  { a: "marta", b: "hannah", label: "One family found, in 1961. The folder, in 1998.", kind: "thread" },
  { a: "hannah", b: "ellie", label: "Marta's list passes from a woman of ninety-six to a registrar in New York.", kind: "thread" },
  { a: "marta", b: "grey", label: "Her 1968 note, beside the clasp in his apartment in Prague.", kind: "thread" },
];

export type Episode = {
  n: string;
  title: string;
  pages: number;
  summary: string;
  places: string[];
};

export const episodes: Episode[] = [
  {
    n: "101",
    title: "The Hungry Part",
    pages: 60,
    summary:
      "Carpathians, 1943: a crypt opened with a scholar's care, and a scream that arrives with no sound. Present day: a crate that was wiped, not lost, and a chest that is not the relic but its cell. A father's story told on a bridge with the father three streets away. Out: a service tunnel in Prague, and the world stops making sound.",
    places: ["carpathians", "newyork", "vienna", "prague"],
  },
  {
    n: "102",
    title: "The Water That Forgets",
    pages: 62,
    summary:
      "A waterworks technician who cannot speak draws the Mask from memory and writes I listen on a pad. Grey is asked what he took from the man's daughter and does not answer. The warehouse in Odessa is plaster, exactly as an old man said it would be. The real find is a blanket corner on a barge, photographed and squared back before Grey turns around. Out: a flat line in New York moves.",
    places: ["prague", "odessa", "blacksea"],
  },
  {
    n: "103",
    title: "Berth 9B",
    pages: 67,
    summary:
      "The transfer at Varna. A port patrol blunders in, two guards go down, and Quint signs hold because taking it loses Istanbul. Then he walks over and hands them a story about crane resonance. Grey explains to a colleague exactly what Quint did and why it disqualifies him from his own argument. At a layby at four in the morning, Pops asks for the number.",
    places: ["varna", "istanbul"],
  },
  {
    n: "104",
    title: "The House That Forgot",
    pages: 60,
    summary:
      "A donor salon in Üsküdar. We meet the waiter before, and we watch him at his family's table after, smiling so they will not worry. Applause with no sound. The buyers ask their questions. Take the Mask tonight and you make a riot. Take the patron's calendar and you make a famine.",
    places: ["istanbul"],
  },
  {
    n: "105",
    title: "The Keeper",
    pages: 59,
    summary:
      "A man who wants nobody to have it buys Pops a glass of tea on a dock and lets him pay for it. Ravi goes into the field once, badly. A cistern under Istanbul, a pump test, and a page from a well shown to the one man it stops. Then an overlook, and the well told at last.",
    places: ["istanbul"],
  },
  {
    n: "106",
    title: "Black Water",
    pages: 63,
    summary:
      "Marco alone on a freighter, and a hush field dropped across a working ship where every man aboard is a civilian. He comes out of hiding for a nineteen-year-old at the rail. A nun on a telephone describes a hole in clay that drains like a sink, and Pops, asked by his son if there is anything else, says no. Seven stones in a hold, described over VHF from a life raft.",
    places: ["blacksea"],
  },
  {
    n: "107",
    title: "The Wheel",
    pages: 58,
    summary:
      "Quint cuts the strap, not the rope. Marco's scars, and what was offered to him in Porto. A coast guard captain who releases witnesses because witnesses move. A house on a headland built as a lens. Out: a helicopter, a winch, a stair hanging on one anchor, and the crate going over.",
    places: ["sile"],
  },
  {
    n: "108",
    title: "The Black Below",
    pages: 56,
    summary:
      "Scuttle. The Mask in the world, in daylight, in a man's bare hands. A custody fight nobody can shoot their way out of, won by a registrar with a notebook. Grey learns what he has been for thirty-three years.",
    places: ["sile"],
  },
  {
    n: "109",
    title: "The Choir",
    pages: 58,
    summary:
      "A dead Soviet seismology station on a fault. The choir is answered, not silenced: a list of names, said into a two-millimeter jack. Arsenius, seen for the first time, and the pilgrim story turned the right way up. A clerk's note from 1968.",
    places: ["erzurum"],
  },
  {
    n: "110",
    title: "The Long Walk",
    pages: 76,
    summary:
      "A drift mine where ten men scratched their names until the light ran out. Pops goes down; Quint carries him out counting three breaths between grips. Grey, empty-handed, in a white field, asking to be tedious. A letter handed over at a door. And a vow in New York: take my voice before you take a life.",
    places: ["erzurum", "newyork", "prague", "cairo"],
  },
];

export type Place = {
  id: string;
  name: string;
  lon: number;
  lat: number;
  layer: "season" | "past" | "next";
  note: string;
  labelSide?: "left" | "right" | "above" | "below";
};

// New York is shown as an inset; everything else sits on the map.
export const places: Place[] = [
  { id: "carpathians", name: "The Carpathians", lon: 24.8, lat: 47.9, layer: "past", note: "1943. Captain Heine opens the crypt. The convoy is bombed on a mountain road, and the Mask disappears into legend. Nearby in Bukovina, a convent well, and the page Pops has carried against his chest for fifty-four years.", labelSide: "above" },
  { id: "vienna", name: "Vienna", lon: 16.37, lat: 48.21, layer: "season", note: "Ellie breaks Marta Voss's cipher. Quint tells the story of the customs officer on a bridge, with the customs officer three streets away.", labelSide: "left" },
  { id: "prague", name: "Prague", lon: 14.43, lat: 50.08, layer: "season", note: "A service tunnel where the world stops making sound. The Podolí waterworks. And in the last scene of the season, a cloth drawn over the clasp in Grey's apartment.", labelSide: "left" },
  { id: "odessa", name: "Odessa", lon: 30.73, lat: 46.48, layer: "season", note: "The warehouse is plaster and gossip, exactly as an old man said it would be.", labelSide: "right" },
  { id: "varna", name: "Varna", lon: 27.91, lat: 43.21, layer: "season", note: "Berth 9B. Two honest guards go down in a hush, and Quint signs hold.", labelSide: "above" },
  { id: "istanbul", name: "Istanbul", lon: 29.0, lat: 41.02, layer: "season", note: "Üsküdar's donor salon, a calligraphy institute, a cistern, a dock where the Keeper buys an old man tea.", labelSide: "below" },
  { id: "blacksea", name: "The Black Sea", lon: 33.6, lat: 43.4, layer: "season", note: "The Horizon Dawn. A hush field across a working ship where every man aboard is a civilian. Seven stones in a hold.", labelSide: "right" },
  { id: "sile", name: "Şile headland", lon: 29.62, lat: 41.18, layer: "season", note: "A house on a headland, built as a lens. A winch, a stair on one anchor, and the Mask in daylight.", labelSide: "above" },
  { id: "erzurum", name: "Erzurum", lon: 41.27, lat: 39.9, layer: "season", note: "A dead Soviet seismology station on a fault line, and the drift mine where ten men scratched their names.", labelSide: "below" },
  { id: "cairo", name: "Cairo", lon: 31.24, lat: 30.04, layer: "season", note: "The last image of the season: a shallow desk drawer that makes a sound too small for the room to notice.", labelSide: "right" },
  { id: "graz", name: "Graz", lon: 15.44, lat: 47.07, layer: "past", note: "1985. A case Marta declines to file, because it would cost a schoolteacher her father.", labelSide: "below" },
  { id: "norway", name: "Norway", lon: 6.9, lat: 61.2, layer: "next", note: "Season two. The Frozen Codex opens in a frozen chapel in a Norwegian fjord in 1943.", labelSide: "right" },
];

export const newYork = {
  name: "New York",
  note: "The Burrow, forty feet under the American Museum of Natural History. A crate wiped from every customs system in a Queens warehouse. And at the end, a vow: take my voice before you take a life.",
};

export const strand = {
  intro:
    "Every episode carries five to eight minutes in the past. The present-day team does not know any of this until the finale. The audience has known since episode two.",
  beats: [
    { year: "1942", text: "Conscripted into a Reich cataloguing office. A crate docketed provenance unrecorded, brass candlesticks with a child's name, and two words in her shoe." },
    { year: "1943", text: "The file says the Mask burned on a mountain road. She changes two digits in a manifest and makes sure it did not." },
    { year: "1944", text: "She learns her list is an index, and that a true record is also a map. She falsifies a ledger for crate 114." },
    { year: "1945", text: "A train out of Vienna in April, on which she makes nine people into somebody else." },
    { year: "1948", text: "A restitution commission will not take her record, because it is not on letterhead." },
    { year: "1961", text: "One family found, after thirteen years: Hannah." },
    { year: "1968", text: "Alone, at fifty-seven, she finds all seven pieces, separates them, and leaves one line: I have separated them. Do not look for them." },
    { year: "1973", text: "A railway clerk who kept a second column because the first one was wrong." },
    { year: "1985", text: "A case in Graz she declines to file, because it would cost a schoolteacher her father." },
    { year: "1998", text: "A folder handed to a person, not an institution." },
  ],
};

export const theList = {
  count: 33,
  body: [
    "In episode four a young waiter is made mute at a donor salon as a sales demonstration. Ellie cannot take him out of the building, because the most dangerous fact in the world about him would be that somebody cared enough to take him. So she does the only thing left. She writes his name down.",
    "By the finale the annex holds thirty-three people. Six named. The unnamed crew of a freighter, hushed on a working deck as an equipment test. A scrap diver from 1981. And ten Soviet coal miners who scratched each other's names on a wall in 1957, in the order they could still hold a piece of coal.",
    "When the Circle assembles its choir on a fault line, Ellie reads the names aloud, and nothing happens, because a name is a sound and the room is built to take sound. Then Quint wires one of Sam's boxes as a driver instead of a canceller and holds the two-millimeter jack out to her, and she says the first name into a hole the size of a pencil lead, and the mountain changes key.",
  ],
  pull: "A litany will not stop physics. No. It stops erasure.",
};

export type Book = {
  n: number;
  title: string;
  tagline: string;
  arc: "main" | "origins" | "closing";
  cover?: string;
  argument?: string;
  antagonist?: string;
  hook: string;
};

export const books: Book[] = [
  { n: 1, title: "The Mask of Arsenius", arc: "main", cover: "/lookbook/aegis/covers/01.jpg", tagline: "Some voices were never meant to be silenced.", argument: "Silence stolen versus silence chosen", antagonist: "Grey", hook: "Season one. A crate that erased itself from every customs system leads AEGIS to a relic the Reich lost in 1943." },
  { n: 2, title: "The Frozen Codex", arc: "main", cover: "/lookbook/aegis/covers/02.jpg", tagline: "Some memories were never meant to survive.", argument: "Words hidden from fire", antagonist: "Grey", hook: "Norway, 1943. Vellum pages bound in ice lift into the smoke like startled birds. The Mask took voices. The Codex takes the certainty that you know what is true." },
  { n: 3, title: "The Mirror of Betrayal", arc: "main", cover: "/lookbook/aegis/covers/03.jpg", tagline: "Some reflections were never meant to be trusted.", argument: "Manufactured paranoia; the team turns on itself", antagonist: "Grey, contained", hook: "A disc of black glass that shows you betrayals that have not happened yet. The moment you believe what you see, you make it real." },
  { n: 4, title: "The Bell of Sant'Elia", arc: "main", cover: "/lookbook/aegis/covers/04.jpg", tagline: "Some truths were never meant to be spoken.", argument: "Compelled truth, weaponized", antagonist: "Moldovan", hook: "A bell cast for Justinian. When it rings, the condemned confess everything they have ever hidden. Within two minutes, they have killed each other." },
  { n: 5, title: "The Lens of Calaphates", arc: "main", cover: "/lookbook/aegis/covers/05.jpg", tagline: "Some futures were never meant to be seen.", argument: "Inevitability as a weapon", antagonist: "The Warden", hook: "The Lens shows the future. Not possibilities. Certainties. And the weight of knowing has broken everyone who dared to look." },
  { n: 6, title: "The Crown of Theodosius", arc: "main", cover: "/lookbook/aegis/covers/06.jpg", tagline: "Some wills were never meant to be broken.", argument: "Forced consensus, erased will", antagonist: "The Warden", hook: "An iron circlet that does not command. It aligns. A man who wants global alignment in hours and calls it peace." },
  { n: 7, title: "The Ashes of Babylon", arc: "main", cover: "/lookbook/aegis/covers/07.jpg", tagline: "Some words were never meant to be lost.", argument: "The hunger that eats meaning", antagonist: "The Ashes themselves", hook: "A scholar mid-lecture can see the cuneiform marks, can count them, and cannot read them. Within forty-eight hours, twelve more." },
  { n: 8, title: "The Compass of Pietro", arc: "main", cover: "/lookbook/aegis/covers/08.jpg", tagline: "Some fears were never meant to be named.", argument: "Direction, and who sets it", antagonist: "The Remnant", hook: "Three bidders, one instrument, and within nine days three deaths, each shaped by the fear the victim never admitted holding." },
  { n: 9, title: "The Unbound Seal", arc: "main", cover: "/lookbook/aegis/covers/09.jpg", tagline: "Some promises were never meant to be unmade.", argument: "Language, contract, and what binds", antagonist: "The Hierophant", hook: "It dissolves agreements, all of them, including the ones that constitute the team itself." },
  { n: 10, title: "The Lamp of Scetis", arc: "origins", cover: "/lookbook/aegis/covers/10.jpg", tagline: "Some faces were never meant to be forgotten.", hook: "Vienna, 1963. A young museum man named Theodore Carter notices what nobody else does, and gets hired by the smallest outfit in American intelligence. Lake Nasser is rising over Nubia, and a desert monk's lamp takes the faces of everyone who sits in its light." },
  { n: 11, title: "The Walls of Ur", arc: "origins", cover: "/lookbook/aegis/covers/11.jpg", tagline: "Some rooms were never meant to be opened.", hook: "1970. Eleanor Carter reaches the chamber under the ziggurat at Ur. The love story at the heart of the series, and the reason Pops built the Burrow." },
  { n: 12, title: "The Sleepless Box", arc: "origins", cover: "/lookbook/aegis/covers/12.jpg", tagline: "Some vows were never meant to be broken.", hook: "Romania, 1983. A box nobody near can sleep beside, a Securitate trap at a frontier crossing in the snow, and a promise Pops will keep for forty years." },
  { n: 13, title: "The Eye of Paro", arc: "closing", tagline: "Some sights were never meant to be shared.", hook: "A Himalayan monastery's eye of rock crystal: within two hundred meters, whatever most people believe is what everyone sees. The evidence against the scholar who guarded it is perfect, and Quint believes every word." },
  { n: 14, title: "The Widow's Chime", arc: "closing", tagline: "Some bells were never meant to ring.", hook: "A bronze handbell that makes whoever hears it remember every person they have ever lost, all at once. Evelyn Cross reads the ledger of the dead to its last line." },
  { n: 15, title: "The Tally of Eridu", arc: "closing", tagline: "Some counts were never meant to be finished.", hook: "Under the museum, nine of the most dangerous objects ever made, each held shut by one person. On a Sunday morning in June, the house wakes all at once. The final book." },
];

export const franchise = {
  head: "Fifteen novels. One relic, one argument, one season each.",
  body: "The series is finished. Nothing waits on an author to write the next book, and there is no story fatigue to manage: every relic is a new argument, and the family at the center ages through it.",
  shape: [
    { label: "The main series", books: "Books 1–9", text: "One relic per season, the team in the present day, Grey for three seasons and new antagonists after him." },
    { label: "Origins", books: "Books 10–12", text: "Theodore “Pops” Carter and Eleanor, 1963 to 1983, and how the Burrow was built. A prequel season or limited series." },
    { label: "The closing trilogy", books: "Books 13–15", text: "The endgame: nine objects under the museum, nine people holding them shut, and one Sunday morning in June." },
  ],
};

export const comps = {
  register: [
    { title: "Slow Horses", why: "The ensemble procedural register: tired, funny, competent people in an outfit nobody respects." },
    { title: "Warehouse 13", why: "The artifact premise, played entirely straight." },
  ],
  franchise: ["Reacher", "Bosch", "Jack Ryan", "The Bourne films"],
  tone: ["Dry", "Understated", "Procedural", "Bone-tired", "Humor as a defense", "Never stupid on either side"],
};

export const production = [
  { head: "The silence is free.", text: "It is a sound-design choice, not an effect, and it does more work than any set piece in the season." },
  { head: "One hero prop.", text: "One relic per season. The stones are seven grey slabs the size of a laptop. The countermeasure is a red toolbox with a handwritten label." },
  { head: "Practical, European locations.", text: "A waterworks, a container yard, a calligraphy institute, a coast guard cutter, a cistern, a headland with a lighthouse, a Soviet instrument hall, a drift mine." },
  { head: "A contained period strand.", text: "Five to eight minutes an episode, in small interiors: an office, a kitchen, a railway carriage, a nursing-home bed. It never leaves a room." },
];

export const creator = {
  body: [
    "C. T. Herndon writes fiction as Jack Maddox: the fifteen-book AEGIS series and the twelve-book Apex Directive series.",
    "He has run a $500 million manufacturing business, founded AI companies, and played Division I college baseball. He builds worlds all the way to the last page.",
  ],
  position:
    "All ten scripts of season one are written and revised. The season two novel is published. The fifteen-book arc is finished. A buyer is not betting on pages that do not exist yet.",
};
