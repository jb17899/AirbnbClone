'use client'
import { Listings, Reservation, User } from "@/app/generated/prisma";
import { useCallback, useEffect, useMemo, useState } from "react";
import categories from "./navbar/CategoriesList";
import Container from "./Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import useLoginModal from "./hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "./ListingReservation";
import { Range } from "react-date-range";

export interface dateRangeProps {
  start: Date;
  end: Date;
  key: string;
}
const initialDateRange:Range={
  startDate:new Date(),
  endDate:new Date(),
  key:'selection'
};
interface listingProps {
  reservations?: Reservation[];
  listing: Listings & { user: User };
  currentUser: User | null;
}

const ListingClient: React.FC<listingProps> = ({
  listing,
  currentUser,
  reservations = []
}) => {
  const loginModel = useLoginModal();
  const router = useRouter();
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations?.forEach((reservations: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservations.startDate),
        end: (reservations.endDate)
      });
      dates = [...dates, ...range];
    })
    return dates;

  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dataRange, setDataRange] = useState(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModel.onOpen();
    }
    setIsLoading(true);
    axios.post('/api/reservations', {
      totalPrice,
      startDate: dataRange.startDate,
      endDate: dataRange.endDate,
      listingId: listing.id
    })
      .then(() => {
        toast.success("all done");
        setDataRange(initialDateRange);
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [currentUser, loginModel, totalPrice, dataRange, listing.id, router]);
  useEffect(() => {
    if (dataRange.startDate && dataRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dataRange.endDate,
        dataRange.startDate
      );
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      }
      else {
        setTotalPrice(listing.price);
      }
    }
  }, [dataRange, listing.price]);

  const category = useMemo(() => {
    const val = categories.find((item) => item.label === listing?.category);
    return val;
  }, [listing?.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing?.title}
            imageSrc={listing?.imageSrc}
            locationValue={listing?.locationValue}
            id={listing?.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChange={(value) => { setDataRange(value) }}
                dateRange={dataRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
