import type { AtBatResult } from "./scoring-types";

export function isHit(r: AtBatResult): boolean { return r === "1B" || r === "2B" || r === "3B" || r === "HR"; }

export function isAtBat(r: AtBatResult): boolean { return r !== "BB" && r !== "HBP" && r !== "SAC" && r !== "SF" && r !== "SB" && r !== "CS" && r !== "PO_RUNNER" && r !== "WP" && r !== "PB" && r !== "BK"; }

export function isOnBase(r: AtBatResult): boolean { return isHit(r) || r === "BB" || r === "HBP" || r === "E" || r === "ROE" || r === "FC"; }

export function isOut(r: AtBatResult): boolean { return r === "K" || r === "KL" || r === "GO" || r === "FO" || r === "LO" || r === "PO" || r === "FC" || r === "SAC" || r === "SF" || r === "DP" || r === "TP" || r === "CS" || r === "PO_RUNNER"; }

export function totalBases(r: AtBatResult): number { if (r === "1B") return 1; if (r === "2B") return 2; if (r === "3B") return 3; if (r === "HR") return 4; return 0; }

export function resultLabel(r: AtBatResult): string {
  const m: Record<string, string> = {
    "1B": "Single", "2B": "Double", "3B": "Triple", "HR": "Home Run",
    "BB": "Walk", "HBP": "Hit By Pitch",
    "K": "Strikeout", "KL": "Strikeout Looking",
    "GO": "Groundout", "FO": "Flyout", "LO": "Lineout", "PO": "Popout",
    "FC": "Fielder's Choice", "SAC": "Sacrifice Bunt", "SF": "Sac Fly",
    "E": "Error", "ROE": "Reached on Error",
    "DP": "Double Play", "TP": "Triple Play",
    "SB": "Stolen Base", "CS": "Caught Stealing", "PO_RUNNER": "Picked Off",
    "WP": "Wild Pitch", "PB": "Passed Ball", "BK": "Balk",
  };
  return m[r] || r;
}

export function resultCategory(r: AtBatResult): "hit" | "onbase" | "out" | "error" | "running" {
  if (isHit(r)) return "hit";
  if (r === "BB" || r === "HBP") return "onbase";
  if (r === "E" || r === "ROE") return "error";
  if (r === "SB" || r === "CS" || r === "PO_RUNNER" || r === "WP" || r === "PB" || r === "BK") return "running";
  return "out";
}

export function formatAvg(h: number, ab: number): string { if (ab === 0) return ".000"; return (h / ab).toFixed(3).replace(/^0/, ""); }
export function formatEra(er: number, ip: number, gi: number = 7): string { if (ip === 0) return "0.00"; return ((er / ip) * gi).toFixed(2); }
export function formatWhip(bb: number, h: number, ip: number): string { if (ip === 0) return "0.00"; return ((bb + h) / ip).toFixed(2); }
export function uid(): string { return Math.random().toString(36).slice(2, 10) + Date.now().toString(36); }
