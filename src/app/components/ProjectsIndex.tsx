import { PROJECTS_QUERYResult } from "../../../sanity.types";
import ProjectRow from "./ProjectRow";

export default function ProjectsIndex({
  projects,
}: {
  projects: PROJECTS_QUERYResult;
}) {
  return (
    <div>
      <div className="py-20 pl-2">
        {projects.map((project, index) => (
          <ProjectRow key={index} project={project} />
        ))}
      </div>
    </div>
  );
}
