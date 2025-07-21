
'use client'

import { User } from "@/app/generated/prisma"
import { useCallback, useState } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import useFavorite from "../hooks/useFavorites"

interface heartButtonProps {
    listingId?: string,
    currentUser?: User | null
};

const HeartButton: React.FC<heartButtonProps> = ({
    listingId,
    currentUser
}) => {
    if(!listingId){
        return null;
    }
    const {
        hasFavorited,toggleFavorite
    } = useFavorite({listingId,currentUser});
    return (
        <div onClick={toggleFavorite} className="relative hover:opacity-80 transition cursor-pointer">
            <AiOutlineHeart
                size={28} className={`${hasFavorited == false?`fill-white`:`fill-transparent`}`} />
            <AiFillHeart size={24} className={`absolute top-[1.6px] left-[2px] ${hasFavorited == true?`fill-rose-500`:`fill-neutral-500/70`}`} />
        </div>
    )
}

export default HeartButton
