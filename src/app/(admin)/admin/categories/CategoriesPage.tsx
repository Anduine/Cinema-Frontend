"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/services/categories.service";
import { Category } from "@/types";
import { useNotifications } from "@/contexts/NotificationsContext";
import CategoriesTable from "@/components/ui/AdminComponents/Tables/CategoriesTable/CategoriesTable";
import CircleTimer from "@/components/ui/CircleTimer/CircleTimer";
import styles from "../AdminPage.module.css";

function CategoriesPage() {
  const { showNotify } = useNotifications();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    const response = await getCategories();
    if (response && response.data) {
      setCategories(response.data.toSorted((a, b) => (a.id > b.id ? 1 : -1)));
    } else {
      showNotify("Помилка завантаження категорій", "error");
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Категорії</h1>
      </div>

      {isLoading ? (
        <div className={styles.loader}>
          Завантаження...
          <CircleTimer />
        </div>
      ) : (
        <CategoriesTable categories={categories} />
      )}
    </div>
  );
}

export default CategoriesPage;
