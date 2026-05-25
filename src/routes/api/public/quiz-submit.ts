import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const PAYLOAD = z.object({
  firstName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(5).max(30),
  role: z.string().trim().min(1).max(80),
  revenue: z.string().trim().min(1).max(40),
  answers: z.array(z.enum(["A", "B", "C"])).length(8),
  scores: z.object({
    p1: z.number().min(0).max(10),
    p2: z.number().min(0).max(10),
    p3: z.number().min(0).max(10),
    p4: z.number().min(0).max(10),
    overall: z.number().min(0).max(100),
  }),
});

type Payload = z.infer<typeof PAYLOAD>;

const PILLARS = [
  {
    name: "Atração & Volume de Leads",
    intro:
      "Sem volume previsível de leads B2B, o pipeline depende de sorte. Cold Email Marketing bem operado é o canal mais escalável para abrir conversas com decisores fora da tua rede.",
    practices: [
      {
        title: "Listas segmentadas por ICP",
        body:
          "Constrói listas a partir de filtros firmográficos (sector, tamanho, geografia) e do cargo do decisor. Cada lista deve representar 1 ICP claro, com no mínimo 500 contactos verificados.",
      },
      {
        title: "Infraestrutura de envio dedicada",
        body:
          "Domínios secundários, SPF/DKIM/DMARC, warm-up de 3-4 semanas e rotação de inboxes. Sem isto o teu cold email cai em spam e queimas o domínio principal.",
      },
      {
        title: "Volume controlado e consistente",
        body:
          "30 a 50 envios por inbox por dia. Mais inboxes = mais volume, sem perder deliverability. Meta saudável: 3.000 a 6.000 emails personalizados por semana por campanha.",
      },
    ],
  },
  {
    name: "Previsibilidade & Canais",
    intro:
      "Previsibilidade vive em métricas: open rate, reply rate, positive reply, meetings booked. Quando conheces o teu CAC por reunião, escalar é uma decisão, não uma esperança.",
    practices: [
      {
        title: "Email Marketing outbound como canal primário",
        body:
          "Independente de ads e algoritmos. Custo marginal por reunião baixo, dependente apenas da qualidade da copy + lista + infraestrutura.",
      },
      {
        title: "Métricas mínimas por campanha",
        body:
          "Open rate > 50%, Reply rate > 5%, Positive reply > 1%. Abaixo disto o problema é copy, lista ou deliverability — e dá para diagnosticar em 2 semanas.",
      },
      {
        title: "Pipeline 90 dias à frente",
        body:
          "Reuniões agendadas hoje fecham daqui a 30-90 dias. Operar Email Marketing semanalmente garante que daqui a 3 meses ainda tens pipeline.",
      },
    ],
  },
  {
    name: "Qualidade & Conversão",
    intro:
      "Reunião sem qualificação é tempo perdido. A copy do cold email filtra: quem responde já está minimamente interessado e dentro do ICP. Quanto melhor a copy, melhor o show-rate.",
    practices: [
      {
        title: "Copy hiper-específica ao ICP",
        body:
          "Linhas de assunto curtas (3-5 palavras). Primeira frase com referência concreta ao prospect (cargo, empresa, sector). Promessa única e mensurável. Nada de templates genéricos.",
      },
      {
        title: "Qualificação no agendamento",
        body:
          "Formulário no link de Cal/Calendly com 2-3 perguntas: empresa, número de funcionários, problema atual. Filtra curiosos antes da chamada.",
      },
      {
        title: "Follow-up de 4 a 7 toques",
        body:
          "80% das respostas chegam depois do 3.º email. Sequências automatizadas com cadência semanal mantêm a operação a converter sem esforço manual.",
      },
    ],
  },
  {
    name: "Retenção & Nutrição",
    intro:
      "Leads que dizem 'agora não' valem ouro a 6 meses. Sem nutrição via Email Marketing, esse pipeline morre e tens de pagar para o reconquistar. Newsletter + sequências automáticas resolvem isto.",
    practices: [
      {
        title: "Sequência de nutrição pós-no-show / pós-rejeição",
        body:
          "8-12 emails ao longo de 90 dias com casos, insights e provas. Reabre 10-20% das oportunidades sem trabalho comercial extra.",
      },
      {
        title: "Newsletter B2B semanal ou quinzenal",
        body:
          "1 insight prático por edição, sem vender. Mantém o teu nome em cima da mesa para quando o prospect tiver budget aprovado.",
      },
      {
        title: "Reativação de clientes antigos",
        body:
          "Campanhas dedicadas para ex-clientes com nova oferta. ROI mais alto da operação porque já confiam na entrega — basta lembrar.",
      },
    ],
  },
];

