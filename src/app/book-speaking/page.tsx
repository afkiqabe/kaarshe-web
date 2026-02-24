"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
// import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

export default function BookSpeakingPage() {
  const topics = [
    {
      icon: "public",
      title: "Modern Governance",
      description:
        "How to build institutions that are fast, accountable, and trusted.",
      bullets: ["Metrics & evaluation", "Service delivery", "Trust-building"],
    },
    {
      icon: "shield",
      title: "Digital Resilience",
      description:
        "Security, sovereignty, and infrastructure for the digital state.",
      bullets: ["Threat modeling", "Procurement & risk", "Data governance"],
    },
    {
      icon: "domain",
      title: "Urban Policy",
      description:
        "Smart infrastructure that makes daily life easier—at scale.",
      bullets: ["Mobility & safety", "Climate adaptation", "Service access"],
    },
    {
      icon: "inventory_2",
      title: "Economic Resilience",
      description:
        "Supply chains, strategic autonomy, and risk in global markets.",
      bullets: ["Scenario planning", "Risk mapping", "Policy trade-offs"],
    },
  ] as const;

  const [formData, setFormData] = useState({
    organization: "",
    email: "",
    date: "",
    format: "Keynote",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setTimeout(() => setSubmitStatus("idle"), 3500);
    }, 900);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Section size="lg" className="pt-16">
      <div className="max-w-3xl">
        {/* <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Speaking", href: "/book-speaking" },
          ]}
          className="mb-6"
        /> */}
{/* 
        <span className="inline-block px-3 py-1 bg-accent-burgundy/10 text-accent-burgundy text-xs font-bold uppercase tracking-widest rounded">
          Resources
        </span> */}
        <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
          Speaking &amp; Workshops
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-primary/60 font-medium">
          Keynotes, briefings, and hands-on workshops for public leaders,
          research institutions, and mission-driven organizations.
        </p>
      </div>

      <section className="mt-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {topics.map((topic) => (
            <Card
              key={topic.title}
              hover
              className="group p-10 border border-primary/5 hover:border-accent-burgundy/25"
            >
              <CardContent>
                <div className="w-16 h-16 bg-accent-burgundy/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Icon
                    name={topic.icon}
                    className="text-accent-burgundy"
                    size="lg"
                    weight={500}
                  />
                </div>
                <h2 className="text-2xl font-bold mb-4 tracking-tight text-primary">
                  {topic.title}
                </h2>
                <p className="text-primary/60 leading-relaxed mb-6">
                  {topic.description}
                </p>
                <ul className="space-y-3">
                  {topic.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-center gap-3 text-sm font-semibold text-primary/80"
                    >
                      <Icon
                        name="check_circle"
                        className="text-accent-burgundy"
                        size="sm"
                        fill
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10">
          <Card
            className="relative overflow-hidden rounded-3xl bg-primary text-white border border-white/10"
            padding="none"
          >
            <div className="pointer-events-none absolute inset-0 opacity-20 [background:repeating-linear-gradient(135deg,rgba(255,255,255,0.12)_0px,rgba(255,255,255,0.12)_1px,transparent_1px,transparent_10px)]" />
            <div className="relative p-10">
              <div className="flex items-start justify-between gap-8 flex-col md:flex-row">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight">
                    Format options
                  </h3>
                  <p className="mt-3 text-white/75 max-w-2xl">
                    Choose the format that matches your audience and timeline.
                    We can tailor content depth and interactivity.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
                    Keynote
                  </p>
                  <p className="mt-2 font-bold text-white/60">30–60 min</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
                    Workshop
                  </p>
                  <p className="mt-2 font-bold text-white/60">2–4 hours</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
                    Briefing
                  </p>
                  <p className="mt-2 font-bold text-white/60">Private session</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
                    Panel
                  </p>
                  <p className="mt-2 font-bold text-white/60">45–75 min</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-10">
          <Card padding="lg" className="rounded-3xl border border-primary/10">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
              <div className="max-w-xl">
                <h2 className="text-2xl font-black tracking-tight">
                  Request speaking
                </h2>
                <p className="mt-4 leading-relaxed text-primary/60">
                  Share your event context and goals. We’ll reply quickly with
                  availability and recommended format.
                </p>

                <div className="mt-6 flex items-center gap-3 text-sm text-primary/60">
                  <span className="inline-flex items-center gap-2">
                    <Icon
                      name="schedule"
                      size="sm"
                      className="text-accent-burgundy"
                    />
                    Typical response: 1–2 business days
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-primary/50">
                        Organization
                      </label>
                      <input
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="Organization name"
                        type="text"
                        required
                        className="w-full bg-white border border-primary/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-accent-burgundy/20 focus:border-accent-burgundy transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-primary/50">
                        Email
                      </label>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@organization.org"
                        type="email"
                        required
                        className="w-full bg-white border border-primary/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-accent-burgundy/20 focus:border-accent-burgundy transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-primary/50">
                        Target date
                      </label>
                      <input
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        type="date"
                        className="w-full bg-white border border-primary/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-accent-burgundy/20 focus:border-accent-burgundy transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-primary/50">
                        Format
                      </label>
                      <select
                        name="format"
                        value={formData.format}
                        onChange={handleChange}
                        className="w-full bg-white border border-primary/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-accent-burgundy/20 focus:border-accent-burgundy transition-all appearance-none"
                      >
                        <option>Keynote</option>
                        <option>Workshop</option>
                        <option>Briefing</option>
                        <option>Panel</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/50">
                      Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Audience, theme, preferred topic, location/time zone, expected duration…"
                      rows={6}
                      className="w-full bg-white border border-primary/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-accent-burgundy/20 focus:border-accent-burgundy transition-all"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    isLoading={isSubmitting}
                  >
                    {submitStatus === "success"
                      ? "Request sent"
                      : "Submit request"}
                  </Button>

                  <p className="text-xs text-primary/50">
                    Prefer a general inquiry? Use the{" "}
                    <a
                      className="text-accent-burgundy font-bold hover:underline"
                      href="/contact"
                    >
                      Contact
                    </a>{" "}
                    page.
                  </p>
                </form>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </Section>
  );
}
