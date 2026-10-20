"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { WhatsAppButton } from "./ui";

/**
 * CTA fixo e discreto no mobile: aparece depois do hero
 * e some quando o CTA final já está na tela.
 */
export function StickyCTA() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const hero = document.getElementById("topo");
    const final = document.getElementById("contato");
    if (!hero || !final || !("IntersectionObserver" in window)) return;
    let pastHero = false;
    let atFinal = false;
    const update = () => setShow(pastHero && !atFinal);

    const ioHero = new IntersectionObserver(([e]) => {
      pastHero = !e.isIntersecting && e.boundingClientRect.top < 0;
      update();
    });
    const ioFinal = new IntersectionObserver(
      ([e]) => {
        atFinal = e.isIntersecting || e.boundingClientRect.top < 0;
        update();
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    ioHero.observe(hero);
    ioFinal.observe(final);
    return () => {
      ioHero.disconnect();
      ioFinal.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="sticky-cta fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] lg:hidden"
          initial={{ y: reduce ? 0 : 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: reduce ? 0 : 90, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 rounded-full bg-ink/85 p-1.5 pl-5 text-paper shadow-[0_12px_40px_-12px_rgba(0,0,0,0.55)] ring-1 ring-white/10 backdrop-blur-xl">
            <span className="min-w-0 flex-1 truncate text-[0.8rem] text-mute-strong">Fale direto comigo</span>
            <WhatsAppButton placement="sticky" size="md" className="!h-11 !gap-2 !px-4 !text-[0.85rem]" icon>
              WhatsApp
            </WhatsAppButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
