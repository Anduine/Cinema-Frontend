"use client";

import { useState } from "react";
import styles from "../Form.module.css";

interface TranslationFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
  isLoading: boolean;
}

export const TranslationForm = ({ initialData, onSubmit, isLoading }: TranslationFormProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [language, setLanguage] = useState(initialData?.language || "");
  const [type, setType] = useState(initialData?.type || "");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit({ name, language, type });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.group}>
        <label htmlFor="translation-name">Назва студії / озвучки</label>
        <input
          id="translation-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Наприклад: LostFilm, HDrezka..."
          required
          className={styles.input}
        />
      </div>

      <div className={styles.group}>
        <label htmlFor="translation-language">Мова</label>
        <select
          id="translation-language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          required
          className={styles.input}
        >
          <option value="" disabled>
            Оберіть мову
          </option>
          <option value="uk">Українська (uk)</option>
          <option value="ru">Російська (ru)</option>
          <option value="en">Англійська (en)</option>
          <option value="jp">Японська (jp)</option>
        </select>
      </div>

      <div className={styles.group}>
        <label htmlFor="translation-type">Тип озвучки</label>
        <select id="translation-type" value={type} onChange={(e) => setType(e.target.value)} required className={styles.input}>
          <option value="" disabled>
            Оберіть тип
          </option>
          <option value="dubbing">Дубляж</option>
          <option value="single-voice-over">Одноголосий закадровий</option>
          <option value="double-voice-over">Двоголосий закадровий</option>
          <option value="multi-voice-over">Багатоголосий закадровий</option>
          <option value="subtitles">Субтитри</option>
        </select>
      </div>

      <button type="submit" className={styles.submitBtn} disabled={isLoading}>
        {isLoading ? "Збереження..." : initialData ? "Оновити озвучку" : "Додати озвучку"}
      </button>
    </form>
  );
};
