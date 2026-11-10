// ALMA MATER lookbook content. Source of truth for facts: Documents\Alma Mater
// ("Alma Mater - Series Overview.md", "Alma Mater - Series Bible.md", "Alma Mater - Season One.md")
// and the eleven .fdx scripts (pilot plus 102-110). Where they disagree, the scripts win.
// Edit here; the page reads everything from this file.

export const alma = {
  title: "Alma Mater",
  kicker: "A one-hour sports drama",
  credit: "Created by C. T. Herndon",
  tagline: "A diamond is just coal that didn't break.",
  logline:
    "A broken-down Hall of Fame quarterback reluctantly returns to coach his alma mater, the worst program in the SEC, and stakes his last good years on a walk-on freshman nobody else wanted.",
  facts: [
    { k: "Format", v: "One-hour drama" },
    { k: "Season one", v: "10 episodes, all written" },
    { k: "Pages", v: "532" },
    { k: "The run", v: "Four seasons, one college career" },
  ],
  contact: { name: "C. T. Herndon", email: "chris@resonanceinstitutellc.com" },
};

// ---------- Premise: the money ----------

export const premise = {
  lede: "In 2000, Arkansas Valley's boosters paid their star quarterback in secret, and the NCAA vacated his best season and buried the school. Today, paying players is legal, organized and the business model of the SEC. So the school brings him back as head coach, and the money for his players comes from the same family that paid him.",
  hook: "The thing that destroyed this program is now the only way to save it.",
  then: {
    year: "2000",
    rows: [
      { k: "The money", v: "$4,000 a month, in cash" },
      { k: "Who carried it", v: "Harlan Bledsoe, a trucking company owner" },
      { k: "What it bought", v: "His mother's mortgage, and a truck in the driveway" },
      { k: "What it cost", v: "A vacated season, a coach's career and twenty-five years of losing" },
    ],
  },
  now: {
    year: "Today",
    rows: [
      { k: "The money", v: "An NIL fund, legal and organized" },
      { k: "Who runs it", v: "Garrett Bledsoe, Harlan's son" },
      { k: "What it bought", v: "A five-star quarterback, for two million dollars" },
      { k: "What it costs", v: "The fund has $40,000. Rivals spend $20 million." },
    ],
  },
  question: "Is that redemption, or is he just finally allowed to do the same thing? The town can't decide. Neither can he.",
  body: [
    "Every recruiting visit, booster dinner and NIL deal puts Cal back in the room where he made his mistake. The show never has to invent conflict, because the job is the wound.",
  ],
  loretta: {
    line: "Did they pay you?",
    who: "Loretta Dunn, a recruit's mother, at her kitchen table · 108",
    answer: "“No, ma'am.” Lionel, sitting beside him, knows it's a lie.",
  },
};

// ---------- The signature: June's screen ----------

export type ImpactPeak = {
  g: number;
  u: number; // -1 (left) .. 1 (right), viewed from above
  v: number; // -1 (front) .. 1 (back)
  where: string;
  placed: "stated" | "illustrative";
};

export type ImpactStep = {
  id: string;
  tab: string;
  label: string;
  when: string;
  ep: string;
  hits: number;
  hitsNote: string;
  game: boolean;
  result?: string;
  peak?: ImpactPeak;
  crowd: string;
  screen: string;
  quote?: { text: string; who: string };
};

