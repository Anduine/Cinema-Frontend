"use client";

import { useRef, useState } from "react";
import { Translation } from "@/types";
import { useNotifications } from "@/contexts/NotificationsContext";
import { getUploadURL, uploadComplete, uploadVideoToStorage } from "@/services/video.service";
import { TranslationAutocomplete } from "@/components/ui/TranslationAutocomplete/TranslationAutocomplete";
import styles from "../Form.module.css";
import videoStyles from "./VideoUploadForm.module.css";

interface Props {
  mediaId: string;
  seasonNumber: number;
  seasonId: string;
  episodeNumber: number;
  episodeId: string;
  availableTranslations: Translation[];
  onSuccess?: () => void;
  onClose?: () => void;
}

function VideoUploadForm({
  mediaId,
  seasonNumber,
  seasonId,
  episodeNumber,
  episodeId,
  availableTranslations,
  onSuccess,
  onClose,
}: Props) {
  const { showNotify } = useNotifications();
  const [translationId, setTranslationId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!file || !translationId) {
      showNotify("Виберіть файл та озвучку", "error");
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    try {
      setStatusText("Отримання дозволу на завантаження...");
      const meta = {
        mediaId,
        translationId,
        seasonNumber,
        seasonId,
        episodeNumber,
        episodeId,
        filename: file.name,
      };

      const { uploadURL, objectName, streamId } = await getUploadURL(meta);
      console.log("uploadURL:", uploadURL);

      setStatusText("Завантаження файлу в сховище...");

      const handleProgress = (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
          console.log(`Завантаження відео: ${percentCompleted}%`);
        }
      };

      await uploadVideoToStorage(uploadURL, file, handleProgress);

      setStatusText("Реєстрація відео в базі даних...");
      await uploadComplete({
        streamId,
        mediaId,
        translationId,
        seasonNumber,
        episodeNumber,
        objectName,
      });

      showNotify("Відео успішно завантажено та відправлено на обробку!", "success");
      onSuccess?.();
      onClose?.();
    } catch (error: any) {
      console.error("Помилка завантаження відео:", error);
      showNotify(error.response?.data?.message || "Помилка завантаження відео", "error");
    } finally {
      setIsLoading(false);
      setStatusText("");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.group}>
        <label htmlFor="media-id">ID медіа</label>
        <input type="text" id="media-id" value={mediaId} className={styles.input} disabled />
      </div>
      <div className={styles.rowGroup}>
        <div className={styles.group}>
          <label htmlFor="season-number">Cезон</label>
          <input type="number" id="season-number" value={seasonNumber} className={styles.input} disabled />
        </div>
        <div className={styles.group}>
          <label htmlFor="episode-number">Епізод</label>
          <input type="number" id="episode-number" value={episodeNumber} className={styles.input} disabled />
        </div>
      </div>
      <div className={styles.group}>
        <label htmlFor="translation-id">Озвучка</label>
        <TranslationAutocomplete
          availableTranslations={availableTranslations}
          selectedId={translationId}
          onChange={setTranslationId}
        />
      </div>
      <div className={styles.group}>
        <label htmlFor="video-file">Відеофайл (.mp4, .mkv)</label>
        <input
          type="file"
          id="video-file"
          name="video-file"
          accept="video/mp4,video/x-matroska,video/webm"
          ref={fileInputRef}
          required
          style={{ padding: "8px 14px" }}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFile(e.target.files[0]);
            }
          }}
        />
      </div>

      {isLoading && (
        <div className={videoStyles.progressContainer}>
          <p className={videoStyles.statusText}>{statusText}</p>
          <div className={videoStyles.progressBarWrapper}>
            <div className={videoStyles.progressBarFill} style={{ width: `${uploadProgress}%` }}></div>
          </div>
          <p className={videoStyles.progressPercentage}>{uploadProgress}%</p>
        </div>
      )}

      <div className={styles.actions}>
        <button type="button" className={styles.cancelBtn} onClick={onClose} disabled={isLoading}>
          Скасувати
        </button>
        <button type="submit" className={styles.submitBtn} disabled={isLoading}>
          {isLoading ? "Завантаження..." : "Завантажити відео"}
        </button>
      </div>
    </form>
  );
}
export default VideoUploadForm;
