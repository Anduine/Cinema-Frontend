"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PAGES } from "@/config/pages.config";
import { getMediaList, deleteMedia } from "@/services/media.service";
import { useNotifications } from "@/contexts/NotificationsContext";
import { MediaItem } from "@/types/MediaItem";
import MediaTable from "@/components/ui/AdminComponents/Tables/MediaTable/MediaTable";
import CircleTimer from "@/components/ui/CircleTimer/CircleTimer";
import styles from "../AdminPage.module.css";

function MediaPage() {
  const { showNotify } = useNotifications();
  const [іtems, setItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setIsLoading(true);
    const response = await getMediaList({ limit: 100, status: "*" });

    if (response && response.data) {
      setItems(response.data);
    } else {
      showNotify("Помилка при завантаженні медіа.", "error");
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Ви впевнені, що хочете видалити медіа "${title}"?`)) {
      return;
    }

    const success = await deleteMedia(id);
    if (success) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      showNotify(`Помилка при видаленні медіа "${title}".`, "error");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Медіа</h1>
        <Link href={PAGES.ADMIN.MEDIA_NEW} className={styles.createBtn}>
          + Створити медіа
        </Link>
      </div>

      {isLoading ? (
        <div className={styles.loader}>
          Завантаження...
          <CircleTimer />
        </div>
      ) : (
        <MediaTable mediaItems={іtems} handleDelete={handleDelete} />
      )}
    </div>
  );
}
export default MediaPage;
