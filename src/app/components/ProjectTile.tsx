import { PROJECTS_QUERYResult } from "../../../sanity.types";
import Image from "next/image";
import { dataset, projectId } from "@/sanity/env";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder({ projectId, dataset });

export interface ProjectTileProps {
  project: PROJECTS_QUERYResult[number];
}

export default function ProjectTile({ project }: ProjectTileProps) {
  return (
    <div
      className={`self-end pb-20 ${project.size == "small" ? "col-span-3" : project.size == "medium" ? "col-span-4" : project.size == "large" ? "col-span-5" : null}`}
    >
      <Image
        src={builder
          .image(project?.mainImage?.asset as SanityImageSource)
          .width(2000)
          .fit("max")
          .auto("format")
          .url()}
        width={1000}
        height={2000}
        alt={project?.mainImage?.alt ?? ""}
        className=""
      />
      <div className="pt-3 pb-2">
        <h2 className="text-base">
          <span className="font-herbik-reg">
            {project.client}
            {project.title ? "," : " "}
          </span>
          {project.title ? (
            <span className="font-herbik-italic"> {project.title}</span>
          ) : null}
        </h2>
      </div>
      <div className="h-32 w-full">
        <div className="flex flex-wrap gap-2">
          {project?.projectTags?.map((tag, index) => (
            <p
              className="font-dia-bold h-8 w-fit shrink-0 rounded-4xl bg-gray-100 px-3 py-2 text-xs uppercase"
              key={index}
            >
              {tag.title}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
