"use client";

import { site } from "@/content/site";
import { InstagramLink, MaskLine, Reveal, WhatsAppButton, ArrowIcon } from "./ui";

export function FinalCTA() {
  return (
    <>
    <section id="contato" data-track-section="contato" className="grain relative isolate overflow-hidden bg-ink text-paper">
      <div className="wrap pb-20 pt-28 sm:pb-28 sm:pt-40 lg:pb-36 lg:pt-52">
        <p className="eyebrow flex items-center gap-3 text-mute">
          <span className="h-px w-6 bg-blue" />
          Próximo passo
        </p>

        <h2 className="display mt-10 text-[clamp(2.15rem,10.5vw,2.9rem)] leading-[1.02] sm:text-7xl lg:text-[clamp(4.5rem,8vw,8.25rem)] lg:leading-[0.95]">
          <MaskLine>Vamos transformar</MaskLine>
          <MaskLine delay={0.08}>sua presença digital</MaskLine>
          <MaskLine delay={0.16} className="text-mute">
            em <span className="serif-accent text-[1.08em] text-paper">novas oportunidades?</span>
          </MaskLine>
        </h2>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:items-end lg:gap-8">
          <Reveal className="min-w-0 lg:col-span-5">
            <p className="max-w-md text-[1.05rem] leading-relaxed text-mute-strong sm:text-lg">
              Me conte um pouco sobre seu negócio e vamos entender como o tráfego pago pode fazer parte da sua
              estratégia de crescimento.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex min-w-0 flex-col items-start gap-5 lg:col-span-6 lg:col-start-7 lg:items-end">
            <WhatsAppButton placement="final" size="xl" magnetic className="w-full sm:w-auto">
              Conversar com Luiz no WhatsApp
            </WhatsAppButton>
            <p className="flex items-center gap-2.5 text-sm text-mute-strong">
              <span className="size-1.5 rounded-full bg-blue" />
              Atendimento direto, sem intermediários.
            </p>
          </Reveal>
        </div>
      </div>
    </section>

      <footer className="relative bg-ink text-paper">
        <div className="wrap"><div className="hairline !opacity-[0.08]" /></div>
        <div className="wrap grid gap-10 py-12 text-sm sm:grid-cols-2 lg:grid-cols-12 lg:py-14">
          <div className="lg:col-span-5">
            <p className="display text-xl">{site.name}</p>
            <p className="mt-1 text-mute">{site.tagline}</p>
          </div>
          <nav aria-label="Contato" className="flex flex-col gap-3 text-mute-strong lg:col-span-4">
            <InstagramLink placement="footer" className="hover:text-paper">
              Instagram: {site.instagram.handle}
            </InstagramLink>
            <WhatsAppButton placement="footer" variant="link" className="!justify-start gap-2 text-mute-strong hover:text-paper">
              WhatsApp: conversar agora
            </WhatsAppButton>
          </nav>
          <div className="flex flex-col justify-between gap-6 text-mute sm:col-span-2 sm:flex-row sm:items-end lg:col-span-3 lg:flex-col lg:items-end">
            <a href="#topo" className="group inline-flex items-center gap-2 text-mute-strong hover:text-paper">
              Voltar ao topo
              <ArrowIcon dir="up" className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5" />
            </a>
            <p>
              © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
