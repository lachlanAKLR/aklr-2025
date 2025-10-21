"use client";

import { useState } from "react";
import { PROJECTS_QUERYResult, TAGS_QUERYResult } from "../../../sanity.types";
import Filter from "./Filter";
import ProjectTile from "./ProjectTile";

export default function ProjectsGrid({
  projects,
  projectTags,
}: {
  projects: PROJECTS_QUERYResult;
  projectTags: TAGS_QUERYResult;
}) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredProjects = selectedTag
    ? projects.filter((project) =>
        project.projectTags?.some((tag) => tag?.slug?.current === selectedTag),
      )
    : projects;

  return (
    <div>
      <Filter
        projectTags={projectTags}
        selectedTag={selectedTag}
        onFilterChange={(slug) => setSelectedTag(slug)}
        resetFilter={() => setSelectedTag(null)}
      />
      <div className="site-grid py-20">
        {filteredProjects.map((project, index) => (
          <ProjectTile key={index} project={project} />
        ))}
      </div>
    </div>
  );
}
