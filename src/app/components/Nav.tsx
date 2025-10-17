"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const isStudio = pathname.includes("/admin");

  return isStudio ? null : (
    <nav className="font-dia-bold fixed top-0 left-0 flex w-full justify-between p-2 text-base">
      <Link href="/">AKLR</Link>
      <div>
        <Link href="/">Projects</Link>, <Link href="/overview">Index</Link>,{" "}
        <Link href="/studio">Studio</Link>
      </div>
    </nav>
  );
}
