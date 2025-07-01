import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
    query?: string;
    sortBy?: string;
    sizes?: string;
    pizzaTypes?: string;
    ingredients?: string;
    priceFrom?: string;
    priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
    try {
        const { priceFrom, priceTo, sizes, pizzaTypes, ingredients } = params;

        const sizesArr = sizes?.split(",").filter(Boolean).map(Number) || [];
        const pizzaTypesArr = pizzaTypes?.split(",").filter(Boolean).map(Number) || [];
        const ingredientsIds = ingredients?.split(",").filter(Boolean).map(Number) || [];

        const minPrice = Number(priceFrom) || DEFAULT_MIN_PRICE;
        const maxPrice = Number(priceTo) || DEFAULT_MAX_PRICE;

        const categories = await prisma.category.findMany({
            include: {
                products: {
                    where: {
                        AND: [
                            ingredientsIds.length
                                ? {
                                      ingredients: {
                                          some: { id: { in: ingredientsIds } },
                                      },
                                  }
                                : {},
                            {
                                items: {
                                    some: {
                                        AND: [
                                            sizesArr.length ? { size: { in: sizesArr } } : {},
                                            pizzaTypesArr.length ? { pizzaType: { in: pizzaTypesArr } } : {},
                                            { price: { gte: minPrice, lte: maxPrice } },
                                        ],
                                    },
                                },
                            },
                        ],
                    },
                    include: {
                        ingredients: true,
                        items: {
                            where: { price: { gte: minPrice, lte: maxPrice } },
                            orderBy: { price: "asc" },
                        },
                    },
                    orderBy: { id: "desc" },
                },
            },
        });

        return categories;
    } catch (error) {
        console.error("Error in findPizzas:", error instanceof Error ? error.message : String(error));
        throw error;
    }
};
