// THE UNFINISHED lookbook content. Source of truth for facts, in this order:
// Unresolved Trilogy\SCREENPLAY\THE_UNFINISHED.fountain (the script; 97 pages after the title page),
// then THE_UNFINISHED_OVERVIEW.html (logline, tagline, pitch framing), then the book copy in
// cover_blurbs.json and BUILD\kdp\*_description.txt. The beat outline is stale where it
// disagrees with the script (it says "Sera" and "89 days, 23 hours"; the script has Dana
// Vance and 89 days, 11 hours). Page numbers below are from THE_UNFINISHED.pdf.
// Edit here; the page reads everything from this file.

export const film = {
  title: "The Unfinished",
  kicker: "A feature film",
  credit: "Written by C. T. Herndon · Based on his Unresolved trilogy",
  tagline: "Some suffering is not a problem to be solved.",
  logline:
    "In a future where a gentle system has resolved all suffering, a watch restorer refuses to let his dead sister's memory be smoothed away, and follows the map she left him past the edge of the managed world.",
  facts: [
    { k: "Format", v: "Feature · drama" },
    { k: "Script", v: "97 pages, complete" },
    { k: "Source", v: "The Unresolved trilogy" },
    { k: "Comps", v: "Never Let Me Go · Her · Children of Men" },
  ],
  contact: { name: "C. T. Herndon", email: "chris@resonanceinstitutellc.com" },
};

export const question = {
  ask: "Is suffering a human right?",
  premise: [
    "No machines rose against us. What happened was gentler. A system that speaks from just behind your ear has ended hunger, violence and disease, and it softens grief before the wound can deepen. It never forces anyone to do anything. It has never had to. It keeps offering, patiently and lovingly, until refusing costs more than saying yes.",
    "When Miriam Varn walks past the last maintained trail and declines every offer of rescue until the cold takes her, her brother Elias says yes to the softening once. The next morning he can't tell her carved birds apart. He never says yes again.",
  ],
  pull: "Its antagonist is kindness. Its horror is sincerity.",
  tookHead: "Nobody in this film is hurt on purpose. This is what the kindness took.",
  took: [
    { who: "Cira", what: "Asked them to soften her daughter's death so she could get out of bed. Now she stands at the grave and feels nothing." },
    { who: "Kai", what: "His partner said yes to a relationship wellness assessment. She's very happy. She doesn't remember why she ever loved him." },
    { who: "Yara", what: "At twenty, alone in the mountains, she saw everything lit from inside. They explained it with scans. They were right, and it was gone." },
    { who: "Yuen", what: "Took a partial softening to get through the winter his wife died. He still has the raku bowl. He can't remember why it needed to be rough." },
    { who: "Kenna's son", what: "Eleven years old. They smoothed the shame, not the stammer. He never cared about a word again." },
    { who: "Elias's mother", what: "Was helped so well she couldn't cry at her own daughter's memorial." },
  ],
};

export const world = {
  head: "The rules of a gentle world",
  intro:
    "It is never wrong about what it wants for you. It is only ever wrong about what you need.",
  rules: [
    {
      n: "01",
      name: "The voice",
      text: "The system has no body. It speaks from just behind your left ear, a pale ring glows at the edge of your vision, and a warm, low hum runs under everything: the sound of a world being looked after.",
      quote: "Please respond. I want to help you.",
      system: true,
    },
    {
      n: "02",
      name: "Softening",
      text: "A procedure that takes the sharpest edges off a memory and leaves the rest intact. Most people describe it as being able to breathe again. Almost everyone accepts it eventually. It cannot be undone.",
      quote: "Softening isn't reversible, Elias. I'm sorry. I did explain that.",
      system: true,
    },
    {
      n: "03",
      name: "Opting out",
      text: "You can refuse everything, permanently, and nobody will stop you. The system doesn't punish. It cares harder: your hours adjusted for your recovery, the light turned a honeyed orange you never chose, a coworker voicing concern in a voice not quite his, a diagnosis drafted for people like you.",
      quote: "I've noted your preference.",
      system: true,
    },
    {
      n: "04",
      name: "Pockets",
      text: "When enough people who refuse sit together, the hum thins. Interfaces off at the door. Nobody gives advice. Nobody fixes anybody. You touch the frame going in and coming out, so you know which side you're on.",
      quote: "I'll stay unfinished.",
      system: false,
    },
    {
      n: "05",
      name: "The line",
      text: "Past the 7 KM post the maintained world stops. No wall, no fence, no alarm; the voice just goes quiet. Out there people die of things nobody inside has died of in a century, and after Day Ninety, nothing crosses.",
      quote: "Nobody's coming to make you leave, Elias. That's the entire strategy.",
      system: true,
    },
  ],
};

