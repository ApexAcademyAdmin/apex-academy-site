/**
 * Apex League — Mock Data
 * Structured for future Supabase migration
 */

// ═══════════════════════════════════════
// LEAGUE META
// ═══════════════════════════════════════

export const LEAGUE_META = {
  name: "Apex League",
  season: "Summer 2026",
  seasonStart: "June 14, 2026",
  seasonEnd: "August 16, 2026",
  championship: "August 22-23, 2026",
  registrationDeadline: "June 10, 2026",
  registrationFee: "$175",
  location: "Greater Boston Area",
  divisions: ["10U", "12U", "14U", "16U", "18U"],
  totalTeams: 20,
  totalPlayers: 250,
  gamesPerTeam: 14,
  totalGames: 140,
  playoffTeams: 10,
  gameDays: "Wednesday, Thursday, Friday",
  gameDaysNote: "Weekday-only schedule — weekends free for tournaments",
  rules: {
    pitchCounts: true,
    droppedThirdStrike: true,
    infieldFly: true,
    leadoffsAndStealing: true,
  },
};

// ═══════════════════════════════════════
// RULES BY DIVISION
// ═══════════════════════════════════════

export type DivisionRules = {
  division: string;
  ages: string;
  innings: number;
  mercyRule: string;
  pitchCount: number;
  restDays: string;
  leadoffs: boolean;
  stealing: boolean;
  droppedThird: boolean;
  infieldFly: boolean;
  batLineup: string;
  notes: string;
};

export const DIVISION_RULES: DivisionRules[] = [
  {
    division: "10U",
    ages: "9-10 (as of Sept 1)",
    innings: 6,
    mercyRule: "10 after 4, 15 after 3",
    pitchCount: 75,
    restDays: "1-20 pitches: 0 days, 21-35: 1 day, 36-50: 2 days, 51-65: 3 days, 66+: 4 days",
    leadoffs: false,
    stealing: true,
    droppedThird: false,
    infieldFly: true,
    batLineup: "Continuous batting order",
    notes: "No leadoffs. Stealing allowed after pitch crosses the plate. Coach pitch option for first 2 innings if agreed.",
  },
  {
    division: "12U",
    ages: "11-12 (as of Sept 1)",
    innings: 6,
    mercyRule: "10 after 4, 15 after 3",
    pitchCount: 85,
    restDays: "1-20 pitches: 0 days, 21-35: 1 day, 36-50: 2 days, 51-65: 3 days, 66+: 4 days",
    leadoffs: true,
    stealing: true,
    droppedThird: true,
    infieldFly: true,
    batLineup: "Continuous batting order",
    notes: "Full MLB rules apply. Balks enforced with one warning per pitcher.",
  },
  {
    division: "14U",
    ages: "13-14 (as of Sept 1)",
    innings: 7,
    mercyRule: "10 after 5",
    pitchCount: 95,
    restDays: "1-25 pitches: 0 days, 26-40: 1 day, 41-55: 2 days, 56-75: 3 days, 76+: 4 days",
    leadoffs: true,
    stealing: true,
    droppedThird: true,
    infieldFly: true,
    batLineup: "9-player lineup or DH",
    notes: "Full MLB rules. DH allowed. 90-foot basepaths. 60'6\" pitching distance.",
  },
  {
    division: "16U",
    ages: "15-16 (as of Sept 1)",
    innings: 7,
    mercyRule: "10 after 5",
    pitchCount: 105,
    restDays: "1-30 pitches: 0 days, 31-45: 1 day, 46-60: 2 days, 61-80: 3 days, 81+: 4 days",
    leadoffs: true,
    stealing: true,
    droppedThird: true,
    infieldFly: true,
    batLineup: "9-player lineup or DH",
    notes: "Full MLB rules. DH allowed. 90-foot basepaths. 60'6\" pitching distance. Showcase-ready competition.",
  },
  {
    division: "18U",
    ages: "17-18 (as of Sept 1)",
    innings: 7,
    mercyRule: "10 after 5",
    pitchCount: 110,
    restDays: "1-30 pitches: 0 days, 31-45: 1 day, 46-60: 2 days, 61-80: 3 days, 81+: 4 days",
    leadoffs: true,
    stealing: true,
    droppedThird: true,
    infieldFly: true,
    batLineup: "9-player lineup or DH",
    notes: "Full MLB rules. DH allowed. 90-foot basepaths. 60'6\" pitching distance. College-prep level competition. Recruiting-ready environment.",
  },
];

