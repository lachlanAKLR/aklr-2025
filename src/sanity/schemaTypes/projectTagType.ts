import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const projectTagType = defineType({
  name: "projectTag",
  title: "Project Tag",
  type: "document",
  icon: TagIcon,
  fields: [
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
  ],
});