const ORANGE = rgb(1, 0.4, 0.15);
const BLACK = rgb(0.06, 0.06, 0.06);
const GREY = rgb(0.45, 0.45, 0.45);
const LIGHT = rgb(0.92, 0.92, 0.92);
const WHITE = rgb(1, 1, 1);

function diagnose(s: Payload["scores"]) {
  const tags: { title: string; body: string }[] = [];
  if (s.p1 + s.p2 <= 10)
    tags.push({
      title: "Travão na Previsibilidade",
      body:
        "O teu negócio depende de fatores externos (referências, anúncios, redes sociais). Precisas de um sistema de Email Marketing outbound para gerar volume e previsibilidade no pipeline.",
    });
  if (s.p3 + s.p4 <= 10)
    tags.push({
      title: "Travão na Conversão & Nutrição",
      body:
        "Tens leads mas não as que valem dinheiro, ou estás a deixá-las morrer por falta de sequências automatizadas de Email Marketing que convertem ao longo do tempo.",
    });
  if (tags.length === 0)
    tags.push({
      title: "Operação Saudável",
      body:
        "A base está sólida. O próximo passo é escalar volume e mercados — multiplicar o que já funciona com uma operação dedicada de Email Marketing B2B.",
    });
  return tags;
}

function wrap(text: string, max: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > max) {
      if (cur) lines.push(cur);
      cur = w;
    } else {
      cur = (cur + " " + w).trim();
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

async function buildPdf(d: Payload): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const helv = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const W = 595;
  const H = 842;
  const M = 56;

  // ---------- COVER ----------
  let page = pdf.addPage([W, H]);
  page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: BLACK });
  page.drawRectangle({ x: 0, y: H - 8, width: W, height: 8, color: ORANGE });

  page.drawText("DIGITAL WAVE", {
    x: M, y: H - 70, size: 12, font: bold, color: ORANGE,
    // @ts-ignore
    characterSpacing: 3,
  });
  page.drawText("RELATÓRIO DE SAÚDE · EMAIL MARKETING B2B", {
    x: M, y: H - 90, size: 9, font: helv, color: GREY,
    // @ts-ignore
    characterSpacing: 2,
  });

  page.drawText("Diagnóstico", { x: M, y: H - 260, size: 56, font: bold, color: WHITE });
  page.drawText("Saúde da tua aquisição", { x: M, y: H - 320, size: 28, font: helv, color: WHITE });
  page.drawText("de clientes B2B", { x: M, y: H - 352, size: 28, font: helv, color: WHITE });

  page.drawRectangle({ x: M, y: 200, width: 60, height: 2, color: ORANGE });
  page.drawText("Preparado para", { x: M, y: 170, size: 10, font: helv, color: GREY });
  page.drawText(d.firstName.toUpperCase(), { x: M, y: 145, size: 22, font: bold, color: WHITE });
  page.drawText(`${d.role} · ${d.revenue}`, { x: M, y: 122, size: 10, font: helv, color: GREY });

  page.drawText("Produzido por Digital Wave · hello@tiagodigitalwave.eu", {
    x: M, y: 50, size: 9, font: helv, color: GREY,
  });

  // ---------- SUMMARY ----------
  page = pdf.addPage([W, H]);
  page.drawRectangle({ x: 0, y: H - 4, width: W, height: 4, color: ORANGE });
  page.drawText("DIGITAL WAVE · RESUMO EXECUTIVO", {
    x: M, y: H - 50, size: 9, font: bold, color: ORANGE,
    // @ts-ignore
    characterSpacing: 2,
  });

  page.drawText(`Olá, ${d.firstName}.`, { x: M, y: H - 110, size: 26, font: bold, color: BLACK });
  page.drawText("Aqui está o retrato da tua operação de aquisição.", {
    x: M, y: H - 138, size: 13, font: helv, color: GREY,
  });

  const intro =
    "Analisámos as tuas respostas em 4 pilares críticos da aquisição B2B via Email Marketing e atribuímos uma pontuação de 0 a 10 a cada um. Nas páginas seguintes encontras a análise detalhada e as boas práticas que aplicamos a cada operação Digital Wave.";
  let y = H - 175;
  for (const ln of wrap(intro, 78)) {
    page.drawText(ln, { x: M, y, size: 11, font: helv, color: BLACK });
    y -= 16;
  }

  // big score
  y -= 30;
  page.drawText(`${d.scores.overall}%`, { x: M, y: y - 70, size: 96, font: bold, color: ORANGE });
  page.drawText("SAÚDE GERAL", { x: M, y: y - 95, size: 10, font: bold, color: GREY,
    // @ts-ignore
    characterSpacing: 2,
  });

  const status =
    d.scores.overall >= 80 ? "Operação saudável" :
    d.scores.overall >= 45 ? "Travões a corrigir" : "Operação em risco";
  page.drawText(status, { x: M + 180, y: y - 50, size: 16, font: bold, color: BLACK });
  const statusBody =
    d.scores.overall >= 80
      ? "A base está sólida. Próximo passo: escalar volume e mercados."
      : d.scores.overall >= 45
      ? "Existem travões que limitam o crescimento. Foca nos pilares abaixo de 7/10."
      : "O pipeline está em risco. Precisas de um sistema previsível de Email Marketing B2B.";
  let sy = y - 75;
  for (const ln of wrap(statusBody, 50)) {
    page.drawText(ln, { x: M + 180, y: sy, size: 10, font: helv, color: GREY });
    sy -= 14;
  }

  // pillars table
  y = y - 160;
  page.drawText("OS 4 PILARES", { x: M, y, size: 10, font: bold, color: GREY,
    // @ts-ignore
    characterSpacing: 2,
  });
  y -= 25;

  const scoresArr = [d.scores.p1, d.scores.p2, d.scores.p3, d.scores.p4];
  PILLARS.forEach((p, i) => {
    const sc = scoresArr[i];
    const level = sc >= 8 ? "BOA" : sc >= 5 ? "RAZOÁVEL" : "BAIXA";
    const col = sc >= 8 ? rgb(0.2, 0.7, 0.4) : sc >= 5 ? ORANGE : rgb(0.85, 0.2, 0.2);

    page.drawRectangle({ x: M, y: y - 38, width: W - M * 2, height: 1, color: LIGHT });
    page.drawText(p.name, { x: M, y: y - 18, size: 13, font: bold, color: BLACK });
    page.drawText(`${sc}/10`, { x: W - M - 110, y: y - 18, size: 16, font: bold, color: ORANGE });
    page.drawText(level, { x: W - M - 60, y: y - 16, size: 9, font: bold, color: col,
      // @ts-ignore
      characterSpacing: 1,
    });
    y -= 40;
  });

  // footer
  page.drawText("tiagodigitalwave.eu · hello@tiagodigitalwave.eu", {
    x: M, y: 40, size: 9, font: helv, color: GREY,
  });

  // ---------- CHAPTERS ----------
  PILLARS.forEach((pillar, idx) => {
    const sc = scoresArr[idx];

    // chapter cover
    let cp = pdf.addPage([W, H]);
    cp.drawRectangle({ x: 0, y: 0, width: W, height: H, color: BLACK });
    cp.drawRectangle({ x: 0, y: H - 6, width: W, height: 6, color: ORANGE });
    cp.drawText(`CAPÍTULO 0${idx + 1}`, { x: M, y: H - 80, size: 11, font: bold, color: ORANGE,
      // @ts-ignore
      characterSpacing: 3,
    });
    cp.drawText(pillar.name, { x: M, y: H - 200, size: 38, font: bold, color: WHITE });
    cp.drawText(`${sc}`, { x: M, y: H - 290, size: 64, font: bold, color: ORANGE });
    cp.drawText("PONTUAÇÃO", { x: M + 100, y: H - 260, size: 10, font: bold, color: GREY,
      // @ts-ignore
      characterSpacing: 2,
    });
    cp.drawText("/10", { x: M + 100, y: H - 280, size: 14, font: helv, color: WHITE });

    let cy = H - 360;
    for (const ln of wrap(pillar.intro, 70)) {
      cp.drawText(ln, { x: M, y: cy, size: 12, font: helv, color: LIGHT });
      cy -= 18;
    }
    cp.drawText("Produzido por Digital Wave · hello@tiagodigitalwave.eu", {
      x: M, y: 50, size: 9, font: helv, color: GREY,
    });

    // practices page
    let pp = pdf.addPage([W, H]);
    pp.drawRectangle({ x: 0, y: H - 4, width: W, height: 4, color: ORANGE });
    pp.drawText(`CAP. 0${idx + 1} · ${pillar.name.toUpperCase()} · BOAS PRÁTICAS`, {
      x: M, y: H - 45, size: 8, font: bold, color: ORANGE,
      // @ts-ignore
      characterSpacing: 2,
    });

    let py = H - 90;
    pillar.practices.forEach((pr, i) => {
      if (py < 180) {
        pp = pdf.addPage([W, H]);
        pp.drawRectangle({ x: 0, y: H - 4, width: W, height: 4, color: ORANGE });
        py = H - 90;
      }
      pp.drawText(`0${i + 1}`, { x: M, y: py, size: 22, font: bold, color: ORANGE });
      pp.drawText(pr.title, { x: M + 45, y: py + 4, size: 14, font: bold, color: BLACK });
      let by = py - 18;
      for (const ln of wrap(pr.body, 78)) {
        pp.drawText(ln, { x: M + 45, y: by, size: 10.5, font: helv, color: rgb(0.25, 0.25, 0.25) });
        by -= 15;
      }
      py = by - 22;
    });

    pp.drawText("tiagodigitalwave.eu · hello@tiagodigitalwave.eu", {
      x: M, y: 40, size: 9, font: helv, color: GREY,
    });
  });

  // ---------- FINAL CTA ----------
  const cta = pdf.addPage([W, H]);
  cta.drawRectangle({ x: 0, y: 0, width: W, height: H, color: BLACK });
  cta.drawRectangle({ x: 0, y: H - 6, width: W, height: 6, color: ORANGE });
  cta.drawText("PRÓXIMO PASSO", { x: M, y: H - 110, size: 11, font: bold, color: ORANGE,
    // @ts-ignore
    characterSpacing: 3,
  });
  cta.drawText("Vamos discutir o teu", { x: M, y: H - 200, size: 32, font: bold, color: WHITE });
  cta.drawText("diagnóstico em 30 min.", { x: M, y: H - 240, size: 32, font: bold, color: WHITE });
  const ctaBody =
    "Sem pitch decks. Mostramos exatamente o que faria sentido para o teu caso e o tipo de operação de Email Marketing B2B que conseguiria gerar reuniões previsíveis com decisores.";
  let cy2 = H - 290;
  for (const ln of wrap(ctaBody, 70)) {
    cta.drawText(ln, { x: M, y: cy2, size: 12, font: helv, color: LIGHT });
    cy2 -= 18;
  }
  cta.drawRectangle({ x: M, y: cy2 - 50, width: 280, height: 50, color: ORANGE });
  cta.drawText("Agendar reunião", { x: M + 20, y: cy2 - 32, size: 14, font: bold, color: BLACK });
  cta.drawText("cal.com/tiago-barbosa-wiadtc/30min", { x: M, y: 80, size: 10, font: helv, color: GREY });
  cta.drawText("Digital Wave · Email Marketing B2B", { x: M, y: 60, size: 10, font: bold, color: ORANGE });

  return await pdf.save();
}

