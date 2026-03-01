"use client";

import { useState } from "react";
import { Icon } from "./Icon";

type ShareButtonsProps = {
  url: string;
  title: string;
};

export function ShareButtons({ url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
          Copy to share this article
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="size-10 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
            aria-label="Copy link to clipboard"
          >
            <Icon name="link" size="sm" />
          </button>
        </div>
      </div>
      {copied && (
        <span className="text-[11px] text-accent-burgundy font-medium">
          Link copied to clipboard
        </span>
      )}
    </div>
  );
}
