"use client";

import { cn } from "@/lib/utils/cn";
import { Icon } from "./Icon";
import { Button } from "./Button";

interface ResearchDocumentProps {
  title: string;
  description: string;
  category: string;
  categoryColor?: "burgundy" | "blue" | "emerald";
  date: string;
  author: string;
  readTime: string;
  downloadUrl: string;
  isSaved?: boolean;
  onToggleSave?: () => void;
  className?: string;
}

const categoryColors = {
  burgundy: "text-accent-burgundy bg-accent-burgundy/10",
  blue: "text-blue-600 bg-blue-50",
  emerald: "text-emerald-600 bg-emerald-50",
};

export function ResearchDocument({
  title,
  description,
  category,
  categoryColor = "burgundy",
  date,
  author,
  readTime,
  downloadUrl,
  isSaved = false,
  onToggleSave,
  className,
}: ResearchDocumentProps) {
  return (
    <div
      className={cn(
        "document-row group flex flex-col md:flex-row items-start md:items-center justify-between",
        "p-6 bg-white border-b border-neutral-100 transition-all first:rounded-t-xl last:rounded-b-xl last:border-b-0",
        className,
      )}
    >
      <div className="flex-1 pr-8">
        <div className="flex items-center gap-3 mb-2">
          <span
            className={cn(
              "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded",
              categoryColors[categoryColor],
            )}
          >
            {category}
          </span>
          <span className="text-xs text-neutral-400 font-medium">
            Published {date}
          </span>
        </div>
        <h3 className="text-xl font-bold text-primary group-hover:text-accent-burgundy transition-colors mb-2">
          {title}
        </h3>
        <p className="text-neutral-500 text-sm line-clamp-2 max-w-2xl mb-4 md:mb-0">
          {description}
        </p>
        <div className="flex items-center gap-4 mt-3 text-xs font-semibold text-neutral-400">
          <span className="flex items-center gap-1">
            <Icon name="person" size="sm" /> {author}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="timer" size="sm" /> {readTime}
          </span>
        </div>
      </div>
      <div className="mt-6 md:mt-0 flex items-center gap-3 shrink-0">
        <Button
          variant="primary"
          size="md"
          className="bg-accent-burgundy hover:bg-[#600018] text-white px-6 py-2.5"
          type="button"
          onClick={() => {
            if (!downloadUrl || downloadUrl === "#") return;
            if (typeof window !== "undefined") {
              window.open(downloadUrl, "_blank", "noopener,noreferrer");
            }
          }}
        >
          <Icon name="download" size="sm" className="mr-2" />
          Download PDF
        </Button>
        <button
          type="button"
          onClick={onToggleSave}
          className={cn(
            "p-2.5 border rounded-lg transition-all",
            isSaved
              ? "text-accent-burgundy border-accent-burgundy/40 bg-accent-burgundy/5"
              : "text-neutral-400 hover:text-primary border-transparent hover:border-neutral-200",
          )}
          aria-pressed={isSaved}
          aria-label={isSaved ? "Unsave document" : "Save document"}
        >
          <Icon name="bookmark" size="md" />
        </button>
      </div>
    </div>
  );
}
