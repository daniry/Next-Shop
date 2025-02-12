import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export async function GET() {
    const ingredients = await prisma.user.findMany();
    return NextResponse.json(ingredients);
}
