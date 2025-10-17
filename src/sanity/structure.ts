import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

import { MasterDetailIcon } from "@sanity/icons";
import { InfoOutlineIcon } from "@sanity/icons";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.divider(),
      orderableDocumentListDeskItem({
        type: "project",
        title: "Projects",
        S,
        icon: MasterDetailIcon,
        context,
      }),
      S.listItem()
        .title("Studio")
        .icon(InfoOutlineIcon)
        .child(S.document().schemaType("studio").documentId("studio")),

      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !["project", "projectTag", "media.tag", "studio"].includes(
            item.getId()!,
          ),
      ),
    ]);
