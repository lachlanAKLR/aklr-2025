import { sanityFetch } from "@/sanity/lib/live";
import ProjectsGrid from "../components/ProjectsGrid";
import { BUILDS_QUERY, PROJECTS_QUERY, TAGS_QUERY } from "@/sanity/lib/queries";
import PageWrapper from "../utils/PageWrapper";
import BuildPopUp from "../components/BuildPopUp";

export default async function Page() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });
  const { data: projectTags } = await sanityFetch({ query: TAGS_QUERY });
  const { data: buildVideo } = await sanityFetch({ query: BUILDS_QUERY });

  return (
    <main>
      <PageWrapper>
        <ProjectsGrid projects={projects} projectTags={projectTags} />
        <BuildPopUp buildVideo={buildVideo} />
      </PageWrapper>
    </main>
  );
}
