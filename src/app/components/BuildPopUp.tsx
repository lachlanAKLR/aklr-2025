"use client";

import Link from "next/link";
import { BUILDS_QUERYResult } from "../../../sanity.types";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useIsDesktop from "../utils/useIsDesktop";

export default function BuildPopUp({
  buildVideo,
}: {
  buildVideo: BUILDS_QUERYResult;
}) {
  const isDesktop = useIsDesktop();
  const [isOpen, setIsOpen] = useState(false);
  const featuredBuild = buildVideo.find((build) => build.isFeatured === true);

  useEffect(() => {
    setIsOpen(isDesktop);
  }, [isDesktop]);

  return (
    <motion.div
      inherit={false}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{
        ease: "easeInOut",
        duration: 0.5,
        delay: 2,
      }}
      className={`fixed right-1.5 bottom-2 w-[calc(100%-12px)] rounded-xl bg-black p-4 text-white md:right-2 md:w-92`}
    >
      <div>
        <div className="font-dia-bold flex w-full justify-between text-xs uppercase">
          <Link href="/builds">
            <h4>AKLR Builds</h4>
          </Link>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="cursor-pointer uppercase"
          >
            {isOpen ? "Hide" : "Show"}
          </button>
        </div>
        <div>
          <Link
            href="/builds"
            className={`${isOpen ? "block" : "hidden"} font-herbik-italic pt-2 text-base`}
          >
            <h4>
              Websites we&apos;ve made
              <span className="font-herbik-reg relative bottom-1.5 pl-1 text-xs">
                ↗
              </span>
            </h4>
          </Link>
        </div>

        {isOpen ? (
          <div className="mt-4 overflow-hidden">
            <Link href="/builds">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={featuredBuild?.posterImage?.asset?.url ?? ""}
                className={`rounded object-cover`}
              >
                <source
                  src={featuredBuild?.videoFile?.asset?.url ?? ""}
                  type="video/mp4"
                />
              </video>
            </Link>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
