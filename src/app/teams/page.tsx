import { Section } from "@/components/Section";
import { Button } from "@/components/Button";

// ═══════════════════════════════════════
// DATA
// ═══════════════════════════════════════

const TEAMS = [
  {
    id: "premier",
    age: "Premier",
    name: "Apex Premier",
    tagline: "The Flagship",
    record: "42-12",
    rosterCount: 14,
    headCoach: "Staff TBA",
    desc: "The highest level of competition within the organization. College-ready athletes competing against elite competition throughout New England and beyond.",
    focus: ["Recruiting Exposure", "National Events", "Advanced Development", "College Preparation"],
  },
  {
    id: "prospects",
    age: "Prospects",
    name: "Apex Prospects",
    tagline: "Next Up",
    record: "38-15",
    rosterCount: 11,
    headCoach: "Staff TBA",
    desc: "High-level competition for athletes preparing to transition into showcase baseball and advanced recruiting opportunities.",
    focus: ["Exposure Preparation", "Advanced Skill Development", "Recruiting Readiness"],
  },
  {
    id: "14u",
    age: "14U",
    name: "Apex 14U",
    tagline: "The Bridge",
    record: null,
    rosterCount: null,
    headCoach: "Staff TBA",
    desc: "The bridge between youth baseball and advanced competition. Players begin preparing for larger fields, increased game speed, and higher expectations.",
    focus: ["Baseball IQ", "Positional Development", "Physical Preparation"],
  },
  {
    id: "12u",
    age: "12U",
    name: "Apex 12U",
    tagline: "Building Habits",
    record: null,
    rosterCount: null,
    headCoach: "Staff TBA",
    desc: "Building complete players through fundamentals, competition, and structured development.",
    focus: ["Skill Development", "Position Training", "Athletic Foundations"],
  },
  {
    id: "10u",
    age: "10U",
    name: "Apex 10U",
    tagline: "Day One",
    record: null,
    rosterCount: null,
    headCoach: "Staff TBA",
    desc: "Introducing players to competitive baseball while building confidence, athleticism, and a love for the game.",
    focus: ["Fundamentals", "Athletic Movement", "Positive Experiences"],
  },
];

const PATHWAY = [
  { label: "10U", sub: "Foundation" },
  { label: "12U", sub: "Development" },
  { label: "14U", sub: "Transition" },
  { label: "Prospects", sub: "Preparation" },
  { label: "Premier", sub: "Competition" },
  { label: "College Baseball", sub: "Next Level" },
];

// ═══════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════

