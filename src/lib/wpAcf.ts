export type AcfRecord = Record<string, unknown>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function acfGet<T>(
  acf: unknown,
  paths: string | string[],
  fallback: T,
): T {
  if (!acf || !isRecord(acf)) return fallback;

  const list = Array.isArray(paths) ? paths : [paths];
  for (const path of list) {
    const parts = path.split(".").filter(Boolean);
    let current: unknown = acf;

    for (const part of parts) {
      if (!isRecord(current) || !(part in current)) {
        current = undefined;
        break;
      }
      current = current[part];
    }

    if (current !== undefined && current !== null) {
      return current as T;
    }
  }

  return fallback;
}

export function acfString(
  acf: unknown,
  paths: string | string[],
  fallback = "",
) {
  const value = acfGet<unknown>(acf, paths, undefined);
  if (typeof value !== "string") return fallback;
  return value.trim() ? value : fallback;
}

export function acfStringArray(
  acf: unknown,
  paths: string | string[],
  fallback: string[] = [],
) {
  const value = acfGet<unknown>(acf, paths, fallback);
  const coerced = coerceStringList(value);
  return coerced ?? fallback;
}

export function coerceStringList(
  value: unknown,
  options?: {
    keys?: string[];
  },
): string[] | null {
  if (!Array.isArray(value)) return null;

  const strings = value.filter((v) => typeof v === "string") as string[];
  if (strings.length === value.length) return strings;

  const keys = options?.keys ?? ["text", "value", "label", "title", "name"];
  const fromObjects: string[] = [];

  for (const row of value) {
    if (!isRecord(row)) continue;

    let picked: string | null = null;

    for (const key of keys) {
      const candidate = row[key];
      if (typeof candidate === "string" && candidate.trim()) {
        picked = candidate;
        break;
      }
    }

    if (!picked) {
      const firstString = Object.values(row).find(
        (v) => typeof v === "string" && v.trim(),
      );
      if (typeof firstString === "string") picked = firstString;
    }

    if (picked) fromObjects.push(picked);
  }

  return fromObjects.length ? fromObjects : null;
}

export function acfStringList(
  acf: unknown,
  paths: string | string[],
  fallback: string[] = [],
  options?: { keys?: string[] },
) {
  const value = acfGet<unknown>(acf, paths, fallback);
  return coerceStringList(value, options) ?? fallback;
}

export type AcfImage =
  | string
  | {
      url?: string;
      src?: string;
      alt?: string;
    };

export function acfImage(
  acf: unknown,
  paths: string | string[],
  fallback?: { src: string; alt: string },
) {
  const value = acfGet<unknown>(acf, paths, undefined);

  if (typeof value === "string" && value) {
    return { src: value, alt: fallback?.alt ?? "" };
  }

  if (isRecord(value)) {
    const src =
      (typeof value.url === "string" && value.url) ||
      (typeof value.src === "string" && value.src) ||
      "";
    const alt =
      typeof value.alt === "string" ? value.alt : (fallback?.alt ?? "");
    if (src) return { src, alt };
  }

  return fallback;
}

export function acfFileUrl(
  acf: unknown,
  paths: string | string[],
  fallback = "",
) {
  const value = acfGet<unknown>(acf, paths, fallback);
  if (typeof value === "string") return value;
  if (isRecord(value) && typeof value.url === "string") return value.url;
  return fallback;
}
