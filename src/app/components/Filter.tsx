"use client";

import { useState } from "react";
import { TAGS_QUERYResult } from "../../../sanity.types";
import useIsDesktop from "../utils/useIsDesktop";

export default function Filter({
  projectTags,
  selectedTags,
  onFilterChange,
  totalProjects,
}: {
  projectTags: TAGS_QUERYResult;
  selectedTags: string[];
  onFilterChange: (slug: string) => void;
  totalProjects: number;
}) {
  const [showAllTags, setShowAllTags] = useState(false);
  const isDesktop = useIsDesktop();
  const tagAmount = isDesktop ? 8 : 5;

  return (
    <div className="hidden w-full items-center justify-center pt-20 pb-10 md:flex md:pt-4">
      <div className="flex w-full flex-wrap items-start justify-start gap-2 px-2 md:w-1/2 md:items-center md:justify-center">
        <button
          onClick={() => onFilterChange("")}
          disabled={!selectedTags || selectedTags.length === 0}
          className={`button-style ${
            !selectedTags || selectedTags.length === 0
              ? "bg-grey-2 text-grey-b cursor-default"
              : "bg-grey-1 hover:bg-grey-2 cursor-pointer text-black"
          }`}
        >
          All
          <span className="pl-1">
            ({String(totalProjects).padStart(2, "0")})
          </span>
        </button>
        {(showAllTags ? projectTags : projectTags.slice(0, tagAmount)).map(
          (tag, index) => {
            const slug = tag.slug?.current || "";
            const isSelected = selectedTags.includes(slug);

            return (
              <button
                key={index}
                onClick={() => onFilterChange(slug)}
                className={`button-style ${
                  isSelected
                    ? "bg-grey-2"
                    : "hover:bg-grey-2 bg-grey-1 text-black"
                }`}
              >
                {tag.title}
                <span className="pl-1">
                  ({String(tag.count).padStart(2, "0")})
                </span>
              </button>
            );
          },
        )}

        {projectTags.length > tagAmount && (
          <button
            onClick={() => setShowAllTags(!showAllTags)}
            className={`${showAllTags ? "pointer-events-none hidden" : "pointer-events-all block"} font-dia-bold text-2xs bg-grey-1 hover:bg-grey-2 h-5 cursor-pointer rounded-4xl px-2.5 py-[6.5px] text-black uppercase transition-colors`}
          >
            ...
          </button>
        )}
      </div>
    </div>
  );
}
