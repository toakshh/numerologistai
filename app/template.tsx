"use client";

import { motion } from "framer-motion";

// App Router re-mounts this wrapper on every route change, so this mount
// animation doubles as a page transition. Kept to opacity + a tiny translate
// (compositor-only) so it stays buttery on a mobile WebView.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", flexDirection: "column", minHeight: "100dvh" }}
    >
      {children}
    </motion.div>
  );
}
