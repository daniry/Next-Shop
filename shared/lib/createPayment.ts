import { PaymentData } from "@/@types/yookassa";
import axios from "axios";

interface Props {
    description: string;
    orderId: number;
    amount: number;
}

/**
 * Функция для создания ссылки, которая будет перенаправлять пользователя на оплату
 * @param details
 */
export async function createPayment(details: Props) {
    const { data } = await axios.post<PaymentData>(
        "",
        {
            amount: {
                value: details.amount.toString(),
                currency: "RUB",
            },
            capture: true,
            description: details.description,
            metadata: {
                order_id: details.orderId,
            },
            confirmation: {
                type: "redirect",
                return_url: process.env.YOOKASSA_CALLBACK_URL,
            },
        },
        {
            auth: {
                username: process.env.YOOKASSA_STORE_ID as string,
                password: process.env.YOOKASSA_API_KEY as string,
            },
            headers: {
                "Content-Type": "application/json",
                "Idempotence-Key": Math.random().toString(36).substring(7),
            },
        }
    );

    return data;
}
