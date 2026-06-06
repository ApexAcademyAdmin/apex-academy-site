"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ═══════════════════════════════════════
// TYPES
// ═══════════════════════════════════════

const STEPS = [
  { id: 1, label: "Organization" },
  { id: 2, label: "Team" },
  { id: 3, label: "Staff" },
  { id: 4, label: "Roster" },
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
const POSITIONS = ["C", "1B", "2B", "SS", "3B", "LF", "CF", "RF", "RHP", "LHP", "DH", "UTIL"];
const BATS_THROWS = ["R", "L", "S"];
const SCHEDULE_DAYS = ["Tuesday", "Wednesday", "Thursday"];
const STATES = ["MA", "CT", "RI", "NH", "ME", "VT", "NY", "NJ", "PA"];

type Coach = { name: string; email: string; phone: string; role: string };
type Player = { name: string; dob: string; gradYear: string; position1: string; position2: string; bats: string; throws: string; parentName: string; parentEmail: string; parentPhone: string };

type FormState = {
  // Step 1: Org
  orgName: string; orgEmail: string; orgWebsite: string;
  contactName: string; contactEmail: string; contactPhone: string;
  city: string; state: string; orgDescription: string;
  // Step 2: Team
  teamName: string; ageDivision: string; leagueLevel: string;
  primaryColor: string; secondaryColor: string;
  homeField: string; homeFieldAddress: string;
  // Step 3: Staff
  coaches: Coach[];
  // Step 4: Roster
  players: Player[];
  // Step 5: League
  preferredDays: string[]; preferredHomeGames: string; travelLimit: string; specialRequests: string;
};

const EMPTY_COACH: Coach = { name: "", email: "", phone: "", role: "" };
const EMPTY_PLAYER: Player = { name: "", dob: "", gradYear: "", position1: "", position2: "", bats: "", throws: "", parentName: "", parentEmail: "", parentPhone: "" };

const INITIAL: FormState = {
  orgName: "", orgEmail: "", orgWebsite: "",
  contactName: "", contactEmail: "", contactPhone: "",
  city: "", state: "MA", orgDescription: "",
  teamName: "", ageDivision: "12U", leagueLevel: "Premier Division",
  primaryColor: "#000000", secondaryColor: "#ffffff",
  homeField: "", homeFieldAddress: "",
  coaches: [{ ...EMPTY_COACH, role: "Head Coach" }, { ...EMPTY_COACH, role: "Assistant Coach" }],
  players: Array.from({ length: 3 }, () => ({ ...EMPTY_PLAYER })),
  preferredDays: ["Tuesday", "Wednesday", "Thursday"],
  preferredHomeGames: "", travelLimit: "", specialRequests: "",
};

// ═══════════════════════════════════════
// SHARED UI
// ═══════════════════════════════════════

const inputCls = "w-full bg-[#0d1117] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-white placeholder:text-white focus:outline-none focus:border-[#17FC13]/30 focus:ring-1 focus:ring-[#17FC13]/10 transition-all";
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
      <p className="text-[11px] text-white">{desc}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <Field label="Organization Name">
            <input className={inputCls} placeholder="e.g. South Shore Baseball" value={form.orgName} onChange={e => set({ orgName: e.target.value })} />
          </Field>
          <Field label="Organization Email">
            <input className={inputCls} type="email" placeholder="info@yourorg.com" value={form.orgEmail} onChange={e => set({ orgEmail: e.target.value })} />
          </Field>
        </div>
        <Field label="Website (optional)">
          <input className={inputCls} placeholder="https://yourorg.com" value={form.orgWebsite} onChange={e => set({ orgWebsite: e.target.value })} />
        </Field>
        <div className="pt-4 border-t border-white/[0.04]">
          <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#17FC13]/40 mb-2.5">Primary Contact</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            <Field label="Full Name">
              <input className={inputCls} placeholder="John Smith" value={form.contactName} onChange={e => set({ contactName: e.target.value })} />
            </Field>
            <Field label="Email">
              <input className={inputCls} type="email" placeholder="john@email.com" value={form.contactEmail} onChange={e => set({ contactEmail: e.target.value })} />
            </Field>
            <Field label="Phone">
              <input className={inputCls} type="tel" placeholder="(617) 555-0000" value={form.contactPhone} onChange={e => set({ contactPhone: e.target.value })} />
            </Field>
          </div>
        </div>
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
        <Field label="Description (optional)">
          <textarea className={`${inputCls} min-h-[60px] resize-none`} placeholder="Brief description of your organization..." value={form.orgDescription} onChange={e => set({ orgDescription: e.target.value })} />
        </Field>
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
                <div className="text-[11px] text-white mt-0.5">{l.desc}</div>
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

function Step3({ form, set }: { form: FormState; set: (f: Partial<FormState>) => void }) {
  const updateCoach = (i: number, field: keyof Coach, val: string) => {
    const coaches = [...form.coaches];
    coaches[i] = { ...coaches[i], [field]: val };
    set({ coaches });
  };
  const addCoach = () => set({ coaches: [...form.coaches, { ...EMPTY_COACH, role: "Assistant Coach" }] });

  return (
    <>
      <StepHeader title="Coaching Staff" desc="Add your head coach and assistant coaches. They'll receive account invitations." />
      <div className="space-y-3">
        {form.coaches.map((c, i) => (
          <div key={i} className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-3.5">
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#17FC13]/40 mb-2.5">
              {i === 0 ? "Head Coach" : `Coach ${i + 1}`}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              <Field label="Full Name">
                <input className={inputCls} placeholder="Coach name" value={c.name} onChange={e => updateCoach(i, "name", e.target.value)} />
              </Field>
              <Field label="Role">
                <input className={inputCls} placeholder="Head Coach" value={c.role} onChange={e => updateCoach(i, "role", e.target.value)} />
              </Field>
              <Field label="Email">
                <input className={inputCls} type="email" placeholder="coach@email.com" value={c.email} onChange={e => updateCoach(i, "email", e.target.value)} />
              </Field>
              <Field label="Phone">
                <input className={inputCls} type="tel" placeholder="(617) 555-0000" value={c.phone} onChange={e => updateCoach(i, "phone", e.target.value)} />
              </Field>
            </div>
          </div>
        ))}
        <button type="button" onClick={addCoach}
          className="w-full py-3 rounded-xl border border-dashed border-white/[0.08] text-xs font-bold uppercase tracking-wider text-white hover:text-white hover:border-white/[0.15] transition-all">
          + Add Another Coach
        </button>
      </div>
    </>
  );
}

function Step4({ form, set }: { form: FormState; set: (f: Partial<FormState>) => void }) {
  const updatePlayer = (i: number, field: keyof Player, val: string) => {
    const players = [...form.players];
    players[i] = { ...players[i], [field]: val };
    set({ players });
  };
  const addPlayer = () => set({ players: [...form.players, { ...EMPTY_PLAYER }] });
  const removePlayer = (i: number) => {
    if (form.players.length <= 1) return;
    set({ players: form.players.filter((_, idx) => idx !== i) });
  };

  return (
    <>
      <StepHeader title="Roster" desc="Add your players. You can also complete this after registration." />
      <div className="space-y-4">
        {form.players.map((p, i) => (
          <div key={i} className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-3.5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white">Player {i + 1}</span>
              {form.players.length > 1 && (
                <button type="button" onClick={() => removePlayer(i)} className="text-[10px] text-red-400/40 hover:text-red-400/70 transition-colors uppercase tracking-wider font-bold">Remove</button>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Field label="Player Name">
                <input className={inputCls} placeholder="Full name" value={p.name} onChange={e => updatePlayer(i, "name", e.target.value)} />
              </Field>
              <Field label="DOB">
                <input className={inputCls} type="date" value={p.dob} onChange={e => updatePlayer(i, "dob", e.target.value)} />
              </Field>
              <Field label="Position">
                <select className={selectCls} value={p.position1} onChange={e => updatePlayer(i, "position1", e.target.value)}>
                  <option value="">—</option>
                  {POSITIONS.map(pos => <option key={pos} value={pos}>{pos}</option>)}
                </select>
              </Field>
              <Field label="Bats / Throws">
                <div className="flex gap-2">
                  <select className={selectCls} value={p.bats} onChange={e => updatePlayer(i, "bats", e.target.value)}>
                    <option value="">B</option>
                    {BATS_THROWS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <select className={selectCls} value={p.throws} onChange={e => updatePlayer(i, "throws", e.target.value)}>
                    <option value="">T</option>
                    {["R", "L"].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </Field>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
              <Field label="Parent Name">
                <input className={inputCls} placeholder="Parent/guardian" value={p.parentName} onChange={e => updatePlayer(i, "parentName", e.target.value)} />
              </Field>
              <Field label="Parent Email">
                <input className={inputCls} type="email" placeholder="parent@email.com" value={p.parentEmail} onChange={e => updatePlayer(i, "parentEmail", e.target.value)} />
              </Field>
              <Field label="Parent Phone">
                <input className={inputCls} type="tel" placeholder="(617) 555-0000" value={p.parentPhone} onChange={e => updatePlayer(i, "parentPhone", e.target.value)} />
              </Field>
            </div>
          </div>
        ))}
        <button type="button" onClick={addPlayer}
          className="w-full py-3 rounded-xl border border-dashed border-white/[0.08] text-xs font-bold uppercase tracking-wider text-white hover:text-white hover:border-white/[0.15] transition-all">
          + Add Player
        </button>
      </div>
    </>
  );
}

function Step5({ form, set }: { form: FormState; set: (f: Partial<FormState>) => void }) {
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

function Step6({ form }: { form: FormState }) {
  const playerCount = form.players.filter(p => p.name.trim()).length;
  const coachCount = form.coaches.filter(c => c.name.trim()).length;

  return (
    <>
      <StepHeader title="Review & Submit" desc="Review your registration details before submitting." />
      <div className="space-y-4">
        {[
          { label: "Organization", items: [form.orgName, form.city + ", " + form.state, form.contactName, form.contactEmail] },
          { label: "Team", items: [form.teamName, form.ageDivision + " — " + form.leagueLevel, form.homeField] },
          { label: "Staff", items: [`${coachCount} coach${coachCount !== 1 ? "es" : ""} registered`, ...form.coaches.filter(c => c.name).map(c => `${c.name} — ${c.role}`)] },
          { label: "Roster", items: [`${playerCount} player${playerCount !== 1 ? "s" : ""} added`, ...(playerCount < 9 ? ["You can add more players after registration"] : [])] },
          { label: "Schedule", items: [form.preferredDays.join(", ") || "All days", form.travelLimit ? `Max travel: ${form.travelLimit}` : "No travel limit"] },
        ].map(section => (
          <div key={section.label} className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-3.5">
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#17FC13]/40 mb-3">{section.label}</div>
            {section.items.filter(Boolean).map((item, i) => (
              <div key={i} className="text-sm text-white py-0.5">{item}</div>
            ))}
          </div>
        ))}

        <div className="bg-[#0d1117] rounded-2xl border border-[#17FC13]/10 p-5">
          <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#17FC13]/40 mb-3">Registration Includes</div>
          <div className="grid grid-cols-2 gap-2 text-xs text-white">
            {["Team Page", "League Standings", "Player Profiles", "Schedule Management", "Certified Umpires", "Pitch Count Enforcement", "Field Coordination", "Awards & Banquet"].map(f => (
              <div key={f} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#17FC13]/50" />
                {f}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-3.5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-white mb-1">Registration Fee</div>
            <div className="text-2xl font-bold text-white">$175</div>
          </div>
          <div className="text-[10px] text-white text-right">
            <div>per team</div>
            <div>Invoice sent after approval</div>
          </div>
        </div>
      </div>
    </>
  );
}

function Step7() {
  const confNumber = `APEX-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 rounded-full bg-[#17FC13]/10 border border-[#17FC13]/30 flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-[#17FC13]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold uppercase mb-2">Team <span className="accent-text">Registered</span></h2>
      <p className="text-sm text-white mb-8 max-w-md mx-auto">Your registration has been submitted. Our league operations team will review and confirm within 48 hours.</p>

      <div className="bg-[#0d1117] rounded-2xl border border-white/[0.04] p-6 max-w-sm mx-auto mb-8 text-left">
        <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#17FC13]/40 mb-3">Confirmation</div>
        {[
          { label: "Confirmation #", value: confNumber },
          { label: "Status", value: "Pending Review" },
          { label: "Season", value: "Summer 2026" },
          { label: "Contact", value: "apexsportsgg@gmail.com" },
        ].map(item => (
          <div key={item.label} className="flex justify-between py-1.5 text-sm">
            <span className="text-white">{item.label}</span>
            <span className="text-white font-mono">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-white mb-3">Next Steps</div>
      <div className="space-y-2 max-w-sm mx-auto text-left">
        {["League review & roster approval", "Schedule release & team page creation", "Pre-season coaches meeting", "Opening Day"].map((step, i) => (
          <div key={i} className="flex items-center gap-3 text-sm text-white">
            <span className="w-5 h-5 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[9px] font-bold text-white">{i + 1}</span>
            {step}
          </div>
        ))}
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
              "bg-white/[0.02] text-white border border-white/[0.04]"
            }`}>
              {done ? "✓" : s.id}
            </div>
            <span className={`text-[9px] font-bold uppercase tracking-wider mr-2 ${active ? "text-white" : done ? "text-[#17FC13]/40" : "text-white"}`}>
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
// MAIN PAGE
// ═══════════════════════════════════════

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(INITIAL);

  const set = (partial: Partial<FormState>) => setForm(prev => ({ ...prev, ...partial }));
  const next = () => setStep(s => Math.min(s + 1, 6));
  const back = () => setStep(s => Math.max(s - 1, 1));

  return (
    <main className="min-h-screen">
      <div className="pt-20 md:pt-24 pb-8">
        <div className="max-w-[800px] mx-auto px-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-[10px] font-medium uppercase tracking-[0.2em]">
              <a href="/" className="text-white no-underline hover:text-white transition-colors">Home</a>
              <span className="text-white">/</span>
              <a href="/league" className="text-white no-underline hover:text-white transition-colors">League</a>
              <span className="text-white">/</span>
              <span className="text-[#17FC13]/60">Register</span>
            </div>
            <h1 className="text-2xl md:text-3xl uppercase font-bold leading-[0.9] mb-1">
              Team <span className="accent-text">Registration</span>
            </h1>
            <p className="text-[11px] text-white mb-4">Register your team for the Apex Academy League. Takes about 10 minutes.</p>
          </div>

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
              {step === 3 && <Step3 form={form} set={set} />}
              {step === 4 && <Step4 form={form} set={set} />}
              {step === 5 && <Step6 form={form} />}
              {step === 6 && <Step7 />}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {step < 6 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.04]">
              {step > 1 ? (
                <button onClick={back} className="text-xs font-bold uppercase tracking-wider text-white hover:text-white transition-colors">
                  ← Back
                </button>
              ) : <div />}
              <button
                onClick={next}
                className="px-6 py-2.5 rounded-lg bg-[#17FC13]/10 border border-[#17FC13]/25 text-xs font-bold uppercase tracking-wider text-[#17FC13] hover:bg-[#17FC13]/15 hover:shadow-[0_0_20px_rgba(23,252,19,0.1)] transition-all"
              >
                {step === 5 ? "Submit Registration" : "Continue"}
              </button>
            </div>
          )}

          {step === 6 && (
            <div className="flex justify-center mt-8">
              <a href="/league" className="px-6 py-2.5 rounded-xl border border-white/[0.06] text-xs font-bold uppercase tracking-wider text-white hover:text-white no-underline transition-all">
                Back to League
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
