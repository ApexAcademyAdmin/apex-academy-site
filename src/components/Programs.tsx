"use client";

const PROGRAMS = [
  {
    title: "Travel Teams",
    tagline: "Compete at the highest level",
    description: "Elite competition schedules, top-tier tournaments, and exposure to college coaches. Our travel teams are built to develop players through meaningful, competitive experiences.",
    features: ["Tournament competition", "College exposure events", "Showcase preparation", "Year-round development"],
  },
  {
    title: "Player Development",
    tagline: "The system that builds complete players",
    description: "Position-specific skill work, hitting and pitching mechanics, and measurable progression. Every session is structured, every metric is tracked, and every player has a development roadmap.",
    features: ["Hitting mechanics", "Pitching development", "Position-specific training", "Metric tracking"],
  },
  {
    title: "Strength & Speed",
    tagline: "Build the athlete behind the player",
    description: "Baseball-specific strength training, sprint development, mobility, and recovery. Programmed by phase — off-season, ramp-up, in-season, and post-season.",
    features: ["Strength programming", "Sprint development", "Mobility & recovery", "Seasonal periodization"],
  },
  {
    title: "Recruiting",
    tagline: "Get seen by the right programs",
    description: "Academic profiling, metric benchmarking, video production, and direct connections to college programs. We prepare athletes for the recruiting process from day one.",
    features: ["Academic preparation", "Metric benchmarking", "Video production", "College connections"],
  },
];

export function Programs() {
  return (
    <section id="programs" className="relative py-24 md:py-32 bg-black">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        <div className="text-center mb-16">
          <div className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#6EFF00] mb-4">What We Build</div>
          <h2 className="text-[36px] md:text-[52px] font-black uppercase tracking-tight leading-[0.9] text-white">
            Programs That<br /><span className="text-[#6EFF00]">Produce Results</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROGRAMS.map((program, i) => (
            <div key={i} className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 transition-all duration-500 hover:border-[#6EFF00]/20 hover:bg-[#6EFF00]/[0.02] overflow-hidden">
              {/* Hover glow */}
              <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-[#6EFF00]/[0.03] blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                {/* Number */}
                <div className="text-[64px] font-black text-white/[0.04] leading-none absolute -top-2 -left-1 select-none">0{i + 1}</div>

                <div className="relative">
                  <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#6EFF00] mb-2">{program.tagline}</div>
                  <h3 className="text-[24px] font-black uppercase tracking-tight text-white mb-4">{program.title}</h3>
                  <p className="text-[13px] text-white/60 leading-[1.7] mb-6">{program.description}</p>

                  <div className="grid grid-cols-2 gap-2">
                    {program.features.map((feature, fi) => (
                      <div key={fi} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#6EFF00]" />
                        <span className="text-[11px] text-white/70">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
