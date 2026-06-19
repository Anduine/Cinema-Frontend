"use client";

import { useEffect, useState } from "react";
import { useNotifications } from "@/contexts/NotificationsContext";
import { useAuthStore } from "@/store/useAuthStore";
import { removeFromFavorites, addToFavorites, checkMediaInLists } from "@/services/lists.service";
import styles from "./ButtonFavorite.module.css";

interface Props {
  mediaId: string;
}

function ButtonFavorite({ mediaId }: Props) {
  const { showNotify } = useNotifications();
  const { user } = useAuthStore();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchStatus = async () => {
      const { data: status } = await checkMediaInLists(mediaId);
      if (status) {
        setIsFavorite(status.isFavorite);
      }
    };
    fetchStatus();
  }, [mediaId, user]);

  const handleFavoriteClick = async () => {
    if (!user) {
      showNotify("Авторизуйтесь, для додавання в улюблене", "error");
      return;
    }

    setIsFavorite(!isFavorite);
    const success = isFavorite ? await removeFromFavorites(mediaId) : await addToFavorites(mediaId);

    if (!success) setIsFavorite(isFavorite);
  };

  return (
    <button
      className={`${styles.actionBtn} ${isFavorite ? styles.activeFav : ""}`}
      onClick={handleFavoriteClick}
      title={isFavorite ? "Видалити з улюбленого" : "Додати в улюблене"}
    >
      <svg viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {isFavorite ? "В улюбленому" : "В улюблене"}
    </button>
  );
}
export default ButtonFavorite;
