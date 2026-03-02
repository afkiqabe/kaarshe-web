import { NextResponse } from "next/server";
import { getWpAuthHeaders } from "@/lib/wp";
import { sendEmail } from "@/lib/email";

export const runtime = "nodejs";

type BroadcastBody = {
  type?: "blog" | "research" | "generic";
  title?: string;
  url?: string;
  excerpt?: string;
};

export async function POST(req: Request) {
  const secret = process.env.NEWSLETTER_BROADCAST_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "Missing NEWSLETTER_BROADCAST_SECRET" },
      { status: 500 },
    );
  }

  const headerSecret = req.headers.get("x-broadcast-secret");
  if (!headerSecret || headerSecret !== secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as BroadcastBody | null;

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
    // Fetch all subscribers (paginate through all pages)
    const emails: string[] = [];
    let page = 1;
    let totalPages = 1;

    do {
      const res = await fetch(
        `${collectionUrl}?per_page=100&page=${page}`,
        { headers: { ...authHeaders } },
      );

      if (!res.ok) break;

      const pageItems = (await res.json().catch(() => [])) as {
        id: number;
        title?: { rendered?: string };
      }[];

      if (Array.isArray(pageItems)) {
        for (const item of pageItems) {
          const email = item?.title?.rendered?.trim();
          if (email) emails.push(email);
        }
      }

      totalPages = Number(res.headers.get("x-wp-totalpages") ?? "1");
      page += 1;
    } while (page <= totalPages);

    if (emails.length === 0) {
      return NextResponse.json({ ok: true, sent: 0 });
    }

    const siteUrl = (
      process.env.NEXT_PUBLIC_SITE_URL || "https://kaarshe.com"
    ).replace(/\/$/, "");

    const kind = body?.type ?? "generic";
    const contentTitle = body?.title ??
      (kind === "blog"
        ? "New blog post from KAARSHE"
        : kind === "research"
          ? "New research published by KAARSHE"
          : "New update from KAARSHE");

    const targetUrl = body?.url || siteUrl;
    const excerpt = body?.excerpt ?? "Visit the site to read the full update.";

    const subject =
      kind === "blog"
        ? `New blog post: ${contentTitle}`
        : kind === "research"
          ? `New research published: ${contentTitle}`
          : contentTitle;

    const text =
      `${contentTitle}` +
      `\n\n${excerpt}` +
      `\n\nRead more: ${targetUrl}` +
      `\n\nIf you no longer want to receive these emails, you can unsubscribe from any newsletter email we send.`;

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
              <td style="font-size:22px;line-height:1.3;font-weight:800;color:#f9fafb;padding-bottom:8px;">${contentTitle}</td>
            </tr>
            <tr>
              <td style="font-size:14px;line-height:1.6;color:#d4d4d4;padding-bottom:16px;">${excerpt}</td>
            </tr>
            <tr>
              <td style="padding-top:4px;">
                <a href="${targetUrl}" style="display:inline-block;background:#f97316;color:#0b0b0b;font-weight:600;font-size:14px;padding:10px 18px;border-radius:999px;text-decoration:none;">Read the full ${kind === "blog" ? "article" : kind === "research" ? "research" : "update"}</a>
              </td>
            </tr>
            <tr>
              <td style="padding-top:20px;font-size:11px;line-height:1.6;color:#9ca3af;border-top:1px solid #1f2937;margin-top:16px;">You are receiving this email because you subscribed to the KAARSHE newsletter. If you no longer wish to receive these emails, you can use the unsubscribe link in any of our newsletter messages.</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

    // Send in batches to avoid putting all emails in a single message
    const batchSize = 50;
    let sent = 0;

    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      try {
        await sendEmail({ to: batch, subject, text, html });
        sent += batch.length;
      } catch {
        // Continue with remaining batches even if one fails
      }
    }

    return NextResponse.json({ ok: true, sent });
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
