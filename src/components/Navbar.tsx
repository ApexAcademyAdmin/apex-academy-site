"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Teams", href: "#teams" },
  { label: "Facilities", href: "#facilities" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/90 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent"}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline">
            <Image src="/logos/apex-a-transparent.png" alt="Apex Academy" width={44} height={44} className="object-contain" />
            <div className="hidden sm:block">
              <div className="text-[16px] font-black text-white uppercase tracking-wider leading-none">Apex</div>
              <div className="text-[10px] font-bold text-[#6EFF00] uppercase tracking-[0.3em] leading-none mt-0.5">Academy</div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-[#6EFF00] transition-colors duration-300 no-underline">
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a href="#contact" className="hidden md:block px-6 py-2.5 bg-[#6EFF00] text-black text-[11px] font-bold uppercase tracking-wider rounded-lg no-underline hover:brightness-110 transition">
              Join Apex
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-transparent border-none cursor-pointer">
              <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
              <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu — Fullscreen */}
      <div className={`fixed inset-0 z-40 bg-black transition-all duration-500 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_LINKS.map((link, i) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              className="text-[28px] font-black uppercase tracking-wider text-white hover:text-[#6EFF00] transition-colors no-underline"
              style={{ transitionDelay: `${i * 50}ms` }}>
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)}
            className="mt-4 px-10 py-4 bg-[#6EFF00] text-black text-[14px] font-bold uppercase tracking-wider rounded-lg no-underline">
            Join Apex
          </a>
        </div>
      </div>
    </>
  );
}
