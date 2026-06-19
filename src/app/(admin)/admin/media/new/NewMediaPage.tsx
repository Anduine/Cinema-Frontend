"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PAGES } from "@/config/pages.config";
import { createMedia } from "@/services/media.service";
import { MediaDetail } from "@/types/MediaDetail";
import { useNotifications } from "@/contexts/NotificationsContext";
import MediaForm from "@/components/ui/AdminComponents/Forms/MediaForm/MediaForm";
import styles from "../../AdminPage.module.css";

function NewMediaPage() {
  const router = useRouter();
  const { showNotify } = useNotifications();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: Partial<MediaDetail>) => {
    setIsSubmitting(true);
    const success = await createMedia(data);

    if (success) {
      showNotify("Медіа успішно створено!", "success");
      router.push(PAGES.ADMIN.MEDIA);
    } else {
      showNotify("Помилка при створенні медіа", "error");
    }
    setIsSubmitting(false);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitleCenter}>Створення нового медіа</h1>
      </div>
      <div className={styles.formWrapper}>
        <MediaForm onSubmit={handleSubmit} isLoading={isSubmitting} />
      </div>
    </div>
  );
}
export default NewMediaPage;
