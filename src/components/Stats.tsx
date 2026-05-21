"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 200, suffix: "+", label: "Athletes Developed" },
  { value: 15, suffix: "+", label: "College Commitments" },
  { value: 8, suffix: "", label: "Age Groups" },
  { value: 4, suffix: "", label: "Travel Teams" },
];

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) setStarted(true);
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const interval = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(interval); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(interval);
  }, [started, target, duration]);

  return { count, ref };
}

export function Stats() {
  return (
    <section className="relative py-20 bg-black border-y border-white/[0.04]">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6EFF00]/[0.02] via-transparent to-[#6EFF00]/[0.02]" />
      <div className="relative max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <StatItem key={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div className="text-[42px] md:text-[56px] font-black text-white leading-none">
        {count}<span className="text-[#6EFF00]">{suffix}</span>
      </div>
      <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 mt-2">{label}</div>
    </div>
  );
}
