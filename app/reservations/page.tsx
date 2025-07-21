import EmptyState from "../src/components/EmptyState"
import ClientOnly from "../src/components/ClientOnly"
import { getCurrentUser } from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations";
import ReservationClient from "./ReservationClient";
const reservations = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please Login" />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({
        authorId: currentUser.id
    });
    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title="No Reservations Found" subtitle="Looks like you have no reservations" />
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <ReservationClient reservations={reservations} currentUser={currentUser} />
        </ClientOnly>
    )
}

export default reservations
