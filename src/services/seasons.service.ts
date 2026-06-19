import api from "./api";
import { Season } from "@/types";

export async function createSeason(mediaId: string, data: Partial<Season>): Promise<boolean> {
  try {
    await api.post(`/v1/media/admin/media/${mediaId}/seasons`, data);
    return true;
  } catch (err) {
    console.error("Помилка при створені сезону:", err);
    return false;
  }
}

export async function updateSeason(mediaId: string, data: Partial<Season>): Promise<boolean> {
  try {
    await api.put(`/v1/media/admin/media/${mediaId}/seasons/${data.id}`, data);
    return true;
  } catch (err) {
    console.error("Помилка при оновлені сезону:", err);
    return false;
  }
}

export async function deleteSeason(mediaId: string, seasonId: string): Promise<boolean> {
  try {
    await api.delete(`/v1/media/admin/media/${mediaId}/seasons/${seasonId}`);
    return true;
  } catch (err) {
    console.error("Помилка при оновлені сезону:", err);
    return false;
  }
}
