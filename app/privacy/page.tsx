import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export const metadata = {
  title: "Privacy Policy · Numerologist AI",
};

export default function Privacy() {
  return (
    <main className="app">
      <header className="topbar">
        <Link href="/" className="wordmark">
          <span className="dot" /> Numerologist <span className="soft">AI</span>
        </Link>
        <ThemeSwitcher />
      </header>

      <div className="scroll-area">
        <section className="page" style={{ paddingTop: 28 }}>
          <span className="eyebrow">Last updated · June 2026</span>
          <h2 className="h-section" style={{ margin: "12px 0 22px" }}>
            Privacy Policy
          </h2>
          <div className="prose">
            <p>
              Numerologist AI (&ldquo;we&rdquo;, &ldquo;the app&rdquo;) provides
              numerology readings for personal reflection and entertainment. This
              policy explains what we do with the information you share.
            </p>

            <h3>Information you provide</h3>
            <p>
              During a reading you may type details such as your name, date of
              birth, and questions. This text is sent to our backend service and
              forwarded to our AI provider (OpenAI) solely to generate your
              reading, then returned to you.
            </p>

            <h3>What we store</h3>
            <p>
              We do not require an account and do not maintain a profile of you.
              Your conversation lives only on your device for the current session
              and is not persisted on our servers after the response is returned.
              Our servers may keep short-lived, anonymized request logs for
              security and abuse-prevention.
            </p>

            <h3>Third-party processing</h3>
            <p>
              Messages are processed by OpenAI to produce responses. Please refer
              to OpenAI&rsquo;s privacy and data-usage policies for details on
              their handling of API data.
            </p>

            <h3>Children</h3>
            <p>
              The app is not directed at children under 13 and we do not knowingly
              collect their information.
            </p>

            <h3>Disclaimer</h3>
            <p>
              All insights are numerological interpretations intended for personal
              reflection and entertainment. They are not medical, legal,
              financial, or psychological advice.
            </p>

            <h3>Contact</h3>
            <p>
              For privacy questions, contact{" "}
              <a href="mailto:support@numerologistai.app">
                support@numerologistai.app
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
