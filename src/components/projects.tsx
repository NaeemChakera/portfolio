import { SectionHeading } from "@/components/section-heading";
import { ProjectGrid } from "@/components/project-grid";
import { getProjects } from "@/lib/github";

// Server component: GitHub data (READMEs, homepages) is fetched once at
// build time and baked into the static export. See src/lib/github.ts.
export async function Projects() {
  const projects = await getProjects();

  return (
    <section
      id="projects"
      className="mx-auto max-w-4xl px-6 py-16 scroll-mt-20"
    >
      <SectionHeading command="ls ./projects" title="Projects" />
      <ProjectGrid projects={projects} />
    </section>
  );
}
