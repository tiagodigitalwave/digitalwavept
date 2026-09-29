import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/site/Nav";
import { CountUp } from "@/components/site/CountUp";
import { LogoMarquee } from "@/components/site/Marquee";
import { Footer, CookieBanner } from "@/components/site/Footer";
import tiagoVideo from "@/assets/tiago-video.mp4";
import heroMeeting from "@/assets/hero-meeting.mp4.asset.json";
import awardInstantly from "@/assets/awards/award-instantly.png.asset.json";
import clayCert from "@/assets/awards/clay-cert.png.asset.json";
import instantlyExpert from "@/assets/awards/instantly-expert.png.asset.json";
import plusvibeCert from "@/assets/awards/plusvibe-cert.png.asset.json";
import dpoCert from "@/assets/awards/dpo-cert.png.asset.json";
import pmeExcelencia from "@/assets/awards/pme-excelencia.png.asset.json";
import iso9001 from "@/assets/awards/iso-9001.png.asset.json";
import iso27001 from "@/assets/awards/iso-27001.png.asset.json";

const AWARDS = [
  { src: awardInstantly.url, alt: "Prémio Instantly apresentado ao Tiago Barbosa", label: "Prémio Instantly: 5000 oportunidades de vendas B2B geradas" },
  { src: clayCert.url, alt: "Selo Clay Certified em Automação de Outbound", label: "Certificação Clay.com: Automação de Outbound" },
  { src: instantlyExpert.url, alt: "Selo Instantly AI Certified Expert", label: "Instantly.ai Certified Lead Generation Expert" },
  { src: plusvibeCert.url, alt: "Selo Plusvibe Certified Technology Partner", label: "Plusvibe Certified Technology Partner" },
  { src: dpoCert.url, alt: "Certificação de Encarregado de Proteção de Dados", label: "Certificação de Encarregado de Proteção de Dados (DPO) / RGPD" },
  { src: pmeExcelencia.url, alt: "Distinção PME Excelência", label: "PME Excelência" },
  { src: iso9001.url, alt: "Selo ISO 9001:2015 Certified Company", label: "ISO 9001: Gestão da Qualidade" },
  { src: iso27001.url, alt: "Selo ISO 27001 Information Security Management", label: "ISO 27001: Segurança da Informação" },
];

const TESTIMONIALS = [7, 8, 9, 10, 11, 12].map((number) => `/testimonials/t${number}.png`);

const YT_ID = "R_TZTTClLck";
const YT_THUMB = `https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg`;

const CAL_URL = "https://cal.com/tiago-barbosa-wiadtc/15min";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Digital Wave | LinkedIn Outreach e Email Marketing B2B em Portugal" },
      { name: "description", content: "Agência de LinkedIn Outreach e Email Marketing B2B em Portugal. Geramos e agendamos reuniões qualificadas com decisores, sem depender do fundador nem de tráfego pago." },
      { property: "og:title", content: "Digital Wave | LinkedIn Outreach e Email Marketing B2B" },
      { name: "twitter:title", content: "Digital Wave | LinkedIn Outreach e Email Marketing B2B" },
      { name: "twitter:description", content: "Reuniões B2B previsíveis com decisores através de LinkedIn Outreach e Email Marketing." },
      { name: "keywords", content: "LinkedIn Outreach, Email Marketing B2B, prospeção B2B, geração de leads B2B, agendamento de reuniões, outbound Portugal" },
      { property: "og:description", content: "Reuniões B2B previsíveis com decisores através de LinkedIn Outreach e Email Marketing, operado ponta a ponta." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://digitalwavept.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://digitalwavept.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Digital Wave",
          url: "https://digitalwavept.lovable.app/",
          description:
            "Agência de LinkedIn Outreach e Email Marketing B2B que gera reuniões previsíveis com decisores.",
          areaServed: ["PT", "Worldwide"],
          email: "hello@tiagodigitalwave.eu",
          founder: { "@type": "Person", name: "Tiago Barbosa" },
          serviceType: ["LinkedIn Outreach", "Email Marketing B2B", "Geração de leads B2B"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "LinkedIn Outreach e Email Marketing",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "LinkedIn Outreach B2B" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Email Marketing B2B (em conjunto com LinkedIn Outreach)" } },
            ],
          },
        }),
      },
    ],
  }),
  component: Page,
});

