import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET(request: Request) {
  const locations = await prisma.location.findMany();
  return NextResponse.json(locations);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { label } = body;

  const location = await prisma.location.create({
    data: {
      label,
    },
  });

  return NextResponse.json(location);
}
