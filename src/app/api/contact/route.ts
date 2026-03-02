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
      const text =
        `You received a new contact message via kaarshe.com.\n\nName: ${firstName} ${lastName}\nEmail: ${email}` +
        (phone ? `\nPhone: ${phone}` : "") +
        (subject ? `\nSubject: ${subject}` : "") +
        `\n\nMessage:\n${message}`;

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
              <td style="font-size:22px;line-height:1.3;font-weight:800;color:#f9fafb;padding-bottom:8px;">New contact message</td>
            </tr>
            <tr>
              <td style="font-size:14px;line-height:1.6;color:#d4d4d4;padding-bottom:16px;">You received a new contact message via <strong>kaarshe.com</strong>.</td>
            </tr>
            <tr>
              <td>
                <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;font-size:14px;line-height:1.6;color:#e5e5e5;">
                  <tr>
                    <td style="padding:4px 0;width:120px;color:#9ca3af;">Name</td>
                    <td style="padding:4px 0;font-weight:600;">${firstName} ${lastName}</td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;width:120px;color:#9ca3af;">Email</td>
                    <td style="padding:4px 0;"><a href="mailto:${email}" style="color:#60a5fa;text-decoration:none;">${email}</a></td>
                  </tr>
                  ${phone ? `<tr>
                    <td style="padding:4px 0;width:120px;color:#9ca3af;">Phone</td>
                    <td style="padding:4px 0;">${phone}</td>
                  </tr>` : ""}
                  ${subject ? `<tr>
                    <td style="padding:4px 0;width:120px;color:#9ca3af;">Subject</td>
                    <td style="padding:4px 0;">${subject}</td>
                  </tr>` : ""}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding-top:18px;">
                <div style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#9ca3af;margin-bottom:6px;">Message</div>
                <div style="white-space:pre-wrap;border-radius:12px;background:#020617;border:1px solid #1f2937;padding:14px 16px;font-size:14px;line-height:1.6;color:#e5e5e5;">${message.replace(/</g, "&lt;")}</div>
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
