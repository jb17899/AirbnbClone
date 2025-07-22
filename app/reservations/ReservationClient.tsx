'use client'
import { Reservation, Listings,User } from "../generated/prisma"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import Container from "../src/components/Container"
import Heading from "../src/components/Heading"
import axios from "axios"
import toast from "react-hot-toast"
import ListingCard from "../src/components/ListingCard"


interface resClientProps {
    reservations: Array<Reservation & { listing: Listings }>,
    currentUser?: User|null
}
const ReservationClient: React.FC<resClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");
    const onCancel = useCallback((id?: string) => {
        if (!id || id === undefined) {
            console.log("error no id");
            return null;
        }
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success("Successfully deleted the Reservation");
                router.refresh();
            })
            .catch((error) => {
                console.log(error);
                toast.error("Some error occured While deleting reservation");
            })
            .finally(() => {
                setDeletingId("");
            })
    }, []);
    return (
        <Container>
            <Heading title="Reservations" subtitle="Bookings on Your Properties" />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations.map((element) => {
                    return (
                        <ListingCard
                            key={element.id}
                            data={element.listing}
                            reservation={element}
                            actionId={element.id}
                            onAction={onCancel}
                            disabled={deletingId == element.id}
                            actionLabel="Cancel guest Reservation"
                            currentUser={currentUser}
                        />
                    )
                })}
            </div>

        </Container>
    )
}

export default ReservationClient
