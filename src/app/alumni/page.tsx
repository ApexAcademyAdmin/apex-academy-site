"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";
import { CONTACT } from "@/lib/constants";

type Level = "Professional" | "College" | "Committed";
type Alum = {
  slug: string;
  name: string;
  level: Level;
  school: string;   // primary / highest-level school (key into LOGO)
  photo?: string;   // /alumni/players/<slug>.jpg — omitted falls back to monogram
};

// Exact school name -> standardized logo asset
const LOGO: Record<string, string> = {
  "Wheaton College": "/alumni/logos/wheaton.png",
  "Swarthmore College": "/alumni/logos/swarthmore.png",
  "UMass Boston": "/alumni/logos/umass-boston.png",
  "Wentworth Institute of Technology": "/alumni/logos/wentworth.png",
  "Saint Michael's College": "/alumni/logos/saint-michaels.png",
  "Haverford College": "/alumni/logos/haverford.png",
  "UMass Dartmouth": "/alumni/logos/umass-dartmouth.png",
  "Bunker Hill Community College": "/alumni/logos/bunker-hill.jpg",
  "Dickinson College": "/alumni/logos/dickinson.png",
  "Salem State University": "/alumni/logos/salem-state.png",
  "Ithaca College": "/alumni/logos/ithaca.png",
  "Salisbury University": "/alumni/logos/salisbury.png",
  "Los Angeles Dodgers": "/alumni/logos/dodgers.png",
};

const ALUMNI: Alum[] = [
  { slug: "oliveira-christian", name: "Christian Oliveira", level: "Professional", school: "Los Angeles Dodgers", photo: "/alumni/players/oliveira-christian.jpg" },
  { slug: "born-ian", name: "Ian Born", level: "College", school: "Swarthmore College", photo: "/alumni/players/born-ian.jpg" },
  { slug: "clark-kevin", name: "Kevin Clark", level: "College", school: "UMass Boston", photo: "/alumni/players/clark-kevin.jpg" },
  { slug: "cummings-kyle", name: "Kyle Cummings", level: "College", school: "UMass Boston", photo: "/alumni/players/cummings-kyle.jpg" },
  { slug: "figueroa-christian", name: "Christian Figueroa", level: "College", school: "Wentworth Institute of Technology", photo: "/alumni/players/figueroa-christian.jpg" },
  { slug: "flaherty-cameron", name: "Cameron Flaherty", level: "College", school: "Saint Michael's College", photo: "/alumni/players/flaherty-cameron.jpg" },
  { slug: "lewis-matthew", name: "Matthew Lewis", level: "College", school: "UMass Dartmouth", photo: "/alumni/players/lewis-matthew.jpg" },
  { slug: "mcmahon-brandon", name: "Brandon McMahon", level: "College", school: "Salem State University", photo: "/alumni/players/mcmahon-brandon.jpg" },
  { slug: "osullivan-aidan", name: "Aidan O'Sullivan", level: "College", school: "Haverford College", photo: "/alumni/players/osullivan-aidan.jpg" },
  { slug: "sack-brendan", name: "Brendan Sack", level: "College", school: "Bunker Hill Community College", photo: "/alumni/players/sack-brendan.jpg" },
  { slug: "salerno-max", name: "Max Salerno", level: "College", school: "Ithaca College", photo: "/alumni/players/salerno-max.jpg" },
  { slug: "seeley-conner", name: "Conner Seeley", level: "College", school: "Salisbury University", photo: "/alumni/players/seeley-conner.jpg" },
  { slug: "sullivan-seth", name: "Seth Sullivan", level: "College", school: "Salem State University", photo: "/alumni/players/sullivan-seth.jpg" },
  { slug: "alexandrov-stefan", name: "Stefan Alexandrov", level: "Committed", school: "Wheaton College" },
  { slug: "henke-oliver", name: "Oliver Henke", level: "Committed", school: "Swarthmore College" },
  { slug: "mariani-matthew", name: "Matthew Mariani", level: "Committed", school: "Dickinson College" },
];

const FILTERS: ("All" | Level)[] = ["All", "Professional", "College", "Committed"];

const LEVEL_STYLE: Record<Level, string> = {
  Professional: "text-[#17FC13] border-[#17FC13]/40 bg-[#17FC13]/[0.06]",
  College: "text-white/80 border-white/15 bg-white/[0.03]",
  Committed: "text-white/70 border-white/10 bg-white/[0.02]",
};

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

