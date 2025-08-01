import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(request:Request){
    const currentUser = await getCurrentUser();
    if(currentUser === null){
        NextResponse.error();
    }

    else{
        const id = currentUser.id;
    }
    const body = await request.json();
    const {
        listingId,
        startDate,
        endDate,
        totalPrice
    } = body;
    if(!listingId||!startDate||!endDate||!totalPrice){
        return NextResponse.error();
    }
    if(currentUser){
    const listingReservation = await prisma.listings.update({
        where:{
            id:listingId
        },
        data:{
            reservation:{
                create:{
                    userId:currentUser?.id,
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        }
    });
    return NextResponse.json(listingReservation);
}
return NextResponse.error();

}