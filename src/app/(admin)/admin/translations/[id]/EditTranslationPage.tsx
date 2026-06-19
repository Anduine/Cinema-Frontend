"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PAGES } from "@/config/pages.config";
import { Translation } from "@/types";
import { getTranslationById, updateTranslation } from "@/services/translations.service";
import { useNotifications } from "@/contexts/NotificationsContext";
import { TranslationForm } from "@/components/ui/AdminComponents/Forms/TranslationForm/TranslationForm";
import styles from "../../AdminPage.module.css";

interface Props {
  params: Promise<{ id: string }>;
}

function EditTranslationPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const { showNotify } = useNotifications();
  const [translation, setTranslation] = useState<Translation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchTranslation();
  }, []);

  const fetchTranslation = async () => {
    const response = await getTranslationById(Number(id));
    if (response) {
      setTranslation(response.data);
    } else {
      showNotify("Озвучка не знайдена", "error");
      router.push(PAGES.ADMIN.TRANSLATIONS);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (data: Partial<Translation>) => {
    setIsSubmitting(true);
    const success = await updateTranslation(Number(id), data);

    if (success) {
      showNotify("Озвучку успішно оновлено!", "success");
      router.push(PAGES.ADMIN.TRANSLATIONS);
    } else {
      showNotify("Помилка при оновленні озвучки", "error");
    }
    setIsSubmitting(false);
  };

  if (isLoading) return <div className={styles.loader}>Завантаження...</div>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitleCenter}>Редагування озвучки</h1>
      </div>
      <div className={styles.formWrapper}>
        <TranslationForm initialData={translation} onSubmit={handleSubmit} isLoading={isSubmitting} />
      </div>
    </div>
  );
}
export default EditTranslationPage;