/* Standardized logo container — every logo sits on an identical white tile */
function LogoTile({ school, size = "sm" }: { school: string; size?: "sm" | "md" }) {
  const src = LOGO[school];
  if (!src) return null;
  const box = size === "md" ? "w-9 h-9" : "w-7 h-7";
  const img = size === "md" ? "max-w-[34px] max-h-[34px]" : "max-w-[26px] max-h-[26px]";
  return (
    <span className={`inline-flex items-center justify-center bg-white rounded-md ${box} shrink-0`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={`${school} logo`} className={`${img} object-contain`} />
    </span>
  );
}

/* Uniform headshot — identical aspect, crop, and fallback for every player */
function Headshot({ photo, name }: { photo?: string; name: string }) {
  if (photo) {
    return (
      <div className="aspect-[4/5] w-full overflow-hidden bg-[#0c0c0c]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt={name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>
    );
  }
  return (
    <div className="aspect-[4/5] w-full bg-[radial-gradient(ellipse_at_50%_30%,_#1c1c1c,_#0a0a0a)] flex items-center justify-center">
      <span className="text-3xl font-bold text-[#17FC13]/25">{initials(name)}</span>
    </div>
  );
}

function AlumCard({ a }: { a: Alum }) {
  return (
    <div className="group relative border border-[#171717] bg-[#0a0a0a] overflow-hidden transition-all duration-300 hover:border-[#17FC13]/35 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(23,252,19,0.18)]">
      <div className="relative">
        <Headshot photo={a.photo} name={a.name} />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        <span className={`absolute top-2.5 left-2.5 text-[8px] font-bold uppercase tracking-[0.15em] px-2 py-1 border rounded-full backdrop-blur-sm ${LEVEL_STYLE[a.level]}`}>{a.level}</span>
      </div>
      <div className="p-4">
        <h3 className="text-[15px] uppercase font-bold leading-tight truncate">{a.name}</h3>
        <div className="flex items-center gap-2.5 mt-3">
          <LogoTile school={a.school} />
          <span className="text-[11px] font-bold uppercase tracking-wide text-white/70 leading-tight min-w-0">{a.school}</span>
        </div>
      </div>
    </div>
  );
}

export default function AlumniPage() {
  const [filter, setFilter] = useState<"All" | Level>("All");

  const grid = useMemo(() => (filter === "All" ? ALUMNI : ALUMNI.filter((a) => a.level === filter)), [filter]);

  const featured = ALUMNI.find((a) => a.level === "Professional")!;

  // Commitment wall — unique schools/programs with player counts
  const wall = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const a of ALUMNI) counts[a.school] = (counts[a.school] || 0) + 1;
    return Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, []);

  const collegeCount = ALUMNI.filter((a) => a.level === "College").length;
  const collegePrograms = new Set(ALUMNI.filter((a) => a.level !== "Professional").map((a) => a.school)).size;
  const marqueeLogos = [...wall, ...wall];

  return (
    <>
      {/* ══════════ HERO ══════════ */}
      <section className="relative overflow-hidden border-b border-[#171717]">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,_rgba(23,252,19,0.08)_0%,_transparent_55%)]" />

        <div className="relative max-w-[1120px] mx-auto px-6 pt-24 md:pt-28 pb-10 text-center">
          <FadeIn>
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <span aria-hidden className="w-5 h-px bg-[#17FC13]/50" />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/60">The Next Level</span>
              <span aria-hidden className="w-5 h-px bg-[#17FC13]/50" />
            </div>
            <h1 className="text-4xl md:text-6xl uppercase font-bold leading-[0.9] mb-4">
              Apex Academy <span className="accent-text">Alumni</span>
            </h1>
            <p className="text-[15px] md:text-[17px] text-white/75 leading-[1.7] max-w-xl mx-auto">
              Where development becomes opportunity.
            </p>
            <div className="flex items-center justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#17FC13] leading-none">{collegeCount}</div>
                <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/55 mt-1.5">College Players</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#17FC13] leading-none">1</div>
                <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/55 mt-1.5">Professional</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#17FC13] leading-none">{collegePrograms}</div>
                <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/55 mt-1.5">Programs</div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Logo marquee */}
        <div className="relative border-t border-[#171717] py-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex items-center gap-3 w-max animate-marquee">
            {marqueeLogos.map(([school], i) => (
              <span key={`${school}-${i}`} className="inline-flex items-center justify-center bg-white rounded-md w-12 h-12 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={LOGO[school]} alt="" className="max-w-[45px] max-h-[45px] object-contain" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FEATURED — PROFESSIONAL ══════════ */}
      <div className="max-w-[1120px] mx-auto px-6 py-12 md:py-14">
        <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-4">Featured</div>
        <FadeIn>
          <div className="relative grid grid-cols-1 sm:grid-cols-[200px_1fr] border border-[#17FC13]/25 bg-[radial-gradient(ellipse_at_0%_0%,_rgba(23,252,19,0.06),_transparent_60%)] overflow-hidden">
            <div className="relative aspect-[4/5] sm:aspect-auto min-h-[220px] bg-[#0c0c0c] overflow-hidden">
              {featured.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={featured.photo} alt={featured.name} className="absolute inset-0 w-full h-full object-cover object-top" />
              ) : (
                <div className="w-full h-full bg-[radial-gradient(ellipse_at_50%_30%,_#1c1c1c,_#0a0a0a)] flex items-center justify-center">
                  <span className="text-5xl font-bold text-[#17FC13]/25">{initials(featured.name)}</span>
                </div>
              )}
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <span className="self-start text-[8px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 border border-[#17FC13]/40 bg-[#17FC13]/[0.06] text-[#17FC13] rounded-full mb-4">Professional</span>
              <h2 className="text-2xl md:text-3xl uppercase font-bold leading-[0.95] mb-2">{featured.name}</h2>
              <p className="text-[13px] text-white/65 leading-[1.7] max-w-md mb-5">Signed professionally out of high school — the first Apex Academy athlete to reach affiliated professional baseball.</p>
              <div className="flex items-center gap-3">
                <LogoTile school={featured.school} size="md" />
                <span className="text-sm font-bold uppercase tracking-wide text-white">{featured.school}</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* ══════════ ALUMNI GRID ══════════ */}
      <div className="max-w-[1120px] mx-auto px-6 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/55 mb-2">The Roster of Alumni</div>
            <h2 className="text-2xl md:text-3xl uppercase font-bold">Where They <span className="accent-text">Play</span></h2>
          </div>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider border rounded-full transition-all ${filter === f ? "border-[#17FC13]/50 text-[#17FC13] bg-[#17FC13]/[0.06]" : "border-[#171717] text-white/55 hover:text-white/80 hover:border-white/20"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {grid.map((a, i) => (
            <FadeIn key={a.slug} delay={(i % 8) * 0.03}>
              <AlumCard a={a} />
            </FadeIn>
          ))}
        </div>
        {grid.length === 0 && (
          <div className="text-center py-12 text-[13px] text-white/55">No alumni in this category yet.</div>
        )}
      </div>

      {/* ══════════ COLLEGE COMMITMENT WALL ══════════ */}
      <div className="border-y border-[#171717] bg-radial mt-10">
        <div className="max-w-[1120px] mx-auto px-6 py-12 md:py-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-2.5 mb-3">
              <span aria-hidden className="w-5 h-px bg-[#17FC13]/50" />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/60">Commitment Wall</span>
              <span aria-hidden className="w-5 h-px bg-[#17FC13]/50" />
            </div>
            <h2 className="text-2xl md:text-3xl uppercase font-bold leading-[0.95] mb-3">Programs <span className="accent-text">Represented</span></h2>
            <p className="text-[13px] text-white/70 leading-[1.7]">Apex athletes have advanced to programs across NCAA, NJCAA, and professional baseball.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {wall.map(([school, count]) => (
              <div key={school} className="flex items-center gap-3 border border-[#171717] bg-black p-3.5 hover:border-[#17FC13]/20 transition-colors">
                <LogoTile school={school} size="md" />
                <div className="min-w-0">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-white/85 leading-tight truncate">{school}</div>
                  <div className="text-[9px] text-white/45 mt-0.5">{count} {count > 1 ? "players" : "player"}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ CTA ══════════ */}
      <div className="max-w-[1120px] mx-auto px-6 py-14 md:py-16">
        <div className="border border-[#171717] bg-radial p-7 md:p-9 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div>
            <h3 className="text-xl md:text-2xl uppercase font-bold mb-1.5">Be <span className="accent-text">Next</span></h3>
            <p className="text-[13px] text-white/65 max-w-md">Development creates opportunity. Your path to the next level starts at Apex.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button href="/join" size="small">Register</Button>
            <Button href={CONTACT.instagram} variant="secondary" size="small" external>{CONTACT.instagramHandle}</Button>
          </div>
        </div>
      </div>
    </>
  );
}
