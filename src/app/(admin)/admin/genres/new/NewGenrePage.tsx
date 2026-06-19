"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PAGES } from "@/config/pages.config";
import { createGenre } from "@/services/genres.service";
import { getCategories } from "@/services/categories.service";
import { useNotifications } from "@/contexts/NotificationsContext";
import GenreForm from "@/components/ui/AdminComponents/Forms/GenreForm/GenreForm";
import { Category, Genre } from "@/types";
import styles from "../../AdminPage.module.css";

function NewGenrePage() {
  const router = useRouter();
  const { showNotify } = useNotifications();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await getCategories();
    if (!response) return;
    setCategories(response.data);
  };

  const handleSubmit = async (data: Partial<Genre>) => {
    setIsSubmitting(true);
    const success = await createGenre(data);

    if (success) {
      showNotify("Жанр успішно створено!", "success");
      router.push(PAGES.ADMIN.GENRES);
    } else {
      showNotify("Помилка при створенні жанру", "error");
    }
    setIsSubmitting(false);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitleCenter}>Створення нового жанру</h1>
      </div>
      <div className={styles.formWrapper}>
        <GenreForm categories={categories} onSubmit={handleSubmit} isLoading={isSubmitting} />
      </div>
    </div>
  );
}
export default NewGenrePage;
