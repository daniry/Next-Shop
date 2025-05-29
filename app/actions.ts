"use server";

import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate } from "@/shared/components/shared/email-templates";
import { CheckoutFormValues } from "@/shared/constants/checkoutFormSchema";
import { createPayment, sendEmail } from "@/shared/lib";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormValues) {
    try {
        console.log(data);
        // Получаем токен пользователя
        const cookieStore = cookies();
        const cartToken = (await cookieStore).get("cartToken")?.value;

        if (!cartToken) {
            throw new Error("Cart token not found");
        }

        // Находим корзину по токену
        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
            where: {
                token: cartToken,
            },
        });

        // Если корзина не найдена возращаем ошибку
        if (!userCart) {
            throw new Error("Cart not found");
        }

        // Если корзина пустая возращаем ошибку
        if (userCart?.totalAmount === 0) {
            throw new Error("Cart is empty");
        }

        // Создание заказа
        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullName: data.firstName + " " + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items),
            },
        });

        // Очищаем корзину пользователя
        await prisma.cart.update({
            where: {
                id: userCart.id,
            },
            data: {
                totalAmount: 0,
            },
        });
        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id,
            },
        });

        // TODO: сделать создание ссылки опалыт
        const paymentData = await createPayment({
            amount: order.totalAmount,
            orderId: order.id,
            description: "Оплата заказа №" + order.id,
        });

        if (!paymentData) {
            throw new Error("Payment data not found");
        }

        await sendEmail(
            data.email,
            "Pizza.com | Оплатите заказ №" + order.id,
            PayOrderTemplate({ orderId: order.id, totalAmount: order.totalAmount, paymentUrl: "https://resend.com/docs/send-with-nextjs" })
        );
    } catch (error) {
        console.log("[CreateOrder] Server error", error);
    }
}
