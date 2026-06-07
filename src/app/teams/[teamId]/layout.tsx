"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { ALL_TEAMS } from "@/lib/team-data";

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
  params: { teamId: string };
}) {
  const pathname = usePathname();
  const teamId = pathname.split("/")[2];
  const team = ALL_TEAMS[teamId];

  // Don't wrap game/score/player sub-routes — they have their own headers
  const isSubRoute = pathname.includes("/game/") || pathname.includes("/player/");
  if (isSubRoute || !team) return <>{children}</>;

  // For /teams/[teamId] and /teams/[teamId]/schedule — show the hero
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(23,252,19,0.07)_0%,_transparent_50%)]" />

        <div className="relative max-w-[1120px] mx-auto px-6 pt-24 md:pt-28 pb-8 md:pb-10">
          <div className="flex items-center gap-2 mb-6 text-[10px] font-medium uppercase tracking-[0.2em]">
            <a href="/teams" className="text-white/60 no-underline hover:text-white/80">Teams</a>
            <span className="text-white/10">/</span>
            <span className="text-[#17FC13]/50">{team.name}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-2">{team.age} Division</div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl uppercase font-bold leading-[0.9] mb-3">
                {team.name.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="accent-text">{team.name.split(" ").pop()}</span>
              </h1>
              <p className="text-[14px] text-white/75 leading-[1.7] max-w-lg">{team.description}</p>
            </div>
            <div className="relative flex items-center justify-center gap-8 shrink-0 py-4">
              <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
                <Image src="/logos/apex-a-mark.png" alt="" width={560} height={560} className="w-[560px] max-w-none object-contain opacity-[0.18]" />
              </div>
              {[{ l: "Record", v: team.record }, { l: "Roster", v: String(team.roster.length) }].map((s) => (
                <div key={s.l} className="relative text-center">
                  <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/55 mb-0.5">{s.l}</div>
                  <div className="text-lg font-bold">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Team selector */}
          <div className="flex items-center gap-2 mt-6">
            {["10u", "12u", "14u", "prospects", "premier"].map((id) => ALL_TEAMS[id]).filter(Boolean).map((t) => (
              <a key={t.id} href={`/teams/${t.id}`} className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider no-underline border transition-all ${t.id === teamId ? "border-[#17FC13]/40 text-[#17FC13] bg-[#17FC13]/[0.05]" : "border-[#171717] text-white/60 hover:text-white/80"}`}>{t.age}</a>
            ))}
          </div>
        </div>
      </section>

      {children}
    </>
  );
}
