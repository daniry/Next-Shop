import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // console.log("DB URL:", process.env.POSTGRES_PRISMA_URL);
        const categories = await prisma.category.findMany({
            include: {
                products: {
                    include: {
                        ingredients: true,
                        items: true,
                    },
                },
            },
        });
        // console.log("Categories:", categories);
        return NextResponse.json(categories);
    } catch (error) {
        console.error("Prisma error:", String(error));
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
