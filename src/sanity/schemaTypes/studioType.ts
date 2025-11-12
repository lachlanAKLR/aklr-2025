import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const studioType = defineType({
  name: "studio",
  title: "Studio",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "about",
      type: "blockContent",
    }),
    defineField({
      name: "excerpt",
      type: "string",
    }),
    defineField({
      name: "address",
      type: "blockContent",
    }),
    defineField({
      name: "contact",
      type: "blockContent",
    }),
    defineField({
      name: "social",
      type: "blockContent",
    }),
    defineField({
      name: "studioImages",
      title: "Studio Images",
      type: "array",
      of: [{ type: "projectImage", title: "Image" }],
      validation: (Rule) => Rule.max(2),
    }),

    defineField({
      name: "titledLists",
      title: "Titled Lists",
      type: "array",
      of: [{ type: "titledList" }],
    }),
    defineField({
      name: "media",
      type: "array",
      of: [{ type: "mediaItem", title: "Media Item" }],
    }),
    defineField({
      name: "bottomImage",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Client, Description, AKLR Studio.",
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Studio",
      };
    },
  },
});
