"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ALL_TEAMS } from "@/lib/team-data";
import { getGames } from "@/lib/game-store";
import type { Game } from "@/lib/scoring-types";
import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";
import { CONTACT } from "@/lib/constants";

export default function Home() {
  const [liveGames, setLiveGames] = useState<(Game & { teamName: string })[]>([]);

  useEffect(() => {
    const games: (Game & { teamName: string })[] = [];
    for (const team of Object.values(ALL_TEAMS)) {
      for (const g of getGames(team.id)) {
        if (g.status === "live") games.push({ ...g, teamName: team.name });
      }
    }
    setLiveGames(games);
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════
         HERO — The first impression
         ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,_rgba(23,252,19,0.05)_0%,_transparent_55%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
          <Image src="/logos/apex-a-mark.png" alt="" width={700} height={700} className="object-contain" priority />
        </div>

        <FadeIn className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <div className="flex justify-center mb-8">
            <Image src="/logos/decal-lg.png" alt="Apex Academy" width={320} height={120} className="h-16 md:h-20 w-auto object-contain" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl uppercase font-bold leading-[0.85] mb-6">
            Built For <span className="accent-text">The Players</span>
          </h1>
          <p className="text-[16px] md:text-[18px] text-white/40 leading-[1.8] max-w-xl mx-auto mb-10">
            A development-first baseball organization in Boston, Massachusetts — providing high-level competition at an affordable cost with player development, opportunity, and inclusion at the center.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Button href="/join">Join Apex Academy</Button>
            <Button href="/about" variant="secondary">Our Story</Button>
          </div>
        </FadeIn>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#17FC13]/30 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════
         LIVE BANNER
         ══════════════════════════════════════ */}
      {liveGames.length > 0 && (
        <div className="border-y border-[#17FC13]/20 bg-[#17FC13]/[0.02]">
          <div className="max-w-[1120px] mx-auto px-6 py-3">
            {liveGames.map((g) => (
              <a key={g.id} href={`/teams/${g.teamId}/game/${g.id}`} className="flex items-center justify-between no-underline">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#17FC13]"><span className="w-1.5 h-1.5 bg-[#17FC13] rounded-full animate-pulse" />Live</span>
                  <span className="text-xs font-bold uppercase">{g.teamName} vs {g.opponent}</span>
                </div>
                <span className="text-lg font-bold">{g.linescore.awayRuns} - <span className="text-[#17FC13]">{g.linescore.homeRuns}</span></span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
         WHY APEX — The pitch to families
         ══════════════════════════════════════ */}
      <div className="max-w-[1120px] mx-auto px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <FadeIn>
            <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#17FC13]/40 mb-4">Why Apex Academy</div>
            <h2 className="text-2xl md:text-3xl uppercase font-bold leading-tight mb-5">
              More Than <span className="accent-text">Baseball</span>
            </h2>
            <p className="text-[15px] text-white/35 leading-[1.85]">
              Apex Academy was founded after conversations with families across Greater Boston who felt the travel baseball landscape was changing for the worse. We built something different — competitive, development-focused, and affordable. Because every player deserves access to opportunity, quality instruction, and belief.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { num: "20+", label: "College Placements", sub: "Athletes continuing at the next level" },
            { num: "1", label: "Professional Signing", sub: "Los Angeles Dodgers organization" },
            { num: "5", label: "Competitive Teams", sub: "10U through Premier" },
            { num: "2020", label: "Founded", sub: "Boston, Massachusetts" },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="border border-[#171717] bg-radial p-5 text-center">
                <div className="text-2xl md:text-3xl font-bold leading-none text-[#17FC13]">{s.num}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/40 mt-2">{s.label}</div>
                <div className="text-[9px] text-white/15 mt-1">{s.sub}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
         WHAT WE DO — Programs overview
         ══════════════════════════════════════ */}
      <div className="border-y border-[#171717]">
        <div className="max-w-[1120px] mx-auto px-6 py-16 md:py-20">
          <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/15 mb-8 text-center">What We Provide</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Development", desc: "Hitting mechanics, pitching development, position training, video analysis, and metric-driven progression. Every session structured. Every athlete on a plan.", icon: "⚾" },
              { title: "Competition", desc: "Tournament schedules, showcase events, and direct college exposure. Meaningful competitive experiences that prepare athletes for the next level.", icon: "🏆" },
              { title: "Opportunity", desc: "Academic profiling, recruiting support, video production, and connections to college programs. 20+ athletes placed at the collegiate level and counting.", icon: "🎓" },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="border border-[#171717] bg-radial p-6 md:p-8 h-full">
                  <div className="text-2xl mb-4">{p.icon}</div>
                  <h3 className="text-lg uppercase font-bold mb-3">{p.title}</h3>
                  <p className="text-[13px] text-white/35 leading-[1.75]">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
         THE APEX STANDARD — Culture pillars
         ══════════════════════════════════════ */}
      <div className="max-w-[1120px] mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <FadeIn>
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#17FC13]/40 mb-4">The Apex Standard</div>
              <h2 className="text-2xl md:text-3xl uppercase font-bold leading-tight mb-5">
                What We <span className="accent-text">Stand For</span>
              </h2>
              <p className="text-[14px] text-white/35 leading-[1.8] mb-6">
                No matter how much the program grows, we will always protect what got us here: putting players and families first. The lessons learned through this game carry far beyond the field.
              </p>
              <Button href="/about" variant="secondary" size="small">Our Full Story</Button>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 gap-3">
              {["Inclusion", "Development", "Accountability", "Opportunity", "Culture", "Hard Work", "Community", "Leadership"].map((val, i) => (
                <div key={i} className="border border-[#171717] px-4 py-3 flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 bg-[#17FC13] rounded-full shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">{val}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ══════════════════════════════════════
         TEAMS — Quick access
         ══════════════════════════════════════ */}
      <div className="border-y border-[#171717] bg-radial">
        <div className="max-w-[1120px] mx-auto px-6 py-16 md:py-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/15 mb-2">Our Teams</div>
              <h2 className="text-2xl md:text-3xl uppercase font-bold">Five Teams. One <span className="accent-text">Standard.</span></h2>
            </div>
            <a href="/teams" className="hidden md:block text-[10px] font-bold uppercase tracking-wider text-white/20 no-underline hover:text-[#17FC13]">View All Teams</a>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {[
              { id: "10u", age: "10U", name: "Youth" },
              { id: "12u", age: "12U", name: "Youth" },
              { id: "14u", age: "14U", name: "Youth" },
              { id: "prospects", age: "Prospects", name: "" },
              { id: "premier", age: "Premier", name: "" },
            ].map((t) => (
              <a key={t.id} href={`/teams/${t.id}`} className="border border-[#171717] bg-black py-6 md:py-8 text-center no-underline hover:border-[#17FC13]/30 transition-all group">
                <div className="text-2xl md:text-3xl font-bold text-[#17FC13]/50 group-hover:text-[#17FC13] transition-colors leading-none">{t.age}</div>
                {t.name && <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/15 mt-1.5">{t.name}</div>}
              </a>
            ))}
          </div>
          <div className="mt-4 text-center md:hidden">
            <a href="/teams" className="text-[10px] font-bold uppercase tracking-wider text-white/20 no-underline hover:text-[#17FC13]">View All Teams</a>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
         ALUMNI — Social proof
         ══════════════════════════════════════ */}
      <div className="max-w-[1120px] mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-10">
          <FadeIn>
            <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#17FC13]/40 mb-4">Where Our Players Go</div>
            <h2 className="text-2xl md:text-3xl uppercase font-bold mb-4">College Commitments & <span className="accent-text">Beyond</span></h2>
            <p className="text-[14px] text-white/30 leading-[1.7] max-w-lg mx-auto">
              Our athletes compete at the next level. Every placement is a product of development, discipline, and the work our players put in.
            </p>
          </FadeIn>
        </div>
        <FadeIn>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {["Boston College", "UMass Amherst", "Northeastern", "UConn", "Bryant University", "Holy Cross", "Merrimack", "Bentley"].map((school) => (
              <span key={school} className="px-4 py-2 border border-[#171717] text-xs font-bold uppercase tracking-wider text-white/40">{school}</span>
            ))}
            <span className="px-4 py-2 border border-[#17FC13]/25 bg-[#17FC13]/[0.03] text-xs font-bold uppercase tracking-wider text-[#17FC13]/70">LA Dodgers (Pro)</span>
          </div>
          <div className="text-center">
            <Button href="/alumni" variant="secondary" size="small">View All Alumni</Button>
          </div>
        </FadeIn>
      </div>

      {/* ══════════════════════════════════════
         EXPLORE — Site navigation
         ══════════════════════════════════════ */}
      <div className="border-y border-[#171717] bg-radial">
        <div className="max-w-[1120px] mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Apex Live", desc: "Live scores, box scores, and streaming", href: "/live", accent: true },
              { title: "Events", desc: "Tournaments, showcases, and tryout dates", href: "/events" },
              { title: "Pro Shop", desc: "Official apparel and gear", href: "/shop" },
              { title: "Partners", desc: "Brands that power Apex Academy", href: "/partners" },
            ].map((link) => (
              <a key={link.href} href={link.href} className={`border p-5 no-underline hover:border-[#17FC13]/25 transition-colors group ${link.accent ? "border-[#17FC13]/15 bg-[#17FC13]/[0.02]" : "border-[#171717]"}`}>
                {link.accent && <div className="flex items-center gap-1.5 mb-2"><span className="w-1.5 h-1.5 bg-[#17FC13] rounded-full" /><span className="text-[8px] font-bold uppercase tracking-wider text-[#17FC13]/50">Live</span></div>}
                <h3 className="text-sm uppercase font-bold mb-1 group-hover:text-[#17FC13] transition-colors">{link.title}</h3>
                <p className="text-[11px] text-white/25 leading-[1.5]">{link.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
         CTA — Final impression
         ══════════════════════════════════════ */}
      <div className="max-w-[1120px] mx-auto px-6 py-20 md:py-28">
        <div className="max-w-xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl uppercase font-bold leading-[0.9] mb-5">
              Ready To <span className="accent-text">Join?</span>
            </h2>
            <p className="text-[15px] text-white/35 leading-[1.8] mb-8">
              Apex Academy is about more than baseball. It&apos;s about helping young athletes build a foundation for success in whatever path they choose next.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap mb-10">
              <Button href="/join">Register for Tryouts</Button>
              <Button href={`mailto:${CONTACT.email}`} variant="secondary">Contact Us</Button>
              <Button href={CONTACT.instagram} variant="secondary" external>{CONTACT.instagramHandle}</Button>
            </div>
            <div className="flex items-center justify-center gap-6 text-[11px] text-white/15">
              <span>{CONTACT.email}</span>
              <span>&middot;</span>
              <span>{CONTACT.location}</span>
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  );
}