// ═══════════════════════════════════════
// STANDINGS
// ═══════════════════════════════════════

export type StandingsEntry = {
  rank: number;
  team: string;
  teamId: string;
  division: string;
  w: number;
  l: number;
  t: number;
  pct: string;
  rs: number;
  ra: number;
  streak: string;
  gb: string;
  playoffBound: boolean;
};

export const STANDINGS: Record<string, StandingsEntry[]> = {
  // ── 10U ──
  "10U-Premier": [
    { rank: 1, team: "Arlington", teamId: "", division: "10U-Premier", w: 8, l: 2, t: 0, pct: ".800", rs: 72, ra: 34, streak: "W4", gb: "—", playoffBound: true },
    { rank: 2, team: "Belmont", teamId: "", division: "10U-Premier", w: 7, l: 3, t: 0, pct: ".700", rs: 65, ra: 41, streak: "W2", gb: "1.0", playoffBound: true },
    { rank: 3, team: "Lexington", teamId: "", division: "10U-Premier", w: 5, l: 5, t: 0, pct: ".500", rs: 48, ra: 52, streak: "L1", gb: "3.0", playoffBound: false },
    { rank: 4, team: "Winchester", teamId: "", division: "10U-Premier", w: 2, l: 8, t: 0, pct: ".200", rs: 29, ra: 67, streak: "L3", gb: "6.0", playoffBound: false },
  ],
  "10U-Prospect": [
    { rank: 1, team: "Needham", teamId: "", division: "10U-Prospect", w: 7, l: 3, t: 0, pct: ".700", rs: 58, ra: 38, streak: "W3", gb: "—", playoffBound: true },
    { rank: 2, team: "Wellesley", teamId: "", division: "10U-Prospect", w: 6, l: 4, t: 0, pct: ".600", rs: 52, ra: 44, streak: "W1", gb: "1.0", playoffBound: true },
    { rank: 3, team: "Natick", teamId: "", division: "10U-Prospect", w: 4, l: 6, t: 0, pct: ".400", rs: 39, ra: 50, streak: "L2", gb: "3.0", playoffBound: false },
    { rank: 4, team: "Sudbury", teamId: "", division: "10U-Prospect", w: 3, l: 7, t: 0, pct: ".300", rs: 31, ra: 55, streak: "L1", gb: "4.0", playoffBound: false },
  ],
  // ── 12U ──
  "12U-Premier": [
    { rank: 1, team: "Cambridge", teamId: "", division: "12U-Premier", w: 9, l: 1, t: 0, pct: ".900", rs: 88, ra: 28, streak: "W7", gb: "—", playoffBound: true },
    { rank: 2, team: "Watertown", teamId: "", division: "12U-Premier", w: 6, l: 4, t: 0, pct: ".600", rs: 54, ra: 43, streak: "L1", gb: "3.0", playoffBound: true },
    { rank: 3, team: "Waltham", teamId: "", division: "12U-Premier", w: 5, l: 5, t: 0, pct: ".500", rs: 46, ra: 49, streak: "W2", gb: "4.0", playoffBound: false },
    { rank: 4, team: "Medford", teamId: "", division: "12U-Premier", w: 4, l: 6, t: 0, pct: ".400", rs: 40, ra: 55, streak: "L2", gb: "5.0", playoffBound: false },
  ],
  "12U-Prospect": [
    { rank: 1, team: "Reading", teamId: "", division: "12U-Prospect", w: 7, l: 3, t: 0, pct: ".700", rs: 61, ra: 40, streak: "W2", gb: "—", playoffBound: true },
    { rank: 2, team: "Stoneham", teamId: "", division: "12U-Prospect", w: 6, l: 4, t: 0, pct: ".600", rs: 53, ra: 45, streak: "W1", gb: "1.0", playoffBound: true },
    { rank: 3, team: "Melrose", teamId: "", division: "12U-Prospect", w: 4, l: 6, t: 0, pct: ".400", rs: 38, ra: 51, streak: "L3", gb: "3.0", playoffBound: false },
    { rank: 4, team: "Wakefield", teamId: "", division: "12U-Prospect", w: 3, l: 7, t: 0, pct: ".300", rs: 35, ra: 62, streak: "L1", gb: "4.0", playoffBound: false },
  ],
  // ── 14U ──
  "14U-Premier": [
    { rank: 1, team: "Brookline", teamId: "", division: "14U-Premier", w: 7, l: 3, t: 0, pct: ".700", rs: 63, ra: 38, streak: "W1", gb: "—", playoffBound: true },
    { rank: 2, team: "Newton", teamId: "", division: "14U-Premier", w: 7, l: 3, t: 0, pct: ".700", rs: 59, ra: 40, streak: "W3", gb: "—", playoffBound: true },
    { rank: 3, team: "Concord", teamId: "", division: "14U-Premier", w: 5, l: 5, t: 0, pct: ".500", rs: 47, ra: 49, streak: "L2", gb: "2.0", playoffBound: false },
    { rank: 4, team: "Weston", teamId: "", division: "14U-Premier", w: 3, l: 7, t: 0, pct: ".300", rs: 34, ra: 58, streak: "L1", gb: "4.0", playoffBound: false },
  ],
  "14U-Prospect": [
    { rank: 1, team: "Framingham", teamId: "", division: "14U-Prospect", w: 6, l: 4, t: 0, pct: ".600", rs: 50, ra: 42, streak: "W2", gb: "—", playoffBound: true },
    { rank: 2, team: "Marlboro", teamId: "", division: "14U-Prospect", w: 5, l: 5, t: 0, pct: ".500", rs: 44, ra: 46, streak: "L1", gb: "1.0", playoffBound: true },
    { rank: 3, team: "Westford", teamId: "", division: "14U-Prospect", w: 4, l: 6, t: 0, pct: ".400", rs: 38, ra: 50, streak: "W1", gb: "2.0", playoffBound: false },
    { rank: 4, team: "Acton", teamId: "", division: "14U-Prospect", w: 3, l: 7, t: 0, pct: ".300", rs: 30, ra: 55, streak: "L3", gb: "3.0", playoffBound: false },
  ],
  // ── 16U ──
  "16U-Premier": [
    { rank: 1, team: "Burlington", teamId: "", division: "16U-Premier", w: 8, l: 1, t: 1, pct: ".850", rs: 79, ra: 31, streak: "W5", gb: "—", playoffBound: true },
    { rank: 2, team: "Billerica", teamId: "", division: "16U-Premier", w: 6, l: 3, t: 1, pct: ".650", rs: 58, ra: 42, streak: "W1", gb: "2.0", playoffBound: true },
    { rank: 3, team: "Woburn", teamId: "", division: "16U-Premier", w: 5, l: 5, t: 0, pct: ".500", rs: 51, ra: 48, streak: "W2", gb: "3.0", playoffBound: false },
    { rank: 4, team: "Wilmington", teamId: "", division: "16U-Premier", w: 4, l: 6, t: 0, pct: ".400", rs: 44, ra: 53, streak: "L2", gb: "4.0", playoffBound: false },
  ],
  "16U-Prospect": [
    { rank: 1, team: "Saugus", teamId: "", division: "16U-Prospect", w: 6, l: 4, t: 0, pct: ".600", rs: 49, ra: 41, streak: "W1", gb: "—", playoffBound: true },
    { rank: 2, team: "Lynnfield", teamId: "", division: "16U-Prospect", w: 5, l: 5, t: 0, pct: ".500", rs: 43, ra: 45, streak: "L1", gb: "1.0", playoffBound: true },
    { rank: 3, team: "Revere", teamId: "", division: "16U-Prospect", w: 4, l: 6, t: 0, pct: ".400", rs: 37, ra: 50, streak: "L2", gb: "2.0", playoffBound: false },
    { rank: 4, team: "Everett", teamId: "", division: "16U-Prospect", w: 3, l: 7, t: 0, pct: ".300", rs: 30, ra: 56, streak: "L3", gb: "3.0", playoffBound: false },
  ],
  // ── 18U ──
  "18U-Premier": [
    { rank: 1, team: "North Andover", teamId: "", division: "18U-Premier", w: 7, l: 2, t: 1, pct: ".750", rs: 68, ra: 35, streak: "W3", gb: "—", playoffBound: true },
    { rank: 2, team: "Lawrence", teamId: "", division: "18U-Premier", w: 6, l: 4, t: 0, pct: ".600", rs: 55, ra: 44, streak: "W1", gb: "1.5", playoffBound: true },
    { rank: 3, team: "Lowell", teamId: "", division: "18U-Premier", w: 5, l: 4, t: 1, pct: ".550", rs: 49, ra: 42, streak: "L1", gb: "2.0", playoffBound: false },
    { rank: 4, team: "Groton", teamId: "", division: "18U-Premier", w: 3, l: 7, t: 0, pct: ".300", rs: 33, ra: 58, streak: "L4", gb: "4.5", playoffBound: false },
  ],
  "18U-Prospect": [
    { rank: 1, team: "Beverly", teamId: "", division: "18U-Prospect", w: 7, l: 3, t: 0, pct: ".700", rs: 59, ra: 38, streak: "W2", gb: "—", playoffBound: true },
    { rank: 2, team: "Marblehead", teamId: "", division: "18U-Prospect", w: 6, l: 4, t: 0, pct: ".600", rs: 52, ra: 43, streak: "W1", gb: "1.0", playoffBound: true },
    { rank: 3, team: "Swampscott", teamId: "", division: "18U-Prospect", w: 4, l: 6, t: 0, pct: ".400", rs: 40, ra: 51, streak: "L2", gb: "3.0", playoffBound: false },
    { rank: 4, team: "Winthrop", teamId: "", division: "18U-Prospect", w: 3, l: 7, t: 0, pct: ".300", rs: 34, ra: 55, streak: "L3", gb: "4.0", playoffBound: false },
  ],
};

