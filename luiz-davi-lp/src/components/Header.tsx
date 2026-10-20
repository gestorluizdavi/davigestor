"use client";

import { AnimatePresence, motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { InstagramLink, WhatsAppButton } from "./ui";
import { track } from "@/lib/analytics";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    document.documentElement.toggleAttribute("data-menu-open", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    track("nav_click", { section: id });
  };

  return (
    <>
      {/* Indicador de progresso de leitura */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-blue"
        style={{ scaleX: reduce ? scrollYProgress : progress }}
      />

      <header className="fixed inset-x-0 top-0 z-50 pt-[max(env(safe-area-inset-top),0.75rem)]">
        <div className="wrap">
          <div
            className={`flex h-14 items-center justify-between rounded-full pl-5 pr-2 text-paper transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
              scrolled || open
                ? "bg-ink/80 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl ring-1 ring-white/[0.07]"
                : "bg-transparent"
            }`}
          >
            <a href="#topo" className="flex items-baseline gap-2" aria-label="Luiz Davi — voltar ao início" onClick={() => setOpen(false)}>
              <span className="display text-[1.05rem] font-semibold tracking-[-0.03em]">Luiz Davi</span>
              <span className="hidden text-[0.7rem] text-mute sm:inline">/ tráfego & performance</span>
            </a>

            <nav aria-label="Seções" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {nav.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => go(item.id)}
                      className="rounded-full px-3.5 py-2 text-[0.8125rem] text-mute-strong transition-colors duration-300 hover:text-paper"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-1.5">
              <WhatsAppButton placement="header" size="md" className="!h-10 !px-4 !text-[0.8125rem] !gap-2 max-lg:!hidden" icon={false}>
                Conversar
              </WhatsAppButton>
              <button
                type="button"
                className="grid size-10 place-items-center rounded-full text-paper transition-colors hover:bg-white/[0.06] lg:hidden"
                aria-expanded={open}
                aria-controls="menu-mobile"
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                onClick={() => setOpen((v) => !v)}
              >
                <span className="relative block h-3 w-5">
                  <span className={`absolute left-0 h-px w-5 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                  <span className={`absolute left-0 h-px bg-current transition-all duration-300 ${open ? "top-1.5 w-5 -rotate-45" : "top-3 w-3.5"}`} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="fixed inset-0 z-40 bg-ink text-paper lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <nav aria-label="Menu" className="wrap flex h-full flex-col justify-between pb-[max(env(safe-area-inset-bottom),2rem)] pt-28">
              <ul className="space-y-1">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a href={`#${item.id}`} onClick={() => go(item.id)} className="group flex items-baseline gap-4 border-b border-white/[0.08] py-4">
                      <span className="eyebrow w-6 text-mute">0{i + 1}</span>
                      <span className="display text-[2rem] transition-colors group-hover:text-blue">{item.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="space-y-6">
                <WhatsAppButton placement="menu" className="w-full">
                  Conversar no WhatsApp
                </WhatsAppButton>
                <div className="flex items-center justify-between text-sm text-mute-strong">
                  <InstagramLink placement="menu" />
                  <span className="text-mute">{site.role}</span>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
