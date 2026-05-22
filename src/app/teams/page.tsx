import Image from "next/image";
import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";
import { CONTACT } from "@/lib/constants";

const TEAMS = [
  { id: "10u", age: "10U", name: "Apex 10U Youth", tagline: "Day One", record: "—", desc: "The starting point. Age-appropriate training, love of the game, and building the athletic foundation." },
  { id: "12u", age: "12U", name: "Apex 12U Youth", tagline: "Building Habits", record: "—", desc: "Where strong habits are built. Fundamental skill development, position training, and competitive travel baseball." },
  { id: "14u", age: "14U", name: "Apex 14U Youth", tagline: "The Future", record: "—", desc: "Building the complete player. Emphasis on mechanical development, baseball IQ, and competitive experience." },
  { id: "prospects", age: "Prospects", name: "Apex Prospects", tagline: "Next Up", record: "38-15", desc: "High-level competition and recruiting preparation. Building the bridge between development and showcase-level play." },
  { id: "premier", age: "Premier", name: "Apex Premier", tagline: "The Flagship", record: "42-12", desc: "College-ready athletes competing in top national tournaments and showcase events." },
];

export default function TeamsPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="relative max-w-[1120px] mx-auto px-6 pt-28 md:pt-36 pb-6">
          <div className="flex items-center gap-2 mb-5 text-[10px] font-medium uppercase tracking-[0.2em]">
            <a href="/" className="text-white/20 no-underline hover:text-white/40">Home</a>
            <span className="text-white/10">/</span>
            <span className="text-[#17FC13]/50">Teams</span>
          </div>
          <h1 className="text-3xl md:text-4xl uppercase font-bold leading-[0.9] mb-2">
            Our <span className="accent-text">Teams</span>
          </h1>
          <p className="text-[14px] text-white/30 leading-[1.7] max-w-lg">Five competitive teams across age divisions. One development system. One standard.</p>
        </div>
      </section>

      {/* Teams */}
      <div className="max-w-[1120px] mx-auto px-6 py-6 space-y-3">
        {TEAMS.map((t, i) => (
          <FadeIn key={t.id} delay={i * 0.04}>
            <a href={`/teams/${t.id}`} className="no-underline block border border-[#171717] bg-radial hover:border-[#17FC13]/20 transition-all group">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                <div className="md:col-span-2 p-5 border-b md:border-b-0 md:border-r border-[#171717] flex items-center justify-center md:justify-start gap-3">
                  <div className="text-3xl md:text-4xl font-bold text-[#17FC13] leading-none">{t.age}</div>
                </div>
                <div className="md:col-span-7 p-5">
                  <h2 className="text-sm md:text-base uppercase font-bold mb-1 group-hover:text-[#17FC13] transition-colors">{t.name}</h2>
                  <p className="text-[12px] text-white/35 leading-[1.6]">{t.desc}</p>
                </div>
                <div className="md:col-span-3 p-5 border-t md:border-t-0 md:border-l border-[#171717] flex items-center justify-between md:justify-end gap-4">
                  {t.record !== "—" && (
                    <div className="text-right">
                      <div className="text-[8px] font-bold uppercase tracking-wider text-white/15">Record</div>
                      <div className="text-sm font-bold">{t.record}</div>
                    </div>
                  )}
                  <svg className="w-4 h-4 text-white/10 group-hover:text-[#17FC13]/40 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 5l7 7-7 7" /></svg>
                </div>
              </div>
            </a>
          </FadeIn>
        ))}
      </div>

      {/* CTA */}
      <div className="max-w-[1120px] mx-auto px-6 pb-8">
        <div className="border border-[#171717] bg-radial p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm uppercase font-bold mb-1">Join A Team</h3>
            <p className="text-[11px] text-white/25">Register for upcoming tryouts.</p>
          </div>
          <Button href="/join" size="small">Register</Button>
        </div>
      </div>
    </>
  );
}
