import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Linkedin, Play, Download, ArrowRight, Check } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer, CookieBanner } from "@/components/site/Footer";
import { BookButton } from "@/components/site/Booking";
import { useI18n } from "@/lib/i18n";
import { CONTACT, dict } from "@/lib/content";
import { calculate, formatEuro, formatContribution, parseNum } from "@/lib/calculator";

import { Button } from "@/components/ui/button";
import { caseStudy } from "@/lib/case-study";
import { certifications, clientLogos, guideTopics, outreachStats } from "@/lib/site-presentation";

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
        <Certs />
        <ClientBand />
        <Stats />
        <Problem />
        <WhatWeDo />
        <Process />
        <Guide />
        <Calculator />
        <Cases />
        <About />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}

const wrap = "site-wrap";

function Hero() {
  const { t } = useI18n();
  return (
    <section className="hero-band bg-ink text-ink-foreground">
      <div className={wrap}>
        <h1 className="hero-title">{t.hero.h1}</h1>
        <p className="mt-6 text-lg text-ink-foreground/80 hero-subtitle">{t.hero.sub}</p>
        <div className="hero-actions mt-8 flex flex-col sm:flex-row gap-3">
          <BookButton className="btn-primary" />
          <Button asChild variant="ghost" className="btn-outline-light"><a href="#casos">{t.hero.results}</a></Button>
        </div>
      </div>
    </section>
  );
}

function ClientBand() {
  const { t } = useI18n();
  if (clientLogos.length === 0) return null;
  return <section className="bg-background"><div className={wrap}>
    <h2>{t.clientsTitle}</h2>
    <div className="mt-8 flex flex-wrap justify-center gap-10">
      {clientLogos.map((logo) => <img key={logo.src} src={logo.src} alt={logo.name} className="h-16 w-40 object-contain" loading="lazy" />)}
    </div>
  </div></section>;
}

function Count({ to, prefix = "+", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    let frame = 0;
    setValue(0);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        if (motion.matches) { setValue(to); return; }
        const progress = Math.min(1, (now - start) / 800);
        setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.25 });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [to]);
  return <span ref={ref}>{prefix}{value}{suffix}</span>;
}

