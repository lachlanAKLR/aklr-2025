import { PortableTextReactComponents } from "@portabletext/react";

export const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => (
      <p className="font-herbik-reg pb-2 text-sm md:pb-4 md:text-base">
        {children}
      </p>
    ),
    h4: ({ children }) => (
      <h4 className="font-herbik-reg pb-1 text-base">{children}</h4>
    ),
    small: ({ children }) => (
      <p className="font-herbik-reg text-sm">{children}</p>
    ),
  },

  marks: {
    em: ({ children }) => (
      <span className="font-herbik-italic">{children}</span>
    ),

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
