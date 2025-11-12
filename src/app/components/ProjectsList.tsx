"use client";

import Link from "next/link";
import { PROJECTS_QUERYResult } from "../../../sanity.types";
import { dataset, projectId } from "@/sanity/env";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { useState } from "react";
import Image from "next/image";
import useIsDesktop from "../utils/useIsDesktop";

const builder = imageUrlBuilder({ projectId, dataset });

export default function ProjectsList({
  projects,
}: {
  projects: PROJECTS_QUERYResult;
}) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const isDesktop = useIsDesktop();

  const visibleProjects = projects.filter((project) => {
    const isComingSoon = project?.projectTags?.some(
      (tag) => tag?.slug?.current === "coming-soon",
    );
    return !isComingSoon;
  });

  return (
    <div className="p-2 pb-40 md:pb-96">
      <div className="font-dia-bold text-xs uppercase md:text-sm">
        <h2>More Projects</h2>
      </div>

      {visibleProjects.map((project, index) => {
        return (
          <div
            key={project._id ?? index}
            className="font-herbik-reg relative w-full text-sm md:text-base"
            onMouseEnter={() => setHoveredSlug(project?.slug?.current ?? null)}
            onMouseLeave={() => setHoveredSlug(null)}
          >
            <Link href={`/project/${project?.slug?.current}`} className="w-fit">
              <h2 className="group flex items-center transition-all duration-300 ease-out">
                <span className="font-herbik-regular w-0 overflow-hidden pr-0 text-sm opacity-0 transition-all duration-300 ease-out group-hover:w-5 group-hover:opacity-100">
                  →
                </span>
                <span className="pr-1">{project?.client},</span>
                {project?.excerpt ? (
                  <span className="font-herbik-italic">{project?.excerpt}</span>
                ) : (
                  <span className="font-herbik-italic">No project excerpt</span>
                )}
              </h2>
            </Link>
          </div>
        );
      })}

      {visibleProjects.map((project, index) => {
        if (!isDesktop) return null;

        return (
          <div key={project._id ?? `image-${index}`}>
            <Image
              src={builder
                .image(project?.mainImage?.asset as SanityImageSource)
                .width(10000)
                .fit("max")
                .auto("format")
                .url()}
              width={1000}
              height={2000}
              alt={project?.mainImage?.alt ?? ""}
              className={`fixed right-2 bottom-2 w-80 transition-opacity duration-300 ${
                hoveredSlug === project?.slug?.current
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}
