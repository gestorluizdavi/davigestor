import type { NextConfig } from "next";

// Versão estática (pasta /out) para Cloudflare Pages ou qualquer hospedagem sem Node.
// Ative com `npm run build:static` ou com a variável STATIC_EXPORT=1.
// Na Vercel/Netlify, use o `npm run build` normal.
const isExport =
  process.env.STATIC_EXPORT === "1" || process.env.npm_lifecycle_event === "build:static";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(isExport ? { output: "export" as const, trailingSlash: true } : {}),
  images: {
    unoptimized: isExport,
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
};

export default nextConfig;
