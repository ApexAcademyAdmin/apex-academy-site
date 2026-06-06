"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Section } from "@/components/Section";

type Team = {
  id: string;
  status: string;
  team_name: string;
  org_name: string;
  age_group: string | null;
  division: string | null;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  city: string | null;
  state: string | null;
  roster: unknown[];
  coaches: unknown[];
  created_at: string;
};

const AGE_GROUPS = ["10U", "12U", "14U", "16U", "18U"];
const DIVISIONS = ["Premier", "Prospect"];

export default function AdminTeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "active" | "rejected">("all");
  const [saving, setSaving] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/signin"; return; }

      // Check admin status
      const { data: admin } = await supabase.from("admin_profiles").select("role").eq("user_id", user.id).single();
      if (!admin) { window.location.href = "/account"; return; }
      setIsAdmin(true);

      // Fetch ALL teams (admin bypasses RLS via service role, but we use client here)
      // For client-side admin access, we need a server endpoint
      const res = await fetch("/api/admin/teams");
      if (res.ok) {
        const data = await res.json();
        setTeams(data.teams || []);
      }
      setLoading(false);
    }
    load();
  }, []);

  async function updateTeam(teamId: string, updates: Partial<Team>) {
    setSaving(teamId);
    const res = await fetch("/api/admin/teams", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teamId, updates }),
    });
    if (res.ok) {
      setTeams(prev => prev.map(t => t.id === teamId ? { ...t, ...updates } : t));
    }
    setSaving(null);
  }

  const filtered = filter === "all" ? teams : teams.filter(t => t.status === filter);
  const counts = {
    all: teams.length,
    pending: teams.filter(t => t.status === "pending").length,
    active: teams.filter(t => t.status === "active").length,
    rejected: teams.filter(t => t.status === "rejected").length,
  };

  if (loading) {
    return (
      <main>
        <div className="pt-32 text-center text-white/30 text-sm">Loading...</div>
      </main>
    );
  }

  if (!isAdmin) return null;

  return (
    <main>
      <div className="pt-24 md:pt-32 pb-6">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="flex items-center gap-2 mb-6 text-[10px] font-medium uppercase tracking-[0.2em]">
            <a href="/" className="text-white/25 no-underline hover:text-white/50 transition-colors">Home</a>
            <span className="text-white/10">/</span>
            <span className="text-[#17FC13]/60">Admin — Team Management</span>
          </div>

          <h1 className="text-3xl md:text-4xl uppercase font-bold leading-[0.9] mb-2">
            Team <span className="accent-text">Management</span>
          </h1>
          <p className="text-sm text-white/40">Review registrations, activate teams, assign divisions.</p>
        </div>
      </div>

      <Section border="top">
        {/* Filter tabs */}
        <div className="flex gap-1.5 mb-6">
          {(["all", "pending", "active", "rejected"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${filter === f ? "bg-[#17FC13]/10 text-[#17FC13] border border-[#17FC13]/25" : "text-white/40 border border-white/[0.04] hover:border-white/[0.08]"}`}>
              {f} ({counts[f]})
            </button>
          ))}
        </div>

        {/* Teams list */}
        <div className="space-y-4">
          {filtered.length === 0 && (
            <div className="text-center py-12 text-sm text-white/30">No teams found.</div>
          )}

          {filtered.map(team => (
            <div key={team.id} className="bg-[#0d1117] rounded-2xl border border-white/[0.04] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.03]">
                <div className="flex items-center gap-3">
                  <span className="text-base font-bold text-white/90">{team.team_name}</span>
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    team.status === "active" ? "bg-[#17FC13]/10 text-[#17FC13]/60" :
                    team.status === "pending" ? "bg-yellow-500/10 text-yellow-500/60" :
                    "bg-red-500/10 text-red-400/60"
                  }`}>{team.status}</span>
                </div>
                <span className="text-[10px] font-mono text-white/20">{new Date(team.created_at).toLocaleDateString()}</span>
              </div>

              {/* Details */}
              <div className="px-5 py-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-white/25 mb-1">Organization</div>
                    <div className="text-[13px] text-white/70">{team.org_name}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-white/25 mb-1">Contact</div>
                    <div className="text-[13px] text-white/70">{team.contact_name}</div>
                    <div className="text-[11px] text-white/30">{team.contact_email}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-white/25 mb-1">Location</div>
                    <div className="text-[13px] text-white/70">{team.city}{team.state ? `, ${team.state}` : ""}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-white/25 mb-1">Roster</div>
                    <div className="text-[13px] text-white/70">{Array.isArray(team.roster) ? team.roster.length : 0} players</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-white/25 mb-1">Coaching Staff</div>
                    <div className="text-[13px] text-white/70">{Array.isArray(team.coaches) ? team.coaches.length : 0} coaches</div>
                  </div>
                </div>

                {/* Admin controls */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.03]">
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-white/25 mb-1">Age Group</div>
                    <select value={team.age_group || ""} onChange={e => updateTeam(team.id, { age_group: e.target.value || null })}
                      className="bg-[#0d1117] border border-white/[0.06] rounded-lg px-3 py-1.5 text-[12px] text-white/80 focus:outline-none focus:border-[#17FC13]/30">
                      <option value="">Unassigned</option>
                      {AGE_GROUPS.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>

                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-white/25 mb-1">Division</div>
                    <select value={team.division || ""} onChange={e => updateTeam(team.id, { division: e.target.value || null })}
                      className="bg-[#0d1117] border border-white/[0.06] rounded-lg px-3 py-1.5 text-[12px] text-white/80 focus:outline-none focus:border-[#17FC13]/30">
                      <option value="">Unassigned</option>
                      {DIVISIONS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>

                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-white/25 mb-1">Status</div>
                    <div className="flex gap-1.5">
                      {team.status !== "active" && (
                        <button onClick={() => updateTeam(team.id, { status: "active" })} disabled={saving === team.id}
                          className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-[#17FC13]/10 border border-[#17FC13]/20 text-[#17FC13]/70 hover:bg-[#17FC13]/15 transition-all disabled:opacity-50">
                          Activate
                        </button>
                      )}
                      {team.status !== "pending" && (
                        <button onClick={() => updateTeam(team.id, { status: "pending" })} disabled={saving === team.id}
                          className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-yellow-500/10 border border-yellow-500/15 text-yellow-500/60 hover:bg-yellow-500/15 transition-all disabled:opacity-50">
                          Pending
                        </button>
                      )}
                      {team.status !== "rejected" && (
                        <button onClick={() => updateTeam(team.id, { status: "rejected" })} disabled={saving === team.id}
                          className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-red-500/10 border border-red-500/15 text-red-400/50 hover:bg-red-500/15 transition-all disabled:opacity-50">
                          Reject
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
