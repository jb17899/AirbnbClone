'use client'

import { BiSearch } from "react-icons/bi"
import useSearchModal from "../hooks/useSearchModal"

const Search = () => {
    const searchModal = useSearchModal();
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
                Anywhere
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
                Any Week
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
                <div className="hidden sm:block">Add Guests</div>
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
