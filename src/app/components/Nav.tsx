"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const isStudio = pathname.includes("/studio");

  return isStudio ? null : (
    <nav className="font-dia-bold flex w-full justify-between p-2 text-sm">
      <div>AKLR</div>
      <div>
        <Link href="/projects">Projects</Link>,{" "}
        <Link href="/overview">Index</Link>, <Link href="/studio">Studio</Link>
      </div>
    </nav>
  );
}
