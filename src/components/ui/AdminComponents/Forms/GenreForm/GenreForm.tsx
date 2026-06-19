"use client";

import { useState, useEffect, use } from "react";
import { Category, Genre } from "@/types";
import { generateSlug } from "@/utils/generateSlug";
import TagSelector from "@/components/ui/TagSelector/TagSelector";
import styles from "../Form.module.css";

interface Props {
  initialData?: Genre | null;
  categories: Category[];
  onSubmit: (data: any) => Promise<void>;
  isLoading: boolean;
}

function GenreForm({ initialData, categories, onSubmit, isLoading }: Props) {
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState<number[]>(initialData?.categoriesIds || []);
  const [isSlugEdited, setIsSlugEdited] = useState(false);

  useEffect(() => {
    if (!isSlugEdited && name && !initialData) {
      setSlug(generateSlug(name));
    }
  }, [name, isSlugEdited, initialData]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit({ name, slug, categoriesIds: selectedCategoriesIds });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.group}>
        <label htmlFor="genre-name">Назва жанру</label>
        <input
          id="genre-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          autoComplete="off"
          required
        />
      </div>

      <div className={styles.group}>
        <label htmlFor="genre-slug">URL-ідентифікатор (Slug)</label>
        <input
          id="genre-slug"
          type="text"
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setIsSlugEdited(true);
          }}
          className={styles.input}
          autoComplete="off"
          required
        />
      </div>

      <div className={styles.group}>
        <label htmlFor="genre-categories">Категорії</label>
        <TagSelector
          availableValues={categories}
          selectedIds={selectedCategoriesIds}
          onChange={setSelectedCategoriesIds}
          inputId="genre-categories"
          placeholder="Почніть вводити категорію..."
        />
      </div>

      <button type="submit" disabled={isLoading} className={styles.submitBtn}>
        {isLoading ? "Збереження..." : initialData ? "Оновити жанр" : "Створити жанр"}
      </button>
    </form>
  );
}
export default GenreForm;
