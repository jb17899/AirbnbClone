import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/actions/getCurrentUser';


export async function POST(request:Request){
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }
    const body = await request.json();

    const{
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price
     } = body;
     console.log(price)
Object.keys(body).forEach((element)=>{
    if(!body[element]){
        return NextResponse.error();
    }
})

const listings = await prisma.listings.create({
    data:{
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue:location.value,
        price:parseInt(price,10),
        userId:currentUser.id
    }
})
return NextResponse.json(listings);
}