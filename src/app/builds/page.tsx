import { sanityFetch } from "@/sanity/lib/live";
import { BUILD_QUERY, BUILDS_QUERY } from "@/sanity/lib/queries";
import BuildsScroller from "../components/BuildsScroller";
import BuildText from "../components/BuildText";

export default async function Page() {
  const { data } = await sanityFetch({ query: BUILDS_QUERY });
  const { data: text } = await sanityFetch({ query: BUILD_QUERY });

  return (
    <main className="bg-black pb-40">
      <BuildText text={text} />
      <BuildsScroller data={data} />
    </main>
  );
}
