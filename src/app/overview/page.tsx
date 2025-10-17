import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import ProjectsIndex from "../components/ProjectsIndex";
import PageWrapper from "../utils/PageWrapper";

export default async function Page() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });

  return (
    <div>
      <PageWrapper>
        <ProjectsIndex projects={projects} />
      </PageWrapper>
    </div>
  );
}
