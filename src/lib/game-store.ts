import type { Game, AtBat, AtBatResult, LinescoreData, GameType, Venue, LineupPlayer, OpponentPlayer, BaseRunners, GameSnapshot } from "./scoring-types";
import { uid, isHit, isOut, isAtBat as isAtBatResult } from "./scoring-utils";

const GAMES_KEY = (t: string) => `apex_games_${t}`;
const PASS_KEY = (t: string) => `apex_team_password_${t}`;
const SESSION_KEY = (t: string) => `apex_coach_session_${t}`;
const SESSION_DURATION = 24 * 60 * 60 * 1000;

function emptyLinescore(): LinescoreData {
  return { innings: [{ top: 0, bottom: null }], currentInning: 1, isTopHalf: true, homeRuns: 0, awayRuns: 0, homeHits: 0, awayHits: 0, homeErrors: 0, awayErrors: 0, outs: 0 };
}
function emptyBases(): BaseRunners { return { first: null, second: null, third: null }; }
function notify() { try { new BroadcastChannel("apex-scoring").postMessage("update"); } catch {} }

// ── Storage ──

export function getGames(teamId: string): Game[] {
  if (typeof window === "undefined") return [];
  const raw: any[] = JSON.parse(localStorage.getItem(GAMES_KEY(teamId)) || "[]");
  // Backfill missing fields from older game data
  return raw.map((g) => ({
    ...g,
    homeLineup: g.homeLineup || [],
    opponentLineup: g.opponentLineup || [],
    baseRunners: g.baseRunners || emptyBases(),
    homeBatterIndex: g.homeBatterIndex ?? 0,
    awayBatterIndex: g.awayBatterIndex ?? 0,
    undoStack: g.undoStack || [],
    gameType: g.gameType || "league",
    venue: g.venue || { name: "", address: "" },
    totalInnings: g.totalInnings || 7,
  }));
}
export function getGame(teamId: string, gameId: string): Game | undefined {
  return getGames(teamId).find((g) => g.id === gameId);
}
function save(teamId: string, games: Game[]) { localStorage.setItem(GAMES_KEY(teamId), JSON.stringify(games)); notify(); }
function update(teamId: string, gameId: string, fn: (g: Game) => Game): Game {
  const games = getGames(teamId); const i = games.findIndex((g) => g.id === gameId);
  if (i === -1) throw new Error("Game not found");
  games[i] = fn(games[i]); save(teamId, games); return games[i];
}

// ── Create ──

export type CreateGameData = { date: string; time: string; opponent: string; gameType: GameType; eventName?: string; venue: Venue; totalInnings?: number };

export function createGame(teamId: string, d: CreateGameData): Game {
  const game: Game = {
    id: uid(), teamId, date: d.date, time: d.time, opponent: d.opponent,
    gameType: d.gameType, eventName: d.eventName, venue: d.venue,
    status: "upcoming", totalInnings: d.totalInnings || 7,
    linescore: emptyLinescore(), atBats: [], pitcherLog: [],
    homeLineup: [], opponentLineup: [], baseRunners: emptyBases(),
    homeBatterIndex: 0, awayBatterIndex: 0, undoStack: [],
    createdAt: Date.now(),
  };
  const games = getGames(teamId); games.push(game); save(teamId, games); return game;
}
export function deleteGame(teamId: string, gameId: string) { save(teamId, getGames(teamId).filter((g) => g.id !== gameId)); }

// ── Lifecycle ──

export function startGame(teamId: string, gameId: string): Game { return update(teamId, gameId, (g) => ({ ...g, status: "live" })); }
export function endGame(teamId: string, gameId: string): Game { return update(teamId, gameId, (g) => ({ ...g, status: "final" })); }
export function cancelGame(teamId: string, gameId: string): Game { return update(teamId, gameId, (g) => ({ ...g, status: "canceled" })); }
export function postponeGame(teamId: string, gameId: string): Game { return update(teamId, gameId, (g) => ({ ...g, status: "postponed" })); }

// ── Stream ──

export function setStreamUrl(teamId: string, gameId: string, url: string): Game { return update(teamId, gameId, (g) => ({ ...g, streamUrl: url })); }
export function removeStream(teamId: string, gameId: string): Game { return update(teamId, gameId, (g) => ({ ...g, streamUrl: undefined })); }

// ── Lineups ──

