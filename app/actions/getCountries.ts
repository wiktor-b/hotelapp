import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

export default async function getCountries() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const locations = await prisma.location.findMany();

    return locations.map(({ id, label }) => ({ value: id, label }));
  } catch (error: any) {
    throw new Error(error);
  }
}
