"use client";

import { useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";

// ═══════════════════════════════════════
// HERO
// ═══════════════════════════════════════
function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#020805] to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(23,252,19,0.08)_0%,transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#17FC13]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#17FC13]/20 to-transparent" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#17FC13]/20 bg-[#17FC13]/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#17FC13] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/80">August 2026 — Greater Boston</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl uppercase font-bold leading-[0.85] mb-6 tracking-tight">
            Apex Academy<br />All-Star<br /><span className="accent-text">Showcase</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-lg md:text-xl text-white mb-4 font-medium">16U &middot; 17U &middot; 18U</p>
          <p className="text-base md:text-lg text-white max-w-2xl mx-auto mb-4 leading-relaxed font-medium">
            The Premier College Exposure Event in New England
          </p>
          <p className="text-sm text-white mb-10 max-w-2xl mx-auto leading-relaxed">
            Designed to provide athletes with verified metrics, recruiting education, direct college coach interaction, and live-game evaluation opportunities.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="#register">Register</Button>
            <Button variant="secondary" href="#schedule">Event Schedule</Button>
            <Button variant="secondary" href="#combine">Combine Testing</Button>
            <Button variant="secondary" href="#coaches">College Coaches</Button>
          </div>
        </FadeIn>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}

// ═══════════════════════════════════════
// EVENT OVERVIEW
// ═══════════════════════════════════════
function EventOverview() {
  const stats = [
    { label: "Players Invited", value: "80" },
    { label: "College Coaches", value: "30+" },
    { label: "Combine Metrics", value: "12" },
    { label: "All-Star Games", value: "2" },
    { label: "Days", value: "2" },
    { label: "Divisions", value: "D1–JUCO" },
  ];

  return (
    <Section size="sm" border="bottom">
      <FadeIn>
        <div className="text-center mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">What Is This Event</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold mb-4">Verified. Evaluated. <span className="accent-text">Exposed.</span></h2>
          <p className="text-sm text-white max-w-2xl mx-auto leading-relaxed">
            The Apex All-Star Showcase brings together the top 16U–18U players from across the Apex League and surrounding baseball community for a premium two-day exposure event featuring professional combine testing, verified athletic metrics, recruiting evaluations, and two all-star games — all in front of attending college coaches.
          </p>
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {stats.map(s => (
            <div key={s.label} className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-4 text-center hover:border-[#17FC13]/15 transition-all">
              <div className="text-2xl font-bold accent-text mb-1">{s.value}</div>
              <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-white">{s.label}</div>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

// ═══════════════════════════════════════
// SCHEDULE BLOCK COMPONENT
// ═══════════════════════════════════════
function ScheduleBlock({ time, title, subtitle, items, highlight }: {
  time: string;
  title: string;
  subtitle?: string;
  items?: string[];
  highlight?: boolean;
}) {
  return (
    <div className={`relative pl-20 md:pl-24 py-5 border-b border-white/[0.04] last:border-b-0 ${highlight ? "bg-[#17FC13]/[0.02]" : ""}`}>
      <div className="absolute left-5 top-5 text-[11px] font-mono text-[#17FC13]/60 w-14 md:w-16 flex-shrink-0">{time}</div>
      <div className="absolute left-[4.25rem] md:left-[4.75rem] top-0 bottom-0 w-px bg-white/[0.04]" />
      <div className="text-sm font-bold text-white mb-1">{title}</div>
      {subtitle && <div className="text-[11px] text-[#17FC13]/50 uppercase tracking-wider font-bold mb-2">{subtitle}</div>}
      {items && items.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {items.map(item => (
            <span key={item} className="flex items-center gap-1.5 text-[12px] text-white">
              <span className="w-1 h-1 rounded-full bg-[#17FC13]/40 flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════
// SCHEDULE — DAY ONE
// ═══════════════════════════════════════
function DayOne() {
  return (
    <div className="bg-[#0d1117] rounded-2xl border border-white/[0.04] overflow-hidden">
      <div className="px-5 py-4 border-b border-white/[0.05] bg-[#17FC13]/[0.02]">
        <div className="text-xs font-bold uppercase tracking-wider text-[#17FC13]/70">Day One — Saturday</div>
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mt-1">Combine & Recruiting Day</div>
      </div>

      <ScheduleBlock
        time="7:30 AM"
        title="Check-In & Registration"
        items={["Player Check-In", "Jersey Distribution", "Event Packet Distribution", "College Coach Welcome"]}
      />
      <ScheduleBlock
        time="8:15 AM"
        title="Welcome Ceremony"
        subtitle="Opening Session"
        items={["Event Overview", "Recruiting Expectations", "Evaluation Process", "College Coach Introductions"]}
      />
      <ScheduleBlock
        time="9:00 AM"
        title="Athletic Testing Begins"
        subtitle="Combine Testing"
        items={["Height", "Weight", "Wingspan", "60 Yard Dash", "Home-to-First", "Exit Velocity", "Bat Speed", "Infield Velocity", "Outfield Velocity", "Catcher Velocity", "Pop Time", "Pitching Velocity"]}
      />
      <ScheduleBlock
        time="11:30 AM"
        title="Defensive Evaluations"
        subtitle="Positional Evaluations"
        items={["Infield Actions & Footwork", "Outfield Routes & Carry", "Catcher Receiving & Blocking", "Pitcher Bullpen & Command"]}
      />
      <ScheduleBlock
        time="12:30 PM"
        title="Player Lunch & Coach Networking"
        subtitle="Lunch Break"
      />
      <ScheduleBlock
        time="1:30 PM"
        title="Professional Workout"
        subtitle="Live Batting Practice"
        items={["Exit Velocity Readings", "Offensive Evaluations", "Swing Assessments", "Hitting Reports"]}
      />
      <ScheduleBlock
        time="3:30 PM"
        title="College Recruiting Panel"
        subtitle="College Coach Panel"
        items={["Recruiting Timeline", "Academic Expectations", "Communication Strategies", "What Coaches Look For", "Transfer Portal Impact", "NIL Landscape", "Common Recruiting Mistakes"]}
        highlight
      />
      <ScheduleBlock
        time="4:45 PM"
        title="Player Networking Session"
        items={["Athletes and families meet attending coaches"]}
      />
    </div>
  );
}

// ═══════════════════════════════════════
// SCHEDULE — DAY TWO
// ═══════════════════════════════════════
function DayTwo() {
  return (
    <div className="bg-[#0d1117] rounded-2xl border border-white/[0.04] overflow-hidden">
      <div className="px-5 py-4 border-b border-white/[0.05] bg-[#17FC13]/[0.02]">
        <div className="text-xs font-bold uppercase tracking-wider text-[#17FC13]/70">Day Two — Sunday</div>
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mt-1">Game Day</div>
      </div>

      <ScheduleBlock
        time="8:00 AM"
        title="Player Arrival"
        items={["Team Meetings", "Warmups"]}
      />
      <ScheduleBlock
        time="9:30 AM"
        title="American Team vs National Team"
        subtitle="All-Star Game One"
        items={["Apex Live Broadcast", "Live Box Score", "Play-by-Play Coverage", "Player Statistics", "College Coach Evaluations"]}
        highlight
      />
      <ScheduleBlock
        time="12:00 PM"
        title="Player Lunch & College Coach Evaluations"
        subtitle="Lunch Break"
      />
      <ScheduleBlock
        time="1:30 PM"
        title="Stars Team vs Stripes Team"
        subtitle="All-Star Game Two"
        items={["Verified Metrics", "Event Statistics", "Live Game Evaluation", "Player Profiles"]}
        highlight
      />
      <ScheduleBlock
        time="4:00 PM"
        title="Awards Ceremony"
        items={["Top Prospect", "Event MVP", "Top Position Player", "Top Pitcher", "Fastest Runner", "Highest Exit Velocity", "Highest Pitching Velocity", "Top Catcher", "Defensive Excellence Award"]}
      />
      <ScheduleBlock
        time="4:30 PM"
        title="Player Report Distribution"
        items={["Athletic Metrics", "Position Evaluations", "Event Statistics", "Recruiting Profile Updates"]}
      />
    </div>
  );
}

// ═══════════════════════════════════════
// FULL SCHEDULE
// ═══════════════════════════════════════
function Schedule() {
  return (
    <Section id="schedule" border="bottom">
      <FadeIn>
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Event Schedule</div>
        <h2 className="text-2xl md:text-3xl uppercase font-bold mb-8">Two Days. <span className="accent-text">Full Exposure.</span></h2>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FadeIn><DayOne /></FadeIn>
        <FadeIn delay={0.1}><DayTwo /></FadeIn>
      </div>

      <FadeIn delay={0.15}>
        <div className="mt-6 text-center text-[11px] text-white">
          All metrics are verified and uploaded directly to player profiles.
        </div>
      </FadeIn>
    </Section>
  );
}

// ═══════════════════════════════════════
// COMBINE TESTING
// ═══════════════════════════════════════
function CombineTesting() {
  const tests = [
    { category: "Measurements", metrics: ["Height", "Weight", "Wingspan"] },
    { category: "Speed", metrics: ["60 Yard Dash", "Home-to-First"] },
    { category: "Hitting", metrics: ["Exit Velocity", "Bat Speed"] },
    { category: "Arm Strength", metrics: ["Infield Velocity", "Outfield Velocity", "Catcher Velocity", "Pop Time"] },
    { category: "Pitching", metrics: ["Pitching Velocity"] },
  ];

  return (
    <Section id="combine" border="bottom">
      <FadeIn>
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Combine Testing</div>
        <h2 className="text-2xl md:text-3xl uppercase font-bold mb-3">Verified <span className="accent-text">Metrics</span></h2>
        <p className="text-sm text-white mb-8 max-w-xl">All metrics are verified and uploaded directly to player profiles.</p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tests.map((t, i) => (
          <FadeIn key={t.category} delay={i * 0.05}>
            <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#17FC13]/50 mb-3">{t.category}</div>
              {t.metrics.map(m => (
                <div key={m} className="flex items-center gap-2 py-1 text-[13px] text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13]/40 flex-shrink-0" />
                  {m}
                </div>
              ))}
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════
// POSITIONAL EVALUATIONS
// ═══════════════════════════════════════
function PositionalEvaluations() {
  const positions = [
    { position: "Infielders", evals: ["Fielding Actions", "Arm Strength", "Footwork"] },
    { position: "Outfielders", evals: ["Routes", "Arm Strength", "Carry"] },
    { position: "Catchers", evals: ["Receiving", "Blocking", "Pop Times", "Arm Strength"] },
    { position: "Pitchers", evals: ["Bullpen Session", "Command", "Velocity", "Secondary Pitch Evaluation"] },
  ];

  return (
    <Section border="bottom">
      <FadeIn>
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Defensive Evaluations</div>
        <h2 className="text-2xl md:text-3xl uppercase font-bold mb-8">Positional <span className="accent-text">Evaluations</span></h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {positions.map((p, i) => (
          <FadeIn key={p.position} delay={i * 0.05}>
            <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-5 h-full">
              <div className="text-sm font-bold text-white mb-3">{p.position}</div>
              {p.evals.map(e => (
                <div key={e} className="flex items-center gap-2 py-1.5 text-[13px] text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13]/40 flex-shrink-0" />
                  {e}
                </div>
              ))}
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════
// ALL-STAR GAMES
// ═══════════════════════════════════════
function AllStarGames() {
  return (
    <Section border="bottom">
      <FadeIn>
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Competition</div>
        <h2 className="text-2xl md:text-3xl uppercase font-bold mb-8">All-Star <span className="accent-text">Games</span></h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FadeIn>
          <div className="bg-[#0d1117] rounded-2xl border border-white/[0.04] p-6">
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#17FC13]/50 mb-2">Game One — Sunday Morning</div>
            <h3 className="text-xl font-bold uppercase mb-3">American <span className="text-white">vs</span> National</h3>
            <p className="text-[13px] text-white leading-relaxed mb-4">Full showcase evaluation game with professional coverage and college coach evaluations throughout.</p>
            <div className="flex flex-wrap gap-2">
              {["Apex Live Broadcast", "Live Box Score", "Play-by-Play Coverage", "Player Statistics", "College Coach Evaluations"].map(f => (
                <span key={f} className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#17FC13]/15 text-[#17FC13]/50 bg-[#17FC13]/[0.03]">{f}</span>
              ))}
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="bg-[#0d1117] rounded-2xl border border-[#17FC13]/10 p-6">
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#17FC13]/50 mb-2">Game Two — Sunday Afternoon</div>
            <h3 className="text-xl font-bold uppercase mb-3">Stars <span className="text-white">vs</span> <span className="accent-text">Stripes</span></h3>
            <p className="text-[13px] text-white leading-relaxed mb-4">Second opportunity for evaluation. College coaches receive verified metrics, event statistics, live game evaluation, and player profiles.</p>
            <div className="flex flex-wrap gap-2">
              {["Verified Metrics", "Event Statistics", "Live Game Evaluation", "Player Profiles"].map(f => (
                <span key={f} className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#17FC13]/15 text-[#17FC13]/50 bg-[#17FC13]/[0.03]">{f}</span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════
// COLLEGE COACH PANEL
// ═══════════════════════════════════════
function CoachPanel() {
  const topics = [
    "Recruiting Timeline",
    "Academic Expectations",
    "Communication Strategies",
    "Camps & Showcases",
    "What Coaches Actually Look For",
    "Transfer Portal Impact",
    "NIL Landscape",
    "Common Recruiting Mistakes",
  ];

  return (
    <Section border="bottom">
      <FadeIn>
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Recruiting Education</div>
        <h2 className="text-2xl md:text-3xl uppercase font-bold mb-3">College Coach <span className="accent-text">Panel</span></h2>
        <p className="text-sm text-white mb-8 max-w-xl">Attending coaches discuss the recruiting process directly with athletes and families. Live Q&A session included.</p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
          {topics.map(t => (
            <div key={t} className="flex items-center gap-3 bg-[#0d1117] rounded-xl border border-white/[0.04] px-4 py-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13]/40 flex-shrink-0" />
              <span className="text-[13px] text-white">{t}</span>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

// ═══════════════════════════════════════
// COLLEGE COACHES
// ═══════════════════════════════════════
function CollegeCoaches() {
  const [filter, setFilter] = useState("All");
  const divisions = ["All", "NCAA D1", "NCAA D2", "NCAA D3", "NAIA", "NJCAA"];

  const schools = [
    { name: "Boston College", division: "NCAA D1", conference: "ACC", location: "Chestnut Hill, MA" },
    { name: "Northeastern University", division: "NCAA D1", conference: "CAA", location: "Boston, MA" },
    { name: "UMass Amherst", division: "NCAA D1", conference: "A-10", location: "Amherst, MA" },
    { name: "Boston University", division: "NCAA D1", conference: "Patriot", location: "Boston, MA" },
    { name: "Merrimack College", division: "NCAA D1", conference: "NEC", location: "North Andover, MA" },
    { name: "Assumption University", division: "NCAA D2", conference: "NE-10", location: "Worcester, MA" },
    { name: "Stonehill College", division: "NCAA D2", conference: "NE-10", location: "Easton, MA" },
    { name: "Bentley University", division: "NCAA D2", conference: "NE-10", location: "Waltham, MA" },
    { name: "Tufts University", division: "NCAA D3", conference: "NESCAC", location: "Medford, MA" },
    { name: "Babson College", division: "NCAA D3", conference: "NEWMAC", location: "Wellesley, MA" },
    { name: "Wheaton College", division: "NCAA D3", conference: "NEWMAC", location: "Norton, MA" },
    { name: "Endicott College", division: "NCAA D3", conference: "CCC", location: "Beverly, MA" },
    { name: "Suffolk University", division: "NCAA D3", conference: "CCC", location: "Boston, MA" },
    { name: "Fisher College", division: "NAIA", conference: "YSCC", location: "Boston, MA" },
    { name: "Dean College", division: "NCAA D3", conference: "GNAC", location: "Franklin, MA" },
    { name: "Massasoit CC", division: "NJCAA", conference: "Region 21", location: "Brockton, MA" },
    { name: "Bristol CC", division: "NJCAA", conference: "Region 21", location: "Fall River, MA" },
  ];

  const filtered = filter === "All" ? schools : schools.filter(s => s.division === filter);

  return (
    <Section id="coaches" border="bottom">
      <FadeIn>
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Attending Programs</div>
        <h2 className="text-2xl md:text-3xl uppercase font-bold mb-3">College <span className="accent-text">Coaches</span></h2>
        <p className="text-sm text-white mb-6">Programs across all levels attend to evaluate and recruit showcase participants.</p>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="flex gap-1.5 mb-6 flex-wrap">
          {divisions.map(d => (
            <button key={d} onClick={() => setFilter(d)}
              className={`px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${filter === d ? "bg-[#17FC13]/10 text-[#17FC13] border border-[#17FC13]/25" : "text-white border border-white/[0.04] hover:border-white/[0.08]"}`}>
              {d}
            </button>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map(s => (
            <div key={s.name} className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-4 hover:border-[#17FC13]/10 transition-all">
              <div className="text-sm font-bold text-white mb-1">{s.name}</div>
              <div className="flex items-center gap-2 text-[11px] text-white">
                <span className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-bold uppercase tracking-wider">{s.division}</span>
                <span>{s.conference}</span>
              </div>
              <div className="text-[11px] text-white mt-1">{s.location}</div>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

// ═══════════════════════════════════════
// AWARDS
// ═══════════════════════════════════════
function Awards() {
  const awards = [
    "Top Prospect",
    "Event MVP",
    "Top Position Player",
    "Top Pitcher",
    "Fastest Runner",
    "Highest Exit Velocity",
    "Highest Pitching Velocity",
    "Top Catcher",
    "Defensive Excellence Award",
  ];

  return (
    <Section border="bottom">
      <FadeIn>
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Recognition</div>
        <h2 className="text-2xl md:text-3xl uppercase font-bold mb-8">Awards <span className="accent-text">Ceremony</span></h2>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl">
          {awards.map(a => (
            <div key={a} className="flex items-center gap-3 bg-[#0d1117] rounded-xl border border-white/[0.04] px-4 py-3 hover:border-[#17FC13]/15 transition-all">
              <span className="w-2 h-2 rounded-full bg-[#17FC13] flex-shrink-0" />
              <span className="text-[13px] font-medium text-white">{a}</span>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

// ═══════════════════════════════════════
// PLAYER REPORTS
// ═══════════════════════════════════════
function PlayerReports() {
  const includes = [
    "Athletic Metrics",
    "Position Evaluations",
    "Event Statistics",
    "Recruiting Profile Updates",
  ];

  return (
    <Section border="bottom">
      <FadeIn>
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Post-Event</div>
        <h2 className="text-2xl md:text-3xl uppercase font-bold mb-3">Player Report <span className="accent-text">Distribution</span></h2>
        <p className="text-sm text-white mb-6 max-w-xl">Every participant receives a verified showcase report. Reports automatically populate inside Apex Player Profiles.</p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="bg-[#0d1117] rounded-2xl border border-[#17FC13]/10 p-6 max-w-lg">
          <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#17FC13]/50 mb-3">Verified Showcase Report Includes</div>
          {includes.map(item => (
            <div key={item} className="flex items-center gap-2.5 py-2 text-[13px] text-white border-b border-white/[0.03] last:border-b-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13]/40 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

// ═══════════════════════════════════════
// SHOWCASE OBJECTIVE
// ═══════════════════════════════════════
function ShowcaseObjective() {
  const takeaways = [
    "Verified Metrics",
    "Recruiting Education",
    "College Coach Exposure",
    "Professional Evaluations",
    "Live Game Performance Data",
    "Updated Recruiting Profile",
  ];

  return (
    <Section border="bottom">
      <FadeIn>
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Showcase Objective</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold mb-4">Every Athlete <span className="accent-text">Leaves With</span></h2>
          <p className="text-sm text-white mb-8 leading-relaxed">
            The event is designed to provide meaningful exposure while helping players and families better understand the recruiting process.
          </p>
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
          {takeaways.map(t => (
            <div key={t} className="flex items-center gap-3 bg-[#0d1117] rounded-xl border border-white/[0.04] px-4 py-3">
              <span className="w-2 h-2 rounded-full bg-[#17FC13] flex-shrink-0" />
              <span className="text-[13px] text-white">{t}</span>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

// ═══════════════════════════════════════
// PLAYER SELECTION
// ═══════════════════════════════════════
function PlayerSelection() {
  return (
    <Section border="bottom">
      <FadeIn>
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">How Players Are Selected</div>
        <h2 className="text-2xl md:text-3xl uppercase font-bold mb-8">Selection <span className="accent-text">Process</span></h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { step: "1", title: "Nomination", desc: "Coaches nominate standout players from their roster based on performance, work ethic, and potential." },
          { step: "2", title: "Evaluation", desc: "League evaluators review statistics, game performance, and scouting reports throughout the season." },
          { step: "3", title: "Selection", desc: "The top 80 players are selected and invited. Roster announcements are made two weeks before the event." },
          { step: "4", title: "Confirmation", desc: "Selected players confirm participation, receive orientation materials, and prepare for the showcase." },
        ].map((s, i) => (
          <FadeIn key={s.step} delay={i * 0.05}>
            <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-5">
              <div className="w-8 h-8 rounded-full bg-[#17FC13]/10 border border-[#17FC13]/25 flex items-center justify-center mb-3">
                <span className="text-sm font-bold text-[#17FC13]">{s.step}</span>
              </div>
              <div className="text-sm font-bold text-white mb-1">{s.title}</div>
              <div className="text-[12px] text-white leading-relaxed">{s.desc}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════
// REGISTRATION CTA
// ═══════════════════════════════════════
function Registration() {
  return (
    <Section id="register" size="lg">
      <FadeIn>
        <div className="text-center">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-4">Limited Spots Available</div>
          <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4 leading-[0.9]">
            Your Opportunity <span className="accent-text">Starts Here</span>
          </h2>
          <p className="text-sm text-white max-w-xl mx-auto mb-3">
            80 players. 30+ college coaches. Two all-star games. Verified metrics. One weekend that could change your baseball career.
          </p>
          <p className="text-[11px] text-white mb-8">
            16U–18U &middot; August 2026 &middot; Greater Boston
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/join">Register Now</Button>
            <Button variant="secondary" href="mailto:apexsportsgg@gmail.com">Nominate a Player</Button>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}

// ═══════════════════════════════════════
// FAQ
// ═══════════════════════════════════════
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "Who is eligible to participate?", a: "The showcase is open to 16U, 17U, and 18U players. Participants are selected through coach nomination, league performance, or direct registration." },
    { q: "How are players selected?", a: "Players are nominated by their coaches, evaluated by league staff, and selected based on performance, metrics, and potential. Direct registration is also available for qualified players." },
    { q: "Which college coaches will attend?", a: "We invite coaches from NCAA Division I, II, III, NAIA, and NJCAA programs across New England. The attending programs list is updated as confirmations come in." },
    { q: "Will metrics be professionally verified?", a: "Yes. All combine testing is conducted with professional-grade equipment. Every metric is verified and recorded in the player's official Apex Profile." },
    { q: "Will the games be streamed?", a: "Yes. Both all-star games are broadcast live on Apex Live with professional scorekeeping, box scores, and play-by-play." },
    { q: "How much does it cost?", a: "Registration fee and details will be announced when invitations are sent. The event is designed to be accessible while maintaining a premium experience." },
    { q: "What should players bring?", a: "Full uniform, glove, bat, cleats, and any personal catching or pitching gear. All testing equipment is provided by the event." },
    { q: "Do players receive a report after the event?", a: "Yes. Every participant receives a verified Player Report including all testing results, event statistics, and a recruiting-ready profile." },
  ];

  return (
    <Section border="top">
      <FadeIn>
        <div className="max-w-2xl mx-auto">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Questions</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold mb-6">Frequently <span className="accent-text">Asked</span></h2>

          {faqs.map((f, i) => (
            <div key={i} className="border-b border-white/[0.04]">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between py-4 text-left group">
                <span className="text-[14px] font-bold text-white group-hover:text-[#17FC13] transition-colors pr-4">{f.q}</span>
                <span className={`text-white text-lg transition-transform flex-shrink-0 ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {open === i && (
                <div className="pb-4 text-[13px] text-white leading-relaxed">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

// ═══════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════
export default function ShowcasePage() {
  return (
    <main>
      <Hero />
      <EventOverview />
      <Schedule />
      <CombineTesting />
      <PositionalEvaluations />
      <AllStarGames />
      <CoachPanel />
      <CollegeCoaches />
      <Awards />
      <PlayerReports />
      <ShowcaseObjective />
      <PlayerSelection />
      <Registration />
      <FAQ />
    </main>
  );
}
