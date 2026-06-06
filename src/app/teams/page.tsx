import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";

const TEAMS = [
  { id: "premier", age: "Premier", name: "Apex Premier", tagline: "The Flagship", record: "42-12", desc: "College-ready athletes competing in top national tournaments and showcase events. Direct recruiting exposure and professional-level development." },
  { id: "prospects", age: "Prospects", name: "Apex Prospects", tagline: "Next Up", record: "38-15", desc: "High-level competition and recruiting preparation. Building the bridge between development and showcase-level play." },
  { id: "14u", age: "14U", name: "Apex 14U", tagline: "The Future", record: null, desc: "Building the complete player. Emphasis on mechanical development, baseball IQ, and competitive experience at 90-foot fields." },
  { id: "12u", age: "12U", name: "Apex 12U", tagline: "Building Habits", record: null, desc: "Where strong habits are formed. Fundamental skill development, position training, and introduction to competitive travel baseball." },
  { id: "10u", age: "10U", name: "Apex 10U", tagline: "Day One", record: null, desc: "The starting point. Age-appropriate training, love of the game, and building the athletic foundation that everything else is built on." },
];

export default function TeamsPage() {
  return (
    <main>
      <PageHeader
        title="Our"
        accent="Teams"
        subtitle="Five competitive teams across age divisions. One development system. One standard."
        breadcrumb={[]}
      />

      <Section border="bottom">
        <div className="space-y-4">
          {TEAMS.map(t => (
            <a key={t.id} href={`/teams/${t.id}`} className="no-underline block bg-[#0d1117] rounded-2xl border border-white/[0.04] hover:border-[#17FC13]/15 transition-all group overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Age badge */}
                <div className="md:w-36 flex-shrink-0 px-6 py-5 md:py-6 flex items-center md:justify-center border-b md:border-b-0 md:border-r border-white/[0.04]">
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-[#17FC13] leading-none">{t.age}</div>
                    <div className="text-[10px] text-white/20 uppercase tracking-wider mt-1">{t.tagline}</div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 px-6 py-5 md:py-6">
                  <h2 className="text-base md:text-lg uppercase font-bold mb-2 group-hover:text-[#17FC13] transition-colors">{t.name}</h2>
                  <p className="text-[13px] text-white/40 leading-relaxed max-w-xl">{t.desc}</p>
                </div>

                {/* Record + arrow */}
                <div className="flex-shrink-0 px-6 py-5 md:py-6 flex items-center gap-5 border-t md:border-t-0 md:border-l border-white/[0.04]">
                  {t.record && (
                    <div className="text-right">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-white/20 mb-0.5">Record</div>
                      <div className="text-lg font-bold font-mono text-white/80">{t.record}</div>
                    </div>
                  )}
                  <svg className="w-5 h-5 text-white/10 group-hover:text-[#17FC13]/40 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 5l7 7-7 7" /></svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section size="lg">
        <div className="text-center">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Join the Program</div>
          <h2 className="text-2xl md:text-3xl font-bold uppercase mb-3 leading-[0.9]">
            Find Your <span className="accent-text">Team</span>
          </h2>
          <p className="text-sm text-white/40 max-w-md mx-auto mb-6">
            Tryouts and registration for all age groups. Contact us to learn more about joining the Apex Academy program.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/join">Register for Tryouts</Button>
            <Button variant="secondary" href="mailto:apexsportsgg@gmail.com">Contact Us</Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
