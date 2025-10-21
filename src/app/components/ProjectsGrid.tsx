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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredProjects =
    selectedTags.length > 0
      ? projects.filter((project) =>
          project.projectTags?.some((tag) =>
            selectedTags.includes(tag.slug?.current || ""),
          ),
        )
      : projects;

  const handleTagClick = (slug: string) => {
    setSelectedTags(
      (prev) =>
        prev.includes(slug)
          ? prev.filter((t) => t !== slug) // remove tag
          : [...prev, slug], // add tag
    );
  };

  return (
    <div>
      <Filter
        projectTags={projectTags}
        selectedTags={selectedTags}
        onFilterChange={handleTagClick}
      />
      <div className="site-grid py-20">
        {filteredProjects.map((project, index) => (
          <ProjectTile
            key={index}
            project={project}
            filtered={selectedTags.length > 0}
            selectedTags={selectedTags}
            onFilterChange={handleTagClick}
          />
        ))}
      </div>
    </div>
  );
}
