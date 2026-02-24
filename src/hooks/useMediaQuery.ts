"use client";

import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string): boolean {
  const getServerSnapshot = () => false;

  const getSnapshot = () => window.matchMedia(query).matches;

  const subscribe = (onStoreChange: () => void) => {
    const media = window.matchMedia(query);
    const listener = () => onStoreChange();

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
