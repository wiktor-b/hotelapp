import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface Params {
  id: string;
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const { id } = params;

  const location = await prisma.location.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(location);
}