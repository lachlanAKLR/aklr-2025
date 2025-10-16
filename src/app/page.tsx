import { sanityFetch } from "@/sanity/lib/live";
import ProjectsGrid from "./components/ProjectsGrid";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";

export default async function Page() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });

  return (
    <div>
      <ProjectsGrid projects={projects} />
    </div>
  );
}
