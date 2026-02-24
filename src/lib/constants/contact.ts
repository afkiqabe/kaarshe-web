export const contactPageContent = {
  hero: {
    title: "Connect with the Office of Kaarshe",
    description:
      "We are dedicated to accessibility, listening to your concerns, and serving the community with transparency.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Contact", href: "/contact" },
    ],
  },
  form: {
    title: "Send a Message",
    description:
      "Fill out the form below and our office will respond within 48 business hours.",
    fields: {
      firstName: {
        label: "First Name",
        type: "text",
        placeholder: "Jane",
        required: true,
      },
      lastName: {
        label: "Last Name",
        type: "text",
        placeholder: "Doe",
        required: true,
      },
      email: {
        label: "Email Address",
        type: "email",
        placeholder: "jane@example.com",
        required: true,
      },
      phone: {
        label: "Phone Number",
        type: "tel",
        placeholder: "+1 (555) 123-4567",
        required: false,
      },
      subject: {
        label: "Subject",
        type: "select",
        options: [
          { label: "General Inquiry", value: "general" },
          { label: "Press & Media", value: "press" },
          { label: "Scheduling Request", value: "scheduling" },
          { label: "Community Feedback", value: "feedback" },
        ],
        required: true,
      },
      message: {
        label: "Your Message",
        type: "textarea",
        placeholder: "How can we help you?",
        required: true,
      },
    },
  },
  office: {
    title: "Headquarter",
    address: {
      name: "Kaarshe",
      street: "Makka Al-Mukarama",
      city: "Mogadishu",
      state: "",
      zip: "",
      country: "Somalia",
    },
    mapEmbedUrl:
      "https://www.google.com/maps?q=maka+al+mukarama+street+mogadishu&output=embed",
    mapLinkUrl:
      "https://www.google.com/maps/search/maka+al+mukarama+street+mogadishu/@2.0479155,45.3160702,4421m/data=!3m2!1e3!4b1?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D",
  },
  emails: [],
  socialLinks: [
    { platform: "Twitter/X", icon: "x", url: "https://twitter.com/kaarshe" },
    {
      platform: "LinkedIn",
      icon: "linkedin",
      url: "https://linkedin.com/company/kaarshe",
    },
    { platform: "Website", icon: "public", url: "https://kaarshe.gov" },
  ],
};
