import type { Metadata, Viewport } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import NativeInit from "@/components/NativeInit";
import StatusBanner from "@/components/StatusBanner";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Numerologist AI · Ancient Wisdom, Modern Insight",
  description:
    "Discover your Life Path, lucky elements and personalised numerology forecasts with an AI numerology consultant.",
};

export const viewport: Viewport = {
  themeColor: "#06060f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover", // extend under notches; we pad with safe-area insets
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${jakarta.variable}`}>
      <body>
        <NativeInit />
        <StatusBanner />
        {children}
      </body>
    </html>
  );
}
