"use client";

import { Container, Title } from "@/shared/components/shared";
import { CheckoutAddressForm, CheckoutCart, CheckoutPersonalForm, CheckoutSidebar } from "@/shared/components/shared/checkout";
import { useCart } from "@/shared/hooks";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/constants/checkoutFormSchema";
import { useEffect, useState } from "react";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/apiClient";

export default function CheckoutPage() {
    const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart();
    const [submitting, setSubmitting] = useState(false);
    const { data: session } = useSession();

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            comment: "",
        },
    });

    useEffect(() => {
        async function fetchUser() {
            const data = await Api.auth.getMe();
            const [firstName, lastName] = data.fullname.split(" ");

            if (!firstName || !lastName) return;
            form.setValue("firstName", firstName);
            form.setValue("lastName", lastName);
            form.setValue("email", data.email);
        }
        if (session) {
            fetchUser();
        }
    }, [session]);

    const onSubmit = async (data: CheckoutFormValues) => {
        try {
            setSubmitting(true);
            const url = await createOrder(data);

            toast.error("Заказ успешно оформлен! 📝 Переход на оплату... ", {
                icon: "✅",
            });

            if (url) {
                location.href = url;
            }
            // console.log(url);
        } catch (error) {
            console.log(error);
            setSubmitting(false);
            toast.error("Не удалось создать заказ", {
                icon: "❌",
            });
        }
    };

    const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
        const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };
    return (
        <Container className="mt-10">
            <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10">
                        {/* left part */}
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <CheckoutCart onClickCountButton={onClickCountButton} removeCartItem={removeCartItem} items={items} loading={loading} />

                            <CheckoutPersonalForm className={loading ? "opacity-50 pointer-events-none" : ""} />

                            <CheckoutAddressForm className={loading ? "opacity-50 pointer-events-none" : ""} />
                        </div>
                        {/* right part */}
                        <div className="w-[450px]">
                            <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    );
}
