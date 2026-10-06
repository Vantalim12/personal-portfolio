import ContactForm from "@/components/ContactForm";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata(
  "Contact | Jasper Gumora",
  "Contact Jasper Gumora, a full-stack developer, about his work, projects, or opportunities.",
  "/contact",
);

export default function ContactPage() {
  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <h1 className="title">contact me.</h1>

      <ContactForm />
    </article>
  );
}