export function setHomeLineup(teamId: string, gameId: string, lineup: LineupPlayer[]): Game { return update(teamId, gameId, (g) => ({ ...g, homeLineup: lineup, homeBatterIndex: 0 })); }
export function setOpponentLineup(teamId: string, gameId: string, lineup: OpponentPlayer[]): Game { return update(teamId, gameId, (g) => ({ ...g, opponentLineup: lineup, awayBatterIndex: 0 })); }

export function substituteHome(teamId: string, gameId: string, outId: string, inPlayer: LineupPlayer): Game {
  return update(teamId, gameId, (g) => {
    const outSlot = g.homeLineup.find((p) => p.playerId === outId && p.active);
    const lineup = g.homeLineup.map((p) => p.playerId === outId && p.active ? { ...p, active: false, subbedOutInning: g.linescore.currentInning } : p);
    lineup.push({ ...inPlayer, battingOrder: outSlot?.battingOrder || lineup.length + 1, subbedInning: g.linescore.currentInning, active: true });
    return { ...g, homeLineup: lineup };
  });
}

// ── CORE SCORING ENGINE ──

function snapshot(g: Game, abId: string): GameSnapshot {
  return {
    linescore: JSON.parse(JSON.stringify(g.linescore)),
    baseRunners: { ...g.baseRunners },
    homeBatterIndex: g.homeBatterIndex,
    awayBatterIndex: g.awayBatterIndex,
    atBatId: abId,
  };
}

/** Get the current batter based on lineup and index */
export function getCurrentBatter(game: Game): { id: string; name: string; pos: string } | null {
  const isHome = !game.linescore.isTopHalf;
  if (isHome) {
    const active = (game.homeLineup || []).filter((p) => p.active).sort((a, b) => a.battingOrder - b.battingOrder);
    if (active.length === 0) return null;
    const idx = (game.homeBatterIndex || 0) % active.length;
    const p = active[idx];
    if (!p) return null;
    return { id: p.playerId, name: p.playerName, pos: p.pos };
  } else {
    const active = (game.opponentLineup || []).filter((p) => p.active).sort((a, b) => a.battingOrder - b.battingOrder);
    if (active.length === 0) return null;
    const idx = (game.awayBatterIndex || 0) % active.length;
    const p = active[idx];
    if (!p) return null;
    return { id: p.id, name: p.name, pos: p.pos };
  }
}

/** Get on-deck and in-the-hole batters */
export function getUpNext(game: Game): { onDeck: string | null; inHole: string | null } {
  const isHome = !game.linescore.isTopHalf;
  const lineup = isHome
    ? (game.homeLineup || []).filter((p) => p.active).sort((a, b) => a.battingOrder - b.battingOrder)
    : (game.opponentLineup || []).filter((p) => p.active).sort((a, b) => a.battingOrder - b.battingOrder);
  if (lineup.length === 0) return { onDeck: null, inHole: null };
  const curIdx = (isHome ? (game.homeBatterIndex || 0) : (game.awayBatterIndex || 0));
  const onDeckIdx = (curIdx + 1) % lineup.length;
  const inHoleIdx = (curIdx + 2) % lineup.length;
  const getName = (i: number) => {
    const p = lineup[i];
    if (!p) return null;
    return "playerName" in p ? (p as LineupPlayer).playerName : (p as OpponentPlayer).name;
  };
  return { onDeck: getName(onDeckIdx), inHole: getName(inHoleIdx) };
}

/** Manual override options for when the coach controls runner advancement */
export type PlayOverride = {
  runs: number;
  rbis: number;
  runnersScored: string[];
  newBases: BaseRunners;
};

