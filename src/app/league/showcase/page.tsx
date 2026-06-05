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
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#020805] to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(23,252,19,0.06)_0%,transparent_50%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#17FC13]/40 to-transparent" />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#17FC13]/20 bg-[#17FC13]/5 mb-10">
            <span className="w-2 h-2 rounded-full bg-[#17FC13] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/80">August 2026 — Greater Boston</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 mb-5">Apex Academy Presents</div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl uppercase font-bold leading-[0.85] mb-3 tracking-tight">
            Prospect Combine<br /><span className="accent-text">& Showcase</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="w-16 h-px bg-[#17FC13]/30 mx-auto my-6" />
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-3 leading-relaxed">
            The Premier College Exposure Event in New England
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-3">
            16U &middot; 17U &middot; 18U
          </p>
          <p className="text-[13px] text-white/40 max-w-xl mx-auto mb-10 leading-relaxed">
            Verified metrics. Professional evaluations. College coach exposure. Recruiting education. Live game evaluation. Two days built for the next level.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="#register">Register</Button>
            <Button variant="secondary" href="#combine">Combine Testing</Button>
            <Button variant="secondary" href="#schedule">Full Schedule</Button>
            <Button variant="secondary" href="#coaches">College Coaches</Button>
          </div>
        </FadeIn>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}

