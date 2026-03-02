"use client";

import { useEffect, useState } from "react";
import { Section } from "@/components/layout/Section";
import { Icon } from "@/components/ui/Icon";

export default function UnsubscribePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [linkEmail, setLinkEmail] = useState<string | null>(null);
  const [isFromAutoLink, setIsFromAutoLink] = useState(false);

  const unsubscribeByEmail = async (targetEmail: string) => {
    if (!targetEmail.trim()) return;
    if (status === "loading") return;

    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail }),
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

  // If the page is opened with ?email=...&auto=1, auto-unsubscribe that email.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    const qpEmail = url.searchParams.get("email")?.trim() ?? "";
    const auto = url.searchParams.get("auto");

    if (qpEmail && !linkEmail) {
      setEmail(qpEmail);
      setLinkEmail(qpEmail);
    }

    if (qpEmail && auto === "1") {
      setIsFromAutoLink(true);
      if (status === "idle") {
        void unsubscribeByEmail(qpEmail);
      }
    }
  }, [linkEmail, status]);

  const isAuto = isFromAutoLink && !!linkEmail;

  return (
    <Section
      size="lg"
      background="white"
      className="min-h-[60vh] flex items-center"
    >
      <div className="max-w-xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-4 py-2 text-xs font-semibold text-neutral-500 mb-2">
          <Icon name="unsubscribe" size="sm" className="text-accent-burgundy" />
          <span>Manage newsletter settings</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-primary">
          {isAuto
            ? status === "success"
              ? "You have been unsubscribed"
              : "Unsubscribing from the newsletter"
            : "Manage newsletter subscription"}
        </h1>
        <p className="text-primary/60 text-base md:text-lg max-w-lg mx-auto">
          {isAuto
            ? status === "success"
              ? "You have been unsubscribed from the KAARSHE newsletter. We are sorry to see you go."
              : status === "error"
                ? "We couldn&apos;t process your unsubscribe request. Please try again later."
                : "We are processing your unsubscribe request. You don&apos;t need to do anything else."
            : "To unsubscribe, please use the unsubscribe link included in one of our newsletter emails."}
        </p>
      </div>
    </Section>
  );
}
