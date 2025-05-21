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
    const { priceFrom, priceTo, sizes, pizzaTypes, ingredients } = await params;
    const sizesArr = sizes?.split(",").map(Number);
    const pizzaTypesArr = pizzaTypes?.split(",").map(Number);
    const ingredientsIds = ingredients?.split(",").map(Number);

    const minPrice = Number(priceFrom) || DEFAULT_MIN_PRICE;
    const maxPrice = Number(priceTo) || DEFAULT_MAX_PRICE;

    const categories = await prisma.category.findMany({
        include: {
            products: {
                orderBy: {
                    id: "desc",
                },
                where: {
                    ingredients: ingredientsIds
                        ? {
                              some: {
                                  id: {
                                      in: ingredientsIds,
                                  },
                              },
                          }
                        : undefined,
                    items: {
                        some: {
                            size: {
                                in: sizesArr,
                            },
                            pizzaType: {
                                in: pizzaTypesArr,
                            },
                            price: {
                                gte: minPrice, // >=
                                lte: maxPrice, // <=
                            },
                        },
                    },
                },
                include: {
                    ingredients: true,
                    items: {
                        where: {
                            price: {
                                gte: minPrice,
                                lte: maxPrice,
                            },
                        },
                        orderBy: {
                            price: "asc",
                        },
                    },
                },
            },
        },
    });

    return categories;
};
