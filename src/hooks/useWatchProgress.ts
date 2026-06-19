import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";
import { getWatchProgress, saveWatchProgress } from "@/services/progress.service";

interface UseWatchProgressProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isVideoReady: boolean;
  mediaId: string;
  seasonId: string;
  episodeId: string;
  translationId: number;
  saveIntervalMs?: number;
}

export function useWatchProgress({
  videoRef,
  isVideoReady,
  mediaId,
  seasonId,
  episodeId,
  translationId,
  saveIntervalMs = 10000,
}: UseWatchProgressProps) {
  const { setCurrentTime } = usePlayerStore();
  const lastSavedTime = useRef<number>(0);

  useEffect(() => {
    if (!isVideoReady) return;

    const initProgress = async () => {
      if (!videoRef.current) return;

      const { data } = await getWatchProgress(mediaId, episodeId, translationId);
      console.log("getWatchProgress Response:", data);
      if (!data || data.progressSeconds <= 0) return;

      const applyProgress = () => {
        console.log("applyProgress:", data.progressSeconds);

        videoRef.current.currentTime = data.progressSeconds;
        setCurrentTime(data.progressSeconds);
        lastSavedTime.current = data.progressSeconds;

        console.log("videoRef.current.currentTime:", videoRef.current.currentTime);
      };

      if (videoRef.current.readyState >= 1) {
        console.log("videoRef.current.readyState >= 1");
        applyProgress();
      } else {
        videoRef.current.addEventListener("loadedmetadata", applyProgress, { once: true });
      }
    };

    initProgress();
  }, [isVideoReady, mediaId, episodeId, translationId, videoRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      const video = videoRef.current;
      if (!video) return;

      const currentTime = Math.floor(video.currentTime);
      const isCompleted = video.duration > 0 && video.duration > 30 && video.duration - currentTime < 30;

      // Зберігаємо якщо відео грає і час змінився
      if (!video.paused && currentTime !== lastSavedTime.current) {
        console.log(
          "video.duration - currentTime:",
          video.duration - currentTime,
          "\nisCompleted:",
          isCompleted,
          "translationId:",
          translationId,
        );

        saveWatchProgress({ progressSeconds: currentTime, isCompleted, mediaId, seasonId, episodeId, translationId });
        lastSavedTime.current = currentTime;
      }
    }, saveIntervalMs);

    // 3. Збереження при закритті сторінки або демонтажі компонента
    return () => {
      clearInterval(interval);
      const video = videoRef.current;
      if (video && video.currentTime !== lastSavedTime.current) {
        const isCompleted = video.duration > 0 && video.duration > 30 && video.duration - video.currentTime < 30;
        saveWatchProgress({ progressSeconds: video.currentTime, isCompleted, mediaId, seasonId, episodeId, translationId });
      }
    };
  }, [mediaId, seasonId, episodeId, translationId, videoRef, saveIntervalMs]);
}
