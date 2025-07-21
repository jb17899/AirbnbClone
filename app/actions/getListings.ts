import prisma from '@/app/libs/prismadb'

export interface ListingProps{
    userId?:string
};
export default async function getListings(params:ListingProps){
    try{
        const listings = await prisma.listings.findMany({
            orderBy:{
                createdAt:'desc'
            }
        });
        return listings;
    }catch(error:any){
        throw new Error(error);
    }
}