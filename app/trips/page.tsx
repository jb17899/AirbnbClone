import EmptyState from "../src/components/EmptyState";
import ClientOnly from "../src/components/ClientOnly";
import { getCurrentUser } from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please Login" />
      </ClientOnly>
    );
  }
  const reservation = await getReservations({
    userId: currentUser.id,
  });

  if (reservation.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No trips found" subtitle="Looks like you haven't reserved" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient reservation={reservation} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default TripsPage;
