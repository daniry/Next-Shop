"use client";

import { cn } from "@/shared/lib/utils";
import { CartItemProps } from "../cart-item-details/cartItemDetails.types";
import * as CartItemDetails from "../cart-item-details";
import { X } from "lucide-react";

interface Props extends CartItemProps {
    onClickCountButton?: (type: "plus" | "minus") => void;
    onClickRemove?: () => void;
    className?: string;
}

export const CheckoutCartItem: React.FC<Props> = ({ name, price, imageUrl, quantity, details, className, disabled, onClickCountButton, onClickRemove }) => {
    return (
        <div
            className={cn(
                "flex items-center justify-between",
                {
                    "opacity-50 pointer-events-none": disabled,
                },
                className
            )}
        >
            <div className="flex items-center gap-5 flex-1">
                <CartItemDetails.Image src={imageUrl} />
                <CartItemDetails.Info name={name} details={details} />
            </div>

            <CartItemDetails.Price value={price} />

            <div className="flex items-center gap-5 ml-20">
                <CartItemDetails.CountButton onClick={onClickCountButton} value={quantity} />
                <button type="button" onClick={onClickRemove}>
                    <X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
                </button>
            </div>
        </div>
    );
};
