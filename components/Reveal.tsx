"use client";

import { motion } from "framer-motion";

// Scroll-reveal wrapper. Spring physics (not a fixed-duration ease) so elements
// settle with a natural, premium feel. Compositor-only props (opacity + y).
export default function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 28,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