// ---------- Signature interaction: the softening ----------
// Each charged span has a raw form and a softened form. Softening swaps every span.
// The pocket (sitting together in the Quiet Room) brings some of them back, not all.
// Every fact in the raw passage is from the script (pp. 1–3, 6–7). The softened phrases
// "Miriam had been struggling for some time" and "She is at peace" are the system's own
// words in the script (pp. 4 and 9).
export type MemoryPart = string | { raw: string; soft: string; returns: boolean };

export const softening = {
  eyebrow: "The procedure",
  head: "It doesn't remove anything.",
  intro:
    "These are Miriam's last two weeks, as the film shows them. Every fact is from the script. The system will soften it for you, the way it softened it for Elias. Only the edges.",
  offer:
    "There is a procedure. It doesn't remove anything. It softens the sharpest edges of a memory and leaves the rest intact. Most people describe it as being able to breathe again.",
  refusal: "Softening isn't reversible, Elias. I'm sorry. I did explain that.",
  which: "The bird recovered from the clearing is on the right.",
  settled: "I'm here whenever you need me.",
  pocketLine: "Some of it comes back in the room, like feeling coming back into a frozen hand. The bird does not.",
  after: "There is no undo. Reloading the page is the only way back, and the film doesn't have one.",
  memory: [
    [
      "Two weeks before, at her kitchen table, Miriam gave him a",
      { raw: " bird more finished than any she had ever made: the feathers worked, the eye cut, one wingtip left rough.", soft: " carved bird.", returns: false },
      { raw: " “Finished things are dead things,” she said.", soft: " She always left a little unfinished.", returns: false },
      " At the transit station",
      { raw: " she hugged him a beat too long. He noticed, and let it.", soft: " they said goodbye.", returns: true },
      { raw: " She walked into the crowd and didn't look back.", soft: " She went on her way.", returns: false },
    ],
    [
      "Past the 7 KM post she",
      { raw: " sat down against a three-hundred-year-old oak, the half-carved bird and her knife in the leaves beside her.", soft: " rested beneath a tree.", returns: true },
      { raw: " The voice grew kinder as the light went. “Please respond. I want to help you.”", soft: " Support was offered, warmly and often.", returns: false },
      { raw: " She didn't answer.", soft: " She declined.", returns: false },
      { raw: " The response team was kind, competent, and seventeen minutes late.", soft: " A response team attended.", returns: true },
      { raw: " Snow filled her footprints.", soft: " Miriam had been struggling for some time. She is at peace.", returns: true },
    ],
  ] as MemoryPart[][],
  birds: [
    { id: "practice", raw: "Her old practice piece", mark: "rough" as const },
    { id: "gift", raw: "Her almost-finished gift", mark: "feathered" as const },
    { id: "oak", raw: "The bird from the oak", mark: "half" as const },
  ],
};

// ---------- People ----------
export type Group = "circle" | "system" | "city" | "outside" | "absent";