// ═══════════════════════════════════════
// EVENT PHILOSOPHY
// ═══════════════════════════════════════
function EventPhilosophy() {
  const pillars = [
    { label: "Verified Metrics", desc: "Professional-grade athletic and baseball testing with verified results uploaded directly to player profiles." },
    { label: "Athletic Testing", desc: "Full combine-style evaluation — speed, strength, arm velocity, exit velocity, and position-specific measurements." },
    { label: "Position Evaluations", desc: "Professional evaluators assess defensive actions, baseball instincts, and positional tools at every position." },
    { label: "College Coach Exposure", desc: "Direct interaction with attending coaches from NCAA D1, D2, D3, NAIA, and NJCAA programs across New England." },
    { label: "Recruiting Education", desc: "College coach panel, recruiting timeline guidance, academic expectations, and dedicated networking sessions." },
    { label: "Live Game Evaluation", desc: "Two full showcase games evaluated by attending coaches — athleticism, adjustments, baseball IQ, and competitiveness." },
  ];

  return (
    <Section border="bottom">
      <FadeIn>
        <div className="text-center mb-10">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Event Philosophy</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold mb-4">Built for the <span className="accent-text">Next Level</span></h2>
          <p className="text-sm text-white/60 max-w-2xl mx-auto leading-relaxed">
            Modeled after the MLB Draft Combine and elite recruiting showcases. Every element of this event is designed to provide verified data, meaningful evaluation, and genuine college exposure.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pillars.map((p, i) => (
          <FadeIn key={p.label} delay={i * 0.05}>
            <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-5 h-full hover:border-[#17FC13]/10 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#17FC13]/10 border border-[#17FC13]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-bold text-[#17FC13]">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="text-sm font-bold text-white">{p.label}</div>
              </div>
              <div className="text-[12px] text-white/50 leading-relaxed">{p.desc}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════
// BY THE NUMBERS
// ═══════════════════════════════════════
function ByTheNumbers() {
  const stats = [
    { value: "80", label: "Prospects Evaluated" },
    { value: "30+", label: "College Coaches" },
    { value: "12+", label: "Verified Metrics" },
    { value: "2", label: "Showcase Games" },
    { value: "2", label: "Full Days" },
    { value: "D1–JUCO", label: "All Divisions" },
  ];

  return (
    <Section size="sm" border="bottom">
      <FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {stats.map(s => (
            <div key={s.label} className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-4 text-center hover:border-[#17FC13]/15 transition-all">
              <div className="text-2xl font-bold accent-text mb-1">{s.value}</div>
              <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/50">{s.label}</div>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

// ═══════════════════════════════════════
// COMBINE TESTING
// ═══════════════════════════════════════
function CombineTesting() {
  const categories = [
    { category: "Physical Measurements", metrics: ["Height", "Weight", "Wingspan"] },
    { category: "Speed & Agility", metrics: ["60 Yard Dash", "Home-to-First"] },
    { category: "Hitting", metrics: ["Exit Velocity", "Bat Speed"] },
    { category: "Infield", metrics: ["Infield Velocity", "Fielding Actions", "Footwork", "Arm Strength"] },
    { category: "Outfield", metrics: ["Outfield Velocity", "Routes", "Carry", "Arm Strength"] },
    { category: "Catching", metrics: ["Pop Time", "Catcher Velocity", "Receiving", "Blocking"] },
    { category: "Pitching", metrics: ["Pitching Velocity", "Bullpen Evaluation", "Command", "Secondary Pitches"] },
  ];

  return (
    <Section id="combine" border="bottom">
      <FadeIn>
        <div className="mb-10">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Combine Testing</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold mb-3">Verified <span className="accent-text">Metrics</span></h2>
          <p className="text-sm text-white/60 max-w-xl leading-relaxed">
            Professional-grade combine testing across every measurable category. All results are verified and uploaded directly to Apex Player Profiles.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((c, i) => (
          <FadeIn key={c.category} delay={i * 0.04}>
            <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-5 h-full">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/50 mb-3">{c.category}</div>
              {c.metrics.map(m => (
                <div key={m} className="flex items-center gap-2 py-1.5 text-[13px] text-white/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13]/30 flex-shrink-0" />
                  {m}
                </div>
              ))}
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.3}>
        <div className="mt-6 bg-[#17FC13]/[0.02] rounded-xl border border-[#17FC13]/10 p-5">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#17FC13] mt-1 flex-shrink-0" />
            <p className="text-[13px] text-white/60 leading-relaxed">
              Every metric is collected using professional equipment, verified by event staff, and automatically populated inside each player&apos;s Apex Profile. College coaches receive full metric reports for every prospect in attendance.
            </p>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}

// ═══════════════════════════════════════
// POSITION EVALUATIONS
// ═══════════════════════════════════════
function PositionEvaluations() {
  const positions = [
    {
      position: "Infielders",
      evals: ["Fielding Actions", "Arm Strength & Accuracy", "Footwork & Range", "Double Play Turns", "Slow Roller / Bare Hand"],
    },
    {
      position: "Outfielders",
      evals: ["Route Efficiency", "Arm Strength & Carry", "First Step & Range", "Communication", "Crow Hop Mechanics"],
    },
    {
      position: "Catchers",
      evals: ["Receiving & Framing", "Blocking", "Pop Time", "Arm Strength & Accuracy", "Game Management"],
    },
    {
      position: "Pitchers",
      evals: ["Velocity", "Bullpen Session", "Command & Control", "Secondary Pitch Evaluation", "Mechanics & Delivery"],
    },
  ];

  return (
    <Section border="bottom">
      <FadeIn>
        <div className="mb-10">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Professional Evaluations</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold mb-3">Position <span className="accent-text">Evaluations</span></h2>
          <p className="text-sm text-white/60 max-w-xl leading-relaxed">
            Every prospect receives position-specific evaluation from professional evaluators. Assessments are included in each player&apos;s verified prospect report.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {positions.map((p, i) => (
          <FadeIn key={p.position} delay={i * 0.05}>
            <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-5 h-full">
              <div className="text-sm font-bold text-white mb-4">{p.position}</div>
              {p.evals.map(e => (
                <div key={e} className="flex items-center gap-2 py-1.5 text-[12px] text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13]/30 flex-shrink-0" />
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
// RECRUITING EDUCATION
// ═══════════════════════════════════════
function RecruitingEducation() {
  const panelTopics = [
    "Recruiting Timeline & Key Dates",
    "Academic Expectations & Eligibility",
    "How to Communicate with Coaches",
    "Camps, Showcases & What Matters",
    "What Coaches Actually Look For",
    "Transfer Portal & Its Impact",
    "NIL Landscape for High School Players",
    "Common Recruiting Mistakes to Avoid",
  ];

  return (
    <Section border="bottom">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FadeIn>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Recruiting Education</div>
            <h2 className="text-2xl md:text-3xl uppercase font-bold mb-3">College Coach <span className="accent-text">Panel</span></h2>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              Attending college coaches discuss the recruiting process directly with athletes and families. Open to player questions, parent questions, and direct coach interaction. Designed to provide genuine educational value.
            </p>

            <div className="space-y-2">
              {panelTopics.map(t => (
                <div key={t} className="flex items-center gap-3 bg-[#0d1117] rounded-lg border border-white/[0.04] px-4 py-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13]/40 flex-shrink-0" />
                  <span className="text-[13px] text-white/70">{t}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 text-[11px] text-[#17FC13]/50 uppercase tracking-wider font-bold">Live Q&A Session Included</div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Relationship Building</div>
            <h2 className="text-2xl md:text-3xl uppercase font-bold mb-3">Coach <span className="accent-text">Networking</span></h2>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              A dedicated session where athletes and families have the opportunity to meet and interact with attending college coaches. The goal is genuine relationship building — not just evaluation.
            </p>

            <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-6">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/50 mb-4">What Coaches Leave With</div>
              {["Verified Athletic Data", "Verified Baseball Metrics", "Player Evaluations", "Game Observations", "Recruiting Contacts"].map(item => (
                <div key={item} className="flex items-center gap-2.5 py-2 text-[13px] text-white/60 border-b border-white/[0.03] last:border-b-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13]/30 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-4 bg-[#0d1117] rounded-xl border border-white/[0.04] p-6">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/50 mb-4">What Players Leave With</div>
              {["Measurable Data", "Recruiting Education", "College Exposure", "Verified Player Reports", "Updated Apex Player Profiles"].map(item => (
                <div key={item} className="flex items-center gap-2.5 py-2 text-[13px] text-white/60 border-b border-white/[0.03] last:border-b-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13]/30 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════
// SHOWCASE GAMES
// ═══════════════════════════════════════
function ShowcaseGames() {
  return (
    <Section border="bottom">
      <FadeIn>
        <div className="mb-10">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Live Game Evaluation</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold mb-3">Showcase <span className="accent-text">Games</span></h2>
          <p className="text-sm text-white/60 max-w-2xl leading-relaxed">
            Two full showcase games on Day Two. Every prospect receives two complete game opportunities in front of attending college coaches. Teams remain the same throughout the weekend.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FadeIn>
          <div className="bg-[#0d1117] rounded-2xl border border-white/[0.04] p-6 h-full">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/50 mb-2">Showcase Game One</div>
            <h3 className="text-lg font-bold uppercase mb-1">Team American <span className="text-white/40">vs</span> Team National</h3>
            <div className="text-[11px] text-white/30 uppercase tracking-wider mb-4">Initial Live Evaluation</div>
            <p className="text-[13px] text-white/50 leading-relaxed mb-5">College coaches evaluate athleticism, baseball actions, competitiveness, instincts, and approach in a live game environment.</p>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 mb-2">Features</div>
            <div className="flex flex-wrap gap-1.5">
              {["Apex Live Broadcast", "Live Box Score", "Play-by-Play", "Statistics Tracking", "Recruiting Notes"].map(f => (
                <span key={f} className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#17FC13]/10 text-[#17FC13]/40 bg-[#17FC13]/[0.02]">{f}</span>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-[#0d1117] rounded-2xl border border-white/[0.04] p-6 h-full">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/50 mb-2">Showcase Game Two</div>
            <h3 className="text-lg font-bold uppercase mb-1">Team American <span className="text-white/40">vs</span> Team National</h3>
            <div className="text-[11px] text-white/30 uppercase tracking-wider mb-4">Second Live Evaluation</div>
            <p className="text-[13px] text-white/50 leading-relaxed mb-5">College coaches receive a second opportunity to evaluate consistency, adjustments, baseball IQ, and performance under pressure.</p>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 mb-2">Features</div>
            <div className="flex flex-wrap gap-1.5">
              {["Apex Live Broadcast", "Live Box Score", "Statistics Tracking", "Recruiting Evaluations"].map(f => (
                <span key={f} className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#17FC13]/10 text-[#17FC13]/40 bg-[#17FC13]/[0.02]">{f}</span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.15}>
        <div className="mt-5 bg-[#17FC13]/[0.02] rounded-xl border border-[#17FC13]/10 p-5">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#17FC13] mt-1 flex-shrink-0" />
            <p className="text-[13px] text-white/50 leading-relaxed">
              Every prospect receives two full game opportunities. This is not an invite-only selection game — every participant is evaluated across both contests.
            </p>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}

// ═══════════════════════════════════════
// FULL SCHEDULE
// ═══════════════════════════════════════
function ScheduleBlock({ time, title, subtitle, items, accent }: {
  time: string;
  title: string;
  subtitle?: string;
  items?: string[];
  accent?: boolean;
}) {
  return (
    <div className={`relative pl-20 md:pl-24 py-5 border-b border-white/[0.03] last:border-b-0 ${accent ? "bg-[#17FC13]/[0.02]" : ""}`}>
      <div className="absolute left-5 top-5 text-[11px] font-mono text-[#17FC13]/50 w-14 md:w-16 flex-shrink-0">{time}</div>
      <div className="absolute left-[4.25rem] md:left-[4.75rem] top-0 bottom-0 w-px bg-white/[0.04]" />
      <div className="text-sm font-bold text-white/90 mb-0.5">{title}</div>
      {subtitle && <div className="text-[11px] text-white/30 mb-2">{subtitle}</div>}
      {items && items.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {items.map(item => (
            <span key={item} className="flex items-center gap-1.5 text-[11px] text-white/40">
              <span className="w-1 h-1 rounded-full bg-[#17FC13]/30 flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function Schedule() {
  return (
    <Section id="schedule" border="bottom">
      <FadeIn>
        <div className="text-center mb-10">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Event Schedule</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold mb-3">Two Days. <span className="accent-text">Full Evaluation.</span></h2>
          <p className="text-sm text-white/50">Day One — Combine & Recruiting. Day Two — Showcase Games.</p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FadeIn>
          <div className="bg-[#0d1117] rounded-2xl border border-white/[0.04] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.05]">
              <div className="text-xs font-bold uppercase tracking-wider text-[#17FC13]/60">Day One — Saturday</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mt-1">Combine & Recruiting Day</div>
            </div>

            <ScheduleBlock time="7:30 AM" title="Check-In & Registration"
              items={["Player Check-In", "Jersey Distribution", "Event Materials", "Coach Welcome"]} />
            <ScheduleBlock time="8:15 AM" title="Opening Session"
              subtitle="Welcome Ceremony"
              items={["Event Overview", "Evaluation Process", "Recruiting Expectations", "Coach Introductions"]} />
            <ScheduleBlock time="9:00 AM" title="Combine Testing"
              subtitle="Athletic & Baseball Measurements"
              items={["60 Yard Dash", "Home-to-First", "Exit Velocity", "Bat Speed", "Arm Velocities", "Pop Time", "Pitching Velocity"]} />
            <ScheduleBlock time="11:30 AM" title="Position Evaluations"
              subtitle="Defensive & Pitching Evaluations"
              items={["Infield Work", "Outfield Work", "Catcher Evaluation", "Bullpen Sessions"]} />
            <ScheduleBlock time="12:30 PM" title="Lunch & Coach Networking" />
            <ScheduleBlock time="1:30 PM" title="Live Batting Practice"
              subtitle="Professional Workout"
              items={["Exit Velocity Readings", "Swing Assessments", "Offensive Evaluations"]} />
            <ScheduleBlock time="3:30 PM" title="College Coach Panel"
              subtitle="Recruiting Education Session"
              items={["Timeline", "Academics", "Communication", "NIL", "Transfer Portal", "Live Q&A"]}
              accent />
            <ScheduleBlock time="4:45 PM" title="Coach Networking Session"
              subtitle="Player & Family Meet-and-Greet" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-[#0d1117] rounded-2xl border border-white/[0.04] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.05]">
              <div className="text-xs font-bold uppercase tracking-wider text-[#17FC13]/60">Day Two — Sunday</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mt-1">Showcase Game Day</div>
            </div>

            <ScheduleBlock time="8:00 AM" title="Player Arrival"
              items={["Team Meetings", "Warmups"]} />
            <ScheduleBlock time="9:30 AM" title="Showcase Game One"
              subtitle="Team American vs Team National — Initial Evaluation"
              items={["Apex Live Broadcast", "Box Score", "Play-by-Play", "Statistics", "Coach Evaluations"]}
              accent />
            <ScheduleBlock time="12:00 PM" title="Lunch Break"
              subtitle="College Coach Evaluations Continue" />
            <ScheduleBlock time="1:30 PM" title="Showcase Game Two"
              subtitle="Team American vs Team National — Second Evaluation"
              items={["Apex Live Broadcast", "Box Score", "Statistics", "Recruiting Evaluations"]}
              accent />
            <ScheduleBlock time="4:00 PM" title="Awards Ceremony"
              items={["Top Prospect", "Event MVP", "Top Position Player", "Top Pitcher", "Fastest Runner", "Highest Exit Velo", "Highest Pitch Velo", "Top Catcher", "Defensive Excellence"]} />
            <ScheduleBlock time="4:30 PM" title="Prospect Report Distribution"
              subtitle="Verified Reports Issued to Every Participant" />
          </div>
        </FadeIn>
      </div>
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
        <div className="mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Attending Programs</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold mb-3">College <span className="accent-text">Coaches</span></h2>
          <p className="text-sm text-white/60 max-w-xl">Programs across all NCAA divisions, NAIA, and NJCAA attend to evaluate and recruit prospects.</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="flex gap-1.5 mb-6 flex-wrap">
          {divisions.map(d => (
            <button key={d} onClick={() => setFilter(d)}
              className={`px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${filter === d ? "bg-[#17FC13]/10 text-[#17FC13] border border-[#17FC13]/25" : "text-white/50 border border-white/[0.04] hover:border-white/[0.08]"}`}>
              {d}
            </button>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map(s => (
            <div key={s.name} className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-4 hover:border-[#17FC13]/10 transition-all">
              <div className="text-sm font-bold text-white/90 mb-1">{s.name}</div>
              <div className="flex items-center gap-2 text-[11px] text-white/40">
                <span className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-bold uppercase tracking-wider">{s.division}</span>
                <span>{s.conference}</span>
              </div>
              <div className="text-[11px] text-white/30 mt-1">{s.location}</div>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

// ═══════════════════════════════════════
// PROSPECT REPORTS
// ═══════════════════════════════════════
function ProspectReports() {
  const includes = [
    "Athletic Metrics",
    "Baseball Metrics",
    "Position Evaluation",
    "Event Statistics",
    "Recruiting Notes",
    "Player Profile Update",
  ];

  return (
    <Section border="bottom">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <FadeIn>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Post-Event</div>
            <h2 className="text-2xl md:text-3xl uppercase font-bold mb-3">Verified Prospect <span className="accent-text">Reports</span></h2>
            <p className="text-sm text-white/60 mb-4 leading-relaxed">
              Every participant receives a verified prospect report following the event. Reports automatically integrate into Apex Player Profiles and are accessible to attending college coaches.
            </p>
            <p className="text-[12px] text-white/40 leading-relaxed">
              Reports are designed to serve as a recruiting tool — verified data that coaches can reference when making evaluation and recruiting decisions.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-[#0d1117] rounded-2xl border border-[#17FC13]/10 p-6">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/50 mb-4">Verified Prospect Report Includes</div>
            {includes.map(item => (
              <div key={item} className="flex items-center gap-2.5 py-2.5 text-[13px] text-white/70 border-b border-white/[0.03] last:border-b-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13]/40 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
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
    "Defensive Excellence",
  ];

  return (
    <Section border="bottom">
      <FadeIn>
        <div className="mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Recognition</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold mb-3">Awards <span className="accent-text">Ceremony</span></h2>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl">
          {awards.map(a => (
            <div key={a} className="flex items-center gap-3 bg-[#0d1117] rounded-xl border border-white/[0.04] px-4 py-3 hover:border-[#17FC13]/10 transition-all">
              <span className="w-2 h-2 rounded-full bg-[#17FC13] flex-shrink-0" />
              <span className="text-[13px] font-medium text-white/80">{a}</span>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

// ═══════════════════════════════════════
// SELECTION PROCESS
// ═══════════════════════════════════════
function SelectionProcess() {
  return (
    <Section border="bottom">
      <FadeIn>
        <div className="mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Prospect Selection</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold mb-3">Selection <span className="accent-text">Process</span></h2>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { step: "01", title: "Nomination", desc: "Coaches nominate prospects based on performance, work ethic, and potential throughout the season." },
          { step: "02", title: "Evaluation", desc: "League evaluators review statistics, game performance, and scouting reports across all divisions." },
          { step: "03", title: "Selection", desc: "The top 80 prospects are selected and invited. Roster announcements are made two weeks before the event." },
          { step: "04", title: "Confirmation", desc: "Selected prospects confirm participation, receive orientation materials, and prepare for the combine." },
        ].map((s, i) => (
          <FadeIn key={s.step} delay={i * 0.05}>
            <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-5 h-full">
              <div className="w-8 h-8 rounded-full bg-[#17FC13]/10 border border-[#17FC13]/20 flex items-center justify-center mb-3">
                <span className="text-[11px] font-bold text-[#17FC13]">{s.step}</span>
              </div>
              <div className="text-sm font-bold text-white/90 mb-1">{s.title}</div>
              <div className="text-[12px] text-white/50 leading-relaxed">{s.desc}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════
// REGISTRATION
// ═══════════════════════════════════════
function Registration() {
  return (
    <Section id="register" size="lg">
      <FadeIn>
        <div className="text-center">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-4">Limited to 80 Prospects</div>
          <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4 leading-[0.9]">
            Where Opportunity<br />Meets <span className="accent-text">Preparation</span>
          </h2>
          <p className="text-sm text-white/50 max-w-xl mx-auto mb-3 leading-relaxed">
            Verified metrics. Professional evaluations. College coach exposure. Recruiting education. Two showcase games. One weekend built for the next level.
          </p>
          <p className="text-[11px] text-white/30 mb-8">
            16U–18U &middot; August 2026 &middot; Greater Boston
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/join">Register Now</Button>
            <Button variant="secondary" href="mailto:apexsportsgg@gmail.com">Nominate a Prospect</Button>
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
    { q: "Who is eligible to participate?", a: "The combine is open to 16U, 17U, and 18U prospects. Participants are selected through coach nomination, league performance evaluation, or direct registration." },
    { q: "How are prospects selected?", a: "Prospects are nominated by their coaches, evaluated by league staff, and selected based on performance, metrics, and potential. Direct registration is also available for qualified players." },
    { q: "Which college coaches will attend?", a: "We invite coaches from NCAA Division I, II, III, NAIA, and NJCAA programs across New England. The attending programs list is updated as confirmations come in." },
    { q: "Are all metrics professionally verified?", a: "Yes. All combine testing is conducted with professional-grade equipment. Every metric is verified by event staff and uploaded directly to the player's Apex Profile." },
    { q: "Do all prospects play in both games?", a: "Yes. Every participant receives two full game opportunities. This is not an invite-only selection — every prospect is evaluated across both showcase games." },
    { q: "Will the games be streamed?", a: "Yes. Both showcase games are broadcast live on Apex Live with professional scorekeeping, box scores, and play-by-play coverage." },
    { q: "What does the prospect report include?", a: "Every participant receives a verified prospect report including athletic metrics, baseball metrics, position evaluations, event statistics, and recruiting notes. Reports integrate directly into Apex Player Profiles." },
    { q: "What should prospects bring?", a: "Full uniform, glove, bat, cleats, and any personal catching or pitching gear. All testing equipment is provided by the event." },
    { q: "Is there a recruiting education component?", a: "Yes. Day One includes a college coach panel covering recruiting timelines, academic expectations, communication strategies, NIL, the transfer portal, and a live Q&A session. A dedicated coach networking session follows." },
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
                <span className="text-[14px] font-bold text-white/80 group-hover:text-[#17FC13] transition-colors pr-4">{f.q}</span>
                <span className={`text-white/40 text-lg transition-transform flex-shrink-0 ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {open === i && (
                <div className="pb-4 text-[13px] text-white/50 leading-relaxed">{f.a}</div>
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
      <EventPhilosophy />
      <ByTheNumbers />
      <CombineTesting />
      <PositionEvaluations />
      <RecruitingEducation />
      <ShowcaseGames />
      <Schedule />
      <CollegeCoaches />
      <ProspectReports />
      <Awards />
      <SelectionProcess />
      <Registration />
      <FAQ />
    </main>
  );
}
