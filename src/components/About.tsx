"use client";

import Image from "next/image";

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#070707]" />

      {/* Diagonal cut accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#6EFF00]/20 to-transparent" />

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Content */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#6EFF00] mb-4">About Apex</div>
            <h2 className="text-[36px] md:text-[48px] font-black uppercase tracking-tight leading-[0.95] text-white mb-6">
              Where Elite<br />Athletes Are<br /><span className="text-[#6EFF00]">Developed</span>
            </h2>
            <div className="w-16 h-[2px] bg-[#6EFF00] mb-8" />
            <div className="space-y-4">
              <p className="text-[15px] text-white/70 leading-[1.8]">
                Apex Academy is not a typical baseball program. We are a development-first organization built on the belief that every athlete deserves a structured path to their potential — regardless of where they start.
              </p>
              <p className="text-[15px] text-white/70 leading-[1.8]">
                Our system integrates hitting mechanics, pitching development, strength and conditioning, speed training, mental performance, and recruiting preparation into one connected ecosystem. Every session builds on the last. Every metric is tracked. Every athlete has a plan.
              </p>
              <p className="text-[15px] text-white/70 leading-[1.8]">
                From our youngest age groups to our showcase-ready travel teams, the standard is the same: develop complete baseball players who are prepared for the next level — whatever that level is.
              </p>
            </div>

            <div className="flex gap-4 mt-10">
              <a href="#programs" className="px-8 py-3.5 bg-[#6EFF00] text-black text-[12px] font-bold uppercase tracking-wider rounded-lg no-underline hover:brightness-110 transition">
                Our Programs
              </a>
              <a href="#contact" className="px-8 py-3.5 border border-white/20 text-white text-[12px] font-bold uppercase tracking-wider rounded-lg no-underline hover:border-[#6EFF00]/40 hover:text-[#6EFF00] transition">
                Contact Us
              </a>
            </div>
          </div>

          {/* Right — Visual */}
          <div className="relative">
            <div className="relative aspect-square max-w-[500px] mx-auto">
              {/* Green glow behind */}
              <div className="absolute inset-0 bg-[#6EFF00]/[0.05] blur-[80px] rounded-full" />

              {/* Logo */}
              <div className="relative flex items-center justify-center h-full">
                <Image src="/logos/apex-a-mark.png" alt="Apex Academy" width={400} height={400} className="object-contain drop-shadow-[0_0_60px_rgba(110,255,0,0.15)]" />
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-16 h-[2px] bg-[#6EFF00]" />
              <div className="absolute top-0 left-0 w-[2px] h-16 bg-[#6EFF00]" />
              <div className="absolute bottom-0 right-0 w-16 h-[2px] bg-[#6EFF00]" />
              <div className="absolute bottom-0 right-0 w-[2px] h-16 bg-[#6EFF00]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
