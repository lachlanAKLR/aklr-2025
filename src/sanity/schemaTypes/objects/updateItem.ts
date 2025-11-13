import { defineType, defineField } from "sanity";
import { BookIcon } from "@sanity/icons";
import type { PortableTextBlock } from "@portabletext/types";

type Child = PortableTextBlock["children"][number];

export default defineType({
  name: "updateItem",
  title: "Update Item",
  type: "object",
  icon: BookIcon,

  fields: [
    defineField({
      name: "update",
      type: "blockContent",
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "string",
    }),
  ],

  preview: {
    select: {
      update: "update",
    },

    prepare({ update }) {
      const blocks = update as PortableTextBlock[] | undefined;

      const firstBlock = blocks?.find(
        (block): block is PortableTextBlock => block?._type === "block",
      );

      const title =
        firstBlock?.children
          ?.map((child: Child) => ("text" in child ? child.text : ""))
          .join("") || "No content";

      return {
        title,
        subtitle: "Update Item",
      };
    },
  },
});
