"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WifiOff, Loader2 } from "lucide-react";
import { API_BASE_URL } from "@/lib/config";

type State = "ok" | "offline" | "backend-down";

async function pingBackend(): Promise<boolean> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 6000);
    const res = await fetch(`${API_BASE_URL}/health`, {
      signal: ctrl.signal,
      cache: "no-store",
    });
    clearTimeout(t);
    return res.ok;
  } catch {
    return false;
  }
}

export default function StatusBanner() {
  const [state, setState] = useState<State>("ok");

  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout>;

    async function check() {
      if (!active) return;

      if (typeof navigator !== "undefined" && !navigator.onLine) {
        setState("offline");
        timer = setTimeout(check, 5000);
        return;
      }

      const up = await pingBackend();
      if (!active) return;

      // Distinguish device-offline from backend-down.
      const online = typeof navigator === "undefined" || navigator.onLine;
      setState(up ? "ok" : online ? "backend-down" : "offline");

      // Poll fast while degraded so we recover quickly; slow when healthy.
      timer = setTimeout(check, up ? 25000 : 8000);
    }

    const onChange = () => check();
    window.addEventListener("online", onChange);
    window.addEventListener("offline", onChange);
    check();

    return () => {
      active = false;
      clearTimeout(timer);
      window.removeEventListener("online", onChange);
      window.removeEventListener("offline", onChange);
    };
  }, []);

  const content =
    state === "offline"
      ? { cls: "offline", icon: <WifiOff />, text: "No internet connection" }
      : state === "backend-down"
      ? { cls: "down", icon: <Loader2 className="spin" />, text: "Reconnecting…" }
      : null;

  return (
    <AnimatePresence>
      {content && (
        <motion.div
          className={`banner ${content.cls}`}
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {content.icon}
          {content.text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
