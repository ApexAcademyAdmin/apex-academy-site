"use client";

import { useState } from "react";
import { UPCOMING_GAMES } from "@/lib/league-data";

// ═══════════════════════════════════════
// TYPES
// ═══════════════════════════════════════

type PitcherEntry = { name: string; pitchCount: string; inningsPitched: string };
type SelectedGame = typeof UPCOMING_GAMES[0] | null;

const EMPTY_PITCHER: PitcherEntry = { name: "", pitchCount: "", inningsPitched: "" };

// Mock: games that haven't been submitted yet (in production, filter by status)
const UNSUBMITTED_GAMES = UPCOMING_GAMES;

// ═══════════════════════════════════════
// SHARED UI
// ═══════════════════════════════════════

const inputCls = "w-full bg-[#0d1117] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-white placeholder:text-white focus:outline-none focus:border-[#17FC13]/30 focus:ring-1 focus:ring-[#17FC13]/10 transition-all";
const labelCls = "block text-[9px] font-bold uppercase tracking-[0.12em] text-white mb-1";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className={labelCls}>{label}</label>{children}</div>;
}

// ═══════════════════════════════════════
// PITCHER SECTION
// ═══════════════════════════════════════

function PitcherSection({ label, pitchers, onChange }: {
  label: string;
  pitchers: PitcherEntry[];
  onChange: (pitchers: PitcherEntry[]) => void;
}) {
  const update = (i: number, field: keyof PitcherEntry, val: string) => {
    const updated = [...pitchers];
    updated[i] = { ...updated[i], [field]: val };
    onChange(updated);
  };
  const add = () => onChange([...pitchers, { ...EMPTY_PITCHER }]);
  const remove = (i: number) => { if (pitchers.length > 1) onChange(pitchers.filter((_, idx) => idx !== i)); };
  const totalPitches = pitchers.reduce((sum, p) => sum + (parseInt(p.pitchCount) || 0), 0);

  return (
    <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#17FC13]/50">{label}</div>
        <div className="text-[10px] font-mono text-white">
          Total: <span className={`font-bold ${totalPitches > 105 ? "text-red-400" : "text-[#17FC13]"}`}>{totalPitches}</span> pitches
        </div>
      </div>
      <div className="grid grid-cols-[1fr_80px_80px_32px] gap-2 mb-1.5">
        <span className={labelCls}>Pitcher Name</span>
        <span className={labelCls}>Pitches</span>
        <span className={labelCls}>IP</span>
        <span></span>
      </div>
      {pitchers.map((p, i) => (
        <div key={i} className="grid grid-cols-[1fr_80px_80px_32px] gap-2 mb-1.5">
          <input className={inputCls} placeholder="Full name" value={p.name} onChange={e => update(i, "name", e.target.value)} />
          <input className={inputCls} type="number" placeholder="0" value={p.pitchCount} onChange={e => update(i, "pitchCount", e.target.value)} />
          <input className={inputCls} placeholder="e.g. 3.1" value={p.inningsPitched} onChange={e => update(i, "inningsPitched", e.target.value)} />
          {pitchers.length > 1 ? (
            <button type="button" onClick={() => remove(i)} className="text-red-400/30 hover:text-red-400/60 text-xs transition-colors">x</button>
          ) : <span />}
        </div>
      ))}
      <button type="button" onClick={add}
        className="w-full py-2 mt-1 rounded-lg border border-dashed border-white/[0.06] text-[10px] font-bold uppercase tracking-wider text-white hover:text-white hover:border-white/[0.1] transition-all">
        + Add Pitcher
      </button>
    </div>
  );
}

// ═══════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════

