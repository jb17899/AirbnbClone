'use client'

import { BiSearch } from "react-icons/bi"
import useSearchModal from "../hooks/useSearchModal"
import { useSearchParams } from "next/navigation";
import useCountries from "../hooks/useCountries";
import { useMemo } from "react";
import { difference } from "next/dist/build/utils";
import { differenceInCalendarDays } from "date-fns";

const Search = () => {
    const searchModal = useSearchModal();
    const paras = useSearchParams();
    const {ByValue} = useCountries();

    const locationValue = paras?.get('locationValue');
    const startDate = paras?.get('startDate');
    const endDate = paras?.get('endDate');
    const guestCount = paras?.get('guestCount');

    const locationLabel = useMemo(() =>{
        if(locationValue) {
            return ByValue(locationValue)?.label;
        }
        return 'Anywhere';},[locationValue, ByValue]);
        
const durationLabel = useMemo(() => {
    if(startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        let diff = differenceInCalendarDays(end, start);
        if(diff === 0) {
            diff = 1;
        }
        return `${diff} Day${diff > 1 ? 's' : ''}`;
    }
    return 'Any Week';
}, [startDate, endDate]);
const guestLabel = useMemo(() => {
    if(guestCount) {
        return `${guestCount} Guest${Number(guestCount) > 1 ? 's' : ''
        }`;
    }
    return 'Add Guests';
}, [guestCount]);

  return (
    <div 
    onClick={searchModal.onOpen}
    className="
    w-full
    md:w-auto
    py-2
    rounded-full
    shadow-sm
    hover:shadow-md
    transition
    cursor-pointer
    ">
        <div className="
        flex
        flex-row
        items-center
        justify-between
        ">
            <div className="
            text-md
            font-semibold
            px-6
            ">
                {locationLabel}
            </div>
            <div className="
            hidden
            sm:block
            text-md
            font-semibold
            border-x-[1px]
            px-6 
            flex-1
            text-center
            ">
                {durationLabel}
            </div>
            <div className="
            text-md
            pl-6
            pr-2
            text-gray-600
            flex
            flex-row
            items-center
            gap-3
            ">
                <div className="hidden sm:block">{guestLabel}</div>
                <div className="p-2
                bg-rose-500
                rounded-full
                text-white">
                    <BiSearch size={18}/>
                </div>

            </div>
        </div>
      
    </div>
  )
}

export default Search
