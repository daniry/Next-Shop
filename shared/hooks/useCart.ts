"use client";

import { useEffect } from "react";
import { useCartStore } from "../store/cart";
import { CartStateItem } from "../lib/getCartDetails";

type ReturnProps = {
    totalAmount: number;
    items: CartStateItem[];
    loading: boolean;
    updateItemQuantity: (id: number, quantity: number) => void;
    removeCartItem: (id: number) => void;
    addCartItem: (values: any) => void;
};

export const useCart = (): ReturnProps => {
    const cartState = useCartStore((state) => state);
    useEffect(() => {
        cartState.fetchCartItems();
    }, []);

    return cartState;
};
