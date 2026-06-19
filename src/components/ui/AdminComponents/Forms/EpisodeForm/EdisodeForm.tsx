"use client";

import { useEffect, useState } from "react";
import { useNotifications } from "@/contexts/NotificationsContext";
import { createEpisode, updateEpisode } from "@/services/episodes.service";
import { Episode } from "@/types";
import styles from "../Form.module.css";

interface Props {
  mediaId: string;
  seasonId: string;
  initialData?: Episode;
  onClose?: () => void;
  onSuccess?: () => void;
}

function EpisodeForm({ mediaId, seasonId, initialData, onClose, onSuccess }: Props) {
  const { showNotify } = useNotifications();

  const [episodeNumber, setEpisodeNumber] = useState(initialData?.episodeNumber || 1);
  const [title, setTitle] = useState(initialData?.title || "");
  const [duration, setDuration] = useState(initialData?.duration || 0);
  const [thumbnailURL, setThumbnailURL] = useState(initialData?.thumbnailURL || "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setEpisodeNumber(initialData.episodeNumber);
      setTitle(initialData.title || "");
      setDuration(initialData.duration || 0);
      setThumbnailURL(initialData.thumbnailURL || "");
    }
  }, [initialData]);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const epData: Partial<Episode> = {
      id: initialData?.id,
      episodeNumber,
      title,
      duration,
      thumbnailURL,
      seasonId,
    };

    if (initialData) {
      console.log("Оновлення серії:", episodeNumber, title, "для сезону:", seasonId);
      const ok = await updateEpisode(mediaId, epData);

      if (ok) {
        onSuccess?.();
      } else {
        showNotify("Помилка при оновленні серії", "error");
      }
    } else {
      console.log("Створення серії:", episodeNumber, title, "для сезону:", seasonId);
      const ok = await createEpisode(mediaId, epData);

      if (ok) {
        onSuccess?.();
      } else {
        showNotify("Помилка при створенні серії", "error");
      }
    }

    onClose?.();
    setIsLoading(false);
  };

  const buttonText = initialData ? "Оновити серію" : "Додати серію";

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.group}>
        <label htmlFor="ep-title">Назва серії (необов'язково)</label>
        <input
          id="ep-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          autoComplete="off"
        />
      </div>

      <div className={styles.rowGroup}>
        <div className={styles.group}>
          <label htmlFor="ep-num">Номер серії</label>
          <input
            id="ep-num"
            type="text"
            value={episodeNumber}
            onChange={(e) => setEpisodeNumber(Number(e.target.value))}
            className={styles.input}
            autoComplete="off"
            required
          />
        </div>

        <div className={styles.group}>
          <label htmlFor="ep-duration">Тривалість серії (сек)</label>
          <input
            id="ep-duration"
            type="text"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className={styles.input}
            autoComplete="off"
            required
          />
        </div>
      </div>

      <div className={styles.group}>
        <label htmlFor="media-thumbnail-url">URL Мініатюри</label>
        <input
          id="media-thumbnail-url"
          type="url"
          value={thumbnailURL}
          onChange={(e) => setThumbnailURL(e.target.value)}
          placeholder="https://example.com/thumbnailURL.jpg"
          className={styles.input}
          autoComplete="off"
        />
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.cancelBtn} onClick={onClose} disabled={isLoading}>
          Скасувати
        </button>
        <button type="submit" className={styles.submitBtn} disabled={isLoading}>
          {isLoading ? "Збереження..." : buttonText}
        </button>
      </div>
    </form>
  );
}
export default EpisodeForm;
