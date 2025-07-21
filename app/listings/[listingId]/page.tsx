import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { getListingById } from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import ClientOnly from "@/app/src/components/ClientOnly";
import EmptyState from "@/app/src/components/EmptyState";
import ListingClient from "@/app/src/components/ListingClient";

interface Iparams{
  listingId?:string
};
const ListingPage = async({params}:{params:Iparams}) => {
const listing = await getListingById(params);
const currentUser = await getCurrentUser();

  const reservation = await getReservations(params);
if(!listing){
  return (
    <ClientOnly>
      <EmptyState/>
    </ClientOnly>
  )
}
  return (
    <ClientOnly>
      <ListingClient listing ={listing.listing} currentUser={currentUser} reservations={reservation}/>
    </ClientOnly>
  )
}

export default ListingPage;
