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
import {
  SCORED,
  P2,
  DIMENSIONS,
  computeScores,
  overallProfile,
  type Answer,
  type Scores,
} from "@/lib/quiz-config";

const CAL_URL = "https://cal.com/tiago-barbosa-wiadtc/30min";

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
      { title: "Quiz · Diagnóstico de Aquisição de Clientes — Digital Wave" },
      {
        name: "description",
        content:
          "Diagnostica em 17 perguntas se o teu sistema de aquisição de clientes B2B está afinado, com travões ou parado.",
      },
    ],
  }),
  component: QuizPage,
});

type Step = "intro" | "questions" | "about" | "loading" | "result";

// Display order: P1, P2 (multi), P3, P4..P10, [P11 if P10=C], P12..P17
function buildStepList(answers: Record<string, Answer | undefined>): { type: "scored"; id: string }[] | null {
  // returns the ordered list of *scored* questions (excluding P2, which is handled separately).
  // P11 only included if P10 === "C".
  const p10 = answers["P10"];
  const skipP11 = p10 !== "C";
  return SCORED.filter((q) => !(skipP11 && q.id === "P11")).map((q) => ({ type: "scored" as const, id: q.id }));
}

type StepItem = { kind: "scored"; id: string } | { kind: "multi"; id: "P2" };

function buildItems(answers: Record<string, Answer | undefined>): StepItem[] {
  const items: StepItem[] = [];
  const list = buildStepList(answers) ?? [];
  for (const it of list) {
    items.push({ kind: "scored", id: it.id });
    if (it.id === "P1") items.push({ kind: "multi", id: "P2" });
  }
  return items;
}

