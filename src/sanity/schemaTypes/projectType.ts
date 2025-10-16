import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "client",
      type: "string",
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "mainImage",
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
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      options: {
        list: [
          { title: "Small", value: "small" },
          { title: "Medium", value: "medium" },
          { title: "Large", value: "large" },
        ],
        layout: "radio",
      },
    }),

    defineField({
      name: "info",
      type: "blockContent",
    }),
    defineField({
      name: "projectTags",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: { type: "projectTag" },
        }),
      ],
    }),
    defineField({
      name: "projectImages",
      type: "array",
      of: [
        { type: "projectImage", title: "Image" },
        { type: "video", title: "Video" },
      ],
    }),
    defineField({
      name: "orderRank",
      type: "string",
      title: "Order Rank",
      hidden: true,
    }),
  ],
  preview: {
    select: {
      client: "client",
      title: "title",
      size: "size",
      media: "mainImage",
    },
    prepare({ client, title, size, media }) {
      const combinedTitle = title ? `${client} — ${title}` : client;

      return {
        title: combinedTitle,
        subtitle: size || undefined,
        media,
      };
    },
  },
});
