import { PortableTextReactComponents } from "@portabletext/react";

export const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => {
      return <p className="font-herbik-reg pb-4 text-base">{children}</p>;
    },
  },
};
