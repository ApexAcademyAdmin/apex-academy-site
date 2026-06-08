import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";
import { LEAGUE_META } from "@/lib/league-data";

/* ── Section lead: accent-dash eyebrow + heading (+ optional sub) ── */
function Lead({ eyebrow, title, accent, sub, center }: { eyebrow: string; title: string; accent?: string; sub?: string; center?: boolean }) {
  return (
    <div className={center ? "text-center max-w-2xl mx-auto" : ""}>
      <div className={`flex items-center gap-2.5 mb-3 ${center ? "justify-center" : ""}`}>
        <span aria-hidden className="w-5 h-px bg-[#17FC13]/50 shrink-0" />
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/60">{eyebrow}</span>
        {center && <span aria-hidden className="w-5 h-px bg-[#17FC13]/50 shrink-0" />}
      </div>
      <h2 className="text-2xl md:text-3xl uppercase font-bold leading-[0.95]">
        {title} {accent && <span className="accent-text">{accent}</span>}
      </h2>
      {sub && <p className="text-[14px] text-white/70 leading-[1.7] mt-3.5">{sub}</p>}
    </div>
  );
}

const DIFFERENT = [
  { t: "Organized Competition", d: "Professionally run play with certified umpires, enforced rules, and live standings." },
  { t: "Town-to-Travel Bridge", d: "Travel-level structure and opportunity inside a community-based league." },
  { t: "Player Recognition", d: "Regular season and postseason awards that honor real achievement." },
  { t: "Banquet Celebration", d: "A season-ending Apex Academy Banquet honoring players, teams, and coaches." },
  { t: "Showcase Opportunities", d: "A season-ending showcase spotlighting the league's top performers." },
  { t: "College Coach Exposure", d: "College coaches are invited to evaluate selected players at the showcase." },
  { t: "Professional Platform", d: "Live standings, schedules, statistics, and a team page for every club." },
  { t: "Community-Based", d: "Built around local players, families, and programs across the region." },
];

const AWARDS = ["Regular Season Awards", "Playoff Awards", "Division Champions", "Individual Awards", "Team Recognition", "Coach Recognition"];

const SHOWCASE_POINTS = ["Top Players Selected", "Showcase-Style Games", "College Coaches Invited", "Evaluation & Exposure"];

