"use client";

import { useEffect } from "react";

// Initializes native-only behavior when running inside Capacitor.
// On the web these calls are skipped, so the same build works everywhere.
export default function NativeInit() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    (async () => {
      const { Capacitor } = await import("@capacitor/core");
      if (!Capacitor.isNativePlatform()) return;

      const { StatusBar, Style } = await import("@capacitor/status-bar");
      const { SplashScreen } = await import("@capacitor/splash-screen");
      const { App } = await import("@capacitor/app");

      try {
        await StatusBar.setStyle({ style: Style.Dark }); // light text on dark theme
        if (Capacitor.getPlatform() === "android") {
          // Match the status bar to the active theme's background.
          const bg =
            getComputedStyle(document.documentElement)
              .getPropertyValue("--bg")
              .trim() || "#07080d";
          await StatusBar.setBackgroundColor({ color: bg });
        }
      } catch {}

      // OTA: confirm the running bundle is healthy so Capgo won't roll it back.
      // With autoUpdate enabled (capacitor.config.ts), new bundles download in
      // the background and apply on the next app resume.
      try {
        const { CapacitorUpdater } = await import("@capgo/capacitor-updater");
        await CapacitorUpdater.notifyAppReady();
      } catch {}

      await SplashScreen.hide();

      // Android hardware back button: exit only from the home screen.
      const sub = await App.addListener("backButton", ({ canGoBack }) => {
        if (canGoBack) window.history.back();
        else App.exitApp();
      });
      cleanup = () => sub.remove();
    })();

    return () => cleanup?.();
  }, []);

  return null;
}
