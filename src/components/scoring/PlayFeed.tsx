import type { AtBat } from "@/lib/scoring-types";
import { resultLabel } from "@/lib/scoring-utils";

export function PlayFeed({ atBats }: { atBats: AtBat[] }) {
  const sorted = [...atBats].reverse().slice(0, 15);

  if (sorted.length === 0) {
    return <p className="text-sm text-white/25">No plays recorded yet.</p>;
  }

  return (
    <div className="space-y-0 border border-[#171717]">
      {sorted.map((ab) => (
        <div key={ab.id} className="px-4 py-3 border-b border-[#171717] last:border-b-0 flex items-start gap-3">
          <span className="text-[9px] font-bold uppercase tracking-wider text-white/20 shrink-0 mt-0.5 w-14">
            {ab.isTopHalf ? "Top" : "Bot"} {ab.inning}
          </span>
          <span className="text-sm text-white/60">
            <span className="font-bold text-white/80">{ab.playerName}</span>{" "}
            {resultLabel(ab.result).toLowerCase()}
            {ab.rbis > 0 && <span className="text-[#17FC13]"> ({ab.rbis} RBI)</span>}
          </span>
        </div>
      ))}
    </div>
  );
}
