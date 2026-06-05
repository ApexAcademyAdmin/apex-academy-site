"use client";

import { useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { LEAGUE_META, STANDINGS, UPCOMING_GAMES, RECENT_RESULTS } from "@/lib/league-data";

const AGE_GROUPS = ["10U", "12U", "14U", "16U", "18U"];

// ═══════════════════════════════════════
// HEADER — what is the league
// ═══════════════════════════════════════
function Header() {
  return (
    <div className="pt-24 md:pt-32 pb-8 md:pb-12">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#17FC13]/20 bg-[#17FC13]/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/80">{LEAGUE_META.season} — Registration Open</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl uppercase font-bold leading-[0.85] mb-5 max-w-3xl">
            Community Baseball<br /><span className="accent-text">Built Different</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="text-base md:text-lg text-white/50 max-w-2xl leading-relaxed mb-4">
            The Apex League is a weekday baseball league for players ages 8–18 across Greater Boston. Games are played exclusively on Wednesdays, Thursdays, and Fridays — keeping weekends free for travel tournaments. Development-focused. Affordable for every family.
          </p>
          <p className="text-sm text-white/30 mb-8">
            {LEAGUE_META.seasonStart} — {LEAGUE_META.seasonEnd} &middot; {LEAGUE_META.registrationFee} per team &middot; {LEAGUE_META.location}
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="flex flex-wrap gap-3">
            <Button href="/league/register">Register a Team</Button>
            <Button variant="secondary" href="#standings">View Standings</Button>
            <Button variant="secondary" href="/live">Watch Live</Button>
          </div>
        </FadeIn>
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
      <FadeIn>
        <div className="mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">How It Works</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold">The <span className="accent-text">Format</span></h2>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {points.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.05}>
            <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-5">
              <div className="text-sm font-bold text-white/80 mb-1.5">{p.title}</div>
              <div className="text-[12px] text-white/40 leading-relaxed">{p.desc}</div>
            </div>
          </FadeIn>
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
    { title: "Travel Players", desc: "Get more at-bats and innings during the week without conflicting with weekend tournaments. Stay sharp between showcase events." },
    { title: "Recreational Players", desc: "Competitive, organized baseball with real umpires, pitch counts, and standings — at a price families can afford." },
    { title: "New Teams & Programs", desc: "Register your team or organization. We provide the schedule, fields, umpires, live scoring, and streaming. You bring the players." },
  ];

  return (
    <Section border="bottom">
      <FadeIn>
        <div className="mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Who It&apos;s For</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold">Built for <span className="accent-text">Every Player</span></h2>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {audiences.map((a, i) => (
          <FadeIn key={a.title} delay={i * 0.05}>
            <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-5 h-full">
              <div className="text-sm font-bold text-white/80 mb-1.5">{a.title}</div>
              <div className="text-[12px] text-white/40 leading-relaxed">{a.desc}</div>
            </div>
          </FadeIn>
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
  const divA = STANDINGS[`${activeAge}-A`] || [];
  const divB = STANDINGS[`${activeAge}-B`] || [];

  const nextGames = UPCOMING_GAMES.slice(0, 4);
  const recentResults = RECENT_RESULTS.slice(0, 4);

  return (
    <Section id="standings" border="bottom">
      <FadeIn>
        <div className="mb-6">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">League Activity</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold">Standings, Scores & <span className="accent-text">Schedule</span></h2>
        </div>
      </FadeIn>

      {/* STANDINGS */}
      <FadeIn delay={0.05}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-1">
            {AGE_GROUPS.map(age => (
              <button key={age} onClick={() => setActiveAge(age)}
                className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${activeAge === age ? "bg-[#17FC13]/10 text-[#17FC13] border border-[#17FC13]/25" : "text-white/40 border border-white/[0.04] hover:border-white/[0.08]"}`}>
                {age}
              </button>
            ))}
          </div>
          <a href="/league/standings" className="text-[10px] font-bold uppercase tracking-wider text-white/30 hover:text-[#17FC13]/60 transition-colors no-underline">All Standings →</a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-8">
          {[{ rows: divA, label: "Division A" }, { rows: divB, label: "Division B" }].map(({ rows, label }) => (
            <div key={label} className="bg-[#0d1117] rounded-lg border border-white/[0.04]">
              <div className="px-4 py-2 border-b border-white/[0.04]">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#17FC13]/50">{label}</span>
              </div>
              {rows.map((t, i) => (
                <div key={t.team} className={`flex items-center gap-3 px-4 py-2 ${i < rows.length - 1 ? "border-b border-white/[0.02]" : ""}`}>
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
          ))}
        </div>
      </FadeIn>

      {/* RESULTS + SCHEDULE side by side */}
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent Results */}
          <div className="bg-[#0d1117] rounded-lg border border-white/[0.04]">
            <div className="px-4 py-2.5 border-b border-white/[0.04] flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#17FC13]/50">Recent Results</span>
              <a href="/league/results" className="text-[10px] text-white/25 hover:text-[#17FC13]/50 transition-colors no-underline">View All →</a>
            </div>
            {recentResults.map((r, i) => {
              const awayWin = r.awayScore > r.homeScore;
              return (
                <div key={r.id} className={`px-4 py-2.5 ${i < recentResults.length - 1 ? "border-b border-white/[0.02]" : ""}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-white/20">{r.date}</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white/25">{r.division}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[12px] ${awayWin ? "font-bold text-white/80" : "text-white/40"}`}>{r.away}</span>
                    <span className={`text-[12px] font-mono ${awayWin ? "font-bold text-white/80" : "text-white/30"}`}>{r.awayScore}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[12px] ${!awayWin ? "font-bold text-white/80" : "text-white/40"}`}>{r.home}</span>
                    <span className={`text-[12px] font-mono ${!awayWin ? "font-bold text-white/80" : "text-white/30"}`}>{r.homeScore}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Upcoming Games */}
          <div className="bg-[#0d1117] rounded-lg border border-white/[0.04]">
            <div className="px-4 py-2.5 border-b border-white/[0.04] flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#17FC13]/50">Upcoming Games</span>
              <a href="/league/schedule" className="text-[10px] text-white/25 hover:text-[#17FC13]/50 transition-colors no-underline">Full Schedule →</a>
            </div>
            {nextGames.map((g, i) => (
              <div key={g.id} className={`px-4 py-2.5 ${i < nextGames.length - 1 ? "border-b border-white/[0.02]" : ""}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-white/20">{g.date} &middot; {g.time}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white/25">{g.ageGroup} {g.division}</span>
                    {g.streamAvailable && (
                      <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#17FC13]/10 text-[#17FC13]/50">Stream</span>
                    )}
                  </div>
                </div>
                <div className="text-[12px] text-white/60">
                  <span>{g.away}</span>
                  <span className="text-white/20 mx-1.5">@</span>
                  <span>{g.home}</span>
                </div>
              </div>
            ))}
          </div>
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
    { label: "Rules & Format", desc: "By age division", href: "/league/rules" },
    { label: "Field Locations", desc: "169+ approved fields", href: "/league/fields" },
    { label: "Submit Result", desc: "Post-game reporting", href: "/league/submit-result" },
    { label: "Apex Live", desc: "Live streaming", href: "/live" },
  ];

  return (
    <Section size="sm" border="bottom">
      <FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {links.map(l => (
            <a key={l.label} href={l.href} className="bg-[#0d1117] rounded-lg border border-white/[0.04] px-4 py-3.5 hover:border-[#17FC13]/10 transition-all no-underline group">
              <div className="text-[12px] font-bold text-white/70 group-hover:text-[#17FC13] transition-colors">{l.label}</div>
              <div className="text-[10px] text-white/25 mt-0.5">{l.desc}</div>
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
            Ages 8–18. All skill levels. {LEAGUE_META.registrationFee} per team. Registration deadline: {LEAGUE_META.registrationDeadline}.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/league/register">Register a Team</Button>
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
      <HowItWorks />
      <WhoItsFor />
      <LeagueActivity />
      <QuickAccess />
      <FeaturedEvent />
      <RegistrationCTA />
    </main>
  );
}
