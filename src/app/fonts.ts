import localFont from "next/font/local";

// Fontes hospedadas no próprio site: carregam com preload e com uma fonte
// de fallback ajustada, o que evita o "pulo" do texto no celular.
export const manrope = localFont({
  src: "../fonts/Manrope-Variable.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
  preload: true,
});

export const inter = localFont({
  src: "../fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
  preload: true,
});

export const instrumentSerif = localFont({
  src: "../fonts/InstrumentSerif-Italic.woff2",
  variable: "--font-instrument",
  weight: "400",
  style: "italic",
  display: "swap",
  preload: true,
});
