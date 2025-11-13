import { STUDIO_QUERY } from "@/sanity/lib/queries";
import StudioContent from "../components/StudioContent";
import { sanityFetch } from "@/sanity/lib/live";
import PageWrapper from "../utils/PageWrapper";
import StudioUpdates from "../components/StudioUpdates";

export default async function Page() {
  const { data } = await sanityFetch({ query: STUDIO_QUERY });

  return (
    <main>
      <PageWrapper>
        <StudioContent content={data} />
        <StudioUpdates content={data} />
      </PageWrapper>
    </main>
  );
}
