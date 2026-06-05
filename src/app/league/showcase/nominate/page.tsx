"use client";

import { useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";

type FormData = {
  coachName: string;
  coachEmail: string;
  coachPhone: string;
  coachRole: string;
  organization: string;
  playerName: string;
  playerAge: string;
  playerGradYear: string;
  playerPosition: string;
  playerSecondary: string;
  playerSchool: string;
  playerCity: string;
  playerState: string;
  reason: string;
};

const POSITIONS = ["RHP", "LHP", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF", "UTL"];
const AGE_GROUPS = ["16U", "17U", "18U"];
const GRAD_YEARS = ["2026", "2027", "2028", "2029"];

const EMPTY: FormData = {
  coachName: "", coachEmail: "", coachPhone: "", coachRole: "", organization: "",
  playerName: "", playerAge: "", playerGradYear: "", playerPosition: "", playerSecondary: "",
  playerSchool: "", playerCity: "", playerState: "MA", reason: "",
};

export default function NominatePage() {
  const [form, setForm] = useState<FormData>({ ...EMPTY });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function update(field: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/nominate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Submission failed");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = "w-full bg-[#0d1117] border border-white/[0.06] rounded-lg px-4 py-2.5 text-[13px] text-white/90 placeholder-white/20 focus:outline-none focus:border-[#17FC13]/30 transition-colors";
  const selectClass = "w-full bg-[#0d1117] border border-white/[0.06] rounded-lg px-4 py-2.5 text-[13px] text-white/90 focus:outline-none focus:border-[#17FC13]/30 transition-colors appearance-none";
  const labelClass = "block text-[11px] font-bold uppercase tracking-[0.15em] text-white/40 mb-1.5";

  const breadcrumb = (
    <div className="flex items-center gap-2 mb-6 text-[10px] font-medium uppercase tracking-[0.2em]">
      <a href="/" className="text-white/25 no-underline hover:text-white/50 transition-colors">Home</a>
      <span className="text-white/10">/</span>
      <a href="/league" className="text-white/25 no-underline hover:text-white/50 transition-colors">League</a>
      <span className="text-white/10">/</span>
      <a href="/league/showcase" className="text-white/25 no-underline hover:text-white/50 transition-colors">All-New England Prospect Games</a>
      <span className="text-white/10">/</span>
      <span className="text-[#17FC13]/60">Nominate</span>
    </div>
  );

  if (submitted) {
    return (
      <main>
        <div className="pt-24 md:pt-32 pb-4">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">{breadcrumb}</div>
        </div>
        <Section size="lg">
          <FadeIn>
            <div className="text-center max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-[#17FC13]/10 border border-[#17FC13]/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-[#17FC13] text-lg">&#10003;</span>
              </div>
              <h2 className="text-2xl md:text-3xl uppercase font-bold mb-3">Nomination <span className="accent-text">Received</span></h2>
              <p className="text-sm text-white/50 mb-6 leading-relaxed">
                Thank you for nominating a prospect. Our staff will review the submission and follow up with the player and their family.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button href="/league/showcase">Back to Event</Button>
                <Button variant="secondary" href="#" onClick={() => { setSubmitted(false); setForm({ ...EMPTY }); }}>Nominate Another</Button>
              </div>
            </div>
          </FadeIn>
        </Section>
      </main>
    );
  }

  return (
    <main>
      <div className="pt-24 md:pt-32 pb-4">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          {breadcrumb}

          <h1 className="text-3xl md:text-4xl uppercase font-bold leading-[0.9] mb-3">
            Nominate a <span className="accent-text">Prospect</span>
          </h1>
          <p className="text-sm text-white/50 max-w-lg leading-relaxed">
            Coaches, trainers, and program directors can nominate players for the All-New England Prospect Games. Complete the form below and our staff will review each nomination.
          </p>
        </div>
      </div>

      <Section border="top">
        <FadeIn>
          <form onSubmit={handleSubmit} className="max-w-2xl">
            {/* COACH INFO */}
            <div className="mb-8">
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-4">Your Information</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input type="text" required value={form.coachName} onChange={e => update("coachName", e.target.value)} placeholder="John Smith" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input type="email" required value={form.coachEmail} onChange={e => update("coachEmail", e.target.value)} placeholder="coach@example.com" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input type="tel" value={form.coachPhone} onChange={e => update("coachPhone", e.target.value)} placeholder="(617) 555-0100" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Role *</label>
                  <input type="text" required value={form.coachRole} onChange={e => update("coachRole", e.target.value)} placeholder="Head Coach, Trainer, etc." className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Organization / Program *</label>
                  <input type="text" required value={form.organization} onChange={e => update("organization", e.target.value)} placeholder="Team or program name" className={inputClass} />
                </div>
              </div>
            </div>

            {/* PLAYER INFO */}
            <div className="mb-8">
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-4">Player Information</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className={labelClass}>Player Full Name *</label>
                  <input type="text" required value={form.playerName} onChange={e => update("playerName", e.target.value)} placeholder="Player's full name" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Age Group *</label>
                  <select required value={form.playerAge} onChange={e => update("playerAge", e.target.value)} className={selectClass}>
                    <option value="">Select</option>
                    {AGE_GROUPS.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Graduation Year *</label>
                  <select required value={form.playerGradYear} onChange={e => update("playerGradYear", e.target.value)} className={selectClass}>
                    <option value="">Select</option>
                    {GRAD_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Primary Position *</label>
                  <select required value={form.playerPosition} onChange={e => update("playerPosition", e.target.value)} className={selectClass}>
                    <option value="">Select</option>
                    {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Secondary Position</label>
                  <select value={form.playerSecondary} onChange={e => update("playerSecondary", e.target.value)} className={selectClass}>
                    <option value="">None</option>
                    {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>High School *</label>
                  <input type="text" required value={form.playerSchool} onChange={e => update("playerSchool", e.target.value)} placeholder="School name" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>City *</label>
                  <input type="text" required value={form.playerCity} onChange={e => update("playerCity", e.target.value)} placeholder="City" className={inputClass} />
                </div>
              </div>
            </div>

            {/* REASON */}
            <div className="mb-8">
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-4">Nomination Details</div>
              <div>
                <label className={labelClass}>Why should this player be considered? *</label>
                <textarea required value={form.reason} onChange={e => update("reason", e.target.value)} rows={4} placeholder="Describe the player's abilities, stats, achievements, and why they deserve exposure at this event." className={`${inputClass} resize-none`} />
              </div>
            </div>

            {error && (
              <div className="mb-4 px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-[12px] text-red-400">
                {error}
              </div>
            )}

            <div className="flex items-center gap-4">
              <button type="submit" disabled={submitting}
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-[#17FC13] bg-gradient-to-t from-[#17FC13]/20 to-transparent text-white font-bold uppercase px-6 py-2.5 text-[13px] tracking-wide transition-all duration-200 hover:shadow-[0_0_20px_rgba(23,252,19,0.15)] disabled:opacity-50 disabled:cursor-not-allowed">
                {submitting ? "Submitting..." : "Submit Nomination"}
              </button>
              <span className="text-[11px] text-white/30">* Required fields</span>
            </div>
          </form>
        </FadeIn>
      </Section>
    </main>
  );
}
