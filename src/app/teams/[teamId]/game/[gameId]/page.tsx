"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ALL_TEAMS } from "@/lib/team-data";
import { getGame, startGame, isCoachSession, getCurrentBatter, getUpNext, setStreamUrl } from "@/lib/game-store";
import { getGameBattingLines } from "@/lib/stat-calculator";
import type { Game, LineupPlayer, OpponentPlayer } from "@/lib/scoring-types";
import { resultLabel } from "@/lib/scoring-utils";
import { Linescore } from "@/components/scoring/Linescore";
import { BattingBoxScore, PitchingBoxScore } from "@/components/scoring/BoxScore";
import { StreamPlayer, StreamSetupModal } from "@/components/scoring/StreamPlayer";
import { Button } from "@/components/Button";

export default function GameViewPage() {
  const pathname = usePathname();
  const teamId = pathname.split("/")[2];
  const gameId = pathname.split("/")[4];
  const team = ALL_TEAMS[teamId];

  const [game, setGame] = useState<Game | null>(null);
  const [isCoach, setIsCoach] = useState(false);
  const [tab, setTab] = useState<"game" | "boxscore" | "plays" | "lineups">("game");
  const [showStreamSetup, setShowStreamSetup] = useState(false);

  useEffect(() => {
    const g = getGame(teamId, gameId);
    if (g) setGame(g);
    setIsCoach(isCoachSession(teamId));

    const interval = setInterval(() => { const u = getGame(teamId, gameId); if (u) setGame(u); }, 2000);
    let bc: BroadcastChannel | null = null;
    try { bc = new BroadcastChannel("apex-scoring"); bc.onmessage = () => { const u = getGame(teamId, gameId); if (u) setGame(u); }; } catch {}
    return () => { clearInterval(interval); bc?.close(); };
  }, [teamId, gameId]);

  if (!team || !game) {
    return <div className="max-w-[1120px] mx-auto px-6 pt-32 pb-20 text-center"><p className="text-white/30">Game not found.</p><Button href={`/teams/${teamId}/schedule`} variant="secondary" size="small">Back to Schedule</Button></div>;
  }

  // Upcoming
  if (game.status === "upcoming") {
    return (
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,_rgba(23,252,19,0.04)_0%,_transparent_60%)]" />
        <div className="relative max-w-[1120px] mx-auto px-6 pt-32 md:pt-40 pb-20 md:pb-28 text-center">
          <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/20 mb-6">Upcoming Game</div>
          <Image src="/logos/a-mark-sm.png" alt="" width={60} height={60} className="mx-auto mb-6 opacity-30" />
          <h2 className="text-3xl md:text-4xl uppercase font-bold mb-3">{team.name} <span className="text-white/20">vs</span> {game.opponent}</h2>
          <p className="text-lg text-white/40 mb-1">{game.date} &middot; {game.time}</p>
          {game.eventName && <p className="text-xs text-[#17FC13]/40 uppercase tracking-wider mb-1">{game.eventName}</p>}
          {game.venue?.name && <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(game.venue.name + ", " + game.venue.address)}`} target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-white/25 hover:text-[#17FC13] transition-colors no-underline mb-10">{game.venue.name} — {game.venue.address}</a>}
          {!game.venue?.name && <div className="mb-10" />}
          {isCoach && <button onClick={() => { startGame(teamId, gameId); window.location.href = `/teams/${teamId}/game/${gameId}/score`; }} className="inline-flex items-center gap-2.5 rounded-full border border-[#17FC13] bg-gradient-to-t from-[#17FC13]/20 to-transparent px-8 py-3 text-sm font-bold uppercase tracking-wide text-white cursor-pointer transition-all hover:shadow-[0_0_20px_rgba(23,252,19,0.15)]">Start Game</button>}
        </div>
      </section>
    );
  }

  const ls = game.linescore;
  const bases = game.baseRunners || { first: null, second: null, third: null };
  const batter = getCurrentBatter(game);
  const upNext = getUpNext(game);
  const battingLines = getGameBattingLines(game);
  const isLive = game.status === "live";
  const isFinal = game.status === "final";
  const allPlays = [...game.atBats];
  const recentPlays = [...allPlays].reverse();

  const TABS = [
    { key: "game" as const, label: "GameDay" },
    { key: "boxscore" as const, label: "Box Score" },
    { key: "plays" as const, label: "Plays" },
    { key: "lineups" as const, label: "Lineups" },
  ];

  return (
    <div className="min-h-screen">
      {/* ══════ STICKY SCOREBOARD ══════ */}
      <div className="sticky top-20 z-20 border-b border-[#171717] bg-black/95 backdrop-blur-sm">
        <div className="max-w-[1120px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Away */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="text-2xl md:text-3xl font-bold leading-none shrink-0">{ls.awayRuns}</div>
              <div className="min-w-0">
                <div className="text-xs font-bold uppercase truncate">{game.opponent}</div>
                <div className="text-[9px] text-white/20 uppercase">Away</div>
              </div>
            </div>

            {/* Center — Inning + Outs + Status */}
            <div className="flex flex-col items-center shrink-0">
              {isLive ? (
                <>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-1.5 h-1.5 bg-[#17FC13] rounded-full animate-pulse" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#17FC13]">{ls.isTopHalf ? "Top" : "Bot"} {ls.currentInning}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[0, 1, 2].map((o) => <div key={o} className={`w-2.5 h-2.5 rounded-full border ${o < ls.outs ? "bg-[#17FC13] border-[#17FC13]" : "border-[#404040]"}`} />)}
                  </div>
                </>
              ) : (
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">Final</span>
              )}
            </div>

            {/* Home */}
            <div className="flex items-center gap-3 min-w-0 flex-row-reverse">
              <div className="text-2xl md:text-3xl font-bold leading-none text-[#17FC13] shrink-0">{ls.homeRuns}</div>
              <div className="min-w-0 text-right">
                <div className="text-xs font-bold uppercase text-[#17FC13] truncate">{team.name}</div>
                <div className="text-[9px] text-[#17FC13]/30 uppercase">Home</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-[1120px] mx-auto px-4 flex items-center gap-0.5 border-t border-[#171717]">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`py-2.5 px-4 text-[10px] font-bold uppercase tracking-wider border-b-2 cursor-pointer bg-transparent transition-all ${tab === t.key ? "text-[#17FC13] border-[#17FC13]" : "text-white/25 border-transparent hover:text-white/40"}`}>
              {t.label}
            </button>
          ))}
          {isLive && isCoach && (
            <div className="ml-auto flex items-center gap-2">
              <button onClick={() => setShowStreamSetup(true)} className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider border border-[#171717] text-white/25 cursor-pointer bg-transparent hover:text-white/50">
                {game.streamUrl ? "Edit Stream" : "Add Stream"}
              </button>
              <a href={`/teams/${teamId}/game/${gameId}/score`} className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider border border-[#17FC13]/30 text-[#17FC13] no-underline hover:bg-[#17FC13]/[0.05]">Score</a>
            </div>
          )}
        </div>
      </div>

      {/* ══════ STREAM ══════ */}
      {game.streamUrl && (tab === "game") && (
        <div className="max-w-[1120px] mx-auto px-4 pt-4">
          <StreamPlayer
            streamUrl={game.streamUrl}
            teamName={team.name}
            opponent={game.opponent}
            isLive={isLive}
          />
        </div>
      )}

      {/* ══════ TAB: GAMEDAY ══════ */}
      {tab === "game" && (
        <div className="max-w-[1120px] mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

            {/* Left Column — Diamond + Matchup */}
            <div className="lg:col-span-5 space-y-4">
              {/* Diamond */}
              <div className="border border-[#171717] bg-radial p-6">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <div className={`absolute top-1 left-1/2 -translate-x-1/2 w-7 h-7 rotate-45 border-2 transition-all duration-300 ${bases.second ? "bg-[#17FC13] border-[#17FC13] shadow-[0_0_12px_rgba(23,252,19,0.4)]" : "border-[#404040]"}`} />
                  <div className={`absolute top-1/2 left-1 -translate-y-1/2 w-7 h-7 rotate-45 border-2 transition-all duration-300 ${bases.third ? "bg-[#17FC13] border-[#17FC13] shadow-[0_0_12px_rgba(23,252,19,0.4)]" : "border-[#404040]"}`} />
                  <div className={`absolute top-1/2 right-1 -translate-y-1/2 w-7 h-7 rotate-45 border-2 transition-all duration-300 ${bases.first ? "bg-[#17FC13] border-[#17FC13] shadow-[0_0_12px_rgba(23,252,19,0.4)]" : "border-[#404040]"}`} />
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 rotate-45 border-2 border-white/15" />
                </div>
                {/* Runner names */}
                <div className="flex justify-center gap-6 text-[9px] text-white/30">
                  {bases.third && <span>3B: <span className="text-white/50">{bases.third}</span></span>}
                  {bases.second && <span>2B: <span className="text-white/50">{bases.second}</span></span>}
                  {bases.first && <span>1B: <span className="text-white/50">{bases.first}</span></span>}
                  {!bases.first && !bases.second && !bases.third && <span className="text-white/15">Bases Empty</span>}
                </div>
              </div>

              {/* Current Matchup */}
              {isLive && batter && (
                <div className="border border-[#171717] bg-radial p-5">
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/15 mb-3">Current At-Bat</div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-[8px] font-bold uppercase tracking-wider text-[#17FC13]/40 mb-1">Batter</div>
                      <div className="text-sm font-bold uppercase">{batter.name}</div>
                      <div className="text-[10px] text-white/25">{batter.pos}</div>
                    </div>
                    <div className="text-xl font-bold text-white/10">VS</div>
                    <div className="text-right">
                      <div className="text-[8px] font-bold uppercase tracking-wider text-white/20 mb-1">Pitcher</div>
                      <div className="text-sm font-bold uppercase text-white/60">—</div>
                    </div>
                  </div>
                  {/* Up next */}
                  <div className="border-t border-[#171717] pt-3 flex items-center gap-6">
                    {upNext.onDeck && <div><span className="text-[8px] font-bold uppercase tracking-wider text-white/15">On Deck </span><span className="text-[11px] text-white/40 uppercase">{upNext.onDeck}</span></div>}
                    {upNext.inHole && <div><span className="text-[8px] font-bold uppercase tracking-wider text-white/10">In Hole </span><span className="text-[11px] text-white/25 uppercase">{upNext.inHole}</span></div>}
                  </div>
                </div>
              )}

              {/* Last Play */}
              {recentPlays.length > 0 && (
                <div className="border border-[#171717] bg-radial p-5">
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/15 mb-3">Last Play</div>
                  <div className={`text-[14px] text-white/60 leading-[1.6] ${(recentPlays[0].rbis || 0) > 0 ? "text-[#17FC13]/80" : ""}`}>
                    <span className="font-bold text-white/80">{recentPlays[0].playerName}</span>{" "}
                    {resultLabel(recentPlays[0].result).toLowerCase()}
                    {(recentPlays[0].rbis || 0) > 0 && <span className="text-[#17FC13] font-bold"> ({recentPlays[0].rbis} RBI)</span>}
                    {recentPlays[0].runnersAdvanced?.length > 0 && <span className="text-white/30"> — {recentPlays[0].runnersAdvanced.join(", ")} scored</span>}
                  </div>
                </div>
              )}

              {/* Linescore */}
              <Linescore linescore={ls} teamName={team.name} opponent={game.opponent} />
            </div>

            {/* Right Column — Live Feed */}
            <div className="lg:col-span-7">
              <div className="border border-[#171717] bg-radial">
                <div className="px-5 py-3 border-b border-[#171717] flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25">Play-by-Play</span>
                  {isLive && <span className="text-[9px] text-[#17FC13]/40 uppercase tracking-wider">Live Updates</span>}
                </div>

                <div className="max-h-[600px] overflow-y-auto">
                  {allPlays.length === 0 ? (
                    <div className="px-5 py-12 text-center text-sm text-white/20">
                      {isLive ? "Waiting for first play..." : "No plays recorded."}
                    </div>
                  ) : (
                    (() => {
                      const innings = new Map<string, typeof allPlays>();
                      for (const ab of allPlays) {
                        const key = `${ab.isTopHalf ? "Top" : "Bot"} ${ab.inning}`;
                        if (!innings.has(key)) innings.set(key, []);
                        innings.get(key)!.push(ab);
                      }
                      return Array.from(innings.entries()).reverse().map(([inning, plays]) => (
                        <div key={inning}>
                          <div className="px-5 py-2 bg-white/[0.015] border-b border-[#171717]">
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/40">{inning}</span>
                          </div>
                          {[...plays].reverse().map((ab) => (
                            <div key={ab.id} className={`px-5 py-3 border-b border-[#171717] last:border-b-0 ${(ab.rbis || 0) > 0 ? "bg-[#17FC13]/[0.015] border-l-2 border-l-[#17FC13]/30" : ""}`}>
                              <div className="flex items-start gap-3">
                                <div className="shrink-0 mt-0.5">
                                  {(ab.rbis || 0) > 0 ? (
                                    <div className="w-5 h-5 bg-[#17FC13]/20 flex items-center justify-center text-[9px] font-bold text-[#17FC13]">{ab.rbis}</div>
                                  ) : ab.outs > 0 ? (
                                    <div className="w-5 h-5 bg-red-500/10 flex items-center justify-center text-[9px] font-bold text-red-400/40">X</div>
                                  ) : (
                                    <div className="w-5 h-5 bg-white/[0.03] flex items-center justify-center text-[9px] text-white/15">·</div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-[13px] text-white/55">
                                    <span className="font-bold text-white/75">{ab.playerName}</span>{" "}
                                    {resultLabel(ab.result).toLowerCase()}
                                    {(ab.rbis || 0) > 0 && <span className="text-[#17FC13] font-bold"> ({ab.rbis} RBI)</span>}
                                  </span>
                                  {ab.runnersAdvanced?.length > 0 && (
                                    <div className="text-[11px] text-[#17FC13]/30 mt-0.5">{ab.runnersAdvanced.join(", ")} scored</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ));
                    })()
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════ TAB: BOX SCORE ══════ */}
      {tab === "boxscore" && (
        <div className="max-w-[1120px] mx-auto px-4 py-6 space-y-8">
          {/* Linescore */}
          <Linescore linescore={ls} teamName={team.name} opponent={game.opponent} />

          {/* Batting */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg uppercase font-bold">{team.name} <span className="accent-text">Batting</span></h3>
              <span className="text-[10px] text-white/15 uppercase tracking-wider">{battingLines.length} batters</span>
            </div>
            <BattingBoxScore lines={battingLines} />
          </div>

          {/* Team Totals */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { label: "R", val: ls.homeRuns, accent: true }, { label: "H", val: ls.homeHits }, { label: "E", val: ls.homeErrors },
              { label: "Opp R", val: ls.awayRuns }, { label: "Opp H", val: ls.awayHits }, { label: "Opp E", val: ls.awayErrors },
            ].map((s) => (
              <div key={s.label} className={`border p-3 text-center ${s.accent ? "border-[#17FC13]/20" : "border-[#171717]"}`}>
                <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-white/20 mb-1">{s.label}</div>
                <div className={`text-xl font-bold ${s.accent ? "text-[#17FC13]" : ""}`}>{s.val}</div>
              </div>
            ))}
          </div>

          {/* Pitching */}
          {game.pitcherLog.length > 0 && (
            <div>
              <h3 className="text-lg uppercase font-bold mb-4">{team.name} <span className="accent-text">Pitching</span></h3>
              <PitchingBoxScore lines={game.pitcherLog.map((p) => ({
                playerId: p.playerId, playerName: p.playerName,
                IP: "—", H: p.hitsAllowed, R: p.runsAllowed, ER: p.earnedRuns,
                BB: p.walks, K: p.strikeouts, PC: p.pitchCount, ERA: "—", WHIP: "—",
              }))} />
            </div>
          )}

          {/* Scoring Plays */}
          {(() => {
            const sp = allPlays.filter((ab) => (ab.rbis || 0) > 0);
            if (sp.length === 0) return null;
            return (
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/40 mb-3">Scoring Plays</div>
                <div className="border border-[#171717] divide-y divide-[#171717]">
                  {sp.map((ab) => (
                    <div key={ab.id} className="px-5 py-3 flex items-center gap-3 text-[13px]">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-white/15 w-8 shrink-0">{ab.isTopHalf ? "T" : "B"}{ab.inning}</span>
                      <div className="w-5 h-5 bg-[#17FC13]/20 flex items-center justify-center text-[9px] font-bold text-[#17FC13] shrink-0">{ab.rbis}</div>
                      <span className="text-white/50"><span className="font-bold text-white/70">{ab.playerName}</span> {resultLabel(ab.result).toLowerCase()}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ══════ TAB: PLAY-BY-PLAY ══════ */}
      {tab === "plays" && (
        <div className="max-w-[1120px] mx-auto px-4 py-6">
          {allPlays.length === 0 ? (
            <div className="text-center py-16 text-sm text-white/20">No plays recorded.</div>
          ) : (
            (() => {
              const innings = new Map<string, typeof allPlays>();
              for (const ab of allPlays) {
                const key = `${ab.isTopHalf ? "Top" : "Bot"} ${ab.inning}`;
                if (!innings.has(key)) innings.set(key, []);
                innings.get(key)!.push(ab);
              }
              return Array.from(innings.entries()).reverse().map(([inning, plays]) => (
                <div key={inning} className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/50">{inning}</span>
                    <div className="flex-1 h-[1px] bg-[#171717]" />
                  </div>
                  <div className="border border-[#171717] divide-y divide-[#171717]">
                    {[...plays].reverse().map((ab) => (
                      <div key={ab.id} className={`px-5 py-3.5 flex items-start gap-4 ${(ab.rbis || 0) > 0 ? "bg-[#17FC13]/[0.015] border-l-2 border-l-[#17FC13]/30" : ""}`}>
                        <div className="shrink-0 mt-0.5">
                          {(ab.rbis || 0) > 0 ? (
                            <div className="w-6 h-6 bg-[#17FC13]/20 flex items-center justify-center text-[10px] font-bold text-[#17FC13]">{ab.rbis}</div>
                          ) : ab.outs > 0 ? (
                            <div className="w-6 h-6 bg-red-500/10 flex items-center justify-center text-[10px] font-bold text-red-400/40">OUT</div>
                          ) : (
                            <div className="w-6 h-6 bg-white/[0.03] flex items-center justify-center text-[10px] text-white/15">·</div>
                          )}
                        </div>
                        <div className="flex-1">
                          <span className="text-[14px] text-white/55">
                            <span className="font-bold text-white/80">{ab.playerName}</span>{" "}
                            {resultLabel(ab.result).toLowerCase()}
                            {(ab.rbis || 0) > 0 && <span className="text-[#17FC13] font-bold"> ({ab.rbis} RBI)</span>}
                          </span>
                          {ab.runnersAdvanced?.length > 0 && <div className="text-[11px] text-[#17FC13]/30 mt-0.5">{ab.runnersAdvanced.join(", ")} scored</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ));
            })()
          )}
        </div>
      )}

      {/* ══════ TAB: LINEUPS ══════ */}
      {tab === "lineups" && (
        <div className="max-w-[1120px] mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Home Lineup */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/40 mb-4">{team.name} — Batting Order</div>
              {(game.homeLineup || []).length > 0 ? (
                <div className="border border-[#171717]">
                  {game.homeLineup.filter((p) => p.active).sort((a, b) => a.battingOrder - b.battingOrder).map((p, i) => {
                    const isCurrent = batter && batter.id === p.playerId && !ls.isTopHalf;
                    return (
                      <div key={p.playerId} className={`flex items-center gap-3 px-4 py-3 border-b border-[#171717] last:border-b-0 ${isCurrent ? "bg-[#17FC13]/[0.04] border-l-2 border-l-[#17FC13]" : ""}`}>
                        <span className="text-[10px] font-bold text-[#17FC13]/40 w-4">{i + 1}</span>
                        <span className="text-sm font-bold uppercase flex-1">{p.playerName}</span>
                        <span className="text-[10px] text-white/25">{p.pos}</span>
                        {isCurrent && <span className="text-[8px] font-bold uppercase tracking-wider text-[#17FC13] bg-[#17FC13]/10 px-2 py-0.5">AB</span>}
                      </div>
                    );
                  })}
                  {/* Subbed out */}
                  {game.homeLineup.filter((p) => !p.active).map((p) => (
                    <div key={p.playerId} className="flex items-center gap-3 px-4 py-2 text-white/15">
                      <span className="text-[10px] w-4" />
                      <span className="text-xs uppercase flex-1 line-through">{p.playerName}</span>
                      <span className="text-[9px]">Sub out Inn {p.subbedOutInning}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-[#171717] px-4 py-8 text-center text-sm text-white/20">Lineup not set</div>
              )}
            </div>

            {/* Opponent Lineup */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mb-4">{game.opponent} — Batting Order</div>
              {(game.opponentLineup || []).length > 0 ? (
                <div className="border border-[#171717]">
                  {game.opponentLineup.filter((p) => p.active).sort((a, b) => a.battingOrder - b.battingOrder).map((p, i) => {
                    const isCurrent = batter && batter.id === p.id && ls.isTopHalf;
                    return (
                      <div key={p.id} className={`flex items-center gap-3 px-4 py-3 border-b border-[#171717] last:border-b-0 ${isCurrent ? "bg-white/[0.02] border-l-2 border-l-white/20" : ""}`}>
                        <span className="text-[10px] font-bold text-white/15 w-4">{i + 1}</span>
                        {p.number && <span className="text-[10px] text-white/20 w-5">#{p.number}</span>}
                        <span className="text-sm font-bold uppercase flex-1 text-white/60">{p.name}</span>
                        <span className="text-[10px] text-white/20">{p.pos}</span>
                        {isCurrent && <span className="text-[8px] font-bold uppercase tracking-wider text-white/40 bg-white/[0.05] px-2 py-0.5">AB</span>}
                      </div>
                    );
                  })}
                  {game.opponentLineup.filter((p) => !p.active && p.name).map((p) => (
                    <div key={p.id} className="flex items-center gap-3 px-4 py-2 text-white/10">
                      <span className="text-[10px] w-4" />
                      <span className="text-xs uppercase flex-1 line-through">{p.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-[#171717] px-4 py-8 text-center text-sm text-white/15">Lineup not set</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══════ GAME INFO BAR ══════ */}
      <div className="border-t border-[#171717]">
        <div className="max-w-[1120px] mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[10px] text-white/15 uppercase tracking-wider">
          <div className="flex items-center gap-3">
            <span>{game.gameType}</span>
            {game.eventName && <span>&middot; {game.eventName}</span>}
            <span>&middot; {game.date} &middot; {game.time}</span>
          </div>
          <div className="flex items-center gap-3">
            {game.venue?.name && <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(game.venue.name + ", " + game.venue.address)}`} target="_blank" rel="noopener noreferrer" className="text-white/15 hover:text-[#17FC13] transition-colors no-underline">{game.venue.name}</a>}
            <a href={`/teams/${teamId}/schedule`} className="text-white/15 hover:text-white/30 transition-colors no-underline">Schedule</a>
          </div>
        </div>
      </div>
      {/* ══════ STREAM SETUP MODAL ══════ */}
      {showStreamSetup && (
        <StreamSetupModal
          existingUrl={game.streamUrl}
          onSave={(url) => {
            setStreamUrl(teamId, gameId, url);
            setShowStreamSetup(false);
            const u = getGame(teamId, gameId);
            if (u) setGame(u);
          }}
          onCancel={() => setShowStreamSetup(false)}
        />
      )}
    </div>
  );
}
