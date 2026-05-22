import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Nav } from "@/components/site/Nav";
import { Footer, CookieBanner } from "@/components/site/Footer";

const CAL_URL = "https://cal.com/tiago-barbosa-wiadtc/30min";

type Answer = "A" | "B" | "C";

const PILLARS = [
  {
    name: "Volume e Atração de Leads",
    short: "Atração",
    questions: [
      {
        q: "Qual é o volume atual de novas oportunidades de negócio (leads) que chegam à tua empresa mensalmente?",
        opts: {
          A: "Quase nenhum, ou totalmente insuficiente para as nossas metas.",
          B: "Entram algumas leads, mas o volume flutua muito de mês para mês.",
          C: "Temos um volume alto e constante de novas leads todas as semanas.",
        },
      },
      {
        q: "Quando precisas de colocar novas reuniões de vendas na agenda, qual é o teu nível de esforço?",
        opts: {
          A: "É um processo doloroso, demorado e muitas vezes falhamos o objetivo.",
          B: "Conseguimos preencher a agenda, mas exige muito esforço manual ou ads caros.",
          C: "É quase automático, temos reuniões agendadas com consistência sem esforço absurdo.",
        },
      },
    ],
  },
  {
    name: "Previsibilidade e Canais",
    short: "Previsibilidade",
    questions: [
      {
        q: "Se fechares as redes sociais ou paragens nos ads hoje, o que acontece à tua aquisição de clientes?",
        opts: {
          A: "A empresa para de faturar imediatamente. Dependemos a 100% disso.",
          B: "O fluxo diminui drasticamente, mas ainda temos referências ou clientes antigos.",
          C: "Continuamos a faturar, temos canais próprios de outbound (email e prospecção ativa).",
        },
      },
      {
        q: "Consegues prever com precisão quantos novos clientes vais fechar no próximo mês?",
        opts: {
          A: "Não, vivemos num sistema de \u201Cmarketing de esperança\u201D.",
          B: "Tenho uma vaga ideia baseada no histórico, mas é sempre uma surpresa.",
          C: "Sim, conheço as métricas de conversão dos meus canais de aquisição.",
        },
      },
    ],
  },
  {
    name: "Qualidade e Conversão",
    short: "Conversão",
    questions: [
      {
        q: "Como avalias o perfil e poder de compra das leads que chegam à tua equipa de vendas?",
        opts: {
          A: "Chegam muitas leads sem orçamento, curiosos ou empresas fora do alvo.",
          B: "Perfil misto. Perdemos muito tempo a filtrar quem tem interesse e dinheiro.",
          C: "A maioria são decisores de empresas com o perfil exato e orçamento para comprar.",
        },
      },
      {
        q: "Qual é o principal motivo das tuas propostas serem rejeitadas ou ficarem \u201Ccongeladas\u201D?",
        opts: {
          A: "\u201CPreço demasiado alto\u201D ou falta de urgência do cliente.",
          B: "O cliente diz que vai analisar, mas a decisão arrasta-se por meses.",
          C: "Objeções raras, a lead chega à reunião educada sobre o nosso valor.",
        },
      },
    ],
  },
  {
    name: "Retenção e Nutrição",
    short: "Retenção",
    questions: [
      {
        q: "O que acontece às leads que dizem \u201Cagora não\u201D ou não compram de imediato?",
        opts: {
          A: "Ficam esquecidas na base de dados, ninguém volta a falar com elas.",
          B: "A equipa de vendas liga umas semanas mais tarde, mas de forma desorganizada.",
          C: "Entram numa sequência automática de email marketing que gera vendas mais tarde.",
        },
      },
      {
        q: "Com que frequência comunicas com a tua base de clientes e ex-clientes para vender (upsell/cross-sell)?",
        opts: {
          A: "Nunca, ou só quando precisamos desesperadamente de dinheiro.",
          B: "Newsletter esporádica, sem estratégia de vendas agressiva.",
          C: "Campanhas regulares de email que geram compras de clientes antigos de forma previsível.",
        },
      },
    ],
  },
] as const;

