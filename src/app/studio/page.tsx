import { STUDIO_QUERY } from "@/sanity/lib/queries";
import StudioContent from "../components/StudioContent";
import { sanityFetch } from "@/sanity/lib/live";
import PageWrapper from "../utils/PageWrapper";

export default async function Page() {
  const { data } = await sanityFetch({ query: STUDIO_QUERY });

  return (
    <main>
      <PageWrapper>
        <StudioContent content={data} />
      </PageWrapper>
    </main>
  );
}
