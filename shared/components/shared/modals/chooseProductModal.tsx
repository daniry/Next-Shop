"use client";

import { Dialog, DialogContent, DialogTitle } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ChoosePizzaForm, ChooseProductForm } from "@/shared/components/shared";
import { ProductWithRelations } from "@/@types/prisma";
import { useCart } from "@/shared/hooks";
import toast from "react-hot-toast";

interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter();
    const firstItem = product.items[0];
    const isPizzaForm = Boolean(product.items[0].pizzaType);
    const { addCartItem, loading } = useCart();

    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
        try {
            const itemId = productItemId ?? firstItem.id;

            await addCartItem({
                productItemId: itemId,
                ingredients,
            });

            toast.success("Товар добавлен в корзину");
            router.back();
        } catch (err) {
            toast.error("Не удалось добавить товар в корзину");
            console.error(err);
        }
    };

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden", className)}>
                <DialogTitle style={{ display: "none" }}>{product.name}</DialogTitle>

                {isPizzaForm ? (
                    <ChoosePizzaForm
                        imageUrl={product.imageUrl}
                        name={product.name}
                        ingredients={product.ingredients}
                        items={product.items}
                        onSubmit={onSubmit}
                        loading={loading}
                    />
                ) : (
                    <ChooseProductForm imageUrl={product.imageUrl} name={product.name} onSubmit={onSubmit} price={firstItem.price} loading={loading} />
                )}
            </DialogContent>
        </Dialog>
    );
};
