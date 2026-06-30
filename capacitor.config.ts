import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.numerologistai.app",
  appName: "Numerologist AI",
  // Next.js static export output folder.
  webDir: "out",
  backgroundColor: "#06060f",
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: "#06060f",
      showSpinner: false,
      androidScaleType: "CENTER_CROP",
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#06060f",
    },
    Keyboard: {
      // Resize the webview so the chat composer stays above the keyboard.
      resize: "native",
    },
    // OTA live updates. Download new web bundles in the background and apply
    // them on the next resume. Roll back automatically if a bundle fails to
    // call notifyAppReady() (see components/NativeInit.tsx).
    CapacitorUpdater: {
      autoUpdate: true,
      resetWhenUpdate: true,
    },
  },
  // App talks to the hosted HTTPS backend; no cleartext traffic needed.
  android: {
    allowMixedContent: false,
  },
};

export default config;
