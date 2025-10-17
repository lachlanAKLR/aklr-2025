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

export default function ProjectRow({ project }: ProjectTileProps) {
  return (
    <div>
      <div className="flex gap-2 pb-2">
        <FadeInImage
          src={builder
            .image(project?.mainImage?.asset as SanityImageSource)
            .width(3000)
            .fit("max")
            .auto("format")
            .url()}
          width={1000}
          height={2000}
          alt={project?.mainImage?.alt ?? ""}
          className="h-40 w-auto"
        />

        {project?.projectImages?.map((image, index) => {
          if (image.type === "projectImage" && image.asset?.asset) {
            return (
              <div key={index}>
                <FadeInImage
                  src={builder
                    .image(image.asset.asset as SanityImageSource)
                    .width(3000)
                    .fit("max")
                    .auto("format")
                    .url()}
                  width={1000}
                  height={1500}
                  alt={image.asset.altText ?? ""}
                  className="h-40 w-auto"
                />
              </div>
            );
          }

          if (image.type === "video" && image.posterImage?.asset) {
            return (
              <div key={index}>
                <video
                  controls
                  poster={image.posterImage.asset.url ?? ""}
                  className="w-full"
                >
                  <source
                    src={image.videoFile?.asset?.url ?? ""}
                    type="video/mp4"
                  />
                </video>
              </div>
            );
          }

          return null;
        })}
      </div>
      <div className="flex gap-2 pt-2 pb-10">
        <Link href={`/project/${project?.slug?.current}`}>
          <h2 className="pr-5 text-base">
            <span className="font-herbik-reg">
              {project.client}
              {project.title ? "," : " "}
            </span>
            {project.title ? (
              <span className="font-herbik-italic"> {project.title}</span>
            ) : null}
          </h2>
        </Link>
        {project?.projectTags?.map((tag, index) => (
          <p
            className="font-dia-bold relative top-1 h-6 w-fit shrink-0 rounded-4xl bg-gray-100 px-2.5 py-[5px] text-center text-xs uppercase"
            key={index}
          >
            {tag.title}
          </p>
        ))}
      </div>
    </div>
  );
}
