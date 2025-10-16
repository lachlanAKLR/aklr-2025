import { defineType, defineField } from "sanity";

export default defineType({
  name: "video",
  title: "Video",
  type: "object",
  fields: [
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
  ],
  preview: {
    select: {
      title: "text.en",
      media: "posterImage",
    },
    prepare({ title, media }) {
      return {
        title: title || "Video",
        media,
      };
    },
  },
});
