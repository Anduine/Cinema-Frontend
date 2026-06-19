"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useNotifications } from "@/contexts/NotificationsContext";
import { getMyRating, setMediaRating, removeMediaRating } from "@/services/rating.service";
import styles from "./MediaRating.module.css";

interface Props {
  mediaId: string;
}

function MediaRating({ mediaId }: Props) {
  const { showNotify } = useNotifications();
  const { user } = useAuthStore();

  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const loadUserRating = async () => {
      const score = await getMyRating(mediaId);
      if (score) {
        setUserRating(score);
      }
      setIsLoading(false);
    };

    loadUserRating();
  }, [mediaId, user]);

  const handleStarClick = async (score: number) => {
    if (!user) {
      showNotify("Авторизуйтесь, щоб поставити оцінку", "error");
      return;
    }

    setIsSubmitting(true);
    const success = await setMediaRating(mediaId, score);
    if (success) {
      setUserRating(score);
    }
    setIsSubmitting(false);
  };

  const handleCancelRating = async () => {
    setIsSubmitting(true);
    const success = await removeMediaRating(mediaId);
    if (success) {
      setUserRating(0);
      setHoverRating(0);
    }
    setIsSubmitting(false);
  };

  return (
    <div className={styles.ratingSection}>
      <div className={styles.voteBlock}>
        {userRating <= 0 && <p className={styles.voteTitle}>"Оцініть фільм за 10-бальною шкалою"</p>}

        <div className={styles.starsContainer} onMouseLeave={() => setHoverRating(0)}>
          {Array.from({ length: 10 }, (_, index) => {
            const starValue = index + 1;
            const isFilled = hoverRating > 0 ? starValue <= hoverRating : starValue <= userRating;

            return (
              <button
                key={starValue}
                type="button"
                className={`${styles.starBtn} ${isFilled ? styles.filled : ""}`}
                disabled={isSubmitting}
                onMouseEnter={() => setHoverRating(starValue)}
                onClick={() => handleStarClick(starValue)}
              >
                <svg viewBox="0 0 24 24" fill={isFilled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </button>
            );
          })}
        </div>

        {userRating > 0 && (
          <button onClick={handleCancelRating} className={styles.cancelBtn} disabled={isSubmitting}>
            Видалити мою оцінку
          </button>
        )}
      </div>
    </div>
  );
}
export default MediaRating;
