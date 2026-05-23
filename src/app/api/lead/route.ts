import { NextRequest, NextResponse } from "next/server";
import { pergolas } from "@/data/pergolas";

const TELEGRAM_API = "https://api.telegram.org";

type LeadPayload = {
  name: string;
  phone: string;
  messenger?: string;
  city?: string;
  comment?: string;
  selectedPergolaId?: string;
  objectType?: string;
  selectedSize?: string;
  installationType?: string;
  options?: string;
  timeline?: string;
  sourcePage: string;
};

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

function buildMessage(lead: LeadPayload): string {
  const lines: string[] = ["🏗 <b>Новая заявка — UOGEL Russia</b>", ""];

  lines.push(`👤 <b>Имя:</b> ${esc(lead.name)}`);
  lines.push(`📞 <b>Телефон:</b> ${esc(lead.phone)}`);
  if (lead.messenger) lines.push(`💬 <b>Мессенджер:</b> ${esc(lead.messenger)}`);
  if (lead.city) lines.push(`🏙 <b>Город:</b> ${esc(lead.city)}`);

  const hasCatalogInfo =
    lead.selectedPergolaId || lead.selectedSize || lead.objectType || lead.installationType || lead.options || lead.timeline;

  if (hasCatalogInfo) {
    lines.push("");

    if (lead.selectedPergolaId) {
      const pergola = pergolas.find((p) => p.id === lead.selectedPergolaId);
      if (pergola) lines.push(`📦 <b>Пергола:</b> ${esc(pergola.title)}`);
    }
    if (lead.selectedSize) lines.push(`📐 <b>Размер:</b> ${esc(lead.selectedSize)}`);
    if (lead.objectType) lines.push(`🏠 <b>Объект:</b> ${esc(lead.objectType)}`);
    if (lead.installationType) lines.push(`🔩 <b>Установка:</b> ${esc(lead.installationType)}`);
    if (lead.options) lines.push(`⚙️ <b>Опции:</b> ${esc(lead.options)}`);
    if (lead.timeline) lines.push(`⏱ <b>Срок:</b> ${esc(lead.timeline)}`);
  }

  if (lead.comment) {
    lines.push("");
    lines.push(`📝 <b>Комментарий:</b> ${esc(lead.comment)}`);
  }

  lines.push("");
  lines.push(`🔗 <b>Источник:</b> ${esc(lead.sourcePage)}`);
  lines.push(`🕐 <b>Время:</b> ${formatDate()} МСК`);

  return lines.join("\n");
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set");
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
    return NextResponse.json({ ok: false, error: "Укажите имя (не менее 2 символов)." }, { status: 400 });
  }
  if (phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ ok: false, error: "Укажите корректный номер телефона." }, { status: 400 });
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
    selectedSize: str(body.selectedSize) || undefined,
    installationType: str(body.installationType) || undefined,
    options: str(body.options) || undefined,
    timeline: str(body.timeline) || undefined,
  };

  const text = buildMessage(lead);

  let tgRes: Response;
  try {
    tgRes = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });
  } catch (err) {
    console.error("Telegram network error:", (err as Error).message);
    return NextResponse.json(
      { ok: false, error: "Не удалось отправить заявку. Проверьте соединение и попробуйте ещё раз." },
      { status: 502 }
    );
  }

  if (!tgRes.ok) {
    const tgBody = await tgRes.json().catch(() => ({}));
    console.error("Telegram API error:", tgRes.status, (tgBody as { description?: string }).description ?? "");
    return NextResponse.json(
      { ok: false, error: "Не удалось отправить заявку. Попробуйте позже или напишите нам в Telegram: @uogel_russia" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
