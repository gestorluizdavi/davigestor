"use client";

import { audiences } from "@/content/site";
import { MaskLine, Reveal, SectionLabel, WhatsAppButton } from "./ui";

export function Audience() {
  return (
    <section id="para-quem" data-track-section="para-quem" className="relative bg-paper py-24 text-ink sm:py-32 lg:py-44">
      <div className="wrap">
        <SectionLabel n="06">Para quem é</SectionLabel>
        <h2 className="display mt-8 max-w-4xl text-[clamp(1.85rem,8.6vw,2.4rem)] sm:text-5xl lg:text-[clamp(2.75rem,4.6vw,4.5rem)]">
          <MaskLine>Seu negócio precisa de mais</MaskLine>
          <MaskLine delay={0.08}>
            do que <span className="serif-accent text-[1.1em]">visibilidade?</span>
          </MaskLine>
        </h2>

        <ul className="mt-16 border-t border-ink/12 lg:mt-24">
          {audiences.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 0.05} className="group relative border-b border-ink/12">
              <div className="grid items-baseline gap-x-8 gap-y-2 py-7 transition-[padding] duration-500 ease-out sm:grid-cols-[4rem_1fr_auto] sm:py-9 lg:group-hover:pl-4">
                <span className="eyebrow hidden text-graphite sm:block">0{i + 1}</span>
                <h3
                  className={`display flex flex-wrap items-center gap-x-4 gap-y-2 text-[1.85rem] transition-colors duration-300 sm:text-[2.6rem] lg:text-[3.4rem] ${
                    a.primary ? "text-ink" : "text-ink/80 group-hover:text-ink"
                  }`}
                >
                  {a.title}
                  {a.primary && (
                    <span className="rounded-full bg-blue-ink px-3 py-1 font-sans text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white">
                      Foco principal
                    </span>
                  )}
                </h3>
                <p className="text-[0.98rem] text-graphite sm:max-w-[16rem] sm:text-right lg:translate-x-2 lg:opacity-70 lg:transition-all lg:duration-500 lg:group-hover:translate-x-0 lg:group-hover:opacity-100">
                  {a.note}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-[1.02rem] leading-relaxed text-graphite">
            Atuo com mais profundidade na saúde, mas também atendo negócios locais, restaurantes e serviços.
          </p>
          <WhatsAppButton placement="para-quem" variant="ghost-light" size="md" icon={false}>
            Meu segmento é outro
          </WhatsAppButton>
        </Reveal>
      </div>
    </section>
  );
}

