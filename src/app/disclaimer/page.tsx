import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function DisclaimerPage() {
  return (
    <Section className="pt-16" size="lg">
      <div className="max-w-4xl">
        <SectionHeading
          // badge="Legal"
          title="Disclaimer"
          // description="Important information about the content provided on this site."
        />

        <div className="mt-10 space-y-8 text-primary/70 leading-relaxed">
          <section className="space-y-2">
            <div className="text-lg md:text-xl font-bold text-primary">
              General Disclaimer
            </div>
            <p>
              The information provided on Kaarshe.com is for informational,
              educational, and commentary purposes only.
            </p>
            <p>
              All opinions expressed are solely those of the author and do not
              represent any government entity, political party, organization, or
              employer unless explicitly stated.
            </p>
          </section>

          <section className="space-y-2">
            <div className="text-lg md:text-xl font-bold text-primary">
              Political Content Disclaimer
            </div>
            <p>
              Kaarshe.com publishes political opinions, commentary, and
              analysis. The content:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Is based on personal viewpoints</li>
              <li>May include subjective interpretations</li>
              <li>Should not be considered legal or professional advice</li>
            </ul>
            <p>Readers are encouraged to conduct independent research.</p>
          </section>

          <section className="space-y-2">
            <div className="text-lg md:text-xl font-bold text-primary">
              No Professional Advice
            </div>
            <p>The content on Kaarshe.com does not constitute:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Legal advice</li>
              <li>Financial advice</li>
              <li>Political consultancy</li>
              <li>Professional advisory services</li>
            </ul>
            <p>Always seek professional guidance before making decisions.</p>
          </section>

          <section className="space-y-2">
            <div className="text-lg md:text-xl font-bold text-primary">
              Accuracy of Information
            </div>
            <p>
              While we strive to ensure accuracy, Kaarshe.com makes no
              guarantees regarding completeness, reliability, or accuracy of
              content.
            </p>
          </section>

          <section className="space-y-2">
            <div className="text-lg md:text-xl font-bold text-primary">
              External Links Disclaimer
            </div>
            <p>
              We are not responsible for the content or reliability of external
              websites linked from Kaarshe.com.
            </p>
          </section>

          <section className="space-y-2">
            <div className="text-lg md:text-xl font-bold text-primary">
              Affiliate & Sponsored Content (If Applicable)
            </div>
            <p>
              Kaarshe.com may include sponsored content, partnerships, or
              affiliate links. Such content will be disclosed where required.
            </p>
          </section>
        </div>
      </div>
    </Section>
  );
}
