"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Sparkles, Shield } from "lucide-react";

const items = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/chat", label: "Reading", Icon: Sparkles },
  { href: "/privacy", label: "Privacy", Icon: Shield },
];

// Normalize for Next's `trailingSlash: true` (pathname comes back as "/x/").
const norm = (p: string) => p.replace(/\/+$/, "") || "/";

export default function BottomNav() {
  const pathname = usePathname() ?? "/";
  const current = norm(pathname);

  // Reading is a full-screen surface (own composer) — no tab bar there.
  if (current === "/chat") return null;

  return (
    <nav className="tabbar">
      {items.map(({ href, label, Icon }) => {
        const active = norm(href) === current;
        return (
          <Link
            key={href}
            href={href}
            className={`tab ${active ? "active" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            <span className="tab-ico">
              {active && (
                <motion.span
                  layoutId="tab-pill"
                  className="tab-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <Icon strokeWidth={2} />
            </span>
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
