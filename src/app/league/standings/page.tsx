import { Section } from "@/components/Section";
import { PageHeader } from "@/components/PageHeader";
import { STANDINGS, type StandingsEntry } from "@/lib/league-data";

const AGE_GROUPS = ["10U", "12U", "14U", "16U", "18U"];

function DivisionTable({ rows, label }: { rows: StandingsEntry[]; label: string }) {
  return (
    <div className="bg-[#0d1117] rounded-2xl border border-white/[0.04] overflow-hidden">
      <div className="px-4 py-3 border-b border-white/[0.05]">
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#17FC13]/70">{label}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.04]">
              <th className="text-left py-3 px-3 text-[10px] font-bold uppercase tracking-wider text-white w-8"></th>
              <th className="text-left py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-white">Team</th>
              <th className="text-center py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-white w-10">W</th>
              <th className="text-center py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-white w-10">L</th>
              <th className="text-center py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-white w-14">PCT</th>
              <th className="text-center py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-white w-10">GB</th>
              <th className="text-center py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-white w-14 hidden md:table-cell">STRK</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={7} className="py-8 text-center text-[12px] text-white/55">No teams yet — standings post as teams join.</td></tr>
            )}
            {rows.map((r, i) => (
              <tr key={r.team} className={`${i < rows.length - 1 ? "border-b border-white/[0.02]" : ""} hover:bg-white/[0.01] transition-colors`}>
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-2">
                    {r.playoffBound && <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13]" />}
                    <span className="text-[11px] font-mono text-white">{r.rank}</span>
                  </div>
                </td>
                <td className="py-3.5 px-2">
                  {r.teamId ? (
                    <a href={`/teams/${r.teamId}`} className="text-[13px] font-semibold text-[#17FC13] hover:underline no-underline">{r.team}</a>
                  ) : (
                    <span className="text-[13px] font-semibold text-white">{r.team}</span>
                  )}
                </td>
                <td className="py-3.5 px-2 text-center font-mono text-[13px] font-bold text-white">{r.w}</td>
                <td className="py-3.5 px-2 text-center font-mono text-[13px] text-white">{r.l}</td>
                <td className="py-3.5 px-2 text-center font-mono text-[13px] font-bold text-white">{r.pct}</td>
                <td className="py-3.5 px-2 text-center font-mono text-[13px] text-white">{r.gb}</td>
                <td className="py-3.5 px-4 text-center hidden md:table-cell">
                  <span className={`font-mono text-[11px] font-bold ${r.streak.startsWith("W") ? "text-[#17FC13]" : "text-red-400/70"}`}>
                    {r.streak}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function StandingsPage() {
  return (
    <main>
      <PageHeader
        title="League"
        accent="Standings"
        subtitle="Current season standings across all Premier and Prospect divisions. Top 2 teams in each division qualify for playoffs."
        breadcrumb={[{ label: "League", href: "/league" }]}
        actions={[
          { label: "Schedule", href: "/league/schedule" },
          { label: "Results", href: "/league/results" },
        ]}
      />

      <Section>
        {/* Legend */}
        <div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-[10px] text-white uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13]" /> Playoff qualifier
            </div>
            <div className="h-3 w-px bg-white/[0.06]" />
            <span>Games played Wed / Thu / Fri</span>
          </div>
        </div>

        {/* All age groups */}
        <div className="space-y-8 md:space-y-12">
          {AGE_GROUPS.map((age, i) => (
            <div key={age}>
              <div>
                {/* Age group header */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl md:text-3xl font-bold uppercase tracking-tight">{age}</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white">Premier &amp; Prospect</span>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/[0.06] to-transparent" />
                </div>

                {/* Division A & B */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <DivisionTable rows={STANDINGS[`${age}-Premier`] || []} label="Premier Division" />
                  <DivisionTable rows={STANDINGS[`${age}-Prospect`] || []} label="Prospect Division" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
