"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ALL_TEAMS } from "@/lib/team-data";
import { getGames, isCoachSession } from "@/lib/game-store";
import { computeTeamBatting } from "@/lib/stat-calculator";
import type { Game, BattingLine } from "@/lib/scoring-types";
import { GAME_TYPE_LABELS } from "@/lib/scoring-types";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/Button";
import { CONTACT } from "@/lib/constants";

export default function TeamPage() {
  const pathname = usePathname();
  const teamId = pathname.split("/")[2];
  const team = ALL_TEAMS[teamId];

  const [games, setGames] = useState<Game[]>([]);
  const [batting, setBatting] = useState<BattingLine[]>([]);
  const [isCoach, setIsCoach] = useState(false);

  useEffect(() => {
    if (!team) return;
    const g = getGames(teamId);
    setGames(g);
    setIsCoach(isCoachSession(teamId));
    const scored = g.filter((x) => x.status === "final" || x.status === "live");
    if (scored.length > 0) setBatting(computeTeamBatting(teamId, g));
  }, [teamId, team]);

  if (!team) return <div className="max-w-[1120px] mx-auto px-6 pt-32 pb-20 text-center"><p className="text-white/70">Team not found.</p></div>;

  const liveGames = games.filter((g) => g.status === "live");
  const upcomingGames = games.filter((g) => g.status === "upcoming");
  const recentGames = games.filter((g) => g.status === "final").reverse();

  // ══════ COMING SOON ══════
  if (team.comingSoon) {
    return (
      <Section size="lg">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl md:text-4xl uppercase font-bold mb-3">
            {team.age} <span className="accent-text">Coming Soon</span>
          </h2>
          <p className="text-[14px] text-white/75 leading-[1.7] mb-8">{team.description}</p>
          <Button href="/join">Register Interest</Button>
        </div>
      </Section>
    );
  }

  return (
    <>
      {/* ══════ LIVE BANNER ══════ */}
      {liveGames.length > 0 && (
        <div className="border-y border-[#17FC13]/20 bg-[#17FC13]/[0.02]">
          <div className="max-w-[1120px] mx-auto px-6 py-3">
            {liveGames.map((g) => (
              <a key={g.id} href={`/teams/${teamId}/game/${g.id}`} className="flex items-center justify-between no-underline">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#17FC13]"><span className="w-2 h-2 bg-[#17FC13] rounded-full animate-pulse" />Live</span>
                  <span className="text-xs font-bold uppercase">vs {g.opponent}</span>
                </div>
                <span className="text-lg font-bold">{g.linescore.awayRuns} - <span className="text-[#17FC13]">{g.linescore.homeRuns}</span></span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ══════ ROSTER ══════ */}
      <Section size="md" border="top">
        <SectionHeading accent="Roster" label={`${team.roster.length} Players`}>Active</SectionHeading>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...team.roster].sort((a, b) => a.name.split(" ").pop()!.localeCompare(b.name.split(" ").pop()!)).map((player, i) => (
            <FadeIn key={i} delay={i * 0.02}>
              <a href={`/teams/${teamId}/player/${player.number}`} className="no-underline block border border-[#171717] bg-radial hover:border-[#404040] hover:-translate-y-0.5 transition-all p-4 group">
                <div className="relative aspect-square bg-black mb-3 flex items-center justify-center overflow-hidden">
                  <span className="text-5xl font-bold text-white/60 group-hover:text-[#17FC13]/40 transition-colors leading-none" style={{ fontFamily: "var(--font-perf)" }}>{player.number}</span>
                  {player.committed && <div className="absolute top-2 left-2 text-[7px] font-bold uppercase tracking-wider text-[#17FC13] bg-[#17FC13]/[0.08] border border-[#17FC13]/30 px-1.5 py-0.5">Committed</div>}
                </div>
                <p className="text-[10px] text-[#17FC13]/50 uppercase tracking-wide">#{player.number} &middot; {player.pos}</p>
                <p className="text-sm font-bold uppercase group-hover:text-[#17FC13] transition-colors leading-tight">{player.name}</p>
                <p className="text-[9px] text-white/55 mt-0.5">{player.year} &middot; {player.hometown}</p>
              </a>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ══════ SCHEDULE & RESULTS ══════ */}
      <Section size="md" border="top" bg="radial">
        <div className="flex items-center justify-between mb-8">
          <SectionHeading accent="Results">Schedule &amp;</SectionHeading>
          {isCoach && (
            <a href={`/teams/${teamId}/schedule`} className="text-[10px] font-bold uppercase tracking-wider text-[#17FC13]/40 no-underline hover:text-[#17FC13]">Manage Games</a>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upcoming */}
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/60 mb-3">Upcoming</div>
            {upcomingGames.length > 0 ? (
              <div className="border border-[#171717]">
                {upcomingGames.map((g) => (
                  <a key={g.id} href={`/teams/${teamId}/game/${g.id}`} className="flex items-center justify-between px-4 py-3.5 border-b border-[#171717] last:border-b-0 no-underline hover:bg-white/[0.01] transition-colors">
                    <div>
                      <div className="text-[10px] text-white/65">{g.date} &middot; {g.time}</div>
                      <div className="text-sm font-bold uppercase mt-0.5">vs {g.opponent}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[8px] font-bold uppercase tracking-wider text-white/55">{GAME_TYPE_LABELS[g.gameType]}</div>
                      {g.venue?.name && <div className="text-[9px] text-white/10 mt-0.5">{g.venue.name}</div>}
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="border border-[#171717] px-4 py-8 text-center text-xs text-white/55">No upcoming games</div>
            )}
          </div>

          {/* Recent Results */}
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/60 mb-3">Recent Results</div>
            {recentGames.length > 0 ? (
              <div className="border border-[#171717]">
                {recentGames.slice(0, 8).map((g) => {
                  const won = g.linescore.homeRuns > g.linescore.awayRuns;
                  return (
                    <a key={g.id} href={`/teams/${teamId}/game/${g.id}`} className="flex items-center justify-between px-4 py-3.5 border-b border-[#171717] last:border-b-0 no-underline hover:bg-white/[0.01] transition-colors">
                      <div>
                        <div className="text-[10px] text-white/60">{g.date}</div>
                        <div className="text-sm font-bold uppercase mt-0.5">vs {g.opponent}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${won ? "text-[#17FC13]" : "text-white/70"}`}>{won ? "W" : "L"}</span>
                        <span className="text-sm font-bold">{g.linescore.awayRuns}-{g.linescore.homeRuns}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            ) : team.schedule.length > 0 ? (
              <div className="border border-[#171717]">
                {team.schedule.map((g, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-3.5 border-b border-[#171717] last:border-b-0">
                    <div>
                      <div className="text-[10px] text-white/60">{g.date}</div>
                      <div className="text-sm font-bold uppercase mt-0.5">vs {g.opponent}</div>
                    </div>
                    <span className={`text-xs font-bold ${g.result === "W" ? "text-[#17FC13]" : "text-white/70"}`}>{g.result} {g.score}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-[#171717] px-4 py-8 text-center text-xs text-white/55">No results yet</div>
            )}
          </div>
        </div>
      </Section>

      {/* ══════ STATS ══════ */}
      <Section size="md" border="top">
        <SectionHeading accent="Leaders">Season</SectionHeading>
        {batting.length > 0 ? (
          <div className="border border-[#171717] overflow-x-auto">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-[#171717] bg-white/[0.01]">
                  <th className="text-left px-4 py-2.5 font-bold uppercase tracking-wider text-white/60 min-w-[130px]">Player</th>
                  {["AB", "H", "2B", "3B", "HR", "RBI", "BB", "K", "AVG", "OBP", "SLG"].map((h) => (
                    <th key={h} className="px-2 py-2.5 font-bold text-white/60 text-center">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {batting.map((l) => (
                  <tr key={l.playerId} className="border-b border-[#171717] last:border-b-0 hover:bg-white/[0.01]">
                    <td className="px-4 py-2.5">
                      <a href={`/teams/${teamId}/player/${l.playerId}`} className="font-bold uppercase text-white/60 no-underline hover:text-[#17FC13]">{l.playerName}</a>
                    </td>
                    <td className="px-2 py-2.5 text-center text-white/80">{l.AB}</td>
                    <td className="px-2 py-2.5 text-center text-white/80">{l.H}</td>
                    <td className="px-2 py-2.5 text-center text-white/80">{l["2B"]}</td>
                    <td className="px-2 py-2.5 text-center text-white/80">{l["3B"]}</td>
                    <td className="px-2 py-2.5 text-center text-white/80">{l.HR}</td>
                    <td className="px-2 py-2.5 text-center text-white/80">{l.RBI}</td>
                    <td className="px-2 py-2.5 text-center text-white/80">{l.BB}</td>
                    <td className="px-2 py-2.5 text-center text-white/80">{l.K}</td>
                    <td className="px-2 py-2.5 text-center font-bold text-white/70">{l.AVG}</td>
                    <td className="px-2 py-2.5 text-center text-white/80">{l.OBP}</td>
                    <td className="px-2 py-2.5 text-center text-white/80">{l.SLG}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/55 mb-3">Batting</div>
              <div className="border border-[#171717]">
                {team.battingLeaders.map((l, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-3 border-b border-[#171717] last:border-b-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-[#17FC13]/40 w-8">{l.stat}</span>
                      <span className="text-xs font-bold uppercase text-white/90">{l.name}</span>
                    </div>
                    <span className="text-lg font-bold">{l.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/55 mb-3">Pitching</div>
              <div className="border border-[#171717]">
                {team.pitchingLeaders.map((l, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-3 border-b border-[#171717] last:border-b-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-[#17FC13]/40 w-8">{l.stat}</span>
                      <span className="text-xs font-bold uppercase text-white/90">{l.name}</span>
                    </div>
                    <span className="text-lg font-bold">{l.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Section>

      {/* ══════ COACHING STAFF ══════ */}
      <Section size="md" border="top" bg="radial">
        <SectionHeading accent="Staff">Coaching</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {team.coaches.map((c, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="border border-[#171717] p-6 hover:border-[#17FC13]/10 transition-colors">
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/40 mb-1">{c.role}</div>
                <h3 className="text-sm uppercase font-bold mb-2">{c.name}</h3>
                <p className="text-[12px] text-white/75 leading-[1.7]">{c.bio}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ══════ CTA ══════ */}
      <Section size="md" border="top">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#171717] bg-radial p-6 md:p-8">
          <div>
            <h3 className="text-xl uppercase font-bold mb-1">Join {team.name}</h3>
            <p className="text-[13px] text-white/70">Interested in trying out? Register for upcoming tryouts.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button href="/join" size="small">Register</Button>
            <Button href={`mailto:${CONTACT.email}?subject=${team.age} Tryout Inquiry`} variant="secondary" size="small">Contact</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
