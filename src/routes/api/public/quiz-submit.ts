import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import {
  DIMENSIONS,
  SCORED,
  P2,
  computeScores,
  overallProfile,
  type Answer,
} from "@/lib/quiz-config";

const ANSWER = z.enum(["A", "B", "C"]);

const PAYLOAD = z.object({
  firstName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(5).max(30),
  role: z.string().trim().min(1).max(80),
  revenue: z.string().trim().min(1).max(40),
  channels: z.array(z.string().min(1).max(40)).max(20),
  answers: z.record(z.string(), ANSWER),
  scores: z.object({
    perTen: z.array(z.number().min(0).max(10)).length(5),
    overall: z.number().min(0).max(100),
  }),
});

type Payload = z.infer<typeof PAYLOAD>;

// ---------- PDF colours ----------
const ORANGE = rgb(1, 0.4, 0.15);
const BLACK = rgb(0.06, 0.06, 0.06);
const GREY = rgb(0.45, 0.45, 0.45);
const LIGHT = rgb(0.92, 0.92, 0.92);
const WHITE = rgb(1, 1, 1);
const GREEN = rgb(0.2, 0.7, 0.4);
const RED = rgb(0.85, 0.2, 0.2);

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

  // Recompute scores server-side from answers (canonical source).
  const answerMap: Record<string, Answer> = {};
  for (const [k, v] of Object.entries(d.answers)) answerMap[k] = v;
  const scores = computeScores(answerMap);
  const profile = overallProfile(scores);

  // ---------- COVER ----------
  let page = pdf.addPage([W, H]);
  page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: BLACK });
  page.drawRectangle({ x: 0, y: H - 8, width: W, height: 8, color: ORANGE });

  page.drawText("DIGITAL WAVE", { x: M, y: H - 70, size: 12, font: bold, color: ORANGE });
  page.drawText("DIAGNÓSTICO · AQUISIÇÃO DE CLIENTES B2B", {
    x: M,
    y: H - 90,
    size: 9,
    font: helv,
    color: GREY,
  });

  page.drawText("Diagnóstico", { x: M, y: H - 260, size: 56, font: bold, color: WHITE });
  for (const [i, ln] of wrap(profile.headline, 28).entries()) {
    page.drawText(ln, { x: M, y: H - 320 - i * 32, size: 22, font: helv, color: WHITE });
  }

  page.drawRectangle({ x: M, y: 200, width: 60, height: 2, color: ORANGE });
  page.drawText("Preparado para", { x: M, y: 170, size: 10, font: helv, color: GREY });
  page.drawText(d.firstName.toUpperCase(), { x: M, y: 145, size: 22, font: bold, color: WHITE });
  page.drawText(`${d.role} · ${d.revenue}`, { x: M, y: 122, size: 10, font: helv, color: GREY });

  page.drawText("Produzido por Digital Wave · hello@tiagodigitalwave.eu", {
    x: M,
    y: 50,
    size: 9,
    font: helv,
    color: GREY,
  });

  // ---------- SUMMARY ----------
  page = pdf.addPage([W, H]);
  page.drawRectangle({ x: 0, y: H - 4, width: W, height: 4, color: ORANGE });
  page.drawText("DIGITAL WAVE · RESUMO EXECUTIVO", { x: M, y: H - 50, size: 9, font: bold, color: ORANGE });

  page.drawText(`Olá, ${d.firstName}.`, { x: M, y: H - 110, size: 26, font: bold, color: BLACK });
  page.drawText("Aqui está o retrato da tua operação de aquisição.", {
    x: M,
    y: H - 138,
    size: 13,
    font: helv,
    color: GREY,
  });

  let y = H - 175;
  for (const ln of wrap(profile.body, 78)) {
    page.drawText(ln, { x: M, y, size: 11, font: helv, color: BLACK });
    y -= 16;
  }

  y -= 30;
  page.drawText(`${scores.overall}%`, { x: M, y: y - 70, size: 96, font: bold, color: ORANGE });
  page.drawText("SAÚDE GERAL", { x: M, y: y - 95, size: 10, font: bold, color: GREY });

  page.drawText(profile.title, { x: M + 200, y: y - 50, size: 16, font: bold, color: BLACK });
  let sy = y - 72;
  for (const ln of wrap(profile.headline, 38)) {
    page.drawText(ln, { x: M + 200, y: sy, size: 11, font: helv, color: GREY });
    sy -= 14;
  }

  y = y - 160;
  page.drawText("AS 5 DIMENSÕES", { x: M, y, size: 10, font: bold, color: GREY });
  y -= 25;

  DIMENSIONS.forEach((c, i) => {
    const sc = scores.perTenList[i];
    const lvl = scores.perDim[c.key].level;
    const label = lvl === "high" ? "SAUDÁVEL" : lvl === "mid" ? "INSTÁVEL" : "CRÍTICO";
    const col = lvl === "high" ? GREEN : lvl === "mid" ? ORANGE : RED;

    page.drawRectangle({ x: M, y: y - 38, width: W - M * 2, height: 1, color: LIGHT });
    page.drawText(c.name, { x: M, y: y - 18, size: 13, font: bold, color: BLACK });
    page.drawText(`${sc}/10`, { x: W - M - 130, y: y - 22, size: 18, font: bold, color: ORANGE });
    page.drawText(label, { x: W - M - 70, y: y - 18, size: 9, font: bold, color: col });
    y -= 44;
  });

  page.drawText("tiagodigitalwave.eu · hello@tiagodigitalwave.eu", {
    x: M,
    y: 40,
    size: 9,
    font: helv,
    color: GREY,
  });

  // ---------- CHAPTERS ----------
  DIMENSIONS.forEach((cat, idx) => {
    const sc = scores.perTenList[idx];
    const lvl = scores.perDim[cat.key].level;
    const diag = cat.diagnoses[lvl];

    let cp = pdf.addPage([W, H]);
    cp.drawRectangle({ x: 0, y: 0, width: W, height: H, color: BLACK });
    cp.drawRectangle({ x: 0, y: H - 6, width: W, height: 6, color: ORANGE });
    cp.drawText(`DIMENSÃO 0${idx + 1}`, { x: M, y: H - 80, size: 11, font: bold, color: ORANGE });
    for (const [i, ln] of wrap(cat.name, 22).entries()) {
      cp.drawText(ln, { x: M, y: H - 200 - i * 42, size: 30, font: bold, color: WHITE });
    }
    cp.drawText(`${sc}`, { x: M, y: H - 360, size: 64, font: bold, color: ORANGE });
    cp.drawText("/10", { x: M + 100, y: H - 350, size: 14, font: helv, color: WHITE });
    cp.drawText("PONTUAÇÃO", { x: M + 100, y: H - 330, size: 10, font: bold, color: GREY });

    let cy = H - 440;
    cp.drawText("Estado", { x: M, y: cy, size: 10, font: bold, color: GREY });
    cy -= 18;
    for (const ln of wrap(diag, 70)) {
      cp.drawText(ln, { x: M, y: cy, size: 12, font: helv, color: LIGHT });
      cy -= 18;
    }
    cy -= 12;
    cp.drawText("Contexto", { x: M, y: cy, size: 10, font: bold, color: GREY });
    cy -= 18;
    for (const ln of wrap(cat.intro, 70)) {
      cp.drawText(ln, { x: M, y: cy, size: 11, font: helv, color: LIGHT });
      cy -= 16;
    }
    cp.drawText("Produzido por Digital Wave · hello@tiagodigitalwave.eu", {
      x: M,
      y: 50,
      size: 9,
      font: helv,
      color: GREY,
    });

    // practices page
    let pp = pdf.addPage([W, H]);
    pp.drawRectangle({ x: 0, y: H - 4, width: W, height: 4, color: ORANGE });
    pp.drawText(`DIM. 0${idx + 1} · ${cat.name.toUpperCase()} · BOAS PRÁTICAS`, {
      x: M,
      y: H - 45,
      size: 8,
      font: bold,
      color: ORANGE,
    });

    let py = H - 90;
    cat.practices.forEach((pr, i) => {
      if (py < 200) {
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
      x: M,
      y: 40,
      size: 9,
      font: helv,
      color: GREY,
    });
  });

  // ---------- FINAL CTA ----------
  const cta = pdf.addPage([W, H]);
  cta.drawRectangle({ x: 0, y: 0, width: W, height: H, color: BLACK });
  cta.drawRectangle({ x: 0, y: H - 6, width: W, height: 6, color: ORANGE });
  cta.drawText("PRÓXIMO PASSO", { x: M, y: H - 110, size: 11, font: bold, color: ORANGE });
  cta.drawText("Vamos discutir o teu", { x: M, y: H - 200, size: 32, font: bold, color: WHITE });
  cta.drawText("diagnóstico em 30 min.", { x: M, y: H - 240, size: 32, font: bold, color: WHITE });
  const ctaBody =
    "Sem pitch decks. Mostramos exactamente o que faria sentido para o teu caso e como construir um sistema de aquisição B2B que gera reuniões previsíveis com decisores.";
  let cy2 = H - 290;
  for (const ln of wrap(ctaBody, 70)) {
    cta.drawText(ln, { x: M, y: cy2, size: 12, font: helv, color: LIGHT });
    cy2 -= 18;
  }
  cta.drawRectangle({ x: M, y: cy2 - 50, width: 280, height: 50, color: ORANGE });
  cta.drawText("Agendar reunião", { x: M + 20, y: cy2 - 32, size: 14, font: bold, color: BLACK });
  cta.drawText("cal.com/tiago-barbosa-wiadtc/30min", { x: M, y: 80, size: 10, font: helv, color: GREY });
  cta.drawText("Digital Wave · Aquisição B2B previsível", { x: M, y: 60, size: 10, font: bold, color: ORANGE });

  return await pdf.save();
}

