/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "bongosbingo.dk" },
      { protocol: "https", hostname: "www.bongosbingo.dk" },
      { protocol: "https", hostname: "bongosbingo.fi" },
      { protocol: "https", hostname: "www.bongosbingo.fi" },
      { protocol: "https", hostname: "p16-sign-va.tiktokcdn.com" },
    ],
  },
};

export default nextConfig;
