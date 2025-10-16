import { PROJECTS_QUERYResult } from "../../../sanity.types";
import ProjectTile from "./ProjectTile";

export default function ProjectsGrid({
  projects,
}: {
  projects: PROJECTS_QUERYResult;
}) {
  return (
    <div>
      <div className="site-grid py-20">
        {projects.map((project, index) => (
          <ProjectTile key={index} project={project} />
        ))}
      </div>
    </div>
  );
}
