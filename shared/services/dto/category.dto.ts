import { Category, Product } from "@prisma/client";

export type CategoryDTO = Category & {
    products: Product[];
};
