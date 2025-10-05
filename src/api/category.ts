import { Category } from "../utils/types";
import api from "./api";

export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get(`/categories`);
  return res.data;
};

export const addCategory = async (name: string): Promise<Category> => {
  const res = await api.post("/categories", {
    name
  });
  return res.data;
};

export const deleteCategory = async (categoryId: string): Promise<void> => {
  await api.delete(`/categories/${categoryId}`);
};