export const screen = {
  head: "The crowd cheers the hit. Her screen shows the cost.",
  intro:
    "June Nwosu's lab puts an impact sensor in every Miners helmet. On her screen, every hit becomes a g-force reading and a red dot on a map of a skull. She painted 089 on the back of the walk-on's helmet in July and told him he'd be a very useful data point. Step through his season.",
  helmet: "089",
  wearer: "W. Tolliver · QB · #47",
  colt: "Same afternoon, helmet 014: Colt Brannon, 104 g. The highest impact the study has recorded, by a lot. His fourth concussion. He never plays again.",
  caption:
    "Hit counts and g-forces are as the scripts state them. Dot positions are illustrative, except the two the scripts place: the 91 g hit (frontal, left) and the 88 g hit (left side, above the ear).",
  kicker: "Across four seasons, Wyatt's map turns from a few dots to a red cloud.",
  steps: [
    {
      id: "camp",
      tab: "Camp",
      label: "Fall camp, first week of full pads",
      when: "August",
      ep: "102",
      hits: 44,
      hitsNote: "in one week of practice",
      game: false,
      peak: { g: 91, u: -0.38, v: -0.72, where: "Frontal, left", placed: "stated" },
      crowd: "A circle of his own teammates. Ray calls a quarterback keep to “let my linebackers say hello,” and Zay Holloway comes through untouched.",
      screen: "3:47 PM. 089. 91g. Frontal L. Oklahoma drill?",
      quote: {
        text: "He took the hardest hit recorded on the team Wednesday. Ninety-one g. And he's had more hits than anyone in the study this week. Forty-four. More than any lineman.",
        who: "June · 102",
      },
    },
    {
      id: "w1-5",
      tab: "1–5",
      label: "Weeks 1 to 5, the scout team",
      when: "September to October",
      ep: "103",
      hits: 0,
      hitsNote: "in games. He doesn't play.",
      game: true,
      result: "0-4, then a win for Buddy",
      crowd: "Seven thousand fans and an 0-4 start. The walk-on runs the scout team all week and doesn't take a snap on Saturday.",
      screen: "Nothing new. No hits tonight. He didn't play.",
    },
    {
      id: "w6",
      tab: "6",
      label: "Week 6 · at Cahaba",
      when: "A top-five power, on the road",
      ep: "106",
      hits: 23,
      hitsNote: "in one half",
      game: true,
      result: "L 24-45",
      peak: { g: 77, u: -0.12, v: -0.8, where: "His first college snap", placed: "illustrative" },
      crowd: "Down 31-3 at halftime in front of a hundred thousand people. Sacked on his first snap, then nine straight completions.",
      screen: "Covered in dots. Orange and red. Clustered on the front and the left side.",
      quote: {
        text: "Twenty-three hits. In one half. One of them was seventy-seven g. On your first play. Your first college play.",
        who: "June · 106",
      },
    },
    {
      id: "w7",
      tab: "7",
      label: "Week 7 · at Bluegrass",
      when: "His first start, on the road",
      ep: "107",
      hits: 31,
      hitsNote: "in his first start",
      game: true,
      result: "L 27-30",
      crowd: "A fourth-quarter comeback, a cross-body throw to tie it, and a 47-yarder at the gun. The sports shows call him “gritty.”",
      screen: "089's hit map for the Bluegrass game. The count in the corner: 31.",
      quote: { text: "They're celebrating the hits.", who: "June · 107" },
    },
    {
      id: "w8",
      tab: "8",
      label: "Week 8 · Tombigbee State",
      when: "At home",
      ep: "107",
      hits: 22,
      hitsNote: "in his first win",
      game: true,
      result: "W 31-17",
      crowd: "His first win. His mother, in her custodian's uniform, screams on the top row. He doesn't see her.",
      screen: "Twenty-two hits last week. Thirty-one the week before.",
    },
    {
      id: "w9",
      tab: "9",
      label: "Week 9 · at Lowcountry State",
      when: "On the road",
      ep: "108",
      hits: 34,
      hitsNote: "in a 38-14 loss",
      game: true,
      result: "L 14-38",
      peak: { g: 88, u: -0.95, v: -0.02, where: "Left side, above the ear", placed: "stated" },
      crowd: "A linebacker comes through untouched. He passes the sideline test, then passes the baseline test by two points.",
      screen: "The number climbs. 61. 74. 88 g. Lateral. Left side. Above the ear.",
      quote: { text: "Then what's the test for?", who: "June, to the team doctor · 108" },
    },
    {
      id: "w10",
      tab: "10",
      label: "Week 10 · Brazos, homecoming",
      when: "At The Pit",
      ep: "108",
      hits: 19,
      hitsNote: "on homecoming",
      game: true,
      result: "W 28-27",
      crowd: "A two-point try to win it. The students come over the rail with their headlamps lit and carry him on their shoulders.",
      screen: "On the screen: 089. Tonight's hits. Nineteen.",
      quote: { text: "She looks at the number. Then she looks up at the field.", who: "108" },
    },
    {
      id: "w11",
      tab: "11",
      label: "Week 11 · Coosa",
      when: "A top-ten power, at home",
      ep: "109",
      hits: 29,
      hitsNote: "in the best game of his life",
      game: true,
      result: "L 21-24",
      crowd: "27 of 36, 316 yards, three touchdowns, no interceptions. A 52-yarder falls a yard short.",
      screen: "Six skulls in a row. The dots thickening as they go. A red cloud starting to form.",
      quote: { text: "Wyatt has taken a hundred and thirty hits in five games. A hundred and thirty.", who: "Lionel, to the staff · 109" },
    },
    {
      id: "w12",
      tab: "12",
      label: "Week 12 · Arkansas",
      when: "The Battle for the Mountain",
      ep: "110",
      hits: 41,
      hitsNote: "the most of the season",
      game: true,
      result: "W 30-27",
      peak: { g: 64, u: -0.72, v: 0.28, where: "Blind side, number 94", placed: "illustrative" },
      crowd: "Thirty-one thousand lamps. His helmet comes off on the last drive. Mike Tran from 47 at the gun. Thirty years, over.",
      screen: "Forty-one hits. The most of the season.",
      quote: { text: "It's after.", who: "June's email to the team doctor, sent the night they win · 110" },
    },
  ] as ImpactStep[],
};

// ---------- The world ----------

