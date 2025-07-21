import EmptyState from "../src/components/EmptyState";
import ClientOnly from "../src/components/ClientOnly";
import { getCurrentUser } from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage= async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please Login" />
      </ClientOnly>
    );
  }
  const listing = await getListings({
    userId: currentUser.id,
  });

  if (listing.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No trips found" subtitle="Looks like you haven't reserved" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listing} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertiesPage;
