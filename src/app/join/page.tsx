"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/Button";
import { CONTACT } from "@/lib/constants";

/* ═══════════════════════════════════════════════
   TYPES & OPTIONS
   ═══════════════════════════════════════════════ */

const POSITIONS = ["C", "1B", "2B", "SS", "3B", "LF", "CF", "RF", "RHP", "LHP", "DH", "UTIL"];
const GRAD_YEARS = ["2026", "2027", "2028", "2029", "2030", "2031", "2032"];
const STATES = ["MA", "CT", "RI", "NH", "ME", "VT", "NY", "NJ", "PA", "Other"];
const STEPS = ["Welcome", "Player Info", "Baseball Info", "Details", "Review"];

type FormData = {
  firstName: string;
  lastName: string;
  dob: string;
  gradYear: string;
  email: string;
  phone: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  city: string;
  state: string;
  primaryPosition: string;
  secondaryPosition: string;
  throws: string;
  bats: string;
  height: string;
  weight: string;
  exitVelo: string;
  pitchingVelo: string;
  sixtyYard: string;
  popTime: string;
  gpa: string;
  currentTeam: string;
  school: string;
  highlightUrl: string;
  profileUrl: string;
  instagram: string;
  notes: string;
};

const EMPTY: FormData = {
  firstName: "", lastName: "", dob: "", gradYear: "", email: "", phone: "",
  parentName: "", parentEmail: "", parentPhone: "", city: "", state: "",
  primaryPosition: "", secondaryPosition: "", throws: "", bats: "",
  height: "", weight: "", exitVelo: "", pitchingVelo: "", sixtyYard: "",
  popTime: "", gpa: "", currentTeam: "", school: "", highlightUrl: "",
  profileUrl: "", instagram: "", notes: "",
};

/* ═══════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════ */