function userEmailHtml(firstName: string, overall: number) {
  return `<!doctype html><html><body style="margin:0;background:#f5f5f7;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111">
  <div style="max-width:560px;margin:0 auto;padding:32px 16px">
    <div style="background:#fff;border-radius:16px;padding:40px 36px">
      <div style="display:inline-block;padding:6px 12px;background:#111;color:#ff6b26;font-weight:700;letter-spacing:2px;font-size:11px;border-radius:4px">DIGITAL WAVE</div>
      <h1 style="font-size:26px;margin:28px 0 18px;color:#111">O teu relatório está pronto.</h1>
      <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 16px">Olá ${firstName},</p>
      <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 16px">
        Obrigado por completares o diagnóstico da tua operação de aquisição B2B. Em anexo encontras o teu PDF
        personalizado com a análise detalhada dos travões que estão a limitar o crescimento — e as boas práticas
        de Email Marketing B2B que aplicamos em cada operação Digital Wave.
      </p>
      <div style="background:#fff7f2;border-left:4px solid #ff6b26;padding:14px 18px;margin:24px 0;border-radius:6px">
        <div style="font-size:11px;letter-spacing:2px;color:#ff6b26;font-weight:700">SAÚDE GERAL</div>
        <div style="font-size:36px;font-weight:700;color:#111;line-height:1.1;margin-top:4px">${overall}%</div>
      </div>
      <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 16px">
        Se tiveres alguma dúvida sobre os resultados, responde diretamente a este email.
      </p>
      <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 4px">Com resultados,</p>
      <p style="font-size:15px;line-height:1.6;margin:0;color:#111"><strong>Tiago · Digital Wave</strong></p>
      <hr style="border:none;border-top:1px solid #eee;margin:32px 0 20px"/>
      <p style="font-size:12px;color:#888;margin:0">Este relatório foi gerado através de <a href="https://tiagodigitalwave.eu" style="color:#ff6b26;text-decoration:none">tiagodigitalwave.eu</a></p>
    </div>
  </div></body></html>`;
}

