'use client'

import { useState } from 'react'
import { Section } from '@/components/layout/Section'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Newsletter } from '@/components/ui/Newsletter'
import Image from 'next/image'
import { contactPageContent } from '@/lib/constants'

export default function ContactPage() {
  const { hero, form, office, emails, socialLinks } = contactPageContent
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setTimeout(() => setSubmitStatus('idle'), 3000)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-primary"></div>
          <div className="h-full w-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <Breadcrumbs items={hero.breadcrumbs} className="justify-center mb-6 text-white/60" />
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            {hero.title}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {hero.description}
          </p>
        </div>
      </section>

      {/* Main Content: Form & Info Grid */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Contact Form Column */}
          <div className="space-y-8">
            <div className="border-b border-primary/10 pb-6">
              <h2 className="text-3xl font-bold tracking-tight mb-2">{form.title}</h2>
              <p className="text-primary/60">{form.description}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-primary/60">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Jane"
                    required
                    className="w-full bg-white border border-primary/10 rounded-lg p-4 focus:ring-2 focus:ring-accent-burgundy/20 focus:border-accent-burgundy transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-primary/60">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                    className="w-full bg-white border border-primary/10 rounded-lg p-4 focus:ring-2 focus:ring-accent-burgundy/20 focus:border-accent-burgundy transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-primary/60">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    required
                    className="w-full bg-white border border-primary/10 rounded-lg p-4 focus:ring-2 focus:ring-accent-burgundy/20 focus:border-accent-burgundy transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-primary/60">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full bg-white border border-primary/10 rounded-lg p-4 focus:ring-2 focus:ring-accent-burgundy/20 focus:border-accent-burgundy transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-primary/60">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-white border border-primary/10 rounded-lg p-4 focus:ring-2 focus:ring-accent-burgundy/20 focus:border-accent-burgundy transition-all appearance-none"
                >
                  <option value="general">General Inquiry</option>
                  <option value="press">Press & Media</option>
                  <option value="scheduling">Scheduling Request</option>
                  <option value="feedback">Community Feedback</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-primary/60">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows={6}
                  required
                  className="w-full bg-white border border-primary/10 rounded-lg p-4 focus:ring-2 focus:ring-accent-burgundy/20 focus:border-accent-burgundy transition-all"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full bg-accent-burgundy hover:bg-accent-burgundy/90 text-white py-5 text-lg shadow-lg shadow-accent-burgundy/20"
                isLoading={isSubmitting}
              >
                {submitStatus === 'success' ? 'Message Sent!' : 'Send Message'}
                {!isSubmitting && submitStatus !== 'success' && (
                  <Icon name="send" size="sm" className="ml-2" />
                )}
              </Button>
            </form>
          </div>

          {/* Office Details Column */}
          <div className="lg:sticky lg:top-32 space-y-12 bg-primary/5 p-8 md:p-12 rounded-2xl border border-primary/10">
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <Icon name="location_on" className="text-accent-burgundy" />
                {office.title}
              </h3>
              <div className="h-48 w-full rounded-xl overflow-hidden grayscale contrast-125 mb-4 relative">
                <Image
                  src={office.mapImage}
                  alt="Office location map"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-primary/70 leading-relaxed">
                {office.address.street}<br />
                {office.address.city}, {office.address.state} {office.address.zip}<br />
                {office.address.country}
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <Icon name="alternate_email" className="text-accent-burgundy" />
                Email Communications
              </h3>
              <div className="grid gap-4">
                {emails.map((item, index) => (
                  <a
                    key={index}
                    href={`mailto:${item.email}`}
                    className="group flex items-center justify-between p-4 bg-white rounded-lg border border-primary/5 hover:border-accent-burgundy transition-colors"
                  >
                    <span className="font-medium">{item.label}</span>
                    <span className="text-accent-burgundy opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                      {item.email}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary/40">
                Connect Socially
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-12 flex items-center justify-center rounded-full bg-primary text-white hover:bg-accent-burgundy transition-all"
                    aria-label={link.platform}
                  >
                    <Icon name={link.icon} size="md" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Newsletter Block */}
      <Newsletter variant="primary" />
    </>
  )
}