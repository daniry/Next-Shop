import { Category } from "@prisma/client";
import { axiosInstance } from "./axiosInstance";
import { ApiRoutes } from "./constants";

export const getAll = async (): Promise<Category[]> => {
    return (await axiosInstance.get<Category[]>(ApiRoutes.CATEGORIES)).data;
};
