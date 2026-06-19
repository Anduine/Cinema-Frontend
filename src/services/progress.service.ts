import api from "./api";
import { WatchProgressResponse } from "@/types/responses";

export async function getWatchProgress(
  mediaId: string,
  episodeId: string,
  translationId: number,
): Promise<WatchProgressResponse | null> {
  try {
    const params = new URLSearchParams({ media_id: mediaId, episode_id: episodeId, translation_id: String(translationId) });

    const res = await api.get<WatchProgressResponse>(`/v1/interaction/history/progress?${params.toString()}`);
    return res.data;
  } catch (err) {
    console.error("Помилка отримання прогресу:", err);
    return null;
  }
}

export async function saveWatchProgress({
  progressSeconds,
  isCompleted,
  mediaId,
  seasonId,
  episodeId,
  translationId,
}: WatchProgressRequest) {
  try {
    await api.put("/v1/interaction/history/progress", {
      mediaId,
      seasonId,
      episodeId,
      translationId,
      progressSeconds: Math.floor(progressSeconds),
      isCompleted,
    });
  } catch (err) {
    console.error("Помилка збереження прогресу:", err);
  }
}
