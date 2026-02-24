"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils/cn";

interface NewsletterModalProps {
  enabled?: boolean;
  delayMs?: number;
}

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterModal({
  enabled = true,
  delayMs = 800,
}: NewsletterModalProps) {
  const titleId = useId();
  const descriptionId = useId();

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (!enabled) return;

    const timer = window.setTimeout(() => setIsOpen(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs, enabled]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close("dismiss");
      }
    };

    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const close = (_reason: "dismiss" | "subscribed") => {
    setIsOpen(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    setStatus("loading");

    // TODO: Replace with real API / WordPress integration later
    window.setTimeout(() => {
      setStatus("success");
      setEmail("");
      window.setTimeout(() => close("subscribed"), 900);
    }, 900);
  };

  if (!enabled || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close newsletter modal"
        className="absolute inset-0 bg-black/60"
        onClick={() => close("dismiss")}
      />

      {/* Dialog */}
      <div className="relative h-full w-full flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className={cn(
            "w-full max-w-lg rounded-2xl border border-primary/10 bg-background-light text-primary shadow-2xl",
            "p-6 sm:p-8",
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 text-center">
              <h3 id={titleId} className="text-2xl font-black tracking-tight">
                GET UPDATES
              </h3>
              <p id={descriptionId} className="text-sm text-primary/60">
                Subscribe to receive monthly updates on newly released research,
                policy briefs, and economic insights.
              </p>
            </div>

            <button
              type="button"
              onClick={() => close("dismiss")}
              className="shrink-0 size-10 rounded-full border border-primary/10 hover:bg-primary/5 transition-colors inline-flex items-center justify-center"
              aria-label="Close"
            >
              <Icon name="close" size="md" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-burgundy/20 focus:border-accent-burgundy transition-all"
                required
                disabled={status === "loading" || status === "success"}
                autoFocus
              />
            </div>

            <div className="flex items-center justify-center">
              <Button
                type="submit"
                variant="primary"
                className="rounded-xl px-6 py-3 text-sm"
                isLoading={status === "loading"}
                disabled={status === "loading" || status === "success"}
              >
                {status === "success" ? "Subscribed!" : "Subscribe"}
              </Button>
            </div>

            {status === "success" ? (
              <p className="text-center text-sm text-accent-gold font-semibold">
                Thank you for subscribing!
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}