function CtaButton({ children = "Agendar uma reunião", variant = "primary" as "primary" | "ghost" }) {
  return (
    <a
      href={CAL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={variant === "primary" ? "btn-primary" : "btn-ghost"}
    >
      {children}
      <span aria-hidden>→</span>
    </a>
  );
}

function Hero() {
  const stats = [
    { node: <CountUp end={250} prefix="+" />, label: "Reuniões agendadas" },
    { node: <CountUp end={20} prefix="+" />, label: "Mercados alcançados" },
    { node: <CountUp end={7} suffix=" dígitos" />, label: "Gerados a parceiros" },
  ];
  return (
    <section id="top" className="relative pt-32 sm:pt-36 md:pt-44 pb-16 md:pb-20 px-6 max-w-7xl mx-auto">
      <span className="eyebrow relative z-10">Estruturação de Outreach · B2B</span>
      <div className="relative mt-6">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-6 sm:-inset-x-10 -inset-y-6 sm:-inset-y-10 -z-10 overflow-hidden rounded-3xl"
        >
          <video
            src={heroMeeting.url}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <h1 className="display max-w-5xl relative">
          Um sistema previsível de <em>reuniões B2B</em> com decisores.
        </h1>
      </div>
      <p className="mt-8 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
        Estruturamos o outreach da tua empresa em dois canais que trabalham em conjunto:
        <span className="text-foreground"> LinkedIn Outreach </span>
        e
        <span className="text-foreground"> Email Marketing</span>.
        Reuniões agendadas todos os meses, sem depender do fundador nem de tráfego pago.
      </p>

      <div className="relative mt-10">
        <div className="flex flex-wrap gap-3">
          <CtaButton />
          <a href="#cases" className="btn-ghost">Ver casos de sucesso</a>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 border-t border-border pt-10">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="num-display">{s.node}</div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-3">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Partners() {
  return (
    <section className="py-16 border-y border-border">
      <p className="text-center text-xs uppercase tracking-[0.18em] text-muted-foreground mb-10">
        Empresas com quem já agendamos reuniões
      </p>
      <LogoMarquee />
    </section>
  );
}

function VslPlayer() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="card-surface aspect-video relative overflow-hidden grid place-items-center">
      {playing ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&loop=1&playlist=${YT_ID}&rel=0&modestbranding=1&playsinline=1`}
          title="Digital Wave VSL"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 w-full h-full group"
          aria-label="Reproduzir vídeo"
        >
          <img
            src={YT_THUMB}
            alt="Pré-visualização do vídeo"
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 transition"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/30 to-background/70" />
          <div className="relative grid place-items-center h-full">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary text-primary-foreground grid place-items-center group-hover:scale-110 transition">
              <svg width="26" height="30" viewBox="0 0 22 26" fill="currentColor"><path d="M22 13L0 26V0z" /></svg>
            </div>
          </div>
        </button>
      )}
    </div>
  );
}

function VideoBlock() {
  return (
    <section className="section">
      <VslPlayer />
    </section>
  );
}

function Problem() {
  const items = [
    {
      t: "Depende do fundador",
      d: "As novas oportunidades param sempre que o fundador (ou o comercial mais experiente) deixa de prospetar manualmente.",
    },
    {
      t: "Reuniões com quem não decide",
      d: "Investe-se tempo em conversas com pessoas sem poder de compra. O ciclo de venda arrasta-se ou morre.",
    },
    {
      t: "Custo de aquisição alto",
      d: "Tráfego pago e agências generalistas tornam cada cliente cada vez mais caro, sem previsibilidade.",
    },
    {
      t: "Pipeline imprevisível",
      d: "Uns meses cheios, outros vazios. Impossível planear equipa, entrega e crescimento.",
    },
  ];
  return (
    <section id="sobre" className="section">
      <span className="eyebrow">O problema</span>
      <h2 className="display mt-6 max-w-4xl">
        Por que razão a maioria das empresas B2B <em>não cresce de forma previsível.</em>
      </h2>
      <p className="mt-6 max-w-2xl text-muted-foreground text-base sm:text-lg">
        A geração de reuniões continua presa a esforço manual, referências ou anúncios pagos.
        Isto cria quatro problemas que travam o crescimento.
      </p>

      <div className="mt-12 grid sm:grid-cols-2 gap-5">
        {items.map((it, i) => (
          <div key={it.t} className="card-surface p-8">
            <div className="num-display text-2xl text-muted-foreground/60">{String(i + 1).padStart(2, "0")}</div>
            <h3 className="text-2xl mt-3">{it.t}</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Offer() {
  return (
    <section id="pilar" className="section">
      <span className="eyebrow">A nossa oferta</span>
      <h2 className="display mt-6 max-w-4xl">
        <em>Estruturação de outreach</em> ponta a ponta.
      </h2>
      <p className="mt-6 max-w-3xl text-muted-foreground text-base sm:text-lg leading-relaxed">
        Não somos uma agência de e-mail marketing nem uma agência de LinkedIn.
        Estruturamos, dentro da tua empresa, um sistema de outreach que junta os dois canais
        para gerar reuniões com decisores, todos os meses, de forma previsível.
      </p>

      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <article className="card-surface p-8 md:p-10">
          <div className="flex items-baseline gap-4">
            <span className="num-display">01</span>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Canal 1</div>
          </div>
          <h3 className="text-3xl mt-4">Email Marketing</h3>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            O mesmo canal com que chegámos até ti. Identificamos decisores, escrevemos mensagens
            que geram resposta e garantimos que chegam à caixa de entrada certa.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            {[
              "Infraestrutura de envio dedicada",
              "Listas verificadas por ICP e mercado",
              "Copy testado com foco em resposta",
              "Cadências multi-toque otimizadas",
            ].map((i) => (
              <li key={i} className="flex gap-2 items-start text-muted-foreground">
                <span className="text-foreground mt-0.5">→</span>
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="card-surface p-8 md:p-10">
          <div className="flex items-baseline gap-4">
            <span className="num-display">02</span>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Canal 2</div>
          </div>
          <h3 className="text-3xl mt-4">LinkedIn Outbound</h3>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Pedidos de ligação, mensagens diretas e follow-ups estratégicos com os decisores
            certos. Coordenado com o e-mail para multiplicar respostas.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            {[
              "Segmentação por cargo e empresa-alvo",
              "Pedidos de ligação personalizados",
              "Sequências de mensagens e follow-up",
              "Sincronização com a cadência de e-mail",
            ].map((i) => (
              <li key={i} className="flex gap-2 items-start text-muted-foreground">
                <span className="text-foreground mt-0.5">→</span>
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <p className="mt-10 max-w-3xl text-muted-foreground text-base sm:text-lg leading-relaxed">
        Os dois canais funcionam em conjunto e alimentam o mesmo objetivo: colocar reuniões
        qualificadas no teu calendário, semana após semana.
      </p>
    </section>
  );
}

function Compliance() {
  const tools = [
    {
      name: "Apollo.io",
      role: "Base de dados de contactos e empresas B2B",
      d: "Trata dados pessoais em conformidade com o RGPD, o CCPA e outros regimes internacionais de proteção de dados, com mecanismos de exercício de direitos pelos titulares.",
      proof: "https://www.apollo.io/privacy-policy",
      proofLabel: "Política de Privacidade da Apollo",
    },
    {
      name: "Lusha",
      role: "Enriquecimento e verificação de dados de contacto",
      d: "Opera sob uma base de consentimento e conformidade com o RGPD, explicando de forma transparente de onde vêm os dados e como os titulares podem exercer os seus direitos.",
      proof: "https://www.lusha.com/privacy-articles/please-show-me-where-i-have-consented/",
      proofLabel: "Como a Lusha garante consentimento",
    },
  ];
  return (
    <section id="conformidade" className="section">
      <span className="eyebrow">Conformidade legal</span>
      <h2 className="display mt-6 max-w-4xl">
        Dados tratados <em>dentro da lei</em>, em Portugal e no mundo.
      </h2>
      <p className="mt-6 max-w-3xl text-muted-foreground text-base sm:text-lg leading-relaxed">
        As plataformas que utilizamos para identificar e contactar decisores B2B cumprem
        o Regulamento Geral sobre a Proteção de Dados (RGPD), a Lei n.º 58/2019 em Portugal
        e os principais regimes internacionais de privacidade. Não usamos listas compradas
        de origem desconhecida: trabalhamos apenas com fontes que publicam e provam a sua
        conformidade.
      </p>

      <div className="mt-12 grid md:grid-cols-2 gap-6">
        {tools.map((t) => (
          <article key={t.name} className="card-surface p-8 flex flex-col">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t.role}</div>
            <h3 className="text-2xl mt-3">{t.name}</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">{t.d}</p>
            <a
              href={t.proof}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-foreground underline underline-offset-4 hover:text-muted-foreground transition"
            >
              Ver prova pública: {t.proofLabel} <span aria-hidden>↗</span>
            </a>
          </article>
        ))}
      </div>

      <p className="mt-10 max-w-3xl text-sm text-muted-foreground leading-relaxed">
        Qualquer pessoa contactada pelos nossos sistemas pode exercer a qualquer momento os
        direitos de acesso, retificação, apagamento e oposição, bastando responder ao e-mail
        recebido ou escrever para{" "}
        <a href="mailto:hello@tiagodigitalwave.eu" className="text-foreground underline underline-offset-4">
          hello@tiagodigitalwave.eu
        </a>.
      </p>
    </section>
  );
}

function Benefits() {
  const items = [
    {
      t: "Previsibilidade",
      d: "Reuniões marcadas todos os meses, com um volume que passas a saber prever.",
    },
    {
      t: "Sem dependência do fundador",
      d: "A geração de novas oportunidades deixa de depender do teu tempo ou do da tua equipa.",
    },
    {
      t: "Só falas com decisores",
      d: "Filtramos e qualificamos antes da reunião. Chegas ao calendário apenas com quem decide.",
    },
    {
      t: "Custo de aquisição mais baixo",
      d: "Muito mais eficiente do que tráfego pago. Cada reunião passa a custar uma fração do que custava.",
    },
  ];
  return (
    <section id="beneficios" className="section">
      <span className="eyebrow">O que ganhas</span>
      <h2 className="display mt-6 max-w-4xl">
        Quatro coisas mudam <em>na tua empresa.</em>
      </h2>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((it, i) => (
          <div key={it.t} className="card-surface p-8">
            <div className="num-display text-2xl text-muted-foreground/60">{String(i + 1).padStart(2, "0")}</div>
            <h3 className="text-xl mt-3">{it.t}</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const STEPS = [
  {
    tag: "Base",
    title: "Preparação da infraestrutura",
    body: "Preparamos os domínios e as contas de e-mail, configuramos a autenticação e o aquecimento gradual para proteger a reputação de envio. Deixamos também os perfis de LinkedIn prontos a utilizar.",
  },
  {
    tag: "Pesquisa",
    title: "Construção de listas",
    body: "Identificamos empresas e decisores que correspondem ao teu cliente ideal. Cruzamos fontes, enriquecemos os dados e verificamos os contactos antes de iniciar qualquer abordagem.",
  },
  {
    tag: "Execução",
    title: "Mensagens personalizadas",
    body: "Escrevemos sequências de e-mail e mensagens de LinkedIn adaptadas a cada segmento. A pesquisa sobre a empresa e o decisor torna cada contacto relevante e genuíno.",
  },
  {
    tag: "Crescimento",
    title: "Lançamento e otimização",
    body: "Lançamos as campanhas, acompanhamos as respostas e analisamos os resultados. Ajustamos listas e mensagens de forma contínua para gerar reuniões qualificadas e crescimento sustentável.",
  },
];

function FlowGraphic({ layers }: { layers: number }) {
  return (
    <svg viewBox="0 0 120 168" className="h-44 w-32 text-foreground" fill="none" aria-hidden="true">
      {Array.from({ length: layers }, (_, index) => {
        const y = 104 - index * 29;
        return (
          <path
            key={index}
            d={`M60 ${y} L108 ${y + 24} L108 ${y + 32} L60 ${y + 56} L12 ${y + 32} L12 ${y + 24} Z`}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        );
      })}
    </svg>
  );
}

function Ecosystem() {
  return (
    <section id="ecossistema" className="section max-w-none bg-card/30 border-y border-border">
      <h2 className="display text-center">
        O nosso <em>processo.</em>
      </h2>

      <div className="mt-14 mx-auto max-w-[1500px] grid sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
        {STEPS.map((s, i) => (
          <article key={s.title} className="min-w-0 rounded-md border border-border bg-card p-5 sm:p-6 flex flex-col min-h-[510px] sm:min-h-[530px]">
            <div className="flex items-start justify-between gap-3 text-xs sm:text-sm text-muted-foreground uppercase">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span className="text-right">{s.tag}</span>
            </div>
            <h3 className="text-center text-2xl sm:text-[1.7rem] leading-tight mt-8 min-h-[4.5rem] flex items-start justify-center">{s.title}</h3>
            <div className="flex-1 flex items-end justify-center pb-5">
              <FlowGraphic layers={i + 1} />
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-foreground/85 min-h-[9.5rem]">{s.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const METHOD = [
  { phase: "FASE 1 · ARRANQUE", window: "Semana 0 → Semana 3", items: [
    { t: "Onboarding & ICP", d: "Workshop inicial, definição de ICP, mercados-alvo e ângulos de mensagem." },
    { t: "Setup técnico", d: "Domínios de e-mail, autenticação, warm-up e preparação dos perfis de LinkedIn." },
    { t: "Listas + Mensagens v1", d: "Primeira lista de decisores e primeiras cadências (e-mail e LinkedIn) prontas." },
  ]},
  { phase: "FASE 2 · ESCALA", window: "Semana 4 → contínuo", items: [
    { t: "Envio em escala", d: "Volume diário ajustado, com monitorização de entregabilidade e limites do LinkedIn." },
    { t: "Otimização semanal", d: "Análise de KPIs, novos testes, refinamento de listas e mensagens." },
    { t: "Reuniões consistentes", d: "Reporting semanal, briefings de leads e marcações no teu calendário." },
  ]},
];

function Method() {
  return (
    <section id="metodo" className="section">
      <span className="eyebrow">Método</span>
      <h2 className="display mt-6 max-w-4xl">
        Em <em>3 semanas</em> o teu outreach está no ar.
      </h2>

      <div className="mt-12 grid md:grid-cols-2 gap-6">
        {METHOD.map((phase) => (
          <div key={phase.phase} className="card-surface p-8">
            <div className="flex items-baseline justify-between mb-2">
              <div className="text-xs uppercase tracking-[0.18em] text-foreground">{phase.phase}</div>
            </div>
            <div className="text-sm text-muted-foreground mb-8">{phase.window}</div>
            <ul className="space-y-6">
              {phase.items.map((it, i) => (
                <li key={it.t} className="flex gap-4">
                  <div className="num-display text-2xl text-muted-foreground/50 shrink-0 w-10">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <div className="font-medium">{it.t}</div>
                    <div className="text-sm text-muted-foreground mt-1">{it.d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="cases" className="py-32 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <span className="eyebrow">Testemunhos</span>
        <h2 className="display mt-6 max-w-4xl">
          Deixamos os <em>clientes falar</em> por nós.
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex items-start gap-6 marquee-track-slow py-4">
          {Array.from({ length: 3 }).flatMap((_, loop) =>
            TESTIMONIALS.map((img, i) => (
              <div
                key={`${loop}-${i}`}
                className="card-surface w-[340px] sm:w-[420px] shrink-0 overflow-hidden bg-[#1c1030]"
              >
                <img
                  src={img}
                  alt={`Mensagem de cliente ${i + 1}`}
                  loading="lazy"
                  className="w-full h-auto block"
                />
              </div>
            )),
          )}
        </div>
      </div>
    </section>
  );
}

function CaseStudy() {
  const [playing, setPlaying] = useState(false);
  return (
    <section id="caso-de-estudo" className="section">
      <div className="max-w-3xl mb-12">
        <span className="eyebrow">Caso de estudo</span>
        <h2 className="display mt-6">
          Como funciona <em>na prática</em>.
        </h2>
        <p className="mt-6 text-muted-foreground text-lg">
          Um caso real de estruturação de outreach: o que foi implementado, como
          foi executado e que resultados gerou.
        </p>
      </div>

      <div className="card-surface aspect-video relative overflow-hidden grid place-items-center">
        {playing ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/wBfk9ibO37A?autoplay=1&rel=0&modestbranding=1&playsinline=1"
            title="Caso de estudo Digital Wave"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full group"
            aria-label="Reproduzir caso de estudo"
          >
            <img
              src="https://img.youtube.com/vi/wBfk9ibO37A/maxresdefault.jpg"
              alt="Pré-visualização do caso de estudo"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 transition"
            />

            <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/30 to-background/70" />
            <div className="relative grid place-items-center h-full">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary text-primary-foreground grid place-items-center group-hover:scale-110 transition">
                <svg width="26" height="30" viewBox="0 0 22 26" fill="currentColor"><path d="M22 13L0 26V0z" /></svg>
              </div>
            </div>
          </button>
        )}
      </div>
    </section>
  );
}

function Team() {
  return (
    <section id="equipa" className="section">
      <span className="eyebrow">A equipa</span>
      <h2 className="display mt-6 max-w-4xl">
        Quem está por trás da <em>Digital Wave.</em>
      </h2>

      <div className="mt-12 md:mt-16 grid md:grid-cols-[300px_1fr] lg:grid-cols-[360px_1fr] gap-8 md:gap-10 items-start">
        <div className="card-surface p-4">
          <div className="aspect-[4/5] rounded-xl bg-muted/40 overflow-hidden">
            <video
              src={tiagoVideo}
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4 px-2 pb-2">
            <div className="text-lg font-medium">Tiago Barbosa</div>
            <div className="text-sm text-muted-foreground">Founder · Digital Wave</div>
          </div>
        </div>

        <div>
          <h3 className="text-3xl md:text-4xl max-w-2xl">
            A missão, o método e a forma como colocamos decisores B2B na tua agenda.
          </h3>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed max-w-2xl">
            Neste vídeo, o Tiago explica em primeira pessoa como estruturamos operações
            de outreach para empresas B2B: LinkedIn Outreach, Email Marketing e todo o processo que
            transforma contactos frios em reuniões com decisores.
          </p>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
            E o que torna a Digital Wave diferente: equipa dedicada por cliente,
            foco em decisores qualificados e total transparência sobre números,
            processos e resultados.
          </p>
        </div>
      </div>
    </section>
  );
}

function QuizCta() {
  return (
    <section id="quiz" className="section">
      <div className="card-surface p-10 md:p-16 relative overflow-hidden">
        
        <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-end">
          <div>
            <span className="eyebrow">Diagnóstico gratuito</span>
            <h2 className="display mt-6 max-w-3xl">
              Descobre a <em>saúde do teu sistema</em> de aquisição.
            </h2>
            <p className="mt-6 max-w-2xl text-muted-foreground text-base sm:text-lg">
              8 perguntas, 4 pilares críticos. No fim recebes um diagnóstico claro
              do que está a travar o crescimento e o que ativar a seguir.
            </p>
          </div>
          <Link to="/quiz" className="btn-primary">
            Faz o Quiz <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="contacto" className="section">
      <div className="card-surface p-10 md:p-20 text-center relative overflow-hidden">
        
        <div className="relative">
          <span className="eyebrow">Está na hora</span>
          <h2 className="display mt-6 max-w-3xl mx-auto">
            A tua próxima reunião com um decisor B2B começa <em>aqui.</em>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            30 minutos contigo. Mostramos-te o que já fizemos, vemos se faz sentido
            trabalharmos juntos. Sem rodeios, sem pitch decks.
          </p>
          <div className="mt-10 flex justify-center">
            <CtaButton>Agendar a minha reunião agora</CtaButton>
          </div>
          <div className="mt-10 pt-10 border-t border-border max-w-md mx-auto text-sm">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Ou envia email</div>
            <a href="mailto:hello@tiagodigitalwave.eu" className="text-foreground hover:underline">
              hello@tiagodigitalwave.eu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Awards() {
  return (
    <section id="premios" className="section">
      <span className="eyebrow">Prémios e certificações</span>
      <h2 className="display mt-6 max-w-4xl">
        Os nossos <em>resultados</em>, reconhecidos por quem manda no mercado.
      </h2>
      <p className="mt-6 max-w-3xl text-muted-foreground text-base sm:text-lg leading-relaxed">
        Prémios e certificações que provam a qualidade do trabalho que entregamos
        em geração de leads B2B, automação e segurança da informação.
      </p>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {AWARDS.map((award) => (
          <article
            key={award.label}
            className="card-surface p-6 flex flex-col items-center text-center gap-4"
          >
            <div className="flex-1 flex items-center justify-center py-4">
              <img
                src={award.src}
                alt={award.alt}
                loading="lazy"
                className="max-h-48 w-auto max-w-full object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{award.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Page() {
  return (
    <div className="dark">
      <Nav />
      <main>
        <Hero />
        <Partners />
        <VideoBlock />
        <Problem />
        <Offer />
        <Benefits />
        <Ecosystem />
        <Method />
        <Compliance />
        <Testimonials />
        <CaseStudy />
        <Awards />
        <Team />
        <QuizCta />
        <FinalCta />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
