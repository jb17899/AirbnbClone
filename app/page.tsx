import { getCurrentUser } from "./actions/getCurrentUser";
import getListings, { ListingProps } from "./actions/getListings";
import ClientOnly from "./src/components/ClientOnly";
import Container from "./src/components/Container";
import EmptyState from "./src/components/EmptyState";
import ListingCard from "./src/components/ListingCard";

interface SearchParamsProps {
  searchParams: ListingProps;
}

export default async function Home({ searchParams }: SearchParamsProps) {
  const currentUser = await getCurrentUser();
  const listings = await getListings(await searchParams);

  if (!listings || listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="
          pt-24
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        ">
          {listings.map((listing: any) => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