export const world = {
  head: "Hell on the Border",
  body: [
    "Fort Smith, Arkansas: an old frontier town on the Oklahoma line, once called “Hell on the Border,” at the edge of a river valley where the coal mines closed a generation ago. Arkansas Valley University was one of the SEC's original members. Its Miners are about to be voted out of the conference, and the TV money would go with them.",
    "On fall Saturdays the student section still switches on miner's headlamps for night games, in a 1948 concrete bowl dug into a hillside that everyone calls The Pit. The program isn't just a game here. It's the local economy. When Cal chooses between clean and winning, he's choosing for every diner, motel and bar on Garrison Avenue.",
  ],
  stats: [
    { n: "30", k: "straight losses to Arkansas, an hour north over the mountains" },
    { n: "25", k: "years without a winning season" },
    { n: "$40K", k: "NIL budget, in a conference where rivals spend $20 million" },
    { n: "7,112", k: "fans a game, in a 31,000-seat stadium" },
  ],
  junkHead: "Built from junk",
  junkIntro:
    "Men used to private jets, team chefs and cryotherapy chambers walk into a 1971 cinderblock building where the locker room floods when it rains. When things break, the Miners make do. Conditioning is the strip-mine spoil hills at dawn. When a poultry plant donates its walk-in freezer for a night, the defense hits frozen pallets until their shoulders go numb. It looks ridiculous, it's barely legal, and it builds the toughest team in the conference.",
  junk: [
    { them: "Blocking sled", us: "A junked 1978 sedan named Miss Evangeline, welded to steel skids. The line pushes it the length of the field in neutral." },
    { them: "Tackling dummies", us: "Feed sacks stuffed with sawdust and duct tape" },
    { them: "Cryotherapy", us: "A sandbar in the Arkansas River. In September the water is warmer than the air." },
    { them: "Hot tub", us: "A horse trough" },
    { them: "Private jets", us: "Coach seats to recruiting visits, and a shared motel room on the road" },
    { them: "Staff housing", us: "Hall of Famers in a row of motel rooms around a drained pool, arguing in lawn chairs at midnight" },
  ],
  traditions: [
    { name: "The Last Lump", text: "A fist of coal from the last mine in the valley, closed in 1983. Every player touches it on the way out." },
    { name: "The Shift Change", text: "The team walks to The Pit through a 1948 tunnel lined with the names of the mines, carrying unlit miner's lamps, and switches them on together." },
    { name: "The Coal Shirt", text: "One black practice jersey, awarded each Monday to the hardest worker. A scout-team walk-on wins it after week three." },
    { name: "Sub pondere", text: "The captain yells it. The team answers “Crescit!” It grows under weight. Most of them don't know it's Latin." },
  ],
  vacated:
    "In the Bunker's trophy case there's a blank spot where the 2000 bowl trophy used to sit, and a small card: Vacated.",
};

// ---------- The center three ----------

export const center = [
  {
    id: "cal",
    age: "48",
    name: "Cal Rourke",
    role: "The head coach",
    tag: "Two knee replacements. A fused neck. Eleven surgeries. A pill bottle labeled “Vitamin D.”",
    body: "Led AVU to its last bowl win in 2000, then fifteen NFL seasons and the Hall of Fame. Gets out of bed in three stages, timed to the coffee maker. Can't hold a player's name but never forgets a coverage. Broke in ways nobody knows. He took the job because a dying man called in a debt, and he carries a secret: the cash that paid him in 2000 started twenty-five years of losing.",
    want: "To fix the thing he broke before his body and mind give out.",
  },
  {
    id: "wyatt",
    age: "18",
    name: "Wyatt Tolliver",
    role: "The walk-on · #47",
    tag: "11,000 yards nobody outside the county saw. Zero offers. Seventh on the depth chart.",
    body: "From Coal Hill, a school so small it barely fielded eleven. Grew up with Cal's poster on his wall. His older brother Cody was the real prospect, until a county road at two in the morning. Wyatt was in the passenger seat. He's playing the career Cody was supposed to have. His mother cleans the football building from ten at night to six in the morning, and has never told the coaches who she is.",
    want: "To be good enough that nobody can deny him.",
  },
  {
    id: "june",
    age: "19",
    name: "June Nwosu",
    role: "The scientist",
    tag: "Eleven big programs refused her sensors. Their lawyers didn't want the data to exist. AVU said yes.",
    body: "A biomedical engineering student from Houston who doesn't care about football and thinks it's quietly wrecking boys' brains. Her brother was a college linebacker. He's twenty-six and can't remember what he ate for breakfast. She tutors athletes for rent, and when the athletic department leans on her to write a player's paper, one lie could end her study. Then she falls for the boy whose hits she's counting.",
    want: "To prove what football does to the brain, before it happens to someone else she loves.",
  },
];

// ---------- Character web ----------

export type AmGroup = "center" | "staff" | "players" | "town";

export type AmPerson = {
  id: string;
  name: string;
  role: string;
  group: AmGroup;
  x: number; // 0-1000
  y: number; // 0-660
  bio: string;
  line?: string;
};

export type AmLink = { a: string; b: string; label: string; kind?: "blood" | "ally" | "enemy" | "thread" };

export const groups: { id: AmGroup | "all"; label: string }[] = [
  { id: "all", label: "Everyone" },
  { id: "center", label: "The center" },
  { id: "staff", label: "Staff" },
  { id: "players", label: "Players" },
  { id: "town", label: "Town and money" },
];

export const groupName: Record<AmGroup, string> = {
  center: "The center",
  staff: "The staff",
  players: "The players",
  town: "Town and money",
};

