import type { Metadata } from "next";
import localFont from "next/font/local";
import { connection } from "next/server";
import "./globals.css";

const geist = localFont({
  src: "./fonts/geist-latin.woff2",
  variable: "--font-ft-body",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "FekiTech Builder — Build and publish without code",
    template: "%s | FekiTech Builder",
  },
  description: "Choose a template, customize your website, preview every change, and publish when your plan is active.",
  icons: { icon: "/fekitech-logo.png", apple: "/fekitech-logo.png" },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await connection();
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`} data-scroll-behavior="smooth">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
