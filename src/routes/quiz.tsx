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

type Question = { q: string; opts: Record<Answer, string> };
type Category = {
  key: "canal" | "icp" | "mensagem" | "pipeline" | "conversao";
  name: string;
  short: string;
  weight: number;
  questions: Question[];
  diagnoses: {
    low: string;
    mid: string;
    high: string;
  };
};

const CATEGORIES: Category[] = [
  {
    key: "canal",
    name: "Saúde do Canal de Email",
    short: "Canal",
    weight: 1.5,
    questions: [
      {
        q: "Qual é a tua taxa média de abertura de emails frios?",
        opts: {
          A: "Abaixo de 20%",
          B: "Entre 20% e 40%",
          C: "Acima de 40%",
        },
      },
      {
        q: "Com que frequência verificas a reputação do teu domínio de envio?",
        opts: {
          A: "Nunca verifiquei ou não sei como",
          B: "Verifico quando os resultados pioram",
          C: "Tenho monitorização regular (Google Postmaster ou similar)",
        },
      },
      {
        q: "Como está organizada a tua infraestrutura de envio?",
        opts: {
          A: "Envio tudo a partir de um único endereço/domínio principal",
          B: "Tenho domínios separados mas sem rotação sistemática",
          C: "Múltiplos domínios aquecidos com rotação e limites diários definidos",
        },
      },
      {
        q: "Qual é a tua taxa de bounce e spam nos últimos 30 dias?",
        opts: {
          A: "Não monitorizo ou está acima de 3%",
          B: "Entre 1% e 3%",
          C: "Abaixo de 1% e monitorizo semanalmente",
        },
      },
    ],
    diagnoses: {
      low: "Canal comprometido. Alta probabilidade de emails a cair em spam sem saberes. Precisas de auditoria técnica urgente antes de escalar volume.",
      mid: "Canal instável. Funciona mas sem garantias de consistência. Um pico de volume ou uma lista má pode colapsar os resultados.",
      high: "Canal saudável. A infraestrutura não é o teu problema principal.",
    },
  },
  {
    key: "icp",
    name: "Qualidade do ICP e Lista",
    short: "ICP & Lista",
    weight: 1.5,
    questions: [
      {
        q: "Como defines o teu cliente ideal (ICP)?",
        opts: {
          A: "Tenho uma ideia geral do sector e dimensão da empresa",
          B: "Tenho cargo, sector e dimensão definidos",
          C: "ICP detalhado com cargo, sector, dimensão, sinais de intenção e dores específicas",
        },
      },
      {
        q: "De onde vêm os contactos que prospetas?",
        opts: {
          A: "Listas compradas ou scraped sem verificação",
          B: "LinkedIn manual ou ferramentas básicas, sem validação de email",
          C: "Processo sistemático com validação de email, verificação de cargo actual e enriquecimento",
        },
      },
      {
        q: "Com que frequência actualizas e limpas as tuas listas?",
        opts: {
          A: "Raramente ou nunca — uso as mesmas listas durante meses",
          B: "Removo bounces mas não verifico se os cargos/empresas mudaram",
          C: "Processo regular de limpeza, remoção de não-respondentes e actualização de dados",
        },
      },
      {
        q: "Quando mudas de ICP ou segmento, como validas antes de escalar?",
        opts: {
          A: "Escalo directamente com volume alto",
          B: "Faço um teste pequeno mas sem critérios de decisão definidos",
          C: "Processo de teste com volume mínimo, métricas de validação e threshold de go/no-go",
        },
      },
    ],
    diagnoses: {
      low: "Lista é o teu maior problema. Podes ter o melhor copy do mundo e não vai funcionar. Volume sem qualidade destrói a reputação do canal.",
      mid: "Lista razoável mas com lacunas que criam inconsistência. Os resultados vão variar muito de campanha para campanha.",
      high: "Boa qualidade de dados. O problema está noutras áreas do funil.",
    },
  },
  {
    key: "mensagem",
    name: "Eficácia da Mensagem",
    short: "Mensagem",
    weight: 1,
    questions: [
      {
        q: "Como é a abertura dos teus emails frios?",
        opts: {
          A: "Apresento a empresa e o que fazemos logo no primeiro parágrafo",
          B: "Começo com uma dor ou problema do mercado",
          C: "Começo com algo específico sobre a pessoa ou empresa — personalização real",
        },
      },
      {
        q: "Qual é o teu CTA principal nos emails frios?",
        opts: {
          A: "“Gostaria de agendar uma reunião para apresentar os nossos serviços”",
          B: "“Tens disponibilidade para uma chamada rápida?”",
          C: "CTA com valor claro e baixo compromisso — pergunta que gera resposta ou oferta específica",
        },
      },
      {
        q: "Tens sequências de follow-up estruturadas?",
        opts: {
          A: "Envio um email e se não responder abandono",
          B: "Faço 1-2 follows mas sem sequência definida",
          C: "Sequência de 4-6 toques com ângulos diferentes, timing definido e saída programada",
        },
      },
      {
        q: "Como testas e optimizas o copy das mensagens?",
        opts: {
          A: "Uso o mesmo copy indefinidamente",
          B: "Mudo quando os resultados pioram",
          C: "Testo variáveis sistematicamente (subject, abertura, CTA) com volume estatisticamente significativo",
        },
      },
    ],
    diagnoses: {
      low: "A mensagem está a afastar potenciais clientes. O problema não é chegar à caixa de entrada — é o que acontece depois.",
      mid: "Mensagem funcional mas genérica. Converte em mercados fáceis, falha em mercados competitivos ou com decisores exigentes.",
      high: "Copy como vantagem competitiva. Se os resultados são maus, o problema está no canal ou na lista.",
    },
  },
  {
    key: "pipeline",
    name: "Previsibilidade do Pipeline",
    short: "Pipeline",
    weight: 1,
    questions: [
      {
        q: "Consegues prever com razoável precisão quantas reuniões vais ter no próximo mês?",
        opts: {
          A: "Não — os resultados variam muito e não consigo antecipar",
          B: "Tenho uma ideia aproximada mas com grande margem de erro",
          C: "Sim — tenho dados históricos para previsões com ±20% de precisão",
        },
      },
      {
        q: "Tens métricas de funil definidas e monitorizadas regularmente?",
        opts: {
          A: "Sei quantos emails envio mas não monitorizo taxas de conversão por etapa",
          B: "Monitorizei algumas métricas mas não de forma sistemática",
          C: "Dashboard com taxa de abertura, resposta, lead, reunião e cliente — actualizado semanalmente",
        },
      },
      {
        q: "Quando os resultados pioram, consegues identificar rapidamente onde está o problema no funil?",
        opts: {
          A: "Não — é difícil perceber o que está a falhar",
          B: "Consigo identificar mas demora tempo e é baseado em intuição",
          C: "Sim — as métricas mostram exactamente em que etapa a conversão quebrou",
        },
      },
      {
        q: "Os teus resultados de outreach são consistentes semana a semana?",
        opts: {
          A: "Variam muito — há semanas boas e semanas a zero sem perceber porquê",
          B: "Razoavelmente consistentes mas com picos e vales significativos",
          C: "Consistentes dentro de uma banda previsível — variações têm causa identificável",
        },
      },
    ],
    diagnoses: {
      low: "Estás a gerir por intuição. Sem dados, cada semana má é um mistério e cada semana boa é sorte. Impossível escalar.",
      mid: "Sistema parcial. Tens alguma visibilidade mas lacunas que criam pontos cegos — como o que estás a viver agora.",
      high: "Pipeline previsível. Consegues tomar decisões baseadas em dados e escalar com confiança.",
    },
  },
  {
    key: "conversao",
    name: "Conversão e Qualificação",
    short: "Conversão",
    weight: 1,
    questions: [
      {
        q: "Qual é a tua taxa de lead para reunião agendada?",
        opts: {
          A: "Abaixo de 30%",
          B: "Entre 30% e 60%",
          C: "Acima de 60%",
        },
      },
      {
        q: "As reuniões que agendam são com decisores reais?",
        opts: {
          A: "Frequentemente falo com pessoas sem poder de decisão",
          B: "Maioritariamente decisores mas com algumas excepções",
          C: "Quase sempre decisores — tenho critérios de qualificação antes da reunião",
        },
      },
      {
        q: "Qual é a tua taxa de reunião para proposta enviada?",
        opts: {
          A: "Abaixo de 30%",
          B: "Entre 30% e 60%",
          C: "Acima de 60%",
        },
      },
      {
        q: "Tens um processo de qualificação antes de agendar a reunião?",
        opts: {
          A: "Agendo com qualquer pessoa que mostre interesse",
          B: "Faço algumas perguntas básicas mas sem critérios definidos",
          C: "Critérios de qualificação claros (BANT ou similar) e recuso reuniões que não qualificam",
        },
      },
    ],
    diagnoses: {
      low: "O fundo do funil está a desperdiçar o trabalho do topo. Cada reunião custa tempo e energia — se não convertem, o problema pode ser qualificação fraca ou proposta desalinhada.",
      mid: "Conversão razoável com espaço para optimização. Pequenas melhorias no processo de qualificação têm impacto directo na receita.",
      high: "Fundo de funil eficiente. O problema de crescimento está no volume ou na consistência do topo.",
    },
  },
];