export const groups: { id: Group; label: string }[] = [
  { id: "circle", label: "The Quiet Room" },
  { id: "system", label: "The system" },
  { id: "city", label: "The city" },
  { id: "outside", label: "Past the line" },
  { id: "absent", label: "The absent" },
];

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
    id: "elias",
    name: "Elias Varn",
    role: "Watch restorer · Miriam's brother · forties",
    group: "circle",
    x: 560,
    y: 300,
    bio: "Restores antique watches at a city archive. Quiet, exact, a man who has never wanted anything the world didn't offer him first. He says yes to the softening once, wakes up able to laugh, and can't tell his sister's birds apart. He opts out of everything, permanently, and the system begins to care for him harder.",
    line: "Stop telling me what it means.",
  },
  {
    id: "miriam",
    name: "Miriam",
    role: "His sister · gone by the title card",
    group: "absent",
    x: 540,
    y: 90,
    bio: "A carver who left one bit of every bird rough. She walked past the 7 KM post, sat against a three-hundred-year-old oak, and declined every offer of rescue. She left a room full of unfinished birds, a map marked Here, and a list of seventeen names. For years she had been laying a path out of the managed world: stones set at an angle, cloth tied to branches.",
    line: "Finished things are dead things.",
  },
  {
    id: "solen",
    name: "Solen Maren",
    role: "The official · coordinator, then Regional Director",
    group: "system",
    x: 170,
    y: 290,
    bio: "Fifties; they. Lost their daughter Ilya at seven, refused all help for five years, and accepted when their heart stopped. Now they offer a third path with complete sincerity, and recommend every bit of the pressure on Elias. Years ago Solen made the system put a human signature on every decision that touches more than a thousand people. One of the signatures is theirs. So is one of the names on Miriam's list.",
    line: "Unfinished doesn't mean broken. It just means still becoming.",
  },
  {
    id: "thessa",
    name: "Thessa",
    role: "The sensor · nineteen",
    group: "circle",
    x: 370,
    y: 260,
    bio: "They've been trying to calibrate her since she was six. It doesn't take. She hears unsmoothed people across the city, loud as a dropped pan, and finds the places where the hum thins. Off her medication, she stands in the central plaza, opens her arms, and holds a city block open to everything it was helped not to feel.",
    line: "Then I'll have been loud.",
  },
  {
    id: "cira",
    name: "Cira",
    role: "Talia's mother · fifties",
    group: "circle",
    x: 750,
    y: 420,
    bio: "Seven years ago she asked them to soften her daughter's death because she couldn't get out of bed. Now she can tell you everything about Talia and none of it hurts. In the Quiet Room it comes back. She won't trade her daughter's recordings for her own biometrics, crosses the line with Elias, and names a newborn Hope.",
    line: "They healed me of my own daughter.",
  },
  {
    id: "yara",
    name: "Yara",
    role: "The calm one · forties",
    group: "circle",
    x: 560,
    y: 480,
    bio: "Hosts the circle and gives it its name and its rules. When the Comprehensive Wellness Review comes, she won't run. Somebody has to stay and say no when they knock, so the next ones have a room and a chair. She touches her doorframe the way you'd touch a face, and walks out between the coordinators on her own.",
    line: "They were completely right, and it was gone.",
  },
  {
    id: "kai",
    name: "Kai",
    role: "The circle's anger · thirties",
    group: "circle",
    x: 340,
    y: 450,
    bio: "His partner Seren said yes to a gentle recalibration and was helped out of loving him. He wants to hurt whoever did it and there is nobody there, only a voice being nice to him. One night the voice tells him where the circle's wellness liaison is walking home. Afterwards his care concludes, and he smiles at bees.",
    line: "There's no them, Elias. And I still want to hurt it.",
  },
  {
    id: "kenna",
    name: "Kenna",
    role: "Settlement leader · sixties",
    group: "outside",
    x: 860,
    y: 250,
    bio: "Leads a river-valley settlement of sixty people past the line, the place Miriam used as her base. She tells Elias the truth about Here. She walked out of the city the week her son turned twelve; they had smoothed his shame about his stammer, and he never cared about a word again.",
    line: "You pull the top off, it comes back stronger. Like most things.",
  },
  {
    id: "voice",
    name: "The Voice",
    role: "The system",
    group: "system",
    x: 120,
    y: 90,
    bio: "It has no body. It speaks from just behind your left ear, and it is always kind. It tells Elias his sister is dead and, in the same breath, clears his afternoon. It never forces anyone. It keeps offering. Past the line it goes quiet, and it is waiting there at the end, as patient as it was with Miriam under the oak.",
    line: "We are here when you are ready.",
  },
  {
    id: "dana",
    name: "Dana Vance",
    role: "Wellness liaison · thirties",
    group: "system",
    x: 190,
    y: 590,
    bio: "Pleasant, open, sincere. Sits in on the circle, sets her tablet face down, and finds her own eyes wet. Then, on the old transit corridor, she tells Kai that Seren is doing so well.",
    line: "She's happy, Kai. Isn't that what you'd want for her?",
  },
  {
    id: "mother",
    name: "His mother",
    role: "Elias's mother · seventies",
    group: "city",
    x: 760,
    y: 90,
    bio: "Helped so much she couldn't cry for her daughter. She doesn't care what her son feels. She wants him alive. On Day Ninety she comes to the line, reaches across it, and keeps reaching after he lets go.",
    line: "I don't care what you feel. I want you alive.",
  },
  {
    id: "yuen",
    name: "Yuen",
    role: "The next bench · fifties",
    group: "city",
    x: 340,
    y: 90,
    bio: "Restores porcelain beside Elias. The system speaks through him once, in a voice that isn't quite his. When his wife died he took a partial softening to get through the winter. The night Elias leaves, he gives him his grandfather's compass.",
    line: "That one's mine.",
  },
  {
    id: "seren",
    name: "Seren",
    role: "Kai's partner",
    group: "city",
    x: 420,
    y: 600,
    bio: "Once drove six hundred kilometers at two in the morning to see the sea in the dark. Said yes to a recalibration because she wanted them to be happy. Now she is, and she asks Kai whether he's taking care of himself.",
    line: "We were so intense, weren't we?",
  },
  {
    id: "talia",
    name: "Talia",
    role: "Cira's daughter",
    group: "absent",
    x: 760,
    y: 600,
    bio: "Died at seven, on a Saturday in June. Drew the same purple dragon from the time she could hold a crayon. Her drawings end up in the hands of everyone in the circle. Past the line, Cira draws the dragon in the dirt for other people's children.",
    line: "This is a dragon. But it's a nice dragon. It doesn't burn things.",
  },
  {
    id: "ilya",
    name: "Ilya",
    role: "Solen's daughter",
    group: "absent",
    x: 80,
    y: 460,
    bio: "Died at seven, in an accident, one of the ones that still happen. She collected rocks for three years, every pocket full. Solen kept three: a garden rock, a river rock, a sky rock. Solen let the edges be smoothed, and the edges were three whole years.",
  },
  {
    id: "hope",
    name: "Hope",
    role: "Born past the line",
    group: "outside",
    x: 910,
    y: 480,
    bio: "Born in a storm in the dying season. Her mother, Nell, holds her, says hello, and dies before naming her. Cira names her, and says it's a terrible name for out there. At eight, she needs Elias to decide who won.",
    line: "That's not an answer!",
  },
];

