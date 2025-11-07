import { notFound } from "next/navigation";
import { PROJECTS_QUERY, PROJECT_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import ProjectContent from "@/app/components/ProjectContent";
import PageWrapper from "@/app/utils/PageWrapper";
import ProjectsList from "@/app/components/ProjectsList";

export async function generateStaticParams() {
  const projects = await client.fetch(PROJECTS_QUERY);
  return projects.map((project) => ({
    slug: project?.slug?.current,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;

  const { data: project } = await sanityFetch({
    query: PROJECT_QUERY,
    params: { slug: resolvedParams.slug },
  });
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });

  if (!project) {
    return notFound();
  }

  return (
    <main>
      <PageWrapper>
        <ProjectContent project={project} />
        {/* <ProjectsList projects={projects} /> */}
      </PageWrapper>
    </main>
  );
}