const ROLES = ["CEO", "COO", "Founder", "HR Manager", "Head of Sales", "Head of Marketing", "Outro"];
const REVENUES = [
  "Menos de €100K",
  "€100K – €500K",
  "€500K – €1M",
  "€1M – €2.5M",
  "€2.5M – €5M",
  "€5M – €10M",
  "€10M – €25M",
  "€25M+",
];

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Quiz · Saúde da tua aquisição de clientes — Digital Wave" },
      { name: "description", content: "Descobre a pontuação da saúde do teu sistema de aquisição de clientes em 8 perguntas." },
    ],
  }),
  component: QuizPage,
});

type Step = "intro" | "questions" | "about" | "loading" | "result";

function QuizPage() {
  const [step, setStep] = useState<Step>("intro");

  // Lead form
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<string | undefined>(undefined);

  // Questions
  const [answers, setAnswers] = useState<(Answer | null)[]>(Array(8).fill(null));
  const [qIndex, setQIndex] = useState(0);

  // About
  const [role, setRole] = useState("");
  const [revenue, setRevenue] = useState("");

  const [error, setError] = useState<string | null>(null);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const phoneValid = !!phone && isValidPhoneNumber(phone);
  const formValid = firstName.trim().length >= 2 && emailValid && phoneValid;

  const totalQ = PILLARS.reduce((a, p) => a + p.questions.length, 0);
  const currentPillarIdx = qIndex < 2 ? 0 : qIndex < 4 ? 1 : qIndex < 6 ? 2 : 3;
  const currentPillar = PILLARS[currentPillarIdx];
  const currentQ = qIndex < 8 ? PILLARS[currentPillarIdx].questions[qIndex - currentPillarIdx * 2] : null;

  const scores = useMemo(() => {
    const map = (a: Answer | null) => (a === "A" ? 1 : a === "B" ? 2 : a === "C" ? 3 : 0);
    const pillar = (i: number) => Math.round(((map(answers[i * 2]) + map(answers[i * 2 + 1])) / 6) * 10);
    const p1 = pillar(0);
    const p2 = pillar(1);
    const p3 = pillar(2);
    const p4 = pillar(3);
    const overall = Math.round(((p1 + p2 + p3 + p4) / 40) * 100);
    return { p1, p2, p3, p4, overall };
  }, [answers]);

  function pickAnswer(a: Answer) {
    const next = [...answers];
    next[qIndex] = a;
    setAnswers(next);
    setTimeout(() => {
      if (qIndex < 7) setQIndex(qIndex + 1);
      else setStep("about");
    }, 180);
  }

  async function submit() {
    setError(null);
    setStep("loading");
    try {
      const res = await fetch("/api/public/quiz-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          phone,
          role,
          revenue,
          answers,
          scores,
        }),
      });
      if (!res.ok) throw new Error("send-failed");
      setStep("result");
    } catch {
      setError("Não foi possível enviar agora. Tenta novamente em alguns segundos.");
      setStep("about");
    }
  }

  return (
    <div className="dark min-h-screen">
      <Nav />
      <main className="px-6 max-w-3xl mx-auto pt-32 pb-24">
        {step === "intro" && (
          <IntroForm
            firstName={firstName}
            setFirstName={setFirstName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            emailValid={emailValid}
            phoneValid={phoneValid}
            formValid={formValid}
            onStart={() => setStep("questions")}
          />
        )}

        {step === "questions" && currentQ && (
          <div>
            <Progress value={((qIndex + 1) / (totalQ + 2)) * 100} label={`Questão ${qIndex + 1} de ${totalQ + 2}`} />
            <span className="eyebrow mt-8 inline-block">{currentPillar.name}</span>
            <h2 className="text-2xl md:text-3xl mt-4 font-medium leading-snug">{currentQ.q}</h2>
            <div className="mt-8 space-y-3">
              {(["A", "B", "C"] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => pickAnswer(k)}
                  className={`w-full text-left card-surface p-5 hover:border-wave/60 transition flex gap-4 items-start ${
                    answers[qIndex] === k ? "border-wave bg-wave/10" : ""
                  }`}
                >
                  <span className="w-8 h-8 rounded-full bg-muted/40 grid place-items-center text-sm shrink-0">{k}</span>
                  <span className="text-base leading-relaxed">{currentQ.opts[k]}</span>
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-between text-sm text-muted-foreground">
              <button
                type="button"
                disabled={qIndex === 0}
                onClick={() => setQIndex(qIndex - 1)}
                className="disabled:opacity-30"
              >
                ← Anterior
              </button>
              <span>Seleciona uma resposta para continuar</span>
            </div>
          </div>
        )}

        {step === "about" && (
          <div>
            <Progress value={(9 / 10) * 100} label="Quase a terminar" />
            <span className="eyebrow mt-8 inline-block">Sobre ti</span>
            <h2 className="text-2xl md:text-3xl mt-4 font-medium">Antes do resultado, conta-nos um pouco mais.</h2>

            <div className="mt-8 space-y-6">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Qual o teu cargo profissional?</label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {ROLES.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`card-surface p-4 text-left ${role === r ? "border-wave bg-wave/10" : ""}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Faturação anual aproximada</label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {REVENUES.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRevenue(r)}
                      className={`card-surface p-4 text-left ${revenue === r ? "border-wave bg-wave/10" : ""}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <button
                type="button"
                onClick={submit}
                disabled={!role || !revenue}
                className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Ver a minha pontuação <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        )}

        {step === "loading" && (
          <div className="text-center py-32">
            <div className="num-display text-wave animate-pulse">A calcular...</div>
            <p className="text-muted-foreground mt-4">A preparar o teu diagnóstico.</p>
          </div>
        )}

        {step === "result" && <Result firstName={firstName} email={email} scores={scores} />}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}

function Progress({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
        <span>{label}</span>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden">
        <div className="h-full bg-wave transition-all" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function IntroForm({
  firstName,
  setFirstName,
  email,
  setEmail,
  phone,
  setPhone,
  emailValid,
  phoneValid,
  formValid,
  onStart,
}: {
  firstName: string;
  setFirstName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string | undefined;
  setPhone: (v: string | undefined) => void;
  emailValid: boolean;
  phoneValid: boolean;
  formValid: boolean;
  onStart: () => void;
}) {
  return (
    <div>
      <span className="eyebrow">Quiz · Diagnóstico</span>
      <h1 className="display mt-6">
        Descobre a <em>pontuação</em> da saúde da tua empresa.
      </h1>
      <p className="mt-6 text-muted-foreground text-lg max-w-xl">
        8 perguntas rápidas sobre aquisição de clientes, divididas em 4 pilares críticos. Recebes
        o teu diagnóstico no fim e enviamos-te uma cópia por email.
      </p>

      <div className="mt-12 card-surface p-6 md:p-8 space-y-5 max-w-xl">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Primeiro nome *</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            maxLength={80}
            placeholder="Ex: Tiago"
            className="w-full bg-muted/30 border border-border rounded-md px-4 py-3 outline-none focus:border-wave"
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Email *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={255}
            placeholder="o-teu@email.com"
            className={`w-full bg-muted/30 border rounded-md px-4 py-3 outline-none focus:border-wave ${
              email && !emailValid ? "border-red-500/60" : "border-border"
            }`}
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Número de telefone *</label>
          <PhoneInput
            international
            defaultCountry="PT"
            value={phone}
            onChange={setPhone}
            className="dw-phone"
          />
          {phone && !phoneValid && (
            <p className="text-xs text-red-400 mt-2">Número inválido para o país selecionado.</p>
          )}
        </div>

        <button
          type="button"
          onClick={onStart}
          disabled={!formValid}
          className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Começar o Quiz <span aria-hidden>→</span>
        </button>

        <p className="text-xs text-muted-foreground">
          Ao continuar aceitas a nossa{" "}
          <Link to="/politica-de-privacidade" className="underline">política de privacidade</Link>.
        </p>
      </div>
    </div>
  );
}

function Result({ firstName, email, scores }: { firstName: string; email: string; scores: { p1: number; p2: number; p3: number; p4: number; overall: number } }) {
  const data = [
    { pillar: "Atração", value: scores.p1 },
    { pillar: "Previsibilidade", value: scores.p2 },
    { pillar: "Conversão", value: scores.p3 },
    { pillar: "Retenção", value: scores.p4 },
  ];

  const lowFunnel = scores.p1 + scores.p2 <= 10;
  const lowConv = scores.p3 + scores.p4 <= 10;

  const diagnoses: { title: string; body: string }[] = [];
  if (lowFunnel)
    diagnoses.push({
      title: "Travão na Previsibilidade",
      body:
        "O teu negócio está em risco porque depende de fatores externos (referências, anúncios, redes sociais). Precisas de um sistema de Email Marketing outbound para gerar volume e controlo previsível do pipeline.",
    });
  if (lowConv)
    diagnoses.push({
      title: "Travão na Conversão e Nutrição",
      body:
        "Estás a deitar dinheiro ao lixo. Ou tens leads que não valem dinheiro, ou estás a deixá-las morrer por falta de sequências automatizadas de Email Marketing que convertem ao longo do tempo.",
    });
  if (diagnoses.length === 0)
    diagnoses.push({
      title: "Operação Saudável",
      body:
        "A base está sólida. O próximo passo é escalar volume e mercados — multiplicar o que já funciona com uma operação dedicada de Email Marketing B2B.",
    });

  const color =
    scores.overall >= 80 ? "text-emerald-400" : scores.overall >= 45 ? "text-yellow-400" : "text-red-400";

  return (
    <div>
      <span className="eyebrow">Resultado</span>
      <h1 className="display mt-6">
        Obrigado, <em>{firstName}</em>.
      </h1>
      <p className="mt-4 text-muted-foreground">
        Enviámos uma cópia detalhada para <span className="text-wave">{email}</span> e para a nossa equipa.
      </p>

      <div className="mt-12 grid md:grid-cols-2 gap-8 items-center card-surface p-6 md:p-10">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Saúde global</div>
          <div className={`text-7xl md:text-8xl font-light mt-2 ${color}`}>{scores.overall}%</div>
          <p className="text-sm text-muted-foreground mt-2">
            Acima de 80% é saudável · 45% a 80% razoável · abaixo de 45% é grave.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            {data.map((d) => (
              <li key={d.pillar} className="flex justify-between border-b border-border py-2">
                <span>{d.pillar}</span>
                <span className="text-wave">{d.value}/10</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-[300px] md:h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} outerRadius="75%">
              <PolarGrid stroke="hsl(0 0% 30%)" />
              <PolarAngleAxis dataKey="pillar" tick={{ fill: "#e5e5e5", fontSize: 12 }} />
              <PolarRadiusAxis domain={[0, 10]} tick={false} axisLine={false} />
              <Radar
                dataKey="value"
                stroke="var(--color-wave)"
                fill="var(--color-wave)"
                fillOpacity={0.35}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-5">
        {diagnoses.map((d) => (
          <div key={d.title} className="card-surface p-6 border-wave/40">
            <div className="text-xs uppercase tracking-[0.18em] text-wave mb-2">Diagnóstico</div>
            <h3 className="text-xl font-medium">{d.title}</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">{d.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 card-surface p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl">Queres discutir o teu diagnóstico em 30 min?</h2>
        <p className="mt-3 text-muted-foreground">Sem pitch decks. Mostramos o que faria sentido para o teu caso.</p>
        <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 inline-flex">
          Agendar uma reunião <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
