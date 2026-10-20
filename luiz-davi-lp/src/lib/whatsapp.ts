import { site } from "@/content/site";
import { readOrigin } from "./analytics";

/** Monta o link do WhatsApp com mensagem personalizada e, se houver, a origem do acesso. */
export function whatsappHref(placement: string = "default", withOrigin = false) {
  const { number, messages, appendOrigin } = site.whatsapp;
  let text = messages[placement] || messages.default;

  if (withOrigin && appendOrigin && typeof window !== "undefined") {
    const o = readOrigin();
    const ref = [o?.utm_source, o?.utm_campaign, o?.utm_content].filter(Boolean).join(" / ");
    if (ref) text += `\n\n(ref: ${ref})`;
  }

  const base = number ? `https://wa.me/${number.replace(/\D/g, "")}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(text)}`;
}
