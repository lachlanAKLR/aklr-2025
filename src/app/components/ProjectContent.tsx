import { PortableText, PortableTextReactComponents } from "next-sanity";
import { PROJECT_QUERYResult } from "../../../sanity.types";
import Image from "next/image";
import { dataset, projectId } from "@/sanity/env";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder({ projectId, dataset });

const components: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => {
      return <p className="font-herbik-reg pb-4 text-base">{children}</p>;
    },
  },
};

export default function ProjectContent({
  project,
}: {
  project: PROJECT_QUERYResult;
}) {
  //   console.log(project);
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
            <PortableText value={project.info} components={components} />
          </div>
          <div className="col-span-8 row-start-2 flex w-full gap-2">
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
      ) : null}
      <div className="site-grid pb-32">
        <Image
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
                <Image
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
    </div>
  );
}
