/**
 * Camada única de eventos.
 * Cada evento vai para o dataLayer (GTM) e, se carregados, para o Meta Pixel e o GA4.
 * Nenhum ID é definido aqui: os scripts só existem quando as variáveis de ambiente
 * estiverem preenchidas (ver src/components/Analytics.tsx).
 */

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"] as const;
const STORAGE_KEY = "ld_origin";

export type Origin = Partial<Record<(typeof UTM_KEYS)[number], string>> & {
  landing?: string;
  referrer?: string;
};

/** Guarda os parâmetros de origem da primeira página vista na sessão. */
export function captureOrigin(): Origin {
  if (typeof window === "undefined") return {};
  const existing = readOrigin();
  const params = new URLSearchParams(window.location.search);
  const fromUrl: Origin = {};
  UTM_KEYS.forEach((k) => {
    const v = params.get(k);
    if (v) fromUrl[k] = v.slice(0, 120);
  });
  const hasNew = Object.keys(fromUrl).length > 0;
  if (!hasNew && existing) return existing;
  const origin: Origin = {
    ...fromUrl,
    landing: window.location.pathname,
    referrer: document.referrer ? safeHost(document.referrer) : undefined,
  };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(origin));
  } catch {
    /* armazenamento indisponível: segue sem persistir */
  }
  return origin;
}

export function readOrigin(): Origin | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Origin) : null;
  } catch {
    return null;
  }
}

function safeHost(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return undefined;
  }
}

/** Dispara um evento para todas as ferramentas disponíveis. */
export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const origin = readOrigin() || {};
  const payload = { ...params, utm_source: origin.utm_source, utm_campaign: origin.utm_campaign };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });

  if (window.gtag) window.gtag("event", event, payload);

  if (window.fbq) {
    // Mapeia para eventos padrão do Meta quando faz sentido.
    if (event === "whatsapp_click") window.fbq("track", "Contact", payload);
    else window.fbq("trackCustom", event, payload);
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[track]", event, payload);
  }
}
