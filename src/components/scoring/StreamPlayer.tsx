"use client";

import { useState } from "react";

type Props = {
  streamUrl: string;
  teamName: string;
  opponent: string;
  isLive: boolean;
};

function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export function StreamPlayer({ streamUrl, teamName, opponent, isLive }: Props) {
  const ytId = getYouTubeId(streamUrl);

  return (
    <div className="border border-[#171717] bg-black overflow-hidden relative">
      {isLive && (
        <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/80 backdrop-blur-sm border border-[#17FC13]/30 text-[9px] font-bold uppercase tracking-[0.15em] text-[#17FC13]">
          <span className="w-1.5 h-1.5 bg-[#17FC13] rounded-full animate-pulse" /> Live
        </div>
      )}

      <div className="absolute top-3 right-3 z-10 flex items-center gap-2 px-3 py-1.5 bg-black/80 backdrop-blur-sm border border-[#171717]">
        <span className="text-[10px] font-bold uppercase text-white/60">{opponent}</span>
        <span className="text-[10px] text-white/20">vs</span>
        <span className="text-[10px] font-bold uppercase text-[#17FC13]">{teamName}</span>
      </div>

      <div className="aspect-video">
        {ytId ? (
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        ) : (
          <iframe
            src={streamUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        )}
      </div>
    </div>
  );
}

export function StreamSetupModal({ onSave, onCancel, existingUrl }: {
  onSave: (url: string) => void;
  onCancel: () => void;
  existingUrl?: string;
}) {
  const [url, setUrl] = useState(existingUrl || "");

  return (
    <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={onCancel}>
      <div className="w-full max-w-md border border-[#171717] bg-black" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 pt-6 pb-4 border-b border-[#171717]">
          <h2 className="text-lg uppercase font-bold mb-1">Stream Setup</h2>
          <p className="text-[10px] text-white/25">Paste a YouTube Live or video URL to stream on the game page.</p>
        </div>

        <div className="px-6 py-5">
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">YouTube URL *</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://youtube.com/live/..."
            className="w-full bg-transparent border border-[#171717] px-4 py-3 text-sm text-white placeholder-white/15 focus:border-[#17FC13]/40 focus:outline-none"
            autoFocus
          />
          <p className="text-[9px] text-white/15 mt-1.5">Supports YouTube Live, YouTube videos, or any embeddable URL</p>
        </div>

        <div className="px-6 py-4 border-t border-[#171717] flex gap-3">
          <button onClick={() => url && onSave(url)} disabled={!url} className="flex-1 py-3 border border-[#17FC13]/50 bg-[#17FC13]/[0.06] text-[#17FC13] text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-[#17FC13]/[0.1] disabled:opacity-20 disabled:cursor-not-allowed">
            {existingUrl ? "Update" : "Set Stream"}
          </button>
          <button onClick={onCancel} className="px-6 py-3 border border-[#171717] text-white/40 text-xs font-bold uppercase tracking-wider cursor-pointer bg-transparent hover:text-white/60">Cancel</button>
        </div>
      </div>
    </div>
  );
}
