export type GameStatus = "upcoming" | "live" | "final" | "canceled" | "postponed";
export type GameType = "league" | "tournament" | "showcase" | "scrimmage";

export type Venue = { name: string; address: string };

export type LineupPlayer = {
  playerId: string;
  playerName: string;
  pos: string;
  battingOrder: number; // 1-indexed slot in order
  active: boolean;
  subbedInning?: number;
  subbedOutInning?: number;
};

export type OpponentPlayer = {
  id: string;
  name: string;
  number: string;
  pos: string;
  battingOrder: number;
  active: boolean;
};

export type BaseRunners = {
  first: string | null;
  second: string | null;
  third: string | null;
};

export type AtBatResult =
  | "1B" | "2B" | "3B" | "HR"
  | "BB" | "HBP"
  | "K" | "KL"
  | "GO" | "FO" | "LO" | "PO"
  | "FC" | "SAC" | "SF"
  | "E" | "ROE"
  | "DP" | "TP"
  | "SB" | "CS" | "PO_RUNNER"
  | "WP" | "PB" | "BK";

export type AtBat = {
  id: string;
  inning: number;
  isTopHalf: boolean;
  playerId: string;
  playerName: string;
  result: AtBatResult;
  rbis: number;
  outs: number; // outs produced by this play (0, 1, 2, 3)
  runnersAdvanced: string[]; // names of runners who scored
  timestamp: number;
};

export type PitcherEntry = {
  playerId: string;
  playerName: string;
  inningsStart: number;
  inningsEnd?: number;
  pitchCount: number;
  strikeouts: number;
  walks: number;
  hitsAllowed: number;
  runsAllowed: number;
  earnedRuns: number;
};

export type LinescoreData = {
  innings: InningScore[];
  currentInning: number;
  isTopHalf: boolean;
  homeRuns: number;
  awayRuns: number;
  homeHits: number;
  awayHits: number;
  homeErrors: number;
  awayErrors: number;
  outs: number;
};

export type InningScore = { top: number; bottom: number | null };

export type GameSnapshot = {
  linescore: LinescoreData;
  baseRunners: BaseRunners;
  homeBatterIndex: number;
  awayBatterIndex: number;
  atBatId: string;
};

export type Game = {
  id: string;
  teamId: string;
  date: string;
  time: string;
  opponent: string;
  gameType: GameType;
  eventName?: string;
  venue: Venue;
  status: GameStatus;
  totalInnings: number;
  linescore: LinescoreData;
  atBats: AtBat[];
  pitcherLog: PitcherEntry[];
  homeLineup: LineupPlayer[];
  opponentLineup: OpponentPlayer[];
  baseRunners: BaseRunners;
  homeBatterIndex: number; // current position in home batting order (0-indexed)
  awayBatterIndex: number; // current position in away batting order (0-indexed)
  undoStack: GameSnapshot[];
  streamUrl?: string;
  createdAt: number;
};

export type BattingLine = {
  playerId: string;
  playerName: string;
  AB: number;
  H: number;
  "2B": number;
  "3B": number;
  HR: number;
  BB: number;
  HBP: number;
  K: number;
  RBI: number;
  AVG: string;
  OBP: string;
  SLG: string;
};

export type PitchingLine = {
  playerId: string;
  playerName: string;
  IP: string;
  H: number;
  R: number;
  ER: number;
  BB: number;
  K: number;
  PC: number;
  ERA: string;
  WHIP: string;
};

export const GAME_TYPE_LABELS: Record<GameType, string> = {
  league: "League",
  tournament: "Tournament",
  showcase: "Showcase",
  scrimmage: "Scrimmage",
};

export const POSITIONS = ["C", "1B", "2B", "SS", "3B", "LF", "CF", "RF", "DH", "P", "FLEX"];
