import type { Metadata } from "next";
import { Outfit, DM_Sans, Space_Mono, Great_Vibes } from "next/font/google";
import "./globals.css";

const display = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-display",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "CTOWN | AI-Powered Vehicle Technology",
  description:
    "AI-powered performance systems engineered for the world's most exceptional vehicles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable} ${body.variable} ${script.variable}`}
    >
      <body className="font-body antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
