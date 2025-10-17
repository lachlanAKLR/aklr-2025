import { PROJECTS_QUERYResult } from "../../../sanity.types";
import ProjectRow from "./ProjectRow";

export default function ProjectsIndex({
  projects,
}: {
  projects: PROJECTS_QUERYResult;
}) {
  return (
    <div>
      <div className="px-2 py-20">
        {projects.map((project, index) => (
          <ProjectRow key={index} project={project} />
        ))}
      </div>
    </div>
  );
}
