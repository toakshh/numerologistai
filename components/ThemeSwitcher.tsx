"use client";

import { useEffect, useState } from "react";

const THEMES = [
  { id: "aurora", label: "Aurora Noir" },
  { id: "emerald", label: "Emerald Mystic" },
  { id: "neon", label: "Neon Cosmos" },
] as const;

type ThemeId = (typeof THEMES)[number]["id"];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>("aurora");

  // Read whatever the no-flash init script already applied to <html>.
  useEffect(() => {
    const t = document.documentElement.dataset.theme as ThemeId;
    if (t === "aurora" || t === "emerald" || t === "neon") setTheme(t);
  }, []);

  function pick(id: ThemeId) {
    if (id === theme) return;
    setTheme(id);
    const root = document.documentElement;
    root.dataset.theme = id;
    try {
      localStorage.setItem("theme", id);
    } catch {}

    // Keep browser + native chrome color in sync with the theme background.
    const bg = getComputedStyle(root).getPropertyValue("--bg").trim();
    if (bg) {
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", bg);
      (async () => {
        try {
          const { Capacitor } = await import("@capacitor/core");
          if (!Capacitor.isNativePlatform()) return;
          const { StatusBar } = await import("@capacitor/status-bar");
          await StatusBar.setBackgroundColor({ color: bg });
        } catch {}
      })();
    }
  }

  return (
    <div className="theme-switch" role="group" aria-label="Color theme">
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`swatch s-${t.id} ${theme === t.id ? "active" : ""}`}
          onClick={() => pick(t.id)}
          aria-label={t.label}
          aria-pressed={theme === t.id}
          title={t.label}
        />
      ))}
    </div>
  );
}
