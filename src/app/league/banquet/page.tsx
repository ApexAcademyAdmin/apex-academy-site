import { Section } from "@/components/Section";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import {
  REGULAR_SEASON_AWARDS,
  POSITIONAL_AWARDS,
  PLAYOFF_AWARDS,
  TEAM_AWARDS,
  PROSPECT_GAMES_AWARDS,
  BANQUET_CEREMONY_ORDER,
} from "@/lib/league-data";

// ═══════════════════════════════════════
// AWARD CARD
// ═══════════════════════════════════════
function AwardCard({ name, description, badge }: { name: string; description: string; badge?: string }) {
  return (
    <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-5 h-full hover:border-[#17FC13]/10 transition-all">
      {badge && (
        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#17FC13]/10 text-[#17FC13]/50 mb-3 inline-block">{badge}</span>
      )}
      <div className="text-sm font-bold text-white/90 mb-1.5">{name}</div>
      <div className="text-[12px] text-white/80 leading-relaxed">{description}</div>
      <div className="text-[10px] text-white/60 mt-3">Premier Division &middot; Prospect Division</div>
    </div>
  );
}

// ═══════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════
export default function BanquetPage() {
  return (
    <main>
      <PageHeader
        title="Awards &"
        accent="Banquet"
        subtitle="The annual Apex Academy Banquet celebrates championships, individual achievement, development, and leadership across the league."
        breadcrumb={[{ label: "League", href: "/league" }]}
      />

      {/* EVENT INFO */}
      <Section border="bottom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Annual Event</div>
            <h2 className="text-2xl md:text-3xl uppercase font-bold mb-3">The Apex Academy <span className="accent-text">Banquet</span></h2>
            <p className="text-sm text-white/90 leading-relaxed mb-4">
              The culmination of the Apex Academy League season. Championships are celebrated. Individual excellence is honored. Development and leadership are recognized. Every award is earned through performance on the field and character off of it.
            </p>
            <p className="text-[12px] text-white/70 leading-relaxed">
              The banquet brings together players, families, coaches, and the baseball community to celebrate a season of competition, growth, and achievement across the Premier and Prospect Divisions.
            </p>
          </div>

          <div className="bg-[#0d1117] rounded-2xl border border-[#17FC13]/10 p-6">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/50 mb-4">Event Details</div>
            <div className="space-y-3">
              {[
                { label: "Date", value: "End of Season — August 2026" },
                { label: "Location", value: "Greater Boston — TBA" },
                { label: "Attendees", value: "Players, Families, Coaches, Staff" },
                { label: "Dress Code", value: "Business Casual" },
                { label: "Format", value: "Dinner, Awards Ceremony, Recognition" },
              ].map(d => (
                <div key={d.label} className="flex items-start justify-between py-2 border-b border-white/[0.03] last:border-b-0">
                  <span className="text-[11px] font-bold text-white/80 uppercase tracking-wider">{d.label}</span>
                  <span className="text-[12px] text-white/70 text-right">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* REGULAR SEASON AWARDS */}
      <Section border="bottom">
        <div className="mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Regular Season</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold mb-2">Individual <span className="accent-text">Awards</span></h2>
          <p className="text-sm text-white/80 max-w-2xl">Recognizing the top performers across the entire regular season. Each award is presented for both the Premier Division and Prospect Division.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REGULAR_SEASON_AWARDS.map(a => (
            <AwardCard key={a.id} name={a.name} description={a.description} />
          ))}
        </div>
      </Section>

      {/* POSITIONAL AWARDS */}
      <Section border="bottom">
        <div className="mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Positional Excellence</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold mb-2">Silver Slugger & <span className="accent-text">Gold Glove</span></h2>
          <p className="text-sm text-white/80 max-w-2xl">Awarded to the top offensive and defensive performers at each position. Presented for both Premier and Prospect Divisions.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {POSITIONAL_AWARDS.map(award => (
            <div key={award.id} className="bg-[#0d1117] rounded-2xl border border-white/[0.04] p-6">
              <div className="text-sm font-bold text-white/90 mb-1">{award.name}</div>
              <div className="text-[11px] text-white/70 mb-4">
                {award.id === "silver-slugger" ? "Top offensive performer at each position" : "Top defensive performer at each position"}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {award.positions.map((pos, i) => (
                  <div key={`${pos}-${i}`} className="flex items-center gap-2 text-[12px] text-white/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13]/30 flex-shrink-0" />
                    {pos}
                  </div>
                ))}
              </div>
              <div className="text-[10px] text-white/60 mt-4">Premier Division &middot; Prospect Division</div>
            </div>
          ))}
        </div>
      </Section>

      {/* TEAM AWARDS */}
      <Section border="bottom">
        <div className="mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Team Achievement</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold mb-2">Championships & <span className="accent-text">Titles</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TEAM_AWARDS.map(a => (
            <div key={a.id} className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-5 hover:border-[#17FC13]/10 transition-all">
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] text-white/80 mb-2 inline-block">
                {a.phase === "regular" ? "Regular Season" : "Postseason"}
              </span>
              <div className="text-sm font-bold text-white/90">{a.name}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* PLAYOFF AWARDS */}
      <Section border="bottom">
        <div className="mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Postseason</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold mb-2">Playoff <span className="accent-text">Awards</span></h2>
          <p className="text-sm text-white/80 max-w-2xl">Separate postseason recognition for players who perform at their best when it matters most.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLAYOFF_AWARDS.map(a => (
            <AwardCard key={a.id} name={a.name} description={a.description} />
          ))}
        </div>
      </Section>

      {/* PROSPECT GAMES AWARDS */}
      <Section border="bottom">
        <div className="mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">All-New England Prospect Games</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold mb-2">Prospect Games <span className="accent-text">Honors</span></h2>
          <p className="text-sm text-white/80 max-w-2xl">Selection to the All-New England Prospect Games is one of the highest honors in the league. Additional awards are presented at the event.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROSPECT_GAMES_AWARDS.map(a => (
            <div key={a.id} className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-5 h-full hover:border-[#17FC13]/10 transition-all">
              <div className="text-sm font-bold text-white/90 mb-1.5">{a.name}</div>
              <div className="text-[12px] text-white/80 leading-relaxed">{a.description}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* CEREMONY STRUCTURE */}
      <Section border="bottom">
        <div className="mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Ceremony</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold mb-2">Banquet <span className="accent-text">Program</span></h2>
        </div>

        <div className="max-w-lg">
          <div className="bg-[#0d1117] rounded-2xl border border-white/[0.04] overflow-hidden">
            {BANQUET_CEREMONY_ORDER.map((item, i) => (
              <div key={item} className={`flex items-center gap-4 px-5 py-3 ${i < BANQUET_CEREMONY_ORDER.length - 1 ? "border-b border-white/[0.03]" : ""}`}>
                <span className="text-[11px] font-mono text-[#17FC13]/40 w-6 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[13px] text-white/70">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section size="lg">
        <div className="text-center">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Be Part of It</div>
          <h2 className="text-2xl md:text-3xl font-bold uppercase mb-3 leading-[0.9]">
            Every Award is <span className="accent-text">Earned</span>
          </h2>
          <p className="text-sm text-white/80 max-w-md mx-auto mb-6">
            Join the league, compete all season, and be recognized at the annual Apex Academy Banquet.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/league/register">Register a Team</Button>
            <Button variant="secondary" href="/league">League Home</Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
