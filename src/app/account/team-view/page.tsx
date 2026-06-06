"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

type RosterPlayer = { name: string; position: string; gradYear: string; bats: string; throws: string };
type Coach = { name: string; role: string };
type Team = {
  id: string;
  team_name: string;
  org_name: string | null;
  division: string | null;
  age_group: string | null;
  home_field: string | null;
  roster: RosterPlayer[] | null;
  coaches: Coach[] | null;
};

export default function TeamViewPage() {
  const [team, setTeam] = useState<Team | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("player_profiles")
        .select("team_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profile?.team_id) {
        const { data: teamData } = await supabase
          .from("teams")
          .select("id, team_name, org_name, division, age_group, home_field, roster, coaches")
          .eq("id", profile.team_id)
          .maybeSingle();
        if (teamData) setTeam(teamData as Team);
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

  if (!team) {
    return (
      <div>
        <div className="mb-8">
          <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/40 mb-2">My Team</div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Team</h1>
        </div>
        <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-8 text-center">
          <p className="text-[13px] text-white/30">You haven&apos;t been assigned to a team yet.</p>
          <p className="text-[11px] text-white/20 mt-2">Your coach will add you to a roster, or a league admin will assign your team.</p>
        </div>
      </div>
    );
  }

  const roster = Array.isArray(team.roster) ? team.roster : [];
  const coaches = Array.isArray(team.coaches) ? team.coaches : [];

  return (
    <div>
      <div className="mb-8">
        <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/40 mb-2">My Team</div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">{team.team_name}</h1>
        <p className="text-[13px] text-white/30 mt-1.5">
          {[team.org_name, team.age_group, team.division].filter(Boolean).join(" · ") || "Details pending"}
        </p>
      </div>

      {team.home_field && (
        <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-6 mb-6">
          <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/15 mb-1.5">Home Field</div>
          <div className="text-[13px] text-white/70">{team.home_field}</div>
        </div>
      )}

      {/* Coaches */}
      <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-6 mb-6">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mb-4">Coaching Staff ({coaches.length})</h3>
        {coaches.length === 0 ? (
          <p className="text-xs text-white/20">No coaches listed.</p>
        ) : (
          <div className="space-y-2">
            {coaches.map((c, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.03] last:border-0">
                <span className="text-[13px] text-white/70">{c.name}</span>
                <span className="text-[11px] text-white/30 uppercase tracking-wider">{c.role}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Roster */}
      <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-6">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mb-4">Roster ({roster.length})</h3>
        {roster.length === 0 ? (
          <p className="text-xs text-white/20">No players listed yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[9px] font-bold uppercase tracking-wider text-white/25">
                  <th className="pb-2 pr-4">Name</th>
                  <th className="pb-2 pr-4">Pos</th>
                  <th className="pb-2 pr-4">Grad</th>
                  <th className="pb-2">B/T</th>
                </tr>
              </thead>
              <tbody>
                {roster.map((p, i) => (
                  <tr key={i} className="border-t border-white/[0.03] text-[13px] text-white/65">
                    <td className="py-2.5 pr-4">{p.name || "—"}</td>
                    <td className="py-2.5 pr-4">{p.position || "—"}</td>
                    <td className="py-2.5 pr-4">{p.gradYear || "—"}</td>
                    <td className="py-2.5">{[p.bats, p.throws].filter(Boolean).join("/") || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
