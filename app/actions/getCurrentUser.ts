import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from '@/app/libs/prismadb'


export async function getSession() {
    return getServerSession(authOptions);
}
export async function getCurrentUser() {
    try {
        const session = await getSession();
        if (!session?.user?.email) {
            return null;
        }
        const responseUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });
        if (responseUser == null||undefined) {
            return null;
        }
        return responseUser;
    } catch (error: any) {
        console.log(error);
        return null;
    }
}