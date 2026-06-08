"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ALL_TEAMS } from "@/lib/team-data";
import { getGames } from "@/lib/game-store";
import type { Game } from "@/lib/scoring-types";
import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";

/* ── Eyebrow + heading used across sections ── */
function Lead({ eyebrow, title, accent }: { eyebrow: string; title: string; accent?: string }) {
  return (
    <>
      <div className="flex items-center gap-2.5 mb-3">
        <span aria-hidden className="w-5 h-px bg-[#17FC13]/50 shrink-0" />
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/60">{eyebrow}</span>
      </div>
      <h2 className="text-2xl md:text-3xl uppercase font-bold leading-[0.95]">
        {title} {accent && <span className="accent-text">{accent}</span>}
      </h2>
    </>
  );
}

const PATHWAY = [
  { label: "10U", tier: "Youth", href: "/teams/10u" },
  { label: "12U", tier: "Youth", href: "/teams/12u" },
  { label: "14U", tier: "Youth", href: "/teams/14u" },
  { label: "Prospects", tier: "Showcase", href: "/teams/prospects" },
  { label: "Premier", tier: "Flagship", href: "/teams/premier" },
  { label: "College", tier: "Next Level", href: "/alumni", dest: true },
];

const PROSPECT_EVENTS = [
  {
    tag: "Showcase",
    title: "All-New England Prospect Games",
    desc: "An invitational showcase pairing combine testing with live games in front of attending college coaches.",
    href: "/league/showcase",
  },
  {
    tag: "Combine",
    title: "Rising Prospects Combine",
    desc: "Professional-level testing and verified player profiles with guaranteed college coach attendance.",
    href: "/events/rising-prospects",
  },
];

