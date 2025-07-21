import prisma from '@/app/libs/prismadb'

export interface ListingProps {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: Date;
  endDate?: Date;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: ListingProps = {}) {
  const {
    userId,
    guestCount,
    roomCount,
    bathroomCount,
    startDate,
    endDate,
    locationValue,
    category
  } = params;

  let query: any = {};

  if (userId) {
    query.userId = userId;
  }

  if (guestCount) {
    query.guestCount = { gte: Number(guestCount) };
  }

  if (roomCount) {
    query.roomCount = { gte: Number(roomCount) };
  }

  if (bathroomCount) {
    query.bathroomCount = { gte: Number(bathroomCount) };
  }

  if (locationValue) {
    query.locationValue = locationValue;
  }

  if (category) {
    query.category = category;
  }

  if (startDate && endDate) {
    query.NOT = {
      reservation: {
        some: {
          AND: [
            { startDate: { lte: endDate } },
            { endDate: { gte: startDate } }
          ]
        }
      }
    };
  }

  try {
    const listings = await prisma.listings.findMany({
      where: query,
      orderBy: { createdAt: 'desc' }
    });


    return listings;
  } catch (error: any) {
    console.error("Error fetching listings:", error);
    throw new Error("Failed to fetch listings.");
  }
}
