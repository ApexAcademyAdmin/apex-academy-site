import type { LinescoreData } from "@/lib/scoring-types";

type Props = {
  linescore: LinescoreData;
  teamName: string;
  opponent: string;
};

export function Linescore({ linescore, teamName, opponent }: Props) {
  const { innings, homeRuns, awayRuns, homeHits, awayHits, homeErrors, awayErrors } = linescore;

  return (
    <div className="border border-[#171717] overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-[#171717] bg-white/[0.02]">
            <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-white/70 min-w-[120px]">Team</th>
            {innings.map((_, i) => (
              <th key={i} className="px-3 py-3 font-bold text-white/70 text-center w-10">{i + 1}</th>
            ))}
            <th className="px-3 py-3 font-bold text-white/90 text-center border-l border-[#171717] w-10">R</th>
            <th className="px-3 py-3 font-bold text-white/90 text-center w-10">H</th>
            <th className="px-3 py-3 font-bold text-white/90 text-center w-10">E</th>
          </tr>
        </thead>
        <tbody>
          {/* Away / Opponent */}
          <tr className="border-b border-[#171717]">
            <td className="px-4 py-3 font-bold uppercase text-white/60">{opponent}</td>
            {innings.map((inn, i) => (
              <td key={i} className="px-3 py-3 text-center text-white/90">{inn.top}</td>
            ))}
            <td className="px-3 py-3 text-center font-bold border-l border-[#171717]">{awayRuns}</td>
            <td className="px-3 py-3 text-center text-white/90">{awayHits}</td>
            <td className="px-3 py-3 text-center text-white/90">{awayErrors}</td>
          </tr>
          {/* Home / Apex */}
          <tr>
            <td className="px-4 py-3 font-bold uppercase text-[#17FC13]">{teamName}</td>
            {innings.map((inn, i) => (
              <td key={i} className="px-3 py-3 text-center text-white/90">
                {inn.bottom !== null ? inn.bottom : linescore.currentInning - 1 === i && !linescore.isTopHalf ? "—" : ""}
              </td>
            ))}
            <td className="px-3 py-3 text-center font-bold border-l border-[#171717]">{homeRuns}</td>
            <td className="px-3 py-3 text-center text-white/90">{homeHits}</td>
            <td className="px-3 py-3 text-center text-white/90">{homeErrors}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
