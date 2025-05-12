"use client";

import { Api } from "@/services/apiClient";
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";

interface ReturnProps {
    ingredients: Ingredient[];
    loading: boolean;
    selectedIngredients: Set<string>;
    onAddId: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(false);

    const [selectedIngredients, { toggle }] = useSet(new Set<string>([]));

    useEffect(() => {
        async function fetchIngredients() {
            try {
                setLoading(true);
                const response = await Api.ingredients.getAll();
                setIngredients(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchIngredients();
    }, []);

    return { ingredients, loading, onAddId: toggle, selectedIngredients };
};