const TOTAL_Q = CATEGORIES.reduce((a, c) => a + c.questions.length, 0); // 20

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
      { name: "description", content: "Descobre a pontuação da saúde do teu sistema de aquisição de clientes em 20 perguntas, divididas em 5 categorias críticas." },
    ],
  }),
  component: QuizPage,
});

type Step = "intro" | "questions" | "about" | "loading" | "result";

type Scores = {
  raw: number[]; // per-category raw 4..12
  perTen: number[]; // per-category /10
  overall: number; // weighted 0-100
};

function computeScores(answers: (Answer | null)[]): Scores {
  const map = (a: Answer | null) => (a === "A" ? 1 : a === "B" ? 2 : a === "C" ? 3 : 0);
  const raw: number[] = [];
  const perTen: number[] = [];
  let i = 0;
  for (const cat of CATEGORIES) {
    let s = 0;
    for (let j = 0; j < cat.questions.length; j++) s += map(answers[i + j]);
    raw.push(s);
    perTen.push(Math.round((s / (cat.questions.length * 3)) * 10));
    i += cat.questions.length;
  }
  const totalWeight = CATEGORIES.reduce((a, c) => a + c.weight, 0);
  const weightedMax = totalWeight * 10;
  const weightedSum = CATEGORIES.reduce((a, c, idx) => a + perTen[idx] * c.weight, 0);
  const overall = Math.round((weightedSum / weightedMax) * 100);
  return { raw, perTen, overall };
}

