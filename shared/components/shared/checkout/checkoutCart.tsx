import { CartStateItem } from "@/shared/lib/getCartDetails";
import { Skeleton } from "../../ui";
import { WhiteBlock } from "../whiteBlock";
import { CheckoutCartItem } from "./checkoutCartItem";
import { getCartItemDetails } from "@/shared/lib";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";

interface Props {
    items: CartStateItem[];
    onClickCountButton: (id: number, quantity: number, type: "plus" | "minus") => void;
    removeCartItem: (id: number) => void;
    loading?: boolean;
    className?: string;
}

export const CheckoutCart: React.FC<Props> = ({ items, onClickCountButton, removeCartItem, loading, className }) => {
    return (
        <WhiteBlock title="1. Корзина" className={className}>
            <div className="flex flex-col gap-5">
                {loading
                    ? [...Array(2)].map((_, index) => <Skeleton key={index} className="h-14 w-full rounded-[8px]" />)
                    : items.map((item) => (
                          <CheckoutCartItem
                              key={item.id}
                              id={item.id}
                              imageUrl={item.imageUrl}
                              details={getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)}
                              name={item.name}
                              price={item.price}
                              quantity={item.quantity}
                              disabled={item.disabled}
                              onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                              onClickRemove={() => removeCartItem(item.id)}
                          />
                      ))}
            </div>
        </WhiteBlock>
    );
};
