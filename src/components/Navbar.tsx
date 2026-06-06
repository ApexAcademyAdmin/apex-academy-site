"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import { Button } from "./Button";
import type { User } from "@supabase/supabase-js";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });

    // Check Supabase auth state
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user: authUser } }) => {
      setUser(authUser);
    });

    // Listen for auth state changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener("scroll", fn);
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function openDropdown(title: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdown(title);
  }

  function closeDropdown() {
    timeoutRef.current = setTimeout(() => setDropdown(null), 150);
  }

  // The dashboard (account/admin) provides its own shell — hide marketing chrome.
  if (pathname?.startsWith("/account") || pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex h-20 w-full items-center border-b transition-all duration-300 ${
          scrolled ? "bg-black/95 md:bg-black/75 md:backdrop-blur-sm border-[#171717]" : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-[1120px] mx-auto px-6 w-full flex items-center justify-between">
          <a href="/" className="no-underline">
            <Image src="/logos/decal-lg.png" alt="Apex Academy" width={480} height={320} className="h-14 w-auto object-contain" />
          </a>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-6 text-xs font-bold uppercase list-none">
              {NAV_LINKS.map((n) => (
                <li
                  key={n.title}
                  className="relative"
                  onMouseEnter={() => n.children && openDropdown(n.title)}
                  onMouseLeave={() => n.children && closeDropdown()}
                >
                  <a
                    href={n.href}
                    className="flex items-center gap-1 text-white/50 hover:text-white transition-colors no-underline py-2"
                  >
                    {n.title}
                    {n.children && (
                      <svg className="w-3 h-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </a>

                  {/* Dropdown */}
                  {n.children && dropdown === n.title && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                      <div className="border border-[#171717] bg-black/95 backdrop-blur-sm min-w-[140px] py-2">
                        {n.children.map((child) => (
                          <a
                            key={child.title}
                            href={child.href}
                            className="block px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white/50 hover:text-[#17FC13] hover:bg-white/[0.03] transition-all no-underline"
                          >
                            {child.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
              <li>
                <Button href="/join" size="small">Join Apex</Button>
              </li>
              <li>
                {user ? (
                  <a href="/account" className="text-white/50 hover:text-[#17FC13] transition-colors no-underline">Account</a>
                ) : (
                  <a href="/signin" className="text-white/40 hover:text-white transition-colors no-underline">Sign In</a>
                )}
              </li>
            </ul>
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white bg-transparent border-none cursor-pointer p-2 text-xl leading-none"
            aria-label="Menu"
          >
            {open ? "\u2715" : "\u2630"}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 top-20 bg-black z-40 flex flex-col items-center justify-center gap-6 md:hidden overflow-y-auto py-8">
          {NAV_LINKS.map((n) => (
            <div key={n.title} className="flex flex-col items-center gap-3">
              <a href={n.href} onClick={() => setOpen(false)} className="text-2xl font-bold uppercase text-white no-underline hover:text-[#17FC13] transition-colors">
                {n.title}
              </a>
              {n.children && (
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {n.children.map((child) => (
                    <a
                      key={child.title}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="px-4 py-1.5 border border-[#171717] text-xs font-bold uppercase text-white/50 hover:text-[#17FC13] hover:border-[#17FC13]/30 transition-all no-underline"
                    >
                      {child.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          {user ? (
            <a href="/account" onClick={() => setOpen(false)} className="text-lg font-bold uppercase text-[#17FC13] no-underline">Account</a>
          ) : (
            <a href="/signin" onClick={() => setOpen(false)} className="text-lg font-bold uppercase text-white/50 no-underline">Sign In</a>
          )}
          <Button href="/join">Join Apex</Button>
        </div>
      )}
    </>
  );
}
