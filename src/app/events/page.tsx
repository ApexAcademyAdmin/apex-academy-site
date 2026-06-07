import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";

export default function EventsPage() {
  return (
    <main>
      <PageHeader
        title="Apex"
        accent="Events"
        subtitle="Annual events and programs hosted by Apex Academy."
        breadcrumb={[]}
      />

      <Section border="bottom">
        <div className="max-w-3xl">
          <a href="/events/rising-prospects" className="no-underline block bg-[#0d1117] rounded-2xl border border-white/[0.04] hover:border-[#17FC13]/15 transition-all group p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#17FC13]/10 text-[#17FC13]/50">Annual Event</span>
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] text-white/70">Combine</span>
            </div>
            <h2 className="text-lg md:text-xl uppercase font-bold mb-2 group-hover:text-[#17FC13] transition-colors">Rising Prospects Combine</h2>
            <p className="text-[13px] text-white/80 leading-relaxed mb-4">
              An annual prospect combine hosted by Apex Academy with guaranteed college coach attendance. Professional testing, verified player profiles through The Academy app, and direct college exposure. Free for Apex Academy athletes.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Guaranteed Coaches", "Verified Profiles", "The Academy App", "Free for Apex Athletes"].map(t => (
                <span key={t} className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/75">{t}</span>
              ))}
            </div>
          </a>
        </div>
      </Section>

      <Section size="lg">
        <div className="text-center">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Questions</div>
          <h2 className="text-2xl md:text-3xl font-bold uppercase mb-3 leading-[0.9]">
            Want to <span className="accent-text">Learn More?</span>
          </h2>
          <p className="text-sm text-white/80 max-w-md mx-auto mb-6">
            Contact us for more information about Apex Academy events and programs.
          </p>
          <Button variant="secondary" href="mailto:apexsportsgg@gmail.com">Contact Us</Button>
        </div>
      </Section>
    </main>
  );
}
