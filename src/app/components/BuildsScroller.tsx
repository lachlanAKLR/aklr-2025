"use client";

import { BUILDS_QUERYResult } from "../../../sanity.types";
import { useActiveBuild } from "../hooks/useActiveBuild";
import useIsDesktop from "../utils/useIsDesktop";
import BuildItem from "./BuildItem";

export default function BuildsScroller({ data }: { data: BUILDS_QUERYResult }) {
  const { credit, creditUrl, title, projectTags } = useActiveBuild();
  const isDesktop = useIsDesktop();

  return (
    <>
      <div>
        {data.map((build) => (
          <div
            key={build._id}
            data-build
            data-title={build.title}
            data-credit={build.credit}
            data-crediturl={build.creditUrl}
            data-projecttags={JSON.stringify(build.projectTags ?? [])}
          >
            <BuildItem key={build._id} {...build} />
          </div>
        ))}
      </div>

      {isDesktop ? (
        <div className="font-herbik-reg fixed bottom-0 left-0 flex w-full justify-between gap-5 p-2 text-base text-white">
          <div className="flex gap-2">
            <div>{title}</div>
            {credit && (
              <div className="font-herbik-italic text-right text-white">
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
              </div>
            )}

            {projectTags?.length > 0 && (
              <div className="relative -bottom-0.5 flex gap-2">
                {projectTags.map((tag) => (
                  <button
                    key={tag._id}
                    className="button-style no-cursor bg-grey-1 w-fit shrink-0 pt-2 text-black"
                  >
                    {tag.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