/** The main scoring function — records a play and auto-updates everything */
export function recordPlay(teamId: string, gameId: string, result: AtBatResult, extraRbis?: number, override?: PlayOverride): Game {
  return update(teamId, gameId, (g) => {
    const batter = getCurrentBatter(g);
    if (!batter) return g;

    const isHome = !g.linescore.isTopHalf;
    const abId = uid();
    const ls = JSON.parse(JSON.stringify(g.linescore)) as LinescoreData;
    let bases: BaseRunners = { ...g.baseRunners };
    const innIdx = ls.currentInning - 1;

    // Save snapshot for undo BEFORE changes
    const snap = snapshot(g, abId);

    let outsOnPlay = 0;
    let rbis = 0;
    let runnersScored: string[] = [];

    // ── Non-batter events (SB, CS, WP, PB, BK, PO_RUNNER) ──
    if (result === "SB" || result === "CS" || result === "PO_RUNNER" || result === "WP" || result === "PB" || result === "BK") {
      if (result === "CS" || result === "PO_RUNNER") outsOnPlay = 1;
      if (override) {
        runnersScored = override.runnersScored;
        rbis = override.runs;
        bases = override.newBases;
      }
      const runs = override ? override.runs : 0;
      const ab: AtBat = {
        id: abId, inning: ls.currentInning, isTopHalf: ls.isTopHalf,
        playerId: batter.id, playerName: batter.name,
        result, rbis: runs, outs: outsOnPlay, runnersAdvanced: runnersScored, timestamp: Date.now(),
      };
      ls.outs += outsOnPlay;
      if (runs > 0) {
        if (isHome) { ls.homeRuns += runs; if (ls.innings[innIdx]) ls.innings[innIdx] = { ...ls.innings[innIdx], bottom: (ls.innings[innIdx].bottom || 0) + runs }; }
        else { ls.awayRuns += runs; if (ls.innings[innIdx]) ls.innings[innIdx] = { ...ls.innings[innIdx], top: ls.innings[innIdx].top + runs }; }
      }
      const newAtBats = [...g.atBats, ab];
      const newUndoStack = [...g.undoStack, snap];
      if (ls.outs >= 3) return autoAdvanceInning(g, ls, newAtBats, newUndoStack, g.homeBatterIndex, g.awayBatterIndex);
      return { ...g, linescore: ls, atBats: newAtBats, baseRunners: bases, undoStack: newUndoStack };
    }

    // ── Batter events ──

    // Determine outs
    if (result === "DP") outsOnPlay = 2;
    else if (result === "TP") outsOnPlay = 3;
    else if (isOut(result)) outsOnPlay = 1;

    // ── If override provided, use manual runner data instead of auto logic ──
    if (override) {
      runnersScored = override.runnersScored;
      rbis = override.rbis;
      bases = override.newBases;
    } else {
      // Auto runner advancement (no override)
      rbis = extraRbis || 0;
      if (result === "HR") {
        if (bases.third) runnersScored.push(bases.third);
        if (bases.second) runnersScored.push(bases.second);
        if (bases.first) runnersScored.push(bases.first);
        runnersScored.push(batter.name);
        rbis = runnersScored.length;
        bases = { first: null, second: null, third: null };
      } else if (result === "3B") {
        if (bases.third) { runnersScored.push(bases.third); rbis++; }
        if (bases.second) { runnersScored.push(bases.second); rbis++; }
        if (bases.first) { runnersScored.push(bases.first); rbis++; }
        bases = { first: null, second: null, third: batter.name };
      } else if (result === "2B") {
        if (bases.third) { runnersScored.push(bases.third); rbis++; }
        if (bases.second) { runnersScored.push(bases.second); rbis++; }
        bases = { first: null, second: batter.name, third: bases.first };
      } else if (result === "1B" || result === "E" || result === "ROE" || result === "FC") {
        if (bases.third) { runnersScored.push(bases.third); rbis++; }
        bases = { first: batter.name, second: bases.first, third: bases.second };
      } else if (result === "BB" || result === "HBP") {
        if (bases.first && bases.second && bases.third) { runnersScored.push(bases.third); rbis++; }
        if (bases.first && bases.second) bases.third = bases.second;
        if (bases.first) bases.second = bases.first;
        bases.first = batter.name;
      } else if (result === "SF") {
        if (bases.third) { runnersScored.push(bases.third); rbis = 1; }
        bases = { first: bases.first, second: null, third: bases.second };
      } else if (result === "SAC") {
        if (bases.third) { runnersScored.push(bases.third); rbis++; }
        bases = { first: null, second: bases.first, third: bases.second };
      } else if (result === "DP") {
        bases.first = null;
        if (bases.second && !bases.third) bases.second = null;
      }
    }

    // Update score
    const runs = override ? override.runs : runnersScored.length;
    if (runs > 0) {
      if (isHome) {
        ls.homeRuns += runs;
        if (ls.innings[innIdx]) ls.innings[innIdx] = { ...ls.innings[innIdx], bottom: (ls.innings[innIdx].bottom || 0) + runs };
      } else {
        ls.awayRuns += runs;
        if (ls.innings[innIdx]) ls.innings[innIdx] = { ...ls.innings[innIdx], top: ls.innings[innIdx].top + runs };
      }
    }

    // Update hits
    if (isHit(result)) {
      if (isHome) ls.homeHits++; else ls.awayHits++;
    }

    // Update errors
    if (result === "E" || result === "ROE") {
      if (isHome) ls.awayErrors++; else ls.homeErrors++;
    }

    // Update outs
    ls.outs += outsOnPlay;

    // Create at-bat record
    const ab: AtBat = {
      id: abId, inning: ls.currentInning, isTopHalf: ls.isTopHalf,
      playerId: batter.id, playerName: batter.name,
      result, rbis, outs: outsOnPlay, runnersAdvanced: runnersScored, timestamp: Date.now(),
    };

    const newAtBats = [...g.atBats, ab];
    const newUndoStack = [...g.undoStack.slice(-50), snap];

    // Advance batting order
    let hbi = g.homeBatterIndex;
    let abi = g.awayBatterIndex;
    if (isHome) hbi++; else abi++;

    // Auto-advance inning if 3 outs
    if (ls.outs >= 3) {
      return autoAdvanceInning(g, ls, newAtBats, newUndoStack, hbi, abi);
    }

    return { ...g, linescore: ls, atBats: newAtBats, baseRunners: bases, homeBatterIndex: hbi, awayBatterIndex: abi, undoStack: newUndoStack };
  });
}

