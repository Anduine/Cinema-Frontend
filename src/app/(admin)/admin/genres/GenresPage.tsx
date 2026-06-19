"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PAGES } from "@/config/pages.config";
import { getAllGenres, deleteGenre } from "@/services/genres.service";
import { Category } from "@/types";
import { useNotifications } from "@/contexts/NotificationsContext";
import CircleTimer from "@/components/ui/CircleTimer/CircleTimer";
import GenresTable from "@/components/ui/AdminComponents/Tables/GenresTable/GenresTable";
import styles from "../AdminPage.module.css";

function GenresPage() {
  const { showNotify } = useNotifications();
  const [genres, setGenres] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    const response = await getAllGenres();
    if (response && response.data) {
      setGenres(response.data.toSorted((a, b) => (a.id > b.id ? 1 : -1)));
    } else {
      showNotify("Помилка завантаження жанрів", "error");
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Видалити жанр "${name}"? Це може вплинути на прив'язані медіа.`)) {
      return;
    }

    const success = await deleteGenre(id);
    if (success) {
      setGenres((prev) => prev.filter((cat) => cat.id !== id));
      showNotify(`Жанр "${name}" успішно видалено!`, "success");
    } else {
      showNotify("Не вдалося видалити жанр. Можливо, він використовується.", "error");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Жанри</h1>
        <Link href={PAGES.ADMIN.GENRES_NEW} className={styles.createBtn}>
          + Створити жанр
        </Link>
      </div>

      {isLoading ? (
        <div className={styles.loader}>
          Завантаження...
          <CircleTimer />
        </div>
      ) : (
        <GenresTable genres={genres} onDelete={handleDelete} />
      )}
    </div>
  );
}
export default GenresPage;
