import { sanityFetch } from "@/sanity/lib/live";
import ProjectsGrid from "../components/ProjectsGrid";
import { PROJECTS_QUERY, TAGS_QUERY } from "@/sanity/lib/queries";
import PageWrapper from "../utils/PageWrapper";

export default async function Page() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });
  const { data: projectTags } = await sanityFetch({ query: TAGS_QUERY });

  return (
    <main>
      <PageWrapper>
        <ProjectsGrid projects={projects} projectTags={projectTags} />
      </PageWrapper>
    </main>
  );
}
