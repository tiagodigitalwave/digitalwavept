// Shared quiz configuration: questions, scoring dimensions, diagnoses.

export type Answer = "A" | "B" | "C";

export type ScoredQuestion = {
  id: string;
  block: string;
  q: string;
  opts: Record<Answer, string>;
};

export type MultiQuestion = {
  id: string;
  block: string;
  q: string;
  options: { id: string; label: string }[];
  minSelect: number;
};

// All 17 questions in display order. P2 is multi-select (not scored).
// P11 is conditional (only shown if P10 === "C").
export const SCORED: ScoredQuestion[] = [
  {
    id: "P1",
    block: "Canais actuais de aquisição",
    q: "Como é que a maioria dos teus novos clientes te encontra hoje?",
    opts: {
      A: "Maioritariamente por referências e passa-palavra",
      B: "Tenho alguns canais activos (redes sociais, email, eventos) mas sem sistema definido",
      C: "Tenho um processo de outreach activo e consistente para gerar reuniões",
    },
  },
  {
    id: "P3",
    block: "Canais actuais de aquisição",
    q: "Há quanto tempo tens esse(s) canal(is) activo(s)?",
    opts: {
      A: "Menos de 3 meses — ainda estamos a testar",
      B: "Entre 3 e 12 meses — já temos alguma experiência",
      C: "Mais de 1 ano — já temos resultados históricos",
    },
  },
  {
    id: "P4",
    block: "Volume e resultados actuais",
    q: "Em média, quantas reuniões com potenciais clientes tens por mês?",
    opts: {
      A: "Menos de 4 — menos de uma por semana",
      B: "Entre 4 e 10",
      C: "Mais de 10",
    },
  },
  {
    id: "P5",
    block: "Volume e resultados actuais",
    q: "Estás satisfeito com o número de reuniões que tens actualmente?",
    opts: {
      A: "Não — precisava de significativamente mais",
      B: "Mais ou menos — há meses bons e meses maus, sem consistência",
      C: "Sim — o volume está alinhado com os meus objectivos de crescimento",
    },
  },
  {
    id: "P6",
    block: "Volume e resultados actuais",
    q: "Quando pensas nos últimos 3 meses, como descreves os teus resultados de aquisição?",
    opts: {
      A: "Imprevisíveis — não consigo antecipar o que vai acontecer no mês seguinte",
      B: "Razoáveis mas dependentes de sorte ou de um canal que pode falhar",
      C: "Consistentes — tenho uma base previsível de novas oportunidades todos os meses",
    },
  },
  {
    id: "P7",
    block: "Qualidade das reuniões",
    q: "Nas reuniões que tens, com quem falas habitualmente?",
    opts: {
      A: "Frequentemente com pessoas que não têm poder de decisão",
      B: "Às vezes com o decisor, às vezes com intermediários — depende da situação",
      C: "Quase sempre com o decisor ou alguém com influência directa na decisão",
    },
  },
  {
    id: "P8",
    block: "Qualidade das reuniões",
    q: "Como avalias a qualidade das reuniões que tens?",
    opts: {
      A: "Muitas são com empresas ou pessoas que não são o meu cliente ideal",
      B: "A maioria é interessante mas poucas avançam para proposta",
      C: "A grande maioria são reuniões qualificadas que avançam no processo",
    },
  },
  {
    id: "P9",
    block: "Qualidade das reuniões",
    q: "O que acontece tipicamente depois de uma reunião?",
    opts: {
      A: "A maioria fica em silêncio — difícil perceber se há interesse real",
      B: "Algumas avançam, outras ficam paradas sem resposta clara",
      C: "Tenho um processo claro de follow-up e sei em que fase está cada oportunidade",
    },
  },
  {
    id: "P10",
    block: "Custo e eficiência",
    q: "Tens noção do custo por reunião nos teus canais actuais?",
    opts: {
      A: "Não — nunca calculei isso",
      B: "Tenho uma ideia vaga mas não um número preciso",
      C: "Sim — sei quanto me custa em média gerar uma reunião qualificada",
    },
  },
  {
    id: "P11",
    block: "Custo e eficiência",
    q: "Qual é o teu custo médio por reunião qualificada?",
    opts: {
      A: "Acima de 300€",
      B: "Entre 100€ e 300€",
      C: "Abaixo de 100€",
    },
  },
  {
    id: "P12",
    block: "Custo e eficiência",
    q: "Estás satisfeito com o esforço que tens de colocar para gerar cada nova reunião?",
    opts: {
      A: "Não — é demasiado tempo e energia para os resultados que gera",
      B: "Aceitável mas sei que podia ser mais eficiente",
      C: "Sim — o rácio esforço/resultado faz sentido para o meu negócio",
    },
  },
  {
    id: "P13",
    block: "Previsibilidade e controlo",
    q: "Se precisasses de duplicar o número de reuniões no próximo mês, o que farias?",
    opts: {
      A: "Não sei — dependeria de circunstâncias fora do meu controlo",
      B: "Tentaria fazer mais do que estou a fazer, mas sem certeza do resultado",
      C: "Tenho um sistema que sei que posso escalar — é uma questão de aumentar os inputs",
    },
  },
  {
    id: "P14",
    block: "Previsibilidade e controlo",
    q: "Quando os resultados pioram, sabes identificar porquê?",
    opts: {
      A: "Não — é difícil perceber o que está a falhar",
      B: "Tenho algumas ideias mas é maioritariamente intuição",
      C: "Sim — consigo identificar em que ponto do processo está o problema",
    },
  },
  {
    id: "P15",
    block: "Previsibilidade e controlo",
    q: "Com que frequência falas com potenciais clientes que não conhecias há 3 meses?",
    opts: {
      A: "Raramente — quase toda a receita vem de referências ou clientes existentes",
      B: "Às vezes — tenho alguns contactos novos mas não é consistente",
      C: "Regularmente — tenho um fluxo contínuo de novas conversas com o meu ICP",
    },
  },
  {
    id: "P16",
    block: "Consciência e ambição",
    q: "Qual é o teu maior obstáculo para crescer nos próximos 6 meses?",
    opts: {
      A: "Não tenho leads suficientes — o topo do funil está vazio",
      B: "Tenho leads mas poucas convertem em clientes",
      C: "O processo de vendas é lento e imprevisível depois da reunião",
    },
  },
  {
    id: "P17",
    block: "Consciência e ambição",
    q: "O que descreve melhor a tua situação actual?",
    opts: {
      A: "Estou dependente de referências e não tenho controlo sobre quando chegam novos clientes",
      B: "Tenho alguns canais mas os resultados são inconsistentes e não sei o que está a funcionar",
      C: "Tenho um sistema mas quero torná-lo mais eficiente e previsível",
    },
  },
];

