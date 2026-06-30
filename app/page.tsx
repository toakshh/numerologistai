"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import BottomNav from "@/components/BottomNav";

const coreNumbers = [
  { n: "1", title: "Life Path", desc: "The core lesson your birth date sets in motion." },
  { n: "5", title: "Destiny", desc: "What your full name reveals about your purpose." },
  { n: "7", title: "Soul Urge", desc: "The inner desires that quietly drive you." },
  { n: "3", title: "Personality", desc: "How the world perceives you at first meeting." },
  { n: "9", title: "Maturity", desc: "The wisdom your later years move toward." },
  { n: "8", title: "Personal Year", desc: "The energetic theme of your present cycle." },
];

const steps = [
  { t: "Share your details", d: "Tell the AI your full name and date of birth." },
  { t: "Receive your numbers", d: "Watch your core numerology numbers come alive." },
  { t: "Ask anything", d: "Career, marriage, finance, health — explore freely." },
  { t: "Get your action plan", d: "Walk away with lucky elements and a roadmap." },
];

const insights = [
  ["✦", "Lucky Elements", "Numbers, colors, days, directions and gemstones for you."],
  ["☉", "Dominant Planet", "Your ruling planet and how it shapes your nature."],
  ["₹", "Career & Finance", "Suitable paths, money mindset and timing."],
  ["❤", "Relationships", "Compatibility, marriage outlook and communication."],
  ["☾", "Forecasts", "Weekly, monthly and yearly numerological outlooks."],
  ["✓", "Action Plan", "Clear steps for the next week, month and year."],
];

export default function Home() {
  return (
    <main className="app">
      <div className="cosmic-bg" />
      <div className="stars" />

      <header className="appbar">
        <div className="brand">
          <span className="om">ॐ</span> Numerologist AI
        </div>
        <Link href="/chat" className="appbar-pill">
          Begin
        </Link>
      </header>

      <div className="scroll-area">
        {/* HERO */}
        <section className="hero">
          <motion.div
            className="mandala"
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="mandala ring-2"
            animate={{ rotate: -360 }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <span className="hero-badge">Ancient Wisdom · Modern Insight</span>
            <h1>
              Decode the <span className="grad">Numbers</span> in Your Name
            </h1>
            <p>
              A guided numerology consultation powered by AI. Discover your Life
              Path, lucky elements and a forecast crafted just for you.
            </p>
            <Link href="/chat" className="btn">
              Start Your Reading ✦
            </Link>
          </motion.div>
        </section>

        {/* CORE NUMBERS */}
        <section className="section-h">
          <Reveal>
            <span className="eyebrow">The Sacred Numbers</span>
            <h2 className="title">Every number tells a story</h2>
            <p className="lead">
              Numerology distills your name and birth date into core numbers,
              each a window into part of your life.
            </p>
          </Reveal>
        </section>
        <section className="page" style={{ paddingTop: 8 }}>
          <div className="grid cols-2">
            {coreNumbers.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <div className="card">
                  <div className="num">{c.n}</div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section-h">
          <Reveal>
            <span className="eyebrow">Your Journey</span>
            <h2 className="title">How your reading unfolds</h2>
          </Reveal>
        </section>
        <section className="page" style={{ paddingTop: 8 }}>
          <div className="steps">
            {steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.06}>
                <div className="step">
                  <div className="step-num">{i + 1}</div>
                  <div>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* WHAT YOU GET */}
        <section className="section-h">
          <Reveal>
            <span className="eyebrow">Your Personalised Report</span>
            <h2 className="title">Insight across every part of life</h2>
          </Reveal>
        </section>
        <section className="page" style={{ paddingTop: 8 }}>
          <div className="grid cols-2">
            {insights.map(([icon, title, desc], i) => (
              <Reveal key={title} delay={i * 0.05}>
                <div className="card">
                  <div className="num">{icon}</div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="page">
          <Reveal>
            <div className="cta-band">
              <span className="eyebrow">Your numbers are waiting</span>
              <h2 className="title">Ready to meet your profile?</h2>
              <p className="lead" style={{ margin: "0 auto" }}>
                Begin a free conversation and uncover what your name and birth
                date reveal.
              </p>
              <Link href="/chat" className="btn">
                Begin Your Reading ✦
              </Link>
            </div>
          </Reveal>
        </section>

        <footer className="app-footer">
          <p>
            ॐ Numerologist AI — For personal reflection and entertainment. Not a
            substitute for professional advice.
          </p>
          <p style={{ marginTop: 8 }}>
            <Link href="/privacy">Privacy Policy</Link>
          </p>
        </footer>
      </div>

      <BottomNav />
    </main>
  );
}
