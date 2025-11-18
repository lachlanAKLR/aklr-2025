import { defineType, defineField, defineArrayMember } from "sanity";

export const buildType = defineType({
  name: "build",
  title: "Build",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "isFeatured",
      title: "Add to Pop-up",
      type: "boolean",
      initialValue: false,
      options: { layout: "switch" },
    }),
    defineField({
      name: "videoFile",
      title: "Video File",
      type: "file",
      options: {
        accept: "video/mp4,video/webm,video/ogg",
      },
    }),
    defineField({
      name: "posterImage",
      title: "Poster Image",
      type: "image",
    }),
    defineField({
      name: "siteLink",
      title: "Site Link",
      type: "string",
    }),
    defineField({
      name: "credit",
      title: "Credit",
      type: "string",
    }),
    defineField({
      name: "creditUrl",
      title: "Credit Link",
      type: "string",
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
      name: "orderRank",
      type: "string",
      title: "Order Rank",
      hidden: true,
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "posterImage",
      isFeatured: "isFeatured",
    },
    prepare({ title, media, isFeatured }) {
      return {
        title: isFeatured ? `${title} (Featured)` : title,
        media,
      };
    },
  },
});
