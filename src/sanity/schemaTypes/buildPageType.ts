import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const buildPageType = defineType({
  name: "buildPage",
  title: "Build Page",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "buildText",
      type: "blockContent",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Builds Page",
      };
    },
  },
});
