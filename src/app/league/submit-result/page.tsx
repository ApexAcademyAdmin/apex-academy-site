"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { UPCOMING_GAMES } from "@/lib/league-data";

// ═══════════════════════════════════════
// TYPES
// ═══════════════════════════════════════

type PitcherEntry = { name: string; pitchCount: string; inningsPitched: string };
type SelectedGame = typeof UPCOMING_GAMES[0] | null;

const EMPTY_PITCHER: PitcherEntry = { name: "", pitchCount: "", inningsPitched: "" };

// Teams that have games on the league schedule, derived from UPCOMING_GAMES.
const SCHEDULE_TEAMS = Array.from(new Set(UPCOMING_GAMES.flatMap((g) => [g.home, g.away]))).sort();

// ═══════════════════════════════════════
// SHARED
// ═══════════════════════════════════════

const inputCls = "w-full bg-[#0d1117] border border-white/[0.06] rounded-lg px-4 py-2.5 text-[13px] text-white/90 placeholder-white/20 focus:outline-none focus:border-[#17FC13]/30 transition-colors";

// ═══════════════════════════════════════
// STEP 1 — TEAM SELECTION
// ═══════════════════════════════════════

function TeamSelection({ onSelect }: { onSelect: (t: string) => void }) {
  return (
    <Section>
      <div className="max-w-2xl">
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-2">Step 1</div>
        <h2 className="text-xl font-bold uppercase mb-1">Select <span className="accent-text">Team</span></h2>
        <p className="text-[12px] text-white/70 mb-6">Choose your team to report a result for one of its games.</p>
        {SCHEDULE_TEAMS.length === 0 ? (
          <div className="text-center py-12 text-sm text-white/70">No scheduled games yet.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {SCHEDULE_TEAMS.map((t) => (
              <button key={t} onClick={() => onSelect(t)}
                className="bg-[#0d1117] rounded-xl border border-white/[0.04] px-4 py-3 text-[13px] font-semibold text-white/80 hover:text-white hover:border-[#17FC13]/15 transition-all text-left">
                {t}
              </button>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════
// STEP 2 — GAME SELECTION
// ═══════════════════════════════════════

function GameSelection({ team, onSelect, onBack }: { team: string; onSelect: (g: typeof UPCOMING_GAMES[0]) => void; onBack: () => void }) {
  // Only games on this team's schedule
  const teamGames = UPCOMING_GAMES.filter((g) => g.home === team || g.away === team);
  const grouped: Record<string, typeof UPCOMING_GAMES> = {};
  for (const g of teamGames) {
    if (!grouped[g.date]) grouped[g.date] = [];
    grouped[g.date].push(g);
  }

  return (
    <Section>
      <div className="max-w-2xl">
        <button onClick={onBack} className="text-[10px] font-bold uppercase tracking-wider text-white/60 hover:text-white bg-transparent border-none cursor-pointer mb-3">&larr; Change team</button>
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-2">Step 2</div>
        <h2 className="text-xl font-bold uppercase mb-1">Select <span className="accent-text">Game</span></h2>
        <p className="text-[12px] text-white/70 mb-6">{`Showing games on ${team}'s schedule.`}</p>

        <div className="space-y-6">
          {Object.entries(grouped).map(([date, games]) => (
            <div key={date}>
              <div className="text-[10px] font-bold uppercase tracking-wider text-white/60 mb-2">{date}</div>
              <div className="space-y-2">
                {games.map(g => (
                  <button key={g.id} onClick={() => onSelect(g)}
                    className="w-full text-left bg-[#0d1117] rounded-xl border border-white/[0.04] p-4 hover:border-[#17FC13]/15 transition-all group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] text-white/80">{g.ageGroup} {g.division}</span>
                      <span className="text-[11px] font-mono text-white/65">{g.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-white/80 group-hover:text-white transition-colors">{g.away}</span>
                      <span className="text-[11px] text-white/60 uppercase">at</span>
                      <span className="text-[14px] font-bold text-white/80 group-hover:text-white transition-colors">{g.home}</span>
                    </div>
                    <div className="text-[11px] text-white/60 mt-1">{g.location}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {teamGames.length === 0 && (
          <div className="text-center py-12 text-sm text-white/70">{`No games on ${team}'s schedule yet.`}</div>
        )}
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════
// PITCHER LOG
// ═══════════════════════════════════════

function PitcherLog({ teamName, pitchers, onChange }: {
  teamName: string;
  pitchers: PitcherEntry[];
  onChange: (p: PitcherEntry[]) => void;
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
    <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.04]">
        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/90">{teamName}</span>
        <span className="text-[11px] font-mono text-white/80">
          Total: <span className={`font-bold ${totalPitches > 105 ? "text-red-400" : "text-[#17FC13]/70"}`}>{totalPitches}</span> pitches
        </span>
      </div>

      <div className="p-4 space-y-2">
        {/* Column headers */}
        <div className="grid grid-cols-[1fr_80px_80px_28px] gap-3 px-1">
          <span className="text-[9px] font-bold uppercase tracking-wider text-white/60">Name</span>
          <span className="text-[9px] font-bold uppercase tracking-wider text-white/60">Pitches</span>
          <span className="text-[9px] font-bold uppercase tracking-wider text-white/60">IP</span>
          <span />
        </div>

        {pitchers.map((p, i) => (
          <div key={i} className="grid grid-cols-[1fr_80px_80px_28px] gap-3 items-center">
            <input className={inputCls} placeholder="Pitcher name" value={p.name} onChange={e => update(i, "name", e.target.value)} />
            <input className={`${inputCls} text-center`} type="number" placeholder="0" value={p.pitchCount} onChange={e => update(i, "pitchCount", e.target.value)} />
            <input className={`${inputCls} text-center`} placeholder="0.0" value={p.inningsPitched} onChange={e => update(i, "inningsPitched", e.target.value)} />
            {pitchers.length > 1 ? (
              <button type="button" onClick={() => remove(i)} className="w-7 h-7 rounded-lg flex items-center justify-center text-white/55 hover:text-red-400/60 hover:bg-red-400/5 transition-all text-xs">✕</button>
            ) : <span />}
          </div>
        ))}

        <button type="button" onClick={add}
          className="w-full py-2.5 mt-1 rounded-lg border border-dashed border-white/[0.06] text-[10px] font-bold uppercase tracking-wider text-white/60 hover:text-white/80 hover:border-white/[0.12] transition-all">
          + Add Pitcher
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// STEP 2 — ENTER RESULT
// ═══════════════════════════════════════

function EnterResult({ game, onBack }: { game: typeof UPCOMING_GAMES[0]; onBack: () => void }) {
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
  const isValid = homeScore && awayScore && homePitchersValid && awayPitchersValid && submittedBy;

  const handleSubmit = () => {
    if (!isValid) return;
    console.log("Game result submitted:", { game, homeScore, awayScore, homePitchers, awayPitchers, notes, submittedBy, submittedEmail });
    setSubmitted(true);
  };

  if (submitted) {
    const homeWin = parseInt(homeScore) > parseInt(awayScore);
    return (
      <Section>
        <div className="max-w-md mx-auto text-center py-8">
          <div className="w-14 h-14 rounded-full bg-[#17FC13]/10 border border-[#17FC13]/25 flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-[#17FC13]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold uppercase mb-2">Result <span className="accent-text">Submitted</span></h2>
          <p className="text-sm text-white/80 mb-8">Pitch counts and scores have been recorded. Standings will be updated within 24 hours.</p>

          <div className="bg-[#0d1117] rounded-2xl border border-white/[0.04] overflow-hidden mb-8">
            <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/[0.03]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">{game.ageGroup} {game.division}</span>
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.06] text-white/90">Final</span>
            </div>
            <div className="px-5 py-4 space-y-1.5">
              <div className={`flex items-center justify-between ${!homeWin ? "" : "opacity-50"}`}>
                <div className="flex items-center gap-2">
                  {!homeWin && <span className="w-1 h-5 rounded-full bg-[#17FC13]" />}
                  {homeWin && <span className="w-1 h-5 rounded-full bg-transparent" />}
                  <span className="text-lg font-bold text-white">{game.away}</span>
                </div>
                <span className="text-2xl font-bold font-mono text-white">{awayScore}</span>
              </div>
              <div className={`flex items-center justify-between ${homeWin ? "" : "opacity-50"}`}>
                <div className="flex items-center gap-2">
                  {homeWin && <span className="w-1 h-5 rounded-full bg-[#17FC13]" />}
                  {!homeWin && <span className="w-1 h-5 rounded-full bg-transparent" />}
                  <span className="text-lg font-bold text-white">{game.home}</span>
                </div>
                <span className="text-2xl font-bold font-mono text-white">{homeScore}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <a href="/league" className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-[#17FC13] bg-[#17FC13]/10 text-white text-[13px] font-bold uppercase tracking-wide no-underline hover:shadow-[0_0_20px_rgba(23,252,19,0.15)] transition-all">League Home</a>
            <a href="/league/results" className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-white/[0.08] text-white/60 text-[13px] font-bold uppercase tracking-wide no-underline hover:border-white/[0.15] transition-all">View Results</a>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="max-w-2xl">
        {/* Selected game header */}
        <div className="bg-[#0d1117] rounded-2xl border border-[#17FC13]/10 p-5 mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#17FC13]/10 text-[#17FC13]/50">{game.ageGroup} {game.division}</span>
              <span className="text-[11px] font-mono text-white/70">{game.date} &middot; {game.time}</span>
            </div>
            <button onClick={onBack} className="text-[10px] font-bold uppercase tracking-wider text-white/65 hover:text-white/90 transition-colors">Change Game</button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-white/90">{game.away}</span>
            <span className="text-[11px] text-white/60 uppercase">at</span>
            <span className="text-base font-bold text-white/90">{game.home}</span>
          </div>
          <div className="text-[11px] text-white/60 mt-1">{game.location}</div>
        </div>

        {/* Score entry */}
        <div className="mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-4">Final Score</div>
          <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-5">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-white/80 mb-1">{game.away} <span className="text-white/60 font-normal">(Away)</span></div>
                <input className={`${inputCls} text-center text-2xl font-bold font-mono py-4`} type="number" placeholder="0" value={awayScore} onChange={e => setAwayScore(e.target.value)} />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-white/80 mb-1">{game.home} <span className="text-white/60 font-normal">(Home)</span></div>
                <input className={`${inputCls} text-center text-2xl font-bold font-mono py-4`} type="number" placeholder="0" value={homeScore} onChange={e => setHomeScore(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* Pitching logs */}
        <div className="mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-4">Pitching Log</div>
          <div className="space-y-4">
            <PitcherLog teamName={game.away} pitchers={awayPitchers} onChange={setAwayPitchers} />
            <PitcherLog teamName={game.home} pitchers={homePitchers} onChange={setHomePitchers} />
          </div>
        </div>

        {/* Additional info */}
        <div className="mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-4">Additional Information</div>
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1.5">Submitted By *</div>
                <input className={inputCls} placeholder="Coach name" value={submittedBy} onChange={e => setSubmittedBy(e.target.value)} />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1.5">Email</div>
                <input className={inputCls} type="email" placeholder="coach@email.com" value={submittedEmail} onChange={e => setSubmittedEmail(e.target.value)} />
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1.5">Game Notes <span className="text-white/55">(optional)</span></div>
              <textarea className={`${inputCls} resize-none min-h-[70px]`} placeholder="Ejections, injuries, weather delays, protests..." value={notes} onChange={e => setNotes(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Validation + Submit */}
        {!isValid && (homeScore || awayScore) && (
          <div className="mb-4 px-4 py-2.5 rounded-lg bg-red-500/5 border border-red-500/10 text-[11px] text-red-400/60">
            Please enter scores for both teams, at least one pitcher with pitch count per team, and your name.
          </div>
        )}

        <div className="flex items-center justify-between pt-6 border-t border-white/[0.04]">
          <button onClick={onBack} className="text-[11px] font-bold uppercase tracking-wider text-white/65 hover:text-white/90 transition-colors">← Select Different Game</button>
          <button onClick={handleSubmit} disabled={!isValid}
            className={`px-8 py-3 rounded-full text-[12px] font-bold uppercase tracking-wider transition-all ${
              isValid
                ? "bg-gradient-to-t from-[#17FC13]/20 to-transparent border border-[#17FC13] text-white hover:shadow-[0_0_20px_rgba(23,252,19,0.15)]"
                : "bg-white/[0.02] border border-white/[0.06] text-white/60 cursor-not-allowed"
            }`}>
            Submit Result
          </button>
        </div>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════

export default function SubmitResultPage() {
  const [team, setTeam] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<SelectedGame>(null);

  return (
    <main>
      <PageHeader
        title="Submit Game"
        accent="Result"
        subtitle="Report the final score and pitching log for a completed game. Pitch counts are required for both teams."
        breadcrumb={[{ label: "League", href: "/league" }]}
        actions={[
          { label: "Results", href: "/league/results" },
          { label: "Standings", href: "/league/standings" },
        ]}
      />

      {!team ? (
        <TeamSelection onSelect={setTeam} />
      ) : !selectedGame ? (
        <GameSelection team={team} onSelect={setSelectedGame} onBack={() => setTeam(null)} />
      ) : (
        <EnterResult game={selectedGame} onBack={() => setSelectedGame(null)} />
      )}
    </main>
  );
}
