import { Ingredient } from "@prisma/client";
import { axiosInstance } from "./axiosInstance";
import { ApiRoutes } from "./constants";

export const getAll = async (): Promise<Ingredient[]> => {
    return (await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)).data;
};
