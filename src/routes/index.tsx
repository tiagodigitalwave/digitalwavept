import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Users, Linkedin, CalendarCheck, Play, Download, Mail } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer, CookieBanner } from "@/components/site/Footer";
import { BookButton } from "@/components/site/Booking";
import { useI18n } from "@/lib/i18n";
import { CONTACT, dict } from "@/lib/content";
import { calculate, parseNum } from "@/lib/calculator";

const SITE = "https://digitalwavept.lovable.app/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: dict.pt.meta.title },
      { name: "description", content: dict.pt.meta.description },
      { property: "og:title", content: dict.pt.meta.title },
      { property: "og:description", content: dict.pt.meta.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE },
      { property: "og:locale:alternate", content: "en_GB" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE }],
  }),
  component: Home,
});

function Home() {
  return (
    <div id="top" className="site-home min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />
      <main className="pt-[72px]">
        <Hero />
        <Stats />
        <Why />
        <Process />
        <Guide />
        <Calculator />
        <Cases />
        <Certs />
        <About />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

const wrap = "site-wrap";

function Hero() {
  const { t } = useI18n();
  return (
    <section className="bg-ink text-ink-foreground">
      <div className={`${wrap} grid grid-cols-12 gap-8 items-center`}>
        <div className="hero-copy">
          <h1 className="hero-title">{t.hero.h1}</h1>
          <p className="mt-6 text-lg text-ink-foreground/80 max-w-xl">{t.hero.sub}</p>
          <div className="hero-actions mt-8 flex flex-col sm:flex-row gap-3">
            <BookButton className="btn-primary justify-center" />
            <a href="#guia" className="btn-outline-light">{t.hero.guide}</a>
          </div>
        </div>
        <div className="hero-symbol" aria-hidden="true">
          <svg viewBox="0 0 260 340" role="presentation">
            <path d="M-45 310 130 170 305 310 M-45 265 130 125 305 265 M-45 220 130 80 305 220 M-45 175 130 35 305 175" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </section>
  );
}

function Count({ to, prefix = "+", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const { lang } = useI18n();
  return <span>{prefix}{to.toLocaleString(lang === "pt" ? "pt-PT" : "en-GB").replace(/\u00a0|\u202f/g, ".")}{suffix}</span>;
}

function Stats() {
  const { t, lang } = useI18n();
  const items = [
    { el: <><Count to={100} /> {lang === "pt" ? "mil" : "k"}</> },
    { el: <Count to={1000} /> },
    { el: <Count to={35} /> },
    { el: <Count to={20} /> },
  ];
  return (
    <section className="stat-strip bg-background text-foreground">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((it, i) => (
          <div key={i} className="stat-item">
            <div className="stat-number">{it.el}</div>
            <div className="stat-label">{t.stats[i]}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function VideoPlaceholder({ label }: { label: string }) {
  return (
    <div className="video-placeholder">
      <div>
        <div className="play-mark"><Play size={26} /></div>
        <div className="mt-3 text-sm text-ink-foreground/80">{label}</div>
      </div>
    </div>
  );
}

function Why() {
  const { t } = useI18n();
  const icons = [Users, Linkedin, CalendarCheck];
  return (
    <section className="bg-background">
      <div className={wrap}>
        <h2 className="text-3xl md:text-4xl max-w-2xl">{t.why.title}</h2>
        <div className="mt-10 grid lg:grid-cols-2 gap-10 items-center">
          <Reveal><VideoPlaceholder label={t.why.video} /></Reveal>
          <div className="space-y-6">
            {t.why.items.map(([h, p], i) => {
              const I = icons[i];
              return (
                <Reveal key={h} className="editorial-benefit flex gap-4">
                  <div className="pt-1 shrink-0"><I size={22} /></div>
                  <div><h3 className="text-lg">{h}</h3><p className="text-muted-foreground mt-1">{p}</p></div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const { t } = useI18n();
  return (
    <section id="processo" className="bg-background">
      <div className={wrap}>
        <h2 className="text-3xl md:text-4xl">{t.process.title}</h2>
        <div className="relative mt-12">
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {t.process.steps.map(([h, p], i) => (
              <li key={h}>
                <Reveal className="editorial-step h-full">
                  <div className="step-number">0{i + 1}</div>
                  <h3 className="mt-5 text-xl">{h}</h3>
                  <p className="mt-2 text-muted-foreground">{p}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Guide() {
  const { t } = useI18n();
  const track = () => {
    // Evento de analytics (apenas contagem, sem dados pessoais)
    const w = window as unknown as { gtag?: (...a: unknown[]) => void; plausible?: (e: string) => void };
    w.gtag?.("event", "guide_download");
    w.plausible?.("guide_download");
  };
  return (
    <section id="guia" className="bg-muted text-foreground">
      <div className={`${wrap} grid md:grid-cols-[minmax(0,320px)_1fr] gap-10 items-center`}>
        {/* [PDF FINAL A ENVIAR] capa provisória */}
        <div className="aspect-[3/4] max-w-[260px] w-full guide-cover bg-background text-foreground p-6 flex flex-col justify-between">
          <div className="flex gap-2"><Mail size={22} /><Linkedin size={22} /></div>
          <div className="font-bold text-xl leading-tight">{t.guide.cover}</div>
          <div className="h-px w-16 bg-foreground" />
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl">{t.guide.title}</h2>
          <p className="mt-4 text-muted-foreground text-lg">{t.guide.sub}</p>
          <a href="/guia-campanha-email-linkedin.pdf" download onClick={track} className="btn-primary mt-8">
            <Download size={18} /> {t.guide.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

function Calculator() {
  const { t, lang } = useI18n();
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const loc = lang === "pt" ? "pt-PT" : "en-GB";
  const eur = (n: number) => new Intl.NumberFormat(loc, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
  const pct = (n: number) => new Intl.NumberFormat(loc, { style: "percent", maximumFractionDigits: 0 }).format(n);
  const na = parseNum(a), nb = parseNum(b), nc = parseNum(c);
  const okA = na !== null && na <= 10;
  const okB = okA && nb !== null;
  const okC = okB && nc !== null;
  const r = calculate(na ?? 0, nb ?? 0, nc ?? 0);
  const field = (id: string, label: string, v: string, set: (s: string) => void, err: string | false) => (
    <div>
      <label htmlFor={id} className="block font-medium text-sm">{label}</label>
      <input id={id} inputMode="decimal" value={v} onChange={(e) => set(e.target.value)} aria-invalid={!!err}
        className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-base" />
      {err && <p className="mt-1 text-sm text-destructive">{err}</p>}
    </div>
  );
  const results = [
    { show: okB, label: t.calc.r[0], value: eur(r.tenMeetings), extra: okA ? `${t.calc.conv}: ${pct((na ?? 0) / 10)}` : "" },
    { show: okC, label: t.calc.r[1], value: eur(r.monthlyGoal) },
    { show: okC, label: t.calc.r[2], value: eur(r.fourMonths) },
    { show: okC, label: t.calc.r[3], value: eur(r.yearGoal) },
  ];
  return (
    <section id="calculadora" className="bg-background">
      <div className={wrap}>
        <h2 className="text-3xl md:text-4xl max-w-2xl">{t.calc.title}</h2>
        <div className="mt-10 grid lg:grid-cols-2 gap-8">
          <div className="border-t border-border pt-6 space-y-6">
            {field("c1", t.calc.q1, a, setA, a !== "" && !okA && t.calc.err1)}
            {field("c2", t.calc.q2, b, setB, okA && b !== "" && nb === null && t.calc.err)}
            {field("c3", t.calc.q3, c, setC, okB && c !== "" && nc === null && t.calc.err)}
            <button type="button" onClick={() => { setA(""); setB(""); setC(""); }} className="btn-ghost">{t.calc.reset}</button>
          </div>
          <div className="space-y-3" aria-live="polite">
            {results.map((x, i) => x.show ? (
              <div key={i} className="result-row">
                <div className="text-sm text-muted-foreground">{i + 1}. {x.label}</div>
                <div className="text-3xl font-bold mt-1">{x.value}</div>
                {x.extra && <div className="text-sm text-muted-foreground mt-1">{x.extra}</div>}
              </div>
            ) : (
              <div key={i} className="result-row text-sm text-muted-foreground">{i + 1}. {x.label}: {t.calc.fill}</div>
            ))}
            <p className="text-sm text-muted-foreground">{t.calc.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function YouTubeLite({ id, title }: { id: string; title: string }) {
  const [on, setOn] = useState(false);
  const { t } = useI18n();
  if (on) return <iframe className="w-full aspect-video" src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />;
  return (
    <button type="button" onClick={() => setOn(true)} className="relative w-full aspect-video block group" aria-label={t.cases.play}>
      <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" className="w-full h-full object-cover" />
      <span className="absolute inset-0 grid place-items-center"><span className="play-mark bg-ink text-ink-foreground"><Play size={24} /></span></span>
    </button>
  );
}

function Cases() {
  const { t } = useI18n();
  // Cartões 2 e 3: [LINK YOUTUBE] [LINK LINKEDIN] [EMPRESA] [SETOR]
  const cases = [
    { yt: CONTACT.youtubeCase, linkedin: "", company: t.cases.company, sector: t.cases.sector },
    null,
    null,
  ];
  return (
    <section id="casos" className="bg-muted">
      <div className={wrap}>
        <h2 className="text-3xl md:text-4xl max-w-2xl">{t.cases.title}</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <Reveal key={i} className="case-item overflow-hidden flex flex-col">
              {c ? <YouTubeLite id={c.yt} title={c.company} /> : <div className="aspect-video bg-ink/5 grid place-items-center text-muted-foreground text-sm">{t.cases.soon}</div>}
              <div className="py-6 flex-1 flex flex-col">
                <div className="font-semibold">{c ? c.company : t.cases.soon}</div>
                <div className="text-sm text-muted-foreground">{c ? c.sector : ""}</div>
                {c && (c.linkedin ? (
                  <a href={c.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-4 self-start"><Linkedin size={16} /> {t.cases.linkedin}</a>
                ) : (
                  <span className="mt-4 text-xs text-muted-foreground">{t.cases.linkedin}: [A PREENCHER]</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const CERTS = [
  { src: "/awards/clay-cert.png", alt: "Clay University Automated Outbound Certification" },
  { src: "/awards/plusvibe-cert.png", alt: "PlusVibe Certified Agency Partner" },
];

function Certs() {
  const { t } = useI18n();
  return (
    <section className="bg-background">
      <div className={wrap}>
        <h2 className="text-3xl md:text-4xl">{t.certs.title}</h2>
        <div className="mt-10 flex flex-wrap gap-16">
          {CERTS.map((c) => (
            <div key={c.src} className="cert-item w-[220px] sm:w-[260px] grid place-items-center">
              <img src={c.src} alt={c.alt} loading="lazy" className="w-full h-48 object-contain rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const { t } = useI18n();
  return (
    <section id="sobre" className="bg-background">
      <div className={wrap}>
        <h2 className="text-3xl md:text-4xl">{t.about.title}</h2>
        <div className="mt-10 grid lg:grid-cols-2 gap-10 items-center">
          <VideoPlaceholder label={t.about.video} />
          <div className="flex flex-col sm:flex-row gap-6">
            {/* [A PREENCHER] foto do fundador */}
            <div className="w-32 h-32 rounded-2xl bg-ink/10 grid place-items-center text-xs text-muted-foreground shrink-0 text-center p-2">{t.about.photo}</div>
            <div>
              <h3 className="text-2xl">Tiago</h3>
              <div className="text-muted-foreground">{t.about.role}</div>
              <p className="mt-4">{t.about.bio}</p>
              <p className="mt-4 font-medium">{t.about.support}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground"><Linkedin size={16} /> {t.about.linkedin}: [A PREENCHER]</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const { t } = useI18n();
  return (
    <section id="perguntas" className="bg-background">
      <div className={wrap}>
        <h2 className="text-3xl md:text-4xl">{t.faq.title}</h2>
        <div className="mt-10 max-w-3xl divide-y divide-border border-y border-border">
          {t.faq.items.map(([q, a]) => (
            <details key={q} className="group py-4">
              <summary className="cursor-pointer list-none flex justify-between gap-4 font-semibold text-lg">
                {q}<span className="text-2xl leading-none group-open:rotate-45 transition" aria-hidden>+</span>
              </summary>
              <p className="mt-3 text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const { t } = useI18n();
  return (
    <section className="final-band bg-ink text-ink-foreground">
      <div className="site-wrap text-center">
        <h2 className="text-3xl md:text-5xl">{t.final.title}</h2>
        <BookButton className="btn-outline-light mt-8" />
      </div>
    </section>
  );
}
