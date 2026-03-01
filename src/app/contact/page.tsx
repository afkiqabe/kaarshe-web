import { contactPageContent } from "@/lib/constants";
import { ContactClient, type ContactPageModel } from "./ContactClient";

export default function ContactPage() {
  const model: ContactPageModel = contactPageContent;
  return <ContactClient content={model} />;
}
