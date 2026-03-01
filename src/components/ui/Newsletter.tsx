"use client";

import { useState } from "react";
import { Button } from "./Button";
import { cn } from "@/lib/utils/cn";

interface NewsletterProps {
  variant?: "light" | "dark" | "primary";
  title?: string;
  description?: string;
  className?: string;
}

const variants = {
  light: {
    container: "bg-gray-100",
    title: "text-primary",
    description: "text-primary/60",
    input: "bg-white border-gray-300",
    button: "bg-primary text-white hover:bg-primary/90",
  },
  dark: {
    container: "bg-primary",
    title: "text-white",
    description: "text-white/70",
    input: "bg-white/10 border-white/20 text-white placeholder:text-white/40",
    button: "bg-accent-burgundy text-white hover:bg-accent-burgundy/90",
  },
  primary: {
    container: "bg-primary text-white",
    title: "text-white",
    description: "text-white/70",
    input: "bg-white/10 border-white/20 text-white placeholder:text-white/40",
    button: "bg-accent-burgundy hover:bg-accent-burgundy/90",
  },
};

export function Newsletter({
  variant = "light",
  title = "Stay Informed",
  description = "Subscribe to receive monthly updates on newly released research, policy briefs, and economic insights directly to your inbox.",
  className,
}: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "duplicate"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "section" }),
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
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
    }
  };

  const styles = variants[variant];

  return (
    <section className={cn("py-16 px-6 lg:px-20", styles.container, className)}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className={cn("text-3xl font-bold mb-4", styles.title)}>{title}</h2>
        <p className={cn("mb-8 max-w-xl mx-auto text-lg", styles.description)}>
          {description}
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className={cn(
              "flex-1 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-accent-burgundy transition-all",
              styles.input,
            )}
            required
            disabled={status === "loading" || status === "success"}
          />
          <Button
            type="submit"
            variant="primary"
            className={cn("px-8 py-3", styles.button)}
            isLoading={status === "loading"}
            disabled={status === "loading" || status === "success"}
          >
            {status === "success" ? "Subscribed!" : "Subscribe"}
          </Button>
        </form>
        {status === "success" && (
          <p className="mt-4 text-sm text-accent-gold">
            Thank you for subscribing!
          </p>
        )}
        {status === "duplicate" && (
          <p className="mt-4 text-sm text-accent-gold">
            This email is already subscribed to the newsletter.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-sm text-accent-burgundy">
            Subscription failed. Please try again.
          </p>
        )}
      </div>
    </section>
  );
}
