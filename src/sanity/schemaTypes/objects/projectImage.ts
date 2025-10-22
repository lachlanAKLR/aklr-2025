import { defineType, defineField } from "sanity";

export default defineType({
  name: "projectImage",
  title: "Project Image",
  type: "object",
  fields: [
    defineField({
      name: "asset",
      type: "image",
      title: "Image file",
      fields: [
        {
          name: "altText",
          type: "string",
          title: "Alternative text",
          description: "Client, Description, AKLR Studio.",
        },
      ],
    }),
    defineField({
      name: "isFourColumn",
      title: "4 Column (default 6)",
      type: "boolean",
      initialValue: false,
      options: { layout: "switch" },
    }),
  ],
  preview: {
    select: {
      media: "asset",
      title: "asset.altText",
      isFourColumn: "isFourColumn",
    },
    prepare({ title, media, isFourColumn }) {
      return {
        title: title || "Untitled Image",
        subtitle: isFourColumn ? "4 Column" : "Default Width",
        media,
      };
    },
  },
});
