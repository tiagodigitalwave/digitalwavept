export type Lang = "pt" | "en";

export const CONTACT = {
  email: "hello@infodigitalwave.pt",
  phoneDisplay: "928 497 247",
  phoneHref: "tel:+351928497247",
  cal: "https://cal.com/tiago-barbosa-wiadtc/15min",
  youtubeCase: "wBfk9ibO37A",
  address: "[A PREENCHER]",
  linkedinCompany: "", // [A PREENCHER]
  linkedinFounder: "", // [A PREENCHER]
  youtubeChannel: "https://www.youtube.com/watch?v=wBfk9ibO37A",
};

const pt = {
  meta: {
    title: "Digital Wave | Reuniões com decisores através de email e LinkedIn",
    description: "Empresa portuguesa de outreach B2B. Montamos e gerimos o teu outreach por email e LinkedIn para marcar reuniões com decisores.",
  },
  nav: { process: "Processo", guide: "Guia", calc: "Calculadora", cases: "Casos de estudo", about: "Sobre nós", faq: "Perguntas", contact: "Contacto", book: "Marcar conversa", menu: "Abrir menu" },
  hero: {
    h1: "Reuniões com decisores, através de email e LinkedIn",
    sub: "Reestruturamos o teu outreach: infraestrutura, listas, mensagens e envio. Tu só atendes as reuniões.",
    guide: "Descarregar o guia",
    confirmed: "Reunião confirmada",
    via: { email: "via email", linkedin: "via LinkedIn" },
  },
  stats: ["emails enviados", "reuniões agendadas", "mercados diferentes", "países"],
  why: {
    title: "O caminho mais direto até quem decide",
    video: "Vídeo em breve",
    items: [
      ["Cresce sem aumentar a equipa", "O outreach corre em paralelo ao teu trabalho."],
      ["Email e LinkedIn em conjunto", "Dois canais a trabalhar a mesma lista de decisores."],
      ["Reuniões no teu calendário", "Decisores interessados, prontos a falar contigo."],
    ],
  },
  process: {
    title: "O nosso processo",
    steps: [
      ["Fundação", "Domínios, caixas de correio, perfis de LinkedIn e aquecimento."],
      ["Pesquisa", "Definição do cliente ideal e construção das listas."],
      ["Execução", "Mensagens e sequências de email e LinkedIn."],
      ["Crescimento", "Lançamento, análise das respostas e otimização."],
    ],
  },
  guide: {
    title: "Guia gratuito: como montar uma campanha de email e LinkedIn, passo a passo",
    sub: "Descarrega o PDF diretamente. Sem formulários, sem email.",
    cta: "Descarregar PDF",
    cover: "Guia de campanha email + LinkedIn",
  },
  calc: {
    title: "Quanto valem mais reuniões para o teu negócio?",
    q1: "Em cada 10 reuniões, quantas viram cliente? (0 a 10)",
    q2: "Valor médio de um cliente novo (€)",
    q3: "Clientes novos por mês que queres ter",
    err1: "Indica um número entre 0 e 10.",
    err: "Indica um número válido.",
    r: ["Valor de 10 reuniões", "Objetivo de faturação mensal", "Valor de 4 meses (10 reuniões por mês)", "Objetivo em 12 meses"],
    conv: "Taxa de conversão",
    note: "Estimativa com os teus números, não é uma promessa de resultados.",
    reset: "Recomeçar",
    fill: "Preenche o campo anterior para ver o próximo resultado.",
  },
  cases: {
    title: "Resultados reais, contados por quem os viveu",
    soon: "Em breve",
    linkedin: "Ver no LinkedIn",
    company: "[EMPRESA]",
    sector: "[SETOR]",
    play: "Reproduzir vídeo",
  },
  certs: { title: "Certificados pelas ferramentas que usamos" },
  about: {
    title: "Sobre nós",
    video: "Vídeo em breve",
    photo: "Foto em breve",
    role: "Fundador",
    bio: "[A PREENCHER] Texto curto sobre o Tiago e a Digital Wave.",
    support: "Empresa portuguesa. Trabalhamos em mais de 35 mercados e mais de 20 países.",
    linkedin: "LinkedIn do Tiago",
  },
  faq: {
    title: "Perguntas frequentes",
    items: [
      ["O que fazem exatamente?", "Montamos e gerimos o teu outreach por email e LinkedIn para marcar reuniões com decisores do teu mercado."],
      ["Quanto custa e como funciona a parceria?", "Depende do teu caso. Explicamos tudo numa conversa, depois de percebermos o teu negócio."],
      ["Que tipo de reuniões marcam?", "Reuniões com decisores do cliente ideal que definimos contigo."],
      ["Como evitam cair no spam?", "Domínios de envio separados, aquecimento das caixas, limites diários e mensagens em texto simples."],
      ["Para que empresas serve?", "Empresas B2B cujo serviço tenha valor suficiente por cliente para compensar o investimento."],
      ["Posso aprovar as mensagens e as listas antes do envio?", "[CONFIRMAR resposta]"],
    ],
  },
  final: { title: "Pronto para encher o calendário?" },
  footer: {
    tagline: "Outreach B2B por email e LinkedIn. Marcamos reuniões com decisores.",
    contact: "Contacto",
    address: "Morada",
    follow: "Segue-nos",
    privacy: "Política de privacidade",
    terms: "Termos",
    cookies: "Cookies",
    rights: "© 2026 Digital Wave",
  },
  modal: { title: "Marca uma conversa de 15 minutos", open: "Abrir calendário", close: "Fechar", fallback: "O calendário não carrega?" },
  cookie: { text: "Usamos cookies essenciais e, com o teu consentimento, cookies de análise. Vê a", link: "política de privacidade", accept: "Aceitar", reject: "Recusar" },
};

