"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit() {
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }

    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
  }

  async function handleGoogle() {
    setError("");
    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (oauthError) setError(oauthError.message);
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center max-w-sm mx-auto px-6">
          <div className="w-14 h-14 mx-auto mb-6 rounded-full border border-[#17FC13]/30 bg-[#17FC13]/[0.06] flex items-center justify-center">
            <svg className="w-6 h-6 text-[#17FC13]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </div>
          <h2 className="text-2xl uppercase font-bold mb-2">Check Your <span className="accent-text">Email</span></h2>
          <p className="text-[13px] text-white/30 leading-relaxed mb-6">
            We sent a confirmation link to <span className="text-white/60">{email}</span>. Click the link to activate your account.
          </p>
          <a href="/signin" className="text-xs text-[#17FC13] no-underline hover:underline font-bold uppercase tracking-wider">Back to Sign In</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT: Cinematic */}
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

      {/* RIGHT: Form */}
      <div className="flex items-center justify-center px-6 py-28 lg:py-16 bg-black lg:bg-[#0A0A0A]">
        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-8 lg:hidden">
            <Image src="/logos/decal-sm.png" alt="Apex Academy" width={160} height={60} className="h-10 w-auto object-contain opacity-70" />
          </div>

          <h2 className="text-2xl uppercase font-bold mb-1">Create <span className="accent-text">Account</span></h2>
          <p className="text-xs text-white/25 mb-8">Join the Apex Academy ecosystem.</p>

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 mb-2">Email <span className="text-[#17FC13]/30">*</span></label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="you@email.com"
                className="w-full bg-transparent border border-[#222] px-4 py-3.5 text-sm text-white placeholder-white/15 focus:border-[#17FC13]/40 focus:outline-none transition-all focus:shadow-[0_0_0_1px_rgba(23,252,19,0.1)]"
                autoFocus
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 mb-2">Password <span className="text-[#17FC13]/30">*</span></label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="Min. 6 characters"
                  className="w-full bg-transparent border border-[#222] px-4 py-3.5 text-sm text-white placeholder-white/15 focus:border-[#17FC13]/40 focus:outline-none transition-all focus:shadow-[0_0_0_1px_rgba(23,252,19,0.1)] pr-16"
                />
                <button onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-bold uppercase tracking-wider text-white/15 bg-transparent border-none cursor-pointer hover:text-white/40 transition-colors">
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 mb-2">Confirm Password <span className="text-[#17FC13]/30">*</span></label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => { setConfirm(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="w-full bg-transparent border border-[#222] px-4 py-3.5 text-sm text-white placeholder-white/15 focus:border-[#17FC13]/40 focus:outline-none transition-all focus:shadow-[0_0_0_1px_rgba(23,252,19,0.1)]"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 px-4 py-3 border border-red-500/20 bg-red-500/[0.04]">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full shrink-0" />
                <span className="text-xs text-red-400/80">{error}</span>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 bg-[#17FC13] text-black text-xs font-bold uppercase tracking-[0.2em] cursor-pointer transition-all hover:shadow-[0_0_30px_rgba(23,252,19,0.25)] hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 py-1">
              <div className="flex-1 h-[1px] bg-[#222]" />
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/10">Or</span>
              <div className="flex-1 h-[1px] bg-[#222]" />
            </div>

            {/* Google sign-up */}
            <button onClick={handleGoogle} className="w-full py-3.5 border border-[#222] text-white/40 text-[11px] font-bold uppercase tracking-wider cursor-pointer bg-transparent hover:border-white/15 hover:text-white/60 transition-all flex items-center justify-center gap-2.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>

            <p className="text-center text-xs text-white/20 pt-2">
              Already have an account?{" "}
              <a href="/signin" className="text-[#17FC13] no-underline hover:underline font-bold">Sign In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
