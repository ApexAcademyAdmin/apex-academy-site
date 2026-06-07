"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { ALL_TEAMS } from "@/lib/team-data";
import { getGames } from "@/lib/game-store";
import { computePlayerBatting, getPlayerGameLog } from "@/lib/stat-calculator";
import type { GameLogEntry } from "@/lib/stat-calculator";
import { Button } from "@/components/Button";
import { useState, useEffect } from "react";
import type { BattingLine } from "@/lib/scoring-types";

export default function PlayerProfilePage() {
  const pathname = usePathname();
  const teamId = pathname.split("/")[2];
  const playerId = pathname.split("/")[4];
  const team = ALL_TEAMS[teamId];
  const player = team?.roster.find((p) => p.number === playerId);

  const [stats, setStats] = useState<BattingLine | null>(null);
  const [gameLog, setGameLog] = useState<GameLogEntry[]>([]);

  useEffect(() => {
    if (!team || !player) return;
    const games = getGames(teamId);
    if (games.filter((g) => g.status === "final" || g.status === "live").length > 0) {
      const line = computePlayerBatting(player.number, player.name, games);
      if (line.AB > 0 || line.BB > 0) setStats(line);
      setGameLog(getPlayerGameLog(player.number, teamId, games));
    }
  }, [teamId, player, team]);

  if (!team || !player) {
    return <div className="max-w-[1120px] mx-auto px-6 pt-32 pb-20 text-center"><p className="text-white/30">Player not found.</p><Button href={`/teams/${teamId}`} variant="secondary" size="small">Back to Roster</Button></div>;
  }

  const teammates = team.roster.filter((p) => p.number !== player.number).slice(0, 6);

  return (
    <>
      {/* ══════ HEADER ══════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_rgba(23,252,19,0.04)_0%,_transparent_55%)]" />
        <div className="absolute top-1/2 right-[-5%] -translate-y-1/2 text-[25vw] font-bold text-white/[0.015] leading-none select-none pointer-events-none" style={{ fontFamily: "var(--font-perf)" }}>{player.number}</div>

        <div className="relative max-w-[1120px] mx-auto px-6 pt-28 md:pt-36 pb-6">
          <div className="flex items-center gap-2 mb-5 text-[10px] font-medium uppercase tracking-[0.2em]">
            <a href={`/teams/${teamId}`} className="text-white/20 no-underline hover:text-white/40">{team.age} Roster</a>
            <span className="text-white/10">/</span>
            <span className="text-[#17FC13]/50">{player.name}</span>
          </div>

          {/* Player Name + Number */}
          <div className="flex items-end gap-4 mb-6">
            <div className="text-5xl md:text-6xl font-bold text-[#17FC13] leading-none" style={{ fontFamily: "var(--font-perf)" }}>{player.number}</div>
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl uppercase font-bold leading-[0.9]">{player.name}</h1>
              {player.committed && (
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#17FC13] mt-1.5">
                  <span className="w-1.5 h-1.5 bg-[#17FC13] rounded-full" />{player.committed}
                </div>
              )}
            </div>
          </div>

          {/* Info Grid — like the reference */}
          <div className="border border-[#171717] bg-radial p-6 md:p-8">
            {/* Row 1 */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-x-8 gap-y-6 mb-6">
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/25 mb-1.5">Position</div>
                <div className="text-base md:text-lg font-bold">{player.pos}{player.secondaryPos ? ` / ${player.secondaryPos}` : ""}</div>
              </div>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/25 mb-1.5">Height</div>
                <div className="text-base md:text-lg font-bold">{player.ht}</div>
              </div>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/25 mb-1.5">Weight</div>
                <div className="text-base md:text-lg font-bold">{player.wt}</div>
              </div>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/25 mb-1.5">Class</div>
                <div className="text-base md:text-lg font-bold">{player.year}</div>
              </div>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/25 mb-1.5">Hometown</div>
                <div className="text-base md:text-lg font-bold">{player.hometown}</div>
              </div>
              {player.school && (
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/25 mb-1.5">School</div>
                  <div className="text-base md:text-lg font-bold">{player.school}</div>
                </div>
              )}
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-x-8 gap-y-6 mb-6">
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/25 mb-1.5">B/T</div>
                <div className="text-base md:text-lg font-bold">{player.bats}-{player.throws}</div>
              </div>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/25 mb-1.5">Team</div>
                <div className="text-base md:text-lg font-bold">{team.name}</div>
              </div>
            </div>

            {/* Social Icons */}
            {(player.instagram || player.twitter) && (
              <div className="flex items-center gap-4 pt-4 border-t border-[#171717]">
                {player.instagram && (
                  <a href={`https://instagram.com/${player.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="text-white/25 hover:text-[#17FC13] transition-colors no-underline" title="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                )}
                {player.twitter && (
                  <a href={`https://twitter.com/${player.twitter.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="text-white/25 hover:text-[#17FC13] transition-colors no-underline" title="X / Twitter">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>


      {/* ══════ CONTENT ══════ */}
      <div className="max-w-[1120px] mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* ─── LEFT (8 cols) ─── */}
          <div className="lg:col-span-8 space-y-5">

            {/* Bio */}
            {player.bio && (
              <div className="border border-[#171717] p-5">
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/15 mb-2">About</div>
                <p className="text-[13px] text-white/50 leading-[1.8]">{player.bio}</p>
              </div>
            )}

            {/* Stats */}
            {stats && (
              <div className="border border-[#171717] p-5">
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/40 mb-3">Season Stats</div>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-1.5">
                  {[
                    { l: "AB", v: stats.AB }, { l: "H", v: stats.H }, { l: "2B", v: stats["2B"] }, { l: "3B", v: stats["3B"] },
                    { l: "HR", v: stats.HR }, { l: "RBI", v: stats.RBI }, { l: "BB", v: stats.BB }, { l: "K", v: stats.K },
                    { l: "AVG", v: stats.AVG }, { l: "OBP", v: stats.OBP }, { l: "SLG", v: stats.SLG },
                  ].map((s) => (
                    <div key={s.l} className="border border-[#171717] py-2 px-1 text-center">
                      <div className="text-[7px] font-bold uppercase tracking-wider text-white/15 mb-0.5">{s.l}</div>
                      <div className="text-xs font-bold">{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Game Log */}
            {gameLog.length > 0 && (
              <div className="border border-[#171717]">
                <div className="px-5 py-3 border-b border-[#171717]">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/15">Game Log</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[11px]">
                    <thead>
                      <tr className="border-b border-[#171717] bg-white/[0.01]">
                        {["Date", "Opp", "", "AB", "H", "HR", "RBI", "BB", "K"].map((h) => (
                          <th key={h} className={`${h === "Date" || h === "Opp" ? "text-left px-4" : "text-center px-2"} py-2 font-bold uppercase tracking-wider text-white/20`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {gameLog.map((g) => (
                        <tr key={g.gameId} className="border-b border-[#171717] last:border-b-0 hover:bg-white/[0.01]">
                          <td className="px-4 py-2 text-white/30">{g.date}</td>
                          <td className="px-4 py-2 font-bold uppercase text-white/50">
                            <a href={`/teams/${teamId}/game/${g.gameId}`} className="text-white/50 no-underline hover:text-[#17FC13]">{g.opponent}</a>
                          </td>
                          <td className="px-2 py-2 text-center"><span className={`font-bold ${g.result.startsWith("W") ? "text-[#17FC13]" : "text-white/25"}`}>{g.result.split(" ")[0]}</span></td>
                          <td className="px-2 py-2 text-center text-white/40">{g.AB}</td>
                          <td className="px-2 py-2 text-center text-white/40">{g.H}</td>
                          <td className="px-2 py-2 text-center text-white/40">{g.HR}</td>
                          <td className="px-2 py-2 text-center text-white/40">{g.RBI}</td>
                          <td className="px-2 py-2 text-center text-white/40">{g.BB}</td>
                          <td className="px-2 py-2 text-center text-white/40">{g.K}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Achievements */}
            {player.achievements && player.achievements.length > 0 && (
              <div className="border border-[#171717] p-5">
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/15 mb-3">Achievements</div>
                <div className="flex flex-wrap gap-1.5">
                  {player.achievements.map((a, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-[#171717] text-[10px] font-bold uppercase tracking-wider text-white/40">
                      <span className="w-1 h-1 bg-[#17FC13] rounded-full" />{a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ─── RIGHT (4 cols) ─── */}
          <div className="lg:col-span-4 space-y-5">

            {/* Teammates */}
            <div className="border border-[#171717] p-5">
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/15 mb-3">Teammates</div>
              <div className="space-y-1.5">
                {teammates.map((t) => (
                  <a key={t.number} href={`/teams/${teamId}/player/${t.number}`} className="flex items-center justify-between py-1.5 no-underline group">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#17FC13]/25 w-5">#{t.number}</span>
                      <span className="text-[11px] font-bold uppercase text-white/45 group-hover:text-[#17FC13] transition-colors">{t.name}</span>
                    </div>
                    <span className="text-[9px] text-white/15">{t.pos}</span>
                  </a>
                ))}
              </div>
              <a href={`/teams/${teamId}`} className="block mt-3 pt-3 border-t border-[#171717] text-[10px] font-bold uppercase tracking-wider text-white/15 no-underline hover:text-[#17FC13] transition-colors text-center">
                Full Roster
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
