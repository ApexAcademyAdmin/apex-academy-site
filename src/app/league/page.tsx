"use client";

import { useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { LEAGUE_META, STANDINGS, UPCOMING_GAMES, RECENT_RESULTS } from "@/lib/league-data";

const AGE_GROUPS = ["10U", "12U", "14U", "16U", "18U"];

// ═══════════════════════════════════════
// HEADER — compact, informational
// ═══════════════════════════════════════
function Header() {
  return (
    <div className="pt-24 md:pt-32 pb-6">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#17FC13]/20 bg-[#17FC13]/5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/80">{LEAGUE_META.season}</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">{LEAGUE_META.seasonStart} — {LEAGUE_META.seasonEnd}</span>
            </div>
            <h1 className="text-3xl md:text-4xl uppercase font-bold leading-[0.9] mb-2">
              Apex <span className="accent-text">League</span>
            </h1>
            <p className="text-sm text-white/40 max-w-md">
              {LEAGUE_META.divisions.length} divisions &middot; {LEAGUE_META.totalTeams} teams &middot; Weekday games only &middot; Greater Boston
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button href="/league/register" size="small">Register Team</Button>
            <Button variant="secondary" href="/live" size="small">Watch Live</Button>
            <Button variant="secondary" href="/league/submit-result" size="small">Submit Result</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// UPCOMING GAMES — what's next
// ═══════════════════════════════════════
function UpcomingGames() {
  const games = UPCOMING_GAMES.slice(0, 6);

  // Group by date
  const grouped: Record<string, typeof games> = {};
  for (const g of games) {
    if (!grouped[g.date]) grouped[g.date] = [];
    grouped[g.date].push(g);
  }

  return (
    <Section size="sm" border="bottom">
      <FadeIn>
        <div className="flex items-center justify-between mb-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50">Upcoming Games</div>
          <a href="/league/schedule" className="text-[10px] font-bold uppercase tracking-wider text-white/30 hover:text-[#17FC13]/60 transition-colors no-underline">Full Schedule →</a>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="space-y-4">
          {Object.entries(grouped).map(([date, dateGames]) => (
            <div key={date}>
              <div className="text-[10px] font-bold uppercase tracking-wider text-white/20 mb-2">{date}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {dateGames.map(g => (
                  <div key={g.id} className="bg-[#0d1117] rounded-lg border border-white/[0.04] px-4 py-3 hover:border-[#17FC13]/10 transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/[0.04] text-white/40">{g.ageGroup} {g.division}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-white/30">{g.time}</span>
                        {g.streamAvailable && (
                          <a href="/live" className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#17FC13]/10 text-[#17FC13]/60 no-underline hover:bg-[#17FC13]/20 transition-colors">Stream</a>
                        )}
                      </div>
                    </div>
                    <div className="text-[12px] text-white/70">
                      <span className="font-medium">{g.away}</span>
                      <span className="text-white/20 mx-1.5">@</span>
                      <span className="font-medium">{g.home}</span>
                    </div>
                    <div className="text-[10px] text-white/20 mt-1">{g.location}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

// ═══════════════════════════════════════
// STANDINGS — tabbed by age group
// ═══════════════════════════════════════
function StandingsPreview() {
  const [activeAge, setActiveAge] = useState("12U");

  const divA = STANDINGS[`${activeAge}-A`] || [];
  const divB = STANDINGS[`${activeAge}-B`] || [];

  function MiniTable({ rows, label }: { rows: typeof divA; label: string }) {
    return (
      <div className="bg-[#0d1117] rounded-lg border border-white/[0.04]">
        <div className="px-4 py-2.5 border-b border-white/[0.04]">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#17FC13]/50">{label}</span>
        </div>
        {rows.map((t, i) => (
          <div key={t.team} className={`flex items-center gap-3 px-4 py-2.5 ${i < rows.length - 1 ? "border-b border-white/[0.02]" : ""}`}>
            <div className="flex items-center gap-1.5 w-5">
              {t.playoffBound && <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13]" />}
              <span className="text-[11px] font-mono text-white/40">{t.rank}</span>
            </div>
            <span className="text-[12px] font-medium text-white/80 flex-1">
              {t.teamId ? <a href={`/teams/${t.teamId}`} className="text-[#17FC13]/80 hover:text-[#17FC13] no-underline transition-colors">{t.team}</a> : t.team}
            </span>
            <span className="text-[11px] font-mono text-white/40 w-10 text-right">{t.w}-{t.l}{t.t ? `-${t.t}` : ""}</span>
            <span className="text-[11px] font-mono font-bold text-white/60 w-10 text-right">{t.pct}</span>
            <span className={`text-[10px] font-mono font-bold w-8 text-right ${t.streak.startsWith("W") ? "text-[#17FC13]/60" : "text-red-400/50"}`}>{t.streak}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Section border="bottom">
      <FadeIn>
        <div className="flex items-center justify-between mb-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50">Standings</div>
          <a href="/league/standings" className="text-[10px] font-bold uppercase tracking-wider text-white/30 hover:text-[#17FC13]/60 transition-colors no-underline">All Divisions →</a>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="flex gap-1 mb-5">
          {AGE_GROUPS.map(age => (
            <button key={age} onClick={() => setActiveAge(age)}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${activeAge === age ? "bg-[#17FC13]/10 text-[#17FC13] border border-[#17FC13]/25" : "text-white/40 border border-white/[0.04] hover:border-white/[0.08]"}`}>
              {age}
            </button>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <MiniTable rows={divA} label={`Division A`} />
          <MiniTable rows={divB} label={`Division B`} />
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="flex items-center gap-3 mt-3 text-[10px] text-white/20">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#17FC13]" /> Playoff qualifier</span>
          <span>Top 2 per division advance</span>
        </div>
      </FadeIn>
    </Section>
  );
}

// ═══════════════════════════════════════
// RECENT RESULTS — last games played
// ═══════════════════════════════════════
function Results() {
  return (
    <Section border="bottom">
      <FadeIn>
        <div className="flex items-center justify-between mb-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50">Recent Results</div>
          <a href="/league/results" className="text-[10px] font-bold uppercase tracking-wider text-white/30 hover:text-[#17FC13]/60 transition-colors no-underline">All Results →</a>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {RECENT_RESULTS.slice(0, 6).map(r => {
            const awayWin = r.awayScore > r.homeScore;
            return (
              <div key={r.id} className="bg-[#0d1117] rounded-lg border border-white/[0.04] px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-white/25">{r.date}</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/[0.04] text-white/40">{r.division}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-[12px] ${awayWin ? "font-bold text-white/90" : "text-white/50"}`}>{r.away}</span>
                    <span className={`text-[13px] font-mono ${awayWin ? "font-bold text-white/90" : "text-white/40"}`}>{r.awayScore}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[12px] ${!awayWin ? "font-bold text-white/90" : "text-white/50"}`}>{r.home}</span>
                    <span className={`text-[13px] font-mono ${!awayWin ? "font-bold text-white/90" : "text-white/40"}`}>{r.homeScore}</span>
                  </div>
                </div>
                <div className="text-[9px] text-white/15 uppercase tracking-wider mt-2">Final</div>
              </div>
            );
          })}
        </div>
      </FadeIn>
    </Section>
  );
}

// ═══════════════════════════════════════
// QUICK ACCESS — tools & resources
// ═══════════════════════════════════════
function QuickAccess() {
  const links = [
    { label: "Rules & Format", desc: "By division", href: "/league/rules" },
    { label: "Field Locations", desc: "169+ fields", href: "/league/fields" },
    { label: "Register Team", desc: LEAGUE_META.registrationFee, href: "/league/register" },
    { label: "Submit Result", desc: "Post-game", href: "/league/submit-result" },
  ];

  return (
    <Section size="sm" border="bottom">
      <FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {links.map(l => (
            <a key={l.label} href={l.href} className="bg-[#0d1117] rounded-lg border border-white/[0.04] px-4 py-3.5 hover:border-[#17FC13]/10 transition-all no-underline group">
              <div className="text-[12px] font-bold text-white/80 group-hover:text-[#17FC13] transition-colors">{l.label}</div>
              <div className="text-[10px] text-white/30 mt-0.5">{l.desc}</div>
            </a>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

// ═══════════════════════════════════════
// FEATURED EVENT
// ═══════════════════════════════════════
function FeaturedEvent() {
  return (
    <Section border="bottom">
      <FadeIn>
        <div className="bg-[#0d1117] rounded-2xl border border-[#17FC13]/10 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50">Featured Event</div>
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#17FC13]/10 text-[#17FC13]/60">August 2026</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold uppercase text-white/90 mb-1">All-New England Prospect Games</h3>
              <p className="text-[12px] text-white/40 max-w-lg leading-relaxed">
                Two-day prospect combine and showcase. Verified metrics, college coach exposure, recruiting education, and two prospect games. 16U &middot; 17U &middot; 18U.
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button href="/league/showcase/nominate" size="small">Nominate a Prospect</Button>
              <Button variant="secondary" href="/league/showcase" size="small">Event Details</Button>
            </div>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}

// ═══════════════════════════════════════
// LEAGUE INFO — season details
// ═══════════════════════════════════════
function LeagueInfo() {
  return (
    <Section size="sm" border="bottom">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
          <div className="flex-1">
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-2">About the League</div>
            <p className="text-[13px] text-white/50 leading-relaxed">
              {LEAGUE_META.divisions.length} age divisions from 10U through 18U. Two divisions per age group. Games played exclusively on Wednesdays, Thursdays, and Fridays — weekends stay free for travel tournaments. Development-focused, affordable for every family.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 flex-shrink-0">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-white/20 mb-0.5">Teams</div>
              <div className="text-sm font-bold text-white/70">{LEAGUE_META.totalTeams}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-white/20 mb-0.5">Players</div>
              <div className="text-sm font-bold text-white/70">{LEAGUE_META.totalPlayers}+</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-white/20 mb-0.5">Games</div>
              <div className="text-sm font-bold text-white/70">{LEAGUE_META.totalGames}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-white/20 mb-0.5">Fee</div>
              <div className="text-sm font-bold text-white/70">{LEAGUE_META.registrationFee}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-white/20 mb-0.5">Championship</div>
              <div className="text-sm font-bold text-white/70">Aug 22-23</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-white/20 mb-0.5">Game Days</div>
              <div className="text-sm font-bold text-white/70">Wed-Fri</div>
            </div>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}

// ═══════════════════════════════════════
// REGISTRATION CTA
// ═══════════════════════════════════════
function RegistrationCTA() {
  return (
    <Section size="lg">
      <FadeIn>
        <div className="text-center">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Registration Open</div>
          <h2 className="text-2xl md:text-3xl font-bold uppercase mb-3 leading-[0.9]">
            Join the <span className="accent-text">League</span>
          </h2>
          <p className="text-sm text-white/40 max-w-md mx-auto mb-6">
            Ages 8-18. All skill levels. {LEAGUE_META.registrationFee} per team. Deadline: {LEAGUE_META.registrationDeadline}.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/league/register">Register Now</Button>
            <Button variant="secondary" href="mailto:apexsportsgg@gmail.com">Contact Us</Button>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}

// ═══════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════
export default function LeaguePage() {
  return (
    <main>
      <Header />
      <UpcomingGames />
      <StandingsPreview />
      <Results />
      <QuickAccess />
      <FeaturedEvent />
      <LeagueInfo />
      <RegistrationCTA />
    </main>
  );
}
