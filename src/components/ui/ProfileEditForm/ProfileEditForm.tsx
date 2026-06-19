"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAvatarURL } from "@/config/avatar.config";
import { UserProfile } from "@/types/";
import { updateProfile, uploadAvatar } from "@/services/profile.service";
import styles from "./ProfileEdit.module.css";

interface Props {
  initialProfile: UserProfile;
}

function ProfileEditForm({ initialProfile }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [firstname, setFirstname] = useState(initialProfile.firstname || "");
  const [lastname, setLastname] = useState(initialProfile.lastname || "");
  const [bio, setBio] = useState(initialProfile.bio || "");

  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(getAvatarURL(initialProfile.avatarURL));
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  useEffect(() => {
    if (!selectedFile) return;

    const objectUrl = URL.createObjectURL(selectedFile);
    setAvatarPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ text: "Файл занадто великий! Максимум 5 МБ.", isError: true });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      if (selectedFile) {
        const ok = await uploadAvatar(selectedFile);
        if (!ok) {
          throw new Error("Не вдалося завантажити аватар");
        }
      }

      const success = await updateProfile({ firstname, lastname, bio });
      if (!success) {
        throw new Error("Не вдалося оновити дані профілю");
      }

      setMessage({ text: "Профіль успішно оновлено!", isError: false });

      router.refresh();

      setTimeout(() => router.push("/profile"), 1500);
    } catch (err: any) {
      setMessage({ text: err.message || "Сталася помилка", isError: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Налаштування профілю</h2>

      <div className={styles.avatarSection}>
        <div className={styles.avatarWrapper} onClick={() => fileInputRef.current?.click()}>
          {avatarPreview ? (
            <img src={avatarPreview} alt="Preview" className={styles.avatar} />
          ) : (
            <div className={styles.avatarPlaceholder}>{initialProfile.username?.charAt(0).toUpperCase()}</div>
          )}
          <div className={styles.avatarOverlay}>Змінити</div>
        </div>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className={styles.hiddenInput} />
        <p className={styles.hint}>Натисніть на коло, щоб змінити фото (до 5 МБ)</p>
      </div>

      <div className={styles.inputGroup}>
        <label>Юзернейм (не можна змінити)</label>
        <input type="text" value={initialProfile.username} disabled className={styles.disabledInput} />
      </div>

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label>Ім'я</label>
          <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="Ваше ім'я" />
        </div>
        <div className={styles.inputGroup}>
          <label>Прізвище</label>
          <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="Ваше прізвище" />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label>Про себе (Bio)</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Розкажіть трохи про себе..." rows={4} />
      </div>

      {message && <div className={message.isError ? styles.errorMessage : styles.successMessage}>{message.text}</div>}

      <div className={styles.actions}>
        <button type="button" onClick={() => router.push("/profile")} className={styles.cancelBtn} disabled={isSubmitting}>
          Скасувати
        </button>
        <button type="submit" className={styles.saveBtn} disabled={isSubmitting}>
          {isSubmitting ? "Збереження..." : "Зберегти зміни"}
        </button>
      </div>
    </form>
  );
}
export default ProfileEditForm;
