import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Process } from "@/components/Process";
import { Results } from "@/components/Results";
import { Audience } from "@/components/Audience";
import { FinalCTA } from "@/components/FinalCTA";
import { StickyCTA } from "@/components/StickyCTA";

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Journey />
        <Services />
        <About />
        <Process />
        <Results />
        <Audience />
        <FinalCTA />
      </main>
      <StickyCTA />
    </>
  );
}
