import { PortableText } from "next-sanity";
import { PROJECT_QUERYResult } from "../../../sanity.types";
import { dataset, projectId } from "@/sanity/env";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { portableTextComponents } from "./PortableTextComponents";
import FadeInImage from "../utils/FadeInImage";

const builder = imageUrlBuilder({ projectId, dataset });

export default function ProjectContent({
  project,
}: {
  project: PROJECT_QUERYResult;
}) {
  return (
    <div>
      <h2 className="relative top-[6.5px] left-20 w-fit text-base">
        <span className="font-herbik-reg">
          {project?.client}
          {project?.title ? "," : " "}
        </span>
        {project?.title ? (
          <span className="font-herbik-italic"> {project.title}</span>
        ) : null}
      </h2>
      {project?.info ? (
        <div className="site-grid pt-6 pb-32">
          <div className="col-span-8">
            <PortableText
              value={project.info}
              components={portableTextComponents}
            />
          </div>
          <div className="col-span-8 row-start-2 flex w-full gap-2">
            {project?.projectTags?.map((tag, index) => (
              <p
                className="font-dia-bold text-2xs h-6 w-fit shrink-0 rounded-4xl bg-gray-100 px-3.5 py-[6.5px] uppercase"
                key={index}
              >
                {tag.title}
              </p>
            ))}
          </div>
        </div>
      ) : null}
      <div className="site-grid pb-32">
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
          className="col-span-6"
        />

        {project?.projectImages?.map((image, index) => {
          if (image.type === "projectImage" && image.asset?.asset) {
            const width = image.asset.asset.metadata?.dimensions?.width ?? 0;
            const height = image.asset.asset.metadata?.dimensions?.height ?? 0;
            const isLandscape = width > height;
            const colSpanClass = isLandscape ? "col-span-12" : "col-span-6";

            return (
              <div key={index} className={colSpanClass}>
                <FadeInImage
                  src={builder
                    .image(image.asset.asset as SanityImageSource)
                    .width(3000)
                    .fit("max")
                    .auto("format")
                    .url()}
                  width={width || 1000}
                  height={height || 1500}
                  alt={image.asset.altText ?? ""}
                />
              </div>
            );
          }

          if (image.type === "video" && image.posterImage?.asset) {
            const width =
              image.posterImage.asset.metadata?.dimensions?.width ?? 0;
            const height =
              image.posterImage.asset.metadata?.dimensions?.height ?? 0;
            const isLandscape = width > height;
            const colSpanClass = isLandscape ? "col-span-12" : "col-span-6";

            return (
              <div key={index} className={colSpanClass}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={image.posterImage.asset.url ?? ""}
                  className="h-auto w-full object-cover"
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
    </div>
  );
}
