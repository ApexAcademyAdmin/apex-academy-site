import type { Metadata } from "next";
import { inter, bebasNeue } from "@/lib/fonts";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "APEX ACADEMY — Where Athletes Are Developed",
  description: "Baseball development in Boston. Hitting, pitching, strength, speed, recruiting — built for the next level.",
  icons: { icon: "/logos/favicon-192.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
