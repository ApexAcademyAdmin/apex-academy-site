import { Button } from "@/components/Button";
import { CONTACT } from "@/lib/constants";

function Movement({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center gap-2.5 mb-3">
        <span aria-hidden className="w-5 h-px bg-[#17FC13]/50 shrink-0" />
        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#17FC13]/60">{label}</span>
      </div>
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
          <div className="flex items-center gap-2.5 mb-4">
            <span aria-hidden className="w-5 h-px bg-[#17FC13]/50 shrink-0" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/60">Est. 2020 &middot; Boston, Massachusetts</span>
          </div>
          <h1 className="text-3xl md:text-5xl uppercase font-bold leading-[0.95] mb-5">
            Built For <span className="accent-text">The Players</span>
          </h1>
          <p className="text-[15px] md:text-[17px] text-white/85 leading-[1.75] max-w-2xl">
            Apex Academy is a player-first baseball organization in Greater Boston — built on development, opportunity, and the long-term growth of every athlete we work with.
          </p>
          <p className="mt-3 text-[13px] md:text-[14px] text-white/55 leading-[1.7] max-w-2xl">
            What follows is where we started, what we stand for, and where we&apos;re going.
          </p>
        </div>
      </section>

      {/* ══════ THE STORY ══════ */}
      <div className="max-w-[1120px] mx-auto px-6 py-12 md:py-16">
        <div className="max-w-[760px] space-y-11 md:space-y-12">

          <Movement label="Where It Started">
            <p>Apex Academy was founded in late 2020 following conversations with families throughout Greater Boston who believed the youth baseball landscape was becoming increasingly difficult to navigate. As costs continued to rise and access to competitive opportunities became more limited, many families felt the focus of the game was shifting away from player development and community.</p>
            <p>We saw an opportunity to build something different.</p>
          </Movement>

          <Movement label="Our Foundation">
            <p>From the beginning, the vision was straightforward: create a high-quality baseball experience that remained accessible to families while placing player development, opportunity, and inclusion at the center of every decision. The objective was never simply to build teams or compete in tournaments. It was to create an environment where athletes could develop their skills, grow their confidence, and pursue their goals both on and off the field.</p>
            <p>That philosophy continues to guide the organization today. Every team, event, resource, and opportunity that has been added since our founding has been built with the same purpose in mind: providing players with the support, guidance, and opportunities they need to reach their full potential.</p>
          </Movement>

          <Movement label="Development First">
            <p>How we pursue that potential is where our approach to development begins. Every player enters the game with different strengths, different goals, and a different path ahead of them. Our responsibility is to help each athlete maximize their potential by providing the guidance, opportunities, and developmental environment needed to continue growing over time.</p>
            <p>We believe development should be intentional. Players are encouraged to learn the game, expand their skill sets, and gain experience in roles that support their long-term growth rather than short-term outcomes. The objective is not simply to become a better player today, but to continue building the foundation for future success.</p>
            <p>Baseball naturally teaches lessons that extend far beyond the field. Accountability, resilience, leadership, discipline, and perseverance are developed through the daily process of improvement. Helping players carry those lessons with them into school, work, relationships, and life is one of the most important responsibilities we have as a program.</p>
          </Movement>

          <Movement label="Opportunity">
            <p>Much of what we do is centered around creating opportunities for players to grow, develop, and pursue their goals both on and off the field. Competitive baseball is only part of the journey. We believe athletes deserve access to the resources, guidance, information, and experiences that help them better understand the path ahead and prepare for whatever comes next.</p>
            <p>Our responsibility is not only to help players improve as athletes, but to help them build confidence, gain perspective, and put themselves in position to take advantage of opportunities when they arise.</p>
            <p>The goal is never simply to participate. The goal is to continue developing, continue learning, and be prepared when the next opportunity presents itself.</p>
          </Movement>

          <Movement label="The League">
            <p>The League was created from the same philosophy that drives Apex Academy: creating more opportunities for players to compete, develop, and enjoy the game. Rather than creating separation between town baseball and travel baseball, the goal is to help bridge the gap between them by providing a structured, competitive environment that welcomes players and organizations from across the region.</p>
            <p>The schedule is intentionally designed around the realities of modern baseball. Games are primarily played during the week, allowing players to continue participating with their travel teams, tournaments, and other commitments without being forced to choose one experience over another. This creates additional opportunities for meaningful at-bats, innings, and development throughout the season while minimizing conflicts for players and families.</p>
            <p>Beyond the competition itself, the League is designed to create a more engaging and rewarding baseball experience. Regular season and postseason achievements are recognized through league awards, with players, coaches, and teams celebrated annually at the Apex Academy Banquet. The League&apos;s top performers also earn selection to the All-New England Prospect Games — an invitational showcase that pairs professional-level combine testing with live competition in front of attending college coaches, giving players a direct avenue for exposure at the next level.</p>
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
        <div className="max-w-[760px] mt-12 md:mt-14">
          <p className="text-[16px] md:text-[18px] text-white/85 leading-[1.7] italic">
            &ldquo;Apex Academy is about more than baseball. It&apos;s about helping young athletes build a foundation for success in whatever path they choose next.&rdquo;
          </p>
          <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/60">&mdash; Coach Gary</div>
        </div>

        <div className="max-w-[760px] mt-10 border border-[#171717] bg-radial p-7">
          <h3 className="text-base uppercase font-bold mb-2">Join Apex</h3>
          <p className="text-[13px] text-white/65 mb-5">Ready to be part of something built for the players? Start here.</p>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <Button href="/join" size="small">Register</Button>
            <Button href={CONTACT.instagram} variant="secondary" size="small" external>{CONTACT.instagramHandle}</Button>
          </div>
        </div>
      </div>
    </>
  );
}
