import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const code = req.nextUrl.searchParams.get("code");
        // const code = "";

        if (!code) {
            return NextResponse.json({ error: "Неверный код" }, { status: 400 });
        }

        // Ищем код в базе
        const verificationCode = await prisma.verificationCode.findFirst({
            where: {
                code,
            },
        });

        if (!verificationCode) {
            return NextResponse.json({ error: "Неверный код" }, { status: 400 });
        }

        // Обновляем пользователя (устанавливаем verified)
        await prisma.user.update({
            where: {
                id: verificationCode.userId,
            },
            data: {
                verified: new Date(),
            },
        });

        // Удаляем код из базы
        await prisma.verificationCode.delete({
            where: {
                id: verificationCode.id,
            },
        });

        // Делаем редирект на главную страницу
        return NextResponse.redirect(new URL("/?verified", req.url));
    } catch (error) {
        console.error(error);
        console.log("[VERIFY_GET] Server error", error);
    }
}
