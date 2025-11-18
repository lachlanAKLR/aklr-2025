import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { BUILDS_QUERYResult } from "../../../sanity.types";
import useIsDesktop from "../utils/useIsDesktop";
import FadeInImage from "../utils/FadeInImage";

const builder = imageUrlBuilder({ projectId, dataset });

type BuildItemProps = BUILDS_QUERYResult[number];

export default function BuildItem({
  siteLink,
  posterImage,
  videoFile,
  title,
  credit,
  creditUrl,
  projectTags,
}: BuildItemProps) {
  const videoUrl = videoFile?.asset?.url;
  const isDesktop = useIsDesktop();

  const posterUrl = posterImage?.asset
    ? builder
        .image(posterImage.asset as SanityImageSource)
        .width(1200)
        .auto("format")
        .url()
    : undefined;

  return (
    <div className="flex flex-col justify-center px-2 py-20 md:h-screen md:p-40 md:px-0 md:py-0">
      <div className="grid w-full grid-cols-12 gap-2">
        <div
          className="group relative col-start-1 col-end-13 overflow-hidden rounded bg-black md:col-start-3 md:col-end-11"
          style={{ paddingTop: `${(2052 / 3450) * 100}%` }}
        >
          <a
            //@ts-expect-error: error
            href={siteLink}
            target="_blank"
          >
            {videoUrl && isDesktop ? (
              <video
                src={videoUrl}
                poster={posterUrl}
                className="absolute top-0 left-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-50"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              posterUrl && (
                <FadeInImage
                  src={builder
                    .image(posterImage?.asset as SanityImageSource)
                    .width(10000)
                    .fit("max")
                    .auto("format")
                    .url()}
                  width={1000}
                  height={2000}
                  alt={`thumbnail of ${title}`}
                  className="absolute top-0 left-0 h-full w-full object-cover"
                />
              )
            )}

            {siteLink && (
              <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center align-middle">
                <button className="button-style bg-grey-1 text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Visit Site
                </button>
              </div>
            )}
          </a>
        </div>
      </div>
      {isDesktop ? null : (
        <div className="font-herbik-reg w-full gap-5 pt-2 text-sm text-white">
          <div className="flex justify-between gap-4">
            <div>{title}</div>

            {
              //@ts-expect-error: error
              projectTags?.length > 0 && (
                <div className="relative -bottom-0.5 flex gap-2">
                  {projectTags?.map((tag) => (
                    <button
                      key={tag._id}
                      className="button-style no-cursor bg-grey-1 w-fit shrink-0 pt-2 text-black"
                    >
                      {tag.title}
                    </button>
                  ))}
                </div>
              )
            }
          </div>

          <div className="font-herbik-italic text-white">
            {credit && (
              <span>
                Designed by{" "}
                {creditUrl ? (
                  <a href={creditUrl} target="_blank">
                    {credit}
                  </a>
                ) : (
                  credit
                )}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