export default function TeamsPage() {
  return (
    <main>
      {/* HEADER */}
      <div className="pt-24 md:pt-28 pb-8 md:pb-10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="flex items-center gap-2 mb-6 text-[10px] font-medium uppercase tracking-[0.2em]">
            <a href="/" className="text-white/65 no-underline hover:text-white/90 transition-colors">Home</a>
            <span className="text-white/10">/</span>
            <span className="text-[#17FC13]/60">Teams</span>
          </div>

          <h1 className="text-3xl md:text-4xl uppercase font-bold leading-[0.85] mb-4">
            Our <span className="accent-text">Teams</span>
          </h1>
          <p className="text-base text-white/90 max-w-2xl leading-relaxed">
            Five teams. One development system. One standard. From first-time travel players to college-bound athletes, every Apex team follows the same commitment to development, competition, and opportunity.
          </p>
        </div>
      </div>

      {/* DEVELOPMENT PATHWAY */}
      <Section border="bottom">
        <div className="mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Player Development</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold mb-2">The <span className="accent-text">Pathway</span></h2>
          <p className="text-sm text-white/80 max-w-xl">Every player enters the system at the level that fits their development. The goal is always the same — prepare them for the next one.</p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-0">
          {PATHWAY.map((step, i) => (
            <div key={step.label} className="flex-1 flex items-center">
              <div className={`flex-1 text-center py-5 px-3 border border-white/[0.04] ${i === 0 ? "rounded-t-xl md:rounded-l-xl md:rounded-tr-none" : ""} ${i === PATHWAY.length - 1 ? "rounded-b-xl md:rounded-r-xl md:rounded-bl-none border-[#17FC13]/15 bg-[#17FC13]/[0.02]" : ""} ${i > 0 ? "-mt-px md:mt-0 md:-ml-px" : ""}`}>
                <div className={`text-lg md:text-xl font-bold ${i === PATHWAY.length - 1 ? "text-[#17FC13]" : "text-white/80"}`}>{step.label}</div>
                <div className="text-[10px] text-white/70 uppercase tracking-wider mt-0.5">{step.sub}</div>
              </div>
              {i < PATHWAY.length - 1 && (
                <div className="hidden md:flex items-center text-white/10 -mx-1 z-10">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 5l7 7-7 7" /></svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* TEAM CARDS */}
      <Section border="bottom">
        <div className="mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Roster</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold">Our <span className="accent-text">Programs</span></h2>
        </div>

        <div className="space-y-5">
          {TEAMS.map(t => (
            <a key={t.id} href={`/teams/${t.id}`} className="no-underline block bg-[#0d1117] rounded-2xl border border-white/[0.04] hover:border-[#17FC13]/15 transition-all group">
              <div className="flex flex-col lg:flex-row">
                {/* Age + Identity */}
                <div className="lg:w-44 flex-shrink-0 px-6 py-6 flex items-center lg:justify-center border-b lg:border-b-0 lg:border-r border-white/[0.04]">
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-[#17FC13] leading-none">{t.age}</div>
                    <div className="text-[10px] text-white/60 uppercase tracking-wider mt-1">{t.tagline}</div>
                  </div>
                </div>

                {/* Main info */}
                <div className="flex-1 px-6 py-6">
                  <h3 className="text-lg md:text-xl uppercase font-bold mb-2 group-hover:text-[#17FC13] transition-colors">{t.name}</h3>
                  <p className="text-[13px] text-white/80 leading-relaxed mb-4 max-w-lg">{t.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {t.focus.map(f => (
                      <span key={f} className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/75">{f}</span>
                    ))}
                  </div>
                </div>

                {/* Stats + CTA */}
                <div className="flex-shrink-0 px-6 py-6 flex items-center gap-6 border-t lg:border-t-0 lg:border-l border-white/[0.04]">
                  <div className="flex gap-5">
                    {t.record && (
                      <div>
                        <div className="text-[9px] font-bold uppercase tracking-wider text-white/60 mb-0.5">Record</div>
                        <div className="text-lg font-bold font-mono text-white/80">{t.record}</div>
                      </div>
                    )}
                    {t.rosterCount && (
                      <div>
                        <div className="text-[9px] font-bold uppercase tracking-wider text-white/60 mb-0.5">Roster</div>
                        <div className="text-lg font-bold font-mono text-white/80">{t.rosterCount}</div>
                      </div>
                    )}
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-wider text-white/60 mb-0.5">Coach</div>
                      <div className="text-[13px] font-medium text-white/60">{t.headCoach}</div>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-white/10 group-hover:text-[#17FC13]/40 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 5l7 7-7 7" /></svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* COLLEGE PLACEMENT */}
      <Section border="bottom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Results</div>
            <h2 className="text-2xl md:text-3xl uppercase font-bold mb-3">College <span className="accent-text">Placement</span></h2>
            <p className="text-sm text-white/80 leading-relaxed mb-4">
              The ultimate measure of a development program is where its players end up. Apex Academy athletes have advanced to programs across NCAA Division I, II, III, NAIA, and NJCAA.
            </p>
            <p className="text-[12px] text-white/70 leading-relaxed">
              Every team in the organization operates with the same development standards, coaching philosophy, and commitment to preparing players for the next level — whether that means the next age group or a college roster.
            </p>
          </div>

          <div className="bg-[#0d1117] rounded-2xl border border-white/[0.04] p-6">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/50 mb-4">Development Philosophy</div>
            {[
              { title: "One System", desc: "Every team follows the same development framework — training methodology, practice structure, and coaching approach are consistent across all age groups." },
              { title: "Position Development", desc: "Players are developed at positions that align with their long-term trajectory, not just where the team needs them today." },
              { title: "Recruiting Preparation", desc: "From player profiles to verified metrics to college coach exposure, the recruiting process begins before players realize it." },
            ].map(item => (
              <div key={item.title} className="mb-4 last:mb-0">
                <div className="text-[13px] font-bold text-white/80 mb-1">{item.title}</div>
                <div className="text-[12px] text-white/75 leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section size="lg">
        <div className="text-center">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Join the Program</div>
          <h2 className="text-2xl md:text-3xl font-bold uppercase mb-3 leading-[0.9]">
            Find Your <span className="accent-text">Team</span>
          </h2>
          <p className="text-sm text-white/80 max-w-md mx-auto mb-6">
            Tryouts and registration for all age groups. Contact us to learn more about joining the Apex Academy program.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/join">Register for Tryouts</Button>
            <Button variant="secondary" href="mailto:admin@apexacademy.gg">Contact Us</Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
