"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/Button";
import { CONTACT } from "@/lib/constants";

const PARTNERS = [
  { slug: "red-sox-foundation", name: "Red Sox Foundation", role: "Community Partner", logo: "/partners/red-sox-foundation.png", description: "The Red Sox Foundation is dedicated to improving the lives of children and families across New England. As a community partner of Apex Academy, the Foundation supports youth baseball development and access to premier training opportunities in the Boston area.", link: "https://www.redsoxfoundation.org", logoText: "Red Sox Foundation" },
  { slug: "new-balance", name: "New Balance", role: "Footwear Partner", logo: "/partners/new-balance.png", description: "New Balance brings world-class footwear innovation to every Apex Academy athlete. From turf shoes to training footwear, New Balance equips our players with the performance technology they need to compete at the highest level.\n\nBoston-born. Athlete-driven.", link: "https://www.newbalance.com", logoText: "New Balance" },
  { slug: "rawlings", name: "Rawlings", role: "Glove Partner", logo: "/partners/rawlings.png", description: "The gold standard in baseball gloves. Rawlings has been the choice of professional athletes for over a century. As the official glove partner of Apex Academy, our athletes train and compete with the same quality trusted by MLB players worldwide.\n\nHeart of the Hide. Pro Preferred. Game ready.", link: "https://www.rawlings.com", logoText: "Rawlings" },
  { slug: "franklin", name: "Franklin", role: "Batting Glove Partner", logo: "/partners/franklin.png", description: "Franklin Sports is the official batting glove partner of Apex Academy. From the CFX Pro to custom team gloves, Franklin delivers the grip, comfort, and durability our hitters demand at the plate.", link: "https://www.franklinsports.com", logoText: "Franklin" },
  { slug: "marucci", name: "Marucci", role: "Bat Partner", logo: "/partners/marucci.png", description: "Marucci is the number one bat in professional baseball. As the official bat partner of Apex Academy, Marucci equips our athletes with the same wood and aluminum technology trusted by MLB players worldwide.\n\nHonor the game.", link: "https://www.maruccisports.com", logoText: "Marucci" },
  { slug: "lizard-skins", name: "Lizard Skins", role: "Grip Partner", logo: "/partners/lizard-skins.png", description: "Lizard Skins provides premium bat grip technology to Apex Academy athletes. Superior comfort, durability, and feel — giving our hitters the confidence to swing with authority in every at-bat.", link: "https://www.lizardskins.com", logoText: "Lizard Skins" },
  { slug: "oakley", name: "Oakley", role: "Eyewear Partner", logo: "/partners/oakley.png", description: "Oakley is the official eyewear partner of Apex Academy. From sunglasses to performance eyewear, Oakley's lens technology gives our athletes a competitive edge with clarity and protection on the field.", link: "https://www.oakley.com", logoText: "Oakley" },
  { slug: "g-form", name: "G-Form", role: "Protective Gear Partner", logo: "/partners/g-form.png", description: "G-Form provides advanced protective gear to Apex Academy athletes. Their SmartFlex technology delivers lightweight, flexible protection that hardens on impact — keeping our players safe without limiting performance.", link: "https://www.g-form.com", logoText: "G-Form" },
];

export default function PartnersPage() {
  const [current, setCurrent] = useState(PARTNERS[0].slug);
  const [visible, setVisible] = useState(true);
  const active = PARTNERS.find((p) => p.slug === current) ?? PARTNERS[0];

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const match = PARTNERS.find((p) => p.slug === hash);
    if (match) setCurrent(match.slug);
  }, []);

  function select(slug: string) {
    if (slug === current) return;
    setVisible(false);
    setTimeout(() => {
      setCurrent(slug);
      window.history.replaceState(null, "", `/partners#${slug}`);
      setTimeout(() => setVisible(true), 20);
    }, 200);
  }

  return (
    <>
      {/* ══════ HEADER ══════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="relative max-w-[1120px] mx-auto px-6 pt-28 md:pt-36 pb-6">
          <div className="flex items-center gap-2 mb-5 text-[10px] font-medium uppercase tracking-[0.2em]">
            <a href="/" className="text-white/20 no-underline hover:text-white/40">Home</a>
            <span className="text-white/10">/</span>
            <span className="text-[#17FC13]/50">Partners</span>
          </div>
          <h1 className="text-3xl md:text-4xl uppercase font-bold leading-[0.9] mb-2">
            Our <span className="accent-text">Partners</span>
          </h1>
          <p className="text-[14px] text-white/30 leading-[1.7] max-w-lg">The brands and organizations that power Apex Academy.</p>
        </div>
      </section>

      {/* ══════ PARTNER GRID ══════ */}
      <div className="border-y border-[#171717] bg-radial">
        <div className="max-w-[1120px] mx-auto px-6 py-4">
          <div className="grid grid-cols-4 lg:grid-cols-8 gap-1.5">
            {PARTNERS.map((p) => (
              <button
                key={p.slug}
                onClick={() => select(p.slug)}
                className={`flex items-center justify-center h-14 sm:h-16 border cursor-pointer select-none transition-all duration-300 bg-radial px-2 ${
                  current === p.slug ? "border-[#17FC13]/50 opacity-100" : "border-[#171717] opacity-50 hover:opacity-75"
                }`}
              >
                {p.logo ? (
                  <img src={p.logo} alt={p.name} className="w-[75%] h-[75%] object-contain" />
                ) : (
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wide text-white/80 text-center leading-tight">{p.logoText}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══════ DETAIL ══════ */}
      <div className="max-w-[1120px] mx-auto px-6 py-6">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}>
          {/* Logo lockup */}
          <div className="relative w-full pt-[55%] bg-radial border border-[#171717] overflow-hidden">
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center gap-6 md:gap-10">
              <div className="w-[30%] flex items-center justify-center">
                <Image src="/logos/decal-lg.png" alt="Apex Academy" width={480} height={320} className="w-full h-auto object-contain opacity-70" />
              </div>
              <span className="text-white/10 text-lg">&times;</span>
              <div className="w-[30%] flex items-center justify-center">
                {active.logo ? (
                  <img src={active.logo} alt={active.name} className="w-full h-auto object-contain" />
                ) : (
                  <span className="text-white/80 text-lg sm:text-xl font-bold uppercase tracking-wide text-center" style={{ fontFamily: "var(--font-display), sans-serif" }}>{active.logoText}</span>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center gap-4 p-5 sm:p-6 lg:p-8 border border-[#171717] bg-radial">
            <div className="flex items-center justify-between pb-4 border-b border-[#404040]/30">
              <h2 className="text-base font-bold uppercase">{active.name}</h2>
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/40">{active.role}</span>
            </div>
            <div className="text-[13px] text-white/45 leading-[1.75] whitespace-pre-line">{active.description}</div>
            {active.link && (
              <Button href={active.link} variant="secondary" size="small" external>Visit {active.name}</Button>
            )}
          </div>
        </div>
      </div>

      {/* ══════ CTA ══════ */}
      <div className="max-w-[1120px] mx-auto px-6 pb-8">
        <div className="border border-[#171717] bg-radial p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm uppercase font-bold mb-1">Become A Partner</h3>
            <p className="text-[11px] text-white/25">Interested in partnering with Apex Academy?</p>
          </div>
          <Button href={`mailto:${CONTACT.email}?subject=Partnership Inquiry`} size="small">Partner Inquiries</Button>
        </div>
      </div>
    </>
  );
}
