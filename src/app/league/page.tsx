"use client";

import { useState } from "react";

import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { LEAGUE_META, STANDINGS, UPCOMING_GAMES, RECENT_RESULTS } from "@/lib/league-data";

const AGE_GROUPS = ["10U", "12U", "14U", "16U", "18U"];

// ═══════════════════════════════════════
// HEADER — what is the league
// ═══════════════════════════════════════
function Header() {
  return (
    <div className="pt-24 md:pt-28 pb-8 md:pb-12">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#17FC13]/20 bg-[#17FC13]/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/80">{LEAGUE_META.season} — Registration Open</span>
          </div>
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl uppercase font-bold leading-[0.85] mb-5 max-w-3xl">
            Community Baseball<br /><span className="accent-text">Built Different</span>
          </h1>
        </div>

        <div>
          <p className="text-base md:text-lg text-white/90 max-w-2xl leading-relaxed mb-4">
            The Apex Academy League is a weekday baseball league for players ages 8–18 across Greater Boston. Games are played exclusively on Wednesdays, Thursdays, and Fridays — keeping weekends free for travel tournaments. Development-focused. Affordable for every family.
          </p>
          <p className="text-sm text-white/70 mb-8">
            {LEAGUE_META.seasonStart} — {LEAGUE_META.seasonEnd} &middot; {LEAGUE_META.registrationFee} per team &middot; {LEAGUE_META.location}
          </p>
        </div>

        <div>
          <div className="flex flex-wrap gap-3">
            <Button href="/league/register">Register a Team</Button>
            <Button variant="secondary" href="#standings">View Standings</Button>
            <Button variant="secondary" href="/league/schedule">View Schedule</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// HOW IT WORKS — the league explained
// ═══════════════════════════════════════
function HowItWorks() {
  const points = [
    { title: "Age-Based Divisions", desc: "Multiple age groups from youth through high school, each with their own division structure and age-appropriate rules." },
    { title: "Weekday Games Only", desc: "All games are scheduled on weekday evenings. Weekends stay open for travel tournaments, showcases, and family time." },
    { title: "Real Baseball Rules", desc: "MLB-style rules adjusted by age. Pitch counts, rest requirements, leadoffs, stealing, dropped third strike — all enforced." },
    { title: "Playoffs & Championship", desc: "Top teams from each division qualify for single-elimination playoffs leading to a season-ending Championship Weekend." },
  ];

  return (
    <Section border="bottom">
      <div>
        <div className="mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">How It Works</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold">The <span className="accent-text">Format</span></h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {points.map((p, i) => (
          <div key={p.title}>
            <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-5">
              <div className="text-sm font-bold text-white/80 mb-1.5">{p.title}</div>
              <div className="text-[12px] text-white/80 leading-relaxed">{p.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════
// WHO IT'S FOR
// ═══════════════════════════════════════
function WhoItsFor() {
  const audiences = [
    {
      title: "Travel Players",
      desc: "Stay game-ready between tournaments and showcase events. The Apex Academy League provides meaningful weekday competition, helping players accumulate valuable at-bats, innings, and defensive reps without interfering with weekend travel schedules.",
      note: "Ideal for athletes looking to continue developing throughout the season while maintaining their tournament commitments.",
    },
    {
      title: "Recreational Players",
      desc: "Organized, competitive baseball in a development-focused environment. Players benefit from a professionally run league with certified umpires, enforced pitch counts, tracked standings, and opportunities to be recognized through player profiles and league events.",
      note: "An affordable way for families to experience organized baseball without sacrificing quality.",
    },
    {
      title: "Teams & Organizations",
      desc: "Bring your roster. We\u2019ll handle the rest. The Apex Academy League provides scheduling, fields, umpires, standings, and league operations, allowing coaches and organizations to focus on player development and competition.",
      note: "A turnkey solution for programs seeking a professional league experience.",
    },
    {
      title: "Future Prospects",
      desc: "More opportunities to compete. More opportunities to be seen. League participants gain access to player profiles, statistical tracking, media exposure, and eligibility for events such as the All-New England Prospect Games and other Apex recruiting initiatives.",
      note: "Because development is about more than games \u2014 it\u2019s about creating opportunities for the next level.",
    },
  ];

  return (
    <Section border="bottom">
      <div>
        <div className="mb-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Who It&apos;s For</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold mb-3">Built for Every Level of <span className="accent-text">Baseball</span></h2>
          <p className="text-sm text-white/80 max-w-2xl leading-relaxed">
            Whether you&apos;re looking for additional game reps, affordable competition, or a professionally operated league experience, the Apex Academy League was designed to serve players, families, teams, and organizations throughout Greater Boston and New England.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {audiences.map((a, i) => (
          <div key={a.title}>
            <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-5 h-full">
              <div className="text-sm font-bold text-white/80 mb-2">{a.title}</div>
              <div className="text-[12px] text-white/80 leading-relaxed mb-3">{a.desc}</div>
              <div className="text-[11px] text-white/60 font-medium leading-relaxed">{a.note}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════
// LEAGUE ACTIVITY — standings + results + schedule
// ═══════════════════════════════════════
function LeagueActivity() {
  const [activeAge, setActiveAge] = useState("12U");
  const divA = STANDINGS[`${activeAge}-Premier`] || [];
  const divB = STANDINGS[`${activeAge}-Prospect`] || [];

  const nextGames = UPCOMING_GAMES.slice(0, 4);
  const recentResults = RECENT_RESULTS.slice(0, 4);

  return (
    <Section id="standings" border="bottom">
      <div>
        <div className="mb-6">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">League Activity</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold">Standings, Scores & <span className="accent-text">Schedule</span></h2>
        </div>
      </div>

      {/* STANDINGS */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-1">
            {AGE_GROUPS.map(age => (
              <button key={age} onClick={() => setActiveAge(age)}
                className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${activeAge === age ? "bg-[#17FC13]/10 text-[#17FC13] border border-[#17FC13]/25" : "text-white/80 border border-white/[0.04] hover:border-white/[0.08]"}`}>
                {age}
              </button>
            ))}
          </div>
          <a href="/league/standings" className="text-[10px] font-bold uppercase tracking-wider text-white/70 hover:text-[#17FC13]/60 transition-colors no-underline">All Standings →</a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-8">
          {[{ rows: divA, label: "Premier Division" }, { rows: divB, label: "Prospect Division" }].map(({ rows, label }) => (
            <div key={label} className="bg-[#0d1117] rounded-lg border border-white/[0.04]">
              <div className="px-4 py-2 border-b border-white/[0.04]">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#17FC13]/50">{label}</span>
              </div>
              {rows.map((t, i) => (
                <div key={t.team} className={`flex items-center gap-3 px-4 py-2 ${i < rows.length - 1 ? "border-b border-white/[0.02]" : ""}`}>
                  <div className="flex items-center gap-1.5 w-5">
                    {t.playoffBound && <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13]" />}
                    <span className="text-[11px] font-mono text-white/80">{t.rank}</span>
                  </div>
                  <span className="text-[12px] font-medium text-white/80 flex-1">
                    {t.teamId ? <a href={`/teams/${t.teamId}`} className="text-[#17FC13]/80 hover:text-[#17FC13] no-underline transition-colors">{t.team}</a> : t.team}
                  </span>
                  <span className="text-[11px] font-mono text-white/80 w-10 text-right">{t.w}-{t.l}{t.t ? `-${t.t}` : ""}</span>
                  <span className="text-[11px] font-mono font-bold text-white/60 w-10 text-right">{t.pct}</span>
                  <span className={`text-[10px] font-mono font-bold w-8 text-right ${t.streak.startsWith("W") ? "text-[#17FC13]/60" : "text-red-400/50"}`}>{t.streak}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* RESULTS + SCHEDULE side by side */}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent Results */}
          <div className="bg-[#0d1117] rounded-lg border border-white/[0.04]">
            <div className="px-4 py-2.5 border-b border-white/[0.04] flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#17FC13]/50">Recent Results</span>
              <a href="/league/results" className="text-[10px] text-white/65 hover:text-[#17FC13]/50 transition-colors no-underline">View All →</a>
            </div>
            {recentResults.map((r, i) => {
              const homeWin = r.homeScore > r.awayScore;
              return (
                <div key={r.id} className={`px-4 py-2.5 ${i < recentResults.length - 1 ? "border-b border-white/[0.02]" : ""}`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white/65">{r.division}</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/[0.04] text-white/70">Final</span>
                  </div>
                  <div className={`flex items-center justify-between ${!homeWin ? "" : "opacity-50"}`}>
                    <div className="flex items-center gap-2">
                      {!homeWin && <span className="w-0.5 h-3.5 rounded-full bg-[#17FC13]" />}
                      {homeWin && <span className="w-0.5 h-3.5 rounded-full bg-transparent" />}
                      <span className="text-[13px] font-bold text-white">{r.away}</span>
                    </div>
                    <span className="text-[14px] font-bold font-mono text-white tabular-nums">{r.awayScore}</span>
                  </div>
                  <div className={`flex items-center justify-between ${homeWin ? "" : "opacity-50"}`}>
                    <div className="flex items-center gap-2">
                      {homeWin && <span className="w-0.5 h-3.5 rounded-full bg-[#17FC13]" />}
                      {!homeWin && <span className="w-0.5 h-3.5 rounded-full bg-transparent" />}
                      <span className="text-[13px] font-bold text-white">{r.home}</span>
                    </div>
                    <span className="text-[14px] font-bold font-mono text-white tabular-nums">{r.homeScore}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Upcoming Games */}
          <div className="bg-[#0d1117] rounded-lg border border-white/[0.04]">
            <div className="px-4 py-2.5 border-b border-white/[0.04] flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#17FC13]/50">Upcoming Games</span>
              <a href="/league/schedule" className="text-[10px] text-white/65 hover:text-[#17FC13]/50 transition-colors no-underline">Full Schedule →</a>
            </div>
            {nextGames.map((g, i) => (
              <div key={g.id} className={`px-4 py-2.5 ${i < nextGames.length - 1 ? "border-b border-white/[0.02]" : ""}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-white/60">{g.date} &middot; {g.time}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white/65">{g.ageGroup} {g.division}</span>
                  </div>
                </div>
                <div className="text-[12px] text-white/60">
                  <span>{g.away}</span>
                  <span className="text-white/60 mx-1.5">@</span>
                  <span>{g.home}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════
// QUICK ACCESS — tools & resources
// ═══════════════════════════════════════
function QuickAccess() {
  const links = [
    { label: "Rules & Format", desc: "By age division", href: "/league/rules" },
    { label: "Field Locations", desc: "169+ approved fields", href: "/league/fields" },
    { label: "Awards & Banquet", desc: "Annual recognition", href: "/league/banquet" },
    { label: "Register Team", desc: LEAGUE_META.registrationFee, href: "/league/register" },
  ];

  return (
    <Section size="sm" border="bottom">
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {links.map(l => (
            <a key={l.label} href={l.href} className="bg-[#0d1117] rounded-lg border border-white/[0.04] px-4 py-3.5 hover:border-[#17FC13]/10 transition-all no-underline group">
              <div className="text-[12px] font-bold text-white/70 group-hover:text-[#17FC13] transition-colors">{l.label}</div>
              <div className="text-[10px] text-white/65 mt-0.5">{l.desc}</div>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════
// FEATURED EVENT
// ═══════════════════════════════════════
function FeaturedEvent() {
  return (
    <Section border="bottom">
      <div>
        <div className="bg-[#0d1117] rounded-2xl border border-[#17FC13]/10 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50">Featured Event</div>
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#17FC13]/10 text-[#17FC13]/60">August 2026</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold uppercase text-white/90 mb-1">All-New England Prospect Games</h3>
              <p className="text-[12px] text-white/80 max-w-lg leading-relaxed">
                Two-day prospect combine and showcase. Verified metrics, college coach exposure, recruiting education, and two prospect games. 16U &middot; 17U &middot; 18U.
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button href="/league/showcase/nominate" size="small">Nominate a Prospect</Button>
              <Button variant="secondary" href="/league/showcase" size="small">Event Details</Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════
// REGISTRATION CTA
// ═══════════════════════════════════════
function RegistrationCTA() {
  return (
    <Section size="lg">
      <div>
        <div className="text-center">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Registration Open</div>
          <h2 className="text-2xl md:text-3xl font-bold uppercase mb-3 leading-[0.9]">
            Join the <span className="accent-text">League</span>
          </h2>
          <p className="text-sm text-white/80 max-w-md mx-auto mb-6">
            Ages 8–18. All skill levels. {LEAGUE_META.registrationFee} per team. Registration deadline: {LEAGUE_META.registrationDeadline}.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/league/register">Register a Team</Button>
            <Button variant="secondary" href="mailto:admin@apexacademy.gg">Contact Us</Button>
          </div>
        </div>
      </div>
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
      <HowItWorks />
      <WhoItsFor />
      <LeagueActivity />
      <QuickAccess />
      <FeaturedEvent />
      <RegistrationCTA />
    </main>
  );
}
