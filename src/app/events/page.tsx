import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";

const EVENTS = [
  {
    name: "Rising Prospects",
    href: "/events/rising-prospects",
    desc: "An exposure and development event designed for emerging players looking to compete at a higher level and gain recognition within the Apex Academy ecosystem.",
    tags: ["Exposure", "Development", "Evaluation"],
  },
  {
    name: "Sandlot League",
    href: "/events/sandlot-league",
    desc: "A community-focused recreational league experience built around fun, competition, and accessibility. Open to players of all skill levels.",
    tags: ["Community", "Recreation", "All Levels"],
  },
];

export default function EventsPage() {
  return (
    <main>
      <PageHeader
        title="Apex"
        accent="Events"
        subtitle="Programs and events beyond the core Apex Academy League."
        breadcrumb={[]}
      />

      <Section border="bottom">
        <div className="space-y-4 max-w-3xl">
          {EVENTS.map(e => (
            <a key={e.name} href={e.href} className="no-underline block bg-[#0d1117] rounded-2xl border border-white/[0.04] hover:border-[#17FC13]/15 transition-all group p-6">
              <h2 className="text-lg md:text-xl uppercase font-bold mb-2 group-hover:text-[#17FC13] transition-colors">{e.name}</h2>
              <p className="text-[13px] text-white/40 leading-relaxed mb-4">{e.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {e.tags.map(t => (
                  <span key={t} className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/35">{t}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </Section>

      <Section size="lg">
        <div className="text-center">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Get Involved</div>
          <h2 className="text-2xl md:text-3xl font-bold uppercase mb-3 leading-[0.9]">
            Questions About <span className="accent-text">Events?</span>
          </h2>
          <p className="text-sm text-white/40 max-w-md mx-auto mb-6">
            Contact us for more information about any Apex Academy event or program.
          </p>
          <Button variant="secondary" href="mailto:apexsportsgg@gmail.com">Contact Us</Button>
        </div>
      </Section>
    </main>
  );
}
