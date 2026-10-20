"use client";

import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { steps } from "@/content/site";
import { MaskLine, SectionLabel } from "./ui";

function Step({ i, active, done, onActive, n, title, text }: { i: number; active: boolean; done: boolean; onActive: (i: number) => void; n: string; title: string; text: string }) {
  const ref = useRef<HTMLLIElement>(null);
  // A etapa fica "ativa" quando passa pela faixa central da tela.
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);

  return (
    <li ref={ref} className="relative grid grid-cols-[2.25rem_1fr] gap-x-5 pb-14 last:pb-0 sm:gap-x-8 lg:pb-24">
      <div className="relative z-10 pt-2">
        <span
          className={`grid size-[1.125rem] place-items-center rounded-full ring-1 transition-all duration-500 ${
            active ? "bg-blue ring-blue" : done ? "bg-paper ring-blue" : "bg-paper ring-ink/25"
          }`}
        >
          <span className={`size-1.5 rounded-full transition-colors duration-500 ${active ? "bg-white" : done ? "bg-blue" : "bg-ink/25"}`} />
        </span>
      </div>
      <div className={`transition-opacity duration-500 ${active || done ? "opacity-100" : "opacity-40"}`}>
        <span className={`eyebrow transition-colors duration-500 ${active ? "text-blue-ink" : "text-graphite"}`}>Etapa {n}</span>
        <h3 className="display mt-2 text-[1.9rem] sm:text-[2.6rem]">{title}</h3>
        <p className="mt-3 max-w-md text-[1.02rem] leading-relaxed text-graphite">{text}</p>
      </div>
    </li>
  );
}

export function Process() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.5", "end 0.5"] });
  const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 26 });

  return (
    <section id="processo" data-track-section="processo" className="relative bg-paper py-24 text-ink sm:py-32 lg:py-44">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionLabel n="04">Como funciona</SectionLabel>
            <h2 className="display mt-8 text-[clamp(1.85rem,8.6vw,2.4rem)] sm:text-5xl lg:text-[clamp(2.75rem,4vw,4rem)]">
              <MaskLine>Da primeira conversa</MaskLine>
              <MaskLine delay={0.08}>
                aos <span className="serif-accent text-[1.1em]">próximos</span> resultados.
              </MaskLine>
            </h2>

            {/* Contador da etapa atual (desktop) */}
            <div className="mt-16 hidden items-end gap-4 lg:flex" aria-hidden="true">
              <div className="relative h-[7.5rem] w-[9.5rem] overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={active}
                    className="display absolute inset-0 text-[7.5rem] leading-none text-ink"
                    initial={{ y: reduce ? 0 : "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: reduce ? 0 : "-100%", opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {steps[active].n}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="pb-4 text-sm text-graphite">
                <span className="block">de 0{steps.length}</span>
                <span className="block text-ink">{steps[active].title}</span>
              </div>
            </div>
          </div>
        </div>

        <ol ref={listRef} className="relative lg:col-span-6 lg:col-start-7 lg:pt-4">
          <div aria-hidden="true" className="absolute bottom-3 left-[0.5625rem] top-4 w-px bg-ink/12" />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-3 left-[0.5625rem] top-4 w-px origin-top bg-blue"
            style={{ scaleY: reduce ? scrollYProgress : fill }}
          />
          {steps.map((s, i) => (
            <Step key={s.n} i={i} active={i === active} done={i < active} onActive={setActive} {...s} />
          ))}
        </ol>
      </div>
    </section>
  );
}
