import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function PrivacyPolicyPage() {
  return (
    <Section className="pt-16" size="lg">
      <div className="max-w-4xl">
        <SectionHeading
          // badge="Legal"
          title="Privacy Policy"
          // description="How we collect, use, and protect information on this website."
        />

        <div className="mt-10 space-y-8 text-primary/70 leading-relaxed">
          <section className="space-y-2">
            <div className="text-lg md:text-xl font-bold text-primary">
              1. Introduction
            </div>
            <p>
              Welcome to Kaarshe.com. Your privacy is important to us. This
              Privacy Policy explains how we collect, use, protect, and disclose
              information when you visit our website.
            </p>
            <p>
              By using Kaarshe.com, you agree to the terms outlined in this
              Privacy Policy.
            </p>
          </section>

          <section className="space-y-3">
            <div className="text-lg md:text-xl font-bold text-primary">
              2. Information We Collect
            </div>
            <p>We may collect the following types of information:</p>

            <div className="space-y-2">
              <div className="text-sm md:text-base font-bold text-primary">
                a) Personal Information
              </div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Name</li>
                <li>Email address</li>
                <li>Contact details (if submitted via contact forms)</li>
                <li>
                  Social media profile information (if interacting through
                  linked platforms)
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-sm md:text-base font-bold text-primary">
                b) Non-Personal Information
              </div>
              <ul className="list-disc pl-5 space-y-1">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device information</li>
                <li>Pages visited</li>
                <li>Time spent on website</li>
                <li>Cookies and analytics data</li>
              </ul>
            </div>
          </section>

          <section className="space-y-2">
            <div className="text-lg md:text-xl font-bold text-primary">
              3. How We Use Your Information
            </div>
            <p>We use collected information to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Improve website content and user experience</li>
              <li>Respond to inquiries or messages</li>
              <li>Send newsletters or updates (if subscribed)</li>
              <li>Analyze website traffic and engagement</li>
              <li>Maintain website security</li>
            </ul>
          </section>

          <section className="space-y-2">
            <div className="text-lg md:text-xl font-bold text-primary">
              4. Cookies Policy
            </div>
            <p>
              Kaarshe.com may use cookies and third-party analytics tools to
              enhance user experience. You can disable cookies through your
              browser settings.
            </p>
          </section>

          <section className="space-y-2">
            <div className="text-lg md:text-xl font-bold text-primary">
              5. Third-Party Services
            </div>
            <p>We may use third-party services such as:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Social media platforms</li>
              <li>Email marketing services</li>
              <li>Website analytics tools</li>
            </ul>
            <p>These third parties have their own privacy policies.</p>
          </section>

          <section className="space-y-2">
            <div className="text-lg md:text-xl font-bold text-primary">
              6. Data Protection
            </div>
            <p>
              We implement reasonable security measures to protect your
              information. However, no internet transmission is 100% secure.
            </p>
          </section>

          <section className="space-y-2">
            <div className="text-lg md:text-xl font-bold text-primary">
              7. Children&apos;s Privacy
            </div>
            <p>
              Kaarshe.com does not knowingly collect personal data from children
              under 13 years of age.
            </p>
          </section>

          <section className="space-y-2">
            <div className="text-lg md:text-xl font-bold text-primary">
              8. Changes to This Policy
            </div>
            <p>
              We reserve the right to update this Privacy Policy at any time.
              Changes will be posted on this page.
            </p>
          </section>
        </div>
      </div>
    </Section>
  );
}
