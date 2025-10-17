import { defineType, defineField } from "sanity";
import { BookIcon } from "@sanity/icons";

export default defineType({
  name: "mediaItem",
  title: "Media Item",
  type: "object",
  icon: BookIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "string",
    }),
    defineField({
      name: "publisher",
      title: "Publisher",
      type: "string",
    }),
    defineField({
      name: "date",
      type: "date",
    }),
  ],
});
