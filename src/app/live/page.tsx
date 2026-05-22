"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ALL_TEAMS } from "@/lib/team-data";
import { getGames } from "@/lib/game-store";
import type { Game } from "@/lib/scoring-types";
import { GAME_TYPE_LABELS } from "@/lib/scoring-types";
import { Button } from "@/components/Button";

export default function LivePage() {
  const [allGames, setAllGames] = useState<(Game & { teamName: string })[]>([]);

  useEffect(() => {
    const games: (Game & { teamName: string })[] = [];
    for (const team of Object.values(ALL_TEAMS)) {
      for (const g of getGames(team.id)) games.push({ ...g, teamName: team.name });
    }
    games.sort((a, b) => b.createdAt - a.createdAt);
    setAllGames(games);

    const interval = setInterval(() => {
      const updated: (Game & { teamName: string })[] = [];
      for (const team of Object.values(ALL_TEAMS)) {
        for (const g of getGames(team.id)) updated.push({ ...g, teamName: team.name });
      }
      updated.sort((a, b) => b.createdAt - a.createdAt);
      setAllGames(updated);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const liveGames = allGames.filter((g) => g.status === "live");
  const recentFinals = allGames.filter((g) => g.status === "final").slice(0, 10);
  const upcoming = allGames.filter((g) => g.status === "upcoming").slice(0, 8);

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="relative max-w-[1120px] mx-auto px-6 pt-28 md:pt-36 pb-6">
          <div className="flex items-center gap-2 mb-5 text-[10px] font-medium uppercase tracking-[0.2em]">
            <a href="/" className="text-white/20 no-underline hover:text-white/40">Home</a>
            <span className="text-white/10">/</span>
            <span className="text-[#17FC13]/50">Apex Live</span>
          </div>
          <h1 className="text-3xl md:text-4xl uppercase font-bold leading-[0.9] mb-2">
            Apex <span className="accent-text">Live</span>
          </h1>
          <p className="text-[14px] text-white/30 leading-[1.7] max-w-lg">Live scores, game results, and upcoming matchups across all teams.</p>
        </div>
      </section>

      <div className="max-w-[1120px] mx-auto px-6 py-6 space-y-6">

        {/* Live Now */}
        {liveGames.length > 0 ? (
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/40 mb-3">Live Now</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {liveGames.map((g) => (
                <a key={g.id} href={`/teams/${g.teamId}/game/${g.id}`} className="no-underline block border border-[#17FC13]/20 bg-[#17FC13]/[0.02] p-4 hover:border-[#17FC13]/40 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#17FC13]"><span className="w-1.5 h-1.5 bg-[#17FC13] rounded-full animate-pulse" />Live</span>
                    <span className="text-[9px] text-white/20 uppercase">{g.teamName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-white/30 uppercase">{g.opponent}</div>
                      <div className="text-xl font-bold">{g.linescore.awayRuns}</div>
                    </div>
                    <div className="text-[9px] font-bold uppercase text-white/20">{g.linescore.isTopHalf ? "Top" : "Bot"} {g.linescore.currentInning}</div>
                    <div className="text-right">
                      <div className="text-[10px] text-[#17FC13]/50 uppercase">{g.teamName}</div>
                      <div className="text-xl font-bold text-[#17FC13]">{g.linescore.homeRuns}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div className="border border-[#171717] bg-radial p-6 text-center">
            <p className="text-xs text-white/25 mb-1">No live games right now</p>
            <p className="text-[10px] text-white/12">Check back during game time.</p>
          </div>
        )}

        {/* Recent + Upcoming side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent */}
          {recentFinals.length > 0 && (
            <div className="border border-[#171717]">
              <div className="px-4 py-3 border-b border-[#171717]">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/15">Recent Results</span>
              </div>
              {recentFinals.map((g) => {
                const won = g.linescore.homeRuns > g.linescore.awayRuns;
                return (
                  <a key={g.id} href={`/teams/${g.teamId}/game/${g.id}`} className="no-underline flex items-center justify-between px-4 py-3 border-b border-[#171717] last:border-b-0 hover:bg-white/[0.01] transition-colors">
                    <div>
                      <div className="text-[10px] text-white/20">{g.date}</div>
                      <div className="text-xs font-bold uppercase mt-0.5">{g.teamName} vs {g.opponent}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${won ? "text-[#17FC13]" : "text-white/25"}`}>{won ? "W" : "L"}</span>
                      <span className="text-xs font-bold">{g.linescore.homeRuns}-{g.linescore.awayRuns}</span>
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          {/* Upcoming */}
          {upcoming.length > 0 && (
            <div className="border border-[#171717]">
              <div className="px-4 py-3 border-b border-[#171717]">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/15">Upcoming</span>
              </div>
              {upcoming.map((g) => (
                <div key={g.id} className="flex items-center justify-between px-4 py-3 border-b border-[#171717] last:border-b-0">
                  <div>
                    <div className="text-[10px] text-white/20">{g.date} &middot; {g.time}</div>
                    <div className="text-xs font-bold uppercase mt-0.5">{g.teamName} vs {g.opponent}</div>
                  </div>
                  <span className="text-[8px] font-bold uppercase tracking-wider text-white/12">{GAME_TYPE_LABELS[g.gameType]?.split(" ")[0]}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Empty state */}
        {allGames.length === 0 && (
          <div className="border border-[#171717] bg-radial p-8 text-center">
            <Image src="/logos/a-mark-sm.png" alt="" width={40} height={40} className="mx-auto mb-4 opacity-15" />
            <h2 className="text-xl uppercase font-bold mb-2">No Games <span className="accent-text">Yet</span></h2>
            <p className="text-[12px] text-white/25 mb-6">Games appear here once coaches start scheduling.</p>
            <Button href="/teams" size="small">View Teams</Button>
          </div>
        )}

        {/* Bottom bar */}
        <div className="border border-[#171717] bg-radial p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/20">Live scores and box scores for all Apex Academy teams.</p>
          <div className="flex items-center gap-2">
            <Button href="/teams" size="small" variant="secondary">All Teams</Button>
            <Button href="/events" size="small" variant="secondary">Events</Button>
          </div>
        </div>
      </div>
    </>
  );
}
