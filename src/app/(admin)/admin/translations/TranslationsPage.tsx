"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PAGES } from "@/config/pages.config";
import { deleteTranslation, getAllTranslations } from "@/services/translations.service";
import { useNotifications } from "@/contexts/NotificationsContext";
import CircleTimer from "@/components/ui/CircleTimer/CircleTimer";
import TranslationsTable from "@/components/ui/AdminComponents/Tables/TranslationsTable/TranslationsTable";
import styles from "../AdminPage.module.css";
import { Translation } from "@/types";

function TranslationsPage() {
  const { showNotify } = useNotifications();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<Translation[]>([]);

  useEffect(() => {
    fetchTranslations();
  }, []);

  const fetchTranslations = async () => {
    setIsLoading(true);
    const response = await getAllTranslations();

    if (response && response.data) {
      setItems(response.data);
    } else {
      showNotify("Помилка при завантаженні озвучок.", "error");
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm(`Ви впевнені, що хочете видалити озвучку з ID ${id}?`)) {
      return;
    }

    const success = await deleteTranslation(id);
    if (success) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      showNotify(`Помилка при видаленні озвучки.`, "error");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Озвучки</h1>
        <Link href={PAGES.ADMIN.TRANSLATIONS_NEW} className={styles.createBtn}>
          + Створити озвучку
        </Link>
      </div>

      {isLoading ? (
        <div className={styles.loader}>
          Завантаження...
          <CircleTimer />
        </div>
      ) : (
        <TranslationsTable translationItems={items} handleDelete={handleDelete} />
      )}
    </div>
  );
}
export default TranslationsPage;
