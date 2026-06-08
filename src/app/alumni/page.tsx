import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";
import { CONTACT } from "@/lib/constants";

const PRO = { name: "Christian Oliveira", org: "Los Angeles Dodgers" };

const COMMITMENTS = [
  { name: "Cameron Flaherty", school: "Gordon College / St. Michael's" },
  { name: "Kevin Clark", school: "UMass Boston" },
  { name: "Kyle Cummings", school: "UMass Boston" },
  { name: "Christian Figueroa", school: "Wentworth" },
  { name: "Aidan O'Sullivan", school: "Haverford College" },
  { name: "Ian Born", school: "Swarthmore College" },
  { name: "Conner Seeley", school: "UMass Boston / Salisbury" },
  { name: "Matthew Lewis", school: "UMass Dartmouth / Bunker Hill CC" },
  { name: "Oliver Henke", school: "Swarthmore College" },
  { name: "Stefan Alexandrov", school: "Wheaton College" },
  { name: "Matthew Mariani", school: "Dickinson College" },
  { name: "Brendan Sack", school: "Bunker Hill CC" },
  { name: "Seth Sullivan", school: "Salem State" },
  { name: "Brandon McMahon", school: "Salem State" },
  { name: "Max Salerno", school: "Ithaca College" },
];

export default function AlumniPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="relative max-w-[1120px] mx-auto px-6 pt-24 md:pt-28 pb-6">
          <div className="flex items-center gap-2 mb-5 text-[10px] font-medium uppercase tracking-[0.2em]">
            <a href="/" className="text-white/60 no-underline hover:text-white/80">Home</a>
            <span className="text-white/10">/</span>
            <span className="text-[#17FC13]/50">Alumni</span>
          </div>
          <h1 className="text-3xl md:text-4xl uppercase font-bold leading-[0.9] mb-2">
            Apex <span className="accent-text">Alumni</span>
          </h1>
          <p className="text-[14px] text-white/70 leading-[1.7] max-w-lg">Our athletes compete at the next level. Every commitment is a product of development, discipline, and the Apex standard.</p>
        </div>
      </section>

      {/* Stats */}
      <div className="border-y border-[#171717] bg-radial">
        <div className="max-w-[1120px] mx-auto px-6 py-4">
          <div className="grid grid-cols-4 gap-6">
            {[{ val: "20+", label: "College Commitments" }, { val: "1", label: "Professional Signing" }, { val: "100%", label: "Graduation Rate" }, { val: "3.5+", label: "Avg Team GPA" }].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold leading-none">{s.val}</div>
                <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/60 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Professional */}
      <div className="max-w-[1120px] mx-auto px-6 pt-6">
        <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/55 mb-4">Professional</div>
        <FadeIn>
          <div className="border border-[#17FC13]/25 bg-[#17FC13]/[0.03] p-5 flex items-center justify-between">
            <div>
              <h3 className="text-base md:text-lg uppercase font-bold">{PRO.name}</h3>
              <div className="text-[#17FC13] text-xs font-bold uppercase tracking-wide mt-1">{PRO.org}</div>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 border border-[#17FC13]/30 text-[#17FC13]/80">Pro</span>
          </div>
        </FadeIn>
      </div>

      {/* Commitments */}
      <div className="max-w-[1120px] mx-auto px-6 py-6">
        <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/55 mb-4">College Commitments</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {COMMITMENTS.map((c, i) => (
            <FadeIn key={i} delay={i * 0.03}>
              <div className="border border-[#171717] bg-radial p-4 hover:border-[#17FC13]/15 transition-colors">
                <h3 className="text-sm uppercase font-bold">{c.name}</h3>
                <div className="text-[#17FC13] text-xs font-bold uppercase tracking-wide mt-1.5">{c.school}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-[1120px] mx-auto px-6 pb-8">
        <div className="border border-[#171717] bg-radial p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm uppercase font-bold mb-1">Be Next</h3>
            <p className="text-[11px] text-white/65">Your path to the next level starts here.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button href="/join" size="small">Register</Button>
            <Button href={CONTACT.instagram} variant="secondary" size="small" external>{CONTACT.instagramHandle}</Button>
          </div>
        </div>
      </div>
    </>
  );
}
