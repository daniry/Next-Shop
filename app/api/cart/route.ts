import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { findOrCreateCart, updateCartTotalAmount } from "@/shared/lib";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("cartToken")?.value;

        if (!token) {
            return NextResponse.json({ totalAmount: 0, items: [] });
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                OR: [
                    {
                        token,
                    },
                ],
            },
            include: {
                items: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    include: {
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                        ingredients: true,
                    },
                },
            },
        });

        return NextResponse.json(userCart);
    } catch (error) {
        console.log("[CART_GET] Server error", error);
        return NextResponse.json({ message: "Не удалось получить корзину" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        let token = req.cookies.get("cartToken")?.value;

        if (!token) {
            token = crypto.randomUUID();
        }

        const userCart = await findOrCreateCart(token);

        const data = (await req.json()) as CreateCartItemValues;

        // 1. Находим ВСЕ товары с таким же productItemId
        const cartItems = await prisma.cartItem.findMany({
            where: {
                cartId: userCart.id,
                productItemId: data.productItemId,
            },
            include: {
                ingredients: true, // Загружаем ингредиенты
            },
        });

        // 2. Ищем товар с ТОЧНЫМ совпадением ингредиентов
        const findCartItem = cartItems.find((item) => {
            const itemIngredientIds = item.ingredients.map((ing) => ing.id).sort();
            const dataIngredientIds = (data.ingredients || []).sort();

            // Проверяем, что массивы идентичны (одинаковые ингредиенты)
            return itemIngredientIds.length === dataIngredientIds.length && itemIngredientIds.every((id, index) => id === dataIngredientIds[index]);
        });

        //  Если нашли – увеличиваем quantity, иначе создаем новый
        if (findCartItem) {
            await prisma.cartItem.update({
                where: {
                    id: findCartItem.id,
                },
                data: {
                    quantity: findCartItem.quantity + 1,
                },
            });
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: userCart.id,
                    productItemId: data.productItemId,
                    quantity: 1,
                    ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
                },
            });
        }

        const updatedUserCart = await updateCartTotalAmount(token);

        const resp = NextResponse.json(updatedUserCart);
        resp.cookies.set("cartToken", token);
        return resp;
    } catch (error) {
        console.log("[CART_POST] Server error", error);
        return NextResponse.json({ message: "Не удалось создать корзину" }, { status: 500 });
    }
}
