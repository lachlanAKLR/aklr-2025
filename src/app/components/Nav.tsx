"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const isStudio = pathname.includes("/admin");

  const isHome = pathname === "/";
  const isIndex = pathname === "/overview";
  const isStudioPage = pathname === "/studio";

  return isStudio ? null : (
    <nav>
      <div className="font-dia-bold fixed top-2 left-2 z-50 text-sm md:text-base">
        <Link href="/">AKLR</Link>
      </div>

      <div className="font-dia-bold fixed top-2 right-2 z-50 text-sm md:text-base">
        <Link className={`${isHome ? "underline" : ""}`} href="/">
          Projects
        </Link>
        ,{" "}
        <Link className={`${isIndex ? "underline" : ""}`} href="/overview">
          Index
        </Link>
        ,{" "}
        <Link className={`${isStudioPage ? "underline" : ""}`} href="/studio">
          Studio
        </Link>
      </div>
    </nav>
  );
}
