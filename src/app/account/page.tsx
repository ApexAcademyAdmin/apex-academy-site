"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import type { User } from "@supabase/supabase-js";

type Team = {
  id: string;
  team_name: string;
  org_name: string | null;
  status: string;
  division: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  home_field: string | null;
  logo_url: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
};

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (!authUser) {
        router.push("/signin");
        return;
      }

      setUser(authUser);

      // Fetch team for this user
      const { data: teamData } = await supabase
        .from("teams")
        .select("*")
        .eq("user_id", authUser.id)
        .single();

      if (teamData) setTeam(teamData as Team);
      setLoaded(true);
    }

    load();
  }, [router]);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-5 h-5 border-2 border-[#17FC13]/30 border-t-[#17FC13] rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

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
              <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/40 mb-2">Account</div>
              <h1 className="text-2xl md:text-3xl uppercase font-bold">{user.email}</h1>
            </div>
            <button
              onClick={handleSignOut}
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
          {/* Team Info */}
          <div className="border border-[#171717] p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/15">Team Details</div>
              {team && (
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                  team.status === "active"
                    ? "bg-[#17FC13]/[0.08] text-[#17FC13]/80 border border-[#17FC13]/20"
                    : "bg-yellow-500/[0.08] text-yellow-400/80 border border-yellow-500/20"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${team.status === "active" ? "bg-[#17FC13]" : "bg-yellow-400"}`} />
                  {team.status === "active" ? "Active" : "Pending Review"}
                </span>
              )}
            </div>

            {team ? (
              <div className="space-y-3">
                {[
                  { l: "Team Name", v: team.team_name },
                  ...(team.org_name ? [{ l: "Organization", v: team.org_name }] : []),
                  ...(team.division ? [{ l: "Division", v: team.division }] : []),
                  ...(team.home_field ? [{ l: "Home Field", v: team.home_field }] : []),
                  ...(team.contact_name ? [{ l: "Contact", v: team.contact_name }] : []),
                  ...(team.contact_email ? [{ l: "Contact Email", v: team.contact_email }] : []),
                  ...(team.contact_phone ? [{ l: "Contact Phone", v: team.contact_phone }] : []),
                ].map((r) => (
                  <div key={r.l} className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/20">{r.l}</span>
                    <span className="text-xs text-white/55">{r.v}</span>
                  </div>
                ))}

                <div className="pt-3 mt-3 border-t border-[#171717]">
                  <Button href="/account/team" size="small" variant="secondary">Edit Team</Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-xs text-white/25 mb-4">No team registered yet.</p>
                <Button href="/league/register" size="small">Register a Team</Button>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="border border-[#171717] p-6">
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/15 mb-4">Quick Links</div>
            <div className="space-y-2">
              {[
                { label: "Teams", href: "/teams" },
                { label: "Apex Live", href: "/live" },
                { label: "Events", href: "/events" },
                { label: "Shop", href: "/shop" },
                { label: "League Schedule", href: "/league/schedule" },
                { label: "Standings", href: "/league/standings" },
              ].map((l) => (
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
