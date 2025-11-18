"use client";

import { useEffect, useState } from "react";

type ActiveInfo = {
  title: string | null;
  credit: string | null;
  creditUrl: string | null;
  projectTags: Array<{ _id: string; title: string; slug?: unknown }>;
};

export function useActiveBuild() {
  const [active, setActive] = useState<ActiveInfo>({
    title: null,
    credit: null,
    creditUrl: null,
    projectTags: [],
  });

  useEffect(() => {
    const onScroll = () => {
      const items = document.querySelectorAll<HTMLElement>("[data-build]");
      const viewportCenter = window.innerHeight / 2;

      let closest: HTMLElement | null = null;
      let closestDistance = Infinity;

      items.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - elCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closest = el;
        }
      });

      if (closest) {
        // @ts-expect-error data attribs
        const tagsAttr = closest.getAttribute("data-projecttags");

        setActive({
          // @ts-expect-error data attribs
          title: closest.getAttribute("data-title"),
          // @ts-expect-error data attribs
          credit: closest.getAttribute("data-credit"),
          // @ts-expect-error data attribs
          creditUrl: closest.getAttribute("data-crediturl"),
          projectTags: tagsAttr ? JSON.parse(tagsAttr) : [],
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return active;
}
