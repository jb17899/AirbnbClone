
import { getCurrentUser } from "./actions/getCurrentUser";
import getListings, { ListingProps } from "./actions/getListings";
import ClientOnly from "./src/components/ClientOnly";
import Container from "./src/components/Container";
import EmptyState from "./src/components/EmptyState";
import ListingCard from "./src/components/ListingCard";

interface SearchParmsProps{
  SearchParams:ListingProps
};


export default async function Home(searchParam:SearchParmsProps) {
  const currentUser = await getCurrentUser();
  const listings = await getListings(searchParam.SearchParams);


  const isEmpty = true;
  if(listings.length == 0){
    return (
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
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
          {listings.map((listings:any)=>{
            return (
              <ListingCard
              key={listings.title}
              data={listings}
              currentUser={currentUser}
              />
            )
          })}


        </div>
      </Container>
    </ClientOnly>
  );
}
