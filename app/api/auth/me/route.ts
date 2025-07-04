import { prisma } from "@/prisma/prisma-client";
import { getUserSession } from "@/shared/lib/getUserSession";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        // Проверяем есть ли сессия
        const user = await getUserSession();
        if (!user) {
            return NextResponse.json({ message: "Вы не авторизованы" }, { status: 401 });
        }

        const data = await prisma.user.findUnique({
            where: {
                id: Number(user.id),
            },
            select: {
                fullname: true,
                email: true,
                password: false,
            },
        });

        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "[USER_GET] Server error" }, { status: 500 });
    }
}
