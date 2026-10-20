"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { about, site } from "@/content/site";
import { InstagramLink, MaskLine, Reveal, SectionLabel } from "./ui";
import photo from "../../public/images/luiz-davi.jpg";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <section id="sobre" data-track-section="sobre" className="grain relative isolate overflow-hidden bg-ink py-24 text-paper sm:py-32 lg:py-44">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-8">
        {/* Retrato com tratamento editorial */}
        <div className="lg:col-span-5">
          <Reveal>
            <figure ref={ref} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-ink-2">
                <motion.div className="absolute inset-[-8%]" style={{ y }}>
                  <Image
                    src={photo}
                    alt="Retrato de Luiz Davi"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    quality={90}
                    placeholder="blur"
                    className="object-cover object-[50%_45%] contrast-[1.04] grayscale"
                  />
                </motion.div>
                {/* moldura interna fina */}
                <div className="pointer-events-none absolute inset-3 ring-1 ring-white/15 sm:inset-4" />
                <span className="eyebrow absolute left-5 top-5 text-paper/70 sm:left-7 sm:top-7">Sobre</span>
              </div>
              <figcaption className="mt-4 flex items-center justify-between text-[0.78rem] text-mute">
                <span>{site.name}</span>
                <span>{site.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
          <SectionLabel n="03" tone="dark">Sobre mim</SectionLabel>
          <h2 className="display mt-8 text-[clamp(1.85rem,8.6vw,2.4rem)] sm:text-5xl lg:text-[clamp(2.6rem,3.8vw,3.75rem)]">
            <MaskLine>Por trás da estratégia,</MaskLine>
            <MaskLine delay={0.08}>existe alguém que</MaskLine>
            <MaskLine delay={0.16}>entende de números.</MaskLine>
            <MaskLine delay={0.24} className="text-blue max-lg:mt-1 max-lg:block">
              <span className="serif-accent text-[1.12em]">E de pessoas.</span>
            </MaskLine>
          </h2>

          <div className="mt-10 space-y-5 text-[1.02rem] leading-relaxed text-mute-strong sm:text-[1.08rem]">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p className={i === 0 ? "text-paper" : ""}>{p}</p>
              </Reveal>
            ))}
          </div>

          <dl className="mt-12 grid grid-cols-1 border-t border-white/10 sm:grid-cols-2">
            {about.facts.map((f, i) => (
              <Reveal
                key={f.k}
                delay={0.05 * i}
                className={`border-b border-white/10 py-5 sm:py-6 ${i % 2 === 0 ? "sm:pr-6" : "sm:border-l sm:pl-6"}`}
              >
                <dt className="eyebrow text-mute">{f.k}</dt>
                <dd className="mt-2 text-[1.02rem] text-paper">{f.v}</dd>
              </Reveal>
            ))}
          </dl>

          <Reveal className="mt-10 text-sm text-mute-strong">
            <InstagramLink placement="sobre" className="hover:text-paper">
              Acompanhe no Instagram {site.instagram.handle}
            </InstagramLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
