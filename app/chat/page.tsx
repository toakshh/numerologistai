"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "@/lib/config";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "🙏 Namaste, and welcome. I am Numerologist AI, your personal numerology consultant.\n\nTo begin your reading, I'll need a couple of details:\n\n• Your full name (as on your birth certificate, if possible)\n• Your date of birth (DD/MM/YYYY)\n\nYou can also share optional details — your nickname, gender, country, occupation, relationship status, or a specific area you'd like to focus on (career, marriage, finance, health, and more).\n\nWhenever you're ready, just type your details below. ✦",
};

const SUGGESTIONS = [
  "Tell me about my career",
  "What are my lucky numbers & colors?",
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

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
        // send the conversation without the hardcoded greeting
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
      <div className="cosmic-bg" />
      <div className="stars" />

      <div className="chat-app">
        <header className="chat-head">
          <Link href="/" className="icon-btn" aria-label="Back">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>
          <div className="avatar">🔮</div>
          <div>
            <h3>Numerologist AI</h3>
            <span className="status">
              <span className="dot" /> Online · ready to read
            </span>
          </div>
        </header>

        <div className="messages">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className={`msg ${m.role}`}
                dangerouslySetInnerHTML={{ __html: format(m.content) }}
              />
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="msg assistant"
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

        {error && <div className="error-note">{error}</div>}

        {messages.length <= 2 && (
          <div className="chip-row">
            {SUGGESTIONS.map((s) => (
              <button key={s} className="chip" onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="composer">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            placeholder="Share your details or ask a question..."
          />
          <button
            className="send-btn"
            onClick={() => send(input)}
            disabled={loading || !input.trim()}
            aria-label="Send"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