function adminEmailHtml(d: Payload) {
  const pillars = ["Atração", "Previsibilidade", "Conversão", "Retenção"];
  const scores = [d.scores.p1, d.scores.p2, d.scores.p3, d.scores.p4];
  const rows = pillars.map((p, i) => `<tr><td style="padding:6px 10px;border:1px solid #2a2a2a">${p}</td><td style="padding:6px 10px;border:1px solid #2a2a2a;text-align:right"><strong>${scores[i]}/10</strong></td></tr>`).join("");
  return `<div style="font-family:Inter,Arial,sans-serif;background:#0f0f0f;color:#f5f5f5;padding:24px;max-width:640px">
    <h1 style="color:#ff6b26;margin:0 0 8px">Novo Quiz · Digital Wave</h1>
    <p style="color:#bdbdbd">Pontuação geral: <strong style="color:#ff6b26">${d.scores.overall}%</strong></p>
    <h2 style="font-size:16px;margin:24px 0 8px">Contacto</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px">
      <tr><td style="padding:6px 10px;border:1px solid #2a2a2a">Nome</td><td style="padding:6px 10px;border:1px solid #2a2a2a">${d.firstName}</td></tr>
      <tr><td style="padding:6px 10px;border:1px solid #2a2a2a">Email</td><td style="padding:6px 10px;border:1px solid #2a2a2a"><a href="mailto:${d.email}" style="color:#ff6b26">${d.email}</a></td></tr>
      <tr><td style="padding:6px 10px;border:1px solid #2a2a2a">Telefone</td><td style="padding:6px 10px;border:1px solid #2a2a2a">${d.phone}</td></tr>
      <tr><td style="padding:6px 10px;border:1px solid #2a2a2a">Cargo</td><td style="padding:6px 10px;border:1px solid #2a2a2a">${d.role}</td></tr>
      <tr><td style="padding:6px 10px;border:1px solid #2a2a2a">Faturação</td><td style="padding:6px 10px;border:1px solid #2a2a2a">${d.revenue}</td></tr>
    </table>
    <h2 style="font-size:16px;margin:24px 0 8px">Pilares</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px">${rows}</table>
    <p style="color:#888;margin-top:24px">Respostas: ${d.answers.join(" · ")}</p>
  </div>`;
}

