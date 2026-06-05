"use client";

import { useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";

// ═══════════════════════════════════════
// OVERVIEW
// ═══════════════════════════════════════
function Overview() {
  const stats = [
    { value: "80", label: "Prospects" },
    { value: "30+", label: "College Coaches" },
    { value: "12+", label: "Verified Metrics" },
    { value: "2", label: "Showcase Games" },
    { value: "2", label: "Days" },
    { value: "D1–JUCO", label: "All Divisions" },
  ];

  return (
    <Section border="bottom">
      <FadeIn>
        <div className="text-center mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Event Overview</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold mb-4">Verified. Evaluated. <span className="accent-text">Exposed.</span></h2>
          <p className="text-sm text-white/60 max-w-2xl mx-auto leading-relaxed">
            A two-day prospect evaluation modeled after the MLB Draft Combine and elite recruiting showcases. Hosted annually at a select college facility in Greater Boston.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {stats.map(s => (
            <div key={s.label} className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-3 text-center">
              <div className="text-xl font-bold accent-text mb-0.5">{s.value}</div>
              <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/40">{s.label}</div>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

// ═══════════════════════════════════════
// SCHEDULE DATA
// ═══════════════════════════════════════
type ScheduleEvent = {
  time: string;
  title: string;
  accent?: boolean;
  detail?: {
    description: string;
    items?: string[];
    note?: string;
  };
};

const dayOne: ScheduleEvent[] = [
  {
    time: "7:30 AM",
    title: "Check-In & Registration",
    detail: {
      description: "Player check-in, jersey distribution, event materials, and college coach welcome.",
    },
  },
  {
    time: "8:15 AM",
    title: "Opening Session",
    detail: {
      description: "Welcome ceremony with event overview, evaluation process breakdown, recruiting expectations, and college coach introductions.",
    },
  },
  {
    time: "9:00 AM",
    title: "Combine Testing — Athletic & Baseball Metrics",
    accent: true,
    detail: {
      description: "Professional-grade combine testing across every measurable category. All results are verified and uploaded directly to Apex Player Profiles.",
      items: ["Height", "Weight", "Wingspan", "60 Yard Dash", "Home-to-First", "Exit Velocity", "Bat Speed", "Infield Velocity", "Outfield Velocity", "Catcher Velocity", "Pop Time", "Pitching Velocity"],
    },
  },
  {
    time: "11:30 AM",
    title: "Position Evaluations — All Positions",
    accent: true,
    detail: {
      description: "Position-specific defensive and pitching evaluations conducted by professional evaluators.",
      items: [
        "Infielders — fielding actions, arm strength, footwork, range",
        "Outfielders — route efficiency, arm strength, carry, first step",
        "Catchers — receiving, blocking, pop time, arm strength, game management",
        "Pitchers — velocity, bullpen session, command, secondary pitches, mechanics",
      ],
    },
  },
  {
    time: "12:30 PM",
    title: "Lunch & Coach Networking",
  },
  {
    time: "1:30 PM",
    title: "Live Batting Practice & Offensive Evaluations",
    accent: true,
    detail: {
      description: "Professional workout with live exit velocity readings, swing assessments, and offensive evaluations for every prospect.",
    },
  },
  {
    time: "3:30 PM",
    title: "College Coach Recruiting Panel & Q&A",
    accent: true,
    detail: {
      description: "Attending college coaches discuss the recruiting process directly with athletes and families. Open to player and parent questions.",
      items: ["Recruiting Timeline", "Academic Expectations", "Coach Communication", "Camps & Showcases", "What Coaches Look For", "Transfer Portal", "NIL Landscape", "Common Recruiting Mistakes"],
      note: "Live Q&A session included",
    },
  },
  {
    time: "4:45 PM",
    title: "Coach Meet & Greet — Players & Families",
    detail: {
      description: "Dedicated networking session where athletes and families meet attending college coaches. The goal is genuine relationship building.",
    },
  },
];

const dayTwo: ScheduleEvent[] = [
  {
    time: "8:00 AM",
    title: "Player Arrival, Team Meetings & Warmups",
  },
  {
    time: "9:30 AM",
    title: "Showcase Game One — Team American vs Team National",
    accent: true,
    detail: {
      description: "Initial live evaluation. College coaches evaluate athleticism, baseball actions, competitiveness, instincts, and approach.",
      items: ["Apex Live Broadcast", "Live Box Score", "Play-by-Play Coverage", "Statistics Tracking", "Recruiting Notes"],
    },
  },
  {
    time: "12:00 PM",
    title: "Lunch — Coach Evaluations Continue",
  },
  {
    time: "1:30 PM",
    title: "Showcase Game Two — Team American vs Team National",
    accent: true,
    detail: {
      description: "Second live evaluation. Coaches evaluate consistency, adjustments, baseball IQ, and performance under pressure.",
      items: ["Apex Live Broadcast", "Live Box Score", "Statistics Tracking", "Recruiting Evaluations"],
      note: "Every prospect plays in both games — this is not an invite-only selection",
    },
  },
  {
    time: "4:00 PM",
    title: "Awards Ceremony",
    detail: {
      description: "Recognition for standout performance across the weekend.",
      items: ["Top Prospect", "Event MVP", "Top Position Player", "Top Pitcher", "Fastest Runner", "Highest Exit Velocity", "Highest Pitching Velocity", "Top Catcher", "Defensive Excellence"],
    },
  },
  {
    time: "4:30 PM",
    title: "Verified Prospect Report Distribution",
    detail: {
      description: "Every participant receives a verified prospect report that integrates directly into their Apex Player Profile.",
      items: ["Athletic Metrics", "Baseball Metrics", "Position Evaluation", "Event Statistics", "Recruiting Notes", "Player Profile Update"],
    },
  },
];

// ═══════════════════════════════════════
// SCHEDULE ROW — with hover popup bubble
// ═══════════════════════════════════════
function ScheduleRow({ event }: { event: ScheduleEvent }) {
  const [show, setShow] = useState(false);
  const hasDetail = !!event.detail;

  return (
    <div
      className="relative"
      onMouseEnter={() => hasDetail && setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div
        onClick={() => hasDetail && setShow(s => !s)}
        className={`flex items-start gap-4 px-4 py-3 border-b border-white/[0.03] transition-colors ${event.accent ? "bg-[#17FC13]/[0.02]" : ""} ${hasDetail ? "hover:bg-white/[0.02] cursor-pointer" : ""}`}
      >
        <span className="text-[11px] font-mono text-[#17FC13]/50 w-16 flex-shrink-0 pt-0.5">{event.time}</span>
        <span className={`text-[12px] flex-1 ${event.accent ? "font-bold text-white/80" : "text-white/60"}`}>
          {event.title}
        </span>
        {hasDetail && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13]/30 flex-shrink-0 mt-1.5" />
        )}
      </div>

      {show && event.detail && (
        <div className="absolute z-[100] left-4 right-4 bottom-full mb-2 animate-in fade-in zoom-in-95 duration-150 pointer-events-none">
          <div className="bg-[#161b22] rounded-xl border border-[#17FC13]/15 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_0_1px_rgba(23,252,19,0.08)]">
            <p className="text-[12px] text-white/70 leading-relaxed mb-2">{event.detail.description}</p>
            {event.detail.items && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {event.detail.items.map(item => (
                  <span key={item} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/50">{item}</span>
                ))}
              </div>
            )}
            {event.detail.note && (
              <p className="text-[10px] text-[#17FC13]/60 uppercase tracking-wider font-bold mt-1">{event.detail.note}</p>
            )}
            <div className="absolute -bottom-1.5 left-8 w-3 h-3 bg-[#161b22] border-r border-b border-[#17FC13]/15 rotate-45" />
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════
// SCHEDULE
// ═══════════════════════════════════════
function Schedule() {
  return (
    <Section id="schedule" border="bottom">
      <FadeIn>
        <div className="text-center mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Event Schedule</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold mb-2">Two Days. <span className="accent-text">Full Evaluation.</span></h2>
          <p className="text-[11px] text-white/30">Hover or tap any session for details.</p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <FadeIn>
          <div className="bg-[#0d1117] rounded-2xl border border-white/[0.04]">
            <div className="px-4 py-3 border-b border-white/[0.05] rounded-t-2xl">
              <div className="text-xs font-bold uppercase tracking-wider text-[#17FC13]/60">Day One — Saturday</div>
              <div className="text-[10px] text-white/30 mt-0.5">Combine & Recruiting Day</div>
            </div>
            {dayOne.map((e, i) => (
              <ScheduleRow key={i} event={e} />
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-[#0d1117] rounded-2xl border border-white/[0.04]">
            <div className="px-4 py-3 border-b border-white/[0.05] rounded-t-2xl">
              <div className="text-xs font-bold uppercase tracking-wider text-[#17FC13]/60">Day Two — Sunday</div>
              <div className="text-[10px] text-white/30 mt-0.5">Showcase Game Day</div>
            </div>
            {dayTwo.map((e, i) => (
              <ScheduleRow key={i} event={e} />
            ))}
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

  return (
    <Section id="coaches" border="bottom">
      <FadeIn>
        <div className="mb-6">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Attending Programs</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold">College <span className="accent-text">Coaches</span></h2>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {schools.map(s => (
            <div key={s.name} className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-3.5 hover:border-[#17FC13]/10 transition-all">
              <div className="text-[13px] font-bold text-white/90">{s.name}</div>
              <div className="flex items-center gap-2 text-[11px] text-white/40 mt-0.5">
                <span className="px-1.5 py-0.5 rounded bg-white/[0.04] text-[9px] font-bold uppercase tracking-wider">{s.division}</span>
                <span>{s.conference}</span>
                <span className="text-white/20">{s.location}</span>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

// ═══════════════════════════════════════
// WHAT YOU LEAVE WITH
// ═══════════════════════════════════════
function WhatYouLeaveWith() {
  return (
    <Section border="bottom">
      <FadeIn>
        <div className="text-center mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">After the Event</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold">Every Prospect <span className="accent-text">Leaves With</span></h2>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          <div className="bg-[#0d1117] rounded-2xl border border-[#17FC13]/10 p-5">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/50 mb-3">Verified Prospect Report</div>
            {["Athletic Metrics", "Baseball Metrics", "Position Evaluation", "Event Statistics", "Recruiting Notes", "Player Profile Update"].map(item => (
              <div key={item} className="flex items-center gap-2 py-1.5 text-[12px] text-white/60">
                <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13]/30 flex-shrink-0" />
                {item}
              </div>
            ))}
            <p className="text-[10px] text-white/30 mt-3 leading-relaxed">Reports integrate directly into Apex Player Profiles and are accessible to attending college coaches.</p>
          </div>

          <div className="bg-[#0d1117] rounded-2xl border border-white/[0.04] p-5">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/50 mb-3">Awards Ceremony</div>
            <div className="grid grid-cols-1 gap-1.5">
              {["Top Prospect", "Event MVP", "Top Position Player", "Top Pitcher", "Fastest Runner", "Highest Exit Velocity", "Highest Pitching Velocity", "Top Catcher", "Defensive Excellence"].map(a => (
                <div key={a} className="flex items-center gap-2 text-[12px] text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13] flex-shrink-0" />
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
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
          <p className="text-[13px] text-white/40 max-w-md mx-auto mb-8 leading-relaxed">
            Verified metrics. Professional evaluations. College coach exposure. Two showcase games. One weekend built for the next level.
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
    { q: "Who is eligible?", a: "The combine is open to 16U, 17U, and 18U prospects selected through coach nomination, league evaluation, or direct registration." },
    { q: "Do all prospects play in both games?", a: "Yes. Every participant receives two full game opportunities. This is not an invite-only selection." },
    { q: "Are metrics professionally verified?", a: "Yes. All combine testing uses professional-grade equipment. Every metric is verified and uploaded directly to the player's Apex Profile." },
    { q: "Which college coaches attend?", a: "Coaches from NCAA D1, D2, D3, NAIA, and NJCAA programs across New England. The attending list is updated as confirmations come in." },
    { q: "Will the games be streamed?", a: "Yes. Both showcase games are broadcast live on Apex Live with scorekeeping, box scores, and play-by-play." },
    { q: "What does the prospect report include?", a: "Athletic metrics, baseball metrics, position evaluations, event statistics, and recruiting notes — all integrated into your Apex Player Profile." },
    { q: "What should prospects bring?", a: "Full uniform, glove, bat, cleats, and any personal catching or pitching gear. All testing equipment is provided." },
  ];

  return (
    <Section border="top">
      <FadeIn>
        <div className="max-w-2xl mx-auto">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Questions</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold mb-6">FAQ</h2>

          {faqs.map((f, i) => (
            <div key={i} className="border-b border-white/[0.04]">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between py-3.5 text-left group">
                <span className="text-[13px] font-bold text-white/80 group-hover:text-[#17FC13] transition-colors pr-4">{f.q}</span>
                <span className={`text-white/40 text-lg transition-transform flex-shrink-0 ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {open === i && (
                <div className="pb-3.5 text-[12px] text-white/50 leading-relaxed">{f.a}</div>
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
      <PageHeader
        title="Prospect Combine"
        accent="& Showcase"
        subtitle="The Premier College Exposure Event in New England — 16U · 17U · 18U — August 2026, Greater Boston"
        breadcrumb={[{ label: "League", href: "/league" }]}
        actions={[
          { label: "Register", href: "#register", variant: "primary" },
          { label: "Full Schedule", href: "#schedule" },
          { label: "College Coaches", href: "#coaches" },
        ]}
      />
      <Overview />
      <Schedule />
      <CollegeCoaches />
      <WhatYouLeaveWith />
      <Registration />
      <FAQ />
    </main>
  );
}
