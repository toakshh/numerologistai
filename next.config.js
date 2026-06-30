/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Export a fully static front-end that Capacitor bundles into the native app.
  output: "export",
  // next/image optimization needs a server; disable for static export.
  images: { unoptimized: true },
  // Static hosts/webviews resolve folder-style routes (/chat/ -> /chat/index.html).
  trailingSlash: true,
};

module.exports = nextConfig;
