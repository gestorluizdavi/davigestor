import type { Metadata, Viewport } from "next";
import "./globals.css";
import { inter, instrumentSerif, manrope } from "./fonts";
import { site } from "@/content/site";
import { Analytics, AnalyticsNoScript } from "@/components/Analytics";
import { OriginCapture } from "@/components/OriginCapture";

const title = "Luiz Davi — Gestor de Tráfego para Profissionais da Saúde";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  keywords: [
    "gestor de tráfego",
    "tráfego pago para nutricionistas",
    "marketing para profissionais da saúde",
    "Meta Ads",
    "Google Ads",
    "captação de pacientes",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Luiz Davi, gestor de tráfego" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#101114",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${site.name} — ${site.tagline}`,
  description: site.description,
  url: site.url,
  image: `${site.url}/og.jpg`,
  founder: { "@type": "Person", name: site.name, jobTitle: "Gestor de Tráfego Pago" },
  sameAs: [site.instagram.url],
  areaServed: "BR",
  knowsAbout: ["Meta Ads", "Google Ads", "Tráfego pago", "Captação de pacientes"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${inter.variable} ${instrumentSerif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <AnalyticsNoScript />
        <Analytics />
        <OriginCapture />
        {children}
      </body>
    </html>
  );
}
