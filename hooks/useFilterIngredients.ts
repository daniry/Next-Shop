import { Api } from "@/services/apiClient";
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";

interface ReturnProps {
    ingredients: Ingredient[];
}

export const useFilterIngredients = (): ReturnProps => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    useEffect(() => {
        async function fetchIngredients() {
            try {
                const response = await Api.ingredients.getAll();
                setIngredients(response);
            } catch (error) {
                console.error(error);
            }
        }
        fetchIngredients();
    }, []);

    return { ingredients };
};
