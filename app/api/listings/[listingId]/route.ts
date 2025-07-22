import { getCurrentUser } from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

interface idProps {
    listingId?: string
};
export async function DELETE(request:Request,context:{params:idProps}){
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }
    const {listingId} = context.params;
    if(!listingId || typeof listingId !=="string"){
        throw new Error("No listing Id");
    }
    const listing = await prisma.listings.deleteMany({
        where:{
            id:listingId,
            userId:currentUser.id
        }
    });
return NextResponse.json(listing);
}
