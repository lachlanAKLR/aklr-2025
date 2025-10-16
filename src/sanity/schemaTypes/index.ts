import { type SchemaTypeDefinition } from "sanity";
import { projectType } from "./projectType";
import projectImage from "./objects/projectImage";
import { blockContentType } from "./blockContentType";
import { projectTagType } from "./projectTagType";
import video from "./objects/video";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, projectImage, blockContentType, projectTagType, video],
};
