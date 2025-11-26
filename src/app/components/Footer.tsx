"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isStudio = pathname.includes("/admin");
  const isBuildsPage = pathname === "/build";

  return isStudio ? null : (
    <footer
      className={`${isBuildsPage ? "bg-black text-white" : "bg-white text-black"} font-dia-bold site-grid relative z-90 pb-2 text-xs uppercase md:text-sm`}
    >
      <div className="col-span-12 md:col-start-1 md:col-end-5">
        <div className="pb-4">
          AKLR Studio — a creative partnership
          <br /> based in Naarm (Melbourne)
        </div>
        <div>
          GROUND FLOOR, 121 ROKEBY ST
          <br /> COLLINGWOOD, VIC 3066
        </div>
      </div>
      <div className="col-span-12 md:col-start-5 md:col-end-9">
        <div className="pb-4">
          <a href="mailto:alex@aklr.xyz" target="_blank">
            <p>alex@aklr.xyz</p>
          </a>
          <a href="tel:+61 402 244 799">
            <p>+61 402 244 799</p>
          </a>
        </div>
        <div>
          <a href="https://www.instagram.com/aklr.studio/" target="_blank">
            <p>Instagram</p>
          </a>
          <a
            href="https://www.linkedin.com/company/aklr-studio"
            target="_blank"
          >
            <p>LinkedIn</p>
          </a>
        </div>
      </div>
      <div className="text-2xs col-span-12 pt-10 md:col-start-9 md:col-end-13 md:pt-0 md:text-xs">
        <p>©AKLR Studio, {new Date().getFullYear()}</p>
        <p>
          We acknowledge the Boon Wurrung & Wurundjeri peoples of the Kulin
          nation as the traditional custodians of the land where we live, work &
          play. We pay our respects to their Elders past & present. Sovereignty
          has never been ceded. Always was, always will be Aboriginal Land.
        </p>
      </div>
    </footer>
  );
}
