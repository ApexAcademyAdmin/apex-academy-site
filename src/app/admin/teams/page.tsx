"use client";

import { useState, useEffect } from "react";
import { AGE_GROUPS, TEAM_STATUS_META, type TeamStatus } from "@/lib/constants";

type Team = {
  id: string;
  status: TeamStatus;
  team_name: string;
  org_name: string | null;
  age_group: string | null;
  division: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  city: string | null;
  state: string | null;
  notes: string | null;
  admin_notes: string | null;
  created_at: string;
  approved_at: string | null;
  published_at: string | null;
};

const DIVISIONS = ["Premier", "Prospect"];

const TONE: Record<string, string> = {
  amber: "bg-yellow-500/10 text-yellow-400/80 border-yellow-500/25",
  orange: "bg-orange-500/10 text-orange-400/80 border-orange-500/25",
  blue: "bg-blue-500/10 text-blue-400/80 border-blue-500/25",
  green: "bg-[#17FC13]/10 text-[#17FC13]/80 border-[#17FC13]/25",
  red: "bg-red-500/10 text-red-400/70 border-red-500/25",
};

type Filter = "all" | TeamStatus;
const FILTERS: Filter[] = ["all", "pending_review", "needs_info", "approved", "published", "rejected"];
const filterLabel = (f: Filter) => (f === "all" ? "All" : TEAM_STATUS_META[f].label);

