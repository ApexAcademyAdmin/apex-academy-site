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

const HOW_IT_WORKS = [
  { t: "Weeknight Games", d: "Every game is played Wednesday–Friday evening — weekends stay free for tournaments and family time." },
  { t: "Age Divisions", d: "Five age groups from 10U through 18U, each with its own structure and age-appropriate rules." },
  { t: "MLB-Style Rules", d: "Pitch counts, rest requirements, leadoffs, stealing, and dropped third strike — all enforced by age." },
  { t: "Season & Championship", d: `A full summer season (${LEAGUE_META.seasonStart} – ${LEAGUE_META.seasonEnd}) leading to playoffs and a Championship Weekend.` },
  { t: "Turnkey For Teams", d: "Bring your roster — we handle fields, umpires, scheduling, standings, and league operations." },
  { t: "Affordable Entry", d: `${LEAGUE_META.registrationFee} per team, all in. A professional league experience without the travel-ball price tag.` },
];

const WHY_JOIN = [
  { t: "More Competitive Games", d: "Meaningful weeknight games that add quality innings and at-bats to every player's season." },
  { t: "No Tournament Conflicts", d: "Weeknight scheduling fits around your weekend travel and tournament commitments." },
  { t: "Player Development", d: "A development-first environment built to make every player better — not just keep score." },
  { t: "Competitive Balance", d: "Premier and Prospect divisions keep teams matched with the right level of competition." },
  { t: "Run For You", d: "Scheduling, certified umpires, fields, and live standings handled — so you can focus on coaching." },
  { t: "Recognition", d: "Regular season and postseason awards, All-League teams, and annual banquet recognition." },
];

const AUDIENCES = [
  { t: "Town Programs", d: "Add competitive midweek games without disrupting your existing season or schedule." },
  { t: "Travel Programs", d: "Keep players game-ready between tournaments with meaningful weekday reps." },
  { t: "Independent Teams", d: "Bring a roster and play — we handle scheduling, fields, umpires, and operations." },
];

export default function LeaguePage() {
  return (
    <main>
      {/* ══════════ HERO ══════════ */}
      <section className="relative overflow-hidden border-b border-[#171717]">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,_rgba(23,252,19,0.08)_0%,_transparent_55%)]" />
        <div className="relative max-w-[1120px] mx-auto px-6 pt-24 md:pt-28 pb-12 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#17FC13]/20 bg-[#17FC13]/[0.04] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/80">{LEAGUE_META.season} · Registration Open</span>
            </div>
            <h1 className="text-4xl md:text-6xl uppercase font-bold leading-[0.9] mb-5">
              Elevating Baseball<br />Across <span className="accent-text">New England</span>
            </h1>
            <p className="text-[15px] md:text-[17px] text-white/80 leading-[1.7] max-w-2xl mx-auto mb-6">
              A competitive, development-focused league built to strengthen the town baseball experience while creating more opportunities for players, teams, and communities throughout the region.
            </p>
            <p className="text-[12px] text-white/55 mb-8">
              {LEAGUE_META.seasonStart} – {LEAGUE_META.seasonEnd} &middot; {LEAGUE_META.registrationFee} / team &middot; {LEAGUE_META.location} &middot; Games Wed–Fri
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Button href="/league/register">Register Your Team</Button>
              <Button href="#how" variant="secondary">How It Works</Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ WHY THE LEAGUE EXISTS ══════════ */}
      <Section size="md">
        <FadeIn className="max-w-2xl mx-auto text-center">
          <Lead center eyebrow="Why The League Exists" title="Built To Strengthen" accent="Town Ball" />
          <div className="mt-6 space-y-3 text-[14px] md:text-[15px] text-white/80 leading-[1.7]">
            <p>Town baseball is one of the most important parts of youth sports — and it should stay that way.</p>
            <p>But players deserve more chances to compete, develop, and stay engaged across the full season.</p>
            <p className="text-white font-semibold">This league exists to create those opportunities — a supplement to town ball, never a replacement.</p>
          </div>
        </FadeIn>
      </Section>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <Section id="how" size="md" border="top" bg="radial">
        <FadeIn><Lead eyebrow="How It Works" title="The" accent="Format" sub="A professionally run league with a simple, predictable structure for every team." /></FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-7">
          {HOW_IT_WORKS.map((c, i) => (
            <FadeIn key={c.t} delay={(i % 3) * 0.06}>
              <div className="border border-[#171717] bg-black p-5 h-full">
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/45 mb-3">0{i + 1}</div>
                <h3 className="text-sm uppercase font-bold mb-2">{c.t}</h3>
                <p className="text-[12px] text-white/65 leading-[1.7]">{c.d}</p>
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

      {/* ══════════ WHY TEAMS JOIN ══════════ */}
      <Section size="md" border="top" bg="radial">
        <FadeIn><Lead eyebrow="Why Teams Join" title="A Better" accent="Experience" /></FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-7">
          {WHY_JOIN.map((c, i) => (
            <FadeIn key={c.t} delay={(i % 3) * 0.06}>
              <div className="border border-[#171717] bg-black p-5 h-full hover:border-[#17FC13]/20 transition-colors">
                <h3 className="text-sm uppercase font-bold mb-2">{c.t}</h3>
                <p className="text-[12px] text-white/65 leading-[1.7]">{c.d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ══════════ BUILT FOR EVERY TEAM ══════════ */}
      <Section size="md" border="top">
        <FadeIn><Lead eyebrow="Built For Every Team" title="One League," accent="Every Program" /></FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-7">
          {AUDIENCES.map((a, i) => (
            <FadeIn key={a.t} delay={i * 0.06}>
              <div className="border border-[#171717] bg-radial p-6 h-full">
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/50 mb-3">0{i + 1}</div>
                <h3 className="text-base uppercase font-bold mb-2">{a.t}</h3>
                <p className="text-[12px] text-white/65 leading-[1.7]">{a.d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
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