function QuizPage() {
  const [step, setStep] = useState<Step>("intro");

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<string | undefined>(undefined);

  const [answers, setAnswers] = useState<Record<string, Answer | undefined>>({});
  const [channels, setChannels] = useState<string[]>([]);
  const [qIndex, setQIndex] = useState(0);

  const [role, setRole] = useState("");
  const [revenue, setRevenue] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [pdfData, setPdfData] = useState<{ base64: string; filename: string } | null>(null);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const phoneValid = !!phone && isValidPhoneNumber(phone);
  const formValid = firstName.trim().length >= 2 && emailValid && phoneValid;

  const items = useMemo(() => buildItems(answers), [answers]);
  const currentItem = items[qIndex];
  const totalItems = items.length;

  const scores = useMemo(() => computeScores(answers), [answers]);

  function pickAnswer(qId: string, a: Answer) {
    setAnswers((prev) => {
      const next = { ...prev, [qId]: a };
      // If user revises P10 away from C, drop P11 answer
      if (qId === "P10" && a !== "C") delete next["P11"];
      return next;
    });
    setTimeout(() => goNext(), 160);
  }

  function toggleChannel(id: string) {
    setChannels((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function goNext() {
    // Recompute items based on latest answers; advance.
    const latest = buildItems({ ...answers });
    if (qIndex < latest.length - 1) setQIndex(qIndex + 1);
    else setStep("about");
  }

  function continueFromMulti() {
    if (channels.length < P2.minSelect) return;
    goNext();
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
          channels,
          answers,
          scores: {
            perTen: scores.perTenList,
            overall: scores.overall,
          },
        }),
      });
      const json = (await res.json()) as { pdfBase64?: string | null; filename?: string | null };
      if (json.pdfBase64 && json.filename) {
        setPdfData({ base64: json.pdfBase64, filename: json.filename });
      }
    } catch (e) {
      console.error("Quiz submit failed", e);
    } finally {
      setStep("result");
    }
  }


  const allScoredAnswered =
    items.filter((i) => i.kind === "scored").every((i) => !!answers[(i as { id: string }).id]) &&
    channels.length >= P2.minSelect;

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

        {step === "questions" && currentItem && (
          <div>
            <Progress
              value={((qIndex + 1) / (totalItems + 1)) * 100}
              label={`Pergunta ${qIndex + 1} de ${totalItems}`}
            />
            {currentItem.kind === "scored" ? (
              <ScoredView
                qId={currentItem.id}
                current={answers[currentItem.id]}
                onPick={(a) => pickAnswer(currentItem.id, a)}
                onPrev={qIndex > 0 ? () => setQIndex(qIndex - 1) : undefined}
              />
            ) : (
              <MultiView
                selected={channels}
                onToggle={toggleChannel}
                onContinue={continueFromMulti}
                onPrev={qIndex > 0 ? () => setQIndex(qIndex - 1) : undefined}
              />
            )}
          </div>
        )}

        {step === "about" && (
          <div>
            <Progress value={((totalItems + 1) / (totalItems + 1)) * 100} label="Quase a terminar" />
            <span className="eyebrow mt-8 inline-block">Sobre ti</span>
            <h2 className="text-2xl md:text-3xl mt-4 font-medium">
              Antes do resultado, conta-nos um pouco mais.
            </h2>

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
                disabled={!role || !revenue || !allScoredAnswered}
                className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Ver o meu diagnóstico <span aria-hidden>→</span>
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

        {step === "result" && <Result firstName={firstName} scores={scores} pdfData={pdfData} />}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}

function ScoredView({
  qId,
  current,
  onPick,
  onPrev,
}: {
  qId: string;
  current: Answer | undefined;
  onPick: (a: Answer) => void;
  onPrev?: () => void;
}) {
  const q = SCORED.find((x) => x.id === qId)!;
  return (
    <div>
      <span className="eyebrow mt-8 inline-block">{q.block}</span>
      <h2 className="text-2xl md:text-3xl mt-4 font-medium leading-snug">{q.q}</h2>
      <div className="mt-8 space-y-3">
        {(["A", "B", "C"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => onPick(k)}
            className={`w-full text-left card-surface p-5 hover:border-wave/60 transition flex gap-4 items-start ${
              current === k ? "border-wave bg-wave/10" : ""
            }`}
          >
            <span className="w-8 h-8 rounded-full bg-muted/40 grid place-items-center text-sm shrink-0">{k}</span>
            <span className="text-base leading-relaxed">{q.opts[k]}</span>
          </button>
        ))}
      </div>
      <div className="mt-8 flex justify-between text-sm text-muted-foreground">
        <button type="button" disabled={!onPrev} onClick={onPrev} className="disabled:opacity-30">
          ← Anterior
        </button>
        <span>Seleciona uma resposta para continuar</span>
      </div>
    </div>
  );
}

