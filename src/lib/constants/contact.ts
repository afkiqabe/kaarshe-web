export const contactPageContent = {
  hero: {
    title: 'Connect with the Office of Kaarshe.',
    description: 'We are dedicated to accessibility, listening to your concerns, and serving the community with transparency.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  form: {
    title: 'Send a Message',
    description: 'Fill out the form below and our office will respond within 48 business hours.',
    fields: {
      firstName: { label: 'First Name', type: 'text', placeholder: 'Jane', required: true },
      lastName: { label: 'Last Name', type: 'text', placeholder: 'Doe', required: true },
      email: { label: 'Email Address', type: 'email', placeholder: 'jane@example.com', required: true },
      phone: { label: 'Phone Number', type: 'tel', placeholder: '+1 (555) 123-4567', required: false },
      subject: {
        label: 'Subject',
        type: 'select',
        options: [
          { label: 'General Inquiry', value: 'general' },
          { label: 'Press & Media', value: 'press' },
          { label: 'Scheduling Request', value: 'scheduling' },
          { label: 'Community Feedback', value: 'feedback' },
        ],
        required: true,
      },
      message: { label: 'Your Message', type: 'textarea', placeholder: 'How can we help you?', required: true },
    },
  },
  office: {
    title: 'Headquarters',
    address: {
      street: '1200 Pennsylvania Avenue NW',
      city: 'Washington',
      state: 'DC',
      zip: '20004',
      country: 'United States',
    },
    mapImage: '/images/contact/map.jpg',
  },
  emails: [
    { label: 'General Inquiries', email: 'info@kaarshe.gov' },
    { label: 'Press & Media', email: 'press@kaarshe.gov' },
  ],
  socialLinks: [
    { platform: 'Twitter/X', icon: 'x', url: 'https://twitter.com/kaarshe' },
    { platform: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/company/kaarshe' },
    { platform: 'Website', icon: 'public', url: 'https://kaarshe.gov' },
  ],
}