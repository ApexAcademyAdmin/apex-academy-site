"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ALL_TEAMS } from "@/lib/team-data";
import {
  getGame, recordPlay, undoLastPlay, manualAdvanceInning, manualSetOuts, manualSetBases,
  endGame, isCoachSession, setHomeLineup, setOpponentLineup, substituteHome,
  getCurrentBatter, getUpNext,
  hasTeamPassword, setTeamPassword, verifyTeamPassword, createCoachSession,
  type PlayOverride,
} from "@/lib/game-store";
import type { Game, AtBatResult, LineupPlayer, OpponentPlayer, BaseRunners } from "@/lib/scoring-types";
import { resultLabel, resultCategory } from "@/lib/scoring-utils";
import { uid } from "@/lib/scoring-utils";
import { Linescore } from "@/components/scoring/Linescore";
import { POSITIONS } from "@/lib/scoring-types";

const BATTING_RESULTS: { result: AtBatResult; label: string }[] = [
  { result: "1B", label: "1B" }, { result: "2B", label: "2B" }, { result: "3B", label: "3B" }, { result: "HR", label: "HR" },
  { result: "BB", label: "BB" }, { result: "HBP", label: "HBP" },
  { result: "K", label: "K" }, { result: "KL", label: "KL" },
  { result: "GO", label: "GO" }, { result: "FO", label: "FO" }, { result: "LO", label: "LO" }, { result: "PO", label: "PO" },
  { result: "FC", label: "FC" }, { result: "SAC", label: "SAC" }, { result: "SF", label: "SF" },
  { result: "E", label: "E" }, { result: "DP", label: "DP" }, { result: "TP", label: "TP" },
];

const RUNNING_EVENTS: { result: AtBatResult; label: string }[] = [
  { result: "SB", label: "Stolen Base" }, { result: "CS", label: "Caught Stealing" }, { result: "PO_RUNNER", label: "Picked Off" },
  { result: "WP", label: "Wild Pitch" }, { result: "PB", label: "Passed Ball" }, { result: "BK", label: "Balk" },
];