export const people: AmPerson[] = [
  {
    id: "cal",
    name: "Cal Rourke",
    role: "Head coach · 48",
    group: "center",
    x: 430,
    y: 300,
    bio: "A Hall of Famer hiding a painkiller habit he calls “managing,” and a memory lapse now and then that he refuses to have tested. Brilliant about quarterbacks. Has never recruited, never managed a budget, and doesn't know the rules.",
    line: "That's not grit. That's a freshman.",
  },
  {
    id: "wyatt",
    name: "Wyatt Tolliver",
    role: "Walk-on quarterback · 18",
    group: "center",
    x: 600,
    y: 400,
    bio: "Runs the scout team, imitating every opponent's quarterback each week, which is why he knows their defenses better than the starters do. Takes every hit and never tells anyone it hurts. Wears Cody's wristband under his gloves.",
    line: "Then we'd better go.",
  },
  {
    id: "june",
    name: "June Nwosu",
    role: "The scientist · 19",
    group: "center",
    x: 700,
    y: 250,
    bio: "Runs the helmet-sensor study from a basement lab. Sees the players as data before she sees them as people, until Deuce. Has never watched a football game start to finish, and asks why the clock stops.",
    line: "They're celebrating the hits.",
  },
  {
    id: "lionel",
    name: "Lionel Banks",
    role: "Offensive coordinator",
    group: "staff",
    x: 230,
    y: 150,
    bio: "Fourteen years at AVU under four head coaches. Interviewed for the job; the committee hired Cal the next morning without calling him back. Passed over four times, always for a famous white man with less experience. Becomes the staff's backbone anyway.",
    line: "I'll be here when you're gone.",
  },
  {
    id: "moose",
    name: "Moose Duchene",
    role: "Offensive line · the truth-teller",
    group: "staff",
    x: 105,
    y: 300,
    bio: "A Cajun center who snapped Cal every ball for eleven NFL seasons. Sober eleven years since a drunk-driving crash ended a teammate's career. A self-taught welder who turns a salvage yard into a training program. The only man who tells Cal the truth, and the one who waits longest to do it.",
    line: "There it is, cher.",
  },
  {
    id: "tre",
    name: "Tre Knox",
    role: "Receivers · recruiting",
    group: "staff",
    x: 120,
    y: 470,
    bio: "Cal's favorite receiver. Earned forty million dollars and lost all of it, then lost his TV job to a hot-mic rant. A genius in a recruit's living room and a nightmare for the compliance office.",
  },
  {
    id: "ray",
    name: "Ray Valenti",
    role: "Defensive coordinator",
    group: "staff",
    x: 250,
    y: 555,
    bio: "Built two top-five NFL defenses, then threw his own player to the ground by the facemask on live TV. Blackballed. Coaches a blitz-everything defense built from undersized kids because he has no choice.",
  },
  {
    id: "teenie",
    name: "Teenie Watts",
    role: "Head athletic trainer",
    group: "staff",
    x: 250,
    y: 395,
    bio: "Has taped every ankle at AVU since 1987, including Cal's. Keeps his file. Knows exactly how many pills he takes. Makes Andre carry an overdose-reversal spray everywhere as a condition of staying on the team.",
    line: "He loved you more than he loved being right, Calvin.",
  },
  {
    id: "nora",
    name: "Dr. Nora Quinlan",
    role: "Team doctor",
    group: "staff",
    x: 535,
    y: 140,
    bio: "Fired as an NFL team doctor for refusing to clear a star with a concussion. He played anyway and was never the same. She's seen Cal's scans, including the brain MRI he's never opened. She won't let him lie, which is why he can't stay away from her.",
  },
  {
    id: "jaxon",
    name: "Jaxon Crawford",
    role: "The five-star · #1",
    group: "players",
    x: 560,
    y: 590,
    bio: "The No. 2 quarterback in the country. Signed with AVU for two million dollars his father had already borrowed against to pay gambling debts. When he comes back from a broken leg, a walk-on has his job and the word “gritty.” The rival who isn't wrong about everything.",
    line: "Your eyes were right.",
  },
  {
    id: "deuce",
    name: "Deuce Hollins",
    role: "Left tackle · roommate",
    group: "players",
    x: 760,
    y: 545,
    bio: "330 pounds from the Mississippi Delta, passed from grade to grade because he was big. Reads at a sixth-grade level because of dyslexia nobody ever diagnosed. The gentlest person on the team, and one failed class from ineligible.",
    line: "Y'all go win.",
  },
  {
    id: "andre",
    name: "Andre Fontenot",
    role: "Receiver · in recovery",
    group: "players",
    x: 455,
    y: 475,
    bio: "Dismissed from a powerhouse for failed drug tests that started with painkillers after shoulder surgery. Cal, still hiding his own pills, is the last person who can preach to him, and the one who most needs to.",
    line: "I started on thirty of these.",
  },
  {
    id: "colt",
    name: "Colt Brannon",
    role: "Backup QB · the first cost",
    group: "players",
    x: 420,
    y: 625,
    bio: "A sixth-year senior with a wife and a baby daughter. In week six he takes a 104 g hit, his fourth concussion, and never plays again. Cal makes him a graduate assistant so he keeps his health insurance. He coaches Wyatt from a dark film room in dark glasses.",
  },
  {
    id: "zay",
    name: "Zay Holloway",
    role: "Middle linebacker",
    group: "players",
    x: 90,
    y: 615,
    bio: "The best linebacker at a national champion until a bar fight. His father is in prison. He has the same temper, and so does the coach who decides to save him.",
  },
  {
    id: "mike",
    name: "Mike Tran",
    role: "Kicker · #90",
    group: "players",
    x: 150,
    y: 50,
    bio: "Pre-med, from Fort Smith. Discovered kicking a 50-yard field goal in sandals at an intramural game. His grandparents came through the refugee camp at Fort Chaffee in 1975. The most pressured person on the team.",
    line: "What if it doesn't?",
  },
  {
    id: "buddy",
    name: "Buddy Haskett",
    role: "Cal's old coach · 81",
    group: "town",
    x: 370,
    y: 85,
    bio: "AVU's greatest coach. Took the fall in 2003 and never coached college again. Dying, he calls Cal from a hospital bed. He kept the books.",
    line: "And you owe me one, son. I'm calling it in.",
  },
  {
    id: "bledsoe",
    name: "Garrett Bledsoe",
    role: "The booster",
    group: "town",
    x: 860,
    y: 150,
    bio: "A trucking billionaire who was cut as an AVU walk-on in 1994 and has spent thirty years buying back the program he couldn't make. Runs the NIL fund. His father carried Cal's cash in 2000, and Garrett has the records.",
    line: "Nobody's going to look, Cal. Nobody ever looks.",
  },
  {
    id: "rhonda",
    name: "Rhonda Tolliver",
    role: "Wyatt's mother · night custodian",
    group: "town",
    x: 870,
    y: 420,
    bio: "Took a job cleaning the football building at night for the employee tuition discount. Invisible to everyone, so she sees everything: a booster at the loading dock, the athletic director at the shredder, the head coach alone with a pill bottle at 3 a.m. She tells no one, because her son is the starting quarterback.",
    line: "That's on me. This one's on you.",
  },
  {
    id: "sumner",
    name: "Doug Sumner",
    role: "Athletic director",
    group: "town",
    x: 900,
    y: 285,
    bio: "A fundraiser who has never run an athletic department, in Bledsoe's pocket. Signed Cal's contract with a buyout clause that makes him easy to fire. Quietly leans on the tutors, and is never caught holding anything.",
    line: "Nobody's asking you to do anything wrong, June.",
  },
  {
    id: "rae",
    name: "Rae Whitaker",
    role: "Investigative reporter",
    group: "town",
    x: 690,
    y: 60,
    bio: "Her late father broke the 2003 payment scandal and could never prove the star quarterback was paid. She came home to finish his story.",
    line: "You're in them.",
  },
  {
    id: "kaylee",
    name: "Kaylee Briggs",
    role: "Wyatt's girlfriend",
    group: "town",
    x: 880,
    y: 610,
    bio: "His girlfriend since eighth grade, from Coal Hill. Cody's friend first. She expects him home every weekend, and she knows something about the night Cody died that Wyatt doesn't.",
    line: "I'm not going to make you choose.",
  },
];

