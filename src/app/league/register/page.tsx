"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { AGE_GROUPS, CONFERENCES } from "@/lib/constants";

// ═══════════════════════════════════════
// TYPES & HELPERS
// ═══════════════════════════════════════

const STEPS = ["Team Info", "Coach Contact", "Review"];

type FormState = {
  teamName: string;
  ageGroup: string;
  conference: string;
  coachName: string;
  coachEmail: string;
  coachPhone: string;
  notes: string;
  company: string; // honeypot — must stay empty
};

const INITIAL: FormState = {
  teamName: "", ageGroup: "", conference: "", coachName: "", coachEmail: "", coachPhone: "", notes: "", company: "",
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/** Format a US phone number progressively as the user types. */
function formatPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}
const phoneDigits = (v: string) => v.replace(/\D/g, "");

// ═══════════════════════════════════════
// SHARED UI
// ═══════════════════════════════════════

const labelCls = "block text-[11px] font-bold uppercase tracking-[0.12em] text-white mb-2";
const baseInput = "w-full bg-black/40 border rounded-xl px-4 py-3.5 text-[15px] text-white placeholder:text-white/90 focus:outline-none transition-all";

function TextField({
  label, value, onChange, placeholder, type = "text", error, inputMode, autoFocus, autoComplete,
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
  error?: string; inputMode?: "text" | "email" | "tel"; autoFocus?: boolean; autoComplete?: string;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <input
        type={type}
        inputMode={inputMode}
        value={value}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${baseInput} ${error ? "border-red-500/40 focus:border-red-500/60" : "border-white/[0.08] focus:border-[#17FC13]/40 focus:ring-1 focus:ring-[#17FC13]/15"}`}
      />
      {error && <p className="mt-1.5 text-[12px] text-red-400/80">{error}</p>}
    </div>
  );
}

// ═══════════════════════════════════════
// STEPS
// ═══════════════════════════════════════

function StepTeam({ form, set, errors }: { form: FormState; set: (f: Partial<FormState>) => void; errors: Partial<FormState> }) {
  return (
    <div className="space-y-5">
      <TextField
        label="Team Name / Town"
        value={form.teamName}
        onChange={(v) => set({ teamName: v })}
        placeholder="Town or team name"
        error={errors.teamName}
        autoFocus
        autoComplete="off"
      />
      <div>
        <label className={labelCls}>Age Group</label>
        <select
          value={form.ageGroup}
          onChange={(e) => set({ ageGroup: e.target.value })}
          className={`${baseInput} appearance-none ${errors.ageGroup ? "border-red-500/40" : "border-white/[0.08] focus:border-[#17FC13]/40"} ${form.ageGroup ? "text-white" : "text-white/90"}`}
        >
          <option value="" disabled>Select an age group</option>
          {AGE_GROUPS.map((a) => <option key={a} value={a} className="text-white bg-[#0d1117]">{a}</option>)}
        </select>
        {errors.ageGroup && <p className="mt-1.5 text-[12px] text-red-400/80">{errors.ageGroup}</p>}
      </div>
      <div>
        <label className={labelCls}>Conference</label>
        <div className="grid grid-cols-2 gap-2.5">
          {CONFERENCES.map((c) => {
            const selected = form.conference === c.value;
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => set({ conference: c.value })}
                className={`text-left px-4 py-3 rounded-xl border transition-all ${selected ? "bg-[#17FC13]/10 border-[#17FC13]/40" : "bg-black/40 border-white/[0.08] hover:border-white/[0.2]"}`}
              >
                <div className={`text-[13px] font-bold uppercase tracking-wide ${selected ? "text-[#17FC13]" : "text-white"}`}>{c.value}</div>
                <div className="text-[11px] text-white/70 mt-0.5">{c.desc}</div>
              </button>
            );
          })}
        </div>
        {errors.conference && <p className="mt-1.5 text-[12px] text-red-400/80">{errors.conference}</p>}
      </div>
    </div>
  );
}

function StepCoach({ form, set, errors }: { form: FormState; set: (f: Partial<FormState>) => void; errors: Partial<FormState> }) {
  return (
    <div className="space-y-5">
      <TextField
        label="Head Coach Name"
        value={form.coachName}
        onChange={(v) => set({ coachName: v })}
        placeholder="First and last name"
        error={errors.coachName}
        autoFocus
        autoComplete="name"
      />
      <TextField
        label="Coach Email"
        type="email"
        inputMode="email"
        value={form.coachEmail}
        onChange={(v) => set({ coachEmail: v })}
        placeholder="coach@email.com"
        error={errors.coachEmail}
        autoComplete="email"
      />
      <TextField
        label="Coach Phone Number"
        type="tel"
        inputMode="tel"
        value={form.coachPhone}
        onChange={(v) => set({ coachPhone: formatPhone(v) })}
        placeholder="(617) 555-0123"
        error={errors.coachPhone}
        autoComplete="tel"
      />
      <div>
        <label className={labelCls}>Notes <span className="text-white/90 font-medium normal-case tracking-normal">(optional)</span></label>
        <textarea
          value={form.notes}
          onChange={(e) => set({ notes: e.target.value })}
          placeholder="Anything we should know about your team?"
          rows={3}
          className={`${baseInput} border-white/[0.08] focus:border-[#17FC13]/40 focus:ring-1 focus:ring-[#17FC13]/15 resize-none`}
        />
      </div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-white/[0.05] last:border-0">
      <span className="text-[11px] font-bold uppercase tracking-wider text-white/60 shrink-0 pt-0.5">{label}</span>
      <span className="text-[14px] text-white text-right">{value || "—"}</span>
    </div>
  );
}

function StepReview({ form, goTo }: { form: FormState; goTo: (s: number) => void }) {
  return (
    <div className="space-y-4">
      <div className="bg-black/30 border border-white/[0.06] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#17FC13]/50">Team</span>
          <button onClick={() => goTo(0)} className="text-[10px] font-bold uppercase tracking-wider text-white/60 hover:text-white bg-transparent border-none cursor-pointer transition-colors">Edit</button>
        </div>
        <ReviewRow label="Team / Town" value={form.teamName} />
        <ReviewRow label="Age Group" value={form.ageGroup} />
        <ReviewRow label="Conference" value={form.conference} />
      </div>

      <div className="bg-black/30 border border-white/[0.06] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#17FC13]/50">Coach</span>
          <button onClick={() => goTo(1)} className="text-[10px] font-bold uppercase tracking-wider text-white/60 hover:text-white bg-transparent border-none cursor-pointer transition-colors">Edit</button>
        </div>
        <ReviewRow label="Head Coach" value={form.coachName} />
        <ReviewRow label="Email" value={form.coachEmail} />
        <ReviewRow label="Phone" value={form.coachPhone} />
        {form.notes && <ReviewRow label="Notes" value={form.notes} />}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// SUCCESS
// ═══════════════════════════════════════

function Success() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
      <div className="w-16 h-16 rounded-full bg-[#17FC13]/10 border border-[#17FC13]/30 flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-[#17FC13]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold uppercase mb-3">Team Registration <span className="accent-text">Submitted</span></h2>
      <p className="text-[14px] text-white/70 leading-relaxed max-w-md mx-auto mb-8">
        Thanks for registering your team. We&apos;ll review your submission and follow up with next steps. Check your email for a confirmation.
      </p>
      <div className="flex justify-center gap-3">
        <a href="/account" className="px-6 py-3 rounded-xl border border-[#17FC13]/25 bg-[#17FC13]/10 text-xs font-bold uppercase tracking-wider text-[#17FC13] no-underline hover:bg-[#17FC13]/15 transition-all">Go to Dashboard</a>
        <a href="/league" className="px-6 py-3 rounded-xl border border-white/[0.08] text-xs font-bold uppercase tracking-wider text-white hover:border-white/[0.15] no-underline transition-all">Back to League</a>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════
// PROGRESS
// ═══════════════════════════════════════

function Progress({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2 mb-7">
      {STEPS.map((label, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <div key={label} className="flex items-center gap-2 flex-1">
            <div className="flex items-center gap-2 min-w-0">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-all ${
                done ? "bg-[#17FC13]/20 text-[#17FC13] border border-[#17FC13]/40" :
                active ? "bg-[#17FC13] text-black" :
                "bg-white/[0.04] text-white/70 border border-white/[0.06]"
              }`}>
                {done ? "✓" : i + 1}
              </div>
              <span className={`text-[11px] font-bold uppercase tracking-wider hidden sm:inline truncate ${active ? "text-white" : done ? "text-[#17FC13]/60" : "text-white/55"}`}>{label}</span>
            </div>
            {i < STEPS.length - 1 && <div className={`h-px flex-1 ${done ? "bg-[#17FC13]/25" : "bg-white/[0.06]"}`} />}
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════
// MAIN
// ═══════════════════════════════════════

export default function RegisterPage() {
  const [step, setStep] = useState(0); // 0,1,2
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [done, setDone] = useState(false);

  const [signedIn, setSignedIn] = useState(false);

  // Pre-fill coach email if the visitor is already signed in.
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setSignedIn(true);
        if (user.email) setForm((p) => (p.coachEmail ? p : { ...p, coachEmail: user.email! }));
      }
    });
  }, []);

  const set = (partial: Partial<FormState>) => {
    setForm((prev) => ({ ...prev, ...partial }));
    setErrors((prev) => {
      const next = { ...prev };
      (Object.keys(partial) as (keyof FormState)[]).forEach((k) => delete next[k]);
      return next;
    });
  };

  function validateStep(s: number): boolean {
    const e: Partial<FormState> = {};
    if (s === 0) {
      if (!form.teamName.trim()) e.teamName = "Please enter your town/team name.";
      if (!form.ageGroup) e.ageGroup = "Please select an age group.";
      if (!form.conference) e.conference = "Please select a conference.";
    }
    if (s === 1) {
      if (!form.coachName.trim()) e.coachName = "Please enter the head coach's name.";
      if (!isEmail(form.coachEmail)) e.coachEmail = "Please enter a valid email address.";
      if (phoneDigits(form.coachPhone).length !== 10) e.coachPhone = "Please enter a valid phone number.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const goTo = (s: number) => setStep(s);

  function next() {
    setSubmitError("");
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 2));
  }

  async function submit() {
    // Re-validate everything before submit.
    if (!validateStep(0)) { setStep(0); return; }
    if (!validateStep(1)) { setStep(1); return; }

    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/register-team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamName: form.teamName.trim(),
          ageGroup: form.ageGroup,
          conference: form.conference,
          coachName: form.coachName.trim(),
          coachEmail: form.coachEmail.trim(),
          coachPhone: form.coachPhone.trim(),
          notes: form.notes.trim(),
          company: form.company, // honeypot
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      // Signed-in coaches go straight to the roster to start adding players.
      if (signedIn) {
        window.location.href = "/account/roster";
        return;
      }
      setDone(true);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  }

  return (
    <main className="min-h-screen relative">
      {/* Ambient hero glow */}
      <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_50%_-10%,_rgba(23,252,19,0.07)_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative pt-28 md:pt-32 pb-32 md:pb-16 px-5">
        <div className="max-w-[560px] mx-auto">
          {/* Hero */}
          <div className="text-center mb-8">
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/50 mb-3">Apex Academy League</div>
            <h1 className="text-3xl md:text-4xl uppercase font-bold leading-[0.95] mb-3">
              Register Your <span className="accent-text">Town Team</span>
            </h1>
            <p className="text-[13px] md:text-sm text-white/70 leading-relaxed max-w-md mx-auto">
              Submit your team in under a minute. Rosters, payments, and full team details can be completed later after your profile is created.
            </p>
          </div>

          {/* Card */}
          <div className="bg-[#0d1117] border border-white/[0.07] rounded-3xl p-6 md:p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]">
            {done ? (
              <Success />
            ) : (
              <>
                <Progress step={step} />

                {/* Honeypot — visually hidden, off-screen */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company}
                  onChange={(e) => set({ company: e.target.value })}
                  className="absolute -left-[9999px] w-px h-px opacity-0"
                  aria-hidden="true"
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.18 }}
                  >
                    {step === 0 && <StepTeam form={form} set={set} errors={errors} />}
                    {step === 1 && <StepCoach form={form} set={set} errors={errors} />}
                    {step === 2 && <StepReview form={form} goTo={goTo} />}
                  </motion.div>
                </AnimatePresence>

                {submitError && (
                  <div className="mt-5 flex items-center gap-2 px-4 py-3 border border-red-500/20 bg-red-500/[0.05] rounded-xl">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full shrink-0" />
                    <span className="text-xs text-red-400/80">{submitError}</span>
                  </div>
                )}

                {/* Desktop nav */}
                <div className="hidden md:flex items-center justify-between mt-7 pt-5 border-t border-white/[0.05]">
                  {step > 0 ? (
                    <button onClick={() => setStep((s) => s - 1)} className="text-xs font-bold uppercase tracking-wider text-white/80 hover:text-white bg-transparent border-none cursor-pointer transition-colors">← Back</button>
                  ) : <div />}
                  {step < 2 ? (
                    <button onClick={next} className="px-7 py-3 rounded-xl bg-[#17FC13] text-black text-xs font-bold uppercase tracking-[0.12em] cursor-pointer hover:brightness-110 hover:shadow-[0_0_28px_rgba(23,252,19,0.25)] active:scale-[0.98] transition-all">Continue</button>
                  ) : (
                    <button onClick={submit} disabled={submitting} className="px-7 py-3 rounded-xl bg-[#17FC13] text-black text-xs font-bold uppercase tracking-[0.12em] cursor-pointer hover:brightness-110 hover:shadow-[0_0_28px_rgba(23,252,19,0.25)] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                      {submitting ? "Submitting..." : "Submit Team Registration"}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          {!done && (
            <p className="text-center text-[11px] text-white/60 mt-5">
              Already registered? <a href="/account" className="text-[#17FC13] hover:text-[#17FC13] no-underline">Go to your dashboard</a>
            </p>
          )}
        </div>
      </div>

      {/* Sticky mobile action bar */}
      {!done && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-white/[0.08] px-5 py-3.5 flex items-center gap-3">
          {step > 0 && (
            <button onClick={() => setStep((s) => s - 1)} className="px-5 py-3.5 rounded-xl border border-white/[0.1] text-xs font-bold uppercase tracking-wider text-white/60 bg-transparent cursor-pointer">Back</button>
          )}
          {step < 2 ? (
            <button onClick={next} className="flex-1 px-6 py-3.5 rounded-xl bg-[#17FC13] text-black text-xs font-bold uppercase tracking-[0.12em] cursor-pointer active:scale-[0.98] transition-all">Continue</button>
          ) : (
            <button onClick={submit} disabled={submitting} className="flex-1 px-6 py-3.5 rounded-xl bg-[#17FC13] text-black text-xs font-bold uppercase tracking-[0.12em] cursor-pointer active:scale-[0.98] transition-all disabled:opacity-50">
              {submitting ? "Submitting..." : "Submit Registration"}
            </button>
          )}
        </div>
      )}
    </main>
  );
}
