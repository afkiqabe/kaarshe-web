import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getWpPageBySlug, stripHtml } from "@/lib/wp";
import { WpHtml } from "@/components/wp/WpHtml";

export default async function TermsAndConditionsPage() {
  const slug =
    process.env.WORDPRESS_TERMS_AND_CONDITIONS_PAGE_SLUG ??
    "terms-and-conditions";
  const wpPage = await getWpPageBySlug(slug);
  const wpTitle = wpPage?.title?.rendered
    ? stripHtml(wpPage.title.rendered)
    : null;
  const wpHtml = wpPage?.content?.rendered ?? null;

  return (
    <Section className="pt-16" size="lg">
      <div className="max-w-4xl">
        <SectionHeading
          // badge="Legal"
          title={wpTitle ?? "Terms and Conditions"}
          // description="Terms that govern your use of this website and its content."
        />

        {wpHtml ? (
          <div className="mt-10">
            <WpHtml html={wpHtml} />
          </div>
        ) : (
          <div className="mt-10 space-y-8 text-primary/70 leading-relaxed">
            <section className="space-y-2">
              <div className="text-lg md:text-xl font-bold text-primary">
                1. Acceptance of Terms
              </div>
              <p>
                By accessing and using Kaarshe.com, you agree to comply with
                these Terms and Conditions.
              </p>
              <p>If you do not agree, please do not use the website.</p>
            </section>

            <section className="space-y-2">
              <div className="text-lg md:text-xl font-bold text-primary">
                2. Website Purpose
              </div>
              <p>Kaarshe.com is a platform focused on:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Political commentary</li>
                <li>Opinion articles</li>
                <li>Social analysis</li>
                <li>Writing and public influence</li>
                <li>Educational and informational content</li>
              </ul>
              <p>
                All content reflects the author’s opinions unless otherwise
                stated.
              </p>
            </section>

            <section className="space-y-2">
              <div className="text-lg md:text-xl font-bold text-primary">
                3. Intellectual Property
              </div>
              <p>All content on Kaarshe.com including:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Articles</li>
                <li>Blog posts</li>
                <li>Graphics</li>
                <li>Logos</li>
                <li>Branding</li>
                <li>Videos</li>
              </ul>
              <p>is the property of Kaarshe.com unless otherwise credited.</p>
              <p>
                You may not reproduce, distribute, or republish content without
                written permission.
              </p>
            </section>

            <section className="space-y-2">
              <div className="text-lg md:text-xl font-bold text-primary">
                4. User Conduct
              </div>
              <p>Users agree not to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Post unlawful, abusive, or defamatory content</li>
                <li>Attempt to hack or disrupt the website</li>
                <li>Use content for illegal purposes</li>
                <li>Misrepresent the website or its author</li>
              </ul>
            </section>

            <section className="space-y-2">
              <div className="text-lg md:text-xl font-bold text-primary">
                5. Comments and User Content
              </div>
              <p>If comments are enabled:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>You are responsible for the content you post.</li>
                <li>
                  We reserve the right to remove comments at our discretion.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <div className="text-lg md:text-xl font-bold text-primary">
                6. External Links
              </div>
              <p>
                Kaarshe.com may contain links to third-party websites. We are
                not responsible for their content or practices.
              </p>
            </section>

            <section className="space-y-2">
              <div className="text-lg md:text-xl font-bold text-primary">
                7. Limitation of Liability
              </div>
              <p>Kaarshe.com and its owner shall not be held liable for:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Any direct or indirect damages</li>
                <li>Loss of data</li>
                <li>Decisions made based on website content</li>
              </ul>
              <p>Use the website at your own risk.</p>
            </section>

            <section className="space-y-2">
              <div className="text-lg md:text-xl font-bold text-primary">
                8. Termination
              </div>
              <p>
                We reserve the right to suspend or terminate access to users who
                violate these terms.
              </p>
            </section>

            <section className="space-y-2">
              <div className="text-lg md:text-xl font-bold text-primary">
                9. Changes to Terms
              </div>
              <p>
                These Terms and Conditions may be updated at any time. Continued
                use of the website constitutes acceptance of changes.
              </p>
            </section>
          </div>
        )}
      </div>
    </Section>
  );
}