export default function LeaguePage() {
  return (
    <main>
      {/* ══════════ HERO ══════════ */}
      <section className="relative overflow-hidden border-b border-[#171717]">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,_rgba(23,252,19,0.08)_0%,_transparent_55%)]" />
        <div className="relative max-w-[1120px] mx-auto px-6 pt-24 md:pt-28 pb-12 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl uppercase font-bold leading-[0.9] mb-5">
              Elevating The Town<br />Baseball <span className="accent-text">Experience</span>
            </h1>
            <p className="text-[15px] md:text-[17px] text-white/80 leading-[1.7] max-w-2xl mx-auto mb-6">
              A premier, community-based league that brings select travel-ball elements — postseason awards, an annual banquet celebration, and showcase exposure for top performers — into organized local play. More competition, more recognition, and more opportunity, without leaving your community behind.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap mt-8">
              <Button href="/league/register">Register Your Team</Button>
              <Button href="#divisions" variant="secondary">Explore Divisions</Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ WHY THIS LEAGUE EXISTS ══════════ */}
      <Section size="md">
        <FadeIn className="max-w-2xl mx-auto text-center">
          <Lead center eyebrow="Why This League Exists" title="Bridging Town &" accent="Travel" />
          <div className="mt-6 space-y-3 text-[14px] md:text-[15px] text-white/80 leading-[1.7]">
            <p>Town baseball is the heart of the game — local, accessible, and community-built. Travel baseball opens the door to higher competition and exposure. Families shouldn&apos;t have to choose between the two.</p>
            <p>That&apos;s why every game is played on a weeknight. Weekends stay open for tournaments and travel — so players keep their town team and their travel commitments, and still get more competitive, organized baseball in between.</p>
            <p>It&apos;s a bridge, not a barrier: travel-level organization, recognition, and opportunity for the players and teams already invested in their town programs.</p>
            <p className="text-white font-semibold">A better town baseball experience — built to strengthen local baseball, not replace it.</p>
          </div>
        </FadeIn>
      </Section>

      {/* ══════════ WHAT MAKES IT DIFFERENT ══════════ */}
      <Section size="md" border="top" bg="radial">
        <FadeIn><Lead center eyebrow="The Difference" title="What Sets It" accent="Apart" sub="Travel-level structure and opportunity, brought into a community-based league." /></FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
          {DIFFERENT.map((c, i) => (
            <FadeIn key={c.t} delay={(i % 4) * 0.05}>
              <div className="border border-[#171717] bg-black p-5 h-full hover:border-[#17FC13]/20 transition-colors">
                <h3 className="text-[13px] uppercase font-bold mb-2 leading-tight">{c.t}</h3>
                <p className="text-[11.5px] text-white/65 leading-[1.65]">{c.d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ══════════ PREMIER & PROSPECT DIVISIONS ══════════ */}
      <Section id="divisions" size="md" border="top">
        <FadeIn><Lead center eyebrow="Competition Structure" title="Premier &" accent="Prospect" sub="Two divisions per age group (10U–18U) create competitive balance and a better experience for everyone." /></FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8 max-w-3xl mx-auto">
          <FadeIn>
            <div className="border border-[#17FC13]/25 bg-[#17FC13]/[0.03] p-6 h-full">
              <h3 className="text-lg uppercase font-bold mb-1">Premier Division</h3>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#17FC13]/60 mb-3">Competitive</div>
              <p className="text-[13px] text-white/70 leading-[1.7]">Higher-level competition for experienced, competitive teams.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="border border-[#171717] bg-radial p-6 h-full">
              <h3 className="text-lg uppercase font-bold mb-1">Prospect Division</h3>
              <div className="text-[10px] font-bold uppercase tracking-wider text-white/45 mb-3">Development</div>
              <p className="text-[13px] text-white/70 leading-[1.7]">Development-focused competition built for growth and confidence.</p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* ══════════ RECOGNITION & BANQUET ══════════ */}
      <Section size="md" border="top" bg="radial">
        <FadeIn><Lead center eyebrow="Recognition" title="Earned On The Field," accent="Celebrated Off It" sub="Players and teams deserve to be recognized for the work they put in all season long." /></FadeIn>
        <FadeIn delay={0.1}>
          <div className="border border-[#17FC13]/20 bg-black p-6 md:p-8 mt-8 max-w-3xl mx-auto text-center">
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/50 mb-3">The Celebration</div>
            <h3 className="text-xl uppercase font-bold mb-3">The Apex Academy Banquet</h3>
            <p className="text-[13px] md:text-[14px] text-white/70 leading-[1.75] mb-6 max-w-xl mx-auto">
              The season culminates at the annual Apex Academy Banquet — a professional, family-friendly celebration where regular season and playoff accomplishments are honored and awards are presented to the players, teams, and coaches who earned them.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {AWARDS.map((a) => (
                <span key={a} className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#171717] bg-radial text-[10px] font-bold uppercase tracking-wider text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13]" />{a}
                </span>
              ))}
            </div>
            <Button href="/league/banquet" variant="secondary" size="small">Awards &amp; Banquet</Button>
          </div>
        </FadeIn>
      </Section>

      {/* ══════════ SHOWCASE / ALL-STAR EVENT ══════════ */}
      <Section size="md" border="top">
        <FadeIn><Lead center eyebrow="Season-Ending Showcase" title="A Stage For Top" accent="Performers" sub="The league's standout players earn selection to a season-ending showcase — a celebration of the region's best talent and a reward for a season of work." /></FadeIn>
        <FadeIn delay={0.1}>
          <div className="border border-[#17FC13]/20 bg-radial p-6 md:p-8 mt-8 max-w-3xl mx-auto text-center">
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/50 mb-3">All-New England Prospect Games</div>
            <h3 className="text-xl uppercase font-bold mb-3">Seen Beyond The Local Game</h3>
            <p className="text-[13px] md:text-[14px] text-white/70 leading-[1.75] mb-6 max-w-xl mx-auto">
              Selected players compete in showcase-style games as part of the All-New England Prospect Games. College coaches are invited to attend, giving top performers the chance to be evaluated and gain exposure beyond the local game.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {SHOWCASE_POINTS.map((p) => (
                <span key={p} className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#171717] bg-black text-[10px] font-bold uppercase tracking-wider text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13]" />{p}
                </span>
              ))}
            </div>
            <Button href="/league/showcase" variant="secondary" size="small">Showcase Details</Button>
          </div>
        </FadeIn>
      </Section>

      {/* ══════════ FINAL CTA ══════════ */}
      <Section size="lg" border="top" bg="radial">
        <FadeIn className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl uppercase font-bold leading-[0.9] mb-4">
            Ready To Join The <span className="accent-text">League?</span>
          </h2>
          <p className="text-[14px] text-white/70 leading-[1.7] mb-7">
            Join organizations across the region helping create a better baseball experience for players and families.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Button href="/league/register">Register Your Team</Button>
            <Button href="/league/rules" variant="secondary">Learn More</Button>
          </div>
          <p className="text-[12px] text-white/45 mt-6">Registration deadline: {LEAGUE_META.registrationDeadline}</p>
        </FadeIn>
      </Section>
    </main>
  );
}
