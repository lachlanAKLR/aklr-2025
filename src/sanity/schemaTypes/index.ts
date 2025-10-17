import { type SchemaTypeDefinition } from "sanity";
import { projectType } from "./projectType";
import projectImage from "./objects/projectImage";
import { blockContentType } from "./blockContentType";
import { projectTagType } from "./projectTagType";
import video from "./objects/video";
import { studioType } from "./studioType";
import mediaItem from "./objects/mediaItem";
import { titledList } from "./objects/titledList";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    projectType,
    projectImage,
    blockContentType,
    projectTagType,
    video,
    studioType,
    mediaItem,
    titledList,
  ],
};
