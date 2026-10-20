"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";
import { track } from "@/lib/analytics";
import { whatsappHref } from "@/lib/whatsapp";
import { site } from "@/content/site";

/* ---------- Ícones (traço fino, desenhados para a página) ---------- */

export function WhatsAppIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.53 14.94L2 22l5.2-1.47A9.9 9.9 0 1 0 12.04 2Zm0 18.08a8.17 8.17 0 0 1-4.17-1.14l-.3-.18-3.08.87.83-3-.2-.31a8.18 8.18 0 1 1 6.92 3.76Zm4.48-6.12c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.78.96-.14.17-.29.19-.53.06-.25-.12-1.04-.38-1.98-1.22a7.4 7.4 0 0 1-1.37-1.7c-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.31c-.23.25-.86.84-.86 2.05 0 1.2.88 2.37 1 2.53.12.17 1.73 2.64 4.2 3.7.58.25 1.04.4 1.4.52.59.19 1.12.16 1.55.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

export function ArrowIcon({ className = "size-4", dir = "up-right" }: { className?: string; dir?: "up-right" | "down" | "right" | "up" }) {
  const rot = { "up-right": 0, right: 45, down: 135, up: -45 }[dir];
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ transform: `rotate(${rot}deg)` }}>
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function InstagramIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ---------- Revelação na rolagem ---------- */

export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: reduce ? 0.3 : 0.9, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}

/** Linha de título.
 *  Desktop (lg+): cada linha sobe por trás de uma máscara.
 *  Mobile/tablet: as linhas fluem como texto normal (sem quebras forçadas)
 *  e aparecem em sequência com um fade, para o título quebrar bem em qualquer largura. */
export function MaskLine({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={`inline lg:-mb-[0.1em] lg:block lg:overflow-hidden lg:pb-[0.1em] ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
    >
      <motion.span
        className="inline lg:block"
        variants={{
          hidden: { y: reduce ? 0 : "110%", opacity: 0 },
          show: {
            y: "0%",
            opacity: 1,
            transition: {
              y: { duration: reduce ? 0 : 1.05, delay, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: reduce ? 0.3 : 0.8, delay: delay * 1.6, ease: "easeOut" },
            },
          },
        }}
      >
        {children}
      </motion.span>{" "}
    </motion.span>
  );
}

/* ---------- Efeito magnético (só com mouse) ---------- */

function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  return (
    <motion.span
      ref={ref}
      className="inline-flex max-sm:w-full"
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/* ---------- Botões ---------- */

type Variant = "primary" | "ghost-dark" | "ghost-light" | "link";

const base =
  "group relative inline-flex items-center justify-center gap-3 rounded-full font-medium tracking-[-0.01em] transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out select-none active:scale-[0.97]";

const sizes = {
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-14 px-5 text-[0.95rem] whitespace-nowrap min-[400px]:text-base sm:px-7",
  xl: "min-h-16 py-3 px-4 text-[0.9rem] leading-snug min-[370px]:whitespace-nowrap sm:h-[4.5rem] sm:px-10 sm:text-lg",
};

const variants: Record<Variant, string> = {
  primary: "bg-blue-ink text-white hover:bg-[#3557de] shadow-[0_1px_0_0_rgba(255,255,255,0.18)_inset]",
  "ghost-dark": "text-paper border border-white/18 hover:border-white/45 hover:bg-white/[0.04]",
  "ghost-light": "text-ink border border-ink/15 hover:border-ink/40 hover:bg-ink/[0.03]",
  link: "text-current underline-offset-4 hover:underline h-auto px-0",
};

/** Botão de WhatsApp: monta o link com mensagem e origem no momento do clique e registra o evento. */
export function WhatsAppButton({
  placement,
  children,
  variant = "primary",
  size = "lg",
  className = "",
  magnetic = false,
  icon = true,
}: {
  placement: string;
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
  magnetic?: boolean;
  icon?: boolean;
}) {
  const btn = (
    <a
      href={whatsappHref(placement)}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="whatsapp"
      data-placement={placement}
      onClick={(e) => {
        // Recalcula com a origem salva na sessão (UTM) antes de abrir.
        e.currentTarget.href = whatsappHref(placement, true);
        track("whatsapp_click", { placement });
      }}
      className={`${base} ${variant === "link" ? "" : sizes[size]} ${variants[variant]} ${className}`}
    >
      {icon && variant !== "link" && (
        <span className={`grid place-items-center rounded-full ${variant === "primary" ? "size-7 bg-white/14" : "size-7 bg-blue/15 text-blue"}`}>
          <WhatsAppIcon className="size-[0.95rem]" />
        </span>
      )}
      <span>{children}</span>
      {variant !== "link" && (
        <span className="relative size-4 overflow-hidden" aria-hidden="true">
          <ArrowIcon className="absolute inset-0 size-4 transition-transform duration-500 ease-out group-hover:-translate-y-4 group-hover:translate-x-4" />
          <ArrowIcon className="absolute inset-0 size-4 -translate-x-4 translate-y-4 transition-transform duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      )}
    </a>
  );
  return magnetic ? <Magnetic>{btn}</Magnetic> : btn;
}

export function InstagramLink({ placement, className = "", children }: { placement: string; className?: string; children?: ReactNode }) {
  return (
    <a
      href={site.instagram.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("instagram_click", { placement })}
      className={`group inline-flex items-center gap-2 ${className}`}
    >
      <InstagramIcon className="size-4" />
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_1px]">
        {children ?? site.instagram.handle}
      </span>
    </a>
  );
}

/** Rótulo de seção: número + nome, com traço. */
export function SectionLabel({ n, children, tone = "light" }: { n: string; children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <div className={`eyebrow flex items-center gap-3 ${tone === "dark" ? "text-mute" : "text-graphite"}`}>
      <span className="text-blue">{n}</span>
      <span className={`h-px w-8 ${tone === "dark" ? "bg-white/20" : "bg-ink/20"}`} />
      <span>{children}</span>
    </div>
  );
}
