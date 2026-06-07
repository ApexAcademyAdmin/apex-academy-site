/**
 * Apex Academy League — Mock Data
 * Structured for future Supabase migration
 */

// ═══════════════════════════════════════
// LEAGUE META
// ═══════════════════════════════════════

export const LEAGUE_META = {
  name: "Apex Academy League",
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
  ],
  "10U-Prospect": [
  ],
  // ── 12U ──
  "12U-Premier": [
  ],
  "12U-Prospect": [
  ],
  // ── 14U ──
  "14U-Premier": [
  ],
  "14U-Prospect": [
  ],
  // ── 16U ──
  "16U-Premier": [
  ],
  "16U-Prospect": [
  ],
  // ── 18U ──
  "18U-Premier": [
  ],
  "18U-Prospect": [
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
];

// ═══════════════════════════════════════
// AWARDS & RECOGNITION
// ═══════════════════════════════════════

export type AwardCategory = {
  id: string;
  name: string;
  description: string;
  perDivision: boolean;
  phase: "regular" | "playoff" | "prospect-games";
};

export const REGULAR_SEASON_AWARDS: AwardCategory[] = [
  { id: "mvp", name: "Most Valuable Player", description: "Awarded to the player who demonstrated the greatest overall impact during the regular season.", perDivision: true, phase: "regular" },
  { id: "cy-young", name: "Cy Young Award", description: "Awarded to the league's top pitcher based on performance, consistency, and dominance on the mound.", perDivision: true, phase: "regular" },
  { id: "rookie", name: "Rookie of the Year", description: "Awarded to the most impactful first-year league player.", perDivision: true, phase: "regular" },
  { id: "most-improved", name: "Most Improved Player", description: "Awarded to the player who demonstrated the greatest development and growth throughout the season.", perDivision: true, phase: "regular" },
  { id: "coach", name: "Coach of the Year", description: "Awarded to the coach who demonstrated outstanding leadership, player development, sportsmanship, and positive impact.", perDivision: true, phase: "regular" },
];

export const POSITIONAL_AWARDS: { id: string; name: string; positions: string[] }[] = [
  { id: "silver-slugger", name: "Silver Slugger Award", positions: ["Catcher", "First Base", "Second Base", "Third Base", "Shortstop", "Outfield", "Outfield", "Outfield", "Designated Hitter"] },
  { id: "gold-glove", name: "Gold Glove Award", positions: ["Catcher", "First Base", "Second Base", "Third Base", "Shortstop", "Outfield", "Outfield", "Outfield"] },
];

export const PLAYOFF_AWARDS: AwardCategory[] = [
  { id: "playoff-mvp", name: "Playoff MVP", description: "Awarded to the player with the greatest overall impact throughout the playoffs.", perDivision: true, phase: "playoff" },
  { id: "championship-mvp", name: "Championship Game MVP", description: "Awarded to the most impactful player in the championship game.", perDivision: true, phase: "playoff" },
  { id: "playoff-cy-young", name: "Playoff Cy Young", description: "Awarded to the most outstanding pitcher during postseason play.", perDivision: true, phase: "playoff" },
];

export const TEAM_AWARDS = [
  { id: "premier-rs-champ", name: "Premier Division Regular Season Champion", phase: "regular" as const },
  { id: "prospect-rs-champ", name: "Prospect Division Regular Season Champion", phase: "regular" as const },
  { id: "premier-champ", name: "Premier Division Champion", phase: "playoff" as const },
  { id: "prospect-champ", name: "Prospect Division Champion", phase: "playoff" as const },
];

export const PROSPECT_GAMES_AWARDS: AwardCategory[] = [
  { id: "pg-selection", name: "All-New England Prospect Games Selection", description: "Selection to the All-New England Prospect Games is one of the highest honors in the league.", perDivision: false, phase: "prospect-games" },
  { id: "pg-mvp", name: "Prospect Games MVP", description: "Awarded to the most valuable player across both prospect games, voted on by attending college coaches.", perDivision: false, phase: "prospect-games" },
  { id: "pg-top-position", name: "Top Position Player", description: "Awarded to the top overall position player at the prospect games.", perDivision: false, phase: "prospect-games" },
  { id: "pg-top-pitcher", name: "Top Pitcher", description: "Awarded to the top pitcher at the prospect games.", perDivision: false, phase: "prospect-games" },
  { id: "pg-top-prospect", name: "Top Prospect", description: "Awarded to the player identified as the top overall prospect by attending college coaches.", perDivision: false, phase: "prospect-games" },
];

export const BANQUET_CEREMONY_ORDER = [
  "Welcome & Opening Remarks",
  "Season Recap",
  "Regular Season Champions",
  "All-New England Prospect Games Recognition",
  "Gold Glove Awards",
  "Silver Slugger Awards",
  "Rookie of the Year",
  "Most Improved Player",
  "Coach of the Year",
  "Cy Young Awards",
  "Playoff Awards",
  "Division Champions",
  "Most Valuable Player Awards",
  "Closing Remarks",
];

