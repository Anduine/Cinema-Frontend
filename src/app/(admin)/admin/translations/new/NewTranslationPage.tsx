"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/contexts/NotificationsContext";
import { PAGES } from "@/config/pages.config";
import { createTranslation } from "@/services/translations.service";
import { TranslationForm } from "@/components/ui/AdminComponents/Forms/TranslationForm/TranslationForm";
import styles from "../../AdminPage.module.css";
import { Translation } from "@/types";

function NewTranslationPage() {
  const router = useRouter();
  const { showNotify } = useNotifications();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: Translation) => {
    setIsSubmitting(true);
    const success = await createTranslation(data);

    if (success) {
      showNotify("Озвучка успішно створена!", "success");
      router.push(PAGES.ADMIN.TRANSLATIONS);
    } else {
      showNotify("Помилка при створенні озвучки", "error");
    }
    setIsSubmitting(false);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitleCenter}>Створення нової озвучки</h1>
      </div>
      <div className={styles.formWrapper}>
        <TranslationForm onSubmit={handleSubmit} isLoading={isSubmitting} />
      </div>
    </div>
  );
}
export default NewTranslationPage;
