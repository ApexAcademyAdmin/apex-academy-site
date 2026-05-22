import type { Game, BattingLine, PitchingLine } from "./scoring-types";
import { isHit, isAtBat, totalBases, formatAvg, formatEra, formatWhip } from "./scoring-utils";

/** Compute batting stats for a single player across games */
export function computePlayerBatting(playerId: string, playerName: string, games: Game[]): BattingLine {
  let AB = 0, H = 0, doubles = 0, triples = 0, HR = 0, BB = 0, HBP = 0, K = 0, RBI = 0, SF = 0, tb = 0;

  for (const game of games) {
    if (game.status !== "final" && game.status !== "live") continue;
    for (const ab of game.atBats || []) {
      if (ab.playerId !== playerId || ab.isTopHalf) continue;
      if (isAtBat(ab.result)) AB++;
      if (isHit(ab.result)) H++;
      if (ab.result === "2B") doubles++;
      if (ab.result === "3B") triples++;
      if (ab.result === "HR") HR++;
      if (ab.result === "BB") BB++;
      if (ab.result === "HBP") HBP++;
      if (ab.result === "K" || ab.result === "KL") K++;
      if (ab.result === "SF") SF++;
      RBI += ab.rbis || 0;
      tb += totalBases(ab.result);
    }
  }

  const pa = AB + BB + HBP + SF;
  return {
    playerId, playerName, AB, H, "2B": doubles, "3B": triples, HR, BB, HBP, K, RBI,
    AVG: formatAvg(H, AB),
    OBP: pa > 0 ? ((H + BB + HBP) / pa).toFixed(3).replace(/^0/, "") : ".000",
    SLG: AB > 0 ? (tb / AB).toFixed(3).replace(/^0/, "") : ".000",
  };
}

/** Compute team batting for all players who appeared */
export function computeTeamBatting(teamId: string, games: Game[]): BattingLine[] {
  const teamGames = games.filter((g) => g.teamId === teamId && (g.status === "final" || g.status === "live"));
  const playerMap = new Map<string, string>();

  for (const game of teamGames) {
    for (const ab of game.atBats || []) {
      if (!ab.isTopHalf) playerMap.set(ab.playerId, ab.playerName);
    }
  }

  const lines: BattingLine[] = [];
  for (const [pid, name] of playerMap) {
    const line = computePlayerBatting(pid, name, teamGames);
    if (line.AB > 0 || line.BB > 0) lines.push(line);
  }

  return lines.sort((a, b) => {
    const avgA = a.AB > 0 ? a.H / a.AB : 0;
    const avgB = b.AB > 0 ? b.H / b.AB : 0;
    return avgB - avgA;
  });
}

/** Compute team pitching stats */
export function computeTeamPitching(teamId: string, games: Game[]): PitchingLine[] {
  const teamGames = games.filter((g) => g.teamId === teamId && (g.status === "final" || g.status === "live"));
  const pitcherMap = new Map<string, { name: string; entries: any[] }>();

  for (const game of teamGames) {
    for (const entry of game.pitcherLog || []) {
      const existing = pitcherMap.get(entry.playerId) || { name: entry.playerName, entries: [] };
      existing.entries.push(entry);
      pitcherMap.set(entry.playerId, existing);
    }
  }

  const lines: PitchingLine[] = [];
  for (const [pid, { name, entries }] of pitcherMap) {
    let H = 0, R = 0, ER = 0, BB = 0, K = 0, PC = 0, totalOuts = 0;
    for (const e of entries) {
      H += e.hitsAllowed || 0; R += e.runsAllowed || 0; ER += e.earnedRuns || 0;
      BB += e.walks || 0; K += e.strikeouts || 0; PC += e.pitchCount || 0;
      if (e.inningsEnd !== undefined) totalOuts += (e.inningsEnd - e.inningsStart) * 3;
    }
    const ipNum = totalOuts / 3;
    const ipFull = Math.floor(ipNum);
    const ipThirds = totalOuts % 3;

    lines.push({
      playerId: pid, playerName: name,
      IP: `${ipFull}.${ipThirds}`, H, R, ER, BB, K, PC,
      ERA: formatEra(ER, ipNum), WHIP: formatWhip(BB, H, ipNum),
    });
  }

  return lines.sort((a, b) => parseFloat(a.ERA) - parseFloat(b.ERA));
}

/** Get batting lines for a single game (for box score) */
export function getGameBattingLines(game: Game): BattingLine[] {
  const playerMap = new Map<string, string>();
  for (const ab of game.atBats || []) {
    if (!ab.isTopHalf) playerMap.set(ab.playerId, ab.playerName);
  }

  const lines: BattingLine[] = [];
  for (const [pid, name] of playerMap) {
    lines.push(computePlayerBatting(pid, name, [game]));
  }
  return lines;
}

/** Get per-game batting line for a specific player (game log) */
export type GameLogEntry = {
  gameId: string;
  date: string;
  opponent: string;
  result: string;
  AB: number;
  H: number;
  HR: number;
  RBI: number;
  BB: number;
  K: number;
  AVG: string;
};

export function getPlayerGameLog(playerId: string, teamId: string, games: Game[]): GameLogEntry[] {
  const log: GameLogEntry[] = [];

  for (const game of games) {
    if (game.teamId !== teamId) continue;
    if (game.status !== "final" && game.status !== "live") continue;

    const playerABs = (game.atBats || []).filter((ab) => ab.playerId === playerId && !ab.isTopHalf);
    if (playerABs.length === 0) continue;

    let AB = 0, H = 0, HR = 0, RBI = 0, BB = 0, K = 0;
    for (const ab of playerABs) {
      if (isAtBat(ab.result)) AB++;
      if (isHit(ab.result)) H++;
      if (ab.result === "HR") HR++;
      if (ab.result === "BB") BB++;
      if (ab.result === "K" || ab.result === "KL") K++;
      RBI += ab.rbis || 0;
    }

    const ls = game.linescore;
    const gameResult = ls.homeRuns > ls.awayRuns ? "W" : ls.homeRuns < ls.awayRuns ? "L" : "T";
    const score = `${ls.awayRuns}-${ls.homeRuns}`;

    log.push({
      gameId: game.id,
      date: game.date,
      opponent: game.opponent,
      result: `${gameResult} ${score}`,
      AB, H, HR, RBI, BB, K,
      AVG: formatAvg(H, AB),
    });
  }

  return log.reverse(); // Most recent first
}