function userEmailHtml(firstName: string, overall: number, profile: { title: string; headline: string; body: string }) {
  return `<!doctype html><html><body style="margin:0;background:#f5f5f7;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111">
  <div style="max-width:560px;margin:0 auto;padding:32px 16px">
    <div style="background:#fff;border-radius:16px;padding:40px 36px">
      <div style="display:inline-block;padding:6px 12px;background:#111;color:#ff6b26;font-weight:700;letter-spacing:2px;font-size:11px;border-radius:4px">DIGITAL WAVE</div>
      <h1 style="font-size:26px;margin:28px 0 18px;color:#111">O teu diagnóstico está pronto.</h1>
      <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 16px">Olá ${firstName},</p>
      <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 16px">
        Obrigado por completares o diagnóstico Digital Wave. Em anexo tens o teu PDF
        personalizado com a análise detalhada das 5 dimensões do teu sistema de aquisição
        e as boas práticas a aplicar para destravar o crescimento.
      </p>
      <div style="background:#fff7f2;border-left:4px solid #ff6b26;padding:14px 18px;margin:24px 0;border-radius:6px">
        <div style="font-size:11px;letter-spacing:2px;color:#ff6b26;font-weight:700">SAÚDE GERAL</div>
        <div style="font-size:36px;font-weight:700;color:#111;line-height:1.1;margin-top:4px">${overall}%</div>
        <div style="font-size:14px;color:#333;margin-top:6px"><strong>${profile.headline}</strong></div>
        <div style="font-size:13px;color:#666;margin-top:2px">${profile.title}</div>
      </div>
      <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 16px">${profile.body}</p>
      <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 16px">
        Se quiseres discutir o relatório, responde diretamente a este email ou
        <a href="https://cal.com/tiago-barbosa-wiadtc/30min" style="color:#ff6b26;text-decoration:none;font-weight:600">agenda 30 minutos comigo</a>.
      </p>
      <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 4px">Com resultados,</p>
      <p style="font-size:15px;line-height:1.6;margin:0;color:#111"><strong>Tiago · Digital Wave</strong></p>
      <hr style="border:none;border-top:1px solid #eee;margin:32px 0 20px"/>
      <p style="font-size:12px;color:#888;margin:0">Este relatório foi gerado através de <a href="https://tiagodigitalwave.eu" style="color:#ff6b26;text-decoration:none">tiagodigitalwave.eu</a></p>
    </div>
  </div></body></html>`;
}

