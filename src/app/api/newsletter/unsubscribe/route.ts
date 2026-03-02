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
  } | null;

  const email = typeof body?.email === "string" ? body.email.trim() : "";

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
          "Newsletter backend not configured. Set WORDPRESS_APP_USER and WORDPRESS_APP_PASSWORD and ensure the CPT exists with show_in_rest=true.",
      },
      { status: 501 },
    );
  }

  const collectionUrl = `${apiBase}/${postType}`;

  try {
    const listRes = await fetch(
      `${collectionUrl}?search=${encodeURIComponent(email)}&per_page=100`,
      { headers: { ...authHeaders } },
    );

    const subscribers = (await listRes.json().catch(() => [])) as {
      id: number;
      title?: { rendered?: string };
    }[];

    let removed = 0;

    if (Array.isArray(subscribers) && subscribers.length > 0) {
      for (const sub of subscribers) {
        if (!sub?.id) continue;
        try {
          const deleteUrl = `${collectionUrl}/${sub.id}?force=true`;
          const delRes = await fetch(deleteUrl, {
            method: "DELETE",
            headers: { ...authHeaders },
          });
          if (delRes.ok) removed += 1;
        } catch {
          // ignore individual delete failures
        }
      }
    }

    // Send confirmation email to the user if we removed at least one record.
    if (removed > 0) {
      const siteUrl = (
        process.env.NEXT_PUBLIC_SITE_URL || "https://kaarshe.com"
      ).replace(/\/$/, "");
      const subject = "You have been unsubscribed from KAARSHE";
      const text =
        "You have been unsubscribed from the KAARSHE newsletter." +
        "\n\nYou will no longer receive email updates from us." +
        `\n\nIf this was a mistake, you can subscribe again any time at ${siteUrl}.`;

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
              <td style="font-size:22px;line-height:1.3;font-weight:800;color:#f9fafb;padding-bottom:8px;">You have been unsubscribed</td>
            </tr>
            <tr>
              <td style="font-size:14px;line-height:1.6;color:#d4d4d4;padding-bottom:16px;">We&apos;re sorry to see you go. Your email has been removed from the KAARSHE newsletter list and you will no longer receive these updates.</td>
            </tr>
            <tr>
              <td style="font-size:12px;line-height:1.6;color:#9ca3af;border-top:1px solid #1f2937;padding-top:16px;">If this was a mistake, you can subscribe again any time by visiting <a href="${siteUrl}" style="color:#f97316;text-decoration:none;">${siteUrl}</a>.</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

      try {
        await sendEmail({ to: email, subject, text, html });
      } catch {
        // ignore email failures
      }
    }

    return NextResponse.json({ ok: true, removed });
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
