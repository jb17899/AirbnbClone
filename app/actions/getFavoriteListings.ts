import prisma from '@/app/libs/prismadb'
import { getCurrentUser } from './getCurrentUser'
import toast from 'react-hot-toast';

export default async function getFavoriteListings(){
    try{
        const currentUser = await getCurrentUser();
        if(!currentUser){
            return [];
        }
        const favIdValue = await prisma.listings.findMany({
            where:{
                id:{
                    in:[...(currentUser.favoriteIds||[])]
                }
            }
        });
        return favIdValue;
    }
    catch(error){
        console.log(error);
        toast.error("Some error happened while getting Favorite Listings.");
    }
}