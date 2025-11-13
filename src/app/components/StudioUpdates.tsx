"use client";

import { PortableText } from "next-sanity";
import { STUDIO_QUERYResult } from "../../../sanity.types";
import { portableTextComponents } from "./PortableTextComponents";
import { motion } from "framer-motion";
import useIsDesktop from "../utils/useIsDesktop";

export default function StudioUpdates({
  content,
}: {
  content: STUDIO_QUERYResult;
}) {
  const updates = content?.updates ?? [];
  const isDesktop = useIsDesktop();

  if (updates.length === 0) return null;
  if (!isDesktop) return null;

  return (
    <motion.div
      className="fixed right-2 bottom-2 flex flex-col gap-2"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            delay: 2,
            staggerChildren: 0.15,
          },
        },
      }}
    >
      {updates.map((update, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.3 }}
          className="bg-grey-1 w-96 rounded-xl p-4"
        >
          <div className="font-dia-bold flex justify-between pb-2 text-xs uppercase">
            <div>Update: {String(index + 1).padStart(2, "0")}</div>
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
  );
}
