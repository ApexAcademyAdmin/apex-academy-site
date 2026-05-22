"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getCurrentUser, signOut, ROLE_LABELS, type User } from "@/lib/auth-store";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  if (!user) {
    return (
      <Section size="lg">
        <div className="max-w-sm mx-auto text-center">
          <Image src="/logos/a-mark-sm.png" alt="" width={40} height={40} className="mx-auto mb-6 opacity-20" />
          <h2 className="text-2xl uppercase font-bold mb-3">Sign In <span className="accent-text">Required</span></h2>
          <p className="text-[13px] text-white/30 mb-8">Sign in to access your Apex Academy account.</p>
          <div className="flex items-center justify-center gap-3">
            <Button href="/signin" size="small">Sign In</Button>
            <Button href="/signup" variant="secondary" size="small">Create Account</Button>
          </div>
        </div>
      </Section>
    );
  }

  const quickLinks: { label: string; href: string; roles: string[] }[] = [
    { label: "Teams", href: "/teams", roles: ["admin", "coach", "player", "parent", "recruiter", "public"] },
    { label: "Apex Live", href: "/live", roles: ["admin", "coach", "player", "parent", "recruiter", "public"] },
    { label: "Events", href: "/events", roles: ["admin", "coach", "player", "parent", "recruiter", "public"] },
    { label: "Shop", href: "/shop", roles: ["admin", "coach", "player", "parent", "recruiter", "public"] },
    { label: "Register for Tryouts", href: "/join", roles: ["player", "parent", "public"] },
  ];

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(23,252,19,0.04)_0%,_transparent_55%)]" />

        <div className="relative max-w-[1120px] mx-auto px-6 pt-28 md:pt-36 pb-10">
          <div className="flex items-center gap-2 mb-6 text-[10px] font-medium uppercase tracking-[0.2em]">
            <a href="/" className="text-white/20 no-underline hover:text-white/40">Home</a>
            <span className="text-white/10">/</span>
            <span className="text-[#17FC13]/50">Account</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/40 mb-2">{ROLE_LABELS[user.role]}</div>
              <h1 className="text-2xl md:text-3xl uppercase font-bold">{user.name}</h1>
              <p className="text-xs text-white/25 mt-1">{user.email}</p>
            </div>
            <button
              onClick={() => { signOut(); window.location.href = "/"; }}
              className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider border border-[#171717] text-white/30 cursor-pointer bg-transparent hover:text-white/50 hover:border-white/10 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <Section size="md" border="top">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Info */}
          <div className="border border-[#171717] p-6">
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/15 mb-4">Account Details</div>
            <div className="space-y-3">
              {[
                { l: "Name", v: user.name },
                { l: "Email", v: user.email },
                { l: "Role", v: ROLE_LABELS[user.role] },
                ...(user.phone ? [{ l: "Phone", v: user.phone }] : []),
                ...(user.gradYear ? [{ l: "Grad Year", v: user.gradYear }] : []),
                ...(user.position ? [{ l: "Position", v: user.position }] : []),
                ...(user.playerName ? [{ l: "Player", v: user.playerName }] : []),
                ...(user.organization ? [{ l: "Organization", v: user.organization }] : []),
              ].map((r) => (
                <div key={r.l} className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/20">{r.l}</span>
                  <span className="text-xs text-white/55">{r.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="border border-[#171717] p-6">
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/15 mb-4">Quick Links</div>
            <div className="space-y-2">
              {quickLinks.filter((l) => l.roles.includes(user.role)).map((l) => (
                <a key={l.href} href={l.href} className="flex items-center justify-between py-2.5 no-underline group">
                  <span className="text-xs font-bold uppercase text-white/45 group-hover:text-[#17FC13] transition-colors">{l.label}</span>
                  <svg className="w-3.5 h-3.5 text-white/10 group-hover:text-[#17FC13]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 5l7 7-7 7" /></svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