export default function JoinPage() {
  const [step, setStep] = useState(1); // skip the welcome screen — open straight to the form
  const [form, setForm] = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function next() { if (step < STEPS.length - 1) setStep(step + 1); }
  function back() { if (step > 1) setStep(step - 1); }

  function submit() {
    // Build mailto link with form data as body
    const subject = `Tryout Registration: ${form.firstName} ${form.lastName} — ${form.gradYear} ${form.primaryPosition}`;
    const body = [
      `PLAYER: ${form.firstName} ${form.lastName}`,
      `DOB: ${form.dob} | Grad Year: ${form.gradYear}`,
      `Email: ${form.email} | Phone: ${form.phone}`,
      ``,
      `PARENT/GUARDIAN: ${form.parentName}`,
      `Email: ${form.parentEmail} | Phone: ${form.parentPhone}`,
      ``,
      `LOCATION: ${form.city}, ${form.state}`,
      `School: ${form.school} | Current Team: ${form.currentTeam}`,
      ``,
      `BASEBALL INFO:`,
      `Position: ${form.primaryPosition}${form.secondaryPosition ? ` / ${form.secondaryPosition}` : ""}`,
      `Throws: ${form.throws} | Bats: ${form.bats}`,
      `Height: ${form.height} | Weight: ${form.weight}`,
      ``,
      `METRICS:`,
      form.exitVelo ? `Exit Velo: ${form.exitVelo}` : "",
      form.pitchingVelo ? `Pitching Velo: ${form.pitchingVelo}` : "",
      form.sixtyYard ? `60yd Dash: ${form.sixtyYard}` : "",
      form.popTime ? `Pop Time: ${form.popTime}` : "",
      form.gpa ? `GPA: ${form.gpa}` : "",
      ``,
      form.highlightUrl ? `Highlights: ${form.highlightUrl}` : "",
      form.profileUrl ? `Profile: ${form.profileUrl}` : "",
      form.instagram ? `Instagram: ${form.instagram}` : "",
      form.notes ? `\nNotes: ${form.notes}` : "",
    ].filter(Boolean).join("\n");

    window.open(`mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setSubmitted(true);
  }

  if (submitted) return <Confirmation name={form.firstName} />;

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Progress Bar ── */}
      {step > 0 && (
        <div className="fixed top-20 left-0 right-0 z-40">
          <div className="h-[2px] bg-[#171717]">
            <div
              className="h-full bg-[#17FC13] transition-all duration-500"
              style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
            />
          </div>
          <div className="max-w-[1120px] mx-auto px-6 py-3 flex items-center justify-between">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
              Step {step} of {STEPS.length - 1}
            </div>
            <div className="flex items-center gap-4">
              {STEPS.slice(1).map((s, i) => (
                <span key={s} className={`text-[9px] font-bold uppercase tracking-wider hidden md:block ${i + 1 <= step ? "text-[#17FC13]" : "text-white/55"}`}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Content ── */}
      <div className={`flex-1 flex items-center justify-center ${step === 0 ? "pt-20" : "pt-36"} pb-12`}>
        <div className="w-full max-w-2xl mx-auto px-6">
          {step === 0 && <WelcomeStep onStart={() => setStep(1)} />}
          {step === 1 && <PlayerInfoStep form={form} update={update} />}
          {step === 2 && <BaseballInfoStep form={form} update={update} />}
          {step === 3 && <DetailsStep form={form} update={update} />}
          {step === 4 && <ReviewStep form={form} />}
        </div>
      </div>

      {/* ── Navigation ── */}
      {step > 0 && (
        <div className="border-t border-[#171717] bg-black/95">
          <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
            <button onClick={back} className="text-xs font-bold uppercase tracking-wider text-white/80 hover:text-white transition-colors bg-transparent border-none cursor-pointer">
              Back
            </button>
            {step < STEPS.length - 1 ? (
              <Button href="#" size="small">
                <span onClick={(e) => { e.preventDefault(); next(); }}>Continue</span>
              </Button>
            ) : (
              <button
                onClick={submit}
                className="inline-flex items-center gap-2.5 rounded-full border border-[#17FC13] bg-gradient-to-t from-[#17FC13]/20 to-transparent px-6 py-2.5 text-[13px] font-bold uppercase tracking-wide text-white transition-all duration-200 no-underline select-none hover:shadow-[0_0_20px_rgba(23,252,19,0.15)] cursor-pointer"
              >
                Submit Registration
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   STEP COMPONENTS
   ═══════════════════════════════════════════════ */

function WelcomeStep({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center relative">
      {/* Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <Image src="/logos/a-mark-lg.png" alt="" width={500} height={500} className="object-contain" />
      </div>

      <div className="relative z-10">
        <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#17FC13]/60 mb-6">
          Apex Academy Tryouts
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl uppercase font-bold leading-[0.9] mb-6">
          Earn Your <span className="accent-text">Spot</span>
        </h1>

        <p className="text-[15px] text-white/85 leading-[1.8] max-w-md mx-auto mb-4">
          Apply to become part of one of New England&apos;s premier baseball development programs. Complete the registration below to be evaluated for the upcoming season.
        </p>

        <p className="text-[13px] text-white/65 leading-[1.7] max-w-sm mx-auto mb-12">
          Registration takes approximately 3-5 minutes. Have your baseball metrics and parent/guardian contact information ready.
        </p>

        <button
          onClick={onStart}
          className="inline-flex items-center gap-3 rounded-full border border-[#17FC13] bg-gradient-to-t from-[#17FC13]/20 to-transparent px-10 py-4 text-sm font-bold uppercase tracking-wide text-white transition-all duration-200 hover:shadow-[0_0_25px_rgba(23,252,19,0.2)] cursor-pointer"
        >
          Start Registration
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
        </button>
      </div>
    </div>
  );
}

function PlayerInfoStep({ form, update }: { form: FormData; update: (f: keyof FormData, v: string) => void }) {
  return (
    <div>
      <StepHeader title="Player" accent="Information" sub="Tell us about the athlete." />
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="First Name" value={form.firstName} onChange={(v) => update("firstName", v)} required />
          <Field label="Last Name" value={form.lastName} onChange={(v) => update("lastName", v)} required />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Date of Birth" value={form.dob} onChange={(v) => update("dob", v)} type="date" required />
          <SelectField label="Graduation Year" value={form.gradYear} onChange={(v) => update("gradYear", v)} options={GRAD_YEARS} required />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Player Email" value={form.email} onChange={(v) => update("email", v)} type="email" required />
          <Field label="Player Phone" value={form.phone} onChange={(v) => update("phone", v)} type="tel" />
        </div>

        <div className="border-t border-[#171717] pt-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/65 mb-6">Parent / Guardian</div>
          <div className="space-y-4">
            <Field label="Parent/Guardian Name" value={form.parentName} onChange={(v) => update("parentName", v)} required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Parent Email" value={form.parentEmail} onChange={(v) => update("parentEmail", v)} type="email" required />
              <Field label="Parent Phone" value={form.parentPhone} onChange={(v) => update("parentPhone", v)} type="tel" required />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="City" value={form.city} onChange={(v) => update("city", v)} required />
          <SelectField label="State" value={form.state} onChange={(v) => update("state", v)} options={STATES} required />
        </div>
      </div>
    </div>
  );
}

function BaseballInfoStep({ form, update }: { form: FormData; update: (f: keyof FormData, v: string) => void }) {
  return (
    <div>
      <StepHeader title="Baseball" accent="Information" sub="Position, skills, and throwing/batting preferences." />
      <div className="space-y-8">
        {/* Positions */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70 mb-4">Primary Position *</div>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {POSITIONS.map((pos) => (
              <button
                key={pos}
                onClick={() => update("primaryPosition", pos)}
                className={`py-3 border text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer select-none ${
                  form.primaryPosition === pos
                    ? "border-[#17FC13]/50 text-[#17FC13] bg-[#17FC13]/[0.06]"
                    : "border-[#171717] text-white/80 hover:border-white/15 hover:text-white/60"
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70 mb-4">Secondary Position</div>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {POSITIONS.filter((p) => p !== form.primaryPosition).map((pos) => (
              <button
                key={pos}
                onClick={() => update("secondaryPosition", form.secondaryPosition === pos ? "" : pos)}
                className={`py-3 border text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer select-none ${
                  form.secondaryPosition === pos
                    ? "border-[#17FC13]/50 text-[#17FC13] bg-[#17FC13]/[0.06]"
                    : "border-[#171717] text-white/80 hover:border-white/15 hover:text-white/60"
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        {/* Throws / Bats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70 mb-4">Throws *</div>
            <div className="flex gap-2">
              {["Right", "Left", "Switch"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => update("throws", opt)}
                  className={`flex-1 py-3 border text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer select-none ${
                    form.throws === opt
                      ? "border-[#17FC13]/50 text-[#17FC13] bg-[#17FC13]/[0.06]"
                      : "border-[#171717] text-white/80 hover:border-white/15"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70 mb-4">Bats *</div>
            <div className="flex gap-2">
              {["Right", "Left", "Switch"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => update("bats", opt)}
                  className={`flex-1 py-3 border text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer select-none ${
                    form.bats === opt
                      ? "border-[#17FC13]/50 text-[#17FC13] bg-[#17FC13]/[0.06]"
                      : "border-[#171717] text-white/80 hover:border-white/15"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Physical */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Field label="Height" value={form.height} onChange={(v) => update("height", v)} placeholder="6'1&quot;" />
          <Field label="Weight (lbs)" value={form.weight} onChange={(v) => update("weight", v)} placeholder="185" />
          <Field label="GPA" value={form.gpa} onChange={(v) => update("gpa", v)} placeholder="3.5" />
          <Field label="School" value={form.school} onChange={(v) => update("school", v)} />
        </div>
      </div>
    </div>
  );
}

function DetailsStep({ form, update }: { form: FormData; update: (f: keyof FormData, v: string) => void }) {
  return (
    <div>
      <StepHeader title="Additional" accent="Details" sub="Metrics, media, and current team information. All fields optional." />
      <div className="space-y-8">
        {/* Metrics */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/65 mb-4">Performance Metrics</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Field label="Exit Velo (mph)" value={form.exitVelo} onChange={(v) => update("exitVelo", v)} placeholder="85" />
            <Field label="Pitch Velo (mph)" value={form.pitchingVelo} onChange={(v) => update("pitchingVelo", v)} placeholder="78" />
            <Field label="60yd Dash (sec)" value={form.sixtyYard} onChange={(v) => update("sixtyYard", v)} placeholder="7.2" />
            <Field label="Pop Time (sec)" value={form.popTime} onChange={(v) => update("popTime", v)} placeholder="2.0" />
          </div>
        </div>

        {/* Team */}
        <Field label="Current Team" value={form.currentTeam} onChange={(v) => update("currentTeam", v)} placeholder="Current travel/school team" />

        {/* Links */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/65 mb-4">Media & Links</div>
          <div className="space-y-4">
            <Field label="Highlight Video URL" value={form.highlightUrl} onChange={(v) => update("highlightUrl", v)} placeholder="YouTube, Hudl, etc." />
            <Field label="Recruiting Profile URL" value={form.profileUrl} onChange={(v) => update("profileUrl", v)} placeholder="Perfect Game, PBR, etc." />
            <Field label="Instagram Handle" value={form.instagram} onChange={(v) => update("instagram", v)} placeholder="@handle" />
          </div>
        </div>

        {/* Notes */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70 mb-3">Anything else we should know?</div>
          <textarea
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            rows={4}
            className="w-full bg-transparent border border-[#171717] px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#17FC13]/40 focus:outline-none transition-colors resize-none"
            placeholder="Injuries, availability, specific goals, etc."
          />
        </div>
      </div>
    </div>
  );
}

function ReviewStep({ form }: { form: FormData }) {
  const sections = [
    {
      title: "Player Information",
      rows: [
        ["Name", `${form.firstName} ${form.lastName}`],
        ["DOB", form.dob],
        ["Grad Year", form.gradYear],
        ["Email", form.email],
        ["Phone", form.phone],
        ["Location", `${form.city}, ${form.state}`],
        ["School", form.school],
      ],
    },
    {
      title: "Parent / Guardian",
      rows: [
        ["Name", form.parentName],
        ["Email", form.parentEmail],
        ["Phone", form.parentPhone],
      ],
    },
    {
      title: "Baseball Information",
      rows: [
        ["Position", `${form.primaryPosition}${form.secondaryPosition ? ` / ${form.secondaryPosition}` : ""}`],
        ["Throws / Bats", `${form.throws} / ${form.bats}`],
        ["Height / Weight", `${form.height} / ${form.weight} lbs`],
        ["Current Team", form.currentTeam],
        ["GPA", form.gpa],
      ],
    },
    {
      title: "Metrics",
      rows: [
        ["Exit Velo", form.exitVelo ? `${form.exitVelo} mph` : "—"],
        ["Pitch Velo", form.pitchingVelo ? `${form.pitchingVelo} mph` : "—"],
        ["60yd Dash", form.sixtyYard ? `${form.sixtyYard}s` : "—"],
        ["Pop Time", form.popTime ? `${form.popTime}s` : "—"],
      ],
    },
  ];

  return (
    <div>
      <StepHeader title="Review &" accent="Submit" sub="Confirm your information before submitting." />
      <div className="space-y-8">
        {sections.map((s) => (
          <div key={s.title} className="border border-[#171717] p-6">
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#17FC13]/50 mb-4">{s.title}</div>
            <div className="space-y-3">
              {s.rows.filter(([, v]) => v).map(([label, value]) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/65">{label}</span>
                  <span className="text-sm text-white/70">{value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <p className="text-[12px] text-white/65 text-center leading-relaxed">
          By submitting, you confirm the information above is accurate. Apex Academy coaching staff will review your registration and contact you with next steps.
        </p>
      </div>
    </div>
  );
}

function Confirmation({ name }: { name: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-20">
      <div className="max-w-lg mx-auto px-6 text-center">
        <div className="w-16 h-16 rounded-full border border-[#17FC13]/30 bg-[#17FC13]/[0.06] flex items-center justify-center mx-auto mb-8">
          <svg className="w-7 h-7 text-[#17FC13]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 13l4 4L19 7" /></svg>
        </div>

        <h1 className="text-3xl md:text-4xl uppercase font-bold mb-4">
          Registration <span className="accent-text">Submitted</span>
        </h1>

        <p className="text-[15px] text-white/90 leading-[1.8] mb-4">
          {name}, your tryout registration has been submitted. Our coaching staff will review your information and reach out with next steps.
        </p>

        <p className="text-[13px] text-white/70 leading-[1.7] mb-10">
          Check your email for a confirmation. If you don&apos;t hear from us within 48 hours, contact us at {CONTACT.email}.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Button href="/">Back to Home</Button>
          <Button href={CONTACT.instagram} variant="secondary" external>{CONTACT.instagramHandle}</Button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SHARED UI
   ═══════════════════════════════════════════════ */

function StepHeader({ title, accent, sub }: { title: string; accent: string; sub: string }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl md:text-3xl uppercase font-bold mb-3">
        {title} <span className="accent-text">{accent}</span>
      </h2>
      <p className="text-[13px] text-white/75">{sub}</p>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder, required }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 mb-2">
        {label}{required && <span className="text-[#17FC13]/50 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border border-[#171717] px-4 py-3 text-sm text-white placeholder-white/15 focus:border-[#17FC13]/40 focus:outline-none transition-colors"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options, required }: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 mb-2">
        {label}{required && <span className="text-[#17FC13]/50 ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black border border-[#171717] px-4 py-3 text-sm text-white focus:border-[#17FC13]/40 focus:outline-none transition-colors appearance-none cursor-pointer"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
