import { Ingredient } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";
import { CartStateItem } from "./getCartDetails";

/**
 * Функция для формирования деталей заказа
 *
 * @param ingredients - ингредиенты
 * @param pizzaType - тип пиццы
 * @param pizzaSize - размер пиццы
 * @returns string - детали заказа
 */
export const getCartItemDetails = (ingredients: CartStateItem["ingredients"], pizzaType: PizzaType, pizzaSize: PizzaSize): string => {
    const details = [];

    if (pizzaSize && pizzaType) {
        const typeName = mapPizzaType[pizzaType];
        details.push(`${typeName} ${pizzaSize} см`);
    }

    if (ingredients) {
        details.push(...ingredients.map((ingredient) => ingredient.name));
    }

    return details.join(", ");
};
