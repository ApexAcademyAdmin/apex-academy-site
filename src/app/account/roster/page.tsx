"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type RosterPlayer = {
  name: string;
  dateOfBirth: string;
  parentName: string;
  contactEmail: string;
  contactPhone: string;
};

const EMPTY_PLAYER: RosterPlayer = { name: "", dateOfBirth: "", parentName: "", contactEmail: "", contactPhone: "" };

const MAX_PLAYERS = 20;

const inputCls = "w-full bg-[#0d1117] border border-white/[0.06] rounded-lg px-4 py-2.5 text-[13px] text-white placeholder-white/30 focus:outline-none focus:border-[#17FC13]/30 transition-colors";
const labelCls = "block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1.5";

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
        // Migrate any legacy rows to the current shape.
        const existing = Array.isArray(team.roster) ? team.roster : [];
        setRoster(existing.map((p: Partial<RosterPlayer>) => ({ ...EMPTY_PLAYER, ...p })));
      }
      setLoaded(true);
    }
    load();
  }, [router]);

  function addPlayer() {
    if (roster.length >= MAX_PLAYERS) return;
    setRoster([...roster, { ...EMPTY_PLAYER }]);
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
    // Enforce the cap server-side too, in case the UI guard was bypassed.
    const capped = roster.slice(0, MAX_PLAYERS);
    const { error: updateError } = await supabase.from("teams").update({ roster: capped }).eq("id", teamId);

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
        <p className="text-[13px] text-white/50 mb-6">You don&apos;t have a team registered yet.</p>
        <a href="/league/register" className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#17FC13] bg-gradient-to-t from-[#17FC13]/20 to-transparent text-white text-xs font-bold uppercase tracking-wide no-underline hover:shadow-[0_0_20px_rgba(23,252,19,0.15)] transition-all">
          Register a Team
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/40 mb-2">Roster</div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">{teamName}</h1>
      </div>

      {/* Eligibility rules */}
      <div className="bg-[#17FC13]/[0.04] border border-[#17FC13]/15 rounded-xl p-5 mb-6">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/70 mb-2.5">Playoff Eligibility</div>
        <ul className="space-y-2 text-[13px] text-white/70">
          <li className="flex gap-2.5">
            <span className="text-[#17FC13]/60 mt-0.5">•</span>
            Players must appear in at least <span className="text-white font-semibold">50% of regular-season games</span> to be playoff eligible.
          </li>
          <li className="flex gap-2.5">
            <span className="text-[#17FC13]/60 mt-0.5">•</span>
            Each player must bring a <span className="text-white font-semibold">copy of their birth certificate</span> to the playoff site in case of an age dispute.
          </li>
        </ul>
      </div>

      <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">{roster.length} / {MAX_PLAYERS} Players</h3>
          <button
            onClick={addPlayer}
            disabled={roster.length >= MAX_PLAYERS}
            className="text-[10px] font-bold uppercase tracking-wider text-[#17FC13]/70 bg-transparent border-none cursor-pointer hover:text-[#17FC13] transition-colors disabled:text-white/20 disabled:cursor-not-allowed"
          >
            + Add Player
          </button>
        </div>
        {roster.length >= MAX_PLAYERS && (
          <p className="text-[11px] text-white/40 -mt-3 mb-4">Roster is full — a maximum of {MAX_PLAYERS} players is allowed.</p>
        )}

        {roster.length === 0 ? (
          <p className="text-xs text-white/40 text-center py-6">No players added yet. Click &ldquo;Add Player&rdquo; to start building your roster.</p>
        ) : (
          <div className="space-y-5">
            {roster.map((p, i) => (
              <div key={i} className="border-b border-white/[0.04] pb-5 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">Player {i + 1}</span>
                  <button onClick={() => removePlayer(i)} className="text-[10px] font-bold uppercase tracking-wider text-red-400/60 bg-transparent border-none cursor-pointer hover:text-red-400 transition-colors">Remove</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Player Name</label>
                    <input type="text" value={p.name} onChange={(e) => updatePlayer(i, "name", e.target.value)} className={inputCls} placeholder="Full name" />
                  </div>
                  <div>
                    <label className={labelCls}>Date of Birth</label>
                    <input type="date" value={p.dateOfBirth} onChange={(e) => updatePlayer(i, "dateOfBirth", e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Parent / Guardian Name</label>
                    <input type="text" value={p.parentName} onChange={(e) => updatePlayer(i, "parentName", e.target.value)} className={inputCls} placeholder="Parent or guardian" />
                  </div>
                  <div>
                    <label className={labelCls}>Contact Phone</label>
                    <input type="tel" value={p.contactPhone} onChange={(e) => updatePlayer(i, "contactPhone", e.target.value)} className={inputCls} placeholder="(617) 555-0123" />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelCls}>Contact Email</label>
                    <input type="email" value={p.contactEmail} onChange={(e) => updatePlayer(i, "contactEmail", e.target.value)} className={inputCls} placeholder="parent@email.com" />
                  </div>
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
