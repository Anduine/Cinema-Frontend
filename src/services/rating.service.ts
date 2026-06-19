import api from "./api";
import { RatingResponse } from "@/types/responses";

export async function getMyRating(mediaId: string): Promise<number | null> {
  try {
    const res = await api.get<RatingResponse>(`/v1/interaction/media/${mediaId}/ratings/me`);
    return res.data.data;
  } catch (err) {
    return 0;
  }
}

export async function setMediaRating(mediaId: string, score: number): Promise<boolean> {
  try {
    await api.put(`/v1/interaction/media/${mediaId}/ratings`, { score });
    return true;
  } catch (err) {
    console.error("Помилка при встановленні оцінки:", err);
    return false;
  }
}

export async function removeMediaRating(mediaId: string): Promise<boolean> {
  try {
    await api.delete(`/v1/interaction/media/${mediaId}/ratings`);
    return true;
  } catch (err) {
    console.error("Помилка при видаленні оцінки:", err);
    return false;
  }
}
