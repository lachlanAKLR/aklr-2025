"use client";

import { PROJECTS_QUERYResult } from "../../../sanity.types";
import { dataset, projectId } from "@/sanity/env";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";
import FadeInImage from "../utils/FadeInImage";
import { motion } from "framer-motion";
import useIsDesktop from "../utils/useIsDesktop";

const builder = imageUrlBuilder({ projectId, dataset });

export interface ProjectTileProps {
  project: PROJECTS_QUERYResult[number];
  filtered?: boolean;
  selectedTags: string[];
  onFilterChange?: (slug: string) => void;
}

export default function ProjectTile({
  project,
  filtered = false,
  selectedTags,
  onFilterChange,
}: ProjectTileProps) {
  const isDesktop = useIsDesktop();
  const isComingSoon = project?.projectTags?.some(
    (tag) => tag?.slug?.current === "coming-soon",
  );

  return (
    <motion.div
      className={`self-end pb-5 md:pb-10 ${
        filtered
          ? "col-span-12 md:col-span-4"
          : project.size == "small"
            ? "col-span-12 md:col-span-3"
            : project.size == "medium"
              ? "col-span-12 md:col-span-4"
              : project.size == "large"
                ? "col-span-12 md:col-span-5"
                : null
      } `}
      initial="rest"
      whileHover="hover"
    >
      <Link
        href={`/project/${project?.slug?.current}`}
        className={`${isComingSoon ? "pointer-events-none" : "pointer-events-auto"}`}
      >
        <FadeInImage
          src={builder
            .image(project?.mainImage?.asset as SanityImageSource)
            .width(10000)
            .fit("max")
            .auto("format")
            .url()}
          width={1000}
          height={2000}
          alt={project?.mainImage?.alt ?? ""}
          className={`${filtered ? "md:aspect-[2/3]" : ""} h-auto w-full object-cover`}
        />
      </Link>
      <div className="pt-3 pb-2">
        <Link
          href={`/project/${project?.slug?.current}`}
          className={`${isComingSoon ? "pointer-events-none" : "pointer-events-auto"}`}
        >
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
      <div className="relative -left-1 h-24 w-full md:h-32">
        <motion.div
          className="flex flex-wrap gap-2"
          variants={{
            hover: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {project?.projectTags?.map((tag, index) => {
            const isSelected = selectedTags.includes(tag.slug?.current || "");
            return isDesktop ? (
              <motion.button
                key={index}
                onClick={() => onFilterChange?.(tag.slug?.current || "")}
                variants={{
                  rest: { opacity: isDesktop ? 0 : 1 },
                  hover: { opacity: 1 },
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`button-style ${
                  isSelected
                    ? "bg-grey-2"
                    : "hover:bg-grey-2 bg-grey-1 text-black"
                }`}
              >
                {tag.title}
              </motion.button>
            ) : (
              <button
                key={index}
                onClick={() => onFilterChange?.(tag.slug?.current || "")}
                className={`button-style ${
                  isSelected
                    ? "bg-grey-2"
                    : "hover:bg-grey-2 bg-grey-1 text-black"
                }`}
              >
                {tag.title}
              </button>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}
