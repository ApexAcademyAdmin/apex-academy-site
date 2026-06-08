import { Button } from "@/components/Button";
import { CONTACT } from "@/lib/constants";

function Movement({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="relative">
      <span aria-hidden className="absolute -left-[33px] sm:-left-[45px] top-[6px] w-2 h-2 rounded-full bg-[#17FC13] ring-4 ring-[#17FC13]/10" />
      <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#17FC13]/60 mb-3">{label}</div>
      <div className="space-y-3.5 text-[14px] md:text-[15px] text-white/85 leading-[1.85]">{children}</div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* ══════ HERO ══════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_30%,_rgba(23,252,19,0.05)_0%,_transparent_60%)]" />

        <div className="relative max-w-[1120px] mx-auto px-6 pt-24 md:pt-28 pb-10">
          <div className="flex items-center gap-2 mb-5 text-[10px] font-medium uppercase tracking-[0.2em]">
            <a href="/" className="text-white/60 no-underline hover:text-white/80">Home</a>
            <span className="text-white/10">/</span>
            <span className="text-[#17FC13]/50">About</span>
          </div>
          <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-2">Est. 2020 &middot; Boston, Massachusetts</div>
          <h1 className="text-3xl md:text-5xl uppercase font-bold leading-[0.9] mb-4">
            Built For <span className="accent-text">The Players</span>
          </h1>
          <p className="text-[15px] md:text-[16px] text-white/80 leading-[1.8] max-w-2xl">
            One organization built on a single belief — that every player deserves a place to develop, compete, and create opportunities for themselves, on and off the field. This is how it started, and where it&apos;s going.
          </p>
        </div>
      </section>

      {/* ══════ THE STORY ══════ */}
      <div className="max-w-[760px] mx-auto px-6 py-12 md:py-16">
        <div className="relative pl-7 sm:pl-10 border-l border-white/[0.08] space-y-11 md:space-y-12">

          <Movement label="Where It Started">
            <p>Apex Academy was founded in late 2020, after conversations with families across Greater Boston who felt the travel baseball landscape was changing for the worse. Costs were climbing. Larger organizations were consolidating the game into something that looked more like a business than a community — and for a lot of families, the sport their kids loved was slipping out of reach.</p>
            <p>We believed there had to be another way.</p>
          </Movement>

          <Movement label="Another Way">
            <p>So we set out to build one. The idea was simple: a genuinely high-level baseball experience at a cost families could actually afford, with player development, inclusion, and opportunity at the center of every decision. Not wins for the sake of wins. Not a logo to sell. A program built around the people who make the game worth playing.</p>
            <p>That mission hasn&apos;t changed since. Everything we&apos;ve added in the years since has been in service of it.</p>
          </Movement>

          <Movement label="Development First">
            <p>We&apos;re not built around the scoreboard. Every player arrives at a different stage, with a different ceiling and a different path to reach it — and our job is to help each one get the most out of theirs. Players are developed at the positions that fit their long-term trajectory, not just where a team happens to need them that weekend.</p>
            <p>Baseball is a game built on failure, adjustment, discipline, and resilience. The lessons it teaches — accountability, leadership, perseverance, growth — outlast any season. Helping players carry those forward, on the field and off it, is the part we take most seriously.</p>
          </Movement>

          <Movement label="Opportunity">
            <p>Much of what we do is centered around creating opportunities for players to grow, develop, and pursue their goals both on and off the field. Competitive baseball is only part of the journey. We believe athletes deserve access to the resources, guidance, information, and experiences that help them better understand the path ahead and prepare for whatever comes next.</p>
            <p>Our responsibility is not only to help players improve as athletes, but to help them build confidence, gain perspective, and put themselves in position to take advantage of opportunities when they arise.</p>
            <p>The goal is never simply to participate. The goal is to continue developing, continue learning, and be prepared when the next opportunity presents itself.</p>
          </Movement>

          <Movement label="The League">
            <p>The League was created from the same philosophy that drives Apex Academy: creating more opportunities for players to compete, develop, and enjoy the game. Rather than creating separation between town baseball and travel baseball, the goal is to help bridge the gap between them by providing a structured, competitive environment that welcomes players and organizations from across the region.</p>
            <p>The schedule is intentionally designed around the realities of modern baseball. Games are primarily played during the week, allowing players to continue participating with their travel teams, tournaments, and other commitments without being forced to choose one experience over another. This creates additional opportunities for meaningful at-bats, innings, and development throughout the season while minimizing conflicts for players and families.</p>
            <p>Beyond the competition itself, the League is designed to create a more engaging and rewarding baseball experience. Regular season and postseason achievements are recognized through league awards, with players, coaches, and teams celebrated annually at the Apex Academy Banquet. The League also serves as another avenue for visibility, helping players gain exposure while continuing to develop within a competitive and supportive environment.</p>
            <p>At its core, the League exists to strengthen baseball throughout the region by providing quality competition, fostering development, building community, and creating opportunities for players to continue growing both on and off the field.</p>
          </Movement>

          <Movement label="What Success Looks Like">
            <p>Success isn&apos;t measured by trophies, rankings, or accolades alone.</p>
            <p>It&apos;s measured by the opportunities our players create for themselves through hard work, development, and perseverance. Some Apex athletes have continued their baseball careers at the collegiate and professional levels, while others have gone on to pursue success in academics, business, and their communities.</p>
            <p>We believe the lessons learned through baseball extend far beyond the field. Confidence, accountability, leadership, resilience, and teamwork are qualities that impact every aspect of life.</p>
            <p>Our goal has never been to simply develop better baseball players. Our goal is to help develop better people.</p>
            <p className="text-white font-semibold">The game is the vehicle. The person is the purpose.</p>
          </Movement>

          <Movement label="What We Protect">
            <p>However much the program grows, the things that built it stay the same: inclusion, development, accountability, opportunity, and a commitment to putting players and families first. That&apos;s the standard we hold every team, coach, and decision to — and the one we&apos;ll keep holding as we add levels, events, and players in the years ahead.</p>
            <p>Apex Academy was never meant to be just another travel program. It&apos;s a player-first organization — built to help athletes develop, compete, and create opportunities for themselves that reach far beyond the field.</p>
          </Movement>
        </div>

        {/* ── Closing ── */}
        <div className="mt-12 md:mt-14 border-l-2 border-[#17FC13]/40 pl-5 py-1">
          <p className="text-[15px] md:text-[17px] text-white/80 leading-[1.75] italic">
            &ldquo;Apex Academy is about more than baseball. It&apos;s about helping young athletes build a foundation for success in whatever path they choose next.&rdquo;
          </p>
          <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/60">&mdash; Coach Gary</div>
        </div>

        <div className="mt-10 border border-[#171717] bg-radial p-7 text-center">
          <h3 className="text-base uppercase font-bold mb-2">Join Apex</h3>
          <p className="text-[13px] text-white/65 mb-5 max-w-sm mx-auto">Ready to be part of something built for the players? Start here.</p>
          <div className="flex flex-col sm:flex-row gap-2.5 justify-center max-w-sm mx-auto">
            <Button href="/join" size="small">Register</Button>
            <Button href={CONTACT.instagram} variant="secondary" size="small" external>{CONTACT.instagramHandle}</Button>
          </div>
        </div>
      </div>
    </>
  );
}
