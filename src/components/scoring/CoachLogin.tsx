"use client";

import { useState } from "react";
import { hasTeamPassword, setTeamPassword, verifyTeamPassword, createCoachSession } from "@/lib/game-store";

type Props = {
  teamId: string;
  onSuccess: () => void;
  onCancel: () => void;
};

export function CoachLogin({ teamId, onSuccess, onCancel }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isSetup = !hasTeamPassword(teamId);

  function submit() {
    if (password.length < 4) { setError("Password must be at least 4 characters."); return; }

    if (isSetup) {
      setTeamPassword(teamId, password);
      createCoachSession(teamId);
      onSuccess();
    } else {
      if (verifyTeamPassword(teamId, password)) {
        createCoachSession(teamId);
        onSuccess();
      } else {
        setError("Incorrect password.");
      }
    }
  }

  return (
    <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={onCancel}>
      <div className="w-full max-w-sm border border-[#171717] bg-black p-8" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl uppercase font-bold mb-2">
          {isSetup ? "Set Coach Password" : "Coach Login"}
        </h2>
        <p className="text-xs text-white/35 mb-6">
          {isSetup
            ? "Create a password for your coaching staff to manage games and scoring."
            : "Enter your team password to access scoring."
          }
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(""); }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Team password"
          className="w-full bg-transparent border border-[#171717] px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#17FC13]/40 focus:outline-none transition-colors mb-4"
          autoFocus
        />

        {error && <p className="text-xs text-red-400 mb-4">{error}</p>}

        <div className="flex gap-3">
          <button
            onClick={submit}
            className="flex-1 py-3 border border-[#17FC13]/50 bg-[#17FC13]/[0.06] text-[#17FC13] text-xs font-bold uppercase tracking-wider cursor-pointer transition-all hover:bg-[#17FC13]/[0.1]"
          >
            {isSetup ? "Set Password" : "Login"}
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 border border-[#171717] text-white/40 text-xs font-bold uppercase tracking-wider cursor-pointer bg-transparent hover:text-white/60 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
