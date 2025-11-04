"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const isStudio = pathname.includes("/admin");

  return isStudio ? null : (
    <nav>
      <div className="font-dia-bold fixed top-2 left-2 z-50 text-base">
        <Link href="/">AKLR</Link>
      </div>

      <div className="font-dia-bold fixed top-2 right-2 z-50 text-base">
        <Link href="/">Projects</Link>, <Link href="/overview">Index</Link>,{" "}
        <Link href="/studio">Studio</Link>
      </div>
    </nav>
  );
}