type Dict = typeof pt;

const en: Dict = {
  meta: {
    title: "Digital Wave | Meetings with decision-makers through email and LinkedIn",
    description: "Portuguese B2B outreach company. We build and run your email and LinkedIn outreach to book meetings with decision-makers.",
  },
  nav: { process: "Process", guide: "Guide", calc: "Calculator", cases: "Case studies", about: "About us", faq: "FAQ", contact: "Contact", book: "Book a call", menu: "Open menu" },
  hero: {
    h1: "Meetings with decision-makers through email and LinkedIn",
    sub: "We rebuild your outreach: infrastructure, lists, messaging and sending. You just take the meetings.",
    guide: "Download the guide",
    confirmed: "Meeting confirmed",
    via: { email: "via email", linkedin: "via LinkedIn" },
  },
  stats: ["emails sent", "meetings booked", "different markets", "countries"],
  why: {
    title: "The most direct path to decision-makers",
    video: "Video coming soon",
    items: [
      ["Grow without growing the team", "Outreach runs in parallel to your work."],
      ["Email and LinkedIn together", "Two channels working the same list of decision-makers."],
      ["Meetings in your calendar", "Interested decision-makers, ready to talk to you."],
    ],
  },
  process: {
    title: "Our process",
    steps: [
      ["Foundation", "Domains, mailboxes, LinkedIn profiles and warm-up."],
      ["Research", "Ideal customer definition and list building."],
      ["Execution", "Email and LinkedIn messaging and sequences."],
      ["Growth", "Launch, reply analysis and optimisation."],
    ],
  },
  guide: {
    title: "Free guide: how to build an email and LinkedIn campaign, step by step",
    sub: "Download the PDF directly. No forms, no email.",
    cta: "Download PDF",
    cover: "Email + LinkedIn campaign guide",
  },
  calc: {
    title: "What are more meetings worth to your business?",
    q1: "Out of 10 meetings, how many become clients? (0 to 10)",
    q2: "Average value of a new client (€)",
    q3: "New clients per month you want",
    err1: "Enter a number between 0 and 10.",
    err: "Enter a valid number.",
    r: ["Value of 10 meetings", "Monthly revenue goal", "Value of 4 months (10 meetings per month)", "12-month goal"],
    conv: "Conversion rate",
    note: "An estimate based on your numbers, not a promise of results.",
    reset: "Start over",
    fill: "Fill in the previous field to see the next result.",
  },
  cases: {
    title: "Real results, told by the people who lived them",
    soon: "Coming soon",
    linkedin: "View on LinkedIn",
    company: "[COMPANY]",
    sector: "[SECTOR]",
    play: "Play video",
  },
  certs: { title: "Certified by the tools we use" },
  about: {
    title: "About us",
    video: "Video coming soon",
    photo: "Photo coming soon",
    role: "Founder",
    bio: "[TO FILL] Short text about Tiago and Digital Wave.",
    support: "A Portuguese company. We work in more than 35 markets and more than 20 countries.",
    linkedin: "Tiago on LinkedIn",
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      ["What exactly do you do?", "We build and run your email and LinkedIn outreach to book meetings with decision-makers in your market."],
      ["How much does it cost and how does the partnership work?", "It depends on your case. We explain everything on a call, once we understand your business."],
      ["What kind of meetings do you book?", "Meetings with decision-makers from the ideal customer profile we define with you."],
      ["How do you avoid spam folders?", "Separate sending domains, mailbox warm-up, daily limits and plain-text messages."],
      ["Which companies is this for?", "B2B companies whose service has enough value per client to justify the investment."],
      ["Can I approve the messages and lists before sending?", "[CONFIRM answer]"],
    ],
  },
  final: { title: "Ready to fill your calendar?" },
  footer: {
    tagline: "B2B outreach through email and LinkedIn. We book meetings with decision-makers.",
    contact: "Contact",
    address: "Address",
    follow: "Follow us",
    privacy: "Privacy policy",
    terms: "Terms",
    cookies: "Cookies",
    rights: "© 2026 Digital Wave",
  },
  modal: { title: "Book a 15-minute call", open: "Open calendar", close: "Close", fallback: "Calendar not loading?" },
  cookie: { text: "We use essential cookies and, with your consent, analytics cookies. See our", link: "privacy policy", accept: "Accept", reject: "Reject" },
};

export const dict: Record<Lang, Dict> = { pt, en };