function channelLabel(id: string): string {
  return P2.options.find((o) => o.id === id)?.label ?? id;
}

function answerLabel(qId: string, a: Answer): string {
  const q = SCORED.find((x) => x.id === qId);
  return q ? `${a}) ${q.opts[a]}` : a;
}

function adminEmailHtml(d: Payload, overall: number, perTen: number[], profile: { title: string; headline: string }) {
  const channelsHtml = d.channels.length
    ? d.channels.map((c) => `<span style="display:inline-block;background:#1a1a1a;color:#ff6b26;padding:3px 10px;border-radius:999px;font-size:12px;margin:2px 4px 2px 0">${channelLabel(c)}</span>`).join("")
    : "<em style='color:#888'>nenhum</em>";

  const dimRows = DIMENSIONS.map((c, i) => `<tr><td style="padding:6px 10px;border:1px solid #2a2a2a">${c.name}</td><td style="padding:6px 10px;border:1px solid #2a2a2a;text-align:right"><strong>${perTen[i]}/10</strong></td></tr>`).join("");

  const answerRows = SCORED.filter((q) => d.answers[q.id])
    .map(
      (q) =>
        `<tr><td style="padding:8px 10px;border:1px solid #2a2a2a;vertical-align:top;width:60px;color:#ff6b26;font-weight:700">${q.id}</td><td style="padding:8px 10px;border:1px solid #2a2a2a;vertical-align:top"><div style="color:#bdbdbd;margin-bottom:4px">${q.q}</div><div>${answerLabel(q.id, d.answers[q.id] as Answer)}</div></td></tr>`,
    )
    .join("");

  return `<div style="font-family:Inter,Arial,sans-serif;background:#0f0f0f;color:#f5f5f5;padding:24px;max-width:720px">
    <h1 style="color:#ff6b26;margin:0 0 8px">Novo lead · Quiz Digital Wave</h1>
    <p style="color:#bdbdbd;margin:0 0 4px">Pontuação geral: <strong style="color:#ff6b26">${overall}%</strong> — ${profile.title}</p>
    <p style="color:#888;margin:0 0 24px;font-size:13px">${profile.headline}</p>

    <h2 style="font-size:16px;margin:24px 0 8px;color:#fff">Contacto</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px">
      <tr><td style="padding:6px 10px;border:1px solid #2a2a2a;width:140px">Nome</td><td style="padding:6px 10px;border:1px solid #2a2a2a">${d.firstName}</td></tr>
      <tr><td style="padding:6px 10px;border:1px solid #2a2a2a">Email</td><td style="padding:6px 10px;border:1px solid #2a2a2a"><a href="mailto:${d.email}" style="color:#ff6b26">${d.email}</a></td></tr>
      <tr><td style="padding:6px 10px;border:1px solid #2a2a2a">Telefone</td><td style="padding:6px 10px;border:1px solid #2a2a2a">${d.phone}</td></tr>
      <tr><td style="padding:6px 10px;border:1px solid #2a2a2a">Cargo</td><td style="padding:6px 10px;border:1px solid #2a2a2a">${d.role}</td></tr>
      <tr><td style="padding:6px 10px;border:1px solid #2a2a2a">Faturação</td><td style="padding:6px 10px;border:1px solid #2a2a2a">${d.revenue}</td></tr>
    </table>

    <h2 style="font-size:16px;margin:24px 0 8px;color:#fff">Canais usados (P2)</h2>
    <div>${channelsHtml}</div>

    <h2 style="font-size:16px;margin:24px 0 8px;color:#fff">Pontuação por dimensão</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px">${dimRows}</table>

    <h2 style="font-size:16px;margin:24px 0 8px;color:#fff">Respostas</h2>
    <table style="border-collapse:collapse;width:100%;font-size:13px">${answerRows}</table>

    <p style="color:#888;margin-top:24px;font-size:12px">O PDF foi enviado diretamente para o lead.</p>
  </div>`;
}