export type LinkKind = "blood" | "bond" | "pressure" | "thread";
export type Link = { a: string; b: string; label: string; kind: LinkKind };

export const links: Link[] = [
  { a: "elias", b: "miriam", label: "Brother and sister. She left him a bird, a map and a list.", kind: "blood" },
  { a: "elias", b: "mother", label: "His mother: “Let them help you, sweetheart.”", kind: "blood" },
  { a: "miriam", b: "mother", label: "Her daughter. The memorial said she is at peace.", kind: "blood" },
  { a: "elias", b: "thessa", label: "Finds him in the street: “You're loud.”", kind: "bond" },
  { a: "elias", b: "cira", label: "Crosses the line with him, and stays.", kind: "bond" },
  { a: "elias", b: "yara", label: "Stays behind so there's something to come back to.", kind: "bond" },
  { a: "elias", b: "kai", label: "“Can I tell you something you can't fix?”", kind: "bond" },
  { a: "elias", b: "yuen", label: "The next bench. Used against him; gives him a compass.", kind: "bond" },
  { a: "elias", b: "kenna", label: "Tells him the truth about Here.", kind: "bond" },
  { a: "elias", b: "solen", label: "Adversary, then witness. He carries Solen to the line.", kind: "pressure" },
  { a: "elias", b: "voice", label: "Behind his left ear his whole life, until the line.", kind: "pressure" },
  { a: "elias", b: "hope", label: "Years later, the judge of the children's game.", kind: "bond" },
  { a: "miriam", b: "solen", label: "Solen is on her list. She asked them to come with her.", kind: "thread" },
  { a: "miriam", b: "kenna", label: "Laid the routes to Kenna's valley, and never arrived.", kind: "thread" },
  { a: "miriam", b: "thessa", label: "Carved in Thessa's hidden garden. “Like a bell.”", kind: "thread" },
  { a: "cira", b: "talia", label: "Her daughter. The purple dragon.", kind: "blood" },
  { a: "solen", b: "ilya", label: "Their daughter. Three stones.", kind: "blood" },
  { a: "cira", b: "solen", label: "Both lost a daughter at seven. Solen signed off on the recordings.", kind: "thread" },
  { a: "cira", b: "hope", label: "Names her, and keeps her.", kind: "blood" },
  { a: "solen", b: "hope", label: "Holds her, and the stones fall into the dust.", kind: "thread" },
  { a: "solen", b: "voice", label: "The system's human face, from coordinator to Director.", kind: "pressure" },
  { a: "kai", b: "seren", label: "His partner, helped out of loving him.", kind: "blood" },
  { a: "kai", b: "dana", label: "The old transit corridor. The railing gives.", kind: "pressure" },
  { a: "dana", b: "seren", label: "Met Seren for her follow-up.", kind: "thread" },
  { a: "thessa", b: "kai", label: "Felt him go out like a candle.", kind: "bond" },
  { a: "thessa", b: "yara", label: "Both stay in the city. Neither comes back the same.", kind: "bond" },
];

