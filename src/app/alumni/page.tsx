import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";
import { CONTACT } from "@/lib/constants";

type Alum = { slug: string; name: string; schools: string[] };

const PRO = { slug: "oliveira-christian", name: "Christian Oliveira", org: "Los Angeles Dodgers" };

const COMMITMENTS: Alum[] = [
  { slug: "alexandrov-stefan", name: "Stefan Alexandrov", schools: ["Wheaton College"] },
  { slug: "born-ian", name: "Ian Born", schools: ["Swarthmore College"] },
  { slug: "clark-kevin", name: "Kevin Clark", schools: ["UMass Boston"] },
  { slug: "cummings-kyle", name: "Kyle Cummings", schools: ["UMass Boston"] },
  { slug: "figueroa-christian", name: "Christian Figueroa", schools: ["Wentworth Institute of Technology"] },
  { slug: "flaherty-cameron", name: "Cameron Flaherty", schools: ["Gordon College", "Saint Michael's College"] },
  { slug: "henke-oliver", name: "Oliver Henke", schools: ["Swarthmore College"] },
  { slug: "lewis-matthew", name: "Matthew Lewis", schools: ["UMass Dartmouth", "Bunker Hill Community College"] },
  { slug: "mariani-matthew", name: "Matthew Mariani", schools: ["Dickinson College"] },
  { slug: "mcmahon-brandon", name: "Brandon McMahon", schools: ["Salem State University"] },
  { slug: "osullivan-aidan", name: "Aidan O'Sullivan", schools: ["Haverford College"] },
  { slug: "sack-brendan", name: "Brendan Sack", schools: ["Bunker Hill Community College"] },
  { slug: "salerno-max", name: "Max Salerno", schools: ["Ithaca College"] },
  { slug: "seeley-conner", name: "Conner Seeley", schools: ["UMass Boston", "Salisbury University"] },
  { slug: "sullivan-seth", name: "Seth Sullivan", schools: ["Salem State University"] },
];

// Asset maps — only contain entries whose files actually exist in /public/alumni.
// PHOTO: player slug -> headshot path. LOGO: exact school name -> logo path.
const PHOTO: Record<string, string> = {
  "born-ian": "/alumni/players/born-ian.jpg",
  "clark-kevin": "/alumni/players/clark-kevin.jpg",
  "cummings-kyle": "/alumni/players/cummings-kyle.jpg",
  "figueroa-christian": "/alumni/players/figueroa-christian.jpg",
  "flaherty-cameron": "/alumni/players/flaherty-cameron.jpg",
  "lewis-matthew": "/alumni/players/lewis-matthew.jpg",
  "mcmahon-brandon": "/alumni/players/mcmahon-brandon.jpg",
  "osullivan-aidan": "/alumni/players/osullivan-aidan.jpg",
  "sack-brendan": "/alumni/players/sack-brendan.jpg",
  "salerno-max": "/alumni/players/salerno-max.jpg",
  "seeley-conner": "/alumni/players/seeley-conner.jpg",
  "sullivan-seth": "/alumni/players/sullivan-seth.jpg",
};
const LOGO: Record<string, string> = {
  "Wheaton College": "/alumni/logos/wheaton.png",
  "Swarthmore College": "/alumni/logos/swarthmore.png",
  "UMass Boston": "/alumni/logos/umass-boston.png",
  "Wentworth Institute of Technology": "/alumni/logos/wentworth.png",
  "Gordon College": "/alumni/logos/gordon.png",
  "Saint Michael's College": "/alumni/logos/saint-michaels.png",
  "Haverford College": "/alumni/logos/haverford.png",
  "UMass Dartmouth": "/alumni/logos/umass-dartmouth.png",
  "Bunker Hill Community College": "/alumni/logos/bunker-hill.jpg",
  "Dickinson College": "/alumni/logos/dickinson.png",
  "Salem State University": "/alumni/logos/salem-state.png",
  "Ithaca College": "/alumni/logos/ithaca.png",
  "Salisbury University": "/alumni/logos/salisbury.png",
  "Los Angeles Dodgers": "/alumni/logos/dodgers.png",
};

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

