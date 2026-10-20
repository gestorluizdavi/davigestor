"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { journey } from "@/content/site";
import { MaskLine, Reveal, SectionLabel } from "./ui";

function Node({ i, total, progress, label, note }: { i: number; total: number; progress: MotionValue<number>; label: string; note: string }) {
  const at = i / (total - 1);
  const on = useTransform(progress, [Math.max(0, at - 0.04), at + 0.01], [0, 1]);
  const color = useTransform(on, [0, 1], ["#888B91", "#101114"]);
  const scale = useTransform(on, [0, 1], [0.6, 1]);

  return (
    <li className="relative grid grid-cols-[2.25rem_1fr] gap-x-4 pb-9 last:pb-0 lg:block lg:pb-0 lg:pr-6">
      {/* marcador */}
      <div className="relative z-10 flex h-7 items-center lg:mb-8">
        <span className="relative grid size-[1.125rem] place-items-center rounded-full bg-paper ring-1 ring-ink/20">
          <motion.span className="size-2.5 rounded-full bg-blue" style={{ opacity: on, scale }} />
        </span>
      </div>
      <div>
        <span className="eyebrow text-graphite">0{i + 1}</span>
        <motion.h3 className="display mt-1.5 text-[1.6rem] sm:text-3xl lg:text-[clamp(1.5rem,2vw,2rem)]" style={{ color }}>
          {label}
        </motion.h3>
        <p className="mt-2 max-w-[16rem] text-[0.95rem] leading-relaxed text-graphite">{note}</p>
      </div>
    </li>
  );
}

export function Journey() {
  const track = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: track, offset: ["start 0.8", "end 0.55"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const progress = reduce ? scrollYProgress : smooth;

  return (
    <section id="jornada" data-track-section="jornada" className="relative bg-paper py-24 text-ink sm:py-32 lg:py-44">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <SectionLabel n="01">Posicionamento</SectionLabel>
            <h2 className="display mt-8 text-[clamp(1.85rem,8.6vw,2.4rem)] sm:text-5xl lg:text-[clamp(3rem,4.6vw,4.5rem)]">
              <MaskLine>Seu próximo paciente</MaskLine>
              <MaskLine delay={0.08}>não precisa encontrar</MaskLine>
              <MaskLine delay={0.16}>
                você <span className="serif-accent text-[1.1em]">por acaso.</span>
              </MaskLine>
            </h2>
          </div>
          <Reveal className="self-end lg:col-span-4 lg:col-start-9" delay={0.15}>
            <p className="text-[1.05rem] leading-relaxed text-graphite sm:text-lg">
              Estar presente nas redes sociais é importante. Mas ter uma estratégia para chegar às pessoas certas,
              despertar interesse e transformar esse contato em agendamento faz toda a diferença.
            </p>
          </Reveal>
        </div>

        {/* Jornada */}
        <div className="relative mt-20 lg:mt-32">
          <ol ref={track} className="relative lg:grid lg:grid-cols-5">
            {/* trilho */}
            <div aria-hidden="true" className="absolute bottom-2 left-[0.5625rem] top-3 w-px bg-ink/12 lg:inset-x-0 lg:bottom-auto lg:left-0 lg:top-[0.875rem] lg:h-px lg:w-full lg:right-0" />
            <motion.div
              aria-hidden="true"
              className="absolute bottom-2 left-[0.5625rem] top-3 hidden w-px origin-top bg-blue max-lg:block"
              style={{ scaleY: progress }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute left-0 right-[calc(20%-0.5625rem)] top-[0.875rem] hidden h-px origin-left bg-blue lg:block"
              style={{ scaleX: progress }}
            />
            {journey.map((s, i) => (
              <Node key={s.label} i={i} total={journey.length} progress={progress} label={s.label} note={s.note} />
            ))}
          </ol>

          <Reveal className="mt-16 flex flex-col gap-4 border-t border-ink/10 pt-8 sm:flex-row sm:items-baseline sm:justify-between lg:mt-24">
            <p className="display max-w-xl text-xl text-ink sm:text-2xl">
              Clique e mensagem são etapas.{" "}
              <span className="text-graphite">O que importa é o que acontece no fim da linha.</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
