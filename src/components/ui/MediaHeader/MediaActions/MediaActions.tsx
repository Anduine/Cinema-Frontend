"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useNotifications } from "@/contexts/NotificationsContext";
import { addToWatchLater, removeFromWatchLater, checkMediaInLists } from "@/services/lists.service";
import ButtonFavorite from "../../ButtonFavorite/ButtonFavorite";
import styles from "./MediaActions.module.css";

interface Props {
  mediaId: string;
}

function MediaActions({ mediaId }: Props) {
  const { showNotify } = useNotifications();
  const { user } = useAuthStore();

  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    fetchStatus();
  }, [mediaId, user]);

  const fetchStatus = async () => {
    const { data: status } = await checkMediaInLists(mediaId);
    if (status) {
      setIsFavorite(status.isFavorite);
      setIsWatchLater(status.isWatchLater);
    }
    setIsLoading(false);
  };

  const handleWatchLaterClick = async () => {
    if (!user) {
      showNotify("Авторизуйтесь, для додавання в список", "error");
      return;
    }

    setIsWatchLater(!isWatchLater);
    const success = isWatchLater ? await removeFromWatchLater(mediaId) : await addToWatchLater(mediaId);

    if (!success) setIsWatchLater(isWatchLater);
  };

  if (isLoading) {
    return <div className={styles.actionsSkeleton}>Завантаження...</div>;
  }

  return (
    <div className={styles.actionsContainer}>
      <ButtonFavorite mediaId={mediaId} />

      <button
        className={`${styles.actionBtn} ${isWatchLater ? styles.activeWL : ""}`}
        onClick={handleWatchLaterClick}
        title={isWatchLater ? "Прибрати зі списку" : "Дивитися пізніше"}
      >
        <svg viewBox="0 0 24 24" fill={isWatchLater ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
        {isWatchLater ? "Відкладено" : "Дивитися пізніше"}
      </button>
    </div>
  );
}
export default MediaActions;
