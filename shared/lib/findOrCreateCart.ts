import { prisma } from "@/prisma/prisma-client";

/**
 * Фукнция, которая находит или создает новую корзину по токену (если ее ранее не было)
 *
 * @param token - токен пользователя
 * @returns
 */
export const findOrCreateCart = async (token: string) => {
    let userCart = await prisma.cart.findFirst({
        where: {
            token,
        },
    });

    if (!userCart) {
        userCart = await prisma.cart.create({
            data: {
                token,
            },
        });
    }

    return userCart;
};
