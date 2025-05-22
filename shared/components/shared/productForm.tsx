"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { useCart } from "@/shared/hooks";
import toast from "react-hot-toast";
import { ChoosePizzaForm } from "./choosePizzaForm";
import { ChooseProductForm } from "./chooseProductForm";

interface Props {
    product: ProductWithRelations;
    onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit: _onSubmit }) => {
    const { addCartItem, loading } = useCart();

    const firstItem = product.items[0];
    const isPizzaForm = Boolean(product.items[0].pizzaType);

    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
        try {
            const itemId = productItemId ?? firstItem.id;

            await addCartItem({
                productItemId: itemId,
                ingredients,
            });

            toast.success("Товар добавлен в корзину");
            _onSubmit?.();
        } catch (err) {
            toast.error("Не удалось добавить товар в корзину");
            console.error(err);
        }
    };

    if (isPizzaForm) {
        return <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} items={product.items} onSubmit={onSubmit} loading={loading} />;
    }

    return <ChooseProductForm imageUrl={product.imageUrl} name={product.name} onSubmit={onSubmit} price={firstItem.price} loading={loading} />;
};