export const P2: MultiQuestion = {
  id: "P2",
  block: "Canais actuais de aquisição",
  q: "Quais dos seguintes canais usas actualmente para gerar novos clientes?",
  options: [
    { id: "email_frio", label: "Email frio" },
    { id: "linkedin", label: "LinkedIn (DMs ou conteúdo)" },
    { id: "referencias", label: "Referências / passa-palavra" },
    { id: "ads_pagos", label: "Anúncios pagos (Meta, Google, LinkedIn Ads)" },
    { id: "organico", label: "Conteúdo orgânico (SEO, redes sociais)" },
    { id: "eventos", label: "Eventos / networking" },
    { id: "outro", label: "Outro" },
  ],
  minSelect: 1,
};

export type DimKey = "flow" | "quality" | "efficiency" | "predictability" | "independence";

export type Dimension = {
  key: DimKey;
  name: string;
  short: string;
  questionIds: string[];
  intro: string;
  practices: { title: string; body: string }[];
  diagnoses: { low: string; mid: string; high: string };
};

export const DIMENSIONS: Dimension[] = [
  {
    key: "flow",
    name: "Fluxo de oportunidades",
    short: "Fluxo",
    questionIds: ["P4", "P5", "P15"],
    intro:
      "Mede se entras em contacto com novas pessoas qualificadas de forma consistente — ou se cada mês é uma surpresa dependente de referências.",
    practices: [
      {
        title: "Definir um alvo mensal de reuniões",
        body: "Saber quantas reuniões qualificadas precisas por mês para atingir os objectivos de receita é o ponto zero. Sem este número, qualquer canal parece estar a 'funcionar' ou a 'falhar' sem critério.",
      },
      {
        title: "Pelo menos um canal activo de outreach",
        body: "Email frio ou LinkedIn outbound estruturado garantem que o topo do funil deixa de depender de quem se lembra de ti. Volume controlado, mensagem trabalhada, follow-ups previstos.",
      },
      {
        title: "Conversas novas todas as semanas",
        body: "Bom indicador de saúde: pelo menos 3-5 novas conversas por semana com pessoas que não te conheciam. Se este número está a zero, o motor está parado, independentemente da receita actual.",
      },
    ],
    diagnoses: {
      low: "Estás dependente de referências e do acaso. Sem outreach activo, o topo do funil esvazia-se e cada mês mau apanha-te de surpresa. A receita pode ser boa hoje, mas o crescimento é uma loteria.",
      mid: "Há algum fluxo, mas inconsistente. Meses bons seguidos de meses a zero, sem causa clara. Falta sistema para garantir entrada previsível de novas conversas.",
      high: "Fluxo saudável de novas oportunidades. Não é perfeito mas é controlável: sabes que se aumentares os inputs, vais ter mais conversas.",
    },
  },
  {
    key: "quality",
    name: "Qualidade das reuniões",
    short: "Qualidade",
    questionIds: ["P7", "P8", "P9"],
    intro:
      "Volume não chega. Mede se as reuniões que tens são com decisores certos e se avançam no processo — ou se gastas horas em conversas que não dão em nada.",
    practices: [
      {
        title: "ICP definido em 3 dimensões",
        body: "Sector, dimensão da empresa e cargo do decisor. Sem isto, qualquer reunião parece uma oportunidade e o tempo comercial dilui-se.",
      },
      {
        title: "Qualificação antes do agendamento",
        body: "2-3 perguntas curtas no formulário do calendário (orçamento, prazo, contexto). Filtra curiosos e impede que bloqueies 30-45 min para conversas que nunca avançariam.",
      },
      {
        title: "Processo de follow-up estruturado",
        body: "Cada reunião termina com um próximo passo concreto e uma data. Pipeline visível por etapa. Quem ficou em silêncio entra numa sequência de nutrição, não num limbo.",
      },
    ],
    diagnoses: {
      low: "Perdes tempo com não-decisores ou empresas fora do perfil. O esforço a montante não se converte em receita. O problema não é falta de reuniões — é falta de filtro.",
      mid: "Qualidade variável. Algumas reuniões são boas, muitas ficam paradas. Falta processo claro de qualificação e de follow-up depois do primeiro contacto.",
      high: "As reuniões que tens são com as pessoas certas e avançam. O fundo do funil está a fazer o seu trabalho — o foco passa a ser volume.",
    },
  },
  {
    key: "efficiency",
    name: "Eficiência e custo",
    short: "Eficiência",
    questionIds: ["P10", "P11", "P12"],
    intro:
      "Mede se sabes o que te custa cada reunião e se esse custo (tempo + dinheiro) faz sentido para a margem do teu negócio. Sem este número, é impossível decidir onde investir mais.",
    practices: [
      {
        title: "Calcular o CPM (custo por reunião)",
        body: "Soma tempo + ferramentas + ads, divide pelo número de reuniões qualificadas. Faz por canal. É o número mais importante para decidir onde escalar e onde cortar.",
      },
      {
        title: "Benchmark por canal",
        body: "Outbound bem feito anda entre 80€-200€ por reunião qualificada em B2B. Acima disto, o problema é geralmente lista, mensagem ou qualificação — não o canal em si.",
      },
      {
        title: "Decisão de escalar baseada em dados",
        body: "Só escalas o que tem custo aceitável e taxa de conversão validada. Sem isto, dobrar volume só dobra desperdício.",
      },
    ],
    diagnoses: {
      low: "Não sabes o que te custa uma reunião. Estás a investir tempo e dinheiro sem saber o retorno — e é impossível optimizar o que não se mede. Primeiro passo: medir.",
      mid: "Tens noção aproximada mas não optimizas activamente. O custo pode ser aceitável hoje, mas sem controlo activo só se descobre o problema quando já está caro.",
      high: "Conheces o custo por reunião, comparas canais e tomas decisões com dados. Posição forte para escalar com confiança.",
    },
  },
  {
    key: "predictability",
    name: "Previsibilidade",
    short: "Previsibilidade",
    questionIds: ["P6", "P13", "P14"],
    intro:
      "Mede se consegues antecipar o próximo mês e diagnosticar o que falha quando os resultados caem. Sem previsibilidade, contratar, investir ou crescer torna-se aposta.",
    practices: [
      {
        title: "Métricas de funil por etapa",
        body: "Conversas iniciadas → respostas positivas → reuniões agendadas → propostas → fechos. Saber as taxas entre cada etapa permite prever resultados com base nos inputs.",
      },
      {
        title: "Forecast simples a 30 dias",
        body: "Com 2-3 meses de histórico, consegues prever reuniões do próximo mês com ±20%. Esta margem é suficiente para tomar decisões de contratação e investimento.",
      },
      {
        title: "Diagnóstico antes do pânico",
        body: "Quando um número cai, métricas mostram em que etapa partiu o funil. Sem isto, perde-se semanas a tentar 'fazer mais' sem perceber onde está o problema real.",
      },
    ],
    diagnoses: {
      low: "Estás a gerir por intuição. Cada semana má é um mistério, cada boa é sorte. Não consegues prever o mês seguinte nem diagnosticar o que falha. Impossível escalar com confiança.",
      mid: "Alguma previsibilidade, mas com pontos cegos. Quando algo corre mal demora a perceber porquê — e quando perceberes já estás em modo de crise.",
      high: "Sistema controlável. Sabes escalar, sabes diagnosticar, fazes previsões razoáveis. Tens uma operação que pode crescer sem entrar em pânico.",
    },
  },
  {
    key: "independence",
    name: "Independência de referências",
    short: "Independência",
    questionIds: ["P1", "P3", "P17"],
    intro:
      "Mede se o crescimento depende de sorte e passa-palavra ou se tens canais próprios e controláveis. Empresas que crescem com previsibilidade têm sempre pelo menos um canal activo independente de referências.",
    practices: [
      {
        title: "Pelo menos um canal proprietário",
        body: "Email frio, LinkedIn outbound ou ads pagos — algo que funcione mesmo se ninguém te referenciar este mês. Referências continuam a vir, mas deixam de ser a única fonte.",
      },
      {
        title: "Maturidade do canal antes de julgar",
        body: "Outbound bem feito demora 3-6 meses a atingir velocidade de cruzeiro. Testar 4 semanas e abandonar é o erro mais comum — e o mais caro.",
      },
      {
        title: "Diversificação consciente",
        body: "Quando o canal principal estabiliza, adicionar um segundo (ex. LinkedIn ao cold email) reduz risco e amplia o alcance. Nunca começar com 4 canais em paralelo — só dilui foco.",
      },
    ],
    diagnoses: {
      low: "Totalmente dependente de referências. Sem outreach activo, o crescimento é passivo e imprevisível. Hoje pode parecer suficiente — daqui a 6 meses pode ser um problema sério.",
      mid: "Tens canais mas não substituem as referências — são complementos inconsistentes. Falta dar continuidade e maturidade a pelo menos um deles.",
      high: "Tens pelo menos um canal de aquisição activo que funciona independentemente de referências. Posição muito mais segura para crescer.",
    },
  },
];

