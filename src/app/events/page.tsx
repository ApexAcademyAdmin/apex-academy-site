import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";
import { CONTACT } from "@/lib/constants";

const UPCOMING = [
  { date: "Jun 14-15, 2026", name: "Apex Summer Showcase", type: "Showcase", location: "Adams Field, Boston, MA", desc: "Two-day showcase event featuring Apex Premier and Prospects against top New England competition." },
  { date: "Jun 21-22, 2026", name: "USSSA NE Regional", type: "Tournament", location: "Devens Common, MA", desc: "Regional qualifier for the USSSA National Championship. All age groups competing." },
  { date: "Jul 4-6, 2026", name: "Boston Baseball Classic", type: "Tournament", location: "Various Locations, Boston, MA", desc: "Annual Independence Day tournament featuring top travel programs from across the Northeast." },
  { date: "Jul 18-20, 2026", name: "PG Northeast Regional", type: "Showcase", location: "Diamond Nation, Flemington, NJ", desc: "Perfect Game regional showcase. Premier and Prospects competing for national rankings." },
  { date: "Aug 1-3, 2026", name: "Apex Invitational", type: "Tournament", location: "Adams Field, Boston, MA", desc: "Apex Academy's flagship event. 16 teams across multiple age groups competing in Boston." },
];

const TRYOUTS = [
  { date: "Sep 6, 2026", age: "10U - 12U", time: "9:00 AM" },
  { date: "Sep 7, 2026", age: "14U", time: "9:00 AM" },
  { date: "Sep 13, 2026", age: "Prospects", time: "10:00 AM" },
  { date: "Sep 14, 2026", age: "Premier", time: "10:00 AM" },
];

export default function EventsPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="relative max-w-[1120px] mx-auto px-6 pt-28 md:pt-36 pb-6">
          <div className="flex items-center gap-2 mb-5 text-[10px] font-medium uppercase tracking-[0.2em]">
            <a href="/" className="text-white/20 no-underline hover:text-white/40">Home</a>
            <span className="text-white/10">/</span>
            <span className="text-[#17FC13]/50">Events</span>
          </div>
          <h1 className="text-3xl md:text-4xl uppercase font-bold leading-[0.9] mb-2">
            Apex <span className="accent-text">Events</span>
          </h1>
          <p className="text-[14px] text-white/30 leading-[1.7] max-w-lg">Tournaments, showcases, tryouts, and team events.</p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-[1120px] mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left — Events */}
          <div className="lg:col-span-8">
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/15 mb-4">Upcoming Events</div>
            <div className="space-y-3">
              {UPCOMING.map((e, i) => (
                <FadeIn key={i} delay={i * 0.03}>
                  <div className="border border-[#171717] bg-radial p-4 hover:border-[#17FC13]/15 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-xs font-bold text-[#17FC13]/70">{e.date}</div>
                        <h3 className="text-sm uppercase font-bold mt-1">{e.name}</h3>
                      </div>
                      <span className="text-[8px] font-bold uppercase tracking-wider text-white/15">{e.type}</span>
                    </div>
                    <p className="text-[12px] text-white/35 leading-[1.6] mb-1">{e.desc}</p>
                    <p className="text-[10px] text-white/15">{e.location}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right — Tryouts + CTA */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border border-[#171717] bg-radial">
              <div className="px-4 py-3 border-b border-[#171717]">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/30">Fall 2026 Tryouts</span>
              </div>
              {TRYOUTS.map((t, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3 border-b border-[#171717] last:border-b-0">
                  <div>
                    <div className="text-xs font-bold uppercase">{t.age}</div>
                    <div className="text-[10px] text-white/20 mt-0.5">{t.date}</div>
                  </div>
                  <span className="text-[10px] text-white/15">{t.time}</span>
                </div>
              ))}
            </div>

            <div className="border border-[#171717] p-5 text-center">
              <h3 className="text-sm uppercase font-bold mb-2">Register</h3>
              <p className="text-[11px] text-white/25 mb-4">Sign up for tryouts and events.</p>
              <div className="flex flex-col gap-2">
                <Button href="/join" size="small">Register</Button>
                <Button href={CONTACT.instagram} variant="secondary" size="small" external>{CONTACT.instagramHandle}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
