"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ALL_TEAMS } from "@/lib/team-data";
import { getGames, isCoachSession, cancelGame, postponeGame, deleteGame } from "@/lib/game-store";
import type { Game } from "@/lib/scoring-types";
import { GAME_TYPE_LABELS } from "@/lib/scoring-types";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { CoachLogin } from "@/components/scoring/CoachLogin";
import { AddGameForm } from "@/components/scoring/AddGameForm";

export default function SchedulePage() {
  const pathname = usePathname();
  const teamId = pathname.split("/")[2];
  const team = ALL_TEAMS[teamId];

  const [games, setGames] = useState<Game[]>([]);
  const [isCoach, setIsCoach] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAddGame, setShowAddGame] = useState(false);
  const [filter, setFilter] = useState<"all" | "upcoming" | "live" | "final">("all");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  useEffect(() => {
    setGames(getGames(teamId));
    setIsCoach(isCoachSession(teamId));
  }, [teamId]);

  function refresh() { setGames(getGames(teamId)); }

  if (!team) return null;

  // Static + dynamic games
  const staticGames = team.schedule.map((g, i) => ({
    id: `static-${i}`, date: g.date, time: "", opponent: g.opponent,
    gameType: "league" as const, eventName: g.tournament, venue: null,
    status: "final" as const, result: g.result, score: g.score, isStatic: true,
    linescore: null,
  }));

  const dynamicGames = games.map((g) => ({
    id: g.id, date: g.date, time: g.time, opponent: g.opponent,
    gameType: g.gameType, eventName: g.eventName, venue: g.venue,
    status: g.status,
    result: g.status === "final" ? (g.linescore.homeRuns > g.linescore.awayRuns ? "W" : "L") : undefined,
    score: g.status === "live" || g.status === "final" ? `${g.linescore.awayRuns}-${g.linescore.homeRuns}` : undefined,
    isStatic: false, linescore: g.linescore,
  }));

  const allGames = [...dynamicGames, ...staticGames];
  const filtered = filter === "all" ? allGames : allGames.filter((g) => g.status === filter);

  return (
    <>
      <Section size="md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <SectionHeading accent="Results" label={`${team.age} ${team.name}`}>Schedule &amp;</SectionHeading>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1">
              {(["all", "upcoming", "live", "final"] as const).map((f) => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                    filter === f ? "border-[#17FC13]/40 text-[#17FC13] bg-[#17FC13]/[0.05]" : "border-[#171717] text-white/30 hover:text-white/50"
                  }`}>{f}</button>
              ))}
            </div>
            {isCoach ? (
              <button onClick={() => setShowAddGame(true)} className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider border border-[#17FC13]/40 text-[#17FC13] bg-[#17FC13]/[0.05] cursor-pointer hover:bg-[#17FC13]/[0.1] transition-all">+ Add Game</button>
            ) : (
              <button onClick={() => setShowLogin(true)} className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider border border-[#171717] text-white/30 cursor-pointer hover:text-white/50 transition-colors">Coach Login</button>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="border border-[#171717] px-6 py-16 text-center text-sm text-white/25">No games found.</div>
        ) : (
          <div className="space-y-3">
            {filtered.map((g) => (
              <div key={g.id} className={`border border-[#171717] hover:border-white/[0.06] transition-colors ${g.status === "live" ? "border-l-2 border-l-[#17FC13]" : ""} ${g.status === "canceled" || g.status === "postponed" ? "opacity-50" : ""}`}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-5 py-4 items-center">
                  {/* Status */}
                  <div className="md:col-span-2 flex items-center gap-2">
                    {g.status === "live" && <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-[#17FC13]"><span className="w-1.5 h-1.5 bg-[#17FC13] rounded-full animate-pulse" />Live</span>}
                    {g.status === "final" && g.result && <span className={`text-xs font-bold uppercase ${g.result === "W" ? "text-[#17FC13]" : "text-white/40"}`}>{g.result}</span>}
                    {g.status === "upcoming" && <span className="text-[9px] font-bold uppercase tracking-wider text-white/20">Upcoming</span>}
                    {g.status === "canceled" && <span className="text-[9px] font-bold uppercase tracking-wider text-red-400/60">Canceled</span>}
                    {g.status === "postponed" && <span className="text-[9px] font-bold uppercase tracking-wider text-yellow-400/60">Postponed</span>}
                  </div>

                  {/* Date + Type */}
                  <div className="md:col-span-2">
                    <div className="text-xs text-white/50">{g.date}{g.time ? ` · ${g.time}` : ""}</div>
                    <div className="text-[9px] text-white/20 uppercase tracking-wider mt-0.5">{GAME_TYPE_LABELS[g.gameType]}</div>
                  </div>

                  {/* Opponent */}
                  <div className="md:col-span-3">
                    <div className="text-sm font-bold uppercase">{g.opponent}</div>
                    {g.eventName && <div className="text-[10px] text-white/20 uppercase tracking-wider mt-0.5">{g.eventName}</div>}
                  </div>

                  {/* Score */}
                  <div className="md:col-span-1 text-sm font-bold">{g.score || "—"}</div>

                  {/* Venue */}
                  <div className="md:col-span-2">
                    {g.venue ? (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(g.venue.name + ", " + g.venue.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block no-underline group/venue"
                      >
                        <div className="text-[10px] text-white/30 truncate group-hover/venue:text-[#17FC13] transition-colors">{g.venue.name}</div>
                        <div className="text-[9px] text-white/15 truncate group-hover/venue:text-white/25 transition-colors">{g.venue.address}</div>
                      </a>
                    ) : (
                      <span className="text-[10px] text-white/15">—</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="md:col-span-2 flex items-center justify-end gap-2 relative">
                    {!g.isStatic && g.status === "live" && isCoach && (
                      <a href={`/teams/${teamId}/game/${g.id}/score`} className="text-[10px] font-bold uppercase tracking-wider text-[#17FC13] no-underline hover:underline">Score</a>
                    )}
                    {!g.isStatic && g.status === "live" && (
                      <a href={`/teams/${teamId}/game/${g.id}`} className="text-[10px] font-bold uppercase tracking-wider text-white/40 no-underline hover:text-white/60">Watch</a>
                    )}
                    {!g.isStatic && g.status === "upcoming" && isCoach && (
                      <a href={`/teams/${teamId}/game/${g.id}`} className="text-[10px] font-bold uppercase tracking-wider text-white/40 no-underline hover:text-white/60">Manage</a>
                    )}
                    {!g.isStatic && g.status === "final" && (
                      <a href={`/teams/${teamId}/game/${g.id}`} className="text-[10px] font-bold uppercase tracking-wider text-white/25 no-underline hover:text-white/40">Box Score</a>
                    )}

                    {/* Coach menu — available for upcoming, live, postponed, and final games */}
                    {!g.isStatic && isCoach && g.status !== "canceled" && (
                      <div className="relative">
                        <button onClick={() => setMenuOpen(menuOpen === g.id ? null : g.id)} className="w-6 h-6 flex items-center justify-center text-white/20 hover:text-white/50 cursor-pointer bg-transparent border-none text-sm">&#8942;</button>
                        {menuOpen === g.id && (
                          <div className="absolute right-0 top-8 z-20 border border-[#171717] bg-black min-w-[160px] py-1">
                            {g.status === "live" && (
                              <button onClick={() => { postponeGame(teamId, g.id); refresh(); setMenuOpen(null); }} className="w-full text-left px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-yellow-400/60 hover:bg-white/[0.02] cursor-pointer bg-transparent border-none">Rain Delay / PPD</button>
                            )}
                            {(g.status === "upcoming" || g.status === "postponed") && (
                              <button onClick={() => { postponeGame(teamId, g.id); refresh(); setMenuOpen(null); }} className="w-full text-left px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-yellow-400/60 hover:bg-white/[0.02] cursor-pointer bg-transparent border-none">Postpone</button>
                            )}
                            {(g.status === "upcoming" || g.status === "live" || g.status === "postponed") && (
                              <button onClick={() => { cancelGame(teamId, g.id); refresh(); setMenuOpen(null); }} className="w-full text-left px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-red-400/60 hover:bg-white/[0.02] cursor-pointer bg-transparent border-none">Cancel Game</button>
                            )}
                            <button onClick={() => { if (confirm("Delete this game permanently?")) { deleteGame(teamId, g.id); refresh(); } setMenuOpen(null); }} className="w-full text-left px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-red-400/40 hover:bg-white/[0.02] cursor-pointer bg-transparent border-none">Delete</button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      {showLogin && <CoachLogin teamId={teamId} onSuccess={() => { setIsCoach(true); setShowLogin(false); }} onCancel={() => setShowLogin(false)} />}
      {showAddGame && <AddGameForm teamId={teamId} onCreated={() => { refresh(); setShowAddGame(false); }} onCancel={() => setShowAddGame(false)} />}
    </>
  );
}
