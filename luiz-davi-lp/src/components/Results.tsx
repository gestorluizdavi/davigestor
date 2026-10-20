"use client";

import { analysis } from "@/content/site";
import { cases, type CaseStudy } from "@/content/cases";
import { MaskLine, Reveal, SectionLabel } from "./ui";

function CaseCard({ c, i }: { c: CaseStudy; i: number }) {
  return (
    <Reveal as="li" delay={i * 0.06} className="group flex flex-col border-t border-white/12 pt-8">
      <div className="flex items-baseline justify-between gap-4">
        <span className="eyebrow text-blue">{c.segment}</span>
        {c.period && <span className="text-xs text-mute">{c.period}</span>}
      </div>
      {c.client && <p className="mt-3 text-sm text-mute-strong">{c.client}</p>}
      <h3 className="display mt-4 text-2xl text-paper sm:text-[1.75rem]">{c.goal}</h3>
      <p className="mt-4 text-[0.98rem] leading-relaxed text-mute-strong">
        <span className="text-paper">Estratégia.</span> {c.strategy}
      </p>
      {c.metrics.length > 0 && (
        <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-white/10">
          {c.metrics.map((m) => (
            <div key={m.label} className="bg-ink px-4 py-4">
              <dt className="text-xs text-mute">{m.label}</dt>
              <dd className="display mt-1 text-2xl text-paper">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}
      <p className="mt-6 text-[0.95rem] leading-relaxed text-mute-strong">
        <span className="text-paper">Aprendizado.</span> {c.learning}
      </p>
    </Reveal>
  );
}

/** Exibido enquanto não houver cases autorizados: mostra como cada campanha é lida. */
function AnalysisMethod() {
  return (
    <>
      <ol className="mt-16 grid gap-px overflow-hidden rounded-[3px] bg-white/[0.08] lg:mt-24 lg:grid-cols-3">
        {analysis.questions.map((item, i) => (
          <Reveal
            as="li"
            key={item.q}
            delay={i * 0.08}
            className="group relative flex min-h-[15rem] flex-col justify-between bg-ink p-7 transition-colors duration-500 hover:bg-ink-2 sm:p-9 lg:min-h-[22rem]"
          >
            <span className="flex items-center justify-between">
              <span className="eyebrow text-mute">Pergunta 0{i + 1}</span>
              <span className="h-px w-10 bg-white/15 transition-all duration-700 group-hover:w-16 group-hover:bg-blue" />
            </span>
            <div className="mt-10">
              <h3 className="text-[2.1rem] leading-[1.05] text-paper sm:text-[2.5rem]">
                <span className="serif-accent">{item.q}</span>
              </h3>
              <p className="mt-4 max-w-xs text-[0.98rem] leading-relaxed text-mute-strong">{item.a}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-8">
        <p className="eyebrow text-mute lg:col-span-3 lg:pt-2">O que entra na leitura</p>
        <ul className="flex flex-wrap gap-2 lg:col-span-9">
          {analysis.indicators.map((t) => (
            <li
              key={t}
              className="rounded-full border border-white/12 px-4 py-2 text-[0.85rem] text-mute-strong transition-colors duration-300 hover:border-blue/60 hover:text-paper"
            >
              {t}
            </li>
          ))}
        </ul>
      </Reveal>
    </>
  );
}

export function Results() {
  const hasCases = cases.length > 0;

  return (
    <section id="resultados" data-track-section="resultados" className="grain relative isolate overflow-hidden bg-ink py-24 text-paper sm:py-32 lg:py-44">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <SectionLabel n="05" tone="dark">
              {hasCases ? "Resultados e projetos" : "Acompanhamento"}
            </SectionLabel>
            <h2 className="display mt-8 text-[clamp(1.85rem,8.6vw,2.4rem)] sm:text-5xl lg:text-[clamp(2.75rem,4.2vw,4.25rem)]">
              <MaskLine>Estratégia boa é aquela</MaskLine>
              <MaskLine delay={0.08}>
                que pode ser <span className="serif-accent text-[1.1em] text-blue">acompanhada.</span>
              </MaskLine>
            </h2>
          </div>
          <Reveal className="self-end lg:col-span-4 lg:col-start-9" delay={0.15}>
            <p className="text-[1.02rem] leading-relaxed text-mute-strong sm:text-lg">
              {hasCases
                ? "Alguns projetos, contados com o objetivo, a estratégia e o que aprendemos no caminho."
                : "Número sozinho não decide nada. Toda campanha é lida a partir de três perguntas, para que cada semana termine com uma direção clara."}
            </p>
          </Reveal>
        </div>

        {hasCases ? (
          <ul className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:mt-24 lg:grid-cols-3">
            {cases.map((c, i) => (
              <CaseCard key={i} c={c} i={i} />
            ))}
          </ul>
        ) : (
          <AnalysisMethod />
        )}
      </div>
    </section>
  );
}
