"use client";

import { useState, useEffect } from "react";

type Team = { id: string; status: string };

export default function AdminHome() {
  const [counts, setCounts] = useState({ total: 0, pending: 0, active: 0, rejected: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/teams");
      if (res.ok) {
        const data = await res.json();
        const teams: Team[] = data.teams || [];
        setCounts({
          total: teams.length,
          pending: teams.filter((t) => t.status === "pending_review").length,
          active: teams.filter((t) => t.status === "published").length,
          rejected: teams.filter((t) => t.status === "rejected").length,
        });
      }
      setLoaded(true);
    }
    load();
  }, []);

  const stats = [
    { label: "Total Teams", value: counts.total, color: "text-white/90" },
    { label: "Pending Review", value: counts.pending, color: "text-yellow-400/90" },
    { label: "Published", value: counts.active, color: "text-[#17FC13]/90" },
    { label: "Rejected", value: counts.rejected, color: "text-red-400/80" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/40 mb-2">Admin</div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">League Administration</h1>
        <p className="text-[13px] text-white/70 mt-1.5">Manage teams, divisions, and league operations.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-5">
            <div className={`text-3xl font-bold ${s.color}`}>{loaded ? s.value : "—"}</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-white/65 mt-1.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tools */}
      <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-6">
        <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/55 mb-4">Tools</div>
        <div className="space-y-2">
          <a href="/admin/teams" className="flex items-center justify-between py-3 px-4 rounded-lg bg-white/[0.02] border border-white/[0.04] no-underline group hover:border-[#17FC13]/20 transition-colors">
            <div>
              <div className="text-[13px] font-medium text-white/70 group-hover:text-white/90 transition-colors">Team Management</div>
              <div className="text-[11px] text-white/70 mt-0.5">Review registrations, activate teams, assign divisions</div>
            </div>
            <svg className="w-3.5 h-3.5 text-white/55 group-hover:text-[#17FC13]/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 5l7 7-7 7" /></svg>
          </a>
        </div>
      </div>
    </div>
  );
}
