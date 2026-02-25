"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

type Status = "idle" | "loading" | "success" | "error";

export function FooterNewsletterFormClient({
  emailPlaceholder,
  buttonLabel,
}: {
  emailPlaceholder: string;
  buttonLabel: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
      window.setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-center max-w-2xl mx-auto"
    >
      <div className="relative w-full sm:flex-1 sm:max-w-xl">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={emailPlaceholder}
          className="w-full rounded-xl bg-black/20 border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent-burgundy/40"
          aria-label="Email"
          disabled={status === "loading" || status === "success"}
          required
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
          <Icon name="mail" size="sm" />
        </span>
      </div>
      <Button
        type="submit"
        variant="secondary"
        size="md"
        className="sm:self-stretch whitespace-nowrap cursor-pointer hover:bg-white/50"
        isLoading={status === "loading"}
        disabled={status === "loading" || status === "success"}
      >
        {status === "success" ? "Subscribed!" : buttonLabel}
      </Button>

      {status === "error" ? (
        <p className="text-xs text-accent-gold sm:basis-full sm:text-center">
          Subscription failed. Try again.
        </p>
      ) : null}
    </form>
  );
}
