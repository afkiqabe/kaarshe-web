"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { Card, CardContent } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

export type SpeakingTopic = {
  icon: string;
  title: string;
  description: string;
  bullets: string[];
};

export type SpeakingFormatOption = {
  label: string;
  detail: string;
};

export type SpeakingRequestSection = {
  title: string;
  description: string;
  responseNote: string;
  submitLabel: string;
  successLabel: string;
};

export type SpeakingRequestFormCopy = {
  organizationLabel: string;
  organizationPlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  dateLabel: string;
  formatLabel: string;
  notesLabel: string;
  notesPlaceholder: string;
};

export function BookSpeakingClient({
  hero,
  topics,
  format,
  request,
  form,
}: {
  hero: { title: string; description: string };
  topics: SpeakingTopic[];
  format: {
    title: string;
    description: string;
    options: SpeakingFormatOption[];
  };
  request: SpeakingRequestSection;
  form: SpeakingRequestFormCopy;
}) {
  const defaultFormatOptions: SpeakingFormatOption[] = [
    { label: "Keynote", detail: "30–60 min" },
    { label: "Workshop", detail: "2–4 hours" },
    { label: "Briefing", detail: "Private session" },
    { label: "Panel", detail: "45–75 min" },
  ];

  const formatOptions = format.options.length
    ? format.options
    : defaultFormatOptions;
  const initialFormat = formatOptions[0]?.label || "Keynote";

  const defaultForm: SpeakingRequestFormCopy = {
    organizationLabel: "Organization",
    organizationPlaceholder: "Organization name",
    emailLabel: "Email",
    emailPlaceholder: "you@organization.org",
    dateLabel: "Target date",
    formatLabel: "Format",
    notesLabel: "Notes",
    notesPlaceholder: "Tell us about the audience, goals, and context…",
  };

  const formCopy: SpeakingRequestFormCopy = {
    organizationLabel: form.organizationLabel || defaultForm.organizationLabel,
    organizationPlaceholder:
      form.organizationPlaceholder || defaultForm.organizationPlaceholder,
    emailLabel: form.emailLabel || defaultForm.emailLabel,
    emailPlaceholder: form.emailPlaceholder || defaultForm.emailPlaceholder,
    dateLabel: form.dateLabel || defaultForm.dateLabel,
    formatLabel: form.formatLabel || defaultForm.formatLabel,
    notesLabel: form.notesLabel || defaultForm.notesLabel,
    notesPlaceholder: form.notesPlaceholder || defaultForm.notesPlaceholder,
  };

  const [formData, setFormData] = useState({
    organization: "",
    email: "",
    date: "",
    format: initialFormat,
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
        <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
          {hero.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-primary/60 font-medium">
          {hero.description}
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
                    {format.title}
                  </h3>
                  <p className="mt-3 text-white/75 max-w-2xl">
                    {format.description}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {formatOptions.map((opt) => (
                  <div
                    key={opt.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
                      {opt.label}
                    </p>
                    <p className="mt-2 font-bold text-white/60">{opt.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-10">
          <Card padding="lg" className="rounded-3xl border border-primary/10">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
              <div className="max-w-xl">
                <h2 className="text-2xl font-black tracking-tight">
                  {request.title}
                </h2>
                <p className="mt-4 leading-relaxed text-primary/60">
                  {request.description}
                </p>

                <div className="mt-6 flex items-center gap-3 text-sm text-primary/60">
                  <span className="inline-flex items-center gap-2">
                    <Icon
                      name="schedule"
                      size="sm"
                      className="text-accent-burgundy"
                    />
                    {request.responseNote}
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-primary/50">
                        {formCopy.organizationLabel}
                      </label>
                      <input
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder={formCopy.organizationPlaceholder}
                        type="text"
                        required
                        className="w-full bg-white border border-primary/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-accent-burgundy/20 focus:border-accent-burgundy transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-primary/50">
                        {formCopy.emailLabel}
                      </label>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={formCopy.emailPlaceholder}
                        type="email"
                        required
                        className="w-full bg-white border border-primary/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-accent-burgundy/20 focus:border-accent-burgundy transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-primary/50">
                        {formCopy.dateLabel}
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
                        {formCopy.formatLabel}
                      </label>
                      <select
                        name="format"
                        value={formData.format}
                        onChange={handleChange}
                        className="w-full bg-white border border-primary/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-accent-burgundy/20 focus:border-accent-burgundy transition-all"
                      >
                        {formatOptions.map((opt) => (
                          <option key={opt.label}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/50">
                      {formCopy.notesLabel}
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={5}
                      placeholder={formCopy.notesPlaceholder}
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
                      ? request.successLabel
                      : request.submitLabel}
                  </Button>
                </form>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </Section>
  );
}
