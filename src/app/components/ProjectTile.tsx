import { PROJECTS_QUERYResult } from "../../../sanity.types";
import Image from "next/image";
import { dataset, projectId } from "@/sanity/env";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";
import FadeInImage from "../utils/FadeInImage";

const builder = imageUrlBuilder({ projectId, dataset });

export interface ProjectTileProps {
  project: PROJECTS_QUERYResult[number];
}

export default function ProjectTile({ project }: ProjectTileProps) {
  return (
    <div
      className={`self-end pb-20 ${project.size == "small" ? "col-span-3" : project.size == "medium" ? "col-span-4" : project.size == "large" ? "col-span-5" : null}`}
    >
      <Link href={`/project/${project?.slug?.current}`}>
        <FadeInImage
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
      </Link>
      <div className="pt-3 pb-2">
        <Link href={`/project/${project?.slug?.current}`}>
          <h2 className="text-base">
            <span className="font-herbik-reg">
              {project.client}
              {project.title ? "," : " "}
            </span>
            {project.title ? (
              <span className="font-herbik-italic"> {project.title}</span>
            ) : null}
          </h2>
        </Link>
      </div>
      <div className="relative -left-1 h-32 w-full">
        <div className="flex flex-wrap gap-2">
          {project?.projectTags?.map((tag, index) => (
            <p
              className="font-dia-bold h-6 w-fit shrink-0 rounded-4xl bg-gray-100 px-2.5 py-[5px] text-center text-xs uppercase"
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
