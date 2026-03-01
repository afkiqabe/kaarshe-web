import { NextResponse } from "next/server";
import { getWpAuthHeaders } from "@/lib/wp";
import { sendEmail } from "@/lib/email";

export const runtime = "nodejs";

function isValidEmail(email: string) {
  if (!email || typeof email !== "string") return false;
  const value = email.trim();
  if (value.length < 5 || value.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    organization?: unknown;
    email?: unknown;
    date?: unknown;
    format?: unknown;
    notes?: unknown;
  } | null;

  const organization =
    typeof body?.organization === "string" ? body.organization.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const date = typeof body?.date === "string" ? body.date.trim() : "";
  const format = typeof body?.format === "string" ? body.format.trim() : "";
  const notes = typeof body?.notes === "string" ? body.notes.trim() : "";

  if (!organization || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields or invalid email" },
      { status: 400 },
    );
  }

  const postType =
    process.env.WORDPRESS_BOOK_SPEAKING_POST_TYPE ?? "speaking_request";
  const apiBase = process.env.WORDPRESS_API_BASE;

  if (!apiBase) {
    return NextResponse.json(
      { ok: false, error: "Missing WORDPRESS_API_BASE" },
      { status: 500 },
    );
  }

  const authHeaders = getWpAuthHeaders();
  if (!("Authorization" in authHeaders)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Book speaking backend not configured. Set WORDPRESS_APP_USER and WORDPRESS_APP_PASSWORD and ensure the CPT exists with show_in_rest=true.",
      },
      { status: 501 },
    );
  }

  const url = `${apiBase}/${postType}`;

  const titleParts = [
    organization,
    format || undefined,
    date || undefined,
  ].filter(Boolean);
  const title = titleParts.join(" — ");

  const contentLines = [
    `Organization: ${organization}`,
    `Email: ${email}`,
    date ? `Target date: ${date}` : null,
    format ? `Format: ${format}` : null,
    "",
    notes,
  ].filter(Boolean);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        ...authHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title || organization || email || "Speaking request",
        status: "publish",
        content: contentLines.join("\n"),
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        {
          ok: false,
          error: `WordPress book speaking submit failed (${res.status}). ${text}`,
        },
        { status: 502 },
      );
    }
    const notifyTo = process.env.SITE_OWNER_EMAIL;
    if (notifyTo) {
      const subject = `New speaking request from ${organization}`;
      const text =
        `You received a new speaking request via kaarshe.com.\n\nOrganization: ${organization}\nEmail: ${email}` +
        (date ? `\nTarget date: ${date}` : "") +
        (format ? `\nFormat: ${format}` : "") +
        `\n\nNotes:\n${notes}`;
      try {
        await sendEmail({ to: notifyTo, subject, text });
      } catch {
        // Ignore email transport failures so speaking request submission still succeeds.
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
