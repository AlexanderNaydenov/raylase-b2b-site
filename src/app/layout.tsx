import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "RAYLASE | Laser scan systems",
    template: "%s | RAYLASE",
  },
  description:
    "Industrial laser scan heads, software, and control electronics — modular systems for marking, welding, and e-mobility production.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <body
        className={`${dmSans.className} min-h-full flex flex-col bg-[#f0f4f8] text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
