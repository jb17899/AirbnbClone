import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface Iparams {
  listingId?: string;
}

export async function POST(
  request: Request,
  { params }: { params: Iparams }
) {
  const user = await getCurrentUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    throw new Error("No Listing Id");
  }

  let favoriteIds = [...(user.favoriteIds || [])];
  favoriteIds.push(listingId);

  const response = await prisma.user.update({
    where: { id: user.id },
    data: { favoriteIds },
  });

  return NextResponse.json(response, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: Iparams }
) {
  const user = await getCurrentUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    throw new Error("No Listing Id");
  }

  let favoriteIds = [...(user.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const response = await prisma.user.update({
    where: { id: user.id },
    data: { favoriteIds },
  });

  return NextResponse.json(response, { status: 200 });
}
