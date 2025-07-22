import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export async function POST(
  request: Request,
  context: { params: IParams }
) {
  const user = await getCurrentUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { listingId } = context.params;
  console.log(listingId);
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

export async function DELETE(
  request: Request,
  context: { params: IParams }
) {
  const user = await getCurrentUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { listingId } = context.params;
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