const ALUMNI_FACES = ["salerno-max", "osullivan-aidan", "born-ian", "flaherty-cameron", "seeley-conner", "mcmahon-brandon"];
const ALUMNI_LOGOS = ["swarthmore", "umass-boston", "haverford", "saint-michaels", "salem-state", "ithaca", "salisbury", "wentworth", "dodgers"];

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
      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-[78vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,_rgba(23,252,19,0.06)_0%,_transparent_55%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.035] pointer-events-none">
          <Image src="/logos/apex-a-mark.png" alt="" width={760} height={760} className="object-contain" priority />
        </div>

        <FadeIn className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <div className="flex justify-center mb-8">
            <Image src="/logos/decal-lg.png" alt="Apex Academy" width={320} height={120} className="h-16 md:h-20 w-auto object-contain" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl uppercase font-bold leading-[0.85] mb-6">
            Built For <span className="accent-text">The Players</span>
          </h1>
          <p className="text-[16px] md:text-[18px] text-white/80 leading-[1.75] max-w-xl mx-auto mb-9">
            One organization dedicated to helping athletes develop, compete, and create opportunities for themselves — both on and off the field.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Button href="/join">Join Apex</Button>
            <Button href="/teams" variant="secondary">Explore Teams</Button>
          </div>
        </FadeIn>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-8 bg-gradient-to-b from-[#17FC13]/30 to-transparent" />
        </div>
      </section>

      {/* ══════════ LIVE BANNER (conditional) ══════════ */}
      {liveGames.length > 0 && (
        <div className="border-y border-[#17FC13]/20 bg-[#17FC13]/[0.02]">
          <div className="max-w-[1120px] mx-auto px-6 py-3 space-y-2">
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

      {/* ══════════ 1 · WHO WE ARE ══════════ */}
      <div className="max-w-[1120px] mx-auto px-6 py-14 md:py-16">
        <FadeIn className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <span aria-hidden className="w-5 h-px bg-[#17FC13]/50 shrink-0" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/60">Who We Are</span>
          </div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold leading-[0.95] mb-5">
            A Player-First <span className="accent-text">Organization</span>
          </h2>
          <p className="text-[15px] md:text-[16px] text-white/80 leading-[1.8] mb-8">
            Apex Academy was founded in 2020 to give Greater Boston families a better path — high-level baseball built on development, opportunity, and inclusion rather than cost and exclusivity. Everything we do is built to help players grow, on the field and well beyond it.
          </p>
          <Button href="/about" variant="secondary" size="small">Learn More About Apex</Button>
        </FadeIn>
      </div>

      {/* ══════════ 2 · THE PLAYER PATHWAY ══════════ */}
      <div className="border-y border-[#171717] bg-radial">
        <div className="max-w-[1120px] mx-auto px-6 py-14 md:py-16">
          <FadeIn className="text-center max-w-xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-2.5 mb-3">
              <span aria-hidden className="w-5 h-px bg-[#17FC13]/50 shrink-0" />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/60">The Player Pathway</span>
            </div>
            <h2 className="text-2xl md:text-3xl uppercase font-bold leading-[0.95] mb-4">One Clear <span className="accent-text">Path</span></h2>
            <p className="text-[14px] text-white/75 leading-[1.75]">
              Every level runs on the same standards and the same philosophy — so moving up is never a fresh start, just the next step.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-col md:flex-row items-stretch gap-2">
              {PATHWAY.map((stage, i) => (
                <div key={stage.label} className="flex flex-col md:flex-row items-center md:flex-1 gap-2">
                  <a
                    href={stage.href}
                    className={`w-full md:flex-1 border py-5 px-3 text-center no-underline transition-all group ${stage.dest ? "border-[#17FC13]/30 bg-[#17FC13]/[0.04] hover:border-[#17FC13]/50" : "border-[#171717] bg-black hover:border-[#17FC13]/30"}`}
                  >
                    <div className={`text-xl md:text-2xl font-bold leading-none transition-colors ${stage.dest ? "text-[#17FC13]" : "text-white group-hover:text-[#17FC13]"}`}>{stage.label}</div>
                    <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/50 mt-1.5">{stage.tier}</div>
                  </a>
                  {i < PATHWAY.length - 1 && (
                    <span aria-hidden className="text-white/25 text-sm rotate-90 md:rotate-0 shrink-0">&rarr;</span>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>

          <div className="text-center mt-10">
            <Button href="/teams" variant="secondary" size="small">View Teams</Button>
          </div>
        </div>
      </div>

      {/* ══════════ 3 · THE LEAGUE ══════════ */}
      <div className="max-w-[1120px] mx-auto px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <FadeIn>
            <Lead eyebrow="The League" title="Bridging Town &" accent="Travel" />
            <p className="text-[14px] text-white/75 leading-[1.8] mt-5 mb-6">
              The Apex Academy League brings town and travel baseball together — competitive weekday games that keep weekends free, real development, and season-long awards recognizing players, coaches, and teams.
            </p>
            <Button href="/league" variant="secondary" size="small">Explore The League</Button>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 gap-3">
              {[
                { t: "Town + Travel", d: "Bridging the gap" },
                { t: "Weekday Games", d: "Weekends stay free" },
                { t: "Development", d: "Meaningful reps" },
                { t: "Awards", d: "Recognized annually" },
              ].map((f) => (
                <div key={f.t} className="border border-[#171717] bg-radial p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-white mb-1">{f.t}</div>
                  <div className="text-[11px] text-white/55 leading-[1.5]">{f.d}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ══════════ 4 · PROSPECT EVENTS ══════════ */}
      <div className="border-y border-[#171717] bg-radial">
        <div className="max-w-[1120px] mx-auto px-6 py-14 md:py-16">
          <FadeIn className="text-center max-w-xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-2.5 mb-3">
              <span aria-hidden className="w-5 h-px bg-[#17FC13]/50 shrink-0" />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/60">Prospect Events</span>
            </div>
            <h2 className="text-2xl md:text-3xl uppercase font-bold leading-[0.95] mb-4">Built For <span className="accent-text">Exposure</span></h2>
            <p className="text-[14px] text-white/75 leading-[1.75]">
              Recruiting events that put players in front of college coaches — with verified metrics and professional evaluations.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {PROSPECT_EVENTS.map((e, i) => (
              <FadeIn key={e.title} delay={i * 0.08}>
                <a href={e.href} className="block border border-[#171717] bg-black p-6 md:p-7 h-full no-underline hover:border-[#17FC13]/30 transition-all group">
                  <span className="inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border border-[#17FC13]/20 text-[#17FC13]/70 mb-4">{e.tag}</span>
                  <h3 className="text-lg uppercase font-bold mb-2 leading-tight group-hover:text-[#17FC13] transition-colors">{e.title}</h3>
                  <p className="text-[13px] text-white/70 leading-[1.7]">{e.desc}</p>
                </a>
              </FadeIn>
            ))}
          </div>

          <div className="text-center">
            <Button href="/events" variant="secondary" size="small">View Events</Button>
          </div>
        </div>
      </div>

      {/* ══════════ 5 · ALUMNI ══════════ */}
      <div className="max-w-[1120px] mx-auto px-6 py-14 md:py-16">
        <FadeIn className="text-center max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <span aria-hidden className="w-5 h-px bg-[#17FC13]/50 shrink-0" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/60">Alumni</span>
          </div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold leading-[0.95] mb-4">Where Our <span className="accent-text">Players Go</span></h2>
          <p className="text-[14px] text-white/75 leading-[1.75]">
            Apex athletes have advanced to college programs across the Northeast and beyond — and one to the professional level.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          {/* Player photos */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 md:gap-3 mb-8">
            {ALUMNI_FACES.map((slug) => (
              <div key={slug} className="aspect-[4/5] overflow-hidden border border-[#171717] bg-[#0a0a0a]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/alumni/players/${slug}.jpg`} alt="" className="w-full h-full object-cover object-top" />
              </div>
            ))}
          </div>
          {/* College logos */}
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4 mb-9">
            {ALUMNI_LOGOS.map((l) => (
              <span key={l} className="inline-flex items-center justify-center h-9 w-10 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/alumni/logos/${l}.png`} alt="" className="max-w-full max-h-full object-contain" />
              </span>
            ))}
          </div>
          <div className="text-center">
            <Button href="/alumni" variant="secondary" size="small">View Alumni</Button>
          </div>
        </FadeIn>
      </div>

      {/* ══════════ 6 · APEX LIVE ══════════ */}
      <div className="border-y border-[#171717] bg-radial">
        <div className="max-w-[1120px] mx-auto px-6 py-14 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <FadeIn>
              <Lead eyebrow="Apex Live" title="Every Game." accent="Live." />
              <p className="text-[14px] text-white/75 leading-[1.8] mt-5 mb-6">
                Follow Apex teams in real time — live streaming, live scoring, box scores, and player statistics for every game.
              </p>
              <Button href="/live" variant="secondary" size="small">Watch Apex Live</Button>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="grid grid-cols-2 gap-3">
                {["Live Streaming", "Live Scoring", "Box Scores", "Player Stats"].map((f) => (
                  <div key={f} className="border border-[#171717] bg-black px-4 py-5 flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 bg-[#17FC13] rounded-full shrink-0 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">{f}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ══════════ FINAL CTA ══════════ */}
      <div className="max-w-[1120px] mx-auto px-6 py-16 md:py-24">
        <FadeIn className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl uppercase font-bold leading-[0.9] mb-7">
            Ready To <span className="accent-text">Get Started?</span>
          </h2>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Button href="/join">Join Apex</Button>
            <Button href="/league/register" variant="secondary">Register A Team</Button>
          </div>
        </FadeIn>
      </div>
    </>
  );
}
