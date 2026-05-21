import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "APEX ACADEMY — Where Elite Athletes Are Built",
  description: "The standard in baseball and athlete development. Hitting, pitching, strength, speed, and recruiting — built for the next level.",
  icons: { icon: "/logos/apex-a-mark.png" },
  openGraph: {
    title: "APEX ACADEMY",
    description: "Where Elite Athletes Are Built",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
