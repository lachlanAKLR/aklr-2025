import { PortableTextReactComponents } from "@portabletext/react";

export const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => {
      return (
        <p className="font-herbik-reg pb-2 text-base md:pb-4">{children}</p>
      );
    },
  },
};
