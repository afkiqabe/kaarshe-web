"use client";

import { useCallback, useEffect, useId, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils/cn";

interface NewsletterModalProps {
  enabled?: boolean;
  delayMs?: number;
  onlyOnHome?: boolean;
  title?: string;
  description?: string;
  emailPlaceholder?: string;
  buttonLabel?: string;
  successMessage?: string;
  endpoint?: string;
}

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterModal({
  enabled = true,
  delayMs = 800,
  onlyOnHome = true,
  title = "GET UPDATES",
  description = "Subscribe to receive monthly updates on newly released research, policy briefs, and economic insights.",
  emailPlaceholder = "you@example.com",
  buttonLabel = "Subscribe",
  successMessage = "Thank you for subscribing!",
  endpoint = "/api/newsletter/subscribe",
}: NewsletterModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status | "duplicate">("idle");

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    if (onlyOnHome && pathname !== "/") return;

    const timer = window.setTimeout(() => setIsOpen(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs, enabled, onlyOnHome, pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [close, isOpen]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    setStatus("loading");

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "modal" }),
      });

      if (!res.ok) {
        if (res.status === 409) {
          setStatus("duplicate");
        } else {
          setStatus("error");
        }
        return;
      }

      setStatus("success");
      setEmail("");
      window.setTimeout(() => close(), 900);
    } catch {
      setStatus("error");
    }
  };

  if (!enabled || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-60">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close newsletter modal"
        className="absolute inset-0 bg-black/60"
        onClick={() => close()}
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
                {title}
              </h3>
              <p id={descriptionId} className="text-sm text-primary/60">
                {description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => close()}
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
                placeholder={emailPlaceholder}
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
                {status === "success" ? "Subscribed!" : buttonLabel}
              </Button>
            </div>
            {status === "success" ? (
              <p className="text-center text-sm text-accent-gold font-semibold">
                {successMessage}
              </p>
            ) : status === "duplicate" ? (
              <p className="text-center text-sm text-accent-gold font-semibold">
                This email is already subscribed.
              </p>
            ) : status === "error" ? (
              <p className="text-center text-sm text-accent-burgundy font-semibold">
                Subscription failed. Please try again.
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}