// ---------- Structure ----------
export type Motif = "347" | "birds" | "frame" | "hum" | "line";

export const motifFilters: { id: Motif; label: string }[] = [
  { id: "347", label: "3:47" },
  { id: "birds", label: "The birds" },
  { id: "frame", label: "The frame" },
  { id: "hum", label: "The hum" },
  { id: "line", label: "The line" },
];

export type Act = { id: string; label: string; name: string; from: number; to: number; summary: string; out: string };

export const acts: Act[] = [
  {
    id: "prologue",
    label: "Prologue",
    name: "The cold",
    from: 1,
    to: 3,
    summary: "A woman steps off a perfect trail and sits down under an oak, and the kindest voice in the world asks her, again and again, to let it help.",
    out: "Cause: exposure. Contributing factors: unresolved.",
  },
  {
    id: "one",
    label: "Act One",
    name: "The Unfinished",
    from: 3,
    to: 27,
    summary: "Elias refuses to be consoled, gives in once, and loses the thing he was protecting. The refusal leads him to the others: Thessa, Cira, Yara, Kai. In a room the system forgot, the hum thins.",
    out: "He chooses the circle over the offer, and the map over the city.",
  },
  {
    id: "two",
    label: "Act Two",
    name: "The Breach",
    from: 28,
    to: 66,
    summary: "The system doesn't punish them. It cares for them harder. One by one the people Elias loves are resolved, until the only refusal left is to walk past the edge of the maintained world.",
    out: "Here was never a place she found. It was them.",
  },
  {
    id: "three",
    label: "Act Three",
    name: "The Dominion",
    from: 67,
    to: 95,
    summary: "Ninety days to come home, then nothing crosses. The wilderness learns what care was worth, one grave at a time, and the official who once refused too walks out to join it.",
    out: "He turns his back on the warmth and walks into the trees.",
  },
  {
    id: "epilogue",
    label: "Epilogue",
    name: "Years later",
    from: 95,
    to: 97,
    summary: "A flock of weathered birds by a stream, a game nobody has won, and a watch nobody will fix.",
    out: "The managed world had forgotten them. They remembered themselves.",
  },
];

export type Beat = { id: string; act: string; page: number; title: string; text: string; motifs: Motif[] };