function MultiView({
  selected,
  onToggle,
  onContinue,
  onPrev,
}: {
  selected: string[];
  onToggle: (id: string) => void;
  onContinue: () => void;
  onPrev?: () => void;
}) {
  return (
    <div>
      <span className="eyebrow mt-8 inline-block">{P2.block}</span>
      <h2 className="text-2xl md:text-3xl mt-4 font-medium leading-snug">{P2.q}</h2>
      <p className="text-sm text-muted-foreground mt-2">Seleciona todos os que se aplicam.</p>
      <div className="mt-6 grid sm:grid-cols-2 gap-2">
        {P2.options.map((o) => {
          const on = selected.includes(o.id);
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onToggle(o.id)}
              className={`card-surface p-4 text-left flex items-center gap-3 ${on ? "border-wave bg-wave/10" : ""}`}
            >
              <span
                className={`w-5 h-5 rounded border ${on ? "bg-wave border-wave" : "border-border"} grid place-items-center text-xs`}
              >
                {on ? "✓" : ""}
              </span>
              <span>{o.label}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-8 flex items-center justify-between">
        <button type="button" disabled={!onPrev} onClick={onPrev} className="text-sm text-muted-foreground disabled:opacity-30">
          ← Anterior
        </button>
        <button
          type="button"
          disabled={selected.length === 0}
          onClick={onContinue}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continuar <span aria-hidden>→</span>
        </button>
      </div>
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
        Descobre se o teu sistema de <em>aquisição</em> está afinado, com travões ou parado.
      </h1>
      <p className="mt-6 text-muted-foreground text-lg max-w-xl">
        17 perguntas rápidas sobre como geras novos clientes hoje. No fim recebes um diagnóstico
        em 5 dimensões e enviamos-te um relatório personalizado por email.
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
          <PhoneInput international defaultCountry="PT" value={phone} onChange={setPhone} className="dw-phone" />
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
          <Link to="/politica-de-privacidade" className="underline">
            política de privacidade
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

function colorClassFor(perTen: number) {
  if (perTen >= 7) return "bg-emerald-400";
  if (perTen >= 5) return "bg-yellow-400";
  return "bg-red-400";
}

function profileColor(key: string) {
  switch (key) {
    case "afinado":
      return "text-emerald-400";
    case "travoes":
      return "text-yellow-400";
    case "tremer":
      return "text-orange-400";
    default:
      return "text-red-400";
  }
}

function Result({
  firstName,
  scores,
  pdfData,
}: {
  firstName: string;
  scores: Scores;
  pdfData: { base64: string; filename: string } | null;
}) {
  const data = DIMENSIONS.map((d, i) => ({ pillar: d.short, value: scores.perTenList[i] }));
  const profile = overallProfile(scores);
  const colorClass = profileColor(profile.key);

  function downloadPdf() {
    if (!pdfData) return;
    const bin = atob(pdfData.base64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const blob = new Blob([bytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = pdfData.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <span className="eyebrow">Resultado</span>
      <h1 className="display mt-6">
        Obrigado, <em>{firstName}</em>.
      </h1>
      <p className="mt-4 text-muted-foreground">
        O teu diagnóstico está pronto. Descarrega o PDF completo com a análise das 5 dimensões e as boas práticas a aplicar.
      </p>
      <button
        type="button"
        onClick={downloadPdf}
        disabled={!pdfData}
        className="btn-primary mt-6 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {pdfData ? "Descarregar diagnóstico (PDF)" : "A preparar PDF..."} <span aria-hidden>↓</span>
      </button>


      <div className="mt-12 grid md:grid-cols-2 gap-8 items-center card-surface p-6 md:p-10">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Saúde global</div>
          <div className={`text-7xl md:text-8xl font-light mt-2 ${colorClass}`}>{scores.overall}%</div>
          <p className={`mt-3 text-lg ${colorClass}`}>{profile.headline}</p>
          <p className="text-sm text-muted-foreground mt-1">{profile.title}</p>

          <ul className="mt-6 space-y-3 text-sm">
            {DIMENSIONS.map((d, i) => (
              <li key={d.key}>
                <div className="flex justify-between mb-1">
                  <span>{d.short}</span>
                  <span className="text-wave">{scores.perTenList[i]}/10</span>
                </div>
                <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${colorClassFor(scores.perTenList[i])}`}
                    style={{ width: `${scores.perTenList[i] * 10}%` }}
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
              <Radar dataKey="value" stroke="var(--color-wave)" fill="var(--color-wave)" fillOpacity={0.35} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-10 card-surface p-8 border-wave/40">
        <div className="text-xs uppercase tracking-[0.18em] text-wave mb-2">Diagnóstico geral</div>
        <h3 className="text-2xl font-medium">{profile.title}</h3>
        <p className="mt-3 text-muted-foreground leading-relaxed">{profile.body}</p>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-5">
        {DIMENSIONS.map((d, i) => {
          const sc = scores.perTenList[i];
          if (sc >= 7) return null; // só mostra dimensões abaixo de saudável
          const lvl = scores.perDim[d.key].level;
          const body = d.diagnoses[lvl];
          return (
            <div key={d.key} className="card-surface p-6 border-wave/40">
              <div className="text-xs uppercase tracking-[0.18em] text-wave mb-2">
                {d.short} · {sc}/10
              </div>
              <h3 className="text-xl font-medium">{d.name}</h3>
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
