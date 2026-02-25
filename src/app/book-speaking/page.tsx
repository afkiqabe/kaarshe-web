import {
  BookSpeakingClient,
  type SpeakingFormatOption,
  type SpeakingRequestFormCopy,
  type SpeakingRequestSection,
  type SpeakingTopic,
} from "./BookSpeakingClient";
import { getWpPageBySlug } from "@/lib/wp";
import { acfString, acfStringArray } from "@/lib/wpAcf";

function coerceTopics(
  raw: unknown,
  fallback: SpeakingTopic[],
): SpeakingTopic[] {
  if (!Array.isArray(raw)) return fallback;

  const topics = raw
    .map((row) => {
      if (!row || typeof row !== "object") return null;
      const r = row as Record<string, unknown>;

      const title = acfString(r, "title") ?? "";
      const description = acfString(r, "description") ?? "";
      const icon = acfString(r, "icon") ?? "campaign";
      const bullets =
        acfStringArray(r, "bullets") ?? acfStringArray(r, "points") ?? [];

      if (!title) return null;
      return { title, description, icon, bullets } satisfies SpeakingTopic;
    })
    .filter(Boolean) as SpeakingTopic[];

  return topics.length ? topics : fallback;
}

function coerceFormatOptions(
  raw: unknown,
  fallback: SpeakingFormatOption[],
): SpeakingFormatOption[] {
  if (!Array.isArray(raw)) return fallback;

  const options = raw
    .map((row) => {
      if (!row || typeof row !== "object") return null;
      const r = row as Record<string, unknown>;

      const label =
        acfString(r, ["label", "title", "name"], "") ||
        acfString(r, ["format", "type"], "");
      const detail =
        acfString(r, ["detail", "duration", "subtitle"], "") ||
        acfString(r, ["description"], "");
      if (!label) return null;

      return {
        label,
        detail: detail || " ",
      } satisfies SpeakingFormatOption;
    })
    .filter(Boolean) as SpeakingFormatOption[];

  return options.length ? options : fallback;
}