export const links: AmLink[] = [
  { a: "cal", b: "wyatt", label: "The legend and the kid with his poster on the wall. Cal can't hold the name, so he writes “2 L's” on a sticky note.", kind: "ally" },
  { a: "wyatt", b: "june", label: "She counts his hits. One kiss, at 1 a.m., on the Hartley Hall steps.", kind: "ally" },
  { a: "cal", b: "buddy", label: "The debt. The coach who took the fall and the player who let him.", kind: "blood" },
  { a: "cal", b: "bledsoe", label: "Leverage. Cal can't win without his money, and Bledsoe can destroy him with a phone call.", kind: "enemy" },
  { a: "cal", b: "lionel", label: "The celebrity who got the job and the coach who earned it. Rivals, then partners.", kind: "thread" },
  { a: "cal", b: "moose", label: "Eleven NFL seasons snapping him the ball. Moose knows about the pills and waits too long.", kind: "ally" },
  { a: "tre", b: "lionel", label: "Old school against new: the coach who follows every rule and the coach who breaks them.", kind: "thread" },
  { a: "cal", b: "ray", label: "Two NFL seasons together. Both on their last chance.", kind: "ally" },
  { a: "cal", b: "nora", label: "She's seen his brain scan. He hasn't.", kind: "thread" },
  { a: "cal", b: "teenie", label: "She's taped his ankles since 1987. She knows how many pills.", kind: "thread" },
  { a: "cal", b: "andre", label: "Two addicts. One is honest about it. After Arkansas, Andre sees Cal swallow two pills.", kind: "thread" },
  { a: "cal", b: "deuce", label: "Cal reports Deuce's paper himself on game day, and tells him himself, kneeling by his chair.", kind: "thread" },
  { a: "cal", b: "rae", label: "Finishing her father's story. Cal is in Buddy's books.", kind: "enemy" },
  { a: "wyatt", b: "jaxon", label: "The walk-on and the five-star. “Gritty” against “athletic.” A fight in the parking lot.", kind: "enemy" },
  { a: "wyatt", b: "deuce", label: "Roommates in Room 114. One box fan. Deuce vouches for him to the team.", kind: "ally" },
  { a: "wyatt", b: "rhonda", label: "Mother and son. She cleans the building where he practices, and he doesn't know what she's seen.", kind: "blood" },
  { a: "wyatt", b: "kaylee", label: "First love, and the past. She knows why Cody was driving.", kind: "ally" },
  { a: "wyatt", b: "colt", label: "His quarterback coach in all but name.", kind: "ally" },
  { a: "june", b: "deuce", label: "Tutor and student. She finds the dyslexia.", kind: "ally" },
  { a: "june", b: "nora", label: "Colt's data makes them allies. The two women who know what the game costs.", kind: "ally" },
  { a: "june", b: "colt", label: "Helmet 014. The hardest hit in her study.", kind: "thread" },
  { a: "june", b: "kaylee", label: "Homecoming weekend. Kaylee watches them through the window of The Gallows.", kind: "enemy" },
  { a: "june", b: "sumner", label: "His office leans on the tutors. She refuses.", kind: "enemy" },
  { a: "ray", b: "zay", label: "The coach with the temper and the player who inherited one. Each is the other's warning.", kind: "blood" },
  { a: "teenie", b: "andre", label: "Her condition for keeping him: he carries the spray everywhere.", kind: "thread" },
  { a: "andre", b: "jaxon", label: "Jaxon's unopened pain pills. “Don't open it, Jax.”", kind: "thread" },
  { a: "bledsoe", b: "jaxon", label: "Two million dollars, and an October payment that never comes.", kind: "thread" },
  { a: "bledsoe", b: "sumner", label: "The athletic director is in his pocket.", kind: "thread" },
  { a: "rhonda", b: "bledsoe", label: "At 2 a.m. she hears him: “...all of it, Doug. 2003 too.”", kind: "enemy" },
  { a: "rhonda", b: "cal", label: "At 4 a.m. she puts a blanket over him. He never learns who.", kind: "thread" },
  { a: "tre", b: "rae", label: "He walks her out, flirting.", kind: "thread" },
  { a: "mike", b: "buddy", label: "Buddy taught his grandfather to kick at Fort Chaffee in 1975, with a newspaper wrapped in electrical tape.", kind: "thread" },
  { a: "lionel", b: "buddy", label: "Buddy wrote Lionel's recommendation in 1996, and never signed it.", kind: "thread" },
];

