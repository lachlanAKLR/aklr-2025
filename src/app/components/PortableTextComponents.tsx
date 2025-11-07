import { PortableTextReactComponents } from "@portabletext/react";

export const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => (
      <p className="font-herbik-reg pb-2 text-sm md:pb-4 md:text-base">
        {children}
      </p>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href || "#";
      const isMailto = href.startsWith("mailto:");
      const isExternal = !isMailto && !href.startsWith("/");

      return (
        <a
          href={href}
          className="custom-underline"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};
