import { getCurrentUser } from "../actions/getCurrentUser"
import getFavoriteListings from "../actions/getFavoriteListings";
import ClientOnly from "../src/components/ClientOnly"
import EmptyState from "../src/components/EmptyState"
import FavoritesClient from "./FavoritesClient";


const ListingPage = async () => {
    const currentUser = await getCurrentUser();
    const favoriteListings = await getFavoriteListings();
    if (!favoriteListings || favoriteListings?.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title="No Favorites Found" subtitle="Looks Like you have no Favorites" />
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <FavoritesClient listing={favoriteListings} currentUser={currentUser}/>
        </ClientOnly>
    )
}

export default ListingPage;