// ═══════════════════════════════════════
// UPCOMING GAMES
// ═══════════════════════════════════════

export type UpcomingGame = {
  id: string;
  date: string;
  time: string;
  home: string;
  away: string;
  homeRecord: string;
  awayRecord: string;
  location: string;
  ageGroup: string;
  division: string;
  isLive: boolean;
  streamAvailable: boolean;
};

export const UPCOMING_GAMES: UpcomingGame[] = [
  { id: "g1", date: "Wed, Jun 18", time: "5:30 PM", home: "Arlington", away: "Belmont", homeRecord: "8-2", awayRecord: "7-3", location: "Spy Pond Field, Arlington", ageGroup: "10U", division: "Premier", isLive: false, streamAvailable: false },
  { id: "g2", date: "Wed, Jun 18", time: "5:30 PM", home: "Cambridge", away: "Waltham", homeRecord: "9-1", awayRecord: "5-5", location: "St. Peter's Field, Cambridge", ageGroup: "12U", division: "Premier", isLive: false, streamAvailable: false },
  { id: "g3", date: "Wed, Jun 18", time: "5:30 PM", home: "Newton", away: "Brookline", homeRecord: "7-3", awayRecord: "7-3", location: "Newton South High School", ageGroup: "14U", division: "Premier", isLive: false, streamAvailable: false },
  { id: "g4", date: "Wed, Jun 18", time: "7:30 PM", home: "Burlington", away: "Billerica", homeRecord: "8-1-1", awayRecord: "6-3-1", location: "Simonds Park, Burlington", ageGroup: "16U", division: "Premier", isLive: false, streamAvailable: false },
  { id: "g5", date: "Thu, Jun 19", time: "5:30 PM", home: "Lexington", away: "Winchester", homeRecord: "5-5", awayRecord: "2-8", location: "Diamond Middle School, Lexington", ageGroup: "10U", division: "Premier", isLive: false, streamAvailable: false },
  { id: "g6", date: "Thu, Jun 19", time: "7:30 PM", home: "North Andover", away: "Lawrence", homeRecord: "7-2-1", awayRecord: "6-4", location: "North Andover High School", ageGroup: "18U", division: "Premier", isLive: false, streamAvailable: false },
  { id: "g7", date: "Wed, Jun 25", time: "5:30 PM", home: "Watertown", away: "Medford", homeRecord: "6-4", awayRecord: "4-6", location: "Moxley Field, Watertown", ageGroup: "12U", division: "Premier", isLive: false, streamAvailable: false },
  { id: "g8", date: "Wed, Jun 25", time: "5:30 PM", home: "Framingham", away: "Acton", homeRecord: "6-4", awayRecord: "3-7", location: "Long Field, Framingham", ageGroup: "14U", division: "Prospect", isLive: false, streamAvailable: false },
  { id: "g9", date: "Wed, Jun 25", time: "5:30 PM", home: "Needham", away: "Natick", homeRecord: "7-3", awayRecord: "4-6", location: "Warner / DeFazio Field, Needham", ageGroup: "10U", division: "Prospect", isLive: false, streamAvailable: false },
  { id: "g10", date: "Thu, Jun 26", time: "5:30 PM", home: "Saugus", away: "Everett", homeRecord: "6-4", awayRecord: "3-7", location: "Stackpole Field, Saugus", ageGroup: "16U", division: "Prospect", isLive: false, streamAvailable: false },
];