function Avatar({ slug, name, size = "md" }: { slug: string; name: string; size?: "md" | "lg" }) {
  const dim = size === "lg" ? "w-16 h-16" : "w-14 h-14";
  const photo = PHOTO[slug];
  if (photo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={photo} alt={name} className={`${dim} rounded-full object-cover border border-[#171717] shrink-0`} />;
  }
  return (
    <div className={`${dim} rounded-full bg-[#17FC13]/[0.06] border border-[#17FC13]/15 flex items-center justify-center shrink-0`}>
      <span className={`font-bold text-[#17FC13]/70 ${size === "lg" ? "text-sm" : "text-xs"}`}>{initials(name)}</span>
    </div>
  );
}

function LogoTile({ src, label }: { src: string; label: string }) {
  return (
    <span className="inline-flex items-center justify-center bg-white rounded-[3px] h-5 px-1 shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={`${label} logo`} className="h-3.5 w-auto max-w-[40px] object-contain" />
    </span>
  );
}

function SchoolLine({ schools }: { schools: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mt-2">
      {schools.map((s, i) => (
        <span key={s} className="inline-flex items-center gap-1.5">
          {LOGO[s] && <LogoTile src={LOGO[s]} label={s} />}
          <span className="text-[#17FC13] text-xs font-bold uppercase tracking-wide">{s}</span>
          {i < schools.length - 1 && <span className="text-white/25 text-[10px]">/</span>}
        </span>
      ))}
    </div>
  );
}

export default function AlumniPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="relative max-w-[1120px] mx-auto px-6 pt-24 md:pt-28 pb-6">
          <div className="flex items-center gap-2 mb-5 text-[10px] font-medium uppercase tracking-[0.2em]">
            <a href="/" className="text-white/60 no-underline hover:text-white/80">Home</a>
            <span className="text-white/10">/</span>
            <span className="text-[#17FC13]/50">Alumni</span>
          </div>
          <h1 className="text-3xl md:text-4xl uppercase font-bold leading-[0.9] mb-2">
            Apex <span className="accent-text">Alumni</span>
          </h1>
          <p className="text-[14px] text-white/70 leading-[1.7] max-w-lg">Our athletes compete at the next level. Every commitment is a product of development, discipline, and the Apex standard.</p>
        </div>
      </section>

      {/* Professional */}
      <div className="max-w-[1120px] mx-auto px-6 pt-8">
        <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/55 mb-4">Professional</div>
        <FadeIn>
          <div className="border border-[#17FC13]/25 bg-[#17FC13]/[0.03] p-5 flex items-center gap-4">
            <Avatar slug={PRO.slug} name={PRO.name} size="lg" />
            <div className="min-w-0 flex-1">
              <h3 className="text-base md:text-lg uppercase font-bold">{PRO.name}</h3>
              <div className="flex items-center gap-1.5 mt-1.5">
                {LOGO[PRO.org] && <LogoTile src={LOGO[PRO.org]} label={PRO.org} />}
                <span className="text-[#17FC13] text-xs font-bold uppercase tracking-wide">{PRO.org}</span>
              </div>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 border border-[#17FC13]/30 text-[#17FC13]/80">Pro</span>
          </div>
        </FadeIn>
      </div>

      {/* Commitments */}
      <div className="max-w-[1120px] mx-auto px-6 py-6">
        <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/55 mb-4">College Commitments</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {COMMITMENTS.map((c, i) => (
            <FadeIn key={c.slug} delay={i * 0.03}>
              <div className="border border-[#171717] bg-radial p-4 flex items-center gap-4 hover:border-[#17FC13]/15 transition-colors h-full">
                <Avatar slug={c.slug} name={c.name} />
                <div className="min-w-0">
                  <h3 className="text-sm uppercase font-bold leading-tight">{c.name}</h3>
                  <SchoolLine schools={c.schools} />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-[1120px] mx-auto px-6 pb-8">
        <div className="border border-[#171717] bg-radial p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm uppercase font-bold mb-1">Be Next</h3>
            <p className="text-[11px] text-white/65">Your path to the next level starts here.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button href="/join" size="small">Register</Button>
            <Button href={CONTACT.instagram} variant="secondary" size="small" external>{CONTACT.instagramHandle}</Button>
          </div>
        </div>
      </div>
    </>
  );
}
