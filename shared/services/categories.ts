import { axiosInstance } from "./axiosInstance";
import { ApiRoutes } from "./constants";
import { CategoryDTO } from "./dto/category.dto";

export const getAll = async (): Promise<CategoryDTO[]> => {
    return (await axiosInstance.get<CategoryDTO[]>(ApiRoutes.CATEGORIES)).data;
};
