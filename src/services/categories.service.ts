import api from "./api";
import { CategoriesResponse } from "@/types/responses";

export async function getCategories(): Promise<CategoriesResponse | null> {
  try {
    const response = await api.get<CategoriesResponse>("/v1/media/categories");
    return response.data;
  } catch (err) {
    console.error("Помилка при отриманні категорій:", err);
    return null;
  }
}