function QuizPage() {
  const [step, setStep] = useState<Step>("intro");

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<string | undefined>(undefined);

  const [answers, setAnswers] = useState<(Answer | null)[]>(Array(TOTAL_Q).fill(null));
  const [qIndex, setQIndex] = useState(0);

  const [role, setRole] = useState("");
  const [revenue, setRevenue] = useState("");

  const [error, setError] = useState<string | null>(null);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const phoneValid = !!phone && isValidPhoneNumber(phone);
  const formValid = firstName.trim().length >= 2 && emailValid && phoneValid;

  // resolve current category/question from qIndex
  const { catIdx, qInCat } = useMemo(() => {
    let n = qIndex;
    for (let c = 0; c < CATEGORIES.length; c++) {
      if (n < CATEGORIES[c].questions.length) return { catIdx: c, qInCat: n };
      n -= CATEGORIES[c].questions.length;
    }
    return { catIdx: CATEGORIES.length - 1, qInCat: 0 };
  }, [qIndex]);

  const currentCat = CATEGORIES[catIdx];
  const currentQ = currentCat.questions[qInCat];

  const scores = useMemo(() => computeScores(answers), [answers]);

  function pickAnswer(a: Answer) {
    const next = [...answers];
    next[qIndex] = a;
    setAnswers(next);
    setTimeout(() => {
      if (qIndex < TOTAL_Q - 1) setQIndex(qIndex + 1);
      else setStep("about");
    }, 160);
  }

  async function submit() {
    setError(null);
    setStep("loading");
    setTimeout(() => setStep("result"), 600);
    try {
      await fetch("/api/public/quiz-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          phone,
          role,
          revenue,
          answers,
          scores: {
            perTen: scores.perTen,
            raw: scores.raw,
            overall: scores.overall,
          },
        }),
      });
    } catch (e) {
      console.error("Email send failed", e);
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
            <Progress
              value={((qIndex + 1) / (TOTAL_Q + 2)) * 100}
              label={`Questão ${qIndex + 1} de ${TOTAL_Q}`}
            />
            <span className="eyebrow mt-8 inline-block">{currentCat.name}</span>
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
            <Progress value={(21 / 22) * 100} label="Quase a terminar" />
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
        20 perguntas rápidas sobre aquisição de clientes, divididas em 5 categorias críticas:
        canal de email, ICP & lista, mensagem, previsibilidade e conversão. Recebes o teu diagnóstico
        no fim e enviamos-te uma cópia detalhada por email.
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
          Faz o Quiz <span aria-hidden>→</span>
        </button>

        <p className="text-xs text-muted-foreground">
          Ao continuar aceitas a nossa{" "}
          <Link to="/politica-de-privacidade" className="underline">política de privacidade</Link>.
        </p>
      </div>
    </div>
  );
}

