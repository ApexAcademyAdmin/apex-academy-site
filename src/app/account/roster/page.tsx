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

const inputCls = "w-full bg-[#0d1117] border border-white/[0.06] rounded-lg px-4 py-2.5 text-[13px] text-white/90 placeholder-white/20 focus:outline-none focus:border-[#17FC13]/30 transition-colors";
const labelCls = "block text-[10px] font-bold uppercase tracking-wider text-white/30 mb-1.5";

export default function RosterPage() {
  const [teamId, setTeamId] = useState<string | null>(null);
  const [teamName, setTeamName] = useState("");
  const [roster, setRoster] = useState<RosterPlayer[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/signin"); return; }

      const { data: team } = await supabase
        .from("teams")
        .select("id, team_name, roster")
        .eq("user_id", user.id)
        .maybeSingle();

      if (team) {
        setTeamId(team.id);
        setTeamName(team.team_name);
        setRoster(Array.isArray(team.roster) ? team.roster : []);
      }
      setLoaded(true);
    }
    load();
  }, [router]);

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

  async function handleSave() {
    if (!teamId) return;
    setSaving(true);
    setError("");
    setSaved(false);

    const supabase = createClient();
    const { error: updateError } = await supabase.from("teams").update({ roster }).eq("id", teamId);

    setSaving(false);
    if (updateError) { setError(updateError.message); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-5 h-5 border-2 border-[#17FC13]/30 border-t-[#17FC13] rounded-full animate-spin" />
      </div>
    );
  }

  if (!teamId) {
    return (
      <div className="text-center py-12">
        <p className="text-[13px] text-white/30 mb-6">You don&apos;t have a team registered yet.</p>
        <a href="/league/register" className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#17FC13] bg-gradient-to-t from-[#17FC13]/20 to-transparent text-white text-xs font-bold uppercase tracking-wide no-underline hover:shadow-[0_0_20px_rgba(23,252,19,0.15)] transition-all">
          Register a Team
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/40 mb-2">Roster</div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">{teamName}</h1>
      </div>

      <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">{roster.length} Players</h3>
          <button onClick={addPlayer} className="text-[10px] font-bold uppercase tracking-wider text-[#17FC13]/60 bg-transparent border-none cursor-pointer hover:text-[#17FC13] transition-colors">+ Add Player</button>
        </div>

        {roster.length === 0 ? (
          <p className="text-xs text-white/20 text-center py-6">No players added yet. Click &ldquo;Add Player&rdquo; to start building your roster.</p>
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

      {error && (
        <div className="flex items-center gap-2 px-4 py-3 mb-4 border border-red-500/20 bg-red-500/[0.04] rounded-lg">
          <span className="w-1.5 h-1.5 bg-red-400 rounded-full shrink-0" />
          <span className="text-xs text-red-400/80">{error}</span>
        </div>
      )}
      {saved && (
        <div className="flex items-center gap-2 px-4 py-3 mb-4 border border-[#17FC13]/20 bg-[#17FC13]/[0.04] rounded-lg">
          <span className="w-1.5 h-1.5 bg-[#17FC13] rounded-full shrink-0" />
          <span className="text-xs text-[#17FC13]/80">Roster saved.</span>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button onClick={handleSave} disabled={saving}
          className="px-6 py-3 rounded-full border border-[#17FC13] bg-gradient-to-t from-[#17FC13]/20 to-transparent text-white text-xs font-bold uppercase tracking-wide cursor-pointer hover:shadow-[0_0_20px_rgba(23,252,19,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
          {saving ? "Saving..." : "Save Roster"}
        </button>
        <a href="/account" className="px-6 py-3 rounded-full border border-[#404040] bg-gradient-to-t from-white/[0.06] to-transparent text-white text-xs font-bold uppercase tracking-wide no-underline hover:border-[#17FC13]/50 transition-all">
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}
