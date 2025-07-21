import axios from "axios";
import { use, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { User } from "@/app/generated/prisma";
import useLoginModal from "./useLoginModal";

interface useFavoritesProps {
    listingId: string,
    currentUser?: User | null,
};
const useFavorite = ({
    listingId,
    currentUser
}: useFavoritesProps) => {
    const router = useRouter();
    const loginModel = useLoginModal();
    if(listingId == null){
        toast.error("No Listing Id");
    }
    const hasFavorited = useMemo(() => {
        const lists = currentUser?.favoriteIds || [];
        return lists.includes(listingId);
    }, [currentUser, listingId]);
    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!currentUser) {
            return loginModel.onOpen();
        }
        try {
            let request;
            if (!hasFavorited) {
                request = async() => {
                    await axios.post(`/api/favorites/${listingId}`);
                }

            toast.success("❤️ Successfully Favorited This.");
            }
            else {
                request = async() => {
                    await axios.delete(`/api/favorites/${listingId}`);
                }

            toast.success("❤️ Successfully Unfavorited This.");
            }
            await request();
            router.refresh();

        }
        catch (error) {
            console.log(error);
            toast.error("💀 Error in Favoriting this.")
        }
    }, [currentUser,loginModel,hasFavorited,router]);
    return{
        hasFavorited,toggleFavorite
    };
} 
export default useFavorite;