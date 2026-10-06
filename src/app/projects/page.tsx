import Projects from "@/components/Projects";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata(
  "Projects | Jasper Gumora",
  "Explore Jasper Gumora's web applications and software projects, including Legacy Rides, eSihagBa, and iPlan.",
  "/projects",
);

export default async function ProjectPage() {
  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <h1 className="title">my projects.</h1>

      <Projects />
    </article>
  );
}
