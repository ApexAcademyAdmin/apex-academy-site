"use client";

import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative py-12 bg-black border-t border-white/[0.04]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo + Brand */}
          <div className="flex items-center gap-3">
            <Image src="/logos/apex-a-transparent.png" alt="Apex Academy" width={36} height={36} className="object-contain" />
            <div>
              <div className="text-[14px] font-black text-white uppercase tracking-wider leading-none">Apex Academy</div>
              <div className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em] mt-0.5">Baseball Development</div>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {["About", "Programs", "Teams", "Contact"].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 hover:text-[#6EFF00] transition-colors no-underline">
                {link}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-[10px] text-white/20">
            © {new Date().getFullYear()} Apex Academy. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
}
