import api from "./api";
import { Translation } from "@/types";
import { TranslationResponse, TranslationsResponse } from "@/types/responses";

export async function getAllTranslations(): Promise<TranslationsResponse> {
  try {
    const response = await api.get("/v1/media/admin/translations");
    return response.data;
  } catch (err) {
    console.error("Помилка при отриманні озвучок:", err);
    return null;
  }
}

export async function getTranslationById(id: number): Promise<TranslationResponse> {
  try {
    const response = await api.get(`/v1/media/admin/translations/${id}`);
    return response.data;
  } catch (err) {
    console.error("Помилка при отриманні озвучки:", err);
    return null;
  }
}

export async function createTranslation(data: Partial<Translation>): Promise<boolean> {
  try {
    await api.post("/v1/media/admin/translations", data);
    return true;
  } catch (err) {
    console.error("Помилка при створені озвучки:", err);
    return false;
  }
}

export async function updateTranslation(id: number, data: Partial<Translation>): Promise<boolean> {
  try {
    await api.put(`/v1/media/admin/translations/${id}`, data);
    return true;
  } catch (err) {
    console.error(`Помилка при оновленні озвучки (${id}):`, err);
    return false;
  }
}

export async function deleteTranslation(id: number): Promise<boolean> {
  try {
    await api.delete(`/v1/media/admin/translations/${id}`);
    return true;
  } catch (err) {
    console.error(`Помилка при видаленні озвучки (${id}):`, err);
    return false;
  }
}
