import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/site/Nav";
import { CountUp } from "@/components/site/CountUp";
import { LogoMarquee } from "@/components/site/Marquee";
import { Footer, CookieBanner } from "@/components/site/Footer";
import tiagoVideo from "@/assets/tiago-video.mp4";
import heroMeeting from "@/assets/hero-meeting.mp4.asset.json";
import testimonial7 from "@/assets/testimonials/t7.png.asset.json";
import testimonial8 from "@/assets/testimonials/t8.png.asset.json";
import testimonial9 from "@/assets/testimonials/t9.png.asset.json";
import testimonial10 from "@/assets/testimonials/t10.png.asset.json";
import testimonial11 from "@/assets/testimonials/t11.png.asset.json";
import testimonial12 from "@/assets/testimonials/t12.png.asset.json";

const TESTIMONIALS = [
  testimonial7,
  testimonial8,
  testimonial9,
  testimonial10,
  testimonial11,
  testimonial12,
];

const YT_ID = "1r3yGX4nPnc";
const YT_THUMB = `https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg`;

const CAL_URL = "https://cal.com/tiago-barbosa-wiadtc/30min";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Digital Wave — Estruturação de Outreach B2B (Cold Email + LinkedIn)" },
      { name: "description", content: "Ajudamos empresas B2B a criar um sistema previsível de reuniões com decisores. Estruturamos o outreach via Cold Email e LinkedIn, sem depender do fundador nem de tráfego pago." },
      { property: "og:title", content: "Digital Wave — Estruturação de Outreach B2B" },
      { property: "og:description", content: "Um sistema previsível de reuniões com decisores B2B. Cold Email + LinkedIn, operado ponta a ponta." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
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
            className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/90" />
        </div>
        <h1 className="display max-w-5xl relative">
          Um sistema previsível de <em>reuniões B2B</em> com decisores.
        </h1>
      </div>
      <p className="mt-8 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
        Estruturamos o outreach da tua empresa em dois canais que trabalham em conjunto:
        <span className="text-foreground"> Cold Email </span>
        e
        <span className="text-foreground"> LinkedIn</span>.
        Reuniões agendadas todos os meses, sem depender do fundador nem de tráfego pago.
      </p>

      <div className="relative mt-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-20 -top-20 -bottom-20 -z-10 overflow-hidden"
        >
          <div
            className="absolute inset-0 hero-glow-anim"
            style={{
              background:
                "radial-gradient(ellipse 55% 55% at 28% 55%, oklch(1 0 0 / 0.10), transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute inset-0 hero-glow-anim-2"
            style={{
              background:
                "radial-gradient(ellipse 50% 55% at 78% 85%, oklch(1 0 0 / 0.08), transparent 70%)",
              filter: "blur(50px)",
            }}
          />
        </div>
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
            className="absolute inset-0 w-full h-full object-cover opacity-60 blur-[2px] grayscale group-hover:opacity-70 transition"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/30 to-background/70" />
          <div className="relative grid place-items-center h-full">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-foreground text-background grid place-items-center shadow-[0_0_60px_oklch(1_0_0/0.4)] group-hover:scale-110 transition">
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
          <h3 className="text-3xl mt-4">Cold Email</h3>
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
    tag: "Estratégia",
    title: "ICP & posicionamento",
    body: "Definimos contigo o perfil de cliente ideal por mercado, vertical e dor. Mapeamos os ângulos de comunicação que fazem sentido para cada decisor.",
    points: ["Workshop de ICP e personas", "Mapeamento de mercados-alvo", "Ângulos de mensagem por segmento"],
  },
  {
    tag: "Infraestrutura",
    title: "Setup técnico dos canais",
    body: "Preparamos a infraestrutura de envio de e-mail (domínios secundários, autenticação, warm-up) e configuramos os perfis de LinkedIn a utilizar.",
    points: ["Domínios dedicados ao outreach", "Autenticação SPF/DKIM/DMARC", "Preparação dos perfis de LinkedIn"],
  },
  {
    tag: "Dados",
    title: "Listas de decisores",
    body: "Construímos listas com dados enriquecidos e verificados. O mesmo contacto entra na cadência de e-mail e na sequência de LinkedIn.",
    points: ["Segmentação por cargo e empresa", "Verificação em cascata", "Sinais de compra e contexto"],
  },
  {
    tag: "Mensagens",
    title: "Copy para e-mail e LinkedIn",
    body: "Escrevemos as mensagens para os dois canais. Testamos ângulos, assuntos e CTAs todas as semanas até maximizar respostas.",
    points: ["Cadências de e-mail 3-5 toques", "Pedidos e follow-ups no LinkedIn", "Testes A/B contínuos"],
  },
  {
    tag: "Operação",
    title: "Envio e gestão diária",
    body: "Enviamos, monitorizamos entregabilidade, gerimos as respostas dos dois canais e qualificamos manualmente cada interessado.",
    points: ["Envio diário gerido por nós", "Monitorização de inbox e LinkedIn", "Triagem e qualificação humana"],
  },
  {
    tag: "Reuniões",
    title: "Agendamento no teu calendário",
    body: "Apenas leads qualificadas chegam até ti, com contexto, agenda confirmada e link da reunião. Tu só apareces para fechar.",
    points: ["Briefing pré-reunião", "Confirmações automáticas", "Reporting semanal de pipeline"],
  },
];

function Ecosystem() {
  return (
    <section id="ecossistema" className="section">
      <span className="eyebrow">Como funciona</span>
      <h2 className="display mt-6 max-w-4xl">
        Seis passos. <em>Um sistema.</em>
      </h2>
      <p className="mt-6 max-w-2xl text-muted-foreground text-base sm:text-lg">
        Cobrimos todo o ciclo, do perfil de cliente ideal até à reunião marcada.
        Cada conta tem uma operação dedicada, com os dois canais a trabalhar em conjunto.
      </p>

      <div className="mt-16 grid md:grid-cols-2 gap-5">
        {STEPS.map((s, i) => (
          <article key={s.title} className="card-surface p-8 hover:border-foreground/40 transition">
            <div className="flex items-baseline justify-between">
              <span className="num-display text-foreground/80">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.tag}</span>
            </div>
            <h3 className="text-2xl mt-4">{s.title}</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">{s.body}</p>
            <ul className="mt-5 space-y-2 text-sm">
              {s.points.map((p) => (
                <li key={p} className="flex gap-2 text-muted-foreground">
                  <span className="text-foreground">·</span>{p}
                </li>
              ))}
            </ul>
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
        <div className="flex gap-6 marquee-track-slow py-4">
          {Array.from({ length: 3 }).flatMap((_, loop) =>
            TESTIMONIALS.map((img, i) => (
              <div
                key={`${loop}-${i}`}
                className="card-surface w-[340px] sm:w-[380px] h-[460px] sm:h-[500px] shrink-0 overflow-hidden bg-[#0a0a0a] grid place-items-center p-3"
              >
                <img
                  src={img.url}
                  alt={`Mensagem de cliente ${i + 1}`}
                  loading="lazy"
                  className="max-w-full max-h-full w-auto h-auto object-contain rounded-md"
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
              className="absolute inset-0 w-full h-full object-cover opacity-60 blur-[2px] grayscale group-hover:opacity-70 transition"
            />

            <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/30 to-background/70" />
            <div className="relative grid place-items-center h-full">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-foreground text-background grid place-items-center shadow-[0_0_60px_oklch(1_0_0/0.4)] group-hover:scale-110 transition">
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
            de outreach para empresas B2B: Cold Email, LinkedIn e todo o processo que
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(1_0_0/0.08),transparent_70%)]" />
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(1_0_0/0.08),transparent_70%)]" />
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
        <Testimonials />
        <CaseStudy />
        <Team />
        <QuizCta />
        <FinalCta />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
