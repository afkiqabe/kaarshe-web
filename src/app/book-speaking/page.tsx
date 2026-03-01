import {
  BookSpeakingClient,
  type SpeakingFormatOption,
  type SpeakingRequestFormCopy,
  type SpeakingRequestSection,
  type SpeakingTopic,
} from "./BookSpeakingClient";

export default function BookSpeakingPage() {
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

  const hero = fallbackHero;
  const topics = fallbackTopics;
  const formatTitle = fallbackFormat.title;
  const formatDescription = fallbackFormat.description;
  const formatOptions = fallbackFormat.options;
  const request: SpeakingRequestSection = fallbackRequest;
  const form: SpeakingRequestFormCopy = fallbackForm;

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