// ---------- Season one: the schedule ----------

export type Game = {
  week: number;
  opp: string;
  type: string;
  site: "home" | "away";
  res: "W" | "L";
  us: number;
  them: number;
  record: string;
  ep: string;
  note: string;
  hits?: number;
};

export const schedule = {
  head: "0-4 to 4-8",
  intro:
    "Twelve games, July through Thanksgiving weekend. From episode two on, every episode is a game week. Opponents other than Arkansas are written as types, so any of them can be a licensed school or a composite. Select a game.",
  games: [
    { week: 1, opp: "Bayou Teche", type: "A lower-division school from Louisiana", site: "home", res: "L", us: 20, them: 23, record: "0-1", ep: "102", note: "Seven thousand fans. Cal's pro offense gets Jaxon sacked, so at halftime he switches to Lionel's quick game without saying his name. Ray's zero blitz gets beaten on the last drive. Talk radio calls for Cal's firing in his first week." },
    { week: 2, opp: "Permian State", type: "A Big 12 school: the paycheck game", site: "away", res: "L", us: 10, them: 52, record: "0-2", ep: "103", note: "The athletic budget runs on a $1.8 million check for getting beaten. Wyatt's first plane ride. Colt Brannon takes a 68 g hit in garbage time and stays in." },
    { week: 3, opp: "Black Warrior State", type: "An SEC school", site: "home", res: "L", us: 13, them: 34, record: "0-3", ep: "103", note: "AVU leads 13-10 at the half because the scout team prepared the defense perfectly, then loses on depth, heat and a pick-six. On Monday the walk-on gets the Coal Shirt." },
    { week: 4, opp: "Tennessee Ridge", type: "An SEC school", site: "away", res: "L", us: 7, them: 31, record: "0-4", ep: "104", note: "No middle linebacker and no blocking tight end: Zay and Hunter sit together on the bench in street clothes, suspended, not talking." },
    { week: 5, opp: "Gulf Shore", type: "A struggling SEC school: Buddy's game", site: "home", res: "W", us: 24, them: 21, record: "1-4", ep: "105", note: "Two days after the funeral. Jaxon throws for 312 yards, Zay's first snap back is a sack, and Mike Tran's first field goal is the winner. For the first time all season, the whole room answers “Crescit.”" },
    { week: 6, opp: "Cahaba", type: "A top-five SEC power", site: "away", res: "L", us: 24, them: 45, record: "1-5", ep: "106", note: "Jaxon breaks his leg. Colt takes a 104 g hit. Down 31-3 at the half, Cal asks a student manager for the walk-on's name. Wyatt is sacked on his first snap, completes nine straight, and AVU wins the second half 21-14.", hits: 23 },
    { week: 7, opp: "Bluegrass", type: "An SEC school: Wyatt's first start", site: "away", res: "L", us: 27, them: 30, record: "1-6", ep: "107", note: "A fourth-quarter comeback ties it with a cross-body throw. Bluegrass wins on a 47-yarder at 0:00. Cal to the press: “That's not grit. That's a freshman.”", hits: 31 },
    { week: 8, opp: "Tombigbee State", type: "An SEC school", site: "home", res: "W", us: 31, them: 17, record: "2-6", ep: "107", note: "Wyatt's first win. Zay returns an interception for a touchdown, and Rhonda, working overtime on the stadium crew, screams on the top row.", hits: 22 },
    { week: 9, opp: "Lowcountry State", type: "An SEC school", site: "away", res: "L", us: 14, them: 38, record: "2-7", ep: "108", note: "The 88 g hit. He passes the sideline test and the baseline test by two points. Then a nine-hundred-mile bus ride home.", hits: 34 },
    { week: 10, opp: "Brazos", type: "An SEC school: homecoming", site: "home", res: "W", us: 28, them: 27, record: "3-7", ep: "108", note: "Jaxon, now in the quarterback room, spots the free safety's tell. Cal goes for two instead of overtime. The student section switches on its headlamps for the first time in years, and the whole stadium follows.", hits: 19 },
    { week: 11, opp: "Coosa", type: "A top-ten SEC power", site: "home", res: "L", us: 21, them: 24, record: "3-8", ep: "109", note: "Jaxon is cleared and dresses; Cal starts the walk-on. 27 of 36, 316 yards, three touchdowns. Coosa scores with 28 seconds left, and Mike Tran's 52-yarder into the wind falls a yard short.", hits: 29 },
    { week: 12, opp: "Arkansas", type: "The rival, an hour north: the Battle for the Mountain", site: "home", res: "W", us: 30, them: 27, record: "4-8", ep: "110", note: "Without Deuce. Sold out for the first time since 2001. Down 27-20 with four minutes left, Wyatt drives 78 yards. His helmet comes off on the last drive, and Jaxon comes in for one play and hits a 31-yard seam. Mike Tran, from 47, into the wind, at the gun. The first win over Arkansas in thirty years.", hits: 41 },
  ] as Game[],
  coda: {
    label: "Dec",
    head: "The coda",
    note: "The SEC presidents vote to keep AVU for one more year, on probation. The top recruit in the state signs on live TV because Cal reported his own player. Jaxon's name is in the transfer portal for an hour, then gone. Then Cal's phone rings. A reporter: Buddy's widow has given her the books.",
    ep: "110",
  },
};

