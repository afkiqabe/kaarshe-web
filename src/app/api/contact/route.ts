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
    firstName?: unknown;
    lastName?: unknown;
    email?: unknown;
    phone?: unknown;
    subject?: unknown;
    message?: unknown;
  } | null;

  const firstName =
    typeof body?.firstName === "string" ? body.firstName.trim() : "";
  const lastName =
    typeof body?.lastName === "string" ? body.lastName.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const subject = typeof body?.subject === "string" ? body.subject.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!firstName || !lastName || !message || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields or invalid email" },
      { status: 400 },
    );
  }

  const postType = process.env.WORDPRESS_CONTACT_POST_TYPE ?? "contact_message";
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
          "Contact backend not configured. Set WORDPRESS_APP_USER and WORDPRESS_APP_PASSWORD and ensure the CPT exists with show_in_rest=true.",
      },
      { status: 501 },
    );
  }

  const url = `${apiBase}/${postType}`;

  const titleParts = [
    subject || "Contact request",
    `${firstName} ${lastName}`.trim(),
  ];
  const title = titleParts.filter(Boolean).join(" — ");

  const contentLines = [
    `Name: ${firstName} ${lastName}`.trim(),
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    subject ? `Subject: ${subject}` : null,
    "",
    message,
  ].filter(Boolean);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        ...authHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title || email || "Contact request",
        status: "publish",
        content: contentLines.join("\n"),
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        {
          ok: false,
          error: `WordPress contact submit failed (${res.status}). ${text}`,
        },
        { status: 502 },
      );
    }
      const notifyTo = process.env.SITE_OWNER_EMAIL;
      if (notifyTo) {
        const subject = `New contact message from ${firstName} ${lastName}`.trim();
        const text = `You received a new contact message via kaarshe.com.\n\nName: ${firstName} ${lastName}\nEmail: ${email}` +
          (phone ? `\nPhone: ${phone}` : "") +
          (subject ? `\nSubject: ${subject}` : "") +
          `\n\nMessage:\n${message}`;
        try {
          await sendEmail({ to: notifyTo, subject, text });
        } catch {
          // Ignore email transport failures so contact submission still succeeds.
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
