import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    roomCount,
    bathroomCount,
    guestCount,
    locationId,
    price,
  } = body;

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      roomCount,
      bathroomCount,
      guestCount,
      location: { connect: { id: locationId } },
      user: { connect: { id: currentUser.id } },
      price: parseInt(price, 10),
    },
  });

  return NextResponse.json(listing);
}
