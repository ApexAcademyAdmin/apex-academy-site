import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";
import { CONTACT } from "@/lib/constants";

const COMMITMENTS = [
  { name: "Marcus Rivera", pos: "RHP", school: "Boston College", year: "2025", note: "93 mph fastball, 3.8 GPA" },
  { name: "James O'Brien", pos: "SS", school: "UMass Amherst", year: "2025", note: "All-State selection, .420 BA" },
  { name: "Tyler Chen", pos: "C/1B", school: "Northeastern", year: "2025", note: "Exit velo 96 mph, Gold Glove finalist" },
  { name: "Derek Williams", pos: "OF", school: "UConn", year: "2024", note: "6.5 sixty, top 100 PBR NE" },
  { name: "Anthony Russo", pos: "LHP", school: "Bryant University", year: "2024", note: "88 mph, 3 pitch mix" },
  { name: "Kevin Park", pos: "2B", school: "Holy Cross", year: "2024", note: "Gold Glove defender, .380 BA" },
  { name: "Michael Santos", pos: "RHP/OF", school: "Merrimack", year: "2023", note: "90 mph, two-way player" },
  { name: "Ryan Murphy", pos: "3B", school: "Bentley", year: "2023", note: "Power hitter, 12 HR senior season" },
];

export default function AlumniPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="relative max-w-[1120px] mx-auto px-6 pt-28 md:pt-36 pb-6">
          <div className="flex items-center gap-2 mb-5 text-[10px] font-medium uppercase tracking-[0.2em]">
            <a href="/" className="text-white/20 no-underline hover:text-white/40">Home</a>
            <span className="text-white/10">/</span>
            <span className="text-[#17FC13]/50">Alumni</span>
          </div>
          <h1 className="text-3xl md:text-4xl uppercase font-bold leading-[0.9] mb-2">
            Apex <span className="accent-text">Alumni</span>
          </h1>
          <p className="text-[14px] text-white/30 leading-[1.7] max-w-lg">Our athletes compete at the next level. Every commitment is a product of development, discipline, and the Apex standard.</p>
        </div>
      </section>

      {/* Stats */}
      <div className="border-y border-[#171717] bg-radial">
        <div className="max-w-[1120px] mx-auto px-6 py-4">
          <div className="grid grid-cols-4 gap-6">
            {[{ val: "20+", label: "College Commitments" }, { val: "1", label: "Professional Signing" }, { val: "100%", label: "Graduation Rate" }, { val: "3.5+", label: "Avg Team GPA" }].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold leading-none">{s.val}</div>
                <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/20 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Commitments */}
      <div className="max-w-[1120px] mx-auto px-6 py-6">
        <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/15 mb-4">College Commitments</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {COMMITMENTS.map((c, i) => (
            <FadeIn key={i} delay={i * 0.03}>
              <div className="border border-[#171717] bg-radial p-4 hover:border-[#17FC13]/15 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-sm uppercase font-bold">{c.name}</h3>
                    <div className="text-[10px] text-white/25 mt-0.5">{c.pos}</div>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-white/15">{c.year}</span>
                </div>
                <div className="text-[#17FC13] text-xs font-bold uppercase tracking-wide mb-1">{c.school}</div>
                <p className="text-[11px] text-white/30">{c.note}</p>
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
            <p className="text-[11px] text-white/25">Your path to the next level starts here.</p>
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
