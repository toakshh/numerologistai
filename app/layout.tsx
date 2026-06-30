import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
// Space Grotesk shipped as bundled woff2 (works offline / in WebView).
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "./globals.css";
import NativeInit from "@/components/NativeInit";
import StatusBanner from "@/components/StatusBanner";
import BottomNav from "@/components/BottomNav";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Numerologist AI · Your life, in numbers",
  description:
    "A private AI numerology consultation. Discover your core numbers, lucky elements and a personalised forecast.",
};

export const viewport: Viewport = {
  themeColor: "#07080d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

// Applies the saved theme before first paint to avoid a flash of the default.
const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(t==='aurora'||t==='emerald'||t==='neon'){document.documentElement.dataset.theme=t;}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="aurora"
      className={jakarta.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        {/* Signature ambient light — rendered once, never repaints on nav. */}
        <div className="backdrop" aria-hidden>
          <div className="aura a1" />
          <div className="aura a2" />
          <div className="aura a3" />
          <div className="grain" />
        </div>

        <NativeInit />
        <StatusBanner />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
