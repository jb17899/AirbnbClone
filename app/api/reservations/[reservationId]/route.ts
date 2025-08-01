import { NextResponse,NextRequest } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb';
import toast from "react-hot-toast";

interface Iparams{
    reservationId?:string
};
export async function DELETE(request:NextRequest,context:{params:Iparams}){
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }
    const {reservationId} =context.params;
    if(!reservationId||typeof reservationId!="string"){
        toast.error("Invalid Id");
    }
    const responseRes = await prisma.reservation.deleteMany({
        where:{
            id:reservationId,
            OR:[
                {userId:currentUser.id},
                {listing:{id:currentUser.id}}
            ]
        }
    });
    return NextResponse.json(responseRes);
}
