import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    payload = null;
  }

  const body = (payload ?? {}) as {
    slug?: string;
    paths?: string[];
    tags?: string[];
  };
  const slug = typeof body.slug === "string" ? body.slug : null;
  const paths = Array.isArray(body.paths)
    ? body.paths.filter((p) => typeof p === "string")
    : [];
  const tags = Array.isArray(body.tags)
    ? body.tags.filter((t) => typeof t === "string")
    : [];

  if (!slug && paths.length === 0 && tags.length === 0) {
    return NextResponse.json(
      { message: "Missing slug, paths, or tags" },
      { status: 400 },
    );
  }

  try {
    if (slug) {
      revalidatePath(`/blog/${slug}`);
      revalidatePath("/blog");
      revalidateTag(`wp:post:${slug}`, "default");
    }

    for (const path of paths) {
      revalidatePath(path);
    }

    for (const tag of tags) {
      revalidateTag(tag, "default");
    }

    // Broad tags for safety
    revalidateTag("wp:posts", "default");
    revalidateTag("wp:categories", "default");

    return NextResponse.json({ revalidated: true, slug, paths, tags });
  } catch {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 },
    );
  }
}
