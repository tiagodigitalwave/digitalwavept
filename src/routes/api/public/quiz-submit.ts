import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const PAYLOAD = z.object({
  firstName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(5).max(30),
  role: z.string().trim().min(1).max(80),
  revenue: z.string().trim().min(1).max(40),
  answers: z.array(z.enum(["A", "B", "C"])).length(20),
  scores: z.object({
    perTen: z.array(z.number().min(0).max(10)).length(5),
    raw: z.array(z.number().min(0).max(12)).length(5),
    overall: z.number().min(0).max(100),
  }),
});

type Payload = z.infer<typeof PAYLOAD>;

type Cat = {
  key: string;
  name: string;
  short: string;
  weight: number;
  intro: string;
  practices: { title: string; body: string }[];
  diagnoses: { low: string; mid: string; high: string };
};

const CATEGORIES: Cat[] = [
  {
    key: "canal",
    name: "Saúde do Canal de Email",
    short: "Canal",
    weight: 1.5,
    intro:
      "A infraestrutura de envio é o alicerce de toda a operação de Email Marketing B2B. Sem deliverability, nada do resto importa — a melhor copy do mundo perde valor se nunca chega à inbox do decisor.",
    practices: [
      {
        title: "Múltiplos domínios secundários com warm-up",
        body: "Nunca envies cold email do teu domínio principal. Compra domínios paralelos, configura SPF, DKIM e DMARC corretamente e faz warm-up de 3-4 semanas antes de subir volume.",
      },
      {
        title: "Monitorização activa de reputação",
        body: "Google Postmaster Tools, GlockApps e bounce/spam rate semanal. Tudo acima de 1% de spam complaint exige paragem imediata e investigação antes de continuar a enviar.",
      },
      {
        title: "Limites de envio por inbox",
        body: "30-50 emails por inbox por dia. Mais volume = mais inboxes, não mais envios por inbox. Rotação automática garante consistência e protege a reputação a longo prazo.",
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
    intro:
      "O ICP é o multiplicador silencioso de toda a operação. Definição vaga = mensagem genérica = resposta fraca. Definição cirúrgica = mensagem hiper-relevante = decisores a marcar reuniões sem hesitar.",
    practices: [
      {
        title: "ICP cirúrgico em 6 dimensões",
        body: "Sector, dimensão, geografia, cargo do decisor, sinal de intenção (contratações, funding, expansão) e dor mensurável que a tua oferta resolve. Sem todas as 6, não escales.",
      },
      {
        title: "Listas validadas em 3 camadas",
        body: "Validação SMTP do email, verificação do cargo actual via LinkedIn, enriquecimento firmográfico. Listas compradas sem este processo destroem domínios em semanas.",
      },
      {
        title: "Teste antes de escalar",
        body: "Sempre que mudas de ICP ou geografia, envia 500 emails com critérios de go/no-go definidos (open >50%, reply >5%). Só escalas o que valida.",
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
    intro:
      "A copy filtra. Se chegares à inbox certa com a mensagem errada, queimas o lead permanentemente. Cada palavra do subject à assinatura tem de soar como se fosse escrita exclusivamente para aquele decisor.",
    practices: [
      {
        title: "Abertura com personalização real",
        body: "Referência concreta à empresa, ao cargo, a um anúncio recente. Templates com {{firstName}} e nada mais são detectados em segundos pelo decisor — e ignorados.",
      },
      {
        title: "CTA de baixo compromisso",
        body: "Em vez de pedir reunião, faz uma pergunta provocadora ou oferece uma análise específica. Respostas geram respostas. Pedidos directos de calendário no primeiro email matam a conversa.",
      },
      {
        title: "Sequências de 4-6 toques com ângulos distintos",
        body: "Cada follow-up explora um ângulo diferente: dor, prova social, ROI, urgência. 80% das respostas chegam depois do terceiro toque — desistir cedo é desperdiçar o trabalho do topo.",
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
    intro:
      "Sem métricas, cada semana é uma roleta. Pipeline previsível significa saber, com 2 semanas de antecedência, quantas reuniões vais ter no próximo mês. É a diferença entre escalar com confiança e contratar comerciais à pressa.",
    practices: [
      {
        title: "Dashboard de funil semanal",
        body: "Open rate, reply rate, positive reply, meetings booked, show rate, propostas, fechos. Actualizado todas as segundas. Se um número cai, sabes onde olhar.",
      },
      {
        title: "Métricas-âncora por etapa",
        body: "Open >50%, reply >5%, positive >1%, show >70%, proposta >30%. Banda saudável definida. Qualquer desvio activa investigação imediata, não esperança.",
      },
      {
        title: "Forecast com ±20% de precisão",
        body: "3 meses de histórico permitem prever reuniões com margem aceitável. Sem isto, contratar comerciais ou investir em ads é apostar — não escalar.",
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
    intro:
      "Cada reunião custa tempo e energia. Se o fundo do funil não converte, todo o trabalho do topo vira frustração. Qualificação rigorosa antes de agendar protege o tempo comercial — e a taxa de fecho.",
    practices: [
      {
        title: "Qualificação BANT no agendamento",
        body: "Formulário no Calendly com 3 perguntas: orçamento, autoridade, prazo. Filtra curiosos antes de bloquear 30 minutos de calendário comercial.",
      },
      {
        title: "Sequências de nutrição pós-reunião",
        body: "Para quem disse ‘agora não’, 8-12 emails ao longo de 90 dias com casos, insights e provas. Reabre 10-20% das oportunidades sem trabalho comercial extra.",
      },
      {
        title: "Análise de taxa de fecho por origem",
        body: "Reuniões por cold email, por LinkedIn, por referência — taxas diferentes, mensagens diferentes. Optimizar cegamente sem segmentar mata a operação inteira.",
      },
    ],
    diagnoses: {
      low: "O fundo do funil está a desperdiçar o trabalho do topo. Cada reunião custa tempo e energia — se não convertem, o problema pode ser qualificação fraca ou proposta desalinhada.",
      mid: "Conversão razoável com espaço para optimização. Pequenas melhorias no processo de qualificação têm impacto directo na receita.",
      high: "Fundo de funil eficiente. O problema de crescimento está no volume ou na consistência do topo.",
    },
  },
];

const ORANGE = rgb(1, 0.4, 0.15);
const BLACK = rgb(0.06, 0.06, 0.06);
const GREY = rgb(0.45, 0.45, 0.45);
const LIGHT = rgb(0.92, 0.92, 0.92);
const WHITE = rgb(1, 1, 1);
const GREEN = rgb(0.2, 0.7, 0.4);
const RED = rgb(0.85, 0.2, 0.2);

function levelOf(raw: number): "low" | "mid" | "high" {
  if (raw <= 4) return "low";
  if (raw <= 8) return "mid";
  return "high";
}

function overallStatus(overall: number) {
  if (overall >= 80) return { title: "Sistema saudável e escalável", headline: "O teu motor de aquisição está afinado" };
  if (overall >= 60) return { title: "Funciona mas com travões", headline: "Tens travões que limitam o teu crescimento" };
  if (overall >= 40) return { title: "Sistema instável", headline: "O teu pipeline está a vazar — aqui está porquê" };
  return { title: "Sistema quebrado", headline: "Estás a investir sem retorno — o problema é estrutural" };
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

  const status = overallStatus(d.scores.overall);

  // ---------- COVER ----------
  let page = pdf.addPage([W, H]);
  page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: BLACK });
  page.drawRectangle({ x: 0, y: H - 8, width: W, height: 8, color: ORANGE });

  page.drawText("DIGITAL WAVE", { x: M, y: H - 70, size: 12, font: bold, color: ORANGE });
  page.drawText("RELATÓRIO DE SAÚDE · AQUISIÇÃO DE CLIENTES B2B", {
    x: M, y: H - 90, size: 9, font: helv, color: GREY,
  });

  page.drawText("Diagnóstico", { x: M, y: H - 260, size: 56, font: bold, color: WHITE });
  for (const [i, ln] of wrap(status.headline, 28).entries()) {
    page.drawText(ln, { x: M, y: H - 320 - i * 32, size: 24, font: helv, color: WHITE });
  }

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
  page.drawText("DIGITAL WAVE · RESUMO EXECUTIVO", { x: M, y: H - 50, size: 9, font: bold, color: ORANGE });

  page.drawText(`Olá, ${d.firstName}.`, { x: M, y: H - 110, size: 26, font: bold, color: BLACK });
  page.drawText("Aqui está o retrato da tua operação de aquisição.", {
    x: M, y: H - 138, size: 13, font: helv, color: GREY,
  });

  const intro =
    "Analisámos as tuas respostas em 5 categorias críticas da aquisição B2B via Email Marketing. As categorias 'Canal' e 'ICP & Lista' têm peso reforçado por serem as que mais afectam tudo o resto. Nas páginas seguintes encontras o diagnóstico de cada categoria e as boas práticas que aplicamos em cada operação Digital Wave.";
  let y = H - 175;
  for (const ln of wrap(intro, 78)) {
    page.drawText(ln, { x: M, y, size: 11, font: helv, color: BLACK });
    y -= 16;
  }

  // big score
  y -= 30;
  page.drawText(`${d.scores.overall}%`, { x: M, y: y - 70, size: 96, font: bold, color: ORANGE });
  page.drawText("SAÚDE GERAL", { x: M, y: y - 95, size: 10, font: bold, color: GREY });

  page.drawText(status.headline, { x: M + 200, y: y - 50, size: 14, font: bold, color: BLACK });
  let sy = y - 72;
  for (const ln of wrap(status.title, 40)) {
    page.drawText(ln, { x: M + 200, y: sy, size: 10, font: helv, color: GREY });
    sy -= 14;
  }

  // table
  y = y - 160;
  page.drawText("AS 5 CATEGORIAS", { x: M, y, size: 10, font: bold, color: GREY });
  y -= 25;

  CATEGORIES.forEach((c, i) => {
    const sc = d.scores.perTen[i];
    const lvl = levelOf(d.scores.raw[i]);
    const label = lvl === "high" ? "SAUDÁVEL" : lvl === "mid" ? "INSTÁVEL" : "CRÍTICO";
    const col = lvl === "high" ? GREEN : lvl === "mid" ? ORANGE : RED;

    page.drawRectangle({ x: M, y: y - 38, width: W - M * 2, height: 1, color: LIGHT });
    page.drawText(c.name, { x: M, y: y - 18, size: 13, font: bold, color: BLACK });
    page.drawText(`peso ${c.weight}x`, { x: M, y: y - 32, size: 8, font: helv, color: GREY });
    page.drawText(`${sc}/10`, { x: W - M - 130, y: y - 22, size: 18, font: bold, color: ORANGE });
    page.drawText(label, { x: W - M - 70, y: y - 18, size: 9, font: bold, color: col });
    y -= 44;
  });

  page.drawText("tiagodigitalwave.eu · hello@tiagodigitalwave.eu", {
    x: M, y: 40, size: 9, font: helv, color: GREY,
  });

  // ---------- CHAPTERS ----------
  CATEGORIES.forEach((cat, idx) => {
    const sc = d.scores.perTen[idx];
    const lvl = levelOf(d.scores.raw[idx]);
    const diag = cat.diagnoses[lvl];

    // chapter cover
    let cp = pdf.addPage([W, H]);
    cp.drawRectangle({ x: 0, y: 0, width: W, height: H, color: BLACK });
    cp.drawRectangle({ x: 0, y: H - 6, width: W, height: 6, color: ORANGE });
    cp.drawText(`CATEGORIA 0${idx + 1}`, { x: M, y: H - 80, size: 11, font: bold, color: ORANGE });
    for (const [i, ln] of wrap(cat.name, 22).entries()) {
      cp.drawText(ln, { x: M, y: H - 200 - i * 42, size: 34, font: bold, color: WHITE });
    }
    cp.drawText(`${sc}`, { x: M, y: H - 340, size: 64, font: bold, color: ORANGE });
    cp.drawText("/10", { x: M + 100, y: H - 330, size: 14, font: helv, color: WHITE });
    cp.drawText("DIAGNÓSTICO", { x: M + 100, y: H - 310, size: 10, font: bold, color: GREY });

    let cy = H - 420;
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
      x: M, y: 50, size: 9, font: helv, color: GREY,
    });

    // practices page
    let pp = pdf.addPage([W, H]);
    pp.drawRectangle({ x: 0, y: H - 4, width: W, height: 4, color: ORANGE });
    pp.drawText(`CAT. 0${idx + 1} · ${cat.name.toUpperCase()} · BOAS PRÁTICAS`, {
      x: M, y: H - 45, size: 8, font: bold, color: ORANGE,
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
      x: M, y: 40, size: 9, font: helv, color: GREY,
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
    "Sem pitch decks. Mostramos exactamente o que faria sentido para o teu caso e o tipo de operação de Email Marketing B2B que conseguiria gerar reuniões previsíveis com decisores.";
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

function userEmailHtml(firstName: string, overall: number, status: { title: string; headline: string }) {
  return `<!doctype html><html><body style="margin:0;background:#f5f5f7;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111">
  <div style="max-width:560px;margin:0 auto;padding:32px 16px">
    <div style="background:#fff;border-radius:16px;padding:40px 36px">
      <div style="display:inline-block;padding:6px 12px;background:#111;color:#ff6b26;font-weight:700;letter-spacing:2px;font-size:11px;border-radius:4px">DIGITAL WAVE</div>
      <h1 style="font-size:26px;margin:28px 0 18px;color:#111">O teu relatório está pronto.</h1>
      <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 16px">Olá ${firstName},</p>
      <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 16px">
        Obrigado por completares o diagnóstico da tua operação de aquisição B2B. Em anexo encontras o teu PDF
        personalizado com a análise detalhada das 5 categorias críticas — e as boas práticas
        de Email Marketing B2B que aplicamos em cada operação Digital Wave.
      </p>
      <div style="background:#fff7f2;border-left:4px solid #ff6b26;padding:14px 18px;margin:24px 0;border-radius:6px">
        <div style="font-size:11px;letter-spacing:2px;color:#ff6b26;font-weight:700">SAÚDE GERAL</div>
        <div style="font-size:36px;font-weight:700;color:#111;line-height:1.1;margin-top:4px">${overall}%</div>
        <div style="font-size:14px;color:#333;margin-top:6px"><strong>${status.headline}</strong></div>
        <div style="font-size:13px;color:#666;margin-top:2px">${status.title}</div>
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
  const rows = CATEGORIES.map((c, i) => `<tr><td style="padding:6px 10px;border:1px solid #2a2a2a">${c.name}</td><td style="padding:6px 10px;border:1px solid #2a2a2a;text-align:right"><strong>${d.scores.perTen[i]}/10</strong> <span style="color:#888">(raw ${d.scores.raw[i]}/12)</span></td></tr>`).join("");
  return `<div style="font-family:Inter,Arial,sans-serif;background:#0f0f0f;color:#f5f5f5;padding:24px;max-width:640px">
    <h1 style="color:#ff6b26;margin:0 0 8px">Novo Quiz · Digital Wave</h1>
    <p style="color:#bdbdbd">Pontuação geral ponderada: <strong style="color:#ff6b26">${d.scores.overall}%</strong></p>
    <h2 style="font-size:16px;margin:24px 0 8px">Contacto</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px">
      <tr><td style="padding:6px 10px;border:1px solid #2a2a2a">Nome</td><td style="padding:6px 10px;border:1px solid #2a2a2a">${d.firstName}</td></tr>
      <tr><td style="padding:6px 10px;border:1px solid #2a2a2a">Email</td><td style="padding:6px 10px;border:1px solid #2a2a2a"><a href="mailto:${d.email}" style="color:#ff6b26">${d.email}</a></td></tr>
      <tr><td style="padding:6px 10px;border:1px solid #2a2a2a">Telefone</td><td style="padding:6px 10px;border:1px solid #2a2a2a">${d.phone}</td></tr>
      <tr><td style="padding:6px 10px;border:1px solid #2a2a2a">Cargo</td><td style="padding:6px 10px;border:1px solid #2a2a2a">${d.role}</td></tr>
      <tr><td style="padding:6px 10px;border:1px solid #2a2a2a">Faturação</td><td style="padding:6px 10px;border:1px solid #2a2a2a">${d.revenue}</td></tr>
    </table>
    <h2 style="font-size:16px;margin:24px 0 8px">Categorias</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px">${rows}</table>
    <p style="color:#888;margin-top:24px">Respostas (Q1→Q20): ${d.answers.join(" · ")}</p>
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
          console.error("Quiz payload invalid:", parsed.error.flatten());
          return new Response(JSON.stringify({ error: "Invalid payload" }), {
            status: 400, headers: { "Content-Type": "application/json" },
          });
        }
        const d = parsed.data;

        const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
        const RESEND_API_KEY =
          process.env.RESEND_API_KEY_1 || process.env.RESEND_API_KEY;

        if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
          console.error("Missing email credentials", {
            hasLovable: !!LOVABLE_API_KEY,
            hasResend: !!RESEND_API_KEY,
          });
          return new Response(JSON.stringify({ error: "Email service not configured" }), {
            status: 500, headers: { "Content-Type": "application/json" },
          });
        }

        const status = overallStatus(d.scores.overall);

        const pdfBytes = await buildPdf(d);
        const pdfB64 = bytesToBase64(pdfBytes);
        const filename = `Digital_Wave_Diagnostico_${d.firstName.replace(/\s+/g, "_")}.pdf`;

        const results = await Promise.all([
          sendEmailSafely("admin", {
            lovableKey: LOVABLE_API_KEY,
            resendKey: RESEND_API_KEY,
            to: "hello@tiagodigitalwave.eu",
            replyTo: d.email,
            subject: `Quiz Digital Wave · ${d.firstName} (${d.scores.overall}%)`,
            html: adminEmailHtml(d),
            attachment: { filename, content: pdfB64 },
          }),
          sendEmailSafely("visitor", {
            lovableKey: LOVABLE_API_KEY,
            resendKey: RESEND_API_KEY,
            to: d.email,
            replyTo: "hello@tiagodigitalwave.eu",
            subject: "O teu diagnóstico Digital Wave está pronto",
            html: userEmailHtml(d.firstName, d.scores.overall, status),
            attachment: { filename, content: pdfB64 },
          }),
        ]);

        if (results.some((r) => !r.ok)) {
          console.error("Quiz submit email delivery partial/failed:", results);
        }

        return new Response(JSON.stringify({ ok: true, results }), {
          status: 202, headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
