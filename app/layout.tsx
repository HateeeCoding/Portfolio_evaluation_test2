import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio Analysis | Clarity for Retail Investors",
  description: "Sophisticated portfolio analysis translated into human, visual, and actionable insights for everyday retail investors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F8F9FA] text-slate-900 antialiased selection:bg-slate-200">
        {children}
      </body>
    </html>
  );
}
