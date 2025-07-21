import prisma from '@/app/libs/prismadb';

interface Iparams{
    listingId?:string,
    userId?:string,
    authorId?:string
};
export default async function getReservations(params:Iparams){
    try{
    const {listingId,authorId,userId} = await params;
    const query:any={};

    
    if(listingId){
        query.listingId = listingId;
    }
    if(userId){
        query.userId =userId;
    }
    if(authorId){
        query.listing = {userId:authorId};
    }
    const queryVal = await prisma.reservation.findMany({
        where:query,
        include:{
            listing:true,
        },
        orderBy:{
            createdAt:'desc'
        }
    });
    return queryVal;
}catch(error:any){
    throw new Error("Problem Getting Reservations!");
}
}