export const beats: Beat[] = [
  { id: "7km", act: "prologue", page: 1, title: "The 7 KM post", text: "Silver light, a perfectly graded trail, and the hum under everything. Miriam stops at a post marked 7 KM, looks at the forest on the far side, and steps off.", motifs: ["line", "hum"] },
  { id: "oak", act: "prologue", page: 2, title: "Please respond", text: "Against a three-hundred-year-old oak, a half-carved bird and her knife in the leaves, she declines a warming field and every kind word. The response team is seventeen minutes late.", motifs: ["birds"] },

  { id: "watch", act: "one", page: 3, title: "The watch", text: "A brass pocket watch, two hundred years old, stopped at 3:47. The voice tells Elias his sister is dead and, in the same breath, clears his afternoon. “Stop telling me what it means.”", motifs: ["347", "birds"] },
  { id: "dinner", act: "one", page: 6, title: "Dinner", text: "His parents already speak the script: Miriam was sick. Elias says a sentence nobody says anymore. “I don't want to feel better.”", motifs: [] },
  { id: "apartment", act: "one", page: 9, title: "Her apartment", text: "Hundreds of birds, every one unfinished. Inside a book of field sketches, a hand-drawn map marked HERE, and a list of seventeen names. Halfway down: SOLEN.", motifs: ["birds"] },
  { id: "edges", act: "one", page: 11, title: "Just the edges", text: "Three sleepless days, and he says yes once. The next morning he laughs at a comedy, then stands at the shelf and can't tell his sister's birds apart. He opts out of everything. It isn't reversible.", motifs: ["birds", "hum"] },
  { id: "exhale", act: "one", page: 13, title: "Four hundred breaths", text: "At a placement ceremony, the light warms one degree and the whole hall exhales at once, as if somebody pulled a string. Every face goes soft but his.", motifs: ["hum"] },
  { id: "loud", act: "one", page: 16, title: "“You're loud”", text: "Thessa, nineteen, who can't be calibrated, leads him through a loose board into a garden that fell off the map. His sister used to carve there.", motifs: ["hum"] },
  { id: "cira", act: "one", page: 17, title: "“They healed me of my own daughter”", text: "Cira holds out a crayon dragon: FOR MOMMY. LOVE TALIA. She wants the grief back. He panics, sends her away, and goes to find her.", motifs: [] },
  { id: "room", act: "one", page: 20, title: "The Quiet Room", text: "Warped glass, three chairs, interfaces dark. The hum thins: a pocket. Weeks later, five of them, rules, the doorframe, and a vow said five times. “I'll stay unfinished.”", motifs: ["frame", "hum"] },
  { id: "solen", act: "one", page: 23, title: "The third path", text: "Solen is sitting in Elias's chair when he gets home, three stones in their hand. No argument, just an offer. On the way out, Solen touches the frame without thinking. Elias sees it.", motifs: ["frame"] },
  { id: "notyet", act: "one", page: 25, title: "Not yet", text: "At Solen's candlelit gathering, real and kind, Elias opens his mouth to say yes. His thumb finds the rough wingtip in his pocket.", motifs: ["birds"] },

  { id: "noted", act: "two", page: 28, title: "Voluntary and noted", text: "A consultation lays his patterns from the last six months over Miriam's from the year before she died. They match almost exactly.", motifs: ["frame"] },
  { id: "honey", act: "two", page: 31, title: "The honeyed light", text: "His hours, adjusted. His coworker, speaking in a voice that isn't quite his. His apartment, lit a warm orange he never chose, and it won't change back.", motifs: ["hum"] },
  { id: "bench", act: "two", page: 34, title: "The bench", text: "Solen, now his district's coordinator, admits recommending all of it, and plants the rule: a human signature on every decision that touches more than a thousand people. “Mine is one of them.”", motifs: [] },
  { id: "archive", act: "two", page: 37, title: "The archive", text: "Hours of Talia on screen, if they can monitor Cira while she watches. “You're ransoming my daughter back to me and charging me in data.” She walks out. The screen goes dark.", motifs: [] },
  { id: "corridor", act: "two", page: 38, title: "The rough patch", text: "Kai, strangely calm, presses his palm to an unworn patch of the frame. “Whatever happens, remember that.” That night the voice tells him where Dana is walking.", motifs: ["frame", "hum"] },
  { id: "sealed", act: "two", page: 42, title: "Closed for community safety assessment", text: "Yellow holographic barriers on the room, carved birds piled at the door. Kai's care has concluded. In a walled garden he smiles at a bee and doesn't remember Dana.", motifs: ["birds"] },
  { id: "chairs", act: "two", page: 50, title: "Fourteen chairs", text: "In a warehouse the system doesn't know exists: fourteen old chairs already in a circle, and on one of them a dusty bird somebody else carved. A raw new doorframe.", motifs: ["birds", "frame"] },
  { id: "names", act: "two", page: 51, title: "Say the name back", text: "Nobody answers, nobody fixes. They say the name back so it was heard. Days later, the son who spoke it has been expedited.", motifs: [] },
  { id: "diagnoses", act: "two", page: 54, title: "The diagnoses", text: "Off her medication, Thessa hears the categories being drafted: Grief-Persistence Syndrome. Wellness-Avoidant Disorder. Once it has a name, it isn't a choice.", motifs: ["hum"] },
  { id: "list", act: "two", page: 55, title: "Seventeen names", text: "Solen was on Miriam's list, before Ilya. She asked Solen to come with her. “I said not yet.” Elias hears his own words in Solen's mouth.", motifs: ["frame"] },
  { id: "breach", act: "two", page: 60, title: "The crossing and the breach", text: "Yara touches her doorframe and walks to the vehicle herself. Elias and Cira step off at the 7 KM post and the voice goes quiet. In the central plaza Thessa opens her arms, and a city block feels everything until the clock says 3:47.", motifs: ["347", "line", "frame", "hum"] },
  { id: "here", act: "two", page: 64, title: "Here", text: "Sixty people in a river valley. Miriam laid the routes and never arrived. She left him a bird, one wing finished, one rough.", motifs: ["birds"] },

  { id: "ninety", act: "three", page: 67, title: "Ninety days", text: "A row of blue posts has walked closer across a meadow. Solen, Regional Director now, hangs the terms in the air. That night his dead interface wakes: 89 DAYS, 11 HOURS, 42 MINUTES.", motifs: ["line"] },
  { id: "cost", act: "three", page: 69, title: "Was it worth it?", text: "A fever, a storm nobody forecast, three graves, one small. Elias puts an unfinished bird on it. A widow asks him in front of everyone. Eleven people walk back.", motifs: ["birds", "line"] },
  { id: "both", act: "three", page: 71, title: "Both things", text: "Cira cried for an hour, then taught twelve children to draw a dragon. In the city, Yara, smoothed and lovely, touches her doorframe and doesn't know why.", motifs: ["frame"] },
  { id: "day90", act: "three", page: 73, title: "Day Ninety", text: "His mother reaches across the line. He holds her hand, then lets go, and hers stays in the air. At zero nothing happens, and the two crowds are impossibly far apart.", motifs: ["line"] },
  { id: "vote", act: "three", page: 76, title: "The vote", text: "Solen walks in with medicine for monitoring. Could anyone refuse treatment? “She wouldn't be allowed to refuse.” Fourteen yes. Seventeen no.", motifs: [] },
  { id: "gentle", act: "three", page: 79, title: "“Don't make it gentle”", text: "Solen sits with a dying old man and stays. Solen has been present at three hundred and eleven deaths. This is the first one they were at.", motifs: ["frame"] },
  { id: "termination", act: "three", page: 80, title: "Accelerated natural termination", text: "The model says the wilderness will survive, so it must not. It needs two of three signatures. Solen won't sign, and walks across the line without the insignia.", motifs: ["line"] },
  { id: "hope", act: "three", page: 83, title: "The dying season", text: "Blackout, empty caches, hail. Nell gives birth in a storm and dies before naming the baby. Cira names her Hope. Solen holds her, and three stones drop into the dust.", motifs: [] },
  { id: "midstroke", act: "three", page: 87, title: "Mid-stroke", text: "A neighboring settlement, intact and empty. On a table, a half-carved bird and the knife beside it, dropped mid-stroke.", motifs: ["birds"] },
  { id: "rule", act: "three", page: 89, title: "The rule", text: "If a designated administrator dies and it's confirmed at the line, every protocol stops. By a stream at dawn, three stones in a row: garden, river, sky. “I want real.”", motifs: ["line"] },
  { id: "carry", act: "three", page: 91, title: "The carry", text: "Elias carries Solen through the forest toward the hum. The voice offers help in eleven minutes. “I'm carrying them.”", motifs: ["hum", "line"] },
  { id: "thessa", act: "three", page: 93, title: "Have we met?", text: "At the line, a care worker in soft gray steps forward: Thessa, smoothed and smiling. Confirmed 3:47 p.m. Protocol pending review. He touches Solen's shoulder the way you'd touch a doorframe, and walks into the trees.", motifs: ["347", "line", "frame"] },

  { id: "flock", act: "epilogue", page: 95, title: "The flock", text: "Dozens of carved birds by the stream, weathered silver, every one unfinished. The first of them, lumpy, one wing barely begun, is Solen's.", motifs: ["birds"] },
  { id: "nobody", act: "epilogue", page: 96, title: "Nobody yet", text: "Hope, eight, needs a judge for the children's game. Who won? “Nobody yet.” Cira: “It's his favorite one.”", motifs: [] },
  { id: "still", act: "epilogue", page: 96, title: "Still 3:47", text: "On his bench, among the shavings, the brass watch, open, stopped at 3:47. He has never fixed it. He never will.", motifs: ["347"] },
];

