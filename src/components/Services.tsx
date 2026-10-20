"use client";

import { motion, useReducedMotion } from "motion/react";
import { services } from "@/content/site";
import { MaskLine, Reveal, SectionLabel } from "./ui";

/* Glifos autorais, um por área. Traço fino, 32px. */
const glyphs = [
  // Tráfego: alvo deslocado
  <g key="g0">
    <circle cx="16" cy="16" r="11" />
    <circle cx="16" cy="16" r="5.5" />
    <path d="M16 2v6M30 16h-6" />
  </g>,
  // Captação: dois pontos que se conectam
  <g key="g1">
    <circle cx="8" cy="22" r="3.5" />
    <circle cx="24" cy="10" r="3.5" />
    <path d="M10.8 19.6 21.2 12.4" strokeDasharray="2 2.4" />
  </g>,
  // Jornada: caminho com curvas até o ponto final
  <g key="g2">
    <path d="M4 26h8a4 4 0 0 0 4-4V10a4 4 0 0 1 4-4h8" />
    <circle cx="28" cy="6" r="2" fill="currentColor" stroke="none" />
  </g>,
  // Análise: linha que melhora
  <g key="g3">
    <path d="M4 28h24" opacity=".35" />
    <path d="M5 22l6-5 5 3 11-10" />
    <path d="M22 10h5v5" />
  </g>,
];

export function Services() {
  const reduce = useReducedMotion();

  return (
    <section id="servicos" data-track-section="servicos" className="relative bg-paper pb-24 text-ink sm:pb-32 lg:pb-44">
      <div className="wrap">
        <div className="hairline mb-24 sm:mb-32 lg:mb-40" />
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionLabel n="02">O que eu faço</SectionLabel>
              <h2 className="display mt-8 text-[clamp(1.85rem,8.6vw,2.4rem)] sm:text-5xl lg:text-[clamp(2.75rem,4vw,4rem)]">
                <MaskLine>Uma estratégia</MaskLine>
                <MaskLine delay={0.08}>completa.</MaskLine>
                <MaskLine delay={0.16} className="text-graphite">
                  <span className="serif-accent text-[1.1em]">Não apenas</span> campanhas.
                </MaskLine>
              </h2>
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-sm text-[1.02rem] leading-relaxed text-graphite">
                  Anúncio, mensagem, atendimento e análise fazem parte da mesma engrenagem. Eu olho para cada peça
                  pensando no resultado final.
                </p>
              </Reveal>
            </div>
          </div>

          <ul className="lg:col-span-7 lg:col-start-6">
            {services.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 0.06} className="group relative border-t border-ink/12 last:border-b">
                {/* traço azul que cresce no hover */}
                <span
                  aria-hidden="true"
                  className="absolute -top-px left-0 h-px w-0 bg-blue transition-[width] duration-700 ease-out group-hover:w-full"
                />
                <div className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-4 py-9 transition-[padding] duration-500 ease-out sm:grid-cols-[5.5rem_1fr_auto] sm:py-11 lg:group-hover:pl-3">
                  <span className="eyebrow pt-2 text-graphite transition-colors duration-300 group-hover:text-blue-ink max-sm:col-span-2 max-sm:-mb-1">
                    {s.n} /
                  </span>
                  <div>
                    <h3 className="display text-[1.65rem] sm:text-[2.1rem]">{s.title}</h3>
                    <p className="mt-3 max-w-md text-[0.98rem] leading-relaxed text-graphite">{s.text}</p>
                    <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-[0.78rem] text-graphite" aria-label="Temas">
                      {s.tags.map((t) => (
                        <li key={t} className="flex items-center gap-2">
                          <span className="size-1 rounded-full bg-ink/30 transition-colors duration-300 group-hover:bg-blue" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <motion.svg
                    viewBox="0 0 32 32"
                    className="size-8 text-ink/70 transition-colors duration-300 group-hover:text-blue-ink sm:size-9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    whileHover={reduce ? undefined : { rotate: -8, scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 200, damping: 14 }}
                  >
                    {glyphs[i]}
                  </motion.svg>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
