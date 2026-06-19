"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PAGES } from "@/config/pages.config";
import { getMediaDetailById, updateMedia } from "@/services/media.service";
import { useNotifications } from "@/contexts/NotificationsContext";
import { MediaDetail } from "@/types/MediaDetail";
import MediaForm from "@/components/ui/AdminComponents/Forms/MediaForm/MediaForm";
import styles from "../../AdminPage.module.css";

interface Props {
  params: Promise<{ id: string }>;
}

function EditMediaPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const { showNotify } = useNotifications();
  const [media, setMedia] = useState<MediaDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    const response = await getMediaDetailById(id);
    if (response) {
      setMedia(response.data);
    } else {
      showNotify("Медіа не знайдено", "error");
      router.push(PAGES.ADMIN.MEDIA);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (data: Partial<MediaDetail>) => {
    setIsSubmitting(true);
    const success = await updateMedia(id, data);

    if (success) {
      showNotify("Медіа успішно оновлено!", "success");
      router.push(PAGES.ADMIN.MEDIA);
    } else {
      showNotify("Помилка при оновленні медіа", "error");
    }
    setIsSubmitting(false);
  };

  if (isLoading) return <div className={styles.loader}>Завантаження...</div>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitleCenter}>Редагування медіа</h1>
      </div>
      <div className={styles.formWrapper}>
        <MediaForm initialData={media} onSubmit={handleSubmit} isLoading={isSubmitting} />
      </div>
    </div>
  );
}
export default EditMediaPage;
