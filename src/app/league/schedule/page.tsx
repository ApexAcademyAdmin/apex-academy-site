import { Section } from "@/components/Section";
import { PageHeader } from "@/components/PageHeader";
import { UPCOMING_GAMES } from "@/lib/league-data";

// Group games by date
function groupByDate(games: typeof UPCOMING_GAMES) {
  const groups: Record<string, typeof UPCOMING_GAMES> = {};
  for (const g of games) {
    if (!groups[g.date]) groups[g.date] = [];
    groups[g.date].push(g);
  }
  return groups;
}

export default function SchedulePage() {
  const grouped = groupByDate(UPCOMING_GAMES);

  return (
    <main>
      <PageHeader
        title="Game"
        accent="Schedule"
        subtitle="All league games are played Tuesday, Wednesday, and Thursday evenings — keeping weekends free for travel tournaments."
        breadcrumb={[{ label: "League", href: "/league" }]}
        actions={[
          { label: "Standings", href: "/league/standings" },
          { label: "Results", href: "/league/results" },
        ]}
      />

      <Section>
        <div className="space-y-12">
          {Object.entries(grouped).map(([date, games], di) => (
            <div key={date}>
              <div>
                {/* Date header */}
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-lg font-bold uppercase tracking-tight">{date}</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/[0.06] to-transparent" />
                  <span className="text-[10px] text-white font-mono">{games.length} game{games.length > 1 ? "s" : ""}</span>
                </div>

                {/* Game cards for this date */}
                <div className="space-y-3">
                  {games.map((g) => (
                    <div key={g.id} className="bg-[#0d1117] rounded-2xl border border-white/[0.04] p-6 hover:border-[#17FC13]/10 transition-all">
                      <div className="flex flex-col md:flex-row md:items-center gap-5">
                        {/* Division + Time */}
                        <div className="flex items-center gap-3 md:w-32 flex-shrink-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/[0.04] text-white">{g.ageGroup} Div {g.division}</span>
                          <span className="text-sm font-bold text-[#17FC13]/70 font-mono">{g.time}</span>
                        </div>

                        {/* Matchup */}
                        <div className="flex items-center gap-5 flex-1">
                          <div className="flex-1 text-right">
                            <div className="text-[15px] font-bold text-white">{g.away}</div>
                            <div className="text-[11px] text-white font-mono mt-0.5">{g.awayRecord}</div>
                          </div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-white px-2">at</div>
                          <div className="flex-1">
                            <div className="text-[15px] font-bold text-white">{g.home}</div>
                            <div className="text-[11px] text-white font-mono mt-0.5">{g.homeRecord}</div>
                          </div>
                        </div>

                        {/* Meta */}
                        <div className="flex items-center gap-3 md:w-48 flex-shrink-0 md:justify-end">
                          <span className="text-[11px] text-white">{g.location}</span>
                          {g.streamAvailable && (
                            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#17FC13]/10 text-[#17FC13]/50 border border-[#17FC13]/10">Stream</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
