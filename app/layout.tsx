import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Uriel Maforikan — Visual Storyteller & Brand Designer",
  description: "Uriel Maforikan is a visual storyteller, brand designer, and filmmaker based in Lagos, Nigeria. Creator of the Mr. Perfect Series.",
  keywords: ["Uriel Maforikan", "visual storyteller", "brand designer", "filmmaker", "Lagos", "Nigeria"],
  openGraph: {
    title: "Uriel Maforikan — Visual Storyteller & Brand Designer",
    description: "Telling stories through light, frame, and form. Turning brands into worlds people want to live in.",
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
