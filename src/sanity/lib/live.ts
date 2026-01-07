// src/sanity/lib/live.ts

import { defineLive } from "next-sanity/live";
// import your local configured client
import { client } from "@/sanity/lib/client";

// set your viewer token
const token = process.env.SANITY_VIEWER_TOKEN;
if (!token) {
  throw new Error("Missing SANITY_VIEWER_TOKEN");
}

// export the sanityFetch helper and the SanityLive component
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
