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
    email?: unknown;
    source?: unknown;
  } | null;

  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const source = typeof body?.source === "string" ? body.source.trim() : "";

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Invalid email" },
      { status: 400 },
    );
  }

  const postType =
    process.env.WORDPRESS_NEWSLETTER_POST_TYPE ?? "newsletter_subscriber";
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
          "Newsletter backend not configured. Set WORDPRESS_APP_USER and WORDPRESS_APP_PASSWORD (Application Password) and ensure the CPT exists with show_in_rest=true.",
      },
      { status: 501 },
    );
  }

  const url = `${apiBase}/${postType}`;

  try {
    // Check for existing subscriber by email to avoid duplicates
    try {
      const existingRes = await fetch(
        `${url}?search=${encodeURIComponent(email)}&per_page=1`,
        {
          headers: {
            ...authHeaders,
          },
        },
      );

      const existingTotal = Number(
        existingRes.headers.get("x-wp-total") ?? "0",
      );

      if (existingTotal > 0) {
        return NextResponse.json(
          { ok: false, error: "duplicate" },
          { status: 409 },
        );
      }
    } catch {
      // If the duplicate check fails, continue to attempt subscription.
    }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        ...authHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: email,
        status: "publish",
        content: source ? `source: ${source}` : "",
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        {
          ok: false,
          error: `WordPress subscribe failed (${res.status}). ${text}`,
        },
        { status: 502 },
      );
    }

    const notifyTo = process.env.SITE_OWNER_EMAIL;
    if (notifyTo) {
      const subject = "New newsletter subscriber";
      // const text = `A new email subscribed to your newsletter.\n\nEmail: ${email}\nSource: ${source || "unknown"}`;
      const text = `A new email subscribed to your newsletter.\n\nEmail: ${email}`;
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
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#111217;border:1px solid #262626;border-radius:16px;padding:24px 24px 28px;">
            <tr>
              <td style="font-size:12px;letter-spacing:0.16em;color:#fbbf24;text-transform:uppercase;font-weight:700;padding-bottom:8px;">Kaarshe Web</td>
            </tr>
            <tr>
              <td style="font-size:22px;line-height:1.3;font-weight:800;color:#f9fafb;padding-bottom:8px;">New newsletter subscriber</td>
            </tr>
            <tr>
              <td style="font-size:14px;line-height:1.6;color:#d4d4d4;padding-bottom:16px;">A new email subscribed to your newsletter.</td>
            </tr>
            <tr>
              <td>
                <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;font-size:14px;line-height:1.6;color:#e5e5e5;">
                  <tr>
                    <td style="padding:4px 0;width:120px;color:#9ca3af;">Email</td>
                    <td style="padding:4px 0;font-weight:600;">${email}</td>
                  </tr>
                  
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

      // <tr>
      //                     <td style="padding:4px 0;width:120px;color:#9ca3af;">Source</td>
      //                     <td style="padding:4px 0;">${source || "unknown"}</td>
      //                   </tr>
      try {
        await sendEmail({ to: notifyTo, subject, text, html });
      } catch {
        // Ignore email transport failures so subscription still succeeds.
      }
    }

    // Send welcome email to the subscriber themselves
    const siteUrl = (
      process.env.NEXT_PUBLIC_SITE_URL || "https://kaarshe.com"
    ).replace(/\/$/, "");
    const unsubscribeUrl = `${siteUrl}/unsubscribe?email=${encodeURIComponent(
      email,
    )}&auto=1`;

    const welcomeSubject = "Welcome to the KAARSHE newsletter";
    const welcomeText =
      `Welcome to the KAARSHE newsletter!` +
      `\n\nYou're now subscribed with: ${email}` +
      `\n\nIf you ever want to unsubscribe, just visit:` +
      `\n${unsubscribeUrl}`;

    const welcomeHtml = `<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>${welcomeSubject}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#0b0b0b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#e5e5e5;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0b0b0b;padding:24px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#111217;border:1px solid #262626;border-radius:16px;padding:24px 24px 28px;">
            <tr>
              <td style="font-size:12px;letter-spacing:0.16em;color:#fbbf24;text-transform:uppercase;font-weight:700;padding-bottom:8px;">Kaarshe Web</td>
            </tr>
            <tr>
              <td style="font-size:22px;line-height:1.3;font-weight:800;color:#f9fafb;padding-bottom:8px;">Welcome to the newsletter</td>
            </tr>
            <tr>
              <td style="font-size:14px;line-height:1.6;color:#d4d4d4;padding-bottom:16px;">Thank you for subscribing to the <strong>KAARSHE</strong> newsletter. You&apos;ll receive updates on new research, publications, and insights.</td>
            </tr>
            <tr>
              <td>
                <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;font-size:14px;line-height:1.6;color:#e5e5e5;">
                  <tr>
                    <td style="padding:4px 0;width:120px;color:#9ca3af;">You Email</td>
                    <td style="padding:4px 0;font-weight:600;">${email}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding-top:20px;font-size:12px;line-height:1.6;color:#9ca3af;border-top:1px solid #1f2937;margin-top:16px;">
                If you no longer wish to receive these emails, you can
                <a href="${unsubscribeUrl}" style="color:#f97316;text-decoration:none;">unsubscribe here</a>.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

    try {
      await sendEmail({
        to: email,
        subject: welcomeSubject,
        text: welcomeText,
        html: welcomeHtml,
      });
    } catch {
      // Ignore welcome email failures so subscription still succeeds.
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
