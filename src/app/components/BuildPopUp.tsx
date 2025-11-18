"use client";

import Link from "next/link";
import { BUILDS_QUERYResult } from "../../../sanity.types";
import { useState } from "react";
import { motion } from "framer-motion";

export default function BuildPopUp({
  buildVideo,
}: {
  buildVideo: BUILDS_QUERYResult;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const featuredBuild = buildVideo.find((build) => build.isFeatured === true);

  return (
    <div className="px-2 pb-20 md:px-0 md:pb-0">
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
        className={`relative bottom-0 w-full rounded-xl bg-black p-4 text-white md:fixed md:right-2 md:bottom-2 md:w-92`}
      >
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
      </motion.div>
    </div>
  );
}
