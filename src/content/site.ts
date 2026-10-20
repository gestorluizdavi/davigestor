/**
 * Todo o conteúdo editável da página fica aqui.
 * Para trocar textos, links ou o número do WhatsApp, edite este arquivo
 * (ou as variáveis de ambiente indicadas no .env.example).
 */

export const site = {
  name: "Luiz Davi",
  role: "Gestor de Tráfego & Performance",
  tagline: "Gestão de Tráfego Pago & Estratégia Digital",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://bio.luizdavi.com.br",
  description:
    "Luiz Davi, gestor de tráfego pago para nutricionistas e profissionais da saúde. Estratégias de Meta Ads e Google Ads pensadas para atrair, conectar e converter pacientes.",

  instagram: {
    handle: "@luizdaviii_",
    url: "https://www.instagram.com/luizdaviii_/",
  },

  whatsapp: {
    // DDI + DDD + número, só dígitos. Vazio = abre o WhatsApp para a pessoa escolher o contato.
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5588993014953",
    // Mensagem inicial por botão. A chave é o "local" do clique, também enviado nos eventos.
    messages: {
      default:
        "Oi, Luiz! Vim pelo seu site e quero conversar sobre tráfego pago para o meu negócio.",
      hero: "Oi, Luiz! Quero atrair mais pacientes e gostaria de entender como você pode me ajudar.",
      "para-quem":
        "Oi, Luiz! Meu negócio é de outro segmento e quero entender se o tráfego pago faz sentido para mim.",
      final:
        "Oi, Luiz! Quero te contar sobre o meu negócio e entender como o tráfego pago pode entrar na minha estratégia.",
    } as Record<string, string>,
    // Quando a pessoa chega com UTM (ex.: anúncio), adiciona uma referência curta
    // no fim da mensagem. Assim você sabe a origem da conversa no próprio WhatsApp.
    appendOrigin: true,
  },
};

export const nav = [
  { id: "jornada", label: "Jornada" },
  { id: "servicos", label: "O que eu faço" },
  { id: "sobre", label: "Sobre" },
  { id: "processo", label: "Processo" },
  { id: "para-quem", label: "Para quem" },
];

export const journey = [
  { label: "Anúncio", note: "A pessoa certa vê a mensagem certa." },
  { label: "Interesse", note: "Ela se reconhece no que você comunica." },
  { label: "Contato", note: "Chama no WhatsApp com uma intenção clara." },
  { label: "Atendimento", note: "É recebida com agilidade e direção." },
  { label: "Agendamento", note: "A conversa vira consulta marcada." },
];

export const services = [
  {
    n: "01",
    title: "Tráfego Pago",
    text: "Planejamento, criação, gerenciamento e otimização de campanhas no Meta Ads e Google Ads para atrair potenciais clientes.",
    tags: ["Meta Ads", "Google Ads", "Campanhas"],
  },
  {
    n: "02",
    title: "Captação de Pacientes",
    text: "Estratégias para conectar profissionais da saúde a pessoas com interesse real em seus serviços.",
    tags: ["Público", "Mensagem", "Qualificação"],
  },
  {
    n: "03",
    title: "Jornada e Conversão",
    text: "Análise do caminho percorrido pelo lead, desde o anúncio até o contato e o agendamento.",
    tags: ["Páginas", "WhatsApp", "Agendamento"],
  },
  {
    n: "04",
    title: "Análise e Otimização",
    text: "Acompanhamento dos indicadores para identificar oportunidades, corrigir gargalos e melhorar a eficiência dos investimentos.",
    tags: ["Indicadores", "Gargalos", "Ajustes"],
  },
];

export const about = {
  paragraphs: [
    "Sou Luiz Davi, gestor de tráfego pago, formado em Ciências Econômicas e apaixonado por estratégia, marketing e negócios.",
    "Sou certificado em Meta Ads e Google Ads pela comunidade Subido de Tráfego Pago, de Pedro Sobral, e atuo como gestor de tráfego em duas agências de marketing: Groot Ads e GS Mídias.",
    "Meu trabalho vai além de criar campanhas. Gosto de entender o negócio, analisar os números e acompanhar o caminho que transforma um anúncio em uma oportunidade real.",
    "Hoje, tenho um foco especial em ajudar profissionais da saúde a fortalecer sua presença digital e conquistar novos pacientes por meio de estratégias bem estruturadas.",
  ],
  facts: [
    { k: "Formação", v: "Ciências Econômicas" },
    { k: "Certificação", v: "Meta Ads e Google Ads · Subido de Tráfego Pago (Pedro Sobral)" },
    { k: "Agências", v: "Groot Ads e GS Mídias" },
    { k: "Foco", v: "Nutricionistas e profissionais da saúde" },
    { k: "Canais", v: "Meta Ads e Google Ads" },
    { k: "Também atendo", v: "Negócios locais, restaurantes e serviços" },
  ],
};

export const steps = [
  { n: "01", title: "Diagnóstico", text: "Entendo seu negócio, público, objetivos e desafios." },
  { n: "02", title: "Estratégia", text: "Defino canais, campanhas, comunicação e oportunidades de aquisição." },
  { n: "03", title: "Execução", text: "Estruturo as campanhas e os recursos necessários." },
  { n: "04", title: "Otimização", text: "Analiso os indicadores e ajusto continuamente as estratégias." },
  { n: "05", title: "Evolução", text: "Acompanho os resultados e identifico oportunidades de melhoria." },
];

/** Leitura usada no acompanhamento das campanhas (exibida enquanto não há cases publicados). */
export const analysis = {
  questions: [
    {
      q: "O que estamos vendo?",
      a: "Os números da semana, lidos do anúncio até o agendamento — não só o custo por clique.",
    },
    {
      q: "O que isso significa?",
      a: "Onde a jornada está fluindo e onde está travando: na mensagem, no público, no atendimento.",
    },
    {
      q: "O que vamos fazer?",
      a: "Uma decisão clara para a próxima semana. Ajustar, testar, escalar ou manter.",
    },
  ],
  indicators: [
    "Custo por conversa",
    "Qualidade dos contatos",
    "Taxa de resposta",
    "Conversas que viram agenda",
    "Desempenho por anúncio",
    "Frequência e saturação",
  ],
};

export const audiences = [
  { title: "Nutricionistas", note: "Onde está meu foco principal.", primary: true },
  { title: "Clínicas e consultórios", note: "Captação pensada para a rotina da equipe." },
  { title: "Profissionais da saúde", note: "Comunicação ética, que gera confiança." },
  { title: "Negócios de serviços", note: "Que querem transformar alcance em clientes." },
];