function Stats() {
  const { t, lang } = useI18n();
  return (
    <section className="stat-strip bg-primary text-primary-foreground">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-14">
        <h2>{t.statsTitle}</h2>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-y-8">
          {outreachStats.map((stat, i) => (
            <div key={stat.value} className="stat-item">
              <div className="stat-number"><Count to={stat.value} />{stat.unit[lang] && <span className="stat-unit"> {stat.unit[lang]}</span>}</div>
              <h3 className="stat-label">{t.stats[i]}</h3>
              <p className="stat-description">{t.statsDescriptions[i]}</p>
            </div>
          ))}
        </div>
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

function WhatWeDo() {
  const { t } = useI18n();
  return (
    <section id="o-que-fazemos" className="bg-background">
      <div className={`${wrap} grid lg:grid-cols-12 gap-10 lg:gap-16`}>
        <div className="lg:col-span-5">
          <h2>{t.what.title}</h2>
          <p className="mt-6 text-muted-foreground">{t.what.sub}</p>
        </div>
        <div className="lg:col-span-7">
          <ul className="divide-y divide-border border-y border-border">
            {t.what.items.map(([title, description]) => (
              <li key={title} className="py-6">
                <h3>{title}</h3>
                <p className="mt-2 text-muted-foreground">{description}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-bold">{t.what.closing}</p>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const { t } = useI18n();
  return (
    <section className="bg-background">
      <div className={wrap}>
        <h2 className="max-w-2xl">{t.problem.title}</h2>
        <div className="comparison-grid mt-10">
          <h3 className="comparison-heading">{t.problem.before}</h3>
          <h3 className="comparison-heading comparison-after">{t.problem.after}</h3>
          {t.problem.pairs.map(([before, after]) => (
            <div key={before} className="comparison-pair">
              <p className="comparison-before"><span className="sr-only">{t.problem.before}: </span>{before}</p>
              <p className="comparison-result"><Check size={20} aria-hidden="true" /><span><span className="sr-only">{t.problem.after}: </span>{after}</span></p>
            </div>
          ))}
        </div>
        <p className="mt-8 font-medium">{t.problem.transition}</p>
      </div>
    </section>
  );
}

function Process() {
  const { t } = useI18n();
  return (
    <section id="processo" className="bg-muted">
      <div className={wrap}>
        <h2>{t.process.title}</h2>
        <ol className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {t.process.steps.map(([title], i) => (
            <li key={title} className="process-card">
              <div className="step-number">0{i + 1}</div>
              <h3 className="mt-5">{title}</h3>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground list-disc pl-4">
                {t.process.points[i]?.map((point) => <li key={point}>{point}</li>)}
              </ul>
              {i === 2 && <ol className="execution-flow mt-8" aria-label={title}>
                {t.process.flow.map((node, index) => <li key={node}>
                  <span className="flow-node">{node}</span>{index < 3 && <ArrowRight size={14} aria-hidden="true" />}
                </li>)}
              </ol>}
            </li>
          ))}
        </ol>
        <BookButton className="btn-primary mt-10" />
      </div>
    </section>
  );
}

function Guide() {
  const { t, lang } = useI18n();
  const track = () => {
    // Evento de analytics (apenas contagem, sem dados pessoais)
    const w = window as unknown as { gtag?: (...a: unknown[]) => void; plausible?: (e: string) => void };
    w.gtag?.("event", "guide_download");
    w.plausible?.("guide_download");
  };
  return (
    <section id="guia" className="bg-background text-foreground">
      <div className={wrap}>
        <h2 className="max-w-3xl">{t.guide.title}</h2>
        <p className="mt-5 text-muted-foreground text-lg">{t.guide.sub}</p>
        {guideTopics.length > 0 && <ol className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {guideTopics.slice(0, 3).map((topic, i) => <li key={topic.title[lang]} className="editorial-step">
            <div className="step-number">0{i + 1}</div>
            <h3 className="mt-5">{topic.title[lang]}</h3>
            <p className="mt-3 text-muted-foreground">{topic.description[lang]}</p>
          </li>)}
        </ol>}
        <Button asChild variant="ghost" className="btn-primary mt-8">
          <a href="/guia-campanha-email-linkedin.pdf" download onClick={track}><Download size={18} />{t.guide.cta}</a>
        </Button>
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
  const eur = (n: number) => formatEuro(n, loc);
  const pct = (n: number) => new Intl.NumberFormat(loc, { style: "percent", maximumFractionDigits: 0 }).format(n);
  const na = parseNum(a), nb = parseNum(b), nc = parseNum(c);
  const okA = na !== null && na <= 10;
  const okB = okA && nb !== null;
  const okC = okB && nc !== null && nc > 0;
  const r = calculate(na ?? 0, nb ?? 0, nc ?? 0);
  const contribution = okC ? r.contribution : null;
  const contributionText = contribution === null ? "" : formatContribution(contribution, loc);
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
            {field("c3", t.calc.q3, c, setC, okB && (nc === null || nc <= 0) && t.calc.errGoal)}
            <Button type="button" variant="ghost" onClick={() => { setA(""); setB(""); setC(""); }} className="btn-ghost">{t.calc.reset}</Button>
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
            <div className="result-row">
              <div className="text-sm text-muted-foreground">5. {t.calc.contribution}</div>
              {contribution !== null ? <>
                <div className="contribution-value font-bold mt-2">{t.calc.contributionResult.replace("{value}", contributionText)}</div>
                <p className="mt-3 text-sm text-muted-foreground">{t.calc.contributionSupport}</p>
                <progress className="contribution-track mt-4" value={contribution} max={100} aria-label={t.calc.contribution} />
              </> : <p className="mt-2 text-sm text-muted-foreground">{!okC ? t.calc.errGoal : t.calc.errValue}</p>}
            </div>
            <p className="text-sm text-muted-foreground">{t.calc.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function YouTubeLite({ id, title }: { id: string; title: string }) {
  const [on, setOn] = useState(false);
  const [fallback, setFallback] = useState(false);
  const { t } = useI18n();
  if (on) return <iframe className="w-full aspect-video" src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />;
  return (
    <Button variant="ghost" type="button" onClick={() => setOn(true)} className="case-video relative w-full aspect-video block overflow-hidden p-0 h-auto" aria-label={t.cases.play}>
      <img src={`https://i.ytimg.com/vi/${id}/${fallback ? "hqdefault" : "maxresdefault"}.jpg`} alt="" loading="lazy"
        onError={() => setFallback(true)} onLoad={(event) => { if (!fallback && event.currentTarget.naturalWidth < 480) setFallback(true); }}
        className={`case-thumbnail ${fallback ? "case-thumbnail-fallback" : ""}`} />
      <span className="absolute inset-0 grid place-items-center"><span className="play-mark"><Play size={24} /></span></span>
    </Button>
  );
}

function Cases() {
  const { t, lang } = useI18n();
  return (
    <section id="casos" className="bg-muted">
      <div className={`${wrap} grid lg:grid-cols-2 gap-10 lg:gap-16 items-center`}>
        <div className="min-w-0"><YouTubeLite id={caseStudy.youtubeId} title={caseStudy.company || t.cases.title} /></div>
        <div>
          <h2>{t.cases.title}</h2>
          {caseStudy.company && <h3 className="mt-6">{caseStudy.company}</h3>}
          {caseStudy.sector[lang] && <p className="mt-2 text-muted-foreground">{caseStudy.sector[lang]}</p>}
          {caseStudy.paragraph[lang] && <p className="mt-5">{caseStudy.paragraph[lang]}</p>}
          {caseStudy.metrics.length > 0 && <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
            {caseStudy.metrics.slice(0, 3).map((metric) => <div key={metric.label[lang]}><dt className="text-sm text-muted-foreground">{metric.label[lang]}</dt><dd className="text-3xl font-bold mt-2">{metric.value}</dd></div>)}
          </dl>}
          {caseStudy.linkedin && <Button asChild variant="ghost" className="btn-ghost mt-4"><a href={caseStudy.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={16} />{t.cases.linkedin}</a></Button>}
        </div>
      </div>
    </section>
  );
}

function Certs() {
  const { t } = useI18n();
  return (
    <section className="certification-band bg-background">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-10">
        <h2>{t.certs.title}</h2>
        <div className="certification-row mt-6">
          {certifications.map((cert) => <img key={cert.src} src={cert.src} alt={cert.alt} loading="lazy" />)}
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
              {!t.about.bio.startsWith("[") && <p className="mt-4">{t.about.bio}</p>}
              <p className="mt-4 font-medium">{t.about.support}</p>
              {CONTACT.linkedinFounder && <a href={CONTACT.linkedinFounder} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground"><Linkedin size={16} /> {t.about.linkedin}</a>}
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
          {t.faq.items.filter(([, a]) => !a.startsWith("[")).map(([q, a]) => (
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
        <p className="mt-5 mx-auto text-ink-foreground/80">{t.final.sub}</p>
        <BookButton className="btn-primary mt-8" />
      </div>
    </section>
  );
}
