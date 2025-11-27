"use client";

import { useState } from "react";
import {
  BUILDS_QUERYResult,
  PROJECTS_QUERYResult,
  TAGS_QUERYResult,
} from "../../../sanity.types";
import Filter from "./Filter";
import ProjectTile from "./ProjectTile";
import BuildPopUp from "./BuildPopUp";

export default function ProjectsGrid({
  projects,
  projectTags,
  buildVideo,
}: {
  projects: PROJECTS_QUERYResult;
  projectTags: TAGS_QUERYResult;
  buildVideo: BUILDS_QUERYResult;
}) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const totalProjects = projects.length;

  const filteredProjects =
    selectedTags.length > 0
      ? projects.filter((project) =>
          project.projectTags?.some((tag) =>
            selectedTags.includes(tag.slug?.current || ""),
          ),
        )
      : projects;

  const handleTagClick = (slug: string) => {
    if (slug === "") {
      setSelectedTags([]);
      return;
    }

    setSelectedTags((prev) =>
      prev.includes(slug) ? prev.filter((t) => t !== slug) : [...prev, slug],
    );
  };

  return (
    <div>
      <Filter
        projectTags={projectTags}
        selectedTags={selectedTags}
        onFilterChange={handleTagClick}
        totalProjects={totalProjects}
      />
      <div className="site-grid pt-10 pb-10">
        {filteredProjects.map((project, index) => (
          <ProjectTile
            key={index}
            project={project}
            filtered={selectedTags.length > 0}
            selectedTags={selectedTags}
            onFilterChange={handleTagClick}
          />
        ))}
        <BuildPopUp buildVideo={buildVideo} />
      </div>
    </div>
  );
}
