"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const HEADLINES = [
  "THE STANDARD.",
  "BUILT DIFFERENT.",
  "NEXT LEVEL.",
  "NO LIMITS.",
];

export function Hero() {
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 200); }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIdx(prev => (prev + 1) % HEADLINES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-black" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full bg-[#6EFF00]/[0.03] blur-[150px]" />

      {/* Angular lines — built from the logo geometry */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[2px] bg-gradient-to-l from-[#6EFF00]/20 to-transparent rotate-[-25deg] origin-right translate-y-[200px]" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[2px] bg-gradient-to-r from-[#6EFF00]/15 to-transparent rotate-[-15deg] origin-left translate-y-[-150px]" />
        <div className="absolute top-[40%] right-[-100px] w-[400px] h-[1px] bg-gradient-to-l from-[#6EFF00]/10 to-transparent rotate-[-30deg]" />
      </div>

      {/* Watermark logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
        <Image src="/logos/apex-a-transparent.png" alt="" width={800} height={800} className="object-contain" priority />
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Eyebrow */}
        <div className="text-[11px] md:text-[13px] font-bold uppercase tracking-[0.5em] text-[#6EFF00] mb-6">
          Apex Academy Baseball
        </div>

        {/* Main headline — rotating */}
        <h1 className="text-[52px] sm:text-[72px] md:text-[96px] lg:text-[120px] font-black uppercase leading-[0.85] tracking-tight text-white mb-8 transition-all duration-500">
          {HEADLINES[headlineIdx]}
        </h1>

        {/* Subheadline */}
        <p className="text-[16px] md:text-[20px] font-light text-white/70 max-w-[600px] mx-auto leading-[1.6] mb-12">
          Where elite athletes are developed. Hitting. Pitching. Strength. Speed. Mental performance. Recruiting. Everything it takes to play at the next level.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contact" className="group relative px-10 py-4 bg-[#6EFF00] text-black text-[13px] font-bold uppercase tracking-wider rounded-lg no-underline overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(110,255,0,0.3)]">
            <span className="relative z-10">Join Apex Academy</span>
          </a>
          <a href="#programs" className="px-10 py-4 border border-white/20 text-white text-[13px] font-bold uppercase tracking-wider rounded-lg no-underline transition-all duration-300 hover:border-[#6EFF00]/40 hover:text-[#6EFF00]">
            View Programs
          </a>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-1000 ${visible ? "opacity-100" : "opacity-0"}`}>
        <div className="text-[9px] uppercase tracking-[0.3em] text-white/30">Scroll</div>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#6EFF00]/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
