import { promises as fs } from "fs";
import * as https from "https";
import * as tls from "tls";
import * as net from "net";
import path from "path";
import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { pergolas } from "@/data/pergolas";

const TELEGRAM_API_HOST = "api.telegram.org";

// ─── Types ────────────────────────────────────────────────────────────────────

type LeadPayload = {
  name: string;
  phone: string;
  messenger?: string;
  city?: string;
  comment?: string;
  selectedPergolaId?: string;
  objectType?: string;
  installationType?: string;
  selectedSize?: string;
  options?: string;
  timeline?: string;
  sourcePage: string;
};

type LeadRecord = LeadPayload & {
  leadId: string;
  createdAt: string;
  telegramStatus: "sent" | "failed";
  ipHash: string;
  userAgent: string;
};

/*
 * CRM-ready payload structure (not wired yet — see docs/LEADS_OPERATIONS.md §8).
 * Use LeadRecord fields to build this when integrating:
 *   Bitrix24:  POST /rest/{user_id}/{webhook}/crm.lead.add.json
 *   amoCRM:    POST /api/v4/leads
 *   Sheets:    Google Sheets API v4 spreadsheets.values.append
 *   Airtable:  POST https://api.airtable.com/v0/{baseId}/{tableName}
 *
 * Shape:
 *   { leadId, createdAt, source: "uogel-website",
 *     contact: { name, phone, messenger?, city? },
 *     project: { objectType?, systemType?, series?, seriesId?, size?, options?, installation?, comment? },
 *     meta: { sourcePage, telegramStatus, ipHash } }
 */

// ─── Lead ID ──────────────────────────────────────────────────────────────────

/**
 * Generates sequential daily ID: UOGEL-YYYYMMDD-NNN
 * Reads today's count from leads.jsonl to ensure uniqueness.
 */
async function generateLeadId(): Promise<string> {
  const now = new Date();
  const today = now
    .toLocaleDateString("en-CA", { timeZone: "Europe/Moscow" })
    .replace(/-/g, ""); // YYYYMMDD

  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "leads.jsonl");

  let count = 0;
  try {
    const content = await fs.readFile(filePath, "utf8");
    const lines = content.split("\n").filter(Boolean);
    for (const line of lines) {
      try {
        const record = JSON.parse(line) as Partial<LeadRecord>;
        if (record.leadId?.startsWith(`UOGEL-${today}-`)) {
          count++;
        }
      } catch {
        // skip malformed lines
      }
    }
  } catch {
    // file doesn't exist yet — count stays 0
  }

  const seq = String(count + 1).padStart(3, "0");
  return `UOGEL-${today}-${seq}`;
}

// ─── CRM payload builder ─────────────────────────────────────────────────────
//
// buildCrmPayload() is not wired yet — see docs/LEADS_OPERATIONS.md §8.
// When integrating a CRM, construct CrmPayload from leadRecord fields:
//
//   const crmPayload: CrmPayload = {
//     leadId, createdAt, source: "uogel-website",
//     contact: { name, phone, messenger, city },
//     project: { objectType, systemType, series, seriesId, size, options, installation, comment },
//     meta: { sourcePage, telegramStatus, ipHash },
//   };
//   await sendToCrm(crmPayload); // Bitrix24 / amoCRM / Sheets / Airtable

// ─── Backup storage ───────────────────────────────────────────────────────────

async function saveLeadToFile(lead: LeadRecord): Promise<void> {
  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "leads.jsonl");
  await fs.mkdir(dataDir, { recursive: true });
  await fs.appendFile(filePath, JSON.stringify(lead) + "\n", "utf8");
}

// ─── Telegram message builder ─────────────────────────────────────────────────

