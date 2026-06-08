import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";

/* ── Section lead: accent-dash eyebrow + heading (+ optional sub) ── */
function Lead({ eyebrow, title, accent, sub, center }: { eyebrow: string; title: string; accent?: string; sub?: string; center?: boolean }) {
  return (
    <div className={center ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
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

const TEAMS = [
  { id: "premier", age: "Premier", name: "Apex Premier", tagline: "The Flagship", desc: "The highest level of competition within the organization. College-ready athletes competing against elite competition throughout New England and beyond.", focus: ["Recruiting Exposure", "National Events", "Advanced Development", "College Preparation"] },
  { id: "prospects", age: "Prospects", name: "Apex Prospects", tagline: "Next Up", desc: "High-level competition for athletes preparing to transition into showcase baseball and advanced recruiting opportunities.", focus: ["Exposure Preparation", "Advanced Skill Development", "Recruiting Readiness"] },
  { id: "14u", age: "14U", name: "Apex 14U", tagline: "The Bridge", desc: "The bridge between youth baseball and advanced competition. Players begin preparing for larger fields, increased game speed, and higher expectations.", focus: ["Baseball IQ", "Positional Development", "Physical Preparation"] },
  { id: "12u", age: "12U", name: "Apex 12U", tagline: "Building Habits", desc: "Building complete players through fundamentals, competition, and structured development.", focus: ["Skill Development", "Position Training", "Athletic Foundations"] },
  { id: "10u", age: "10U", name: "Apex 10U", tagline: "Day One", desc: "Introducing players to competitive baseball while building confidence, athleticism, and a love for the game.", focus: ["Fundamentals", "Athletic Movement", "Positive Experiences"] },
];

const PATHWAY = [
  { label: "10U", sub: "Foundation", href: "/teams/10u" },
  { label: "12U", sub: "Development", href: "/teams/12u" },
  { label: "14U", sub: "Transition", href: "/teams/14u" },
  { label: "Prospects", sub: "Preparation", href: "/teams/prospects" },
  { label: "Premier", sub: "Competition", href: "/teams/premier" },
  { label: "College", sub: "Next Level", href: "/alumni", dest: true },
];

const PHILOSOPHY = [
  { title: "One System", desc: "Every team follows the same development framework — training methodology, practice structure, and coaching approach are consistent across all age groups." },
  { title: "Position Development", desc: "Players are developed at positions that align with their long-term trajectory, not just where the team needs them today." },
  { title: "Recruiting Preparation", desc: "From player profiles to verified metrics to college coach exposure, the recruiting process begins before players realize it." },
];

export default function TeamsPage() {
  return (
    <main>
      {/* ══════════ HEADER ══════════ */}
      <section className="relative overflow-hidden border-b border-[#171717]">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_-10%,_rgba(23,252,19,0.06)_0%,_transparent_55%)]" />
        <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 pt-24 md:pt-28 pb-10 md:pb-12">
          <FadeIn>
            <div className="flex items-center gap-2 mb-5 text-[10px] font-medium uppercase tracking-[0.2em]">
              <a href="/" className="text-white/60 no-underline hover:text-white/90 transition-colors">Home</a>
              <span className="text-white/10">/</span>
              <span className="text-[#17FC13]/60">Teams</span>
            </div>
            <h1 className="text-3xl md:text-5xl uppercase font-bold leading-[0.9] mb-4">
              Our <span className="accent-text">Teams</span>
            </h1>
            <p className="text-[15px] md:text-[16px] text-white/80 max-w-2xl leading-[1.75]">
              Five teams. One development system. One standard. From first-time travel players to college-bound athletes, every Apex team follows the same commitment to development, competition, and opportunity.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ THE PATHWAY ══════════ */}
      <Section border="bottom">
        <FadeIn>
          <Lead eyebrow="Player Development" title="The" accent="Pathway" sub="Every player enters the system at the level that fits their development — and the goal is always the same: prepare them for the next one." />
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="flex flex-col md:flex-row items-stretch gap-2 mt-8">
            {PATHWAY.map((step, i) => (
              <div key={step.label} className="flex flex-col md:flex-row items-center md:flex-1 gap-2">
                <a href={step.href} className={`w-full md:flex-1 border py-5 px-3 text-center no-underline transition-all group ${step.dest ? "border-[#17FC13]/30 bg-[#17FC13]/[0.04] hover:border-[#17FC13]/50" : "border-[#171717] bg-radial hover:border-[#17FC13]/30"}`}>
                  <div className={`text-lg md:text-xl font-bold leading-none transition-colors ${step.dest ? "text-[#17FC13]" : "text-white group-hover:text-[#17FC13]"}`}>{step.label}</div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/50 mt-1.5">{step.sub}</div>
                </a>
                {i < PATHWAY.length - 1 && (
                  <span aria-hidden className="text-white/25 text-sm rotate-90 md:rotate-0 shrink-0">&rarr;</span>
                )}
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* ══════════ OUR PROGRAMS ══════════ */}
      <Section border="bottom" bg="radial">
        <FadeIn>
          <Lead eyebrow="The Roster" title="Our" accent="Programs" sub="One standard across every age group. Select a team to view its roster, coaches, and schedule." />
        </FadeIn>
        <div className="space-y-3 mt-8">
          {TEAMS.map((t, i) => (
            <FadeIn key={t.id} delay={(i % 3) * 0.05}>
              <a href={`/teams/${t.id}`} className="group block border border-[#171717] bg-black p-6 hover:border-[#17FC13]/25 transition-all no-underline">
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                  {/* Identity */}
                  <div className="md:w-36 shrink-0">
                    <div className="text-3xl md:text-4xl font-bold text-[#17FC13] leading-none">{t.age}</div>
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl uppercase font-bold mb-2 group-hover:text-[#17FC13] transition-colors">{t.name}</h3>
                    <p className="text-[13px] text-white/70 leading-[1.7] mb-3.5 max-w-2xl">{t.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {t.focus.map((f) => (
                        <span key={f} className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 border border-[#171717] text-white/65">{f}</span>
                      ))}
                    </div>
                  </div>
                  {/* Arrow */}
                  <svg className="hidden md:block w-5 h-5 text-white/15 group-hover:text-[#17FC13]/50 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 5l7 7-7 7" /></svg>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ══════════ COLLEGE PLACEMENT ══════════ */}
      <Section border="bottom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <FadeIn>
            <Lead eyebrow="Results" title="College" accent="Placement" />
            <p className="text-[14px] text-white/75 leading-[1.75] mt-5 mb-4">
              The ultimate measure of a development program is where its players end up. Apex Academy athletes have advanced to programs across NCAA Division I, II, III, NAIA, and NJCAA.
            </p>
            <p className="text-[13px] text-white/60 leading-[1.7] mb-6">
              Every team operates with the same development standards, coaching philosophy, and commitment to preparing players for the next level — whether that means the next age group or a college roster.
            </p>
            <Button href="/alumni" variant="secondary" size="small">View Alumni</Button>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="border border-[#171717] bg-radial p-6 md:p-7">
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/50 mb-5">Development Philosophy</div>
              <div className="space-y-5">
                {PHILOSOPHY.map((item) => (
                  <div key={item.title}>
                    <div className="text-[13px] font-bold uppercase tracking-wide text-white mb-1.5">{item.title}</div>
                    <div className="text-[12px] text-white/65 leading-[1.7]">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* ══════════ CTA ══════════ */}
      <Section size="lg" bg="radial">
        <FadeIn className="text-center max-w-xl mx-auto">
          <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Join The Program</div>
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4 leading-[0.9]">
            Find Your <span className="accent-text">Team</span>
          </h2>
          <p className="text-[14px] text-white/70 leading-[1.7] mb-7">
            Tryouts and registration for all age groups. Reach out to learn more about joining the Apex Academy program.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/join">Register for Tryouts</Button>
            <Button variant="secondary" href="mailto:admin@apexacademy.gg">Contact Us</Button>
          </div>
        </FadeIn>
      </Section>
    </main>
  );
}