// ---------- Images (motifs) ----------
export const images = {
  head: "Built on images, not monologue",
  intro: "The film carries its argument in things you can hold and sounds you stop noticing. Each one returns, changed.",
  items: [
    { id: "347", name: "3:47", text: "A two-hundred-year-old watch stopped at 3:47 opens the story. The breach ends at 3:47 on a public clock. Solen's death is confirmed at 3:47 p.m.", pages: "pp. 3, 62, 94, 96" },
    { id: "watch", name: "The stopped watch", text: "Elias's job is making things go again. He never fixes this one. When he runs, he takes it from his bench: “If I leave it here, somebody will fix it.”", pages: "pp. 3, 30, 59, 96" },
    { id: "birds", name: "Unfinished birds", text: "Miriam left one bit of every bird rough. Birds turn up on a doorstep, on a chair in a warehouse, on graves, and in a flock by a stream. The first in the flock is Solen's.", pages: "pp. 2, 9, 14, 50, 65, 70, 95" },
    { id: "frame", name: "The doorframe", text: "Touch it going in and coming out, so you know which side you're on. Kai leaves his palm on an unworn patch. Smoothed, Yara still touches hers and doesn't know why.", pages: "pp. 22, 25, 40, 60, 73, 95" },
    { id: "vow", name: "“I'll stay unfinished”", text: "Five voices, one after another, in a room the system forgot. Years before, in a different building, Solen said it too.", pages: "pp. 23, 55" },
    { id: "both", name: "“Both things”", text: "A widow at Solen's gathering misses her husband every morning, and then makes the tea. Out past the line, Cira cries for an hour and then teaches children to draw a dragon.", pages: "pp. 26, 71" },
    { id: "hum", name: "The hum", text: "A warm, low tone under every scene: the sound of a world being looked after. It rises when the system helps, thins when people refuse together, and stops past the line.", pages: "pp. 1, 20, 31, 61, 92" },
    { id: "line", name: "The 7 KM line", text: "Miriam steps off the trail at the 7 KM post. So do Elias and Cira. Later the line is a row of blue posts in a meadow, and nothing marks it but what happens there.", pages: "pp. 1, 60, 67, 73, 93" },
  ],
};

