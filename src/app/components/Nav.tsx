"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const isStudio = pathname.includes("/admin");

  const isHome = pathname === "/" || pathname.includes("/project");

  const isIndex = pathname === "/index";
  const isStudioPage = pathname === "/studio";

  return isStudio ? null : (
    <nav>
      <div className="font-dia-bold fixed top-2 left-2 z-50 text-sm md:text-base">
        <Link href="/">AKLR</Link>
      </div>

      <div className="font-dia-bold fixed top-2 right-2 z-50 text-sm md:text-base">
        <Link className="group" href="/">
          <span className="relative bottom-0.25">[</span>
          <span
            className={`${isHome ? "opacity-100" : "opacity-0"} relative top-[3.5px] px-0.5 uppercase opacity-0 transition-all duration-150 group-hover:opacity-100`}
          >
            *
          </span>
          <span className="relative bottom-0.25 pr-0.5">]</span>
          Projects
        </Link>

        <Link className="group ml-2" href="/index">
          <span className="relative bottom-0.25">[</span>
          <span
            className={`${isIndex ? "opacity-100" : "opacity-0"} relative top-[3.5px] px-0.5 uppercase opacity-0 transition-all duration-150 group-hover:opacity-100`}
          >
            *
          </span>
          <span className="relative bottom-0.25 pr-0.5">]</span>
          Index
        </Link>

        <Link className="group ml-2" href="/studio">
          <span className="relative bottom-0.25">[</span>
          <span
            className={`${isStudioPage ? "opacity-100" : "opacity-0"} relative top-[3.5px] px-0.5 uppercase opacity-0 transition-all duration-150 group-hover:opacity-100`}
          >
            *
          </span>
          <span className="relative bottom-0.25 pr-0.5">]</span>
          Studio
        </Link>
      </div>
    </nav>
  );
}
