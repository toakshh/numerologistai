"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Orbit,
  TrendingUp,
  Heart,
  Moon,
  Target,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const coreNumbers = [
  { n: "1", title: "Life Path", desc: "The core lesson your birth date sets in motion." },
  { n: "5", title: "Destiny", desc: "What your full name reveals about your purpose." },
  { n: "7", title: "Soul Urge", desc: "The inner desires that quietly drive you." },
  { n: "3", title: "Personality", desc: "How the world first perceives you." },
  { n: "9", title: "Maturity", desc: "The wisdom your later years move toward." },
  { n: "8", title: "Personal Year", desc: "The theme of your present cycle." },
];

const steps = [
  { t: "Share your details", d: "Your full name and date of birth — nothing more." },
  { t: "Meet your numbers", d: "Watch your core numerology numbers come alive." },
  { t: "Ask anything", d: "Career, love, finance, health — explore freely." },
  { t: "Get your plan", d: "Leave with lucky elements and a clear roadmap." },
];

const insights = [
  { Icon: Sparkles, title: "Lucky Elements", desc: "Numbers, colors, days and directions aligned to you." },
  { Icon: Orbit, title: "Ruling Planet", desc: "Your dominant planet and how it shapes your nature." },
  { Icon: TrendingUp, title: "Career & Finance", desc: "Suitable paths, money mindset and timing." },
  { Icon: Heart, title: "Relationships", desc: "Compatibility, marriage outlook and harmony." },
  { Icon: Moon, title: "Forecasts", desc: "Weekly, monthly and yearly outlooks." },
  { Icon: Target, title: "Action Plan", desc: "Clear steps for the week, month and year." },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 26 } },
};

export default function Home() {
  return (
    <main className="app">
      <header className="topbar">
        <span className="wordmark">
          <span className="dot" /> Numerologist <span className="soft">AI</span>
        </span>
        <ThemeSwitcher />
      </header>

      <div className="scroll-area">
        {/* HERO */}
        <motion.section
          className="hero"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.span variants={item} className="eyebrow accent">
            AI Numerology
          </motion.span>
          <motion.h1 variants={item} className="h-display">
            Your life,
            <br />
            <span className="grad">in numbers.</span>
          </motion.h1>
          <motion.p variants={item} className="lead">
            A private numerology consultation, guided by AI. Discover your core
            numbers, lucky elements and a forecast made only for you.
          </motion.p>
          <motion.div variants={item} className="btn-row">
            <Link href="/chat" className="btn">
              Begin your reading <ArrowRight />
            </Link>
          </motion.div>
        </motion.section>

        {/* CORE NUMBERS */}
        <section className="page section">
          <Reveal>
            <span className="eyebrow">The Sacred Numbers</span>
            <h2 className="h-section" style={{ marginTop: 10 }}>
              The numbers that define you
            </h2>
          </Reveal>
          <div className="grid cols-2">
            {coreNumbers.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <div className="card">
                  <div className="card-num">{c.n}</div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="page section">
          <Reveal>
            <span className="eyebrow">Your Journey</span>
            <h2 className="h-section" style={{ marginTop: 10 }}>
              How a reading works
            </h2>
          </Reveal>
          <div className="steps">
            {steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.05}>
                <div className="step">
                  <div className="step-n">0{i + 1}</div>
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
        <section className="page section">
          <Reveal>
            <span className="eyebrow">Your Report</span>
            <h2 className="h-section" style={{ marginTop: 10 }}>
              What you&rsquo;ll discover
            </h2>
          </Reveal>
          <div className="grid cols-2">
            {insights.map(({ Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.05}>
                <div className="card">
                  <div className="card-ico">
                    <Icon strokeWidth={1.8} />
                  </div>
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
            <div className="cta">
              <span className="eyebrow accent">Your numbers are waiting</span>
              <h2 className="h-section">Ready to meet your numbers?</h2>
              <p className="lead">
                Begin a free, private conversation and uncover what your name and
                birth date reveal.
              </p>
              <Link href="/chat" className="btn">
                Begin your reading <ArrowRight />
              </Link>
            </div>
          </Reveal>
        </section>

        <footer className="footer">
          <p>
            Numerologist AI — for personal reflection and entertainment. Not a
            substitute for professional advice.
          </p>
          <p style={{ marginTop: 8 }}>
            <Link href="/privacy">Privacy Policy</Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