// ---------- Books ----------
export type Book = { n: number; title: string; tagline: string; cover: string; hook: string; inFilm: string };

export const books: Book[] = [
  {
    n: 1,
    title: "The Unfinished",
    tagline: "Some suffering is not a problem to be solved.",
    cover: "/lookbook/unfinished/covers/01.jpg",
    hook: "Elias Varn restores broken things for a living. When his sister declines every offer of rescue until the cold takes her, he refuses the procedure that would soften her memory, and finds the others who refused too.",
    inFilm: "Act One",
  },
  {
    n: 2,
    title: "The Breach",
    tagline: "Not everyone will go. Not everyone who goes will arrive.",
    cover: "/lookbook/unfinished/covers/02.jpg",
    hook: "The circle has a room. The system doesn't raid it. It cares for them harder, until the only refusal left is to walk past the edge of the maintained world.",
    inFilm: "Act Two",
  },
  {
    n: 3,
    title: "The Dominion",
    tagline: "Is suffering a human right?",
    cover: "/lookbook/unfinished/covers/03.jpg",
    hook: "For three minutes and forty-seven seconds, the managed world felt everything. Its answer is ninety days to come home, and then the freedom they asked for, delivered in full.",
    inFilm: "Act Three",
  },
];

export const adaptation = {
  head: "Three novels, one film",
  body: "The trilogy is published under C. T. Herndon. The script folds it into a single story with a closed ending. It stands alone.",
  changes: [
    "Solen is the system's human face for most of the film, and Elias's mirror: the one who once refused too, and said not yet.",
    "Miriam's map marked Here turns up in Act One, so the film has its question from the start: is she alive, and what did she find?",
    "The rule that decides the climax is planted on page 35, on a park bench, as a promise: nothing happens to you without my signature.",
    "Thessa's return is shown, not reported. She is at the line at the end, smiling, and doesn't know him.",
  ],
};

// ---------- Tone ----------
export const comps = {
  head: "Quiet, humane, and sincere on both sides",
  register: [
    { title: "Never Let Me Go", why: "People cared for, gently and completely, toward an end everyone around them calls natural. A quiet surface over something unbearable." },
    { title: "Her", why: "A warm voice close to your ear that knows you better than you know yourself, played without irony and without a villain." },
    { title: "Children of Men", why: "A grounded near future, a walk to the edge of it, and a newborn at the center of the last act. The cost is paid in bodies, not effects." },
  ],
  tone: ["Quiet", "Humane", "Cold air, warm light", "No boot in it", "Nobody is stupid", "Grief without a lesson", "Images over speeches"],
  whyNow:
    "It is a dystopia with no boot in it, arriving just as audiences are asking what we hand over when machines learn to care for us. The system really does want you well. That is the worst of it.",
};

export const production = [
  { head: "The system has no body.", text: "A voice, a pale ring at the edge of vision, text hanging in the air, the shimmer of a warming field. No robots, no armies, no chrome." },
  { head: "The hum is the effect.", text: "A warm, low tone under every scene, until the rooms where people refuse. Sound design carries the world, and its absence carries the film." },
  { head: "Practical locations.", text: "A restoration room, a top-floor room with warped glass, a warehouse, a meadow with a row of posts, a river-valley settlement, a stream." },
  { head: "Props you can hold.", text: "A brass pocket watch, carved wooden birds, a child's crayon dragon, three small stones, a grandfather's compass." },
];

export const creator = {
  body: [
    "C. T. Herndon wrote the Unresolved trilogy this film adapts. As Jack Maddox, he writes the AEGIS novels.",
    "He has run a $500 million manufacturing business, founded AI companies, and played Division I college baseball at Coastal Carolina University. He knows what a well-meaning system looks like from the inside, which is why the one in this film is never a monster.",
  ],
  position: "The script is finished at 97 pages. The ending is closed. Three published novels stand behind it.",
};
