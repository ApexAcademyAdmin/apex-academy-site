"use client";

import { useState, useEffect, useRef } from "react";

type Props = {
  venueName: string;
  venueAddress: string;
  onSelect: (name: string, address: string) => void;
};

type Result = {
  id: string;
  name: string;
  address: string;
};

export function VenueSearch({ venueName, venueAddress, onSelect }: Props) {
  const [query, setQuery] = useState(venueName || "");
  const [results, setResults] = useState<Result[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Outside click closes dropdown
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  async function search(input: string) {
    if (input.length < 2) { setResults([]); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/places", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });

      const data = await res.json();
      setResults(data.places || []);
      setOpen((data.places || []).length > 0);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function handleInput(value: string) {
    setQuery(value);
    onSelect(value, venueAddress);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => search(value), 400);
  }

  function handlePick(r: Result) {
    setQuery(r.name);
    onSelect(r.name, r.address);
    setResults([]);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="space-y-4">
      <div className="relative">
        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 mb-2">Field / Venue *</label>
        <input
          value={query}
          onChange={(e) => handleInput(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Search venue or field name..."
          className="w-full bg-transparent border border-[#171717] px-4 py-3 text-sm text-white placeholder-white/15 focus:border-[#17FC13]/40 focus:outline-none transition-colors"
        />

        {/* Loading indicator */}
        {loading && (
          <div className="absolute right-3 top-[38px] text-[10px] text-[#17FC13]/50">Searching...</div>
        )}

        {/* Results dropdown */}
        {open && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-30 mt-1 border border-[#171717] bg-black max-h-[260px] overflow-y-auto">
            {results.map((r) => (
              <button
                key={r.id}
                onClick={() => handlePick(r)}
                className="w-full text-left px-4 py-3 hover:bg-white/[0.04] transition-colors cursor-pointer bg-transparent"
                style={{ borderBottom: "1px solid #171717" }}
              >
                <div className="text-sm text-white/80">{r.name}</div>
                <div className="text-[11px] text-white/70 mt-0.5">{r.address}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 mb-2">Address {venueAddress ? "" : "*"}</label>
        <input
          value={venueAddress}
          onChange={(e) => onSelect(query, e.target.value)}
          placeholder="Auto-fills when you select a venue"
          className={`w-full bg-transparent border px-4 py-3 text-sm text-white placeholder-white/15 focus:border-[#17FC13]/40 focus:outline-none transition-colors ${venueAddress ? "border-[#17FC13]/20" : "border-[#171717]"}`}
        />
      </div>
    </div>
  );
}
