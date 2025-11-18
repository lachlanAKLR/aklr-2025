import { PortableText } from "next-sanity";
import { portableTextComponents } from "./PortableTextComponents";
import { BUILD_QUERYResult } from "../../../sanity.types";

export default function BuildText({ text }: { text: BUILD_QUERYResult }) {
  return (
    <div className="text-white">
      <h2 className="font-herbik-reg relative top-[7.2px] left-0 w-fit px-2 pt-8 text-base md:fixed md:left-20 md:px-0 md:pt-0">
        Build
      </h2>
      <div className="site-grid pt-2 pb-16 md:pt-6 md:pb-32">
        <div className="col-span-12 pt-0 md:col-span-6 md:pt-6">
          <PortableText
            //@ts-expect-error: error
            value={text?.buildText}
            components={portableTextComponents}
          />
        </div>
      </div>
    </div>
  );
}
