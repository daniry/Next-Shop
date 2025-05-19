"use client";

import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/components/ui/sheet";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui";
import { CartDrawerItem } from "./cartDrawerItem";
import { getCartItemDetails } from "@/shared/lib";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useCart } from "@/shared/hooks";

interface Props {
    className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
    const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart();

    const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
        const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
        if (newQuantity > 0) {
            updateItemQuantity(id, newQuantity);
        }
    };
    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
                <SheetHeader>
                    <SheetTitle>
                        В корзине <span className="font-bold">{items.length} товара</span>
                    </SheetTitle>
                </SheetHeader>

                {/* Items */}
                <div className="-mx-6 mt-5 overflow-auto flex-1">
                    {items.map((item) => (
                        <div key={item.id} className="mb-2">
                            <CartDrawerItem
                                id={item.id}
                                imageUrl={item.imageUrl}
                                details={item.pizzaSize && item.pizzaType ? getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize) : ""}
                                name={item.name}
                                price={item.price}
                                quantity={item.quantity}
                                onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                            />
                        </div>
                    ))}
                </div>

                <SheetFooter className="-mx-6 bg-white p-8">
                    <div className="w-full">
                        <div className="flex mb-4">
                            <span className="flex flex-1 text-lg text-neutral-500">
                                Итого
                                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                            </span>

                            <span className="font-bold text-lg">{totalAmount} ₽</span>
                        </div>
                        <Link href="/checkout">
                            <Button type="submit" className="w-full h-12 text-base">
                                Оформить заказ
                                <ArrowRight className="w-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};
