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

      const html = `<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>${subject}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#0b0b0b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#e5e5e5;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0b0b0b;padding:24px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#111217;border:1px solid #262626;border-radius:16px;padding:24px 24px 28px;">
            <tr>
              <td style="font-size:12px;letter-spacing:0.16em;color:#fbbf24;text-transform:uppercase;font-weight:700;padding-bottom:8px;">Kaarshe Web</td>
            </tr>
            <tr>
              <td style="font-size:22px;line-height:1.3;font-weight:800;color:#f9fafb;padding-bottom:8px;">New speaking request</td>
            </tr>
            <tr>
              <td style="font-size:14px;line-height:1.6;color:#d4d4d4;padding-bottom:16px;">You received a new speaking request via <strong>kaarshe.com</strong>.</td>
            </tr>
            <tr>
              <td>
                <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;font-size:14px;line-height:1.6;color:#e5e5e5;">
                  <tr>
                    <td style="padding:4px 0;width:140px;color:#9ca3af;">Organization</td>
                    <td style="padding:4px 0;font-weight:600;">${organization}</td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;width:140px;color:#9ca3af;">Email</td>
                    <td style="padding:4px 0;"><a href="mailto:${email}" style="color:#60a5fa;text-decoration:none;">${email}</a></td>
                  </tr>
                  ${date ? `<tr>
                    <td style="padding:4px 0;width:140px;color:#9ca3af;">Target date</td>
                    <td style="padding:4px 0;">${date}</td>
                  </tr>` : ""}
                  ${format ? `<tr>
                    <td style="padding:4px 0;width:140px;color:#9ca3af;">Format</td>
                    <td style="padding:4px 0;">${format}</td>
                  </tr>` : ""}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding-top:18px;">
                <div style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#9ca3af;margin-bottom:6px;">Notes</div>
                <div style="white-space:pre-wrap;border-radius:12px;background:#020617;border:1px solid #1f2937;padding:14px 16px;font-size:14px;line-height:1.6;color:#e5e5e5;">${notes.replace(/</g, "&lt;")}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

      try {
        await sendEmail({ to: notifyTo, subject, text, html });
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
