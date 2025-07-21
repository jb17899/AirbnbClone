import prisma from '@/app/libs/prismadb';

interface idProps {
    listingId?: string
};
export async function getListingById(
    params: idProps
) {
    try {
        const { listingId } = await params;
        const listing = await prisma.listings.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        });
        if (!listing) {
            return null;
        }
        return {
            listing,...listing.user
        };
    }
    catch (error) {
        console.log(error);
        throw new Error("Error id");
    }
}
