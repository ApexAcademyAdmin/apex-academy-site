"use client";

import { useState } from "react";
import Image from "next/image";
import { signUp, type UserRole, ROLE_LABELS } from "@/lib/auth-store";

const ROLES: { value: UserRole; label: string; desc: string }[] = [
  { value: "player", label: "Player", desc: "Access your profile, team, and stats" },
  { value: "parent", label: "Parent / Guardian", desc: "Follow your athlete's team and games" },
];

export default function SignUpPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [gradYear, setGradYear] = useState("");
  const [position, setPosition] = useState("");
  const [bats, setBats] = useState("");
  const [throws_, setThrows] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerGradYear, setPlayerGradYear] = useState("");
  const [org, setOrg] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit() {
    if (!name || !email || !password || !role) { setError("Please fill in all required fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }

    const result = signUp({ name, email, password, role, phone, gradYear, position, bats, throws: throws_, playerName, playerGradYear, organization: org, title });
    if (!result.success) { setError(result.error || "Something went wrong."); return; }
    setSuccess(true);
    setTimeout(() => { window.location.href = "/account"; }, 1200);
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto mb-6 rounded-full border border-[#17FC13]/30 bg-[#17FC13]/[0.06] flex items-center justify-center">
            <svg className="w-6 h-6 text-[#17FC13]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-2xl uppercase font-bold mb-2">Welcome To <span className="accent-text">Apex</span></h2>
          <p className="text-xs text-white/25">Setting up your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* ── LEFT: Cinematic ── */}
      <div className="hidden lg:flex relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,_rgba(23,252,19,0.06)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image src="/logos/apex-a-mark.png" alt="" width={400} height={400} className="object-contain opacity-[0.04]" />
        </div>

        <div className="relative z-10 px-16 max-w-lg">
          <Image src="/logos/decal-lg.png" alt="Apex Academy" width={200} height={80} className="h-12 w-auto object-contain mb-10 opacity-80" />
          <h1 className="text-4xl md:text-5xl uppercase font-bold leading-[0.85] mb-5">
            Join The <span className="accent-text">Movement</span>
          </h1>
          <p className="text-[14px] text-white/30 leading-[1.7]">
            Create your account to access Apex Live, team pages, player profiles, and the full Apex Academy ecosystem.
          </p>
          <div className="w-12 h-[2px] bg-[#17FC13]/30 mt-8" />
        </div>

        <div className="absolute bottom-8 left-8 text-[9px] font-bold uppercase tracking-[0.3em] text-white/10">Boston, Massachusetts</div>
      </div>

      {/* ── RIGHT: Form ── */}
      <div className="flex items-center justify-center px-6 py-28 lg:py-16 bg-black lg:bg-[#0A0A0A] overflow-y-auto">
        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-8 lg:hidden">
            <Image src="/logos/decal-sm.png" alt="Apex Academy" width={160} height={60} className="h-10 w-auto object-contain opacity-70" />
          </div>

          {/* Step 1 — Role */}
          {step === 1 && (
            <>
              <h2 className="text-2xl uppercase font-bold mb-1">Create <span className="accent-text">Account</span></h2>
              <p className="text-xs text-white/25 mb-6">Select your role to get started.</p>
              <div className="space-y-2">
                {ROLES.map((r) => (
                  <button key={r.value} onClick={() => { setRole(r.value); setStep(2); }}
                    className="w-full flex items-center justify-between px-4 py-3.5 border border-[#222] cursor-pointer bg-transparent text-left transition-all hover:border-[#17FC13]/30 hover:bg-[#17FC13]/[0.02]">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wide">{r.label}</div>
                      <div className="text-[9px] text-white/20 mt-0.5">{r.desc}</div>
                    </div>
                    <svg className="w-3.5 h-3.5 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 5l7 7-7 7" /></svg>
                  </button>
                ))}
              </div>
              <p className="text-center text-xs text-white/20 mt-6">Already have an account? <a href="/signin" className="text-[#17FC13] no-underline hover:underline font-bold">Sign In</a></p>
            </>
          )}

          {/* Step 2 — Details */}
          {step === 2 && (
            <>
              <div className="flex items-center justify-between mb-5">
                <button onClick={() => setStep(1)} className="text-[10px] text-white/20 bg-transparent border-none cursor-pointer hover:text-white/40">&larr; Back</button>
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#17FC13]/40">{ROLE_LABELS[role!]}</span>
              </div>

              <h2 className="text-xl uppercase font-bold mb-5">Your <span className="accent-text">Details</span></h2>

              <div className="space-y-4">
                <Inp label="Full Name" value={name} onChange={setName} required />
                <Inp label="Email" value={email} onChange={setEmail} type="email" required />
                <div className="relative">
                  <Inp label="Password" value={password} onChange={setPassword} type={showPw ? "text" : "password"} required />
                  <button onClick={() => setShowPw(!showPw)} className="absolute right-4 top-8 text-[9px] text-white/15 bg-transparent border-none cursor-pointer hover:text-white/40">{showPw ? "Hide" : "Show"}</button>
                </div>
                <Inp label="Confirm Password" value={confirm} onChange={setConfirm} type="password" required />
                <Inp label="Phone" value={phone} onChange={setPhone} type="tel" />

                {role === "player" && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <Sel label="Grad Year" value={gradYear} onChange={setGradYear} options={["2025","2026","2027","2028","2029","2030","2031","2032"]} />
                      <Inp label="Position" value={position} onChange={setPosition} placeholder="SS, RHP" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Sel label="Bats" value={bats} onChange={setBats} options={["Right","Left","Switch"]} />
                      <Sel label="Throws" value={throws_} onChange={setThrows} options={["Right","Left"]} />
                    </div>
                  </>
                )}
                {role === "parent" && (
                  <div className="grid grid-cols-2 gap-3">
                    <Inp label="Player's Name" value={playerName} onChange={setPlayerName} />
                    <Sel label="Player's Grad Year" value={playerGradYear} onChange={setPlayerGradYear} options={["2025","2026","2027","2028","2029","2030","2031","2032"]} />
                  </div>
                )}
                {role === "recruiter" && (
                  <div className="grid grid-cols-2 gap-3">
                    <Inp label="Organization" value={org} onChange={setOrg} />
                    <Inp label="Title" value={title} onChange={setTitle} />
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-2 px-4 py-3 border border-red-500/20 bg-red-500/[0.04]">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full shrink-0" />
                    <span className="text-xs text-red-400/80">{error}</span>
                  </div>
                )}

                <button onClick={handleSubmit} className="w-full py-4 bg-[#17FC13] text-black text-xs font-bold uppercase tracking-[0.2em] cursor-pointer transition-all hover:shadow-[0_0_30px_rgba(23,252,19,0.25)] hover:brightness-110 active:scale-[0.98]">
                  Create Account
                </button>

                <p className="text-center text-xs text-white/20">Already have an account? <a href="/signin" className="text-[#17FC13] no-underline hover:underline font-bold">Sign In</a></p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Inp({ label, value, onChange, type = "text", required, placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 mb-2">{label}{required && <span className="text-[#17FC13]/30 ml-1">*</span>}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-transparent border border-[#222] px-4 py-3 text-sm text-white placeholder-white/12 focus:border-[#17FC13]/40 focus:outline-none transition-all focus:shadow-[0_0_0_1px_rgba(23,252,19,0.1)]" />
    </div>
  );
}

function Sel({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 mb-2">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-black border border-[#222] px-4 py-3 text-sm text-white focus:border-[#17FC13]/40 focus:outline-none cursor-pointer appearance-none">
        <option value="">Select</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