// ---------- Episodes ----------

export type AmEpisode = { n: string; title: string; pages: number; when: string; summary: string };

export const episodes: AmEpisode[] = [
  {
    n: "101",
    title: "Sub Pondere",
    pages: 53,
    when: "July · the pilot",
    summary:
      "A dying coach calls in a debt: “You owe me one, son. I'm calling it in.” Cal takes the job nobody wanted, tours a building where the trophy case has a blank spot marked Vacated, and finds a walk-on alone on the dark practice field, hitting the crossbar from forty yards. He tells the kid not to let anybody fix that arm. Twenty minutes later he can't write down the name. He writes “2 L's.”",
  },
  {
    n: "102",
    title: "Two-a-Days",
    pages: 55,
    when: "August · week 1",
    summary:
      "Hall of Famers move into a motel around a drained pool. The weight-room ceiling caves in, the city condemns the sleds, and Moose welds a junked 1978 sedan to steel skids. In the lab, helmet 089 logs the hardest hit of the first week of pads: 91 g, on a walk-on nobody is watching. Week 1: a lower-division school from Louisiana wins 23-20, and talk radio calls for Cal's job.",
  },
  {
    n: "103",
    title: "Paycheck Game",
    pages: 55,
    when: "Weeks 2 and 3",
    summary:
      "AVU flies to a Big 12 school for a $1.8 million check and loses 52-10. Back home they lead an SEC team at the half on the scout team's preparation, then lose 34-13. Ray gives the first Coal Shirt to the walk-on whose name he can't remember. June starts tutoring Wyatt's roommate and finds he reads at a sixth-grade level. A reporter asks Cal about the vacated season.",
  },
  {
    n: "104",
    title: "Read Receipts",
    pages: 51,
    when: "Week 4",
    summary:
      "A fraternity group chat leaks a racist joke about the Black players, and a state senator's son laughed at it. Zay punches him. Thirty-one players set their helmets down on the fifty and walk off. Cal doesn't know what to do, so for the first time he says Lionel's name and asks for help. On the road, without either starter, AVU loses 31-7. They're 0-4.",
  },
  {
    n: "105",
    title: "Pallbearers",
    pages: 51,
    when: "Week 5",
    summary:
      "Buddy dies on the Tuesday after the Monday Cal couldn't get out of bed to visit. Fifteen thousand people come to the funeral at The Pit, more than any game in a decade. At the podium Cal finally says the thing Buddy wouldn't let him say in July. June realizes Deuce isn't slow; he has dyslexia nobody ever diagnosed. The team plays for Buddy and wins.",
  },
  {
    n: "106",
    title: "Halftime",
    pages: 53,
    when: "Week 6 · the midpoint",
    summary:
      "At a top-five power, in front of a hundred thousand people, Jaxon breaks his leg and Colt Brannon takes the hardest hit June's study has ever recorded. Down 31-3 at the half, Cal has to ask for the walk-on's name. Wyatt is sacked on his first snap, then completes nine straight. They lose, but he doesn't fold. That night Cal writes him in as QB1, and spells it wrong.",
  },
  {
    n: "107",
    title: "Gritty",
    pages: 53,
    when: "Weeks 7 and 8",
    summary:
      "The media finds the walk-on and calls him “gritty.” It calls the injured Jaxon “athletic.” The Black players notice, and they aren't wrong. Colt, in dark glasses, coaches Wyatt from the film room. A first start lost at the gun, then a first win. At 2 a.m., Rhonda hears the shredder in the athletic director's office and keeps one strip of paper.",
  },
  {
    n: "108",
    title: "Homecoming",
    pages: 52,
    when: "Weeks 9 and 10",
    summary:
      "An 88 g hit, and a baseline test passed by two points. At a kitchen table in Little Rock, a recruit's mother asks Cal, “Did they pay you?” He says, “No, ma'am.” Lionel knows it's a lie. Homecoming is won on a two-point try, the headlamps come back on, and Wyatt kisses June on the Hartley Hall steps at one in the morning.",
  },
  {
    n: "109",
    title: "Cleared",
    pages: 51,
    when: "Week 11",
    summary:
      "Jaxon is cleared, and Cal starts the walk-on anyway. They fight in the parking lot, and Cody's wristband comes off. June learns a grad student swapped his own paper in under Deuce's login, and Deuce never knew. At 4 a.m. Rhonda puts a blanket over a head coach asleep beside an open pill bottle. Wyatt plays the best game of his life, and they lose by three.",
  },
  {
    n: "110",
    title: "The Battle for the Mountain",
    pages: 58,
    when: "Thanksgiving weekend · the finale",
    summary:
      "June tells Cal his best lineman's grade rests on a paper someone else wrote. Bledsoe says bury it. Cal reports it at 7 a.m. and tells Deuce himself. Thirty-one thousand lamps, and Mike Tran from 47 at the gun. In a locker-room bathroom, behind a door that doesn't latch, Cal swallows two pills, and Andre sees him. In December, a reporter calls.",
  },
];

