"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getGenreById, getGenresByCategory, updateGenre } from "@/services/genres.service";
import { PAGES } from "@/config/pages.config";
import { useNotifications } from "@/contexts/NotificationsContext";
import GenreForm from "@/components/ui/AdminComponents/Forms/GenreForm/GenreForm";
import { getCategories } from "@/services/categories.service";
import { Category, Genre } from "@/types";
import styles from "../../AdminPage.module.css";

interface Props {
  params: Promise<{ id: string }>;
}

function EditGenrePage({ params }: Props) {
  const { id } = use(params);
  const genreId = parseInt(id, 10);

  const router = useRouter();
  const { showNotify } = useNotifications();

  const [genre, setGenre] = useState<Genre | null>(null);
  const [categories, setCategories] = useState<Category[]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadDeps();
  }, []);

  const loadDeps = async () => {
    const [genreResp, catsResp] = await Promise.all([getGenreById(genreId), getCategories()]);

    if (!genreResp || !catsResp) {
      showNotify("Жанр не знайдено", "error");
      router.push(PAGES.ADMIN.GENRES);
    }

    setGenre(genreResp.data);
    setCategories(catsResp.data);

    setIsLoading(false);
  };

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    const success = await updateGenre(genreId, data);

    if (success) {
      showNotify("Жанр успішно оновлено!", "success");
      router.push(PAGES.ADMIN.GENRES);
    } else {
      showNotify("Помилка при оновленні жанру", "error");
    }
    setIsSubmitting(false);
  };

  if (isLoading) return <div className={styles.loader}>Завантаження...</div>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitleCenter}>Редагування жанру</h1>
      </div>
      <div className={styles.formWrapper}>
        <GenreForm initialData={genre} categories={categories} onSubmit={handleSubmit} isLoading={isSubmitting} />
      </div>
    </div>
  );
}

export default EditGenrePage;
