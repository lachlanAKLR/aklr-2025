"use client";

import { PortableText } from "next-sanity";
import { STUDIO_QUERYResult } from "../../../sanity.types";
import { portableTextComponents } from "./PortableTextComponents";
import { motion } from "framer-motion";

export default function StudioUpdates({
  content,
}: {
  content: STUDIO_QUERYResult;
}) {
  const updates = content?.updates ?? [];

  if (updates.length === 0) return null;

  return (
    <div className="pointer-events-none relative bottom-0 flex justify-end md:sticky">
      <motion.div
        layout
        className="pointer-events-auto z-100 flex flex-col-reverse gap-2 p-2 pb-20 md:p-2 md:pb-2"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              delayChildren: 2,
              staggerChildren: 0.5,
            },
          },
        }}
      >
        {updates.map((update, index) => (
          <motion.div
            key={index}
            layout
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="bg-grey-1 w-full rounded-xl p-4 md:w-96"
          >
            <div className="font-dia-bold flex justify-between pb-2 text-xs uppercase">
              <div>Update ({String(index + 1).padStart(2, "0")})</div>
              {update.link ? (
                <div>
                  <a href={update.link} target="_blank">
                    More ↗
                  </a>
                </div>
              ) : null}
            </div>

            <div>
              <PortableText
                // @ts-expect-error: error
                value={update?.update}
                components={portableTextComponents}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
