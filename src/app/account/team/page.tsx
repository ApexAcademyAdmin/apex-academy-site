"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type RosterPlayer = {
  name: string;
  position: string;
  gradYear: string;
  bats: string;
  throws: string;
};

type Coach = {
  name: string;
  role: string;
  email: string;
  phone: string;
};

type Team = {
  id: string;
  team_name: string;
  org_name: string | null;
  status: string;
  primary_color: string | null;
  secondary_color: string | null;
  home_field: string | null;
  logo_url: string | null;
  roster: RosterPlayer[] | null;
  coaches: Coach[] | null;
};

export default function TeamEditPage() {
  const [team, setTeam] = useState<Team | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [teamName, setTeamName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [homeField, setHomeField] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [roster, setRoster] = useState<RosterPlayer[]>([]);
  const [coaches, setCoaches] = useState<Coach[]>([]);

  const router = useRouter();

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) { router.push("/signin"); return; }

      const { data: teamData } = await supabase
        .from("teams")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (!teamData) {
        setLoaded(true);
        return;
      }

      const t = teamData as Team;
      setTeam(t);
      setTeamName(t.team_name || "");
      setOrgName(t.org_name || "");
      setPrimaryColor(t.primary_color || "");
      setSecondaryColor(t.secondary_color || "");
      setHomeField(t.home_field || "");
      setLogoUrl(t.logo_url || "");
      setRoster(Array.isArray(t.roster) ? t.roster : []);
      setCoaches(Array.isArray(t.coaches) ? t.coaches : []);
      setLoaded(true);
    }

    load();
  }, [router]);

  async function handleSave() {
    if (!team) return;
    if (!teamName.trim()) { setError("Team name is required."); return; }

    setSaving(true);
    setError("");
    setSaved(false);

    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("teams")
      .update({
        team_name: teamName.trim(),
        org_name: orgName.trim() || null,
        primary_color: primaryColor.trim() || null,
        secondary_color: secondaryColor.trim() || null,
        home_field: homeField.trim() || null,
        logo_url: logoUrl.trim() || null,
        roster,
        coaches,
      })
      .eq("id", team.id);

    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  // Roster helpers
  function addPlayer() {
    setRoster([...roster, { name: "", position: "", gradYear: "", bats: "", throws: "" }]);
  }
  function updatePlayer(idx: number, field: keyof RosterPlayer, value: string) {
    const updated = [...roster];
    updated[idx] = { ...updated[idx], [field]: value };
    setRoster(updated);
  }
  function removePlayer(idx: number) {
    setRoster(roster.filter((_, i) => i !== idx));
  }

  // Coach helpers
  function addCoach() {
    setCoaches([...coaches, { name: "", role: "", email: "", phone: "" }]);
  }
  function updateCoach(idx: number, field: keyof Coach, value: string) {
    const updated = [...coaches];
    updated[idx] = { ...updated[idx], [field]: value };
    setCoaches(updated);
  }
  function removeCoach(idx: number) {
    setCoaches(coaches.filter((_, i) => i !== idx));
  }

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-5 h-5 border-2 border-[#17FC13]/30 border-t-[#17FC13] rounded-full animate-spin" />
      </div>
    );
  }

  if (!team) {
    return (
      <div className="text-center py-12">
        <p className="text-[13px] text-white/30 mb-6">You don&apos;t have a team registered yet.</p>
        <a href="/league/register" className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#17FC13] bg-gradient-to-t from-[#17FC13]/20 to-transparent text-white text-xs font-bold uppercase tracking-wide no-underline hover:shadow-[0_0_20px_rgba(23,252,19,0.15)] transition-all">
          Register a Team
        </a>
      </div>
    );
  }

  const inputCls = "w-full bg-[#0d1117] border border-white/[0.06] rounded-lg px-4 py-2.5 text-[13px] text-white/90 placeholder-white/20 focus:outline-none focus:border-[#17FC13]/30 transition-colors";
  const labelCls = "block text-[10px] font-bold uppercase tracking-wider text-white/30 mb-1.5";

  return (
    <div>
      {/* Heading */}
      <div className="mb-8">
        <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/40 mb-2">Team Editor</div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">{team.team_name}</h1>
      </div>

      <div>
        {/* Status badge */}
        <div className="mb-8">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            team.status === "active"
              ? "bg-[#17FC13]/[0.08] text-[#17FC13]/80 border border-[#17FC13]/20"
              : "bg-yellow-500/[0.08] text-yellow-400/80 border border-yellow-500/20"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${team.status === "active" ? "bg-[#17FC13]" : "bg-yellow-400"}`} />
            {team.status === "active" ? "Active" : "Pending Review"}
          </span>
          <p className="text-[10px] text-white/20 mt-2">Team status is managed by league administrators.</p>
        </div>

        {/* Team Info */}
        <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-6 mb-6">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mb-5">Team Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Team Name <span className="text-[#17FC13]/40">*</span></label>
              <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} className={inputCls} placeholder="Team name" />
            </div>
            <div>
              <label className={labelCls}>Organization</label>
              <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} className={inputCls} placeholder="Parent organization" />
            </div>
            <div>
              <label className={labelCls}>Primary Color</label>
              <input type="text" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className={inputCls} placeholder="#000000" />
            </div>
            <div>
              <label className={labelCls}>Secondary Color</label>
              <input type="text" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className={inputCls} placeholder="#FFFFFF" />
            </div>
            <div>
              <label className={labelCls}>Home Field</label>
              <input type="text" value={homeField} onChange={(e) => setHomeField(e.target.value)} className={inputCls} placeholder="Field name and location" />
            </div>
            <div>
              <label className={labelCls}>Logo URL</label>
              <input type="text" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} className={inputCls} placeholder="https://..." />
            </div>
          </div>
        </div>

        {/* Roster */}
        <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Roster ({roster.length} players)</h3>
            <button onClick={addPlayer} className="text-[10px] font-bold uppercase tracking-wider text-[#17FC13]/60 bg-transparent border-none cursor-pointer hover:text-[#17FC13] transition-colors">+ Add Player</button>
          </div>

          {roster.length === 0 ? (
            <p className="text-xs text-white/20 text-center py-4">No players added yet.</p>
          ) : (
            <div className="space-y-3">
              {roster.map((p, i) => (
                <div key={i} className="grid grid-cols-2 md:grid-cols-6 gap-2 items-end">
                  <div className="md:col-span-2">
                    <label className={labelCls}>Name</label>
                    <input type="text" value={p.name} onChange={(e) => updatePlayer(i, "name", e.target.value)} className={inputCls} placeholder="Player name" />
                  </div>
                  <div>
                    <label className={labelCls}>Position</label>
                    <input type="text" value={p.position} onChange={(e) => updatePlayer(i, "position", e.target.value)} className={inputCls} placeholder="SS" />
                  </div>
                  <div>
                    <label className={labelCls}>Grad Year</label>
                    <input type="text" value={p.gradYear} onChange={(e) => updatePlayer(i, "gradYear", e.target.value)} className={inputCls} placeholder="2027" />
                  </div>
                  <div>
                    <label className={labelCls}>Bats/Throws</label>
                    <input type="text" value={`${p.bats}/${p.throws}`} onChange={(e) => {
                      const [b, t] = e.target.value.split("/");
                      updatePlayer(i, "bats", b || "");
                      if (t !== undefined) updatePlayer(i, "throws", t);
                    }} className={inputCls} placeholder="R/R" />
                  </div>
                  <div className="flex items-end">
                    <button onClick={() => removePlayer(i)} className="w-full py-2.5 text-[10px] font-bold uppercase text-red-400/50 bg-transparent border border-red-400/10 rounded-lg cursor-pointer hover:text-red-400 hover:border-red-400/30 transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Coaches */}
        <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Coaches ({coaches.length})</h3>
            <button onClick={addCoach} className="text-[10px] font-bold uppercase tracking-wider text-[#17FC13]/60 bg-transparent border-none cursor-pointer hover:text-[#17FC13] transition-colors">+ Add Coach</button>
          </div>

          {coaches.length === 0 ? (
            <p className="text-xs text-white/20 text-center py-4">No coaches added yet.</p>
          ) : (
            <div className="space-y-3">
              {coaches.map((c, i) => (
                <div key={i} className="grid grid-cols-2 md:grid-cols-5 gap-2 items-end">
                  <div>
                    <label className={labelCls}>Name</label>
                    <input type="text" value={c.name} onChange={(e) => updateCoach(i, "name", e.target.value)} className={inputCls} placeholder="Coach name" />
                  </div>
                  <div>
                    <label className={labelCls}>Role</label>
                    <input type="text" value={c.role} onChange={(e) => updateCoach(i, "role", e.target.value)} className={inputCls} placeholder="Head Coach" />
                  </div>
                  <div>
                    <label className={labelCls}>Email</label>
                    <input type="email" value={c.email} onChange={(e) => updateCoach(i, "email", e.target.value)} className={inputCls} placeholder="coach@email.com" />
                  </div>
                  <div>
                    <label className={labelCls}>Phone</label>
                    <input type="text" value={c.phone} onChange={(e) => updateCoach(i, "phone", e.target.value)} className={inputCls} placeholder="(555) 123-4567" />
                  </div>
                  <div className="flex items-end">
                    <button onClick={() => removeCoach(i)} className="w-full py-2.5 text-[10px] font-bold uppercase text-red-400/50 bg-transparent border border-red-400/10 rounded-lg cursor-pointer hover:text-red-400 hover:border-red-400/30 transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Error / Save */}
        {error && (
          <div className="flex items-center gap-2 px-4 py-3 mb-4 border border-red-500/20 bg-red-500/[0.04] rounded-lg">
            <span className="w-1.5 h-1.5 bg-red-400 rounded-full shrink-0" />
            <span className="text-xs text-red-400/80">{error}</span>
          </div>
        )}

        {saved && (
          <div className="flex items-center gap-2 px-4 py-3 mb-4 border border-[#17FC13]/20 bg-[#17FC13]/[0.04] rounded-lg">
            <span className="w-1.5 h-1.5 bg-[#17FC13] rounded-full shrink-0" />
            <span className="text-xs text-[#17FC13]/80">Team saved successfully.</span>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 rounded-full border border-[#17FC13] bg-gradient-to-t from-[#17FC13]/20 to-transparent text-white text-xs font-bold uppercase tracking-wide cursor-pointer hover:shadow-[0_0_20px_rgba(23,252,19,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <a href="/account" className="px-6 py-3 rounded-full border border-[#404040] bg-gradient-to-t from-white/[0.06] to-transparent text-white text-xs font-bold uppercase tracking-wide no-underline hover:border-[#17FC13]/50 transition-all">
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
