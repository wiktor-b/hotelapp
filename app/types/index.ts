import { Reservation, User } from "@prisma/client";
import getListingById from "../actions/getListingById";
import getReservations from "../actions/getReservations";

export type SafeListing = NonNullable<
  Awaited<ReturnType<typeof getListingById>>
>;

export type SafeReservation = Awaited<ReturnType<typeof getReservations>>[0];

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