export default function ScoringPage() {
  const pathname = usePathname();
  const teamId = pathname.split("/")[2];
  const gameId = pathname.split("/")[4];
  const team = ALL_TEAMS[teamId];

  const [game, setGame] = useState<Game | null>(null);
  const [showLineup, setShowLineup] = useState(false);
  const [showOppLineup, setShowOppLineup] = useState(false);
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [showManual, setShowManual] = useState(false);

  // Runner advancement prompt after a hit/play
  const [pendingResult, setPendingResult] = useState<AtBatResult | null>(null);
  // Runner selection for SB/CS/PO/WP/PB/BK
  const [pendingRunning, setPendingRunning] = useState<AtBatResult | null>(null);

  const [authChecked, setAuthChecked] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  function refresh() { const g = getGame(teamId, gameId); if (g) setGame(g); }

  useEffect(() => {
    const hasSession = isCoachSession(teamId);
    setAuthorized(hasSession);
    setAuthChecked(true);
    if (hasSession) {
      const g = getGame(teamId, gameId);
      if (g) setGame(g);
    }
  }, [teamId, gameId]);

  if (!authChecked) return null;

  if (authChecked && !authorized) {
    return (
      <div className="max-w-[1120px] mx-auto px-6 pt-32 pb-20 text-center">
        <h2 className="text-2xl font-bold uppercase mb-4">Coach Access Required</h2>
        <p className="text-sm text-white/40 mb-6">Log in to access the scoring interface.</p>
        <CoachLoginInline teamId={teamId} onSuccess={() => { setAuthorized(true); const g = getGame(teamId, gameId); if (g) setGame(g); }} />
        <a href={`/teams/${teamId}/game/${gameId}`} className="block mt-6 text-xs text-white/25 no-underline hover:text-white/40">Back to game view</a>
      </div>
    );
  }

  if (!team || !game) return null;
  if (game.status === "final") {
    return (
      <div className="max-w-[1120px] mx-auto px-6 pt-32 pb-20 text-center">
        <h2 className="text-2xl font-bold uppercase mb-4">Game Final</h2>
        <a href={`/teams/${teamId}/game/${gameId}`} className="text-[#17FC13] text-xs font-bold uppercase no-underline">View Box Score</a>
      </div>
    );
  }

  const ls = game.linescore;
  const isHome = !ls.isTopHalf;
  const batter = getCurrentBatter(game);
  const { onDeck, inHole } = getUpNext(game);
  const bases = game.baseRunners;
  const needsLineup = isHome ? game.homeLineup.length === 0 : game.opponentLineup.length === 0;
  const recentPlays = [...game.atBats].reverse().slice(0, 8);
  const canUndo = game.undoStack.length > 0;

  const hasRunners = bases.first || bases.second || bases.third;
  const isRunningEvent = (r: AtBatResult) => ["SB", "CS", "PO_RUNNER", "WP", "PB", "BK"].includes(r);
  const isBallInPlay = (r: AtBatResult) => ["1B", "2B", "3B", "E", "ROE", "FC", "GO", "FO", "LO", "SAC", "SF", "DP"].includes(r);

  function handlePlay(result: AtBatResult) {
    // HR — auto clear, no prompt needed
    if (result === "HR") { recordPlay(teamId, gameId, result); refresh(); return; }
    // BB/HBP — forced advancement is automatic, no prompt needed
    if (result === "BB" || result === "HBP") { recordPlay(teamId, gameId, result); refresh(); return; }
    // K/KL/PO/TP — no runners move by default
    if (result === "K" || result === "KL" || result === "TP" || result === "PO") { recordPlay(teamId, gameId, result); refresh(); return; }
    // Running events — need to select which runner
    if (isRunningEvent(result)) {
      if (hasRunners) { setPendingRunning(result); } else { recordPlay(teamId, gameId, result); refresh(); }
      return;
    }
    // Ball in play with runners on — show advancement prompt
    if (isBallInPlay(result) && hasRunners) {
      setPendingResult(result);
      return;
    }
    // No runners or simple out — just record
    recordPlay(teamId, gameId, result);
    refresh();
  }

  function handleUndo() {
    undoLastPlay(teamId, gameId);
    refresh();
  }

  return (
    <div className="min-h-screen pb-24">
      {/* ── TOP BAR ── */}
      <div className="border-b border-[#171717] bg-radial">
        <div className="max-w-[1120px] mx-auto px-4 py-2.5 flex items-center justify-between gap-2 flex-wrap">
          <a href={`/teams/${teamId}/game/${gameId}`} className="text-[10px] text-white/25 no-underline hover:text-white/50">&larr; Live View</a>
          <div className="text-[11px] font-bold uppercase tracking-wider">
            <span className="text-[#17FC13]">{team.name}</span> <span className="text-white/15">vs</span> {game.opponent}
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setShowLineup(true)} className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider border border-[#171717] text-white/30 cursor-pointer bg-transparent hover:text-white/50">Our Lineup</button>
            <button onClick={() => setShowOppLineup(true)} className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider border border-[#171717] text-white/30 cursor-pointer bg-transparent hover:text-white/50">Opponent Lineup</button>
            <button onClick={() => setShowManual(true)} className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider border border-[#171717] text-white/30 cursor-pointer bg-transparent hover:text-white/50">Edit</button>
            <button onClick={() => setShowEndConfirm(true)} className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider border border-red-500/20 text-red-400/40 cursor-pointer bg-transparent hover:text-red-400">End</button>
          </div>
        </div>
      </div>

      <div className="max-w-[1120px] mx-auto px-4 pt-4 space-y-4">
        {/* ── SCORE + INNING ── */}
        <div className="grid grid-cols-3 gap-3">
          <div className="border border-[#171717] p-4 text-center">
            <div className="text-[9px] font-bold uppercase tracking-wider text-white/20 mb-1">{game.opponent}</div>
            <div className="text-3xl font-bold leading-none">{ls.awayRuns}</div>
          </div>
          <div className="border border-[#171717] p-4 text-center">
            <div className="text-[9px] font-bold uppercase tracking-wider text-white/20 mb-1">{ls.isTopHalf ? "Top" : "Bot"} {ls.currentInning}</div>
            <div className="flex items-center justify-center gap-2 mt-1">
              {[0, 1, 2].map((o) => (
                <div key={o} className={`w-4 h-4 rounded-full border-2 transition-colors ${o < ls.outs ? "bg-[#17FC13] border-[#17FC13]" : "border-[#404040]"}`} />
              ))}
            </div>
          </div>
          <div className="border border-[#17FC13]/20 p-4 text-center">
            <div className="text-[9px] font-bold uppercase tracking-wider text-[#17FC13]/40 mb-1">{team.name}</div>
            <div className="text-3xl font-bold leading-none text-[#17FC13]">{ls.homeRuns}</div>
          </div>
        </div>

        {/* ── BASES + BATTER INFO ── */}
        <div className="grid grid-cols-2 gap-3">
          {/* Diamond */}
          <div className="border border-[#171717] p-4 flex items-center justify-center">
            <div className="relative w-24 h-24">
              <div className={`absolute top-1 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45 border-2 transition-colors ${bases.second ? "bg-[#17FC13] border-[#17FC13]" : "border-[#404040]"}`} />
              <div className={`absolute top-1/2 left-1 -translate-y-1/2 w-6 h-6 rotate-45 border-2 transition-colors ${bases.third ? "bg-[#17FC13] border-[#17FC13]" : "border-[#404040]"}`} />
              <div className={`absolute top-1/2 right-1 -translate-y-1/2 w-6 h-6 rotate-45 border-2 transition-colors ${bases.first ? "bg-[#17FC13] border-[#17FC13]" : "border-[#404040]"}`} />
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 rotate-45 border-2 border-white/15" />
            </div>
          </div>

          {/* Current batter + up next */}
          <div className="border border-[#171717] p-4">
            {batter ? (
              <>
                <div className="text-[9px] font-bold uppercase tracking-wider text-[#17FC13]/40 mb-1">{isHome ? "Apex" : game.opponent} Batting</div>
                <div className="text-sm font-bold uppercase mb-3">{batter.name} <span className="text-white/25">— {batter.pos}</span></div>
                {onDeck && <div className="text-[10px] text-white/25"><span className="text-white/15 mr-1">On Deck:</span> {onDeck}</div>}
                {inHole && <div className="text-[10px] text-white/20"><span className="text-white/10 mr-1">In Hole:</span> {inHole}</div>}
              </>
            ) : (
              <div className="text-sm text-white/25">
                {needsLineup ? "Set lineup to start" : "No active batters"}
              </div>
            )}
          </div>
        </div>

        {/* Lineup prompt */}
        {needsLineup && (
          <button
            onClick={() => isHome ? setShowLineup(true) : setShowOppLineup(true)}
            className="w-full py-4 border border-[#17FC13]/30 bg-[#17FC13]/[0.03] text-[#17FC13] text-xs font-bold uppercase tracking-wider cursor-pointer transition-all hover:bg-[#17FC13]/[0.06]"
          >
            Set {isHome ? team.name : game.opponent} Lineup
          </button>
        )}

        {/* ── RESULT BUTTONS ── */}
        {batter && (
          <>
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/20 mb-2">At-Bat Result</div>
              <div className="grid grid-cols-6 gap-1.5">
                {BATTING_RESULTS.map((r) => {
                  const cat = resultCategory(r.result);
                  return (
                    <button
                      key={r.result}
                      onClick={() => handlePlay(r.result)}
                      className={`py-3 text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-all border ${
                        cat === "hit" ? "border-[#17FC13]/25 text-[#17FC13]/70 hover:bg-[#17FC13]/[0.08] hover:border-[#17FC13]/50"
                        : cat === "onbase" ? "border-white/10 text-white/50 hover:bg-white/[0.04] hover:border-white/20"
                        : cat === "error" ? "border-red-500/15 text-red-400/50 hover:bg-red-500/[0.04] hover:border-red-500/30"
                        : "border-[#171717] text-white/30 hover:bg-white/[0.02] hover:border-white/10"
                      }`}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/20 mb-2">Running Events</div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                {RUNNING_EVENTS.map((r) => (
                  <button
                    key={r.result}
                    onClick={() => handlePlay(r.result)}
                    className="py-2.5 text-[10px] font-bold uppercase tracking-wider cursor-pointer border border-[#171717] text-white/25 hover:bg-white/[0.02] hover:border-white/10 transition-all"
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── UNDO + ADVANCE ── */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleUndo}
            disabled={!canUndo}
            className="py-3 border border-yellow-500/20 text-yellow-400/50 text-xs font-bold uppercase tracking-wider cursor-pointer bg-transparent hover:text-yellow-400 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >
            Undo Last Play
          </button>
          <button
            onClick={() => { manualAdvanceInning(teamId, gameId); refresh(); }}
            className="py-3 border border-[#171717] text-white/30 text-xs font-bold uppercase tracking-wider cursor-pointer bg-transparent hover:text-white/50 transition-colors"
          >
            Force Next Inning
          </button>
        </div>

        {/* ── LINESCORE ── */}
        <Linescore linescore={ls} teamName={team.name} opponent={game.opponent} />

        {/* ── PLAY LOG ── */}
        {recentPlays.length > 0 && (
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/15 mb-2">Play Log</div>
            <div className="border border-[#171717] divide-y divide-[#171717]">
              {recentPlays.map((ab) => (
                <div key={ab.id} className="px-4 py-2.5 flex items-center gap-3 text-[13px]">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-white/12 w-10 shrink-0">{ab.isTopHalf ? "T" : "B"}{ab.inning}</span>
                  <span className="text-white/50">
                    <span className="font-bold text-white/70">{ab.playerName}</span>{" "}
                    {resultLabel(ab.result).toLowerCase()}
                    {ab.rbis > 0 && <span className="text-[#17FC13]"> ({ab.rbis} RBI)</span>}
                    {ab.runnersAdvanced?.length > 0 && <span className="text-white/25"> — {ab.runnersAdvanced.join(", ")} scored</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── RUNNER ADVANCEMENT PROMPT ── */}
      {pendingResult && game && (
        <RunnerAdvancementModal
          result={pendingResult}
          bases={bases}
          batterName={batter?.name || "Batter"}
          isHome={isHome}
          onConfirm={(newBases, runsScored, scoredNames) => {
            recordPlay(teamId, gameId, pendingResult, undefined, {
              runs: runsScored,
              rbis: runsScored,
              runnersScored: scoredNames,
              newBases,
            });
            setPendingResult(null);
            refresh();
          }}
          onCancel={() => setPendingResult(null)}
        />
      )}

      {/* ── RUNNER SELECT FOR RUNNING EVENTS ── */}
      {pendingRunning && game && (
        <RunnerSelectModal
          event={pendingRunning}
          bases={bases}
          onConfirm={(runnerBase, outcome) => {
            const newBases = { ...bases };
            const runner = runnerBase === "first" ? bases.first : runnerBase === "second" ? bases.second : bases.third;
            let runs = 0;
            const scoredNames: string[] = [];

            if (outcome === "advance") {
              if (runnerBase === "third") { runs = 1; if (runner) scoredNames.push(runner); newBases.third = null; }
              else if (runnerBase === "second") { newBases.third = runner; newBases.second = null; }
              else if (runnerBase === "first") { newBases.second = runner; newBases.first = null; }
            } else {
              if (runnerBase === "first") newBases.first = null;
              else if (runnerBase === "second") newBases.second = null;
              else if (runnerBase === "third") newBases.third = null;
            }

            recordPlay(teamId, gameId, pendingRunning!, undefined, {
              runs,
              rbis: runs,
              runnersScored: scoredNames,
              newBases,
            });
            setPendingRunning(null);
            refresh();
          }}
          onCancel={() => setPendingRunning(null)}
        />
      )}

      {/* ── MODALS ── */}
      {showLineup && <LineupModal title="Our Lineup" players={team.roster.map((p) => ({ id: p.number, name: p.name, pos: p.pos }))} existing={game.homeLineup} game={game} teamId={teamId} gameId={gameId} onSave={(l) => { const lp: LineupPlayer[] = l.map((p, i) => ({ playerId: p.id, playerName: p.name, pos: p.pos, battingOrder: i + 1, active: true })); setHomeLineup(teamId, gameId, lp); refresh(); setShowLineup(false); }} onCancel={() => setShowLineup(false)} />}
      {showOppLineup && <OpponentLineupModal opponent={game.opponent} existing={game.opponentLineup} game={game} teamId={teamId} gameId={gameId} onSave={(l) => { setOpponentLineup(teamId, gameId, l); refresh(); setShowOppLineup(false); }} onCancel={() => setShowOppLineup(false)} />}
      {showManual && <ManualModal game={game} team={team} teamId={teamId} gameId={gameId} onDone={() => { refresh(); setShowManual(false); }} onCancel={() => setShowManual(false)} />}
      {showEndConfirm && (
        <Modal onClose={() => setShowEndConfirm(false)}>
          <h3 className="text-xl font-bold uppercase mb-3">End Game?</h3>
          <p className="text-sm text-white/40 mb-6">{game.opponent} {ls.awayRuns} — {team.name} {ls.homeRuns}</p>
          <div className="flex gap-3">
            <button onClick={() => { endGame(teamId, gameId); window.location.href = `/teams/${teamId}/game/${gameId}`; }} className="flex-1 py-3 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider cursor-pointer bg-transparent hover:bg-red-500/[0.06]">End Game</button>
            <button onClick={() => setShowEndConfirm(false)} className="flex-1 py-3 border border-[#171717] text-white/40 text-xs font-bold uppercase tracking-wider cursor-pointer bg-transparent">Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ═══ SHARED MODAL WRAPPER ═══ */
function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-md border border-[#171717] bg-black p-6 my-8" onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

/* ═══ LINEUP MODAL ═══ */
function LineupModal({ title, players, existing, game, teamId, gameId, onSave, onCancel }: {
  title: string;
  players: { id: string; name: string; pos: string }[];
  existing: LineupPlayer[];
  game: Game;
  teamId: string;
  gameId: string;
  onSave: (l: { id: string; name: string; pos: string }[]) => void;
  onCancel: () => void;
}) {
  const isLive = game.status === "live";
  const [selected, setSelected] = useState(existing.filter((p) => p.active).map((p) => ({ id: p.playerId, name: p.playerName, pos: p.pos })));
  const [subbing, setSubbing] = useState<string | null>(null); // id of player being subbed out

  function toggle(p: { id: string; name: string; pos: string }) {
    if (subbing) {
      // This is a substitution — swap the player in the same batting order slot
      setSelected(selected.map((s) => s.id === subbing ? p : s));
      // Persist immediately if game is live
      if (isLive) {
        const outPlayer = existing.find((e) => e.playerId === subbing && e.active);
        if (outPlayer) {
          substituteHome(teamId, gameId, subbing, { playerId: p.id, playerName: p.name, pos: p.pos, battingOrder: outPlayer.battingOrder, active: true });
        }
      }
      setSubbing(null);
    } else if (selected.find((s) => s.id === p.id)) {
      setSelected(selected.filter((s) => s.id !== p.id));
    } else {
      setSelected([...selected, p]);
    }
  }

  function moveUp(i: number) { if (i === 0) return; const a = [...selected]; [a[i - 1], a[i]] = [a[i], a[i - 1]]; setSelected(a); }

  const bench = players.filter((p) => !selected.find((s) => s.id === p.id));

  return (
    <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={onCancel}>
      <div className="w-full max-w-lg border border-[#171717] bg-black my-8 max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-[#171717]">
          <h2 className="text-lg uppercase font-bold mb-1">{title}</h2>
          <p className="text-[10px] text-white/25">
            {subbing ? "Select a player from the bench to substitute in" : "Tap to add/remove. Arrow to reorder. Swap icon to substitute."}
          </p>
        </div>

        <div className="px-6 py-5">
          {/* Active Lineup */}
          {selected.length > 0 && (
            <div className="mb-6">
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/40 mb-2">
                Active Lineup — Batting Order
              </div>
              {selected.map((p, i) => (
                <div key={p.id} className={`flex items-center gap-2 px-3 py-2.5 mb-1 border ${subbing === p.id ? "border-yellow-400/30 bg-yellow-400/[0.04]" : "border-[#17FC13]/15 bg-[#17FC13]/[0.02]"}`}>
                  {!isLive && <button onClick={() => moveUp(i)} className="text-white/15 hover:text-white/40 cursor-pointer bg-transparent border-none text-sm leading-none">&#9650;</button>}
                  <span className="text-[10px] font-bold text-[#17FC13] w-4">{i + 1}</span>
                  <span className="text-sm font-bold uppercase flex-1">{p.name}</span>
                  <span className="text-[10px] text-white/25">{p.pos}</span>
                  {/* Substitute button (swap icon) — only during live games */}
                  {isLive && bench.length > 0 && (
                    <button
                      onClick={() => setSubbing(subbing === p.id ? null : p.id)}
                      title="Substitute"
                      className={`text-[10px] px-2 py-1 border cursor-pointer bg-transparent transition-colors ${subbing === p.id ? "border-yellow-400/40 text-yellow-400" : "border-[#171717] text-white/20 hover:text-yellow-400/60 hover:border-yellow-400/20"}`}
                    >
                      SUB
                    </button>
                  )}
                  {/* Remove — only pre-game */}
                  {!isLive && (
                    <button onClick={() => toggle(p)} className="text-white/15 hover:text-red-400 cursor-pointer bg-transparent border-none text-sm leading-none">&#10005;</button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Bench / Available */}
          {bench.length > 0 && (
            <div className="mb-5">
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/15 mb-2">
                {subbing ? "Select Replacement" : "Bench / Available"}
              </div>
              <div className="space-y-1">
                {bench.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => toggle(p)}
                    className={`w-full flex items-center gap-3 border px-3 py-2.5 cursor-pointer bg-transparent text-left transition-colors ${
                      subbing ? "border-yellow-400/15 hover:border-yellow-400/30 hover:bg-yellow-400/[0.03]" : "border-[#171717] hover:border-white/10"
                    }`}
                  >
                    <span className="text-sm font-bold uppercase flex-1 text-white/50">{p.name}</span>
                    <span className="text-[10px] text-white/20">{p.pos}</span>
                    {subbing && <span className="text-[9px] text-yellow-400/50 font-bold uppercase">Sub In</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {subbing && (
            <button onClick={() => setSubbing(null)} className="w-full py-2 border border-[#171717] text-white/25 text-[10px] font-bold uppercase tracking-wider cursor-pointer bg-transparent hover:text-white/40 mb-4">
              Cancel Substitution
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#171717] flex gap-3">
          {!subbing && (
            <button onClick={() => onSave(selected)} disabled={selected.length === 0} className="flex-1 py-3 border border-[#17FC13]/50 bg-[#17FC13]/[0.06] text-[#17FC13] text-xs font-bold uppercase tracking-wider cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed">
              Save Lineup ({selected.length})
            </button>
          )}
          <button onClick={onCancel} className="px-6 py-3 border border-[#171717] text-white/40 text-xs font-bold uppercase tracking-wider cursor-pointer bg-transparent">
            {subbing ? "Close" : "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══ OPPONENT LINEUP MODAL ═══ */
function OpponentLineupModal({ opponent, existing, game, teamId, gameId, onSave, onCancel }: {
  opponent: string; existing: OpponentPlayer[]; game: Game; teamId: string; gameId: string;
  onSave: (l: OpponentPlayer[]) => void; onCancel: () => void;
}) {
  const isLive = game.status === "live";
  const hasLineup = existing.filter((p) => p.name).length > 0;

  // Entry mode — building the initial lineup
  const [entryPlayers, setEntryPlayers] = useState<OpponentPlayer[]>(
    existing.length > 0 ? existing : Array.from({ length: 9 }, (_, i) => ({ id: uid(), name: "", number: "", pos: "", battingOrder: i + 1, active: true }))
  );
  function upd(i: number, f: keyof OpponentPlayer, v: string) { const a = [...entryPlayers]; a[i] = { ...a[i], [f]: v }; setEntryPlayers(a); }

  // Sub mode
  const [subbing, setSubbing] = useState<string | null>(null); // id of player being replaced
  const [subName, setSubName] = useState("");
  const [subNumber, setSubNumber] = useState("");
  const [subPos, setSubPos] = useState("");

  function doSub() {
    if (!subbing || !subName) return;
    const updated = entryPlayers.map((p) => p.id === subbing ? { ...p, active: false } : p);
    const outPlayer = entryPlayers.find((p) => p.id === subbing);
    updated.push({ id: uid(), name: subName, number: subNumber, pos: subPos || outPlayer?.pos || "", battingOrder: outPlayer?.battingOrder || updated.length, active: true });
    setEntryPlayers(updated);
    onSave(updated.filter((p) => p.name));
    setSubbing(null);
    setSubName("");
    setSubNumber("");
    setSubPos("");
  }

  const activePlayers = entryPlayers.filter((p) => p.active && p.name).sort((a, b) => a.battingOrder - b.battingOrder);
  const subbedOut = entryPlayers.filter((p) => !p.active && p.name);

  return (
    <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={onCancel}>
      <div className="w-full max-w-lg border border-[#171717] bg-black my-8 max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 pt-6 pb-4 border-b border-[#171717]">
          <h2 className="text-lg uppercase font-bold mb-1">Opponent Lineup</h2>
          <p className="text-[10px] text-white/25">{opponent} — {hasLineup && isLive ? "manage lineup and substitutions" : "enter in batting order"}</p>
        </div>

        <div className="px-6 py-5">
          {/* If lineup exists and game is live — show active roster with sub buttons */}
          {hasLineup && isLive ? (
            <>
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/40 mb-3">Active Lineup — Batting Order</div>
              <div className="space-y-1 mb-5">
                {activePlayers.map((p, i) => (
                  <div key={p.id} className={`flex items-center gap-2 px-3 py-2.5 border ${subbing === p.id ? "border-yellow-400/30 bg-yellow-400/[0.04]" : "border-[#17FC13]/15 bg-[#17FC13]/[0.02]"}`}>
                    <span className="text-[10px] font-bold text-[#17FC13] w-4">{i + 1}</span>
                    <span className="text-[10px] text-white/25 w-6 text-center">{p.number}</span>
                    <span className="text-sm font-bold uppercase flex-1">{p.name}</span>
                    <span className="text-[10px] text-white/25">{p.pos}</span>
                    <button
                      onClick={() => setSubbing(subbing === p.id ? null : p.id)}
                      className={`text-[10px] px-2 py-1 border cursor-pointer bg-transparent transition-colors ${subbing === p.id ? "border-yellow-400/40 text-yellow-400" : "border-[#171717] text-white/20 hover:text-yellow-400/60 hover:border-yellow-400/20"}`}
                    >
                      SUB
                    </button>
                  </div>
                ))}
              </div>

              {/* Sub entry form */}
              {subbing && (
                <div className="border border-yellow-400/20 bg-yellow-400/[0.02] p-4 mb-5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-yellow-400/60 mb-3">
                    Replacing: {entryPlayers.find((p) => p.id === subbing)?.name}
                  </div>
                  <div className="grid grid-cols-12 gap-1.5 mb-3">
                    <input value={subNumber} onChange={(e) => setSubNumber(e.target.value)} placeholder="#" className="col-span-2 bg-transparent border border-[#171717] px-2 py-2 text-xs text-white placeholder-white/10 focus:border-yellow-400/40 focus:outline-none text-center" />
                    <input value={subName} onChange={(e) => setSubName(e.target.value)} placeholder="New player name" className="col-span-7 bg-transparent border border-[#171717] px-3 py-2 text-xs text-white placeholder-white/10 focus:border-yellow-400/40 focus:outline-none" autoFocus />
                    <select value={subPos} onChange={(e) => setSubPos(e.target.value)} className="col-span-3 bg-black border border-[#171717] px-1 py-2 text-xs text-white focus:border-yellow-400/40 focus:outline-none cursor-pointer appearance-none">
                      <option value="">Pos</option>
                      {POSITIONS.map((pos) => <option key={pos} value={pos}>{pos}</option>)}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={doSub} disabled={!subName} className="flex-1 py-2 border border-yellow-400/40 text-yellow-400 text-[10px] font-bold uppercase tracking-wider cursor-pointer bg-transparent hover:bg-yellow-400/[0.04] disabled:opacity-20 disabled:cursor-not-allowed">Confirm Sub</button>
                    <button onClick={() => { setSubbing(null); setSubName(""); setSubNumber(""); setSubPos(""); }} className="px-4 py-2 border border-[#171717] text-white/30 text-[10px] font-bold uppercase tracking-wider cursor-pointer bg-transparent">Cancel</button>
                  </div>
                </div>
              )}

              {/* Subbed out players */}
              {subbedOut.length > 0 && (
                <div className="mb-4">
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/12 mb-2">Removed</div>
                  {subbedOut.map((p) => (
                    <div key={p.id} className="flex items-center gap-2 px-3 py-1.5 text-white/15">
                      <span className="text-[10px] w-6 text-center">{p.number}</span>
                      <span className="text-xs uppercase flex-1 line-through">{p.name}</span>
                      <span className="text-[10px]">{p.pos}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            /* Entry mode — building initial lineup */
            <>
              <div className="space-y-1.5 mb-4">
                {entryPlayers.map((p, i) => (
                  <div key={p.id} className="grid grid-cols-12 gap-1.5 items-center">
                    <span className="col-span-1 text-[10px] font-bold text-white/15 text-center">{i + 1}</span>
                    <input value={p.number} onChange={(e) => upd(i, "number", e.target.value)} placeholder="#" className="col-span-2 bg-transparent border border-[#171717] px-2 py-2 text-xs text-white placeholder-white/10 focus:border-[#17FC13]/40 focus:outline-none text-center" />
                    <input value={p.name} onChange={(e) => upd(i, "name", e.target.value)} placeholder="Name" className="col-span-6 bg-transparent border border-[#171717] px-3 py-2 text-xs text-white placeholder-white/10 focus:border-[#17FC13]/40 focus:outline-none" />
                    <select value={p.pos} onChange={(e) => upd(i, "pos", e.target.value)} className="col-span-3 bg-black border border-[#171717] px-1 py-2 text-xs text-white focus:border-[#17FC13]/40 focus:outline-none cursor-pointer appearance-none">
                      <option value="">Pos</option>
                      {POSITIONS.map((pos) => <option key={pos} value={pos}>{pos}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <button onClick={() => setEntryPlayers([...entryPlayers, { id: uid(), name: "", number: "", pos: "", battingOrder: entryPlayers.length + 1, active: true }])} className="w-full py-2 border border-[#171717] text-white/20 text-[10px] font-bold uppercase tracking-wider cursor-pointer bg-transparent hover:text-white/35 mb-4">+ Add Player</button>
            </>
          )}
        </div>

        <div className="px-6 py-4 border-t border-[#171717] flex gap-3">
          {!subbing && (
            <button onClick={() => onSave(entryPlayers.filter((p) => p.name))} className="flex-1 py-3 border border-[#17FC13]/50 bg-[#17FC13]/[0.06] text-[#17FC13] text-xs font-bold uppercase tracking-wider cursor-pointer">
              Save Lineup
            </button>
          )}
          <button onClick={onCancel} className="px-6 py-3 border border-[#171717] text-white/40 text-xs font-bold uppercase tracking-wider cursor-pointer bg-transparent">
            {subbing ? "Close" : "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══ MANUAL ADJUSTMENTS MODAL ═══ */
function ManualModal({ game, team, teamId, gameId, onDone, onCancel }: { game: Game; team: any; teamId: string; gameId: string; onDone: () => void; onCancel: () => void }) {
  const [outs, setOuts] = useState(game.linescore.outs);
  const [first, setFirst] = useState(game.baseRunners.first || "");
  const [second, setSecond] = useState(game.baseRunners.second || "");
  const [third, setThird] = useState(game.baseRunners.third || "");

  function save() {
    manualSetOuts(teamId, gameId, outs);
    manualSetBases(teamId, gameId, { first: first || null, second: second || null, third: third || null });
    onDone();
  }

  return (
    <Modal onClose={onCancel}>
      <h2 className="text-lg uppercase font-bold mb-4">Manual Adjustments</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-2">Outs</label>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((o) => (
              <button key={o} onClick={() => setOuts(o)} className={`flex-1 py-2.5 border text-xs font-bold cursor-pointer ${outs === o ? "border-[#17FC13]/50 text-[#17FC13] bg-[#17FC13]/[0.06]" : "border-[#171717] text-white/30"}`}>{o}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-2">1st Base</label>
          <input value={first} onChange={(e) => setFirst(e.target.value)} placeholder="Empty" className="w-full bg-transparent border border-[#171717] px-4 py-2.5 text-sm text-white placeholder-white/10 focus:border-[#17FC13]/40 focus:outline-none" />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-2">2nd Base</label>
          <input value={second} onChange={(e) => setSecond(e.target.value)} placeholder="Empty" className="w-full bg-transparent border border-[#171717] px-4 py-2.5 text-sm text-white placeholder-white/10 focus:border-[#17FC13]/40 focus:outline-none" />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-2">3rd Base</label>
          <input value={third} onChange={(e) => setThird(e.target.value)} placeholder="Empty" className="w-full bg-transparent border border-[#171717] px-4 py-2.5 text-sm text-white placeholder-white/10 focus:border-[#17FC13]/40 focus:outline-none" />
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button onClick={save} className="flex-1 py-3 border border-[#17FC13]/50 bg-[#17FC13]/[0.06] text-[#17FC13] text-xs font-bold uppercase tracking-wider cursor-pointer">Save</button>
        <button onClick={onCancel} className="px-6 py-3 border border-[#171717] text-white/40 text-xs font-bold uppercase tracking-wider cursor-pointer bg-transparent">Cancel</button>
      </div>
    </Modal>
  );
}

/* ═══ RUNNER ADVANCEMENT MODAL ═══ */
function RunnerAdvancementModal({ result, bases, batterName, isHome, onConfirm, onCancel }: {
  result: AtBatResult;
  bases: BaseRunners;
  batterName: string;
  isHome: boolean;
  onConfirm: (newBases: BaseRunners, runsScored: number, scoredNames: string[]) => void;
  onCancel: () => void;
}) {
  type RunnerDest = "hold" | "second" | "third" | "score" | "out";
  const [firstDest, setFirstDest] = useState<RunnerDest>(result === "2B" || result === "3B" ? "third" : "second");
  const [secondDest, setSecondDest] = useState<RunnerDest>(result === "2B" || result === "3B" ? "score" : "third");
  const [thirdDest, setThirdDest] = useState<RunnerDest>("score");
  // Where does batter end up
  const batterDests: RunnerDest[] = result === "1B" || result === "E" || result === "ROE" || result === "FC" ? ["first"] as any : result === "2B" ? ["second"] as any : result === "3B" ? ["third"] as any : ["out"] as any;

  function confirm() {
    const newBases: BaseRunners = { first: null, second: null, third: null };
    let runs = 0;
    const scoredNames: string[] = [];

    // Place batter
    if (result === "1B" || result === "E" || result === "ROE" || result === "FC") newBases.first = batterName;
    else if (result === "2B") newBases.second = batterName;
    else if (result === "3B") newBases.third = batterName;

    // Resolve runners
    function placeRunner(name: string, dest: RunnerDest) {
      if (dest === "score") { runs++; scoredNames.push(name); }
      else if (dest === "third") { if (newBases.third && newBases.third !== name) { runs++; scoredNames.push(newBases.third); } newBases.third = name; }
      else if (dest === "second") { if (newBases.second && newBases.second !== name) { runs++; scoredNames.push(newBases.second); } newBases.second = name; }
      else if (dest === "hold") { /* handled below */ }
    }

    // Process from third → first to avoid overwrite issues
    if (bases.third) placeRunner(bases.third, thirdDest);
    if (bases.second) placeRunner(bases.second, secondDest);
    if (bases.first) placeRunner(bases.first, firstDest);

    // Hold = keep where they were
    if (bases.first && firstDest === "hold" && !newBases.first) newBases.first = bases.first;
    if (bases.second && secondDest === "hold" && !newBases.second) newBases.second = bases.second;
    if (bases.third && thirdDest === "hold" && !newBases.third) newBases.third = bases.third;

    onConfirm(newBases, runs, scoredNames);
  }

  const destOptions: { value: RunnerDest; label: string }[] = [
    { value: "hold", label: "Hold" },
    { value: "second", label: "→ 2nd" },
    { value: "third", label: "→ 3rd" },
    { value: "score", label: "Scores" },
    { value: "out", label: "Out" },
  ];

  return (
    <div className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="w-full max-w-sm border border-[#17FC13]/20 bg-black p-6" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-bold uppercase mb-1">Runner Advancement</h3>
        <p className="text-[10px] text-white/30 mb-5">{batterName} — {resultLabel(result)}</p>

        <div className="space-y-4">
          {bases.third && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-white/25 mb-2">
                3rd — <span className="text-white/60">{bases.third}</span>
              </div>
              <div className="flex gap-1.5">
                {destOptions.filter((d) => d.value === "hold" || d.value === "score" || d.value === "out").map((d) => (
                  <button key={d.value} onClick={() => setThirdDest(d.value)}
                    className={`flex-1 py-2.5 text-[10px] font-bold uppercase border cursor-pointer transition-all ${thirdDest === d.value ? "border-[#17FC13]/50 text-[#17FC13] bg-[#17FC13]/[0.06]" : "border-[#171717] text-white/30"}`}>{d.label}</button>
                ))}
              </div>
            </div>
          )}
          {bases.second && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-white/25 mb-2">
                2nd — <span className="text-white/60">{bases.second}</span>
              </div>
              <div className="flex gap-1.5">
                {destOptions.filter((d) => d.value === "hold" || d.value === "third" || d.value === "score" || d.value === "out").map((d) => (
                  <button key={d.value} onClick={() => setSecondDest(d.value)}
                    className={`flex-1 py-2.5 text-[10px] font-bold uppercase border cursor-pointer transition-all ${secondDest === d.value ? "border-[#17FC13]/50 text-[#17FC13] bg-[#17FC13]/[0.06]" : "border-[#171717] text-white/30"}`}>{d.label}</button>
                ))}
              </div>
            </div>
          )}
          {bases.first && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-white/25 mb-2">
                1st — <span className="text-white/60">{bases.first}</span>
              </div>
              <div className="flex gap-1.5">
                {destOptions.filter((d) => d.value !== "score" || true).map((d) => (
                  <button key={d.value} onClick={() => setFirstDest(d.value)}
                    className={`flex-1 py-2.5 text-[10px] font-bold uppercase border cursor-pointer transition-all ${firstDest === d.value ? "border-[#17FC13]/50 text-[#17FC13] bg-[#17FC13]/[0.06]" : "border-[#171717] text-white/30"}`}>{d.label}</button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={confirm} className="flex-1 py-3 border border-[#17FC13]/50 bg-[#17FC13]/[0.06] text-[#17FC13] text-xs font-bold uppercase tracking-wider cursor-pointer">
            Confirm
          </button>
          <button onClick={onCancel} className="px-6 py-3 border border-[#171717] text-white/40 text-xs font-bold uppercase tracking-wider cursor-pointer bg-transparent">Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ═══ RUNNER SELECT MODAL (for SB/CS/WP/PB/BK/PO) ═══ */
function RunnerSelectModal({ event, bases, onConfirm, onCancel }: {
  event: AtBatResult;
  bases: BaseRunners;
  onConfirm: (runnerBase: "first" | "second" | "third", outcome: "advance" | "out") => void;
  onCancel: () => void;
}) {
  const isOutEvent = event === "CS" || event === "PO_RUNNER";
  const label = resultLabel(event);

  const runners: { base: "first" | "second" | "third"; name: string }[] = [];
  if (bases.first) runners.push({ base: "first", name: bases.first });
  if (bases.second) runners.push({ base: "second", name: bases.second });
  if (bases.third) runners.push({ base: "third", name: bases.third });

  return (
    <div className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="w-full max-w-sm border border-[#17FC13]/20 bg-black p-6" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-bold uppercase mb-1">{label}</h3>
        <p className="text-[10px] text-white/30 mb-5">Select which runner</p>

        <div className="space-y-2">
          {runners.map((r) => (
            <button
              key={r.base}
              onClick={() => onConfirm(r.base, isOutEvent ? "out" : "advance")}
              className="w-full flex items-center justify-between px-5 py-4 border border-[#171717] cursor-pointer bg-transparent hover:border-[#17FC13]/30 transition-colors text-left"
            >
              <div>
                <span className="text-sm font-bold uppercase text-white/80">{r.name}</span>
                <span className="text-[10px] text-white/25 ml-2">
                  on {r.base === "first" ? "1st" : r.base === "second" ? "2nd" : "3rd"}
                </span>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isOutEvent ? "text-red-400/50" : "text-[#17FC13]/50"}`}>
                {isOutEvent ? "Out" : r.base === "third" ? "Scores" : r.base === "second" ? "→ 3rd" : "→ 2nd"}
              </span>
            </button>
          ))}
        </div>

        {runners.length === 0 && (
          <p className="text-sm text-white/25 text-center py-4">No runners on base.</p>
        )}

        <button onClick={onCancel} className="w-full mt-4 py-3 border border-[#171717] text-white/30 text-xs font-bold uppercase tracking-wider cursor-pointer bg-transparent">Cancel</button>
      </div>
    </div>
  );
}

/* ═══ INLINE COACH LOGIN (for returning to scoring page) ═══ */
function CoachLoginInline({ teamId, onSuccess }: { teamId: string; onSuccess: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const isSetup = !hasTeamPassword(teamId);

  function submit() {
    if (pw.length < 4) { setError("Minimum 4 characters"); return; }
    if (isSetup) {
      setTeamPassword(teamId, pw);
      createCoachSession(teamId);
      onSuccess();
    } else if (verifyTeamPassword(teamId, pw)) {
      createCoachSession(teamId);
      onSuccess();
    } else {
      setError("Incorrect password");
    }
  }

  return (
    <div className="max-w-xs mx-auto">
      <input
        type="password"
        value={pw}
        onChange={(e) => { setPw(e.target.value); setError(""); }}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder={isSetup ? "Create team password" : "Enter team password"}
        className="w-full bg-transparent border border-[#171717] px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#17FC13]/40 focus:outline-none transition-colors mb-3"
        autoFocus
      />
      {error && <p className="text-xs text-red-400 mb-3">{error}</p>}
      <button
        onClick={submit}
        className="w-full py-3 border border-[#17FC13]/50 bg-[#17FC13]/[0.06] text-[#17FC13] text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-[#17FC13]/[0.1] transition-all"
      >
        {isSetup ? "Set Password & Enter" : "Login"}
      </button>
    </div>
  );
}
