"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

// ═══════════════════════════════════════
// TYPES
// ═══════════════════════════════════════

const STEPS = [
  { id: 1, label: "Organization" },
  { id: 2, label: "Team" },
  { id: 3, label: "Staff" },
  { id: 4, label: "League" },
  { id: 5, label: "Review" },
  { id: 6, label: "Confirmation" },
];

const AGE_DIVISIONS = [
  { label: "10U", ages: "Ages 9-10", group: "Youth" },
  { label: "12U", ages: "Ages 11-12", group: "Youth" },
  { label: "14U", ages: "Ages 13-14", group: "Middle School" },
  { label: "16U", ages: "Ages 15-16", group: "High School" },
  { label: "18U", ages: "Ages 17-18", group: "High School" },
];
const LEAGUE_LEVELS = [
  { value: "Premier Division", desc: "The highest level of competition — established travel programs and experienced rosters" },
  { value: "Prospect Division", desc: "Development-focused competition — growing programs, emerging players, and building experience" },
];
const SCHEDULE_DAYS = ["Tuesday", "Wednesday", "Thursday"];
const STATES = ["MA", "CT", "RI", "NH", "ME", "VT", "NY", "NJ", "PA"];

type Coach = { name: string; email: string; phone: string; role: string };

type FormState = {
  // Step 1: Org
  orgName: string; orgWebsite: string;
  city: string; state: string;
  // Step 2: Team
  teamName: string; ageDivision: string; leagueLevel: string;
  primaryColor: string; secondaryColor: string;
  homeField: string; homeFieldAddress: string;
  // Step 3: Staff (coaches[0] is the head coach / primary contact)
  coaches: Coach[];
  // Step 4: League
  preferredDays: string[]; preferredHomeGames: string; travelLimit: string; specialRequests: string;
};

const EMPTY_COACH: Coach = { name: "", email: "", phone: "", role: "" };

const INITIAL: FormState = {
  orgName: "", orgWebsite: "",
  city: "", state: "MA",
  teamName: "", ageDivision: "12U", leagueLevel: "Premier Division",
  primaryColor: "#000000", secondaryColor: "#ffffff",
  homeField: "", homeFieldAddress: "",
  coaches: [{ ...EMPTY_COACH, role: "Head Coach" }],
  preferredDays: ["Tuesday", "Wednesday", "Thursday"],
  preferredHomeGames: "", travelLimit: "", specialRequests: "",
};

// ═══════════════════════════════════════
// SHARED UI
// ═══════════════════════════════════════

const inputCls = "w-full bg-[#0d1117] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#17FC13]/30 focus:ring-1 focus:ring-[#17FC13]/10 transition-all";
const selectCls = `${inputCls} appearance-none`;
const labelCls = "block text-[9px] font-bold uppercase tracking-[0.12em] text-white mb-1";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

function StepHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold uppercase mb-1">{title}</h2>
      <p className="text-[11px] text-white/50">{desc}</p>
    </div>
  );
}

// ═══════════════════════════════════════
// STEP COMPONENTS
// ═══════════════════════════════════════

function Step1({ form, set }: { form: FormState; set: (f: Partial<FormState>) => void }) {
  return (
    <>
      <StepHeader title="Organization" desc="Tell us about your baseball organization or program." />
      <div className="space-y-3">
        <Field label="Organization Name">
          <input className={inputCls} placeholder="e.g. South Shore Baseball" value={form.orgName} onChange={e => set({ orgName: e.target.value })} />
        </Field>
        <Field label="Website (optional)">
          <input className={inputCls} placeholder="https://yourorg.com" value={form.orgWebsite} onChange={e => set({ orgWebsite: e.target.value })} />
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <Field label="City">
            <input className={inputCls} placeholder="Braintree" value={form.city} onChange={e => set({ city: e.target.value })} />
          </Field>
          <Field label="State">
            <select className={selectCls} value={form.state} onChange={e => set({ state: e.target.value })}>
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
        </div>
      </div>
    </>
  );
}