function autoAdvanceInning(g: Game, ls: LinescoreData, atBats: AtBat[], undoStack: GameSnapshot[], hbi: number, abi: number): Game {
  ls.outs = 0;
  if (ls.isTopHalf) {
    ls.isTopHalf = false;
    if (ls.innings[ls.currentInning - 1]) ls.innings[ls.currentInning - 1] = { ...ls.innings[ls.currentInning - 1], bottom: 0 };
  } else {
    ls.isTopHalf = true;
    ls.currentInning++;
    ls.innings = [...ls.innings, { top: 0, bottom: null }];
  }
  return { ...g, linescore: ls, atBats, baseRunners: emptyBases(), homeBatterIndex: hbi, awayBatterIndex: abi, undoStack };
}

/** Undo the last play — restores full game state */
export function undoLastPlay(teamId: string, gameId: string): Game {
  return update(teamId, gameId, (g) => {
    if (g.undoStack.length === 0 || g.atBats.length === 0) return g;
    const snap = g.undoStack[g.undoStack.length - 1];
    return {
      ...g,
      linescore: snap.linescore,
      baseRunners: snap.baseRunners,
      homeBatterIndex: snap.homeBatterIndex,
      awayBatterIndex: snap.awayBatterIndex,
      atBats: g.atBats.filter((ab) => ab.id !== snap.atBatId),
      undoStack: g.undoStack.slice(0, -1),
    };
  });
}

// ── Manual overrides ──

export function manualSetOuts(teamId: string, gameId: string, outs: number): Game {
  return update(teamId, gameId, (g) => ({ ...g, linescore: { ...g.linescore, outs: Math.min(3, Math.max(0, outs)) } }));
}

export function manualSetBases(teamId: string, gameId: string, bases: BaseRunners): Game {
  return update(teamId, gameId, (g) => ({ ...g, baseRunners: bases }));
}

export function manualSetScore(teamId: string, gameId: string, homeRuns: number, awayRuns: number): Game {
  return update(teamId, gameId, (g) => ({ ...g, linescore: { ...g.linescore, homeRuns, awayRuns } }));
}

export function manualAdvanceInning(teamId: string, gameId: string): Game {
  return update(teamId, gameId, (g) => {
    const ls = { ...g.linescore }; ls.outs = 0;
    if (ls.isTopHalf) { ls.isTopHalf = false; if (ls.innings[ls.currentInning - 1]) ls.innings[ls.currentInning - 1] = { ...ls.innings[ls.currentInning - 1], bottom: 0 }; }
    else { ls.isTopHalf = true; ls.currentInning++; ls.innings = [...ls.innings, { top: 0, bottom: null }]; }
    return { ...g, linescore: ls, baseRunners: emptyBases() };
  });
}

// ── Auth (unchanged) ──

export function hasTeamPassword(teamId: string): boolean { if (typeof window === "undefined") return false; return !!localStorage.getItem(PASS_KEY(teamId)); }
export function setTeamPassword(teamId: string, pw: string) { localStorage.setItem(PASS_KEY(teamId), btoa(pw)); }
export function verifyTeamPassword(teamId: string, pw: string): boolean { return localStorage.getItem(PASS_KEY(teamId)) === btoa(pw); }
export function createCoachSession(teamId: string) { localStorage.setItem(SESSION_KEY(teamId), String(Date.now())); }
export function isCoachSession(teamId: string): boolean { if (typeof window === "undefined") return false; const ts = localStorage.getItem(SESSION_KEY(teamId)); if (!ts) return false; return Date.now() - parseInt(ts) < SESSION_DURATION; }
