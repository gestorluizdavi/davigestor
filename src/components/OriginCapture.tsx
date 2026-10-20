"use client";

import { useEffect } from "react";
import { captureOrigin, track } from "@/lib/analytics";

/**
 * Guarda os parâmetros de origem (UTM, fbclid, gclid) e dispara
 * "section_view" uma vez por seção marcada com data-track-section.
 */
export function OriginCapture() {
  useEffect(() => {
    captureOrigin();

    const seen = new Set<string>();
    const nodes = document.querySelectorAll<HTMLElement>("[data-track-section]");
    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const id = (e.target as HTMLElement).dataset.trackSection!;
          if (e.isIntersecting && !seen.has(id)) {
            seen.add(id);
            track("section_view", { section: id });
            io.unobserve(e.target);
          }
        });
      },
      // Conta a seção quando o topo dela passa da metade da tela (funciona para seções altas).
      { rootMargin: "0px 0px -50% 0px", threshold: 0 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return null;
}
