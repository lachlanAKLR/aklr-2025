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
          className={`font-dia-bold grid grid-cols-12 gap-2 border-t-1 p-0 py-1.5 text-xs uppercase md:py-3 ${
            index === projects.length - 1 ? "border-b-1" : ""
          }`}
        >
          <h2 className="col-span-5 md:col-span-4">
            <span className="">
              {project?.client}
              {project?.title ? "," : " "}
            </span>
            {project?.title ? <span className=""> {project.title}</span> : null}
          </h2>
          <div className="col-span-7 flex flex-wrap md:col-span-4">
            <div>
              {project?.projectTags?.map((tag, index) => (
                <p className="w-auto pr-1 break-words" key={index}>
                  {tag.title}
                  {project?.projectTags &&
                    index < project.projectTags.length - 1 &&
                    ","}
                </p>
              ))}
            </div>
          </div>
          <div className="col-start-6 col-end-12 row-start-2 pt-5 text-left md:col-start-11 md:col-end-13 md:row-start-1 md:pt-0 md:text-right">
            <Link href={`/project/${project?.slug?.current}`}>
              Go to Project →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
