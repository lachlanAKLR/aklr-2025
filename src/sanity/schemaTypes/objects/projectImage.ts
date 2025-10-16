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
  ],
  preview: {
    select: {
      media: "asset",
      title: "asset.altText",
    },
  },
});
