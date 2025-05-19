import { ProductItem } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../constants/pizza";
import { Variant } from "../components/shared/groupVariants";

/**
 * Функция для получения доступных размеров для пиццы
 *
 * @param type - тип теста
 * @param items - массив вариаций
 * @returns
 */
export const getAvailablePizzaSizes = (type: PizzaType, items: ProductItem[]): Variant[] => {
    const filteredPizzasByType = items.filter((pizza) => pizza.pizzaType === type);

    return pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzasByType.some((pizza) => Number(pizza.size) === Number(item.value)),
    }));
};