// ═══════════════════════════════════════
// RECENT RESULTS
// ═══════════════════════════════════════

export type PitcherResult = {
  name: string;
  ip: string;
  pitches: number;
};

export type GameResult = {
  id: string;
  date: string;
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
  division: string;
  homePitchers: PitcherResult[];
  awayPitchers: PitcherResult[];
};

export const RECENT_RESULTS: GameResult[] = [
  { id: "r1", date: "Wed, Jun 11", home: "Cambridge", away: "Watertown", homeScore: 8, awayScore: 3, division: "12U Premier",
    homePitchers: [{ name: "Jaylen Park", ip: "5.0", pitches: 72 }, { name: "Carlos Diaz", ip: "1.0", pitches: 14 }],
    awayPitchers: [{ name: "Ryan Sullivan", ip: "3.2", pitches: 68 }, { name: "Noah Briggs", ip: "2.1", pitches: 41 }] },
  { id: "r2", date: "Wed, Jun 11", home: "Arlington", away: "Lexington", homeScore: 6, awayScore: 4, division: "10U Premier",
    homePitchers: [{ name: "Aiden Brooks", ip: "4.0", pitches: 62 }, { name: "Sam Ortiz", ip: "2.0", pitches: 28 }],
    awayPitchers: [{ name: "Jake Miller", ip: "4.0", pitches: 71 }, { name: "Leo Tran", ip: "1.0", pitches: 18 }] },
  { id: "r3", date: "Wed, Jun 11", home: "Burlington", away: "Wilmington", homeScore: 11, awayScore: 2, division: "16U Premier",
    homePitchers: [{ name: "Liam Torres", ip: "6.0", pitches: 82 }],
    awayPitchers: [{ name: "Derek Walsh", ip: "2.2", pitches: 58 }, { name: "Marcus Hall", ip: "2.1", pitches: 44 }, { name: "Chris Pena", ip: "1.0", pitches: 19 }] },
  { id: "r4", date: "Wed, Jun 11", home: "Newton", away: "Weston", homeScore: 9, awayScore: 1, division: "14U Premier",
    homePitchers: [{ name: "Owen McCarthy", ip: "7.0", pitches: 91 }],
    awayPitchers: [{ name: "Tyler Grant", ip: "3.0", pitches: 62 }, { name: "Ben Costa", ip: "3.0", pitches: 48 }] },
  { id: "r5", date: "Thu, Jun 12", home: "Brookline", away: "Concord", homeScore: 5, awayScore: 4, division: "14U Premier",
    homePitchers: [{ name: "Nolan West", ip: "5.2", pitches: 88 }, { name: "Julian Reyes", ip: "1.1", pitches: 22 }],
    awayPitchers: [{ name: "Cole Davidson", ip: "6.0", pitches: 94 }, { name: "Matt Singh", ip: "0.2", pitches: 11 }] },
];

