"use client";

import { useState } from "react";
import { createGame } from "@/lib/game-store";
import { GAME_TYPE_LABELS } from "@/lib/scoring-types";
import type { GameType } from "@/lib/scoring-types";
import { VenueSearch } from "./VenueSearch";

type Props = {
  teamId: string;
  onCreated: () => void;
  onCancel: () => void;
};

const GAME_TYPES: GameType[] = ["league", "tournament", "showcase", "scrimmage"];

export function AddGameForm({ teamId, onCreated, onCancel }: Props) {
  const [opponent, setOpponent] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [gameType, setGameType] = useState<GameType>("league");
  const [eventName, setEventName] = useState("");
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [totalInnings, setTotalInnings] = useState("7");

  function submit() {
    if (!opponent || !date || !venueName || !venueAddress) return;
    createGame(teamId, {
      date, time: time || "TBD", opponent, gameType,
      eventName: eventName || undefined,
      venue: { name: venueName, address: venueAddress },
      totalInnings: parseInt(totalInnings) || 7,
    });
    onCreated();
  }

  const isValid = opponent && date && venueName && venueAddress;

  const eventLabel =
    gameType === "league" ? "League Name" :
    gameType === "tournament" ? "Tournament Name" :
    gameType === "showcase" ? "Showcase Name" :
    "Event Name";

  const eventPlaceholder =
    gameType === "league" ? "League Name" :
    gameType === "tournament" ? "Tournament Name" :
    gameType === "showcase" ? "Showcase Name" :
    "Event Name";

  return (
    <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={onCancel}>
      <div className="w-full max-w-lg border border-[#171717] bg-black my-8" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="px-6 md:px-8 pt-6 md:pt-8 pb-5 border-b border-[#171717]">
          <h2 className="text-xl uppercase font-bold mb-1">Add Game</h2>
          <p className="text-xs text-white/30">Schedule a new game for your team.</p>
        </div>

        {/* Form body */}
        <div className="px-6 md:px-8 py-6 space-y-6">

          {/* Game Type — 4 equal columns */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-3">Game Type *</label>
            <div className="grid grid-cols-4 gap-2">
              {GAME_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setGameType(t)}
                  className={`py-3 border text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
                    gameType === t
                      ? "border-[#17FC13]/50 text-[#17FC13] bg-[#17FC13]/[0.06]"
                      : "border-[#171717] text-white/35 hover:border-white/15 hover:text-white/50"
                  }`}
                >
                  {GAME_TYPE_LABELS[t]}
                </button>
              ))}
            </div>
          </div>

          {/* Event Name + Opponent — 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">{eventLabel}</label>
              <input value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder={eventPlaceholder} className="w-full bg-transparent border border-[#171717] px-4 py-3 text-sm text-white placeholder-white/15 focus:border-[#17FC13]/40 focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Opponent *</label>
              <input value={opponent} onChange={(e) => setOpponent(e.target.value)} placeholder="Team Name" className="w-full bg-transparent border border-[#171717] px-4 py-3 text-sm text-white placeholder-white/15 focus:border-[#17FC13]/40 focus:outline-none transition-colors" autoFocus />
            </div>
          </div>

          {/* Date / Time / Innings — 3 columns */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Date *</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} onFocus={(e) => e.target.showPicker?.()} onClick={(e) => (e.target as HTMLInputElement).showPicker?.()} className="w-full bg-transparent border border-[#171717] px-4 py-3 text-sm text-white focus:border-[#17FC13]/40 focus:outline-none transition-colors cursor-pointer" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Time</label>
              <select value={time} onChange={(e) => setTime(e.target.value)} className="w-full bg-black border border-[#171717] px-4 py-3 text-sm text-white focus:border-[#17FC13]/40 focus:outline-none cursor-pointer appearance-none">
                <option value="">Select</option>
                {["8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM","5:30 PM","6:00 PM","6:30 PM","7:00 PM","7:30 PM","8:00 PM"].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Innings</label>
              <select value={totalInnings} onChange={(e) => setTotalInnings(e.target.value)} className="w-full bg-black border border-[#171717] px-4 py-3 text-sm text-white focus:border-[#17FC13]/40 focus:outline-none cursor-pointer appearance-none">
                {["5", "6", "7", "9"].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>

          {/* Venue — Google Places Autocomplete */}
          <VenueSearch
            venueName={venueName}
            venueAddress={venueAddress}
            onSelect={(name, address) => { setVenueName(name); setVenueAddress(address); }}
          />
        </div>

        {/* Footer */}
        <div className="px-6 md:px-8 py-5 border-t border-[#171717] flex gap-3">
          <button onClick={submit} disabled={!isValid} className="flex-1 py-3.5 border border-[#17FC13]/50 bg-[#17FC13]/[0.06] text-[#17FC13] text-xs font-bold uppercase tracking-wider cursor-pointer transition-all hover:bg-[#17FC13]/[0.1] disabled:opacity-20 disabled:cursor-not-allowed">
            Add Game
          </button>
          <button onClick={onCancel} className="px-8 py-3.5 border border-[#171717] text-white/40 text-xs font-bold uppercase tracking-wider cursor-pointer bg-transparent hover:text-white/60 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