export default async function BookSpeakingPage() {
  const fallbackHero = {
    title: "Book a Speaking Engagement",
    description:
      "Invite Kaarshe to speak at your conference, workshop, or leadership forum. We bring practical insights on governance, policy, and institution-building—tailored to your audience.",
  };

  const fallbackTopics: SpeakingTopic[] = [
    {
      icon: "campaign",
      title: "Public Speaking",
      description:
        "Engaging keynote-style talks designed to inspire and inform.",
      bullets: [
        "Leadership and governance",
        "Policy and institution-building",
        "Civic engagement",
      ],
    },
    {
      icon: "school",
      title: "Workshops",
      description:
        "Interactive sessions with frameworks, case studies, and tools.",
      bullets: [
        "Strategy and planning",
        "Stakeholder alignment",
        "Monitoring & learning",
      ],
    },
  ];

  const fallbackFormat: {
    title: string;
    description: string;
    options: SpeakingFormatOption[];
  } = {
    title: "Format options",
    description:
      "Choose the format that matches your audience and timeline. We can tailor content depth and interactivity.",
    options: [
      { label: "Keynote", detail: "30–60 min" },
      { label: "Workshop", detail: "2–4 hours" },
      { label: "Briefing", detail: "Private session" },
      { label: "Panel", detail: "45–75 min" },
    ],
  };

  const fallbackRequest: SpeakingRequestSection = {
    title: "Request speaking",
    description:
      "Share your event context and goals. We’ll reply quickly with availability and recommended format.",
    responseNote: "Typical response: 1–2 business days",
    submitLabel: "Send request",
    successLabel: "Request sent",
  };

  const fallbackForm: SpeakingRequestFormCopy = {
    organizationLabel: "Organization",
    organizationPlaceholder: "Organization name",
    emailLabel: "Email",
    emailPlaceholder: "you@organization.org",
    dateLabel: "Target date",
    formatLabel: "Format",
    notesLabel: "Notes",
    notesPlaceholder: "Tell us about the audience, goals, and context…",
  };

  const slug = process.env.WORDPRESS_BOOK_SPEAKING_PAGE_SLUG ?? "book-speaking";
  const wpPage = await getWpPageBySlug(slug);
  const acf = wpPage?.acf ?? null;

  const hero = {
    title:
      acfString(acf, "hero.title") ||
      acfString(acf, "page_title") ||
      fallbackHero.title,
    description:
      acfString(acf, "hero.description") ||
      acfString(acf, "page_description") ||
      fallbackHero.description,
  };

  const acfRecord: Record<string, unknown> | null =
    acf && typeof acf === "object" ? (acf as Record<string, unknown>) : null;
  const topics = coerceTopics(acfRecord?.topics, fallbackTopics);

  const formatTitle = acfString(
    acf,
    ["format.title", "format_options.title", "format_title"],
    fallbackFormat.title,
  );
  const formatDescription = acfString(
    acf,
    ["format.description", "format_options.description", "format_description"],
    fallbackFormat.description,
  );

  const formatOptionsRaw =
    acfRecord?.format_options &&
    typeof acfRecord.format_options === "object" &&
    acfRecord.format_options !== null
      ? (acfRecord.format_options as Record<string, unknown>).options
      : (() => {
          const formatGroup =
            acfRecord?.format &&
            typeof acfRecord.format === "object" &&
            acfRecord.format !== null
              ? (acfRecord.format as Record<string, unknown>)
              : null;

          return (
            acfRecord?.format_options_options ??
            acfRecord?.format_options ??
            formatGroup?.options
          );
        })();

  const formatOptions = coerceFormatOptions(
    formatOptionsRaw,
    fallbackFormat.options,
  );

  const request: SpeakingRequestSection = {
    title: acfString(
      acf,
      ["request.title", "request_section.title", "request_title"],
      fallbackRequest.title,
    ),
    description: acfString(
      acf,
      [
        "request.description",
        "request_section.description",
        "request_description",
      ],
      fallbackRequest.description,
    ),
    responseNote: acfString(
      acf,
      [
        "request.response_note",
        "request_section.response_note",
        "request_response_note",
      ],
      fallbackRequest.responseNote,
    ),
    submitLabel: acfString(
      acf,
      [
        "request.submit_label",
        "request_section.submit_label",
        "request_submit_label",
      ],
      fallbackRequest.submitLabel,
    ),
    successLabel: acfString(
      acf,
      [
        "request.success_label",
        "request_section.success_label",
        "request_success_label",
      ],
      fallbackRequest.successLabel,
    ),
  };

  const form: SpeakingRequestFormCopy = {
    organizationLabel: acfString(
      acf,
      [
        "form.organization_label",
        "form.organizationLabel",
        "form_organization_label",
      ],
      fallbackForm.organizationLabel,
    ),
    organizationPlaceholder: acfString(
      acf,
      [
        "form.organization_placeholder",
        "form.organizationPlaceholder",
        "form_organization_placeholder",
      ],
      fallbackForm.organizationPlaceholder,
    ),
    emailLabel: acfString(
      acf,
      ["form.email_label", "form.emailLabel", "form_email_label"],
      fallbackForm.emailLabel,
    ),
    emailPlaceholder: acfString(
      acf,
      [
        "form.email_placeholder",
        "form.emailPlaceholder",
        "form_email_placeholder",
      ],
      fallbackForm.emailPlaceholder,
    ),
    dateLabel: acfString(
      acf,
      ["form.date_label", "form.dateLabel", "form_date_label"],
      fallbackForm.dateLabel,
    ),
    formatLabel: acfString(
      acf,
      ["form.format_label", "form.formatLabel", "form_format_label"],
      fallbackForm.formatLabel,
    ),
    notesLabel: acfString(
      acf,
      ["form.notes_label", "form.notesLabel", "form_notes_label"],
      fallbackForm.notesLabel,
    ),
    notesPlaceholder: acfString(
      acf,
      [
        "form.notes_placeholder",
        "form.notesPlaceholder",
        "form_notes_placeholder",
      ],
      fallbackForm.notesPlaceholder,
    ),
  };

  return (
    <BookSpeakingClient
      hero={hero}
      topics={topics}
      format={{
        title: formatTitle,
        description: formatDescription,
        options: formatOptions,
      }}
      request={request}
      form={form}
    />
  );
}
