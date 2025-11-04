import Link from "next/link";
import { PROJECTS_QUERYResult } from "../../../sanity.types";

export default function ProjectsList({
  projects,
}: {
  projects: PROJECTS_QUERYResult;
}) {
  return (
    <div className="p-2 pb-40 md:pb-96">
      <h2 className="font-herbik-reg pb-4 text-base">More Projects</h2>
      {projects.map((project, index) => (
        <div
          key={index}
          className={`font-dia-bold grid grid-cols-12 gap-2 border-t-1 p-0 py-3 text-xs uppercase ${
            index === projects.length - 1 ? "border-b-1" : ""
          }`}
        >
          <h2 className="col-span-4 md:col-span-4">
            <span className="">
              {project?.client}
              {project?.title ? "," : " "}
            </span>
            {project?.title ? <span className=""> {project.title}</span> : null}
          </h2>
          <div className="col-span-8 flex flex-wrap md:col-span-4">
            {project?.projectTags?.map((tag, index) => (
              <p className="w-fit shrink-0 pr-1" key={index}>
                {tag.title}
                {project?.projectTags &&
                  index < project.projectTags.length - 1 &&
                  ","}
              </p>
            ))}
          </div>
          <div className="col-start-5 col-end-12 row-start-2 pt-10 text-left md:col-start-11 md:col-end-13 md:row-start-1 md:pt-0 md:text-right">
            <Link href={`/project/${project?.slug?.current}`}>
              Go to Project →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
