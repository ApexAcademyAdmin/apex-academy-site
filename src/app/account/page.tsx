"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { loadDashboardContext, type DashboardRole } from "@/lib/dashboard";

type Team = { id: string; team_name: string; status: string; division: string | null; age_group: string | null };

const statusStyles: Record<string, string> = {
  active: "bg-[#17FC13]/[0.08] text-[#17FC13]/80 border-[#17FC13]/20",
  approved: "bg-[#17FC13]/[0.08] text-[#17FC13]/80 border-[#17FC13]/20",
  published: "bg-[#17FC13]/[0.08] text-[#17FC13]/80 border-[#17FC13]/20",
  pending: "bg-yellow-500/[0.08] text-yellow-400/80 border-yellow-500/20",
  submitted: "bg-yellow-500/[0.08] text-yellow-400/80 border-yellow-500/20",
  under_review: "bg-yellow-500/[0.08] text-yellow-400/80 border-yellow-500/20",
  draft: "bg-white/[0.04] text-white/40 border-white/10",
  needs_changes: "bg-orange-500/[0.08] text-orange-400/80 border-orange-500/20",
  rejected: "bg-red-500/[0.08] text-red-400/80 border-red-500/20",
};

function StatusBadge({ status }: { status: string }) {
  const cls = statusStyles[status] || statusStyles.draft;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${cls}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-6">{children}</div>;
}

function ActionLink({ href, label, sub }: { href: string; label: string; sub?: string }) {
  return (
    <a href={href} className="flex items-center justify-between py-3 px-4 rounded-lg bg-white/[0.02] border border-white/[0.04] no-underline group hover:border-[#17FC13]/20 transition-colors">
      <div>
        <div className="text-[13px] font-medium text-white/70 group-hover:text-white/90 transition-colors">{label}</div>
        {sub && <div className="text-[11px] text-white/30 mt-0.5">{sub}</div>}
      </div>
      <svg className="w-3.5 h-3.5 text-white/15 group-hover:text-[#17FC13]/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 5l7 7-7 7" /></svg>
    </a>
  );
}

export default function DashboardHome() {
  const [role, setRole] = useState<DashboardRole>("applicant");
  const [name, setName] = useState("");
  const [team, setTeam] = useState<Team | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      const ctx = await loadDashboardContext();
      if (!ctx) return;
      setRole(ctx.role);
      setName(ctx.firstName);

      const supabase = createClient();
      if (ctx.role === "coach") {
        const { data } = await supabase
          .from("teams")
          .select("id, team_name, status, division, age_group")
          .eq("user_id", ctx.user.id)
          .maybeSingle();
        if (data) setTeam(data as Team);
      }
      setLoaded(true);
    }
    load();
  }, []);

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-5 h-5 border-2 border-[#17FC13]/30 border-t-[#17FC13] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/40 mb-2">Dashboard</div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Welcome back, {name}</h1>
        <p className="text-[13px] text-white/30 mt-1.5 capitalize">{role} account</p>
      </div>

      {/* Coach view */}
      {role === "coach" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/15">Your Team</div>
              {team && <StatusBadge status={team.status} />}
            </div>
            {team ? (
              <>
                <div className="text-lg font-bold text-white/90 mb-1">{team.team_name}</div>
                <div className="text-[12px] text-white/35">
                  {[team.age_group, team.division].filter(Boolean).join(" · ") || "Division pending assignment"}
                </div>
                <div className="mt-5 space-y-2">
                  <ActionLink href="/account/team" label="Edit Team Details" sub="Name, colors, field, staff" />
                  <ActionLink href="/account/roster" label="Manage Roster" sub="Add and edit players" />
                </div>
              </>
            ) : (
              <p className="text-xs text-white/25">No team found.</p>
            )}
          </Card>

          <Card>
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/15 mb-4">Quick Links</div>
            <div className="space-y-2">
              <ActionLink href="/league/rules" label="League Rules" />
              <ActionLink href="/league/schedule" label="Schedule" />
              <ActionLink href="/league/standings" label="Standings" />
              <ActionLink href="/account/settings" label="Account Settings" />
            </div>
          </Card>
        </div>
      )}

      {/* Admin view */}
      {role === "admin" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/15 mb-4">Administration</div>
            <div className="space-y-2">
              <ActionLink href="/admin/teams" label="Team Management" sub="Review, approve, assign divisions" />
              <ActionLink href="/admin" label="League Admin" sub="Overview & tools" />
            </div>
          </Card>
          <Card>
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/15 mb-4">Quick Links</div>
            <div className="space-y-2">
              <ActionLink href="/league/standings" label="Standings" />
              <ActionLink href="/league/schedule" label="Schedule" />
              <ActionLink href="/account/settings" label="Account Settings" />
            </div>
          </Card>
        </div>
      )}

      {/* Applicant view */}
      {role === "applicant" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/15 mb-4">Coaches</div>
            <p className="text-xs text-white/30 mb-4">Register your town team to join the Apex Academy League.</p>
            <ActionLink href="/league/register" label="Register a Team" sub="Submit in under a minute" />
          </Card>
          <Card>
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/15 mb-4">Explore</div>
            <div className="space-y-2">
              <ActionLink href="/teams" label="Teams" />
              <ActionLink href="/shop" label="Shop" />
              <ActionLink href="/account/settings" label="Account Settings" />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
