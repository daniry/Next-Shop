import { useEffect } from "react";
import { Filters } from "./useFilters";
import { useRouter } from "next/navigation";
import qs from "qs";

export const useQueryFilters = (filters: Filters) => {
    const router = useRouter();

    useEffect(() => {
        const params = {
            ...filters.prices,
            pizzaTypes: Array.from(filters.pizzaTypes),
            sizes: Array.from(filters.sizes),
            ingredients: Array.from(filters.selectedIngredients),
        };
        const queryString = qs.stringify(params, { arrayFormat: "comma" });
        router.push(`?${queryString}`, { scroll: false });
    }, [filters.pizzaTypes, filters.sizes, filters.selectedIngredients, filters.prices]);
};