function bytesToBase64(bytes: Uint8Array): string {
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

async function sendEmail(opts: {
  lovableKey: string;
  resendKey: string;
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

  const res = await fetch(`${GATEWAY_URL}/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${opts.lovableKey}`,
      "X-Connection-Api-Key": opts.resendKey,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const t = await res.text();
    console.error("Resend gateway error:", res.status, t);
    throw new Error(`resend ${res.status}: ${t}`);
  }
}

async function sendEmailSafely(label: string, opts: Parameters<typeof sendEmail>[0]) {
  try {
    await sendEmail(opts);
    console.log(`Quiz email sent (${label}) to ${opts.to}`);
    return { label, ok: true } as const;
  } catch (error) {
    console.error(`Quiz email failed (${label}):`, error);
    return { label, ok: false, error: String(error) } as const;
  }
}

export const Route = createFileRoute("/api/public/quiz-submit")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          let body: unknown;
          try {
            body = await request.json();
          } catch {
            return new Response(JSON.stringify({ error: "Invalid JSON" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }
          const parsed = PAYLOAD.safeParse(body);
          if (!parsed.success) {
            console.error("Quiz payload invalid:", parsed.error.flatten());
            return new Response(JSON.stringify({ error: "Invalid payload" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }
          const d = parsed.data;

          const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
          const RESEND_API_KEY = process.env.RESEND_API_KEY_1 || process.env.RESEND_API_KEY;

          if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
            console.error("Missing email credentials", {
              hasLovable: !!LOVABLE_API_KEY,
              hasResend: !!RESEND_API_KEY,
            });
            return new Response(JSON.stringify({ error: "Email service not configured" }), {
              status: 500,
              headers: { "Content-Type": "application/json" },
            });
          }

          // Recompute scores server-side from answers (canonical source).
          const answerMap: Record<string, Answer> = {};
          for (const [k, v] of Object.entries(d.answers)) answerMap[k] = v;
          const scores = computeScores(answerMap);
          const profile = overallProfile(scores);

          // 1) ALWAYS send admin lead email first (no PDF dependency).
          const adminResult = await sendEmailSafely("admin", {
            lovableKey: LOVABLE_API_KEY,
            resendKey: RESEND_API_KEY,
            to: "hello@tiagodigitalwave.eu",
            replyTo: d.email,
            subject: `Novo lead Quiz · ${d.firstName} (${scores.overall}%)`,
            html: adminEmailHtml(d, scores.overall, scores.perTenList, profile),
          });

          // 2) Try to build the PDF. If it fails, still email the visitor
          //    with an HTML diagnostic so delivery never silently breaks.
          let pdfAttachment: { filename: string; content: string } | undefined;
          try {
            const pdfBytes = await buildPdf(d);
            const pdfB64 = bytesToBase64(pdfBytes);
            const filename = `Digital_Wave_Diagnostico_${d.firstName.replace(/\s+/g, "_")}.pdf`;
            pdfAttachment = { filename, content: pdfB64 };
          } catch (err) {
            console.error("PDF build failed, sending visitor email without attachment:", err);
          }

          const visitorResult = await sendEmailSafely("visitor", {
            lovableKey: LOVABLE_API_KEY,
            resendKey: RESEND_API_KEY,
            to: d.email,
            replyTo: "hello@tiagodigitalwave.eu",
            subject: "O teu diagnóstico Digital Wave está pronto",
            html: userEmailHtml(d.firstName, scores.overall, profile),
            attachment: pdfAttachment,
          });

          const results = [adminResult, visitorResult];
          if (results.some((r) => !r.ok)) {
            console.error("Quiz submit email delivery partial/failed:", results);
          }

          return new Response(JSON.stringify({ ok: true, results }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          console.error("Quiz submit unhandled error:", err);
          return new Response(
            JSON.stringify({ error: "Internal error", detail: String(err) }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }
      },
    },
  },
});
