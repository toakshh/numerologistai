"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send } from "lucide-react";
import { API_BASE_URL } from "@/lib/config";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Namaste. I'm your AI numerology consultant.\n\nTo begin, share two things:\n\n— Your full name (as on your birth certificate, if possible)\n— Your date of birth (DD/MM/YYYY)\n\nOptional: nickname, gender, country, occupation, relationship status, or an area you'd like to focus on — career, marriage, finance or health.\n\nWhenever you're ready, type your details below.",
};

const SUGGESTIONS = [
  "Tell me about my career",
  "My lucky numbers & colors",
  "Marriage & relationship outlook",
  "My forecast for this year",
];

// minimal + safe formatter: escape HTML, then apply **bold**
function format(text: string) {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Auto-grow the composer as the user types (capped by CSS max-height).
  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 130) + "px";
  }, [input]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;

    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(1) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch (e: any) {
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <main className="app">
      <div className="chat">
        <header className="chat-top">
          <Link href="/" className="icon-btn" aria-label="Back">
            <ArrowLeft />
          </Link>
          <div className="chat-orb" aria-hidden />
          <div className="chat-meta">
            <h3>Numerologist AI</h3>
            <span className="status">
              <span className="live" /> Online · ready to read
            </span>
          </div>
        </header>

        <div className="msgs">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
                className={`msg ${m.role === "user" ? "user" : "ai"}`}
                dangerouslySetInnerHTML={{ __html: format(m.content) }}
              />
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="msg ai"
            >
              <span className="typing">
                <span />
                <span />
                <span />
              </span>
            </motion.div>
          )}
          <div ref={endRef} />
        </div>

        {error && <div className="err">{error}</div>}

        <AnimatePresence>
          {messages.length <= 2 && (
            <motion.div
              className="chips"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {SUGGESTIONS.map((s, i) => (
                <motion.button
                  key={s}
                  className="chip"
                  onClick={() => send(s)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.08 * i, type: "spring", stiffness: 300, damping: 24 }}
                  whileTap={{ scale: 0.94 }}
                >
                  {s}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="composer">
          <textarea
            ref={taRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            placeholder="Share your details or ask a question…"
          />
          <button
            className="send"
            onClick={() => send(input)}
            disabled={loading || !input.trim()}
            aria-label="Send"
          >
            <Send />
          </button>
        </div>
      </div>
    </main>
  );
}
