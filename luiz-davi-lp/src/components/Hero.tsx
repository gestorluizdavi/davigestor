"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { site } from "@/content/site";
import { FlowSignal } from "./FlowSignal";
import { ArrowIcon, WhatsAppButton } from "./ui";
import { track } from "@/lib/analytics";
import photo from "../../public/images/luiz-davi.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  // Resposta suave ao cursor (desktop): foto e elemento do fluxo se deslocam em direções opostas.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const photoX = useTransform(sx, (v) => v * -10);
  const photoY = useTransform(sy, (v) => v * -8);
  const chipX = useTransform(sx, (v) => v * 14);
  const chipY = useTransform(sy, (v) => v * 10);

  const rise = (delay: number) => ({
    initial: { y: reduce ? 0 : "105%", opacity: reduce ? 0 : 1 },
    animate: { y: "0%", opacity: 1 },
    transition: { duration: reduce ? 0.4 : 1.1, delay, ease },
  });
  const fade = (delay: number, y = 14) => ({
    initial: { opacity: 0, y: reduce ? 0 : y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.4 : 0.9, delay, ease },
  });

  return (
    <section
      id="topo"
      data-track-section="hero"
      className="grain relative isolate overflow-hidden bg-ink text-paper"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      {/* Fotografia */}
      <motion.div
        className="pointer-events-none absolute right-0 top-0 -z-10 h-[50svh] w-[94%] max-w-[44rem] [@media(max-height:700px)]:h-[44svh] sm:h-[62svh] lg:h-full lg:w-[52%] lg:max-w-none"
        style={{ x: photoX, y: photoY }}
        initial={{ opacity: 0, scale: reduce ? 1 : 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease }}
      >
        <div className="relative h-full w-full [mask-image:linear-gradient(to_bottom,#000_55%,transparent_98%),linear-gradient(to_right,transparent,#000_28%)] [mask-composite:intersect] [-webkit-mask-composite:source-in] lg:[mask-image:linear-gradient(to_bottom,#000_70%,transparent_100%),linear-gradient(to_right,transparent_0%,#000_30%)]">
          <Image
            src={photo}
            alt="Luiz Davi, gestor de tráfego pago, sorrindo em retrato em preto e branco"
            priority
            fill
            sizes="(min-width: 1024px) 52vw, 94vw"
            quality={90}
            placeholder="blur"
            className="origin-[42%_22%] -translate-y-[9%] scale-[1.42] object-cover object-[50%_18%] sm:-translate-y-[4%] sm:scale-[1.2] lg:translate-y-0 lg:scale-100 lg:object-[50%_22%]"
          />
        </div>
      </motion.div>

      <div className="wrap relative flex min-h-[100svh] flex-col pb-8 pt-[36svh] [@media(max-height:700px)]:pt-[29svh] sm:pt-[46svh] lg:justify-center lg:pb-36 lg:pt-32">
        {/* Elemento vivo: fluxo de aquisição (desktop) */}
        <motion.div
          className="absolute bottom-[22%] right-[var(--gutter)] hidden lg:block"
          style={{ x: chipX, y: chipY }}
          {...fade(1.3, 10)}
        >
          <FlowSignal />
        </motion.div>

        <div className="relative max-w-[46rem] lg:max-w-[56%]">
          <motion.div
            className="absolute bottom-full right-0 mb-4 origin-bottom-right scale-[0.82] min-[400px]:scale-90 sm:scale-100 lg:hidden [@media(max-height:700px)]:hidden"
            {...fade(1.3, 10)}
          >
            <FlowSignal />
          </motion.div>
          <motion.p className="eyebrow mb-4 flex items-center gap-3 text-mute-strong lg:mb-8" {...fade(0.2)}>
            <span className="h-px w-6 bg-blue" />
            <span className="hidden sm:inline">{site.name} — </span>
            {site.role}
          </motion.p>

          <h1 className="display text-[clamp(1.8rem,8.4vw,2.5rem)] leading-[1.03] sm:text-6xl lg:text-[clamp(3.25rem,4.5vw,4.75rem)] lg:leading-[0.99]">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block text-mute" {...rise(0.35)}>
                Mais do que anúncios.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" {...rise(0.47)}>
                Uma estratégia para
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span className="block" {...rise(0.59)}>
                atrair os <span className="serif-accent text-[1.12em] leading-none">pacientes certos.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="mt-4 max-w-[34rem] text-[0.95rem] leading-relaxed text-mute-strong sm:text-lg lg:mt-8"
            {...fade(0.85)}
          >
            Ajudo nutricionistas e profissionais da saúde a transformar o tráfego pago em oportunidades reais de
            atendimento, com estratégias pensadas para atrair, conectar e converter.
          </motion.p>

          <motion.div className="mt-6 flex flex-col gap-1 sm:gap-3 sm:flex-row sm:items-center lg:mt-10" {...fade(1)}>
            <WhatsAppButton placement="hero" magnetic className="w-full sm:w-auto">
              Quero atrair mais pacientes
            </WhatsAppButton>
            <a
              href="#jornada"
              onClick={() => track("secondary_cta_click", { placement: "hero" })}
              className="group inline-flex h-14 items-center justify-center gap-3 rounded-full px-6 text-[0.95rem] text-paper/90 transition-colors hover:text-paper sm:justify-start"
            >
              Conheça meu trabalho
              <ArrowIcon dir="down" className="size-4 transition-transform duration-500 group-hover:translate-y-1" />
            </a>
          </motion.div>
        </div>

        {/* Rodapé do hero */}
        <motion.div
          className="mt-auto hidden items-end justify-between gap-6 pt-12 text-[0.75rem] text-mute lg:absolute lg:inset-x-[var(--gutter)] lg:bottom-8 lg:flex"
          {...fade(1.4, 0)}
        >
          <div className="flex gap-10">
            <span>
              <span className="block text-mute-strong">Canais</span>Meta Ads · Google Ads
            </span>
            <span>
              <span className="block text-mute-strong">Especialidade</span>Profissionais da saúde
            </span>
          </div>
          <span className="flex items-center gap-3">
            Role para conhecer
            <span className="relative h-8 w-px overflow-hidden bg-white/15">
              {!reduce && (
                <motion.span
                  className="absolute inset-x-0 top-0 h-3 bg-paper"
                  animate={{ y: ["-100%", "280%"] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
