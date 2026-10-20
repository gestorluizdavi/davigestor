"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Pequeno elemento vivo do hero: um sinal percorre o caminho
 * anúncio → conversa → agenda, acendendo cada etapa quando passa por ela.
 */
const nodes = [
  { x: 12, label: "anúncio" },
  { x: 110, label: "conversa" },
  { x: 208, label: "agenda" },
];

export function FlowSignal({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const dur = 3.6;

  return (
    <div
      className={`inline-flex flex-col gap-2 rounded-2xl bg-ink/55 px-4 pb-3 pt-3.5 ring-1 ring-white/[0.09] backdrop-blur-md ${className}`}
      role="img"
      aria-label="Fluxo de aquisição: anúncio, conversa e agenda"
    >
      <div className="flex items-center justify-between gap-6">
        <span className="eyebrow !text-[0.6rem] !tracking-[0.16em] text-mute">Fluxo de aquisição</span>
        <span className="flex items-center gap-1.5 text-[0.6rem] text-mute-strong">
          <span className="relative flex size-1.5">
            {!reduce && <span className="absolute inline-flex size-full animate-ping rounded-full bg-blue opacity-60" />}
            <span className="relative inline-flex size-1.5 rounded-full bg-blue" />
          </span>
          ativo
        </span>
      </div>

      <svg viewBox="0 0 220 34" className="h-[34px] w-[220px] overflow-visible" aria-hidden="true">
        <line x1="12" y1="10" x2="208" y2="10" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
        {!reduce && (
          <motion.line
            x1="12"
            y1="10"
            x2="208"
            y2="10"
            stroke="#5278FF"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0.9 }}
            animate={{ pathLength: [0, 1, 1], opacity: [0.9, 0.9, 0] }}
            transition={{ duration: dur, times: [0, 0.8, 1], repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        {nodes.map((n, i) => (
          <g key={n.label}>
            <circle cx={n.x} cy="10" r="3.5" fill="#101114" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
            <motion.circle
              cx={n.x}
              cy="10"
              r="3.5"
              fill="#5278FF"
              initial={{ opacity: reduce ? 1 : 0 }}
              animate={reduce ? { opacity: 1 } : { opacity: [0, 0, 1, 1, 0] }}
              transition={
                reduce
                  ? undefined
                  : { duration: dur, times: [0, (i * 0.8) / 2 * 0.98 + 0.001, (i * 0.8) / 2 + 0.04, 0.92, 1], repeat: Infinity, ease: "linear" }
              }
            />
            <text
              x={n.x}
              y="30"
              textAnchor={i === 0 ? "start" : i === nodes.length - 1 ? "end" : "middle"}
              dx={i === 0 ? -4 : i === nodes.length - 1 ? 4 : 0}
              className="fill-mute-strong"
              style={{ fontSize: 9.5, letterSpacing: "0.02em", fontFamily: "var(--font-sans)" }}
            >
              {n.label}
            </text>
          </g>
        ))}
        {!reduce && (
          <motion.circle
            cy="10"
            r="2"
            fill="#fff"
            initial={{ cx: 12, opacity: 0 }}
            animate={{ cx: [12, 208, 208], opacity: [1, 1, 0] }}
            transition={{ duration: dur, times: [0, 0.8, 1], repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </svg>
    </div>
  );
}