// ---------- The four-year arc ----------

export const arc = {
  head: "Four seasons. One college career.",
  intro: "One season for each year of the walk-on's eligibility, from last place to national champions.",
  seasons: [
    { n: 1, title: "The Bottom", year: "2026", record: "4-8", class: "Freshman", engine: "A Hall of Famer who can't remember the walk-on's name bets his job on him, and they beat Arkansas for the first time in thirty years." },
    { n: 2, title: "The Target", year: "2027", record: "8-5", class: "Sophomore", engine: "Now they matter. The portal raids them, Bledsoe tightens his grip, Wyatt gets his first NIL money, and Cal's body starts failing in public. A bowl win, the first since 2000." },
    { n: 3, title: "The Price", year: "2028", record: "11-2", class: "Junior", engine: "June's data proves a concussion. The ledger becomes national news, and Cal overdoses and is saved by the player he couldn't preach to. They lose the SEC title game." },
    { n: 4, title: "The Last Snap", year: "2029", record: "14-1", class: "Senior", engine: "Wyatt's senior year and Cal's last. Arkansas Valley wins the national championship, and the show doesn't hide what it cost." },
  ],
  pull: "In the series finale, the national championship trophy fills the blank spot in the trophy case.",
};

// ---------- On the page ----------

// ---------- The football ----------

export const football = {
  head: "The games have to look real, or nothing else works.",
  intro:
    "Every game is staged like a real Saturday: real formations, real schemes, real clock management, play calls a coordinator would make. A football coordinator and a staff of former college coaches build the game plans, and the players on the field are former college and arena players who can actually play. No movie football. Nothing a fan in the stands would laugh at.",
  three: [
    { head: "The beauty", text: "A perfect spiral at dusk. A pulling guard clearing the way. An eighteen-year-old reading a blitz before the snap. Thirty-one thousand headlamps flickering on in The Pit." },
    { head: "The violence", text: "Full sound, from inside the helmet: the breathing, the crack of a facemask, the half-second of silence after a hit when nobody knows if the boy on the ground will get up." },
    { head: "The cost", text: "The camera stays for the training room, the surgery, the ice and the pills: the Sunday morning when a nineteen-year-old can't get out of bed, and the forty-eight-year-old head coach who can't either." },
  ],
  schemes: [
    { head: "The offense", text: "A simple spread built around the run game, because the line can't block. Then Cal builds it around the walk-on's backyard instincts: quick reads, the run-pass option, the scramble drill." },
    { head: "The defense", text: "Ray's 3-3-5. Small, fast, angry players. Blitz everything and hit everyone. A team of last-chance kids who hit you harder than you expected." },
    { head: "Special teams", text: "A pre-med kicker found at an intramural game and a twenty-six-year-old Australian punter who has no idea what's going on. The comic subplot that wins games." },
  ],
  made: [
    { head: "Swappable opponents", text: "Every opponent but Arkansas is written as a type. Any of them can be a licensed school or a composite without rewriting a scene." },
    { head: "Real town, fictional school", text: "Fort Smith and the river towns are real. Arkansas Valley University, The Pit and every business on screen are invented." },
    { head: "Pressures, not headlines", text: "NIL rules and transfer windows change every year. The show dramatizes money, leverage and being for sale, never a rule that could date before air." },
    { head: "Ten people a season", text: "A program is a hundred and five players and a town. Each season is carried by about ten of them, and the rest wait for their season." },
  ],
};

// ---------- Why now, comps, creator ----------

export const whyNow = {
  head: "College football has never had more money or less innocence.",
  body: [
    "NIL, the portal and conference realignment have turned nineteen-year-olds into free agents and universities into TV networks. A sports drama about the game today is a story about who gets paid and who gets used, and who still plays for something more.",
  ],
  rule: "Football is the costume. The subject is what work does to a body, and what a town will give up to win.",
  comps: [
    { title: "Friday Night Lights", why: "The small-town heart." },
    { title: "Any Given Sunday", why: "What the game does to the men who play it." },
    { title: "Set today", why: "Big-money college football: NIL deals, the portal, boosters who think they own the roster." },
  ],
};

export const creator = {
  body: [
    "C. T. Herndon has run a $500 million manufacturing business, founded AI companies, and written and published novels.",
    "He played Division I college baseball at Coastal Carolina University, so he knows from the inside what this show is about: the injuries you play through, the pressure to perform every day, the long odds of going pro, and the fear of failing at the only thing you've ever been good at.",
  ],
  position: "Season one is written: the pilot and nine more, 532 pages. The bible maps all four seasons.",
};
