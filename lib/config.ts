// Base URL of the hosted backend that proxies OpenAI.
// Set at build time via NEXT_PUBLIC_API_BASE_URL (inlined into the bundle).
// Local dev defaults to the local Express backend.
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8787";
