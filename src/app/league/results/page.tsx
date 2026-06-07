import { Section } from "@/components/Section";
import { PageHeader } from "@/components/PageHeader";
import { RECENT_RESULTS } from "@/lib/league-data";

function GameCard({ r }: { r: typeof RECENT_RESULTS[0] }) {
  const homeWin = r.homeScore > r.awayScore;

  return (
    <div className="bg-[#0d1117] rounded-2xl border border-white/[0.04] overflow-hidden hover:border-[#17FC13]/10 transition-all">
      {/* Top bar — division + status */}
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/[0.03]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">{r.division}</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-white/60">{r.date}</span>
          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.06] text-white/90">Final</span>
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

      {/* Pitching logs — always visible */}
      <div className="px-5 py-4 border-t border-white/[0.03] bg-white/[0.01]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { label: r.away, pitchers: r.awayPitchers, isWinner: !homeWin },
              { label: r.home, pitchers: r.homePitchers, isWinner: homeWin },
            ].map(side => (
              <div key={side.label}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/70">{side.label}</span>
                  <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${side.isWinner ? "bg-[#17FC13]/10 text-[#17FC13]/50" : "bg-red-500/10 text-red-400/50"}`}>{side.isWinner ? "W" : "L"}</span>
                </div>
                <div className="space-y-1">
                  {side.pitchers.map((p, pi) => (
                    <div key={pi} className="flex items-center justify-between text-[12px]">
                      <span className="text-white/70">{p.name}</span>
                      <div className="flex items-center gap-3 font-mono text-white/80">
                        <span>{p.ip} IP</span>
                        <span className={`font-bold ${p.pitches > 95 ? "text-red-400/70" : "text-white/90"}`}>{p.pitches} P</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
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
