import type { BattingLine, PitchingLine } from "@/lib/scoring-types";

export function BattingBoxScore({ lines }: { lines: BattingLine[] }) {
  if (lines.length === 0) return <p className="text-sm text-white/70">No at-bats recorded.</p>;
  return (
    <div className="border border-[#171717] overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-[#171717] bg-white/[0.02]">
            <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-white/70 min-w-[140px]">Batter</th>
            {["AB", "H", "2B", "3B", "HR", "RBI", "BB", "K", "AVG"].map((h) => (
              <th key={h} className="px-2 py-3 font-bold text-white/70 text-center">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lines.map((l) => (
            <tr key={l.playerId} className="border-b border-[#171717] last:border-b-0 hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-bold uppercase text-white/70">{l.playerName}</td>
              <td className="px-2 py-3 text-center text-white/90">{l.AB}</td>
              <td className="px-2 py-3 text-center text-white/90">{l.H}</td>
              <td className="px-2 py-3 text-center text-white/90">{l["2B"]}</td>
              <td className="px-2 py-3 text-center text-white/90">{l["3B"]}</td>
              <td className="px-2 py-3 text-center text-white/90">{l.HR}</td>
              <td className="px-2 py-3 text-center text-white/90">{l.RBI}</td>
              <td className="px-2 py-3 text-center text-white/90">{l.BB}</td>
              <td className="px-2 py-3 text-center text-white/90">{l.K}</td>
              <td className="px-2 py-3 text-center font-bold text-white/80">{l.AVG}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PitchingBoxScore({ lines }: { lines: PitchingLine[] }) {
  if (lines.length === 0) return <p className="text-sm text-white/70">No pitching data recorded.</p>;
  return (
    <div className="border border-[#171717] overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-[#171717] bg-white/[0.02]">
            <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-white/70 min-w-[140px]">Pitcher</th>
            {["IP", "H", "R", "ER", "BB", "K", "PC", "ERA"].map((h) => (
              <th key={h} className="px-2 py-3 font-bold text-white/70 text-center">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lines.map((l) => (
            <tr key={l.playerId} className="border-b border-[#171717] last:border-b-0 hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-bold uppercase text-white/70">{l.playerName}</td>
              <td className="px-2 py-3 text-center text-white/90">{l.IP}</td>
              <td className="px-2 py-3 text-center text-white/90">{l.H}</td>
              <td className="px-2 py-3 text-center text-white/90">{l.R}</td>
              <td className="px-2 py-3 text-center text-white/90">{l.ER}</td>
              <td className="px-2 py-3 text-center text-white/90">{l.BB}</td>
              <td className="px-2 py-3 text-center text-white/90">{l.K}</td>
              <td className="px-2 py-3 text-center text-white/90">{l.PC}</td>
              <td className="px-2 py-3 text-center font-bold text-white/80">{l.ERA}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
