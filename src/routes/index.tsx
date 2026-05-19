import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/site/Nav";
import { LogoMarquee } from "@/components/site/Marquee";
import { Footer, CookieBanner } from "@/components/site/Footer";
import tiagoPhoto from "@/assets/tiago.jpg";

const YT_ID = "1r3yGX4nPnc";
const YT_THUMB = `https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg`;

const CAL_URL = "https://cal.com/tiago-barbosa-wiadtc/30min";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Digital Wave, Email Marketing B2B que agenda reuniões com decisores" },
      { name: "description", content: "Digital Wave é a operação de Email Marketing para empresas B2B. +200 reuniões agendadas, +20 mercados, 7 dígitos gerados a parceiros." },
      { property: "og:title", content: "Digital Wave, Email Marketing B2B que agenda reuniões" },
      { property: "og:description", content: "Encontramos e agendamos reuniões com os teus clientes ideais através de Email Marketing, todos os meses." },
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
  return (
    <section id="top" className="relative pt-32 sm:pt-36 md:pt-44 pb-16 md:pb-20 px-6 max-w-7xl mx-auto">
      <span className="eyebrow">Email outbound · B2B</span>
      <h1 className="display mt-6 max-w-5xl">
        Encontramos e agendamos reuniões com os teus <em>clientes ideais.</em>
      </h1>
      <p className="mt-8 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
        Construímos a operação de email outbound da tua empresa B2B. Listas verificadas,
        copy testado e infraestrutura sólida, para a tua agenda nunca mais ficar vazia.
        Tu fechas, nós abastecemos.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <CtaButton />
        <a href="#cases" className="btn-ghost">Ver casos de sucesso</a>
      </div>

      <div className="mt-24 grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 border-t border-border pt-10">
        {[
          { n: "+200", label: "Reuniões agendadas" },
          { n: "+20", label: "Mercados alcançados" },
          { n: "7 dígitos", label: "Gerados a parceiros" },
        ].map((s) => (
          <div key={s.label}>
            <div className="num-display">{s.n}</div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-3">{s.label}</div>
          </div>
        ))}
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
            className="absolute inset-0 w-full h-full object-cover opacity-60 blur-[2px] group-hover:opacity-70 transition"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/30 to-background/70" />
          <div className="relative grid place-items-center h-full">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-wave text-primary-foreground grid place-items-center shadow-[0_0_60px_var(--color-wave)] group-hover:scale-110 transition">
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

function Mission() {
  return (
    <section id="sobre" className="section">
      <span className="eyebrow">A Digital Wave</span>
      <h2 className="display mt-6 max-w-4xl">Missão.</h2>
      <div className="mt-10 grid md:grid-cols-2 gap-10 max-w-5xl">
        <p className="text-lg text-foreground leading-relaxed">
          A Digital Wave é a operação de aquisição por email que está por trás de
          empresas B2B que querem crescer sem depender de referências, anúncios pagos
          ou comerciais a "procurar leads no LinkedIn".
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Construímos sistemas de email outbound do zero: infraestrutura, listas
          verificadas, copy e cadências testadas. O nosso trabalho é simples, fazer
          chegar à agenda do nosso cliente reuniões com decisores qualificados, todos
          os meses, em vários mercados.
        </p>
      </div>
    </section>
  );
}

function Pilar() {
  return (
    <section id="pilar" className="section">
      <span className="eyebrow">O nosso pilar</span>
      <h2 className="display mt-6 max-w-4xl">
        Uma só promessa:<br /><em>reuniões agendadas</em> com decisores B2B.
      </h2>

      <div className="mt-12 card-surface p-8 md:p-12 max-w-4xl">
        <div className="flex items-baseline gap-6">
          <span className="num-display text-wave">01</span>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Email outbound como serviço</div>
        </div>
        <h3 className="text-3xl md:text-4xl mt-4">Sistema de aquisição por email, ponta a ponta.</h3>
        <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
          Não somos uma "ferramenta". Operamos o canal por ti: do setup técnico ao
          envio diário, da resposta à marcação no teu calendário. Tu só apareces às
          reuniões.
        </p>
        <ul className="mt-8 grid sm:grid-cols-2 gap-3 text-sm">
          {[
            "Setup de domínios e infraestrutura de envio",
            "Listas verificadas por ICP e mercado",
            "Copy testado A/B com foco em resposta",
            "Cadências multi-toque otimizadas",
            "Gestão de respostas e qualificação",
            "Reuniões marcadas direto no teu calendário",
          ].map((i) => (
            <li key={i} className="flex gap-2 items-start text-muted-foreground">
              <span className="text-wave mt-0.5">→</span>
              <span>{i}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const STEPS = [
  {
    tag: "Estratégia",
    title: "ICP & posicionamento",
    body: "Definimos contigo o perfil de cliente ideal por mercado, vertical, dimensão e dor. Mapeamos a tua proposta de valor em ângulos de email que provocam resposta.",
    points: ["Workshop de ICP e personas", "Mapeamento de mercados-alvo", "Definição de ângulos de copy"],
  },
  {
    tag: "Infraestrutura",
    title: "Setup técnico de envio",
    body: "Compramos e configuramos domínios secundários, fazemos o aquecimento (warm-up) e garantimos SPF, DKIM e DMARC. Zero risco para o teu domínio principal.",
    points: ["Domínios dedicados ao outbound", "Warm-up automático 2-3 semanas", "Autenticação SPF/DKIM/DMARC"],
  },
  {
    tag: "Dados",
    title: "Listas verificadas por ICP",
    body: "Construímos listas de decisores com dados enriquecidos e verificados em múltiplas camadas. Bounce rate abaixo de 2% como standard.",
    points: ["Scraping multi-fonte", "Verificação em cascata", "Enriquecimento com sinais de compra"],
  },
  {
    tag: "Copy & Cadência",
    title: "Sequências testadas A/B",
    body: "Escrevemos cadências de 3-5 toques com personalização à escala. Testamos linhas de assunto, ângulos e CTAs todas as semanas.",
    points: ["Personalização 1:1 com IA", "Variantes A/B contínuas", "Otimização por taxa de resposta"],
  },
  {
    tag: "Envio & Gestão",
    title: "Operação diária do canal",
    body: "Enviamos, monitorizamos deliverability, gerimos respostas, qualificamos interesse e marcamos a reunião direto no calendário do cliente.",
    points: ["Envio diário gerido por nós", "Monitorização de inbox placement", "Triagem e qualificação humana"],
  },
  {
    tag: "Reuniões",
    title: "Agendamento no teu calendário",
    body: "Apenas as leads qualificadas chegam até ti, já com contexto, agenda confirmada e link da reunião. Tu só fazes aquilo que sabes melhor: fechar.",
    points: ["Briefing pré-reunião", "Confirmações automáticas", "Reporting semanal de pipeline"],
  },
];

function Ecosystem() {
  return (
    <section id="ecossistema" className="section">
      <span className="eyebrow">Como funciona</span>
      <h2 className="display mt-6 max-w-4xl">
        Ecossistema de email outbound. <em>Passo a passo.</em>
      </h2>
      <p className="mt-6 max-w-2xl text-muted-foreground text-base sm:text-lg">
        Seis etapas que cobrem todo o ciclo, do ICP à reunião marcada. Nada é
        terceirizado, nada é genérico. Cada conta tem a sua operação dedicada.
      </p>

      <div className="mt-16 grid md:grid-cols-2 gap-5">
        {STEPS.map((s, i) => (
          <article key={s.title} className="card-surface p-8 hover:border-wave/40 transition">
            <div className="flex items-baseline justify-between">
              <span className="num-display text-wave/80">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.tag}</span>
            </div>
            <h3 className="text-2xl mt-4">{s.title}</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">{s.body}</p>
            <ul className="mt-5 space-y-2 text-sm">
              {s.points.map((p) => (
                <li key={p} className="flex gap-2 text-muted-foreground">
                  <span className="text-wave">·</span>{p}
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
    { t: "Onboarding & ICP", d: "Workshop inicial, definição de ICP, mercados-alvo e ângulos de comunicação." },
    { t: "Setup técnico", d: "Compra e configuração de domínios secundários, autenticação e warm-up." },
    { t: "Listas + Copy v1", d: "Primeira lista verificada e primeira cadência de email pronta a enviar." },
  ]},
  { phase: "FASE 2 · ESCALA", window: "Semana 4 → contínuo", items: [
    { t: "Envio em escala", d: "Volume diário ajustado por inbox, com monitorização de deliverability." },
    { t: "Otimização semanal", d: "Análise de KPIs, novos testes A/B, refinamento de listas e copy." },
    { t: "Reuniões consistentes", d: "Reporting semanal, briefings de leads e marcações no teu calendário." },
  ]},
];

function Method() {
  return (
    <section id="metodo" className="section">
      <span className="eyebrow">Método</span>
      <h2 className="display mt-6 max-w-4xl">
        Em <em>3 semanas</em> a tua máquina de outbound está a enviar.
      </h2>

      <div className="mt-12 grid md:grid-cols-2 gap-6">
        {METHOD.map((phase) => (
          <div key={phase.phase} className="card-surface p-8">
            <div className="flex items-baseline justify-between mb-2">
              <div className="text-xs uppercase tracking-[0.18em] text-wave">{phase.phase}</div>
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
        <p className="mt-6 max-w-2xl text-muted-foreground text-lg">
          Espaço reservado para prints reais de emails e respostas de clientes. Vai
          passar em rodapé maior, em loop contínuo.
        </p>
      </div>

      {/* Placeholder marquee, replace with email screenshots */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex gap-6 marquee-track-slow whitespace-nowrap py-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              data-email-screenshot-placeholder
              className="card-surface w-[min(420px,85vw)] h-[260px] sm:h-[280px] shrink-0 grid place-items-center text-center p-6"
            >
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-wave mb-2">Print de email #{i + 1}</div>
                <div className="text-sm text-muted-foreground whitespace-normal">
                  Espaço para print de email real do cliente.<br />
                  (faz upload e substitui este placeholder)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section id="equipa" className="section">
      <span className="eyebrow">A equipa</span>
      <h2 className="display mt-6 max-w-4xl">
        Operadores. Engenheiros. <em>Closers.</em>
      </h2>

      <div className="mt-12 md:mt-16 grid md:grid-cols-[300px_1fr] lg:grid-cols-[360px_1fr] gap-8 md:gap-10 items-start">
        <div className="card-surface p-4">
          <div className="aspect-[4/5] rounded-xl bg-muted/40 overflow-hidden">
            <img src={tiagoPhoto} alt="Tiago Barbosa" className="w-full h-full object-cover" />
          </div>
          <div className="mt-4 px-2 pb-2">
            <div className="text-lg font-medium">Tiago Barbosa</div>
            <div className="text-sm text-wave">Founder · Digital Wave</div>
          </div>
        </div>

        <div>
          <h3 className="text-3xl md:text-4xl max-w-2xl">
            Construído à mão por quem opera, não por quem vende cursos.
          </h3>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed max-w-2xl">
            Espaço reservado para a tua breve descrição. Quem és, o que fizeste antes
            da Digital Wave, porque é que o email outbound é o teu canal de eleição
            e o que faz com que a tua operação seja diferente.
          </p>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
            (Edita este bloco com o teu texto definitivo: formação, experiência,
            clientes anteriores, números pessoais ou um manifesto curto.)
          </p>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="contacto" className="section">
      <div className="card-surface p-10 md:p-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.85_0.09_235/0.18),transparent_70%)]" />
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
            <a href="mailto:hello@tiagodigitalwave.eu" className="text-wave hover:underline">
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
        <Mission />
        <Pilar />
        <Ecosystem />
        <Method />
        <Testimonials />
        <Team />
        <FinalCta />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
