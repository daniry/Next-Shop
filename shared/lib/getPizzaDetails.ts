import { calcPizzaPrices } from "./calcPizzaPrices";
import { Ingredient, ProductItem } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";

/**
 * Функция для формирования объекта с информацией о выбранной пицце
 *
 * @param type - тип выбранного теста
 * @param size - размер пиццы
 * @param items - список вариаций
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 * @returns totalPrice - общая стоимость, textDetaills - текстовое описание
 */
export const getPizzaDetails = (type: PizzaType, size: PizzaSize, items: ProductItem[], ingredients: Ingredient[], selectedIngredients: Set<number>) => {
    const totalPrice = calcPizzaPrices(type, size, items, ingredients, selectedIngredients);
    const textDetaills = `${size} см, ${mapPizzaType[type]} тесто`;

    return { totalPrice, textDetaills };
};
