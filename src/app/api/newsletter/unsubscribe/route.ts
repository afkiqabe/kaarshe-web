import { NextResponse } from "next/server";
import { getWpAuthHeaders } from "@/lib/wp";

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

    if (!Array.isArray(subscribers) || subscribers.length === 0) {
      // For privacy, still return ok=true even if nothing was removed.
      return NextResponse.json({ ok: true, removed: 0 });
    }

    let removed = 0;

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
