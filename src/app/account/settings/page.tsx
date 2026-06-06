"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const inputCls = "w-full bg-[#0d1117] border border-white/[0.06] rounded-lg px-4 py-2.5 text-[13px] text-white/90 placeholder-white/20 focus:outline-none focus:border-[#17FC13]/30 transition-colors";
const labelCls = "block text-[10px] font-bold uppercase tracking-wider text-white/30 mb-1.5";

function Notice({ kind, text }: { kind: "ok" | "err"; text: string }) {
  const ok = kind === "ok";
  return (
    <div className={`flex items-center gap-2 px-4 py-3 mb-4 rounded-lg border ${ok ? "border-[#17FC13]/20 bg-[#17FC13]/[0.04]" : "border-red-500/20 bg-red-500/[0.04]"}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${ok ? "bg-[#17FC13]" : "bg-red-400"}`} />
      <span className={`text-xs ${ok ? "text-[#17FC13]/80" : "text-red-400/80"}`}>{text}</span>
    </div>
  );
}

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) return;
      setUser(authUser);

      const { data: profile } = await supabase
        .from("user_profiles")
        .select("display_name, phone")
        .eq("user_id", authUser.id)
        .maybeSingle();

      if (profile) {
        setDisplayName(profile.display_name || "");
        setPhone(profile.phone || "");
      }
      setLoaded(true);
    }
    load();
  }, []);

  async function saveProfile() {
    if (!user) return;
    setSavingProfile(true);
    setProfileMsg(null);

    const supabase = createClient();
    const { error } = await supabase
      .from("user_profiles")
      .upsert(
        {
          user_id: user.id,
          email: user.email,
          display_name: displayName.trim() || null,
          phone: phone.trim() || null,
        },
        { onConflict: "user_id" },
      );

    setSavingProfile(false);
    setProfileMsg(error ? { kind: "err", text: error.message } : { kind: "ok", text: "Profile updated." });
  }

  async function savePassword() {
    setPasswordMsg(null);
    if (newPassword.length < 6) {
      setPasswordMsg({ kind: "err", text: "Password must be at least 6 characters." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ kind: "err", text: "Passwords do not match." });
      return;
    }

    setSavingPassword(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setSavingPassword(false);

    if (error) {
      setPasswordMsg({ kind: "err", text: error.message });
      return;
    }
    setNewPassword("");
    setConfirmPassword("");
    setPasswordMsg({ kind: "ok", text: "Password changed." });
  }

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-5 h-5 border-2 border-[#17FC13]/30 border-t-[#17FC13] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/40 mb-2">Account</div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Settings</h1>
      </div>

      {/* Profile */}
      <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-6">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mb-5">Profile</h3>
        {profileMsg && <Notice kind={profileMsg.kind} text={profileMsg.text} />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Email</label>
            <input type="email" value={user?.email || ""} disabled className={`${inputCls} opacity-50 cursor-not-allowed`} />
          </div>
          <div>
            <label className={labelCls}>Display Name</label>
            <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className={inputCls} placeholder="Your name" />
          </div>
          <div>
            <label className={labelCls}>Phone</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} placeholder="(555) 123-4567" />
          </div>
        </div>
        <div className="mt-5">
          <button onClick={saveProfile} disabled={savingProfile}
            className="px-6 py-2.5 rounded-full border border-[#17FC13] bg-gradient-to-t from-[#17FC13]/20 to-transparent text-white text-xs font-bold uppercase tracking-wide cursor-pointer hover:shadow-[0_0_20px_rgba(23,252,19,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {savingProfile ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>

      {/* Password */}
      <div className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-6">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mb-5">Change Password</h3>
        {passwordMsg && <Notice kind={passwordMsg.kind} text={passwordMsg.text} />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>New Password</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={inputCls} placeholder="••••••••" />
          </div>
          <div>
            <label className={labelCls}>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={inputCls} placeholder="••••••••" />
          </div>
        </div>
        <div className="mt-5">
          <button onClick={savePassword} disabled={savingPassword}
            className="px-6 py-2.5 rounded-full border border-[#404040] bg-gradient-to-t from-white/[0.06] to-transparent text-white text-xs font-bold uppercase tracking-wide cursor-pointer hover:border-[#17FC13]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {savingPassword ? "Saving..." : "Update Password"}
          </button>
        </div>
      </div>
    </div>
  );
}
