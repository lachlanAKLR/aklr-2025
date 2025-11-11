"use client";

import { PROJECTS_QUERYResult } from "../../../sanity.types";
import { dataset, projectId } from "@/sanity/env";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import useIsDesktop from "../utils/useIsDesktop";

const builder = imageUrlBuilder({ projectId, dataset });

export interface ProjectTileProps {
  project: PROJECTS_QUERYResult[number];
}

export default function ProjectRow({ project }: ProjectTileProps) {
  const [loadedCount, setLoadedCount] = useState(0);

  const totalImages =
    project?.projectImages?.filter(
      (img) => img.type === "projectImage" && img.asset?.asset,
    ).length ?? 0;

  const allLoaded = loadedCount >= totalImages;

  const isDesktop = useIsDesktop();

  const isComingSoon = project?.projectTags?.some(
    (tag) => tag?.slug?.current === "coming-soon",
  );

  if (isComingSoon) return null;

  return (
    <motion.div initial="rest" whileHover="hover">
      <div className="relative w-full overflow-x-auto overflow-y-hidden">
        <motion.div
          className="flex w-max flex-nowrap gap-2 pb-2"
          initial="hidden"
          animate={allLoaded ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {project?.projectImages?.map((image, index) => {
            if (image.type === "projectImage" && image.asset?.asset) {
              return (
                <motion.div
                  key={index}
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                >
                  <Link href={`/project/${project?.slug?.current}`}>
                    <Image
                      src={builder
                        .image(image.asset.asset as SanityImageSource)
                        .width(isDesktop ? 2000 : 800)
                        .fit("max")
                        .auto("format")
                        .url()}
                      width={1000}
                      height={1500}
                      priority
                      onLoad={() => setLoadedCount((c) => c + 1)}
                      alt={image.asset.altText ?? ""}
                      className="h-52 w-auto md:h-40"
                    />
                  </Link>
                </motion.div>
              );
            }

            if (image.type === "video" && image.posterImage?.asset) {
              console.log(image.isInset);
              return (
                <motion.div
                  key={index}
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  className="bg-black"
                >
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={image.posterImage.asset.url ?? ""}
                    className={`${image.isInset ? "p-5" : ""} h-52 w-auto md:h-40`}
                    onLoadedData={() => setLoadedCount((c) => c + 1)}
                  >
                    <source
                      src={image.videoFile?.asset?.url ?? ""}
                      type="video/mp4"
                    />
                  </video>
                </motion.div>
              );
            }

            return null;
          })}
        </motion.div>
      </div>
      <motion.div
        className="block gap-2 pb-20 md:flex md:pb-10"
        variants={{
          hover: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <h2 className="pr-5 pb-1 text-base md:pb-0">
          <Link href={`/project/${project?.slug?.current}`}>
            <span className="font-herbik-reg">
              {project.client}
              {project.title ? "," : " "}
            </span>
            {project.title ? (
              <span className="font-herbik-italic"> {project.title}</span>
            ) : null}
          </Link>
        </h2>

        {isDesktop ? (
          project?.projectTags?.map((tag, index) => (
            <motion.button
              className="button-style bg-grey-1 no-cursor mt-[5px]"
              key={index}
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: 1 },
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {tag.title}
            </motion.button>
          ))
        ) : (
          <div className="relative -left-0.5 flex flex-wrap gap-x-2 gap-y-1">
            {project?.projectTags?.map((tag, index) => (
              <button
                key={index}
                className="button-style no-cursor bg-grey-1 mt-1"
              >
                {tag.title}
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