function statusFromOverall(overall: number) {
  if (overall >= 80) return { title: "Sistema saudável e escalável", headline: "O teu motor de aquisição está afinado", color: "text-emerald-400" };
  if (overall >= 60) return { title: "Funciona mas com travões", headline: "Tens travões que limitam o teu crescimento", color: "text-yellow-400" };
  if (overall >= 40) return { title: "Sistema instável", headline: "O teu pipeline está a vazar — aqui está porquê", color: "text-orange-400" };
  return { title: "Sistema quebrado", headline: "Estás a investir sem retorno — o problema é estrutural", color: "text-red-400" };
}

function levelFromRaw(raw: number): "low" | "mid" | "high" {
  if (raw <= 4) return "low";
  if (raw <= 8) return "mid";
  return "high";
}

function colorClassFor(perTen: number) {
  if (perTen >= 8) return "bg-emerald-400";
  if (perTen >= 5) return "bg-yellow-400";
  return "bg-red-400";
}

function Result({
  firstName,
  email,
  scores,
}: {
  firstName: string;
  email: string;
  scores: Scores;
}) {
  const data = CATEGORIES.map((c, i) => ({ pillar: c.short, value: scores.perTen[i] }));
  const status = statusFromOverall(scores.overall);

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
          <div className={`text-7xl md:text-8xl font-light mt-2 ${status.color}`}>{scores.overall}%</div>
          <p className={`mt-3 text-lg ${status.color}`}>{status.headline}</p>
          <p className="text-sm text-muted-foreground mt-1">{status.title}</p>

          <ul className="mt-6 space-y-3 text-sm">
            {CATEGORIES.map((c, i) => (
              <li key={c.key}>
                <div className="flex justify-between mb-1">
                  <span>{c.short}</span>
                  <span className="text-wave">{scores.perTen[i]}/10</span>
                </div>
                <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${colorClassFor(scores.perTen[i])}`}
                    style={{ width: `${scores.perTen[i] * 10}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-[300px] md:h-[380px]">
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
        {CATEGORIES.map((c, i) => {
          const lvl = levelFromRaw(scores.raw[i]);
          // mostra diagnóstico explícito para abaixo de 6/10; para boas, mostra reforço
          if (scores.perTen[i] >= 6 && lvl === "high") return null;
          const body = c.diagnoses[lvl];
          return (
            <div key={c.key} className="card-surface p-6 border-wave/40">
              <div className="text-xs uppercase tracking-[0.18em] text-wave mb-2">
                {c.short} · {scores.perTen[i]}/10
              </div>
              <h3 className="text-xl font-medium">{c.name}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{body}</p>
            </div>
          );
        })}
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
