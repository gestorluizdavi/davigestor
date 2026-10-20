/**
 * CASES — adicione aqui somente cases reais e autorizados pelo cliente.
 *
 * Enquanto a lista estiver vazia, a seção "Resultados" mostra o processo
 * de análise. Assim que houver ao menos um item, os cases aparecem
 * automaticamente, sem precisar mexer no layout.
 *
 * Exemplo de formato (apague o comentário e preencha com dados reais):
 *
 * {
 *   segment: "Nutrição clínica",
 *   client: "Nome autorizado ou descrição anônima",
 *   goal: "Atrair pacientes particulares para consultas presenciais",
 *   strategy: "Campanha de mensagens no WhatsApp com público local e criativos em vídeo",
 *   metrics: [
 *     { label: "Conversas iniciadas", value: "000" },
 *     { label: "Custo por conversa", value: "R$ 0,00" },
 *   ],
 *   learning: "O que foi aprendido e ajustado ao longo do período",
 *   period: "Mês/ano a mês/ano",
 * },
 */

export type CaseStudy = {
  segment: string;
  client?: string;
  goal: string;
  strategy: string;
  metrics: { label: string; value: string }[];
  learning: string;
  period?: string;
};

export const cases: CaseStudy[] = [];
