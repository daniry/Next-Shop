"use client";

import { cn } from "@/shared/lib/utils";
import { Ingredient, ProductItem } from "@prisma/client";
import { ProductImage } from "./productImage";
import { Title } from "./title";
import { Button } from "../ui";
import { GroupVariants } from "./groupVariants";
import { PizzaSize, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { IngredientItem } from "./ingredientItem";
import { getPizzaDetails } from "@/shared/lib";
import { usePizzaOptions } from "@/shared/hooks";

interface Props {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    loading?: boolean;
    onSubmit: (itemId: number, ingredients: number[]) => void;
    className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({ name, items, imageUrl, ingredients, loading, onSubmit, className }) => {
    const { type, size, selectedIngredients, availableSizes, currentItemId, setSize, setType, addIngredient } = usePizzaOptions(items);

    const { totalPrice, textDetaills } = getPizzaDetails(type, size, items, ingredients, selectedIngredients);

    const handleClickAdd = () => {
        if (currentItemId) onSubmit(currentItemId, Array.from(selectedIngredients));
    };

    return (
        <div className={cn(className, "flex flex-1")}>
            <ProductImage imageUrl={imageUrl} size={size} />

            <div className="w-[490px] bg-[#f8f6f6] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />
                <p className="text-gray-400">{textDetaills}</p>

                <div className="flex flex-col gap-4 mt-5">
                    <GroupVariants items={availableSizes} value={String(size)} onClick={(value) => setSize(Number(value) as PizzaSize)} />
                    <GroupVariants items={pizzaTypes} value={String(type)} onClick={(value) => setType(Number(value) as PizzaType)} />
                </div>

                <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
                    <div className="grid grid-cols-3 gap-3">
                        {ingredients.map((ingredient) => (
                            <IngredientItem
                                key={ingredient.id}
                                imageUrl={ingredient.imageUrl}
                                name={ingredient.name}
                                price={ingredient.price}
                                active={selectedIngredients.has(ingredient.id)}
                                onClick={() => addIngredient(ingredient.id)}
                            />
                        ))}
                    </div>
                </div>

                <Button loading={loading} className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10" onClick={handleClickAdd}>
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    );
};
