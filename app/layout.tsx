import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Visuals by Uriel — Brand Identity & Graphic Design",
  description: "Uriel Maforikan is a graphic designer and brand identity specialist based in Osun, Nigeria. Available for freelance brand identity, logo design, and marketing design.",
  keywords: ["Visuals by Uriel", "Uriel Maforikan", "brand identity designer", "logo designer", "graphic designer", "Nigeria", "Osun"],
  openGraph: {
    title: "Visuals by Uriel — Brand Identity & Graphic Design",
    description: "I help brands stand out with unique, enduring identities — built on strategy, crafted with intention.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#080808" }}>{children}</body>
    </html>
  );
}