function bytesToBase64(bytes: Uint8Array): string {
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  // btoa exists in workerd
  return btoa(bin);
}

async function sendEmail(opts: {
  apiKey: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  attachment?: { filename: string; content: string };
}) {
  const body: Record<string, unknown> = {
    from: "Digital Wave <onboarding@resend.dev>",
    to: [opts.to],
    subject: opts.subject,
    html: opts.html,
  };
  if (opts.replyTo) body.reply_to = opts.replyTo;
  if (opts.attachment) body.attachments = [opts.attachment];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${opts.apiKey}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const t = await res.text();
    console.error("Resend error:", res.status, t);
    throw new Error(`resend ${res.status}`);
  }
}

async function sendEmailSafely(label: string, opts: Parameters<typeof sendEmail>[0]) {
  try {
    await sendEmail(opts);
    return { label, ok: true } as const;
  } catch (error) {
    console.error(`Quiz email failed (${label}):`, error);
    return { label, ok: false } as const;
  }
}

export const Route = createFileRoute("/api/public/quiz-submit")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON" }), {
            status: 400, headers: { "Content-Type": "application/json" },
          });
        }
        const parsed = PAYLOAD.safeParse(body);
        if (!parsed.success) {
          return new Response(JSON.stringify({ error: "Invalid payload" }), {
            status: 400, headers: { "Content-Type": "application/json" },
          });
        }
        const d = parsed.data;

        const RESEND_API_KEY = process.env.RESEND_API_KEY;
        if (!RESEND_API_KEY) {
          console.error("RESEND_API_KEY not configured");
          return new Response(JSON.stringify({ error: "Email service not configured" }), {
            status: 500, headers: { "Content-Type": "application/json" },
          });
        }

        const pdfBytes = await buildPdf(d);
        const pdfB64 = bytesToBase64(pdfBytes);
        const filename = `Digital_Wave_Relatorio_${d.firstName.replace(/\s+/g, "_")}.pdf`;

        const results = await Promise.all([
          sendEmailSafely("admin", {
            apiKey: RESEND_API_KEY,
            to: "hello@tiagodigitalwave.eu",
            replyTo: d.email,
            subject: `Quiz Digital Wave · ${d.firstName} (${d.scores.overall}%)`,
            html: adminEmailHtml(d),
            attachment: { filename, content: pdfB64 },
          }),
          sendEmailSafely("visitor", {
            apiKey: RESEND_API_KEY,
            to: d.email,
            replyTo: "hello@tiagodigitalwave.eu",
            subject: "O teu relatório Digital Wave está pronto",
            html: userEmailHtml(d.firstName, d.scores.overall),
            attachment: { filename, content: pdfB64 },
          }),
        ]);

        if (results.some((result) => !result.ok)) {
          console.error("Quiz submit email delivery partial/failed:", results);
        }

        return new Response(JSON.stringify({ ok: true }), {
          status: 202, headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
