"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@/components/ui/Pagination";

function buildQueryString(
  current: URLSearchParams,
  next: Record<string, string | number | null | undefined>,
) {
  const params = new URLSearchParams(current);
  for (const [key, value] of Object.entries(next)) {
    if (value === null || value === undefined || value === "") {
      params.delete(key);
      continue;
    }
    params.set(key, String(value));
  }
  const query = params.toString();
  return query ? `?${query}` : "";
}

export function BlogPaginationClient({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const current = useMemo(
    () => new URLSearchParams(searchParams?.toString() ?? ""),
    [searchParams],
  );

  if (totalPages <= 1) return null;

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page) => {
        const safePage = Math.max(1, Math.min(totalPages, page));
        router.push(`/blog${buildQueryString(current, { page: safePage })}`);
      }}
    />
  );
}
