"use client";

import { PROJECTS_QUERYResult } from "../../../sanity.types";
import { dataset, projectId } from "@/sanity/env";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";
import FadeInImage from "../utils/FadeInImage";
import { motion } from "framer-motion";

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
  console.log(project);
  return (
    <motion.div
      className={`self-end pb-20 ${
        filtered
          ? "col-span-4"
          : project.size == "small"
            ? "col-span-3"
            : project.size == "medium"
              ? "col-span-4"
              : project.size == "large"
                ? "col-span-5"
                : null
      }`}
      initial="rest"
      whileHover="hover"
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
            return (
              <motion.button
                key={index}
                onClick={() => onFilterChange?.(tag.slug?.current || "")}
                variants={{
                  rest: { opacity: 0 },
                  hover: { opacity: 1 },
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`font-dia-bold text-2xs h-6 w-fit shrink-0 cursor-pointer rounded-4xl px-2.5 py-[6.5px] text-center uppercase transition-colors ${
                  isSelected
                    ? "bg-black text-white"
                    : "bg-gray-100 text-black hover:bg-black hover:text-white"
                }`}
              >
                {tag.title}
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}