function StatusBadge({ status }: { status: TeamStatus }) {
  const meta = TEAM_STATUS_META[status];
  return (
    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${TONE[meta.tone]}`}>
      {meta.label}
    </span>
  );
}

export default function AdminTeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("pending_review");
  const [saving, setSaving] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/teams");
      if (res.ok) {
        const data = await res.json();
        setTeams(data.teams || []);
      }
      setLoading(false);
    }
    load();
  }, []);

  async function patch(teamId: string, updates: Partial<Team>, message?: string) {
    setSaving(teamId);
    const res = await fetch("/api/admin/teams", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teamId, updates, message }),
    });
    if (res.ok) {
      setTeams((prev) => prev.map((t) => (t.id === teamId ? { ...t, ...updates } : t)));
    }
    setSaving(null);
  }

  function setStatus(team: Team, status: TeamStatus) {
    const note = notesDraft[team.id] ?? team.admin_notes ?? "";
    // Persist the note alongside the status change so it's saved and emailed.
    patch(team.id, { status, admin_notes: note || null }, note);
  }

  const counts = FILTERS.reduce((acc, f) => {
    acc[f] = f === "all" ? teams.length : teams.filter((t) => t.status === f).length;
    return acc;
  }, {} as Record<Filter, number>);

  const filtered = filter === "all" ? teams : teams.filter((t) => t.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-5 h-5 border-2 border-[#17FC13]/30 border-t-[#17FC13] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Heading */}
      <div className="mb-8">
        <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/40 mb-2">Admin</div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1.5">Team Registrations</h1>
        <p className="text-[13px] text-white/30">Review submissions, request info, approve, and publish teams.</p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${filter === f ? "bg-[#17FC13]/10 text-[#17FC13] border border-[#17FC13]/25" : "text-white/40 border border-white/[0.05] hover:border-white/[0.1]"}`}>
            {filterLabel(f)} ({counts[f]})
          </button>
        ))}
      </div>

      {/* Teams */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-sm text-white/30">No registrations in this view.</div>
        )}

        {filtered.map((team) => {
          const draft = notesDraft[team.id] ?? team.admin_notes ?? "";
          const busy = saving === team.id;
          return (
            <div key={team.id} className="bg-[#0d1117] rounded-2xl border border-white/[0.05] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <span className="text-base font-bold text-white/90">{team.team_name}</span>
                  <StatusBadge status={team.status} />
                </div>
                <span className="text-[10px] font-mono text-white/20">{new Date(team.created_at).toLocaleDateString()}</span>
              </div>

              {/* Details */}
              <div className="px-5 py-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-white/25 mb-1">Age Group</div>
                    <div className="text-[13px] text-white/70">{team.age_group || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-white/25 mb-1">Head Coach</div>
                    <div className="text-[13px] text-white/70">{team.contact_name || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-white/25 mb-1">Email</div>
                    <div className="text-[13px] text-white/70 break-all">{team.contact_email || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-white/25 mb-1">Phone</div>
                    <div className="text-[13px] text-white/70">{team.contact_phone || "—"}</div>
                  </div>
                </div>

                {team.notes && (
                  <div className="mb-4">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-white/25 mb-1">Coach Notes</div>
                    <div className="text-[13px] text-white/60 bg-black/30 border border-white/[0.05] rounded-lg px-3 py-2">{team.notes}</div>
                  </div>
                )}

                {/* Assignment */}
                <div className="flex flex-wrap items-end gap-3 pt-4 border-t border-white/[0.04]">
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-white/25 mb-1">Age Group</div>
                    <select value={team.age_group || ""} onChange={(e) => patch(team.id, { age_group: e.target.value || null })}
                      className="bg-black/30 border border-white/[0.08] rounded-lg px-3 py-1.5 text-[12px] text-white/80 focus:outline-none focus:border-[#17FC13]/30">
                      <option value="">Unassigned</option>
                      {AGE_GROUPS.map((a) => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-white/25 mb-1">Division</div>
                    <select value={team.division || ""} onChange={(e) => patch(team.id, { division: e.target.value || null })}
                      className="bg-black/30 border border-white/[0.08] rounded-lg px-3 py-1.5 text-[12px] text-white/80 focus:outline-none focus:border-[#17FC13]/30">
                      <option value="">Unassigned</option>
                      {DIVISIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>

                {/* Admin notes (also sent to the coach on Needs Info / Reject) */}
                <div className="mt-4">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-white/25 mb-1">Admin Notes / Message to Coach</div>
                  <textarea
                    value={draft}
                    onChange={(e) => setNotesDraft((p) => ({ ...p, [team.id]: e.target.value }))}
                    rows={2}
                    placeholder="Internal notes — included in Needs Info / Rejection emails."
                    className="w-full bg-black/30 border border-white/[0.08] rounded-lg px-3 py-2 text-[12px] text-white/80 placeholder:text-white/20 focus:outline-none focus:border-[#17FC13]/30 resize-none"
                  />
                  <button onClick={() => patch(team.id, { admin_notes: draft || null })} disabled={busy}
                    className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-white/40 hover:text-white/70 bg-transparent border-none cursor-pointer transition-colors disabled:opacity-50">
                    Save Notes
                  </button>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-4 border-t border-white/[0.04]">
                  {team.status !== "approved" && (
                    <button onClick={() => setStatus(team, "approved")} disabled={busy}
                      className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400/80 hover:bg-blue-500/15 transition-all disabled:opacity-50">
                      Approve
                    </button>
                  )}
                  {team.status !== "published" && (
                    <button onClick={() => setStatus(team, "published")} disabled={busy}
                      className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-[#17FC13]/10 border border-[#17FC13]/25 text-[#17FC13]/80 hover:bg-[#17FC13]/15 transition-all disabled:opacity-50">
                      Publish
                    </button>
                  )}
                  {team.status !== "needs_info" && (
                    <button onClick={() => setStatus(team, "needs_info")} disabled={busy}
                      className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400/70 hover:bg-orange-500/15 transition-all disabled:opacity-50">
                      Needs Info
                    </button>
                  )}
                  {team.status !== "pending_review" && (
                    <button onClick={() => setStatus(team, "pending_review")} disabled={busy}
                      className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400/70 hover:bg-yellow-500/15 transition-all disabled:opacity-50">
                      Pending
                    </button>
                  )}
                  {team.status !== "rejected" && (
                    <button onClick={() => setStatus(team, "rejected")} disabled={busy}
                      className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-red-500/10 border border-red-500/20 text-red-400/60 hover:bg-red-500/15 transition-all disabled:opacity-50">
                      Reject
                    </button>
                  )}
                  {busy && <span className="text-[10px] text-white/30 ml-1">Saving…</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
