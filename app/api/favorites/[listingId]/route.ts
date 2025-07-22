import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

// Types from Next.js (optional but helpful)
import type { NextApiRequest } from "next";

// Declare the route param type
interface IParams {
  listingId?: string;
}

// POST /api/favorites/[listingId]
export async function POST(
  request: NextRequest,
  { params }: { params: IParams }
) {
  const user = await getCurrentUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    return new NextResponse("Invalid ID", { status: 400 });
  }

  const favoriteIds = [...(user.favoriteIds || []), listingId];

  const response = await prisma.user.update({
    where: { id: user.id },
    data: { favoriteIds },
  });

  return NextResponse.json(response);
}

// DELETE /api/favorites/[listingId]
export async function DELETE(
  request: NextRequest,
  { params }: { params: IParams }
) {
  const user = await getCurrentUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    return new NextResponse("Invalid ID", { status: 400 });
  }

  let favoriteIds = [...(user.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const response = await prisma.user.update({
    where: { id: user.id },
    data: { favoriteIds },
  });

  return NextResponse.json(response);
}
