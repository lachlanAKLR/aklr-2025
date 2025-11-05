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
      <h2 className="inherit top-[6.5px] left-20 w-fit px-2 pt-16 text-sm md:relative md:px-0 md:pt-0 md:text-base">
        <span className="font-herbik-reg">
          {project?.client}
          {project?.title ? "," : " "}
        </span>
        {project?.title ? (
          <span className="font-herbik-italic"> {project.title}</span>
        ) : null}
      </h2>
      <div className="block p-2 md:hidden">
        {project?.projectImages?.slice(0, 1).map((image, index) => {
          if (image.type === "projectImage" && image.asset?.asset) {
            const width = image.asset.asset.metadata?.dimensions?.width ?? 0;
            const height = image.asset.asset.metadata?.dimensions?.height ?? 0;
            const isLandscape = width > height;
            const colSpanClass = isLandscape
              ? "col-span-12"
              : image?.isFourColumn
                ? "col-span-12 md:col-span-4"
                : "col-span-12 md:col-span-6";

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
            const colSpanClass = isLandscape
              ? "col-span-12"
              : image?.isFourColumn
                ? "col-span-12 md:col-span-4"
                : "col-span-12 md:col-span-6";

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
      {project?.info ? (
        <div className="site-grid pt-2 pb-16 md:pt-6 md:pb-32">
          <div className="col-span-12 md:col-span-8">
            <PortableText
              value={project.info}
              components={portableTextComponents}
            />
          </div>
          <div className="col-span-12 row-start-2 flex w-full flex-wrap gap-2 md:col-span-8">
            {project?.projectTags?.map((tag, index) => (
              <button
                className="button-style no-cursor bg-grey-1 w-fit shrink-0 pt-2"
                key={index}
              >
                {tag.title}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      <div className="site-grid pb-24 md:pb-32">
        {project?.projectImages?.map((image, index) => {
          if (image.type === "projectImage" && image.asset?.asset) {
            const width = image.asset.asset.metadata?.dimensions?.width ?? 0;
            const height = image.asset.asset.metadata?.dimensions?.height ?? 0;
            const isLandscape = width > height;
            const colSpanClass = isLandscape
              ? "col-span-12"
              : image?.isFourColumn
                ? "col-span-12 md:col-span-4"
                : "col-span-12 md:col-span-6";

            const isFirstImage = index === 0;

            return (
              <div
                key={index}
                className={`${colSpanClass} ${isFirstImage ? "hidden md:block" : ""}`}
              >
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
            const colSpanClass = isLandscape
              ? "col-span-12"
              : image?.isFourColumn
                ? "col-span-12 md:col-span-4"
                : "col-span-12 md:col-span-6";

            const isFirstImage = index === 0;

            return (
              <div
                key={index}
                className={`${colSpanClass} ${isFirstImage ? "hidden md:block" : ""}`}
              >
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