export type Scores = {
  perDim: Record<DimKey, { perTen: number; raw: number; level: "low" | "mid" | "high" }>;
  perTenList: number[]; // dim order
  overall: number; // 0-100
};

export function levelFromPerTen(p: number): "low" | "mid" | "high" {
  if (p <= 4) return "low";
  if (p <= 6) return "mid";
  return "high";
}

export function computeScores(answers: Record<string, Answer | undefined>): Scores {
  const map = (a: Answer | undefined) => (a === "A" ? 1 : a === "B" ? 2 : a === "C" ? 3 : 0);
  const perDim: Scores["perDim"] = {} as Scores["perDim"];
  const perTenList: number[] = [];
  for (const d of DIMENSIONS) {
    let sum = 0;
    let count = 0;
    for (const id of d.questionIds) {
      const v = answers[id];
      if (v) {
        sum += map(v);
        count++;
      }
    }
    const perTen = count === 0 ? 0 : Math.round((sum / (count * 3)) * 10);
    perDim[d.key] = { perTen, raw: sum, level: levelFromPerTen(perTen) };
    perTenList.push(perTen);
  }
  const overall = Math.round((perTenList.reduce((a, b) => a + b, 0) / perTenList.length) * 10);
  return { perDim, perTenList, overall };
}

export type OverallProfile = {
  key: "parado" | "tremer" | "travoes" | "afinado";
  title: string;
  headline: string;
  body: string;
};

