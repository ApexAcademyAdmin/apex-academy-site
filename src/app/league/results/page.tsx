import { Section } from "@/components/Section";
import { PageHeader } from "@/components/PageHeader";
import { RECENT_RESULTS } from "@/lib/league-data";

export default function ResultsPage() {
  return (
    <main>
      <PageHeader
        title="Game"
        accent="Results"
        subtitle="Final scores and pitching logs from recent league games."
        breadcrumb={[{ label: "League", href: "/league" }]}
        actions={[
          { label: "Standings", href: "/league/standings" },
          { label: "Submit Result", href: "/league/submit-result" },
        ]}
      />

      <Section>
        <div className="space-y-4">
          {RECENT_RESULTS.map((r, i) => {
            const homeWin = r.homeScore > r.awayScore;
            return (
              <div key={r.id}>
                <div className="bg-[#0d1117] rounded-2xl border border-white/[0.04] overflow-hidden hover:border-[#17FC13]/10 transition-all">
                  {/* Score */}
                  <div className="p-5">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex items-center gap-3 lg:w-28 flex-shrink-0">
                        <span className="text-[11px] text-white font-mono">{r.date}</span>
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/[0.04] text-white">{r.division}</span>
                      </div>

                      <div className="flex items-center gap-6 lg:flex-1">
                        <div className="flex-1 text-right">
                          <span className={`text-base font-bold ${!homeWin ? "text-white" : "text-white/50"}`}>{r.away}</span>
                        </div>
                        <div className="flex items-center gap-3 font-mono">
                          <span className={`text-2xl font-bold ${!homeWin ? "text-white" : "text-white/30"}`}>{r.awayScore}</span>
                          <span className="text-white/20 text-sm">—</span>
                          <span className={`text-2xl font-bold ${homeWin ? "text-white" : "text-white/30"}`}>{r.homeScore}</span>
                        </div>
                        <div className="flex-1">
                          <span className={`text-base font-bold ${homeWin ? "text-white" : "text-white/50"}`}>{r.home}</span>
                        </div>
                      </div>

                      <div className="lg:w-16 flex-shrink-0 flex lg:justify-end">
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/[0.04] text-white/50">Final</span>
                      </div>
                    </div>
                  </div>

                  {/* Pitching logs */}
                  <div className="px-5 py-3.5 bg-white/[0.01] border-t border-white/[0.03]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Away pitchers */}
                      <div>
                        <div className="text-[9px] uppercase tracking-[0.12em] text-white/30 font-bold mb-1.5">{r.away}</div>
                        {r.awayPitchers.map((p, pi) => (
                          <div key={pi} className="flex items-center justify-between py-0.5 text-[12px]">
                            <span className="text-white">{p.name}</span>
                            <span className="font-mono text-white/60">
                              {p.ip} IP, <span className={`font-bold ${p.pitches > 95 ? "text-red-400" : "text-[#17FC13]/70"}`}>{p.pitches}</span> P
                            </span>
                          </div>
                        ))}
                      </div>
                      {/* Home pitchers */}
                      <div>
                        <div className="text-[9px] uppercase tracking-[0.12em] text-white/30 font-bold mb-1.5">{r.home}</div>
                        {r.homePitchers.map((p, pi) => (
                          <div key={pi} className="flex items-center justify-between py-0.5 text-[12px]">
                            <span className="text-white">{p.name}</span>
                            <span className="font-mono text-white/60">
                              {p.ip} IP, <span className={`font-bold ${p.pitches > 95 ? "text-red-400" : "text-[#17FC13]/70"}`}>{p.pitches}</span> P
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </main>
  );
}