function esc(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatDate(): string {
  return new Date().toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const SEP = "——————————————";

function buildMessage(lead: LeadPayload, leadId: string): string {
  const lines: string[] = [
    `🏗 <b>Новая заявка UOGEL</b>`,
    `🆔 <b>ID:</b> ${esc(leadId)}`,
    "",
    SEP,
  ];

  // ── Контактные данные ──
  lines.push(`👤 <b>Имя:</b> ${esc(lead.name)}`);
  lines.push(`📞 <b>Телефон:</b> ${esc(lead.phone)}`);
  if (lead.messenger) lines.push(`💬 <b>Мессенджер:</b> ${esc(lead.messenger)}`);
  if (lead.city) lines.push(`🏙 <b>Город:</b> ${esc(lead.city)}`);

  // ── Параметры проекта ──
  const hasProject =
    lead.objectType ||
    lead.installationType ||
    lead.selectedPergolaId ||
    lead.selectedSize ||
    lead.options ||
    lead.timeline;

  if (hasProject) {
    lines.push(SEP);

    if (lead.objectType) lines.push(`🏠 <b>Тип объекта:</b> ${esc(lead.objectType)}`);
    if (lead.installationType) lines.push(`🏗 <b>Система:</b> ${esc(lead.installationType)}`);

    if (lead.selectedPergolaId) {
      const pergola = pergolas.find((p) => p.id === lead.selectedPergolaId);
      if (pergola) {
        lines.push(`📦 <b>Серия:</b> ${esc(pergola.seriesName)}`);
      }
    }

    if (lead.selectedSize) lines.push(`📐 <b>Размеры:</b> ${esc(lead.selectedSize)}`);
    if (lead.options) lines.push(`⚙️ <b>Опции:</b> ${esc(lead.options)}`);
    if (lead.timeline) lines.push(`🔩 <b>Монтаж:</b> ${esc(lead.timeline)}`);
  }

  // ── Комментарий ──
  if (lead.comment) {
    lines.push(SEP);
    lines.push(`📝 <b>Комментарий:</b> ${esc(lead.comment)}`);
  }

  // ── Метаданные ──
  lines.push(SEP);
  lines.push(`🔗 <b>Источник:</b> ${esc(lead.sourcePage)}`);
  lines.push(`🕐 <b>Время:</b> ${formatDate()} МСК`);

  return lines.join("\n");
}

// ─── IP utils ─────────────────────────────────────────────────────────────────

function hashIp(ip: string): string {
  if (!ip || ip === "unknown") return "unknown";
  return createHash("sha256").update(ip + "uogel-salt").digest("hex").slice(0, 12);
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

// ─── Rate limit ───────────────────────────────────────────────────────────────

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;

type RateLimitEntry = { count: number; resetAt: number };
const rateLimitStore = new Map<string, RateLimitEntry>();

function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= now) rateLimitStore.delete(ip);
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (current.count >= RATE_LIMIT_MAX_REQUESTS) return true;
  current.count += 1;
  rateLimitStore.set(ip, current);
  return false;
}

// ─── Telegram sender ──────────────────────────────────────────────────────────

function sendTelegramMessage(
  token: string,
  chatId: string,
  text: string,
  proxyUrl?: string
): Promise<boolean> {
  const body = JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" });
  const tgPath = `/bot${token}/sendMessage`;

  return new Promise((resolve) => {
    function doRequest(socket?: net.Socket | tls.TLSSocket) {
      const options: https.RequestOptions = {
        hostname: TELEGRAM_API_HOST,
        port: 443,
        path: tgPath,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
        ...(socket ? { createConnection: () => socket } : {}),
      };

      const req = https.request(options, (res) => {
        res.resume();
        resolve(res.statusCode !== undefined && res.statusCode >= 200 && res.statusCode < 300);
      });

      req.on("error", () => resolve(false));
      req.write(body);
      req.end();
    }

    if (!proxyUrl) {
      doRequest();
      return;
    }

    let proxyHost: string;
    let proxyPort: number;
    try {
      const u = new URL(proxyUrl);
      proxyHost = u.hostname;
      proxyPort = parseInt(u.port || "3128", 10);
    } catch {
      doRequest();
      return;
    }

    // HTTP CONNECT tunnel through proxy, then TLS inside
    const tunnel = net.connect(proxyPort, proxyHost, () => {
      tunnel.write(
        `CONNECT ${TELEGRAM_API_HOST}:443 HTTP/1.1\r\nHost: ${TELEGRAM_API_HOST}:443\r\n\r\n`
      );
    });

    let headerBuf = "";
    const onData = (chunk: Buffer) => {
      headerBuf += chunk.toString();
      const sep = headerBuf.indexOf("\r\n\r\n");
      if (sep === -1) return;
      tunnel.off("data", onData);

      if (!headerBuf.startsWith("HTTP/1.1 200") && !headerBuf.startsWith("HTTP/1.0 200")) {
        tunnel.destroy();
        resolve(false);
        return;
      }

      const remainder = Buffer.from(headerBuf.slice(sep + 4), "binary");
      const tlsSocket = tls.connect(
        { socket: tunnel, servername: TELEGRAM_API_HOST },
        () => doRequest(tlsSocket)
      );
      if (remainder.length > 0) tlsSocket.unshift(remainder);
      tlsSocket.on("error", () => resolve(false));
    };

    tunnel.on("data", onData);
    tunnel.on("error", () => resolve(false));
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const clientIp = getClientIp(req);
  cleanupRateLimitStore();

  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { success: false, message: "Слишком много заявок. Попробуйте позже." },
      { status: 429 }
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("[lead] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set");
    return NextResponse.json(
      { ok: false, error: "Сервис временно недоступен. Напишите нам в Telegram: @uogel_russia" },
      { status: 500 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректный запрос." }, { status: 400 });
  }

  const name = str(body.name);
  const phone = str(body.phone);
  const sourcePage = str(body.sourcePage);

  if (name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Укажите имя (не менее 2 символов)." },
      { status: 400 }
    );
  }
  if (phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json(
      { ok: false, error: "Укажите корректный номер телефона." },
      { status: 400 }
    );
  }
  if (!sourcePage) {
    return NextResponse.json({ ok: false, error: "Некорректный запрос." }, { status: 400 });
  }

  const lead: LeadPayload = {
    name,
    phone,
    sourcePage,
    messenger: str(body.messenger) || undefined,
    city: str(body.city) || undefined,
    comment: str(body.comment) || undefined,
    selectedPergolaId: str(body.selectedPergolaId) || undefined,
    objectType: str(body.objectType) || undefined,
    installationType: str(body.installationType) || undefined,
    selectedSize: str(body.selectedSize) || undefined,
    options: str(body.options) || undefined,
    timeline: str(body.timeline) || undefined,
  };

  const createdAt = new Date().toISOString();
  const ipHash = hashIp(clientIp);
  const userAgent = (req.headers.get("user-agent") ?? "").slice(0, 300);
  const leadId = await generateLeadId();
  const text = buildMessage(lead, leadId);
  const proxyUrl = process.env.HTTPS_PROXY ?? process.env.HTTP_PROXY;

  // 1. Telegram — failure is non-critical, lead still gets saved
  let telegramStatus: "sent" | "failed" = "failed";
  try {
    const ok = await sendTelegramMessage(token, chatId, text, proxyUrl);
    if (ok) {
      telegramStatus = "sent";
    } else {
      console.error(`[lead] ${leadId} — Telegram API returned non-2xx`);
    }
  } catch (err) {
    console.error(`[lead] ${leadId} — Telegram network error:`, (err as Error).message);
  }

  // 2. Build CRM-ready payload (not sent anywhere yet — for future integration)
  // TODO: const crmPayload = buildCrmPayload(lead, leadId, createdAt, telegramStatus, ipHash);
  // TODO: await sendToCrm(crmPayload); // Bitrix24 / amoCRM / Sheets / Airtable

  // 3. Save to file — critical: if this fails, the lead is lost
  const leadRecord: LeadRecord = {
    ...lead,
    leadId,
    createdAt,
    telegramStatus,
    ipHash,
    userAgent,
  };

  try {
    await saveLeadToFile(leadRecord);
  } catch (err) {
    console.error(`[lead] ${leadId} — backup save failed:`, (err as Error).message);
    return NextResponse.json(
      { ok: false, error: "Не удалось сохранить заявку. Попробуйте ещё раз." },
      { status: 500 }
    );
  }

  console.info(`[lead] saved ${leadId} telegramStatus=${telegramStatus}`);

  return NextResponse.json({ ok: true, leadId });
}
