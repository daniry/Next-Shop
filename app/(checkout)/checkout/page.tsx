"use client";

import { Container, Title } from "@/shared/components/shared";
import { CheckoutAddressForm, CheckoutCart, CheckoutPersonalForm, CheckoutSidebar } from "@/shared/components/shared/checkout";
import { useCart } from "@/shared/hooks";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/constants/checkoutFormSchema";

export default function CheckoutPage() {
    const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart();

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

    const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
        const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };
    return (
        <Container className="mt-10">
            <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />
            <div className="flex gap-10">
                {/* left part */}
                <div className="flex flex-col gap-10 flex-1 mb-20">
                    <CheckoutCart onClickCountButton={onClickCountButton} removeCartItem={removeCartItem} items={items} loading={loading} />

                    <CheckoutPersonalForm />

                    <CheckoutAddressForm />
                </div>
                {/* right part */}
                <div className="w-[450px]">
                    <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
                </div>
            </div>
        </Container>
    );
}
