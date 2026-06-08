"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
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

    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user: authUser } }) => setUser(authUser));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));

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
    timeoutRef.current = setTimeout(() => setDropdown(null), 120);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname?.startsWith(`${href}/`);

  // The dashboard (account/admin) provides its own shell — hide marketing chrome.
  if (pathname?.startsWith("/account") || pathname?.startsWith("/admin")) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex h-20 w-full items-center border-b transition-colors duration-300 ${
          scrolled ? "bg-black/90 md:bg-black/70 md:backdrop-blur-md border-white/[0.06]" : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-[1180px] mx-auto px-6 w-full flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="no-underline shrink-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#17FC13]/60">
            <Image src="/logos/decal-nav.png" alt="Apex Academy" width={316} height={156} className="h-16 w-auto object-contain" priority />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-1 font-display text-[13px] font-semibold uppercase tracking-[0.04em] list-none">
              {NAV_LINKS.map((n) => {
                const active = isActive(n.href);
                const showMenu = dropdown === n.title;
                return (
                  <li
                    key={n.title}
                    className="group relative"
                    onMouseEnter={() => n.children && openDropdown(n.title)}
                    onMouseLeave={() => n.children && closeDropdown()}
                  >
                    <a
                      href={n.href}
                      aria-haspopup={n.children ? "true" : undefined}
                      aria-expanded={n.children ? showMenu : undefined}
                      className={`relative flex items-center gap-1.5 px-3 py-2 no-underline transition-colors duration-200 ease-out rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#17FC13]/50 ${
                        active ? "text-white" : "text-white/55 hover:text-white"
                      }`}
                    >
                      {n.title}
                      {n.live && <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-[#17FC13] animate-pulse" />}
                      {n.children && (
                        <svg
                          className={`w-3 h-3 opacity-50 transition-transform duration-200 ease-out ${showMenu ? "rotate-180" : ""}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                        >
                          <path d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                      {/* Animated underline — grows from center */}
                      <span
                        className={`pointer-events-none absolute left-3 right-3 -bottom-0.5 h-[2px] origin-center rounded-full bg-[#17FC13] transition-transform duration-200 ease-out ${
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </a>

                    {/* Dropdown */}
                    {n.children && (
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ease-out ${
                          showMenu
                            ? "visible opacity-100 translate-y-0 scale-100"
                            : "invisible opacity-0 -translate-y-1 scale-[0.98]"
                        } group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100`}
                      >
                        <div className="min-w-[200px] rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/95 backdrop-blur-md p-1.5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)]">
                          {n.children.map((child) => (
                            <a
                              key={child.title}
                              href={child.href}
                              className={`block rounded-xl px-4 py-2.5 text-[12px] font-semibold uppercase tracking-wide no-underline transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#17FC13]/50 ${
                                isActive(child.href) ? "text-[#17FC13] bg-[#17FC13]/[0.06]" : "text-white/55 hover:text-white hover:bg-white/[0.04]"
                              }`}
                            >
                              {child.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}

              {/* Secondary action */}
              <li className="ml-2">
                <a
                  href={user ? "/account" : "/signin"}
                  className="px-3 py-2 text-white/55 hover:text-white transition-colors duration-200 ease-out no-underline rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#17FC13]/50"
                >
                  {user ? "Account" : "Sign In"}
                </a>
              </li>

              {/* Primary CTA */}
              <li>
                <a
                  href="/join"
                  className="inline-flex items-center rounded-full border border-[#17FC13]/40 bg-[#17FC13]/10 px-5 py-2 text-[#17FC13] no-underline transition-all duration-200 ease-out hover:bg-[#17FC13]/15 hover:border-[#17FC13]/60 hover:shadow-[0_0_22px_rgba(23,252,19,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#17FC13]/60"
                >
                  Join Apex
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-white bg-transparent border-none cursor-pointer"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className={`absolute h-[2px] w-6 bg-white rounded transition-all duration-300 ease-out ${open ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-[2px] w-6 bg-white rounded transition-all duration-200 ease-out ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute h-[2px] w-6 bg-white rounded transition-all duration-300 ease-out ${open ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* Mobile slide-out panel */}
      <aside
        className={`md:hidden fixed top-0 right-0 z-40 h-full w-[82%] max-w-sm bg-[#0a0a0a] border-l border-white/[0.06] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-20" />
        <nav className="flex flex-col px-6 py-4 overflow-y-auto h-[calc(100%-5rem)] font-display">
          {NAV_LINKS.map((n, i) => (
            <div
              key={n.title}
              className={`py-3 border-b border-white/[0.05] transition-all duration-300 ease-out ${open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
              style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
            >
              <a
                href={n.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 text-xl font-bold uppercase tracking-wide no-underline transition-colors ${isActive(n.href) ? "text-[#17FC13]" : "text-white hover:text-[#17FC13]"}`}
              >
                {n.title}
                {n.live && <span aria-hidden className="w-2 h-2 rounded-full bg-[#17FC13] animate-pulse" />}
              </a>
              {n.children && (
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {n.children.map((child) => (
                    <a
                      key={child.title}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className={`px-3 py-1.5 rounded-lg border text-[11px] font-semibold uppercase tracking-wide no-underline transition-colors ${
                        isActive(child.href) ? "border-[#17FC13]/40 text-[#17FC13] bg-[#17FC13]/[0.06]" : "border-white/[0.08] text-white/55 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {child.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div
            className={`mt-6 flex flex-col gap-3 transition-all duration-300 ease-out ${open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
            style={{ transitionDelay: open ? `${80 + NAV_LINKS.length * 45}ms` : "0ms" }}
          >
            <a
              href={user ? "/account" : "/signin"}
              onClick={() => setOpen(false)}
              className="text-sm font-bold uppercase tracking-wide text-white/60 hover:text-white no-underline transition-colors"
            >
              {user ? "Account" : "Sign In"}
            </a>
            <a
              href="/join"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-full border border-[#17FC13]/50 bg-[#17FC13]/10 px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#17FC13] no-underline transition-all hover:bg-[#17FC13]/15 hover:shadow-[0_0_24px_rgba(23,252,19,0.18)]"
            >
              Join Apex
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
}
