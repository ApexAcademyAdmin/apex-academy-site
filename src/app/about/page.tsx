import Image from "next/image";
import { Button } from "@/components/Button";
import { CONTACT } from "@/lib/constants";

export default function AboutPage() {
  return (
    <>
      {/* ══════ HEADER ══════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_30%,_rgba(23,252,19,0.04)_0%,_transparent_60%)]" />

        <div className="relative max-w-[1120px] mx-auto px-6 pt-24 md:pt-28 pb-8">
          <div className="flex items-center gap-2 mb-5 text-[10px] font-medium uppercase tracking-[0.2em]">
            <a href="/" className="text-white/60 no-underline hover:text-white/80">Home</a>
            <span className="text-white/10">/</span>
            <span className="text-[#17FC13]/50">About</span>
          </div>
          <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-2">Est. 2020 &middot; Boston, Massachusetts</div>
          <h1 className="text-3xl md:text-4xl uppercase font-bold leading-[0.9] mb-3">
            Built For <span className="accent-text">The Players</span>
          </h1>
          <p className="text-[15px] text-white/80 leading-[1.8] max-w-xl">
            A high-level travel baseball experience at an affordable cost — with player development, opportunity, and inclusion at the center of everything we do.
          </p>
        </div>
      </section>

      {/* ══════ CONTENT ══════ */}
      <div className="max-w-[1120px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ─── LEFT (8 cols) — Story ─── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Our Story */}
            <div className="border border-[#171717] p-6">
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/55 mb-4">Our Story</div>
              <div className="space-y-4 text-[14px] text-white/85 leading-[1.8]">
                <p>Apex Academy was founded in late 2020 after conversations with families across Greater Boston who felt the travel baseball landscape was changing for the worse. Too many organizations were becoming corporate-driven, creating a system where rising costs made it difficult for families to keep their kids involved in the game they loved.</p>
                <p>We believed there had to be another way.</p>
                <p>From day one, Apex Academy was built to help bridge that gap — creating a competitive, development-focused environment without losing sight of the people and families that make the game special.</p>
              </div>
            </div>

            {/* More Than Baseball */}
            <div className="border border-[#171717] p-6">
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/30 mb-4">More Than Baseball</div>
              <p className="text-[14px] text-white/80 leading-[1.8] mb-5">Our vision has always extended beyond wins and losses. We prioritize giving athletes the opportunity to:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                {["Develop their skills", "Build confidence", "Compete at a high level", "Gain exposure", "Prepare for what's next"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-[12px] text-white/90">
                    <span className="w-1 h-1 bg-[#17FC13] rounded-full shrink-0" />{item}
                  </div>
                ))}
              </div>
              <div className="space-y-4 text-[14px] text-white/85 leading-[1.8]">
                <p>Since our founding, Apex Academy has helped more than twenty players continue their baseball careers at the collegiate level, while one former player went on to sign professionally with the Los Angeles Dodgers organization.</p>
                <p>But success for us is bigger than baseball. Whether a player reaches the professional level, earns a college opportunity, becomes a leader in their community, or eventually builds a business of their own — we believe the lessons learned through this game carry far beyond the field.</p>
              </div>
            </div>

            {/* Development First */}
            <div className="border border-[#171717] p-6">
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/55 mb-4">Development First</div>
              <p className="text-[14px] text-white/80 leading-[1.8] mb-5">As our program continues to grow, our priorities remain the same: player inclusion and player development above everything else. We believe every athlete deserves:</p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
                {["Opportunity", "Instruction", "Mentorship", "Resources", "Information", "Belief"].map((item, i) => (
                  <div key={i} className="border border-[#171717] py-2.5 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">{item}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4 text-[14px] text-white/85 leading-[1.8]">
                <p>Baseball is a game built on failure, adjustment, discipline, and resilience — lessons that mirror real life. The experiences our players face through competition teach accountability, leadership, perseverance, and growth.</p>
                <p>Those lessons stay with them long after their playing careers end. That responsibility is something we never take lightly.</p>
              </div>
            </div>
          </div>

          {/* ─── RIGHT (4 cols) — Standard + Stats + CTA ─── */}
          <div className="lg:col-span-4 space-y-6">

            {/* The Apex Standard */}
            <div className="border border-[#171717] bg-radial p-6">
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/30 mb-4">The Apex Standard</div>
              <div className="space-y-2 mb-6">
                {["Inclusion", "Development", "Accountability", "Opportunity", "Culture", "Hard Work", "Community"].map((val, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="w-1 h-1 bg-[#17FC13] rounded-full shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white/60">{val}</span>
                  </div>
                ))}
              </div>
              <p className="text-[13px] text-white/70 leading-[1.7]">
                No matter how much the program grows, we will always protect what got us here: putting players and families first.
              </p>
            </div>

            {/* Impact */}
            <div className="border border-[#171717] p-6">
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/55 mb-4">Impact</div>
              <div className="space-y-4">
                {[
                  { val: "20+", label: "College Placements" },
                  { val: "1", label: "Professional Signing (LAD)" },
                  { val: "2020", label: "Founded" },
                  { val: "Boston", label: "Home Base" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">{s.label}</span>
                    <span className="text-sm font-bold">{s.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission Statement */}
            <div className="border border-[#171717] bg-radial p-6">
              <div className="text-[13px] text-white/80 leading-[1.75] italic">
                &ldquo;Apex Academy is about more than baseball. It&apos;s about helping young athletes build a foundation for success in whatever path they choose next.&rdquo;
              </div>
            </div>

            {/* CTA */}
            <div className="border border-[#171717] p-6 text-center">
              <h3 className="text-sm uppercase font-bold mb-2">Join Apex</h3>
              <p className="text-[11px] text-white/65 mb-4">Ready to be part of something built for the players?</p>
              <div className="flex flex-col gap-2">
                <Button href="/join" size="small">Register</Button>
                <Button href={CONTACT.instagram} variant="secondary" size="small" external>{CONTACT.instagramHandle}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
