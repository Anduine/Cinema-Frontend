import api from "./api";
import { Episode } from "@/types";

export async function createEpisode(mediaId: string, data: Partial<Episode>): Promise<boolean> {
  try {
    await api.post(`/v1/media/admin/media/${mediaId}/episodes`, data);
    return true;
  } catch (err) {
    console.error("Помилка при створені епізоду:", err);
    return false;
  }
}

export async function updateEpisode(mediaId: string, data: Partial<Episode>): Promise<boolean> {
  try {
    await api.put(`/v1/media/admin/media/${mediaId}/episodes/${data.id}`, data);
    return true;
  } catch (err) {
    console.error("Помилка при оновлені епізоду:", err);
    return false;
  }
}

export async function deleteEpisode(mediaId: string, episodeId: string): Promise<boolean> {
  try {
    await api.delete(`/v1/media/admin/media/${mediaId}/episodes/${episodeId}`);
    return true;
  } catch (err) {
    console.error("Помилка при оновлені епізоду:", err);
    return false;
  }
}
