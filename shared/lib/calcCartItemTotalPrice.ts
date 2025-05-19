import { CartItemDTO } from "../services/dto/cart.dto";

/**
 * Функция для подсчета цены элемента корзины
 *
 * @param cartItem
 * @returns
 */
export const calcCartItemTotalPrice = (cartItem: CartItemDTO): number => {
    const ingredientsPrice = cartItem.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);

    return (ingredientsPrice + cartItem.productItem.price) * cartItem.quantity;
};
