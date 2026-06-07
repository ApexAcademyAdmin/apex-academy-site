import { Inter, Exo_2, Orbitron } from "next/font/google";

// Body / default — paragraphs, forms, UI text.
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Display — headlines, section titles, team/player names, nav, CTAs.
export const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-display",
});

// Performance — scores, stats, records, metrics, velocities, standings.
export const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-perf",
});
