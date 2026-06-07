import { Section } from "@/components/Section";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";

export default function RisingProspectsPage() {
  return (
    <main>
      <PageHeader
        title="Rising Prospects"
        accent="Combine"
        subtitle="An annual prospect combine hosted by Apex Academy with guaranteed college coach attendance. Open to all players — free for Apex Academy athletes."
        breadcrumb={[{ label: "Events", href: "/events" }]}
        actions={[
          { label: "Register", href: "#register", variant: "primary" },
        ]}
      />

      {/* OVERVIEW */}
      <Section border="bottom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Annual Event</div>
            <h2 className="text-2xl md:text-3xl uppercase font-bold mb-3">What Is the Rising Prospects <span className="accent-text">Combine?</span></h2>
            <p className="text-sm text-white/90 leading-relaxed mb-4">
              The Rising Prospects Combine is an annual evaluation and exposure event hosted by Apex Academy. The combine brings together prospects from across the region for professional-level athletic and baseball testing in front of guaranteed attending college coaches.
            </p>
            <p className="text-[13px] text-white/75 leading-relaxed mb-4">
              Every participant receives a verified player profile through The Academy app — including all metrics, evaluations, and video collected throughout the event. Profiles are accessible to attending coaches and remain permanently available for recruiting purposes.
            </p>
            <p className="text-[13px] text-white/75 leading-relaxed">
              Apex Academy athletes participate at no cost. External players are welcome to register for a fee.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-[#0d1117] rounded-2xl border border-[#17FC13]/10 p-6">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/50 mb-4">Event Details</div>
              {[
                { label: "Event", value: "Rising Prospects Combine" },
                { label: "Hosted By", value: "Apex Academy" },
                { label: "Frequency", value: "Annual" },
                { label: "Location", value: "Greater Boston — TBA" },
                { label: "College Coaches", value: "Guaranteed Attendance" },
                { label: "Profiles", value: "The Academy App" },
              ].map(d => (
                <div key={d.label} className="flex items-start justify-between py-2 border-b border-white/[0.03] last:border-b-0">
                  <span className="text-[11px] font-bold text-white/80 uppercase tracking-wider">{d.label}</span>
                  <span className="text-[12px] text-white/70 text-right">{d.value}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/50 mb-3">Pricing</div>
              <div className="flex items-start justify-between mb-2">
                <span className="text-[13px] text-white/70">Apex Academy Athletes</span>
                <span className="text-[13px] font-bold text-[#17FC13]/70">Free</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-[13px] text-white/70">External Players</span>
                <span className="text-[13px] font-bold text-white/70">Registration Fee</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* WHAT'S TESTED */}
      <Section border="bottom">
        <div className="mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Combine Testing</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold mb-2">What Gets <span className="accent-text">Measured</span></h2>
          <p className="text-sm text-white/80 max-w-xl">Professional-grade testing across every measurable category. All results are verified and uploaded directly to player profiles through The Academy app.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { category: "Physical", metrics: ["Height", "Weight", "Wingspan"] },
            { category: "Speed", metrics: ["60 Yard Dash", "Home-to-First"] },
            { category: "Hitting", metrics: ["Exit Velocity", "Bat Speed"] },
            { category: "Arm Strength", metrics: ["Infield Velocity", "Outfield Velocity", "Catcher Velocity", "Pop Time"] },
            { category: "Pitching", metrics: ["Velocity", "Bullpen Evaluation", "Command", "Secondary Pitches"] },
            { category: "Defense", metrics: ["Fielding Actions", "Footwork", "Range", "Arm Accuracy"] },
            { category: "Catching", metrics: ["Receiving", "Blocking", "Pop Time", "Game Management"] },
            { category: "Video", metrics: ["Swing Film", "Defensive Clips", "Pitching Mechanics", "Game Highlights"] },
          ].map(c => (
            <div key={c.category} className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-4">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/50 mb-2">{c.category}</div>
              {c.metrics.map(m => (
                <div key={m} className="flex items-center gap-1.5 py-1 text-[12px] text-white/90">
                  <span className="w-1 h-1 rounded-full bg-[#17FC13]/30 flex-shrink-0" />
                  {m}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Section>

      {/* THE ACADEMY INTEGRATION */}
      <Section border="bottom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Player Profiles</div>
            <h2 className="text-2xl md:text-3xl uppercase font-bold mb-3">Powered by <span className="accent-text">The Academy</span></h2>
            <p className="text-sm text-white/90 leading-relaxed mb-4">
              Every participant receives a verified player profile through The Academy app — included with registration at no additional cost.
            </p>
            <p className="text-[13px] text-white/75 leading-relaxed">
              All metrics, evaluations, and video captured during the combine are uploaded directly to your profile. Attending college coaches have access to verified data in one place — making it easier to evaluate, follow up, and recruit.
            </p>
          </div>

          <div className="bg-[#0d1117] rounded-2xl border border-white/[0.04] p-6">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/50 mb-4">Your Profile Includes</div>
            {["Verified Athletic Metrics", "Baseball-Specific Measurements", "Position Evaluations", "Video & Film", "Recruiting Contact Information", "Event Performance Data", "College Coach Accessibility"].map(item => (
              <div key={item} className="flex items-center gap-2.5 py-2 text-[13px] text-white/60 border-b border-white/[0.03] last:border-b-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13]/30 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* COLLEGE COACHES */}
      <Section border="bottom">
        <div className="mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Exposure</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold mb-2">College Coach <span className="accent-text">Attendance</span></h2>
          <p className="text-sm text-white/80 max-w-xl">
            The Rising Prospects Combine guarantees college coach attendance. Programs from NCAA Division I, II, III, NAIA, and NJCAA are invited to evaluate prospects and access verified player data.
          </p>
        </div>

        <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-5 max-w-lg">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 mb-3">Coaches Receive</div>
          {["Verified Prospect Metrics", "Player Evaluations", "Video Access via The Academy", "Recruiting Contact Information", "Event Performance Data"].map(item => (
            <div key={item} className="flex items-center gap-2 py-1.5 text-[12px] text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13]/30 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </Section>

      {/* WHO SHOULD ATTEND */}
      <Section border="bottom">
        <div className="mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Who Should Attend</div>
          <h2 className="text-2xl md:text-3xl uppercase font-bold">Built for <span className="accent-text">Prospects</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
          {[
            { title: "Apex Academy Athletes", desc: "Current Apex players across all teams participate for free. The combine is an extension of the development system — another opportunity to be evaluated and seen." },
            { title: "External Players", desc: "Players outside the Apex program are welcome to register. The combine provides access to the same professional testing, verified profiles, and college coach exposure." },
            { title: "College Coaches", desc: "Programs looking to evaluate and recruit prospects in the Greater Boston area. Verified data, video, and player profiles are provided for every participant." },
          ].map(a => (
            <div key={a.title} className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-5 h-full">
              <div className="text-sm font-bold text-white/80 mb-2">{a.title}</div>
              <div className="text-[12px] text-white/80 leading-relaxed">{a.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* REGISTRATION CTA */}
      <Section id="register" size="lg">
        <div className="text-center">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Registration</div>
          <h2 className="text-2xl md:text-3xl font-bold uppercase mb-3 leading-[0.9]">
            Get <span className="accent-text">Evaluated</span>
          </h2>
          <p className="text-sm text-white/80 max-w-md mx-auto mb-3">
            Professional combine testing. Guaranteed college coach attendance. Verified player profiles through The Academy. One event that puts you on the map.
          </p>
          <p className="text-[11px] text-white/65 mb-6">Apex Academy athletes participate for free.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="mailto:apexsportsgg@gmail.com">Register Now</Button>
            <Button variant="secondary" href="/events">All Events</Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