export function overallProfile(s: Scores): OverallProfile {
  const levels = DIMENSIONS.map((d) => s.perDim[d.key].level);
  const lows = levels.filter((l) => l === "low").length;
  const highs = levels.filter((l) => l === "high").length;

  if (lows >= 3) {
    return {
      key: "parado",
      title: "Motor parado",
      headline: "O teu crescimento está dependente da sorte",
      body: "A maioria das dimensões críticas está em zona vermelha. Não é falta de esforço — é falta de sistema. Hoje a receita pode vir, amanhã não há nada que a garanta.",
    };
  }
  if (highs === 0) {
    return {
      key: "tremer",
      title: "Motor a tremer",
      headline: "Tens potencial mas o sistema está a vazar",
      body: "Não há nada estruturalmente partido, mas também não há nada verdadeiramente sólido. Resultados medianos em todas as dimensões = previsibilidade zero.",
    };
  }
  if (lows >= 1) {
    return {
      key: "travoes",
      title: "Motor com travões",
      headline: "Estás perto — mas tens travões que te custam reuniões todos os meses",
      body: "A operação funciona em várias dimensões mas tens 1-2 pontos críticos que limitam o resto. Cortar estes travões é a alavanca de maior retorno no curto prazo.",
    };
  }
  return {
    key: "afinado",
    title: "Motor afinado",
    headline: "O teu sistema funciona — a questão agora é escalar",
    body: "Maioritariamente verde. Tens base sólida em quase todas as dimensões. A próxima etapa não é arranjar — é multiplicar com confiança.",
  };
}