function Step2({ form, set }: { form: FormState; set: (f: Partial<FormState>) => void }) {
  return (
    <>
      <StepHeader title="Team Information" desc="Details about the team you're registering for the league." />
      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <Field label="Team Name">
            <input className={inputCls} placeholder="e.g. Braintree Bombers" value={form.teamName} onChange={e => set({ teamName: e.target.value })} />
          </Field>
          <Field label="Age Division">
            <select className={selectCls} value={form.ageDivision} onChange={e => set({ ageDivision: e.target.value })}>
              {["Youth", "Middle School", "High School"].map(group => (
                <optgroup key={group} label={group}>
                  {AGE_DIVISIONS.filter(d => d.group === group).map(d => (
                    <option key={d.label} value={d.label}>{d.label} — {d.ages}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Division Preference">
          <div className="space-y-2">
            {LEAGUE_LEVELS.map(l => (
              <button key={l.value} type="button" onClick={() => set({ leagueLevel: l.value })}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${form.leagueLevel === l.value ? "bg-[#17FC13]/10 border border-[#17FC13]/25" : "bg-[#0d1117] border border-white/[0.06] hover:border-white/[0.1]"}`}>
                <div className={`text-xs font-bold uppercase tracking-wider ${form.leagueLevel === l.value ? "text-[#17FC13]" : "text-white"}`}>{l.value}</div>
                <div className="text-[11px] text-white/50 mt-0.5">{l.desc}</div>
              </button>
            ))}
          </div>
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <Field label="Home Field">
            <input className={inputCls} placeholder="e.g. Braintree High School" value={form.homeField} onChange={e => set({ homeField: e.target.value })} />
          </Field>
          <Field label="Home Field Address">
            <input className={inputCls} placeholder="128 Town St, Braintree MA" value={form.homeFieldAddress} onChange={e => set({ homeFieldAddress: e.target.value })} />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Primary Color">
            <div className="flex items-center gap-3">
              <input type="color" value={form.primaryColor} onChange={e => set({ primaryColor: e.target.value })} className="w-10 h-10 rounded-lg border border-white/[0.06] bg-transparent cursor-pointer" />
              <span className="text-xs text-white font-mono">{form.primaryColor}</span>
            </div>
          </Field>
          <Field label="Secondary Color">
            <div className="flex items-center gap-3">
              <input type="color" value={form.secondaryColor} onChange={e => set({ secondaryColor: e.target.value })} className="w-10 h-10 rounded-lg border border-white/[0.06] bg-transparent cursor-pointer" />
              <span className="text-xs text-white font-mono">{form.secondaryColor}</span>
            </div>
          </Field>
        </div>
      </div>
    </>
  );
}

function Step3({ form, set, accountEmail }: { form: FormState; set: (f: Partial<FormState>) => void; accountEmail: string }) {
  const updateCoach = (i: number, field: keyof Coach, val: string) => {
    const coaches = [...form.coaches];
    coaches[i] = { ...coaches[i], [field]: val };
    set({ coaches });
  };
  const addCoach = () => set({ coaches: [...form.coaches, { ...EMPTY_COACH, role: "Assistant Coach" }] });
  const removeCoach = (i: number) => {
    if (i === 0) return; // head coach is required
    set({ coaches: form.coaches.filter((_, idx) => idx !== i) });
  };

  return (
    <>
      <StepHeader title="Coaching Staff" desc="Your head coach is the team's primary contact. Add assistants if you'd like — they can be invited later." />
      <div className="space-y-3">
        {form.coaches.map((c, i) => (
          <div key={i} className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-3.5">
            <div className="flex items-center justify-between mb-2.5">
              <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#17FC13]/40">
                {i === 0 ? "Head Coach · Primary Contact" : `Assistant Coach ${i}`}
              </div>
              {i > 0 && (
                <button type="button" onClick={() => removeCoach(i)} className="text-[10px] text-red-400/40 hover:text-red-400/70 transition-colors uppercase tracking-wider font-bold">Remove</button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              <Field label="Full Name">
                <input className={inputCls} placeholder="Coach name" value={c.name} onChange={e => updateCoach(i, "name", e.target.value)} />
              </Field>
              <Field label="Role">
                <input className={inputCls} placeholder={i === 0 ? "Head Coach" : "Assistant Coach"} value={c.role} onChange={e => updateCoach(i, "role", e.target.value)} />
              </Field>
              <Field label={i === 0 ? "Email (your account)" : "Email"}>
                {i === 0 ? (
                  <input className={`${inputCls} opacity-60 cursor-not-allowed`} value={accountEmail} disabled />
                ) : (
                  <input className={inputCls} type="email" placeholder="coach@email.com" value={c.email} onChange={e => updateCoach(i, "email", e.target.value)} />
                )}
              </Field>
              <Field label="Phone">
                <input className={inputCls} type="tel" placeholder="(617) 555-0000" value={c.phone} onChange={e => updateCoach(i, "phone", e.target.value)} />
              </Field>
            </div>
          </div>
        ))}
        <button type="button" onClick={addCoach}
          className="w-full py-3 rounded-xl border border-dashed border-white/[0.08] text-xs font-bold uppercase tracking-wider text-white/50 hover:text-white hover:border-white/[0.15] transition-all">
          + Add Assistant Coach
        </button>
      </div>
    </>
  );
}

function Step4({ form, set }: { form: FormState; set: (f: Partial<FormState>) => void }) {
  const toggleDay = (day: string) => {
    const days = form.preferredDays.includes(day) ? form.preferredDays.filter(d => d !== day) : [...form.preferredDays, day];
    set({ preferredDays: days });
  };

  return (
    <>
      <StepHeader title="League Details" desc="Scheduling preferences and any special requests for the season." />
      <div className="space-y-3">
        <Field label="Preferred Game Days">
          <div className="flex gap-2">
            {SCHEDULE_DAYS.map(day => (
              <button key={day} type="button" onClick={() => toggleDay(day)}
                className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${form.preferredDays.includes(day) ? "bg-[#17FC13]/10 text-[#17FC13] border border-[#17FC13]/25" : "text-white border border-white/[0.06]"}`}>
                {day}
              </button>
            ))}
          </div>
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <Field label="Preferred Home Games Per Week">
            <input className={inputCls} placeholder="e.g. 1-2" value={form.preferredHomeGames} onChange={e => set({ preferredHomeGames: e.target.value })} />
          </Field>
          <Field label="Max Travel Distance">
            <input className={inputCls} placeholder="e.g. 30 miles" value={form.travelLimit} onChange={e => set({ travelLimit: e.target.value })} />
          </Field>
        </div>
        <Field label="Special Requests (optional)">
          <textarea className={`${inputCls} min-h-[60px] resize-none`} placeholder="Any scheduling conflicts, shared field requests, or notes for league operations..." value={form.specialRequests} onChange={e => set({ specialRequests: e.target.value })} />
        </Field>
      </div>
    </>
  );
}

function StepReview({ form, accountEmail }: { form: FormState; accountEmail: string }) {
  const coachCount = form.coaches.filter(c => c.name.trim()).length;
  const head = form.coaches[0];

  return (
    <>
      <StepHeader title="Review & Submit" desc="Confirm your team details. This team will be added to your account." />
      <div className="space-y-4">
        <div className="bg-[#0d1117] rounded-2xl border border-[#17FC13]/10 p-5">
          <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#17FC13]/40 mb-2">Registering Under</div>
          <div className="text-sm text-white">{accountEmail}</div>
          <p className="text-[11px] text-white/40 mt-1.5">Your team will appear in your dashboard right away with a status of Pending Review.</p>
        </div>

        {[
          { label: "Organization", items: [form.orgName, `${form.city}${form.city ? ", " : ""}${form.state}`, form.orgWebsite] },
          { label: "Team", items: [form.teamName, `${form.ageDivision} — ${form.leagueLevel}`, form.homeField] },
          { label: "Staff", items: [`${coachCount} coach${coachCount !== 1 ? "es" : ""}`, ...form.coaches.filter(c => c.name).map((c, i) => `${c.name} — ${c.role}${i === 0 ? " (Primary Contact)" : ""}`)] },
          { label: "Schedule", items: [form.preferredDays.join(", ") || "All days", form.travelLimit ? `Max travel: ${form.travelLimit}` : "No travel limit"] },
          { label: "Roster", items: ["Add your players after registration from your dashboard"] },
        ].map(section => (
          <div key={section.label} className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-3.5">
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#17FC13]/40 mb-3">{section.label}</div>
            {section.items.filter(Boolean).map((item, i) => (
              <div key={i} className="text-sm text-white py-0.5">{item}</div>
            ))}
          </div>
        ))}

        <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-3.5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-white mb-1">Registration Fee</div>
            <div className="text-2xl font-bold text-white">$175</div>
          </div>
          <div className="text-[10px] text-white/50 text-right">
            <div>per team</div>
            <div>Invoice sent after approval</div>
          </div>
        </div>
      </div>
    </>
  );
}

function StepConfirmation() {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 rounded-full bg-[#17FC13]/10 border border-[#17FC13]/30 flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-[#17FC13]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold uppercase mb-2">Team <span className="accent-text">Registered</span></h2>
      <p className="text-sm text-white/50 mb-8 max-w-md mx-auto">Your team has been added to your account and submitted for review. Next, add your roster from your dashboard while our league operations team reviews your registration.</p>

      <div className="flex justify-center gap-3">
        <a href="/account/roster" className="px-6 py-2.5 rounded-xl border border-[#17FC13]/25 bg-[#17FC13]/10 text-xs font-bold uppercase tracking-wider text-[#17FC13] no-underline hover:bg-[#17FC13]/15 transition-all">
          Add Roster
        </a>
        <a href="/account" className="px-6 py-2.5 rounded-xl border border-white/[0.06] text-xs font-bold uppercase tracking-wider text-white hover:text-white no-underline transition-all">
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// PROGRESS BAR
// ═══════════════════════════════════════

function Progress({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-1 mb-5 overflow-x-auto pb-1">
      {STEPS.map((s, i) => {
        const done = i + 1 < step;
        const active = i + 1 === step;
        return (
          <div key={s.id} className="flex items-center gap-1 flex-shrink-0">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold transition-all ${
              done ? "bg-[#17FC13]/20 text-[#17FC13] border border-[#17FC13]/30" :
              active ? "bg-white/[0.06] text-white border border-white/[0.15]" :
              "bg-white/[0.02] text-white/40 border border-white/[0.04]"
            }`}>
              {done ? "✓" : s.id}
            </div>
            <span className={`text-[9px] font-bold uppercase tracking-wider mr-2 ${active ? "text-white" : done ? "text-[#17FC13]/40" : "text-white/40"}`}>
              {s.label}
            </span>
            {i < STEPS.length - 1 && <div className={`w-4 h-px mr-1 ${done ? "bg-[#17FC13]/20" : "bg-white/[0.04]"}`} />}
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════
// AUTH GATE
// ═══════════════════════════════════════

function AuthGate() {
  return (
    <div className="bg-[#0d1117] rounded-2xl border border-white/[0.06] p-8 text-center max-w-md mx-auto">
      <div className="w-12 h-12 rounded-full bg-[#17FC13]/[0.06] border border-[#17FC13]/20 flex items-center justify-center mx-auto mb-5">
        <svg className="w-5 h-5 text-[#17FC13]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <h2 className="text-lg font-bold uppercase mb-2">Sign In to Register</h2>
      <p className="text-[12px] text-white/40 mb-6 leading-relaxed">
        Team registration is tied to your Apex Academy account, so your team shows up in your dashboard. Sign in or create an account to continue.
      </p>
      <div className="flex justify-center gap-3">
        <a href="/signin" className="px-6 py-2.5 rounded-xl border border-[#17FC13]/25 bg-[#17FC13]/10 text-xs font-bold uppercase tracking-wider text-[#17FC13] no-underline hover:bg-[#17FC13]/15 transition-all">
          Sign In
        </a>
        <a href="/signup" className="px-6 py-2.5 rounded-xl border border-white/[0.06] text-xs font-bold uppercase tracking-wider text-white hover:border-white/[0.15] no-underline transition-all">
          Create Account
        </a>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════

export default function RegisterPage() {
  const [authChecked, setAuthChecked] = useState(false);
  const [accountEmail, setAccountEmail] = useState<string | null>(null);
  const [hasTeam, setHasTeam] = useState(false);

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [regError, setRegError] = useState("");

  useEffect(() => {
    async function check() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setAccountEmail(user.email || "");
        // Pre-fill the head coach email with the account email.
        setForm(prev => ({
          ...prev,
          coaches: prev.coaches.map((c, i) => (i === 0 ? { ...c, email: user.email || "" } : c)),
        }));
        // One team per account — if they already have one, send them to manage it.
        const { data: existing } = await supabase.from("teams").select("id").eq("user_id", user.id).maybeSingle();
        if (existing) setHasTeam(true);
      }
      setAuthChecked(true);
    }
    check();
  }, []);

  const set = (partial: Partial<FormState>) => setForm(prev => ({ ...prev, ...partial }));
  const back = () => setStep(s => Math.max(s - 1, 1));

  const next = async () => {
    setRegError("");

    // Lightweight per-step validation
    if (step === 1 && !form.orgName.trim()) { setRegError("Organization name is required."); return; }
    if (step === 2 && !form.teamName.trim()) { setRegError("Team name is required."); return; }
    if (step === 3 && !form.coaches[0]?.name.trim()) { setRegError("Head coach name is required."); return; }

    if (step === 5) {
      setSubmitting(true);
      try {
        const res = await fetch("/api/register-team", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) {
          setRegError(data.error || "Registration failed.");
          setSubmitting(false);
          return;
        }
        setStep(6);
      } catch {
        setRegError("Something went wrong. Please try again.");
      }
      setSubmitting(false);
      return;
    }
    setStep(s => Math.min(s + 1, 5));
  };

  return (
    <main className="min-h-screen">
      <div className="pt-20 md:pt-24 pb-8">
        <div className="max-w-[800px] mx-auto px-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-[10px] font-medium uppercase tracking-[0.2em]">
              <a href="/" className="text-white/40 no-underline hover:text-white transition-colors">Home</a>
              <span className="text-white/20">/</span>
              <a href="/league" className="text-white/40 no-underline hover:text-white transition-colors">League</a>
              <span className="text-white/20">/</span>
              <span className="text-[#17FC13]/60">Register</span>
            </div>
            <h1 className="text-2xl md:text-3xl uppercase font-bold leading-[0.9] mb-1">
              Team <span className="accent-text">Registration</span>
            </h1>
            <p className="text-[11px] text-white/50 mb-4">Register your team for the Apex Academy League. Takes about 5 minutes.</p>
          </div>

          {!authChecked ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-5 h-5 border-2 border-[#17FC13]/30 border-t-[#17FC13] rounded-full animate-spin" />
            </div>
          ) : !accountEmail ? (
            <AuthGate />
          ) : hasTeam ? (
            <div className="bg-[#0d1117] rounded-2xl border border-white/[0.06] p-8 text-center max-w-md mx-auto">
              <h2 className="text-lg font-bold uppercase mb-2">You Already Have a Team</h2>
              <p className="text-[12px] text-white/40 mb-6">Your account already has a registered team. Manage it from your dashboard.</p>
              <div className="flex justify-center gap-3">
                <a href="/account/team" className="px-6 py-2.5 rounded-xl border border-[#17FC13]/25 bg-[#17FC13]/10 text-xs font-bold uppercase tracking-wider text-[#17FC13] no-underline hover:bg-[#17FC13]/15 transition-all">Manage Team</a>
                <a href="/account" className="px-6 py-2.5 rounded-xl border border-white/[0.06] text-xs font-bold uppercase tracking-wider text-white no-underline hover:border-white/[0.15] transition-all">Dashboard</a>
              </div>
            </div>
          ) : (
            <>
              {/* Progress */}
              <Progress step={step} />

              {/* Step content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {step === 1 && <Step1 form={form} set={set} />}
                  {step === 2 && <Step2 form={form} set={set} />}
                  {step === 3 && <Step3 form={form} set={set} accountEmail={accountEmail} />}
                  {step === 4 && <Step4 form={form} set={set} />}
                  {step === 5 && <StepReview form={form} accountEmail={accountEmail} />}
                  {step === 6 && <StepConfirmation />}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              {step < 6 && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.04]">
                  {step > 1 ? (
                    <button onClick={back} className="text-xs font-bold uppercase tracking-wider text-white/50 hover:text-white transition-colors">
                      ← Back
                    </button>
                  ) : <div />}
                  {regError && (
                    <div className="text-[10px] text-red-400/70">{regError}</div>
                  )}
                  <button
                    onClick={next}
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-lg bg-[#17FC13]/10 border border-[#17FC13]/25 text-xs font-bold uppercase tracking-wider text-[#17FC13] hover:bg-[#17FC13]/15 hover:shadow-[0_0_20px_rgba(23,252,19,0.1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Submitting..." : step === 5 ? "Submit Registration" : "Continue"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
