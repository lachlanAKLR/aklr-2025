import { PortableText } from "next-sanity";
import { STUDIO_QUERYResult } from "../../../sanity.types";
import { portableTextComponents } from "./PortableTextComponents";
import { dataset, projectId } from "@/sanity/env";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import FadeInImage from "../utils/FadeInImage";
import StudioUpdates from "./StudioUpdates";

const builder = imageUrlBuilder({ projectId, dataset });

export default function StudioContent({
  content,
}: {
  content: STUDIO_QUERYResult;
}) {
  return (
    <div>
      <div className="site-grid pt-[52px]">
        {content?.about ? (
          <div className="col-span-12 md:col-span-6">
            <PortableText
              value={content?.about}
              components={portableTextComponents}
            />
          </div>
        ) : null}
      </div>
      <div className="site-grid pb-10 md:pb-20">
        {content?.address ? (
          <div className="col-span-12 md:col-span-4">
            <PortableText
              value={content?.address}
              components={portableTextComponents}
            />
            {content?.contact ? (
              <PortableText
                value={content?.contact}
                components={portableTextComponents}
              />
            ) : null}
          </div>
        ) : null}
        {content?.social ? (
          <div className="col-span-12 md:col-span-2">
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
            <div key={index} className="col-span-6 md:col-span-4">
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
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
      {content?.titledLists && (
        <div className="site-grid">
          <div className="site-grid col-span-12 !pr-0 !pl-0 md:col-span-8">
            {content.titledLists.map((list, index) => (
              <div key={index} className="col-span-6 pt-12">
                <div className="font-dia-bold pb-2 text-xs uppercase">
                  {list.title}
                </div>
                {Array.isArray(list.items) &&
                  list.items.map((item, j) => (
                    <div
                      key={j}
                      className="font-herbik-reg text-sm md:text-base"
                    >
                      {item}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {content?.media && (
        <div className="px-2 pt-12">
          <div className="font-dia-bold pb-2 text-xs uppercase">Press</div>
          <div className="flex flex-col gap-1">
            {content?.media.map((item, index) => (
              //@ts-expect-error: href error
              <a href={item?.link} target="_blank" key={index} className="">
                <p className="font-herbik-italic custom-underline text-sm md:text-base">
                  {item.title}
                </p>
              </a>
            ))}
          </div>
        </div>
      )}

      {content?.bottomImage && (
        <div className="site-grid py-32 md:py-80">
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
            className="col-start-4 col-end-10 md:col-start-5 md:col-end-9 md:p-20"
          />
        </div>
      )}

      <StudioUpdates content={content} />
    </div>
  );
}
