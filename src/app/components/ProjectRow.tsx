"use client";

import { PROJECTS_QUERYResult } from "../../../sanity.types";
import { dataset, projectId } from "@/sanity/env";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const builder = imageUrlBuilder({ projectId, dataset });

export interface ProjectTileProps {
  project: PROJECTS_QUERYResult[number];
}

export default function ProjectRow({ project }: ProjectTileProps) {
  const [loadedCount, setLoadedCount] = useState(0);
  const totalImages =
    1 +
    (project?.projectImages?.filter((img) => img.type === "projectImage")
      ?.length ?? 0);
  const allLoaded = loadedCount >= totalImages;

  return (
    <motion.div initial="rest" whileHover="hover">
      <Link href={`/project/${project?.slug?.current}`}>
        <motion.div
          className="flex flex-wrap gap-2 pb-2"
          initial="hidden"
          animate={allLoaded ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            <Image
              src={builder
                .image(project?.mainImage?.asset as SanityImageSource)
                .width(3000)
                .fit("max")
                .auto("format")
                .url()}
              width={1000}
              height={2000}
              onLoad={() => setLoadedCount((c) => c + 1)}
              alt={project?.mainImage?.alt ?? ""}
              className="h-40 w-auto"
            />
          </motion.div>
          {project?.projectImages?.map((image, index) => {
            if (image.type === "projectImage" && image.asset?.asset) {
              return (
                <motion.div
                  key={index}
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                >
                  <Image
                    src={builder
                      .image(image.asset.asset as SanityImageSource)
                      .width(3000)
                      .fit("max")
                      .auto("format")
                      .url()}
                    width={1000}
                    height={1500}
                    onLoad={() => setLoadedCount((c) => c + 1)}
                    alt={image.asset.altText ?? ""}
                    className="h-40 w-auto"
                  />
                </motion.div>
              );
            }

            if (image.type === "video" && image.posterImage?.asset) {
              return (
                <motion.div
                  key={index}
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                >
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={image.posterImage.asset.url ?? ""}
                    className="h-40 w-auto"
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
        <motion.div
          className="flex gap-2 pt-2 pb-10"
          variants={{
            hover: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <h2 className="pr-5 text-base">
            <span className="font-herbik-reg">
              {project.client}
              {project.title ? "," : " "}
            </span>
            {project.title ? (
              <span className="font-herbik-italic"> {project.title}</span>
            ) : null}
          </h2>

          {project?.projectTags?.map((tag, index) => (
            <motion.p
              className="font-dia-bold text-2xs relative top-1 h-6 w-fit shrink-0 rounded-4xl bg-gray-100 px-2.5 py-[6.5px] text-center uppercase"
              key={index}
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: 1 },
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {tag.title}
            </motion.p>
          ))}
        </motion.div>
      </Link>
    </motion.div>
  );
}
