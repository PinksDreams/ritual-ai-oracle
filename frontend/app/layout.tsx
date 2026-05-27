import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ritual AI Oracle",
  description: "AI-powered oracle for sentiment and signals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-screen bg-black text-white antialiased">
        <div className="min-h-screen flex flex-col">
          {/* optional glow background layer */}
          <div className="fixed inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black pointer-events-none" />

          {/* main content */}
          <main className="relative z-10 flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}