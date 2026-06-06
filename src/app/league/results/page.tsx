"use client";

import { useState } from "react";
import { Section } from "@/components/Section";
import { PageHeader } from "@/components/PageHeader";
import { RECENT_RESULTS } from "@/lib/league-data";

function GameCard({ r }: { r: typeof RECENT_RESULTS[0] }) {
  const [expanded, setExpanded] = useState(false);
  const homeWin = r.homeScore > r.awayScore;
  const winner = homeWin ? r.home : r.away;
  const winningPitchers = homeWin ? r.homePitchers : r.awayPitchers;
  const starPitcher = winningPitchers[0];

  return (
    <div className="bg-[#0d1117] rounded-2xl border border-white/[0.04] overflow-hidden hover:border-[#17FC13]/10 transition-all">
      {/* Top bar — division + status */}
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/[0.03]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">{r.division}</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-white/20">{r.date}</span>
          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.06] text-white/50">Final</span>
        </div>
      </div>

      {/* Scoreboard */}
      <div className="px-5 py-5">
        <div className="space-y-2">
          {/* Away team */}
          <div className={`flex items-center justify-between ${!homeWin ? "" : "opacity-50"}`}>
            <div className="flex items-center gap-3 flex-1">
              {!homeWin && <span className="w-1 h-5 rounded-full bg-[#17FC13]" />}
              {homeWin && <span className="w-1 h-5 rounded-full bg-transparent" />}
              <span className="text-lg md:text-xl font-bold text-white">{r.away}</span>
            </div>
            <span className="text-2xl md:text-3xl font-bold font-mono text-white tabular-nums">{r.awayScore}</span>
          </div>

          {/* Home team */}
          <div className={`flex items-center justify-between ${homeWin ? "" : "opacity-50"}`}>
            <div className="flex items-center gap-3 flex-1">
              {homeWin && <span className="w-1 h-5 rounded-full bg-[#17FC13]" />}
              {!homeWin && <span className="w-1 h-5 rounded-full bg-transparent" />}
              <span className="text-lg md:text-xl font-bold text-white">{r.home}</span>
            </div>
            <span className="text-2xl md:text-3xl font-bold font-mono text-white tabular-nums">{r.homeScore}</span>
          </div>
        </div>
      </div>

      {/* Player of the game + expand */}
      <div className="px-5 py-3 border-t border-white/[0.03] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#17FC13]/50">Winning Pitcher</span>
          <span className="text-[13px] font-medium text-white/80">{starPitcher.name}</span>
          <span className="text-[11px] font-mono text-white/30">{starPitcher.ip} IP &middot; {starPitcher.pitches} P</span>
        </div>

        <button
          onClick={() => setExpanded(e => !e)}
          className="text-[10px] font-bold uppercase tracking-wider text-white/25 hover:text-[#17FC13]/50 transition-colors"
        >
          {expanded ? "Hide Details" : "Pitching Details"}
        </button>
      </div>

      {/* Expandable pitching logs */}
      {expanded && (
        <div className="px-5 py-4 border-t border-white/[0.03] bg-white/[0.01]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { label: r.away, pitchers: r.awayPitchers, isWinner: !homeWin },
              { label: r.home, pitchers: r.homePitchers, isWinner: homeWin },
            ].map(side => (
              <div key={side.label}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">{side.label}</span>
                  {side.isWinner && <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#17FC13]/10 text-[#17FC13]/50">W</span>}
                </div>
                <div className="space-y-1">
                  {side.pitchers.map((p, pi) => (
                    <div key={pi} className="flex items-center justify-between text-[12px]">
                      <span className="text-white/70">{p.name}</span>
                      <div className="flex items-center gap-3 font-mono text-white/40">
                        <span>{p.ip} IP</span>
                        <span className={`font-bold ${p.pitches > 95 ? "text-red-400/70" : "text-white/50"}`}>{p.pitches} P</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResultsPage() {
  return (
    <main>
      <PageHeader
        title="Game"
        accent="Results"
        subtitle="Final scores from recent league games."
        breadcrumb={[{ label: "League", href: "/league" }]}
        actions={[
          { label: "Standings", href: "/league/standings" },
          { label: "Schedule", href: "/league/schedule" },
        ]}
      />

      <Section>
        <div className="space-y-4">
          {RECENT_RESULTS.map(r => (
            <GameCard key={r.id} r={r} />
          ))}
        </div>
      </Section>
    </main>
  );
}