export default function SubmitResultPage() {
  const [selectedGame, setSelectedGame] = useState<SelectedGame>(null);
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");
  const [homePitchers, setHomePitchers] = useState<PitcherEntry[]>([{ ...EMPTY_PITCHER }]);
  const [awayPitchers, setAwayPitchers] = useState<PitcherEntry[]>([{ ...EMPTY_PITCHER }]);
  const [notes, setNotes] = useState("");
  const [submittedBy, setSubmittedBy] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const homePitchersValid = homePitchers.some(p => p.name.trim() && p.pitchCount.trim());
  const awayPitchersValid = awayPitchers.some(p => p.name.trim() && p.pitchCount.trim());
  const isValid = selectedGame && homeScore && awayScore && homePitchersValid && awayPitchersValid && submittedBy;

  const handleSubmit = () => {
    if (!isValid) return;
    console.log("Game result submitted:", { selectedGame, homeScore, awayScore, homePitchers, awayPitchers, notes, submittedBy });
    setSubmitted(true);
  };

  // ── Confirmation ──
  if (submitted && selectedGame) {
    return (
      <main>
        <div className="pt-24 md:pt-32 pb-16">
          <div className="max-w-[640px] mx-auto px-6 text-center">
            <div className="w-14 h-14 rounded-full bg-[#17FC13]/10 border border-[#17FC13]/30 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-[#17FC13]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold uppercase mb-2">Result <span className="accent-text">Submitted</span></h2>
            <p className="text-sm text-white mb-6">Game result and pitch counts have been submitted. The commissioner will update standings within 24 hours.</p>
            <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-5 mb-6">
              <div className="text-center text-lg font-bold mb-2">
                {selectedGame.away} <span className="font-mono">{awayScore}</span>
                <span className="text-white mx-2">—</span>
                <span className="font-mono">{homeScore}</span> {selectedGame.home}
              </div>
              <div className="text-[10px] text-white text-center">{selectedGame.division} &middot; {selectedGame.date} &middot; {selectedGame.location}</div>
            </div>
            <a href="/league" className="text-xs font-bold uppercase tracking-wider text-[#17FC13]/50 hover:text-[#17FC13] no-underline transition-colors">← Back to League</a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="pt-24 md:pt-32 pb-16">
        <div className="max-w-[640px] mx-auto px-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-[10px] font-medium uppercase tracking-[0.2em]">
              <a href="/" className="text-white no-underline hover:text-white transition-colors">Home</a>
              <span className="text-white/10">/</span>
              <a href="/league" className="text-white no-underline hover:text-white transition-colors">League</a>
              <span className="text-white/10">/</span>
              <span className="text-[#17FC13]/60">Submit Result</span>
            </div>
            <h1 className="text-2xl md:text-3xl uppercase font-bold leading-[0.9] mb-1">
              Submit Game <span className="accent-text">Result</span>
            </h1>
            <p className="text-[11px] text-white mb-6">
              Select the game, enter the final score, and log all pitchers with pitch counts for both teams.
            </p>
          </div>

          {/* ── STEP 1: Select Game ── */}
          {!selectedGame ? (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#17FC13]/50 mb-3">Select Game</div>
              <div className="space-y-2">
                {UNSUBMITTED_GAMES.map(g => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGame(g)}
                    className="w-full text-left bg-[#0d1117] rounded-xl border border-white/[0.04] p-4 hover:border-[#17FC13]/20 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/[0.04] text-white">{g.ageGroup} Div {g.division}</span>
                        <span className="text-[11px] font-mono text-white">{g.date}</span>
                        <span className="text-[11px] font-mono text-[#17FC13]/50">{g.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-white">{g.away}</span>
                      <span className="text-[10px] text-white uppercase">at</span>
                      <span className="text-sm font-bold text-white">{g.home}</span>
                    </div>
                    <div className="text-[10px] text-white mt-1">{g.location}</div>
                  </button>
                ))}
              </div>
              {UNSUBMITTED_GAMES.length === 0 && (
                <div className="text-center py-10 text-sm text-white">No games pending submission.</div>
              )}
            </div>
          ) : (
            /* ── STEP 2: Enter Result ── */
            <div>
              <div className="space-y-4">

                {/* Selected game card */}
                <div className="bg-[#0d1117] rounded-xl border border-[#17FC13]/15 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#17FC13]/10 text-[#17FC13]/60">{selectedGame.division}</span>
                      <span className="text-[11px] font-mono text-white">{selectedGame.date} &middot; {selectedGame.time}</span>
                    </div>
                    <button onClick={() => { setSelectedGame(null); setHomeScore(""); setAwayScore(""); setHomePitchers([{ ...EMPTY_PITCHER }]); setAwayPitchers([{ ...EMPTY_PITCHER }]); }}
                      className="text-[10px] font-bold uppercase tracking-wider text-white hover:text-white/60 transition-colors">
                      Change Game
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-white">{selectedGame.away}</span>
                    <span className="text-[10px] text-white uppercase">at</span>
                    <span className="text-sm font-bold text-white">{selectedGame.home}</span>
                  </div>
                  <div className="text-[10px] text-white mt-1">{selectedGame.location}</div>
                </div>

                {/* Score entry */}
                <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#17FC13]/50 mb-3">Final Score</div>
                  <div className="grid grid-cols-[1fr_60px_auto_60px_1fr] gap-2 items-end">
                    <div>
                      <div className={labelCls}>{selectedGame.away}</div>
                      <div className="text-xs font-bold text-white">(Away)</div>
                    </div>
                    <input className={`${inputCls} text-center font-bold text-lg`} type="number" placeholder="0" value={awayScore} onChange={e => setAwayScore(e.target.value)} />
                    <div className="pb-2 text-white text-sm font-bold text-center">—</div>
                    <input className={`${inputCls} text-center font-bold text-lg`} type="number" placeholder="0" value={homeScore} onChange={e => setHomeScore(e.target.value)} />
                    <div className="text-right">
                      <div className={labelCls}>{selectedGame.home}</div>
                      <div className="text-xs font-bold text-white">(Home)</div>
                    </div>
                  </div>
                </div>

                {/* Pitchers */}
                <PitcherSection label={`${selectedGame.away} Pitchers`} pitchers={awayPitchers} onChange={setAwayPitchers} />
                <PitcherSection label={`${selectedGame.home} Pitchers`} pitchers={homePitchers} onChange={setHomePitchers} />

                {/* Notes */}
                <Field label="Game Notes (optional)">
                  <textarea className={`${inputCls} min-h-[50px] resize-none`} placeholder="Ejections, injuries, protests, weather delays..." value={notes} onChange={e => setNotes(e.target.value)} />
                </Field>

                {/* Submitted by */}
                <Field label="Submitted By (Coach Name)">
                  <input className={inputCls} placeholder="Your name" value={submittedBy} onChange={e => setSubmittedBy(e.target.value)} />
                </Field>

                {/* Validation */}
                {!isValid && (
                  <div className="text-[10px] text-red-400/50">
                    Required: score for both teams, at least one pitcher with pitch count per team, and your name.
                  </div>
                )}

                {/* Submit */}
                <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between">
                  <button onClick={() => setSelectedGame(null)} className="text-xs font-bold uppercase tracking-wider text-white hover:text-white/60 transition-colors">← Back</button>
                  <button
                    onClick={handleSubmit}
                    disabled={!isValid}
                    className={`px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      isValid
                        ? "bg-[#17FC13]/10 border border-[#17FC13]/25 text-[#17FC13] hover:bg-[#17FC13]/15 hover:shadow-[0_0_20px_rgba(23,252,19,0.1)]"
                        : "bg-white/[0.02] border border-white/[0.04] text-white cursor-not-allowed"
                    }`}
                  >
                    Submit Result
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
