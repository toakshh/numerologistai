import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import OpenAI from "openai";
import { numerologistPrompt } from "./prompt.js";

const PORT = process.env.PORT || 8787;
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

// Comma-separated list of allowed web origins. Native apps (Capacitor) send
// no/!browser origin, so requests with no Origin header are allowed too.
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

if (!process.env.OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY in environment. See backend/.env");
  process.exit(1);
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const app = express();
app.set("trust proxy", 1);
app.use(helmet());
app.use(express.json({ limit: "256kb" }));

app.use(
  cors({
    origin(origin, cb) {
      // Allow native app (no origin) or whitelisted web origins.
      if (!origin || ALLOWED_ORIGINS.length === 0 || ALLOWED_ORIGINS.includes(origin)) {
        return cb(null, true);
      }
      cb(new Error("Not allowed by CORS"));
    },
  })
);

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20, // 20 requests / minute / IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please slow down and try again." },
});

app.get("/health", (_req, res) =>
  res.json({
    ok: true,
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  })
);

app.post("/api/chat", limiter, async (req, res) => {
  const { messages } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Invalid request." });
  }
  if (messages.length > 40) {
    return res.status(400).json({ error: "Conversation too long." });
  }

  // Keep only well-formed user/assistant text turns.
  const safeMessages = messages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.length <= 4000
    )
    .map((m) => ({ role: m.role, content: m.content }));

  if (safeMessages.length === 0) {
    return res.status(400).json({ error: "Invalid messages." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: MODEL,
      temperature: 0.7,
      messages: [
        { role: "system", content: numerologistPrompt },
        ...safeMessages,
      ],
    });

    const reply = completion.choices[0]?.message?.content ?? "";
    res.json({ reply });
  } catch (err) {
    console.error("OpenAI error:", err?.message);
    res.status(502).json({ error: "The numerology service is busy. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`Numerologist AI backend running on http://localhost:${PORT}`);
});

// Keep-alive: many free hosts idle/sleep an instance after inactivity. When
// SELF_URL is set, the server pings its own /health on an interval so it stays
// warm. This complements (not replaces) the external GitHub Actions cron, which
// is the reliable wake-up mechanism if the host fully suspends the process.
const SELF_URL = process.env.SELF_URL;
const KEEP_ALIVE_MS = Number(process.env.KEEP_ALIVE_MS || 14 * 60 * 1000);
if (SELF_URL) {
  setInterval(() => {
    fetch(`${SELF_URL.replace(/\/$/, "")}/health`).catch(() => {});
  }, KEEP_ALIVE_MS);
}
