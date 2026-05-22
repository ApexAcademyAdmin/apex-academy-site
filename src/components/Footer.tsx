import Image from "next/image";
import { NAV_LINKS, CONTACT } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-radial border-t border-[#171717]">
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-10">
          <a href="/" className="no-underline">
            <Image src="/logos/decal-lg.png" alt="Apex Academy" width={480} height={320} className="h-12 w-auto object-contain" />
          </a>

          <div className="flex items-center gap-6">
            {NAV_LINKS.map((n) => (
              <a key={n.title} href={n.href} className="text-[10px] font-bold uppercase tracking-wider text-white/25 hover:text-white transition-colors no-underline">
                {n.title}
              </a>
            ))}
          </div>

          <span className="text-[10px] text-white/20 uppercase">
            &copy; {new Date().getFullYear()} Apex Academy &middot; {CONTACT.location}
          </span>
        </div>
      </div>
    </footer>
  );
}
