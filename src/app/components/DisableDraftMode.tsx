
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useDraftModeEnvironment } from "next-sanity/hooks";
import { disableDraftMode } from "../action";

export function DisableDraftMode() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const environment = useDraftModeEnvironment();

  // Only show outside Presentation Tool
  if (environment !== "live" && environment !== "unknown") return null;

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode();
      router.refresh();
    });

  return (
    <button
      type="button"
      className="fixed left-2 bg-white bottom-2 z-100 w-fit cursor-pointer border p-4 text-sm uppercase"
      onClick={disable}
      disabled={pending}
    >
      {pending ? "Disabling draft mode…" : "Disable draft mode"}
    </button>
  );
}
