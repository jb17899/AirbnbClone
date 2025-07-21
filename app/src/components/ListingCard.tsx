'use client'

import { Listings, Reservation, User } from "@/app/generated/prisma"
import useCountries from "./hooks/useCountries";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { format } from 'date-fns';
import Image from "next/image";
import useFavorite from "./hooks/useFavorites";
import Button from "./Button";
import HeartButton from "./navbar/HeartButton";
interface listingCardProps {
  data: Listings;
  reservation?: Reservation;
  onAction?: (id: string | undefined) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: User | null;
}


const ListingCard: React.FC<listingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId,
  currentUser
}) => {
  const router = useRouter();
  const { ByValue } = useCountries();

  const location = ByValue(data.locationValue);
  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      return;
    }
    onAction?.(actionId);

  }, [disabled, onAction, actionId]);
  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);
  const date = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = reservation?.startDate;
    const end = reservation?.endDate;
    return `${format(start, "PP")} - ${format(end, "PP")}`
  }, [reservation]);
  return (
    <div
      onClick={() => { 
        if(!onAction){
        router.push(`/listings/${data.id}`) }}}
      className="col-span-1 group cursor-pointer">
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image fill alt="listing" src={data.imageSrc} className="relative object-cover h-full w-full group-hover:scale-110 transition ease-in-out"/>
          <div className="absolute top-3 right-3">
            <HeartButton
            listingId = {data.id}
            currentUser={currentUser}
            />
          </div>
        </div>
        <div className="font-bold text-lg">
          {location?.label},{location?.region}
        </div>
        <div className="font-md text-neutral-500">
          {date||data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-bold">
            $ {price} 
          </div>
            {!reservation&&(
              <div className="font-light">night</div>
            )}
        </div>
        {onAction&&actionLabel&&(
          <Button disabled={disabled} small label={actionLabel} onClick={handleCancel}/>
        )}
      </div>


    </div>
  )
}

export default ListingCard
