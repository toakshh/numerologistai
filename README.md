# Numerologist AI

An Indian-themed numerology consultation app. The same codebase powers the web
app and the native iOS/Android apps (via Capacitor). A small hardened backend
holds the OpenAI key and proxies chat — the key never ships inside the app.

## Architecture

```
┌─────────────────────┐        HTTPS         ┌──────────────────────┐
│  Mobile app (iOS /   │  ───────────────▶    │  Backend (Express)   │
│  Android) + Web      │   POST /api/chat     │  holds OPENAI_API_KEY │
│  Next.js UI (static) │  ◀───────────────    │  → OpenAI             │
└─────────────────────┘      { reply }        └──────────────────────┘
```

- **Front-end** (`/app`, `/components`): Next.js, exported as static files
  (`out/`). Capacitor bundles `out/` into the native apps.
- **Native shell** (`/android`, `/ios`): Capacitor projects.
- **Backend** (`/backend`): Express service that talks to OpenAI. Deploy this
  separately; the app/web calls it via `NEXT_PUBLIC_API_BASE_URL`.

## Why this design (store policy)

- Apple/Google forbid shipping API secrets in the client — they are trivially
  extractable. The key stays server-side in the backend.
- Apple Guideline 4.2 (minimum functionality) rejects thin website wrappers.
  The app bundles its own UI and uses native features (splash, status bar, safe
  areas, hardware back button, keyboard handling), so it behaves like a real app.

---

## 1. Local development

Run the backend and front-end in two terminals.

```bash
# Terminal 1 — backend
cd backend
cp .env.example .env          # add your OPENAI_API_KEY
npm install
npm run dev                   # http://localhost:8787

# Terminal 2 — front-end (web)
npm install
npm run dev                   # http://localhost:3000
```

The web app defaults to calling the backend at `http://localhost:8787`.

---

## 2. Configuration

| Where           | Variable                  | Purpose                                   |
| --------------- | ------------------------- | ----------------------------------------- |
| `backend/.env`  | `OPENAI_API_KEY`          | Secret key (server only, never shipped)   |
| `backend/.env`  | `OPENAI_MODEL`            | e.g. `gpt-4o-mini` or `gpt-4o`            |
| `backend/.env`  | `ALLOWED_ORIGINS`         | Web origins allowed (CORS). Native apps OK |
| root `.env`     | `NEXT_PUBLIC_API_BASE_URL`| Backend URL baked into the app build      |

---

## 3. Deploy the backend (do this first)

Deploy `/backend` to any Node host (Render, Railway, Fly.io, a VM, etc.).

1. Set env vars on the host: `OPENAI_API_KEY`, `OPENAI_MODEL`,
   `ALLOWED_ORIGINS` (your web domain).
2. Note the public HTTPS URL, e.g. `https://api.numerologistai.com`.
3. Verify: `GET https://.../health` returns `{ "ok": true }`.

Then point the app at it before building:

```
# root .env
NEXT_PUBLIC_API_BASE_URL=https://api.numerologistai.com
```

---

## 4. Build the mobile apps

Update the app version before each release:

- **Android**: `android/app/build.gradle` → bump `versionCode` (integer) and
  `versionName` (string).
- **iOS**: Xcode → target → General → Version / Build.

Generate icons & splash from `/assets` source art (already done once):

```bash
npm run assets
```

### Android (Windows/Mac/Linux)

```bash
npm run mobile:android        # next build + cap sync + open Android Studio
```

In Android Studio:

1. **Build > Generate Signed Bundle / APK > Android App Bundle (.aab)**.
2. Create/select an upload keystore (keep it safe — losing it blocks future
   updates). Store the keystore + passwords securely; never commit them.
3. The signed `.aab` is what you upload to the Play Console.

> A debug build is already verified to compile:
> `cd android && ./gradlew assembleDebug`

### iOS (macOS + Xcode only)

```bash
# one-time, on a Mac:
npx cap add ios
npm run assets                # generates iOS icons/splash too
npm run mobile:ios            # next build + cap sync + open Xcode
```

In Xcode: set your Team/signing, then **Product > Archive** and upload to App
Store Connect via the Organizer.

---

## 5. Store submission checklist

### Both stores
- [ ] Backend deployed over HTTPS and `NEXT_PUBLIC_API_BASE_URL` points to it.
- [ ] Privacy Policy hosted at a public URL (the in-app page is at `/privacy`;
      also host the same text on your website for the store listing).
- [ ] App icon (1024×1024) and feature screenshots prepared.
- [ ] Clear "for entertainment / personal reflection" disclaimer (in the prompt,
      footer, and privacy page already).

### Apple App Store
- [ ] App Store Connect app created with bundle id `com.numerologistai.app`.
- [ ] **Privacy “Nutrition Label”**: declare that user-entered text (name, DOB,
      messages) is sent to a third party (OpenAI) to provide the service and is
      not used for tracking. No data is linked to an identity (no accounts).
- [ ] Age rating questionnaire: numerology/horoscope is treated as
      entertainment; no objectionable content.
- [ ] No login means no “Sign in with Apple” / account-deletion requirement.

### Google Play
- [ ] Play Console app created with package `com.numerologistai.app`.
- [ ] **Data safety form**: messages are collected/sent to a third party for app
      functionality, encrypted in transit, not shared for ads, no account.
- [ ] Content rating questionnaire (IARC) completed.
- [ ] `targetSdk` meets the current Play requirement (Capacitor 6 targets 34).

---

## Project scripts (root)

| Script                 | What it does                                  |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Web dev server                                |
| `npm run build`        | Static export to `out/`                       |
| `npm run mobile:build` | Build + `cap sync` (copy web into native)     |
| `npm run mobile:android` | Build + sync + open Android Studio          |
| `npm run mobile:ios`   | Build + sync + open Xcode (macOS)             |
| `npm run assets`       | Generate native icons & splash from `/assets` |

## Disclaimer

Readings are numerological interpretations for personal reflection and
entertainment only — not medical, legal, financial, or psychological advice.
