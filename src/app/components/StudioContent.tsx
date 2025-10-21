import { PortableText } from "next-sanity";
import { STUDIO_QUERYResult } from "../../../sanity.types";
import { portableTextComponents } from "./PortableTextComponents";
import { dataset, projectId } from "@/sanity/env";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import FadeInImage from "../utils/FadeInImage";

const builder = imageUrlBuilder({ projectId, dataset });

export default function StudioContent({
  content,
}: {
  content: STUDIO_QUERYResult;
}) {
  return (
    <>
      <div className="site-grid pt-[52px]">
        {content?.about ? (
          <div className="col-span-8">
            <PortableText
              value={content?.about}
              components={portableTextComponents}
            />
          </div>
        ) : null}
      </div>
      <div className="site-grid pb-20">
        {content?.address ? (
          <div className="col-span-4">
            <PortableText
              value={content?.address}
              components={portableTextComponents}
            />
          </div>
        ) : null}
        {content?.contact ? (
          <div className="col-span-2">
            <PortableText
              value={content?.contact}
              components={portableTextComponents}
            />
          </div>
        ) : null}
        {content?.social ? (
          <div className="col-span-2">
            <PortableText
              value={content?.social}
              components={portableTextComponents}
            />
          </div>
        ) : null}
      </div>
      {content?.studioImages && (
        <div className="site-grid">
          {content.studioImages.map((image, index) => (
            <div key={index} className="col-span-4">
              <FadeInImage
                src={builder
                  .image(image?.asset?.asset as SanityImageSource)
                  .width(2000)
                  .fit("max")
                  .auto("format")
                  .url()}
                width={1000}
                height={2000}
                alt={image?.asset?.altText ?? ""}
                className=""
              />
            </div>
          ))}
        </div>
      )}
      {content?.titledLists && (
        <div className="site-grid">
          {content.titledLists.map((list, index) => (
            <div key={index} className="col-span-4 pt-16">
              <div className="font-dia-bold text-sm uppercase">
                {list.title}
              </div>
              {Array.isArray(list.items) &&
                list.items.map((item, j) => (
                  <div key={j} className="font-herbik-reg text-base">
                    {item}
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}
      {content?.bottomImage && (
        <div className="site-grid py-96">
          <FadeInImage
            src={builder
              .image(content?.bottomImage?.asset as SanityImageSource)
              .width(2000)
              .fit("max")
              .auto("format")
              .url()}
            width={1000}
            height={2000}
            alt={content?.bottomImage?.alt ?? ""}
            className="col-start-5 col-end-9 p-10"
          />
        </div>
      )}
    </>
  );
}
