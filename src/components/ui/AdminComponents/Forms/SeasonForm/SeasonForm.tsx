"use client";

import { useState } from "react";
import { useNotifications } from "@/contexts/NotificationsContext";
import { createSeason, updateSeason } from "@/services/seasons.service";
import { Season } from "@/types";
import styles from "../Form.module.css";
import NumericInput from "@/components/ui/NumericInput/NumericInput";

interface Props {
  mediaId: string;
  initialData?: Season;
  onClose?: () => void;
  onSuccess?: () => void;
}

function SeasonForm({ mediaId, initialData, onClose, onSuccess }: Props) {
  const { showNotify } = useNotifications();

  const [seasonNumber, setSeasonNumber] = useState(initialData?.seasonNumber || 1);
  const [title, setTitle] = useState(initialData?.title || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const seasData: Partial<Season> = {
      id: initialData?.id,
      seasonNumber,
      title,
      mediaId,
    };

    if (initialData) {
      console.log("Оновлюємо сезон:", seasonNumber, title);
      const ok = await updateSeason(mediaId, seasData);

      if (ok) {
        onSuccess?.();
      } else {
        showNotify("Помилка при оновленні сезону", "error");
      }
    } else {
      console.log("Додаємо сезон:", seasonNumber, title);
      const ok = await createSeason(mediaId, seasData);

      if (ok) {
        onSuccess?.();
      } else {
        showNotify("Помилка при створенні сезону", "error");
      }
    }

    onClose?.();
    setIsLoading(false);
  };

  const buttonText = initialData ? "Оновити сезон" : "Створити сезон";

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.group}>
        <label htmlFor="season-num">Номер сезону</label>
        <NumericInput
          id="season-num"
          value={seasonNumber}
          onChange={(e) => setSeasonNumber(Number(e.target.value))}
          className={styles.input}
          autoComplete="off"
          required
        />
      </div>

      <div className={styles.group}>
        <label htmlFor="season-title">Назва сезону</label>
        <input
          id="season-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
export default SeasonForm;
