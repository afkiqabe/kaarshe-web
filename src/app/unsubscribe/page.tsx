"use client";

import { useState, type FormEvent } from "react";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export default function UnsubscribePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;

    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section size="lg" background="white" className="min-h-[60vh] flex items-center">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-4 py-2 text-xs font-semibold text-neutral-500 mb-2">
          <Icon name="unsubscribe" size="sm" className="text-accent-burgundy" />
          <span>Manage newsletter settings</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-primary">
          Unsubscribe from the newsletter
        </h1>
        <p className="text-primary/60 text-base md:text-lg max-w-lg mx-auto">
          Enter the email address you used to subscribe, and we&apos;ll remove it from future updates and announcements.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="flex-1 rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent-burgundy"
            required
            disabled={status === "loading"}
          />
          <Button
            type="submit"
            size="md"
            variant="primary"
            isLoading={status === "loading"}
            disabled={status === "loading"}
            className="px-6"
          >
            Unsubscribe
          </Button>
        </form>

        {status === "success" && (
          <p className="mt-4 text-sm text-accent-gold">
            You have been unsubscribed. It can take a short time for all emails to stop.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-sm text-accent-burgundy">
            We couldn&apos;t process that request. Please check the email and try again.
          </p>
        )}
      </div>
    </Section>
  );
}
