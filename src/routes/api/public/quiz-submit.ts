import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

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

const PILLAR_NAMES = [
  "Volume e Atração de Leads",
  "Previsibilidade e Canais",
  "Qualidade e Conversão",
  "Retenção e Nutrição",
];

const QUESTIONS = [
  "Volume atual de novas leads mensais",
  "Esforço para colocar reuniões na agenda",
  "Dependência de redes sociais e ads",
  "Previsibilidade de novos clientes",
  "Perfil e poder de compra das leads",
  "Motivo de rejeição das propostas",
  "Tratamento das leads que não compram já",
  "Frequência de comunicação com base de dados",
];

export const Route = createFileRoute("/api/public/quiz-submit")({
  server: {
    handlers: {
      POST: async ({ request }) => {
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
          return new Response(
            JSON.stringify({ error: "Invalid payload", details: parsed.error.flatten() }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        const d = parsed.data;
        const pillarRows = [
          { name: PILLAR_NAMES[0], score: d.scores.p1 },
          { name: PILLAR_NAMES[1], score: d.scores.p2 },
          { name: PILLAR_NAMES[2], score: d.scores.p3 },
          { name: PILLAR_NAMES[3], score: d.scores.p4 },
        ];

        const answerRows = d.answers
          .map((a, i) => `<tr><td style="padding:6px 10px;border:1px solid #2a2a2a">${i + 1}. ${QUESTIONS[i]}</td><td style="padding:6px 10px;border:1px solid #2a2a2a;text-align:center"><strong>${a}</strong></td></tr>`)
          .join("");

        const pillarTable = pillarRows
          .map((p) => `<tr><td style="padding:6px 10px;border:1px solid #2a2a2a">${p.name}</td><td style="padding:6px 10px;border:1px solid #2a2a2a;text-align:right"><strong>${p.score}/10</strong></td></tr>`)
          .join("");

        const html = `
          <div style="font-family:Inter,Arial,sans-serif;background:#0f0f0f;color:#f5f5f5;padding:24px;max-width:640px">
            <h1 style="color:#ff8a3d;margin:0 0 8px">Nova submissão do Quiz Digital Wave</h1>
            <p style="color:#bdbdbd;margin:0 0 24px">Pontuação geral: <strong style="color:#ff8a3d">${d.scores.overall}%</strong></p>

            <h2 style="font-size:16px;margin:24px 0 8px">Contacto</h2>
            <table style="border-collapse:collapse;width:100%;font-size:14px">
              <tr><td style="padding:6px 10px;border:1px solid #2a2a2a">Nome</td><td style="padding:6px 10px;border:1px solid #2a2a2a">${d.firstName}</td></tr>
              <tr><td style="padding:6px 10px;border:1px solid #2a2a2a">Email</td><td style="padding:6px 10px;border:1px solid #2a2a2a"><a href="mailto:${d.email}" style="color:#ff8a3d">${d.email}</a></td></tr>
              <tr><td style="padding:6px 10px;border:1px solid #2a2a2a">Telefone</td><td style="padding:6px 10px;border:1px solid #2a2a2a">${d.phone}</td></tr>
              <tr><td style="padding:6px 10px;border:1px solid #2a2a2a">Cargo</td><td style="padding:6px 10px;border:1px solid #2a2a2a">${d.role}</td></tr>
              <tr><td style="padding:6px 10px;border:1px solid #2a2a2a">Faturação anual</td><td style="padding:6px 10px;border:1px solid #2a2a2a">${d.revenue}</td></tr>
            </table>

            <h2 style="font-size:16px;margin:24px 0 8px">Pontuação por Pilar</h2>
            <table style="border-collapse:collapse;width:100%;font-size:14px">${pillarTable}</table>

            <h2 style="font-size:16px;margin:24px 0 8px">Respostas</h2>
            <table style="border-collapse:collapse;width:100%;font-size:14px">${answerRows}</table>
          </div>`;

        const text = [
          `Nova submissão do Quiz Digital Wave`,
          `Pontuação geral: ${d.scores.overall}%`,
          ``,
          `Nome: ${d.firstName}`,
          `Email: ${d.email}`,
          `Telefone: ${d.phone}`,
          `Cargo: ${d.role}`,
          `Faturação: ${d.revenue}`,
          ``,
          `Pilares:`,
          ...pillarRows.map((p) => `  - ${p.name}: ${p.score}/10`),
          ``,
          `Respostas:`,
          ...d.answers.map((a, i) => `  ${i + 1}. ${QUESTIONS[i]} -> ${a}`),
        ].join("\n");

        const RESEND_API_KEY = process.env.RESEND_API_KEY;
        if (!RESEND_API_KEY) {
          console.error("RESEND_API_KEY not configured");
          return new Response(JSON.stringify({ error: "Email service not configured" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
              from: "Digital Wave Quiz <onboarding@resend.dev>",
              to: ["hello@tiagodigitalwave.eu"],
              reply_to: d.email,
              subject: `Quiz Digital Wave · ${d.firstName} (${d.scores.overall}%)`,
              html,
              text,
            }),
          });

          if (!res.ok) {
            const errText = await res.text();
            console.error("Resend error:", res.status, errText);
            return new Response(JSON.stringify({ error: "Email send failed" }), {
              status: 502,
              headers: { "Content-Type": "application/json" },
            });
          }
        } catch (err) {
          console.error("Resend fetch failed:", err);
          return new Response(JSON.stringify({ error: "Email send failed" }), {
            status: 502,
            headers: { "Content-Type": "application/json" },
          });
        }

        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
