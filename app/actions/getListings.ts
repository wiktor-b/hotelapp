import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { Prisma } from "@prisma/client";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationId?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      roomCount,
      userId,
      guestCount,
      bathroomCount,
      startDate,
      locationId,
      endDate,
    } = params;

    let query: Prisma.ListingWhereInput = {};

    if (userId) {
      query.userId = {
        equals: userId,
      };
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (locationId) {
      query.locationId = locationId;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        location: true,
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
