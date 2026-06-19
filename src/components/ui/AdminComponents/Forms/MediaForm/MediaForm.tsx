"use client";

import { useEffect, useState } from "react";
import { generateSlug } from "@/utils/generateSlug";
import { getCategories } from "@/services/categories.service";
import { getGenresDictionary } from "@/services/genres.service";
import { Category, Genre, MediaDetail } from "@/types";
import TagSelector from "@/components/ui/TagSelector/TagSelector";
import styles from "../Form.module.css";
import NumericInput from "@/components/ui/NumericInput/NumericInput";

interface Props {
  initialData?: MediaDetail | null;
  onSubmit: (data: any) => Promise<void>;
  isLoading: boolean;
}

function MediaForm({ initialData, onSubmit, isLoading }: Props) {
  const mediaId = initialData?.id;
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [releaseYear, setReleaseYear] = useState(initialData?.releaseYear.toString() || new Date().getFullYear().toString());
  const [rating, setRating] = useState(initialData?.rating || "0");
  const [status, setStatus] = useState(initialData?.status || "processing");
  const [posterURL, setPosterURL] = useState(initialData?.posterURL || "");
  const [countries, setCountries] = useState(initialData?.countries || "");
  const [ageRestriction, setAgeRestriction] = useState(initialData?.ageRestriction || "0+");
  const [description, setDescription] = useState(initialData?.description || "");
  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>(initialData?.genres?.map((g) => g.id) || []);
  const [categoryId, setCategoryId] = useState<string>(initialData?.category?.id.toString() || "");

  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [availableGenres, setAvailableGenres] = useState<Genre[]>([]);
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
  const [genresDict, setGenresDict] = useState<Record<string, Genre[]>>();

  useEffect(() => {
    loadDeps();
  }, []);

  useEffect(() => {
    const numericCategoryId = Number(categoryId);

    if (!numericCategoryId) {
      setAvailableGenres([]);
      return;
    }

    const selectedCategory = availableCategories.find((c) => c.id === numericCategoryId);

    if (selectedCategory) {
      setAvailableGenres(genresDict[selectedCategory.slug] || []);
    }
  }, [categoryId, availableCategories, genresDict]);

  useEffect(() => {
    if (!isSlugEdited && title && !initialData) {
      setSlug(generateSlug(title));
    }
  }, [title, isSlugEdited, initialData]);

  const loadDeps = async () => {
    const [catsResp, dictResp] = await Promise.all([getCategories(), getGenresDictionary()]);
    const formattedDict: Record<string, Genre[]> = {};

    if (catsResp?.data) setAvailableCategories(catsResp.data);
    if (dictResp?.data) {
      dictResp.data.forEach((item: any) => {
        formattedDict[item.categorySlug] = item.genres;
      });

      setGenresDict(formattedDict);
    }
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const formData = {
      title,
      slug,
      categoryId: Number(categoryId),
      releaseYear: Number(releaseYear),
      rating: Number(rating),
      status,
      posterURL,
      countries,
      ageRestriction,
      genreIds: selectedGenreIds,
      description,
      // actorIds: [],
      // relatedMediaIds: [],
    };

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Основна інформація</legend>

        {initialData && (
          <div className={styles.group}>
            <label htmlFor="media-id">ID (UUID)</label>
            <input id="media-id" type="text" value={mediaId} disabled className={styles.input} />
          </div>
        )}

        <div className={styles.rowGroup}>
          <div className={styles.group}>
            <label htmlFor="media-title">Назва (Title)</label>
            <input
              id="media-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="media-slug">URL-ідентифікатор (Slug)</label>
            <input
              id="media-slug"
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
        </div>

        <div className={styles.group}>
          <label htmlFor="media-description">Опис</label>
          <textarea
            id="media-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className={styles.textarea}
            autoComplete="off"
          />
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Класифікація</legend>

        <div className={styles.rowGroup}>
          <div className={styles.group}>
            <label htmlFor="media-category-id">Категорія</label>
            <select
              id="media-category-id"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className={styles.input}
            >
              <option value="" disabled>
                Оберіть категорію
              </option>
              {availableCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.group}>
            <label htmlFor="media-status">Статус</label>
            <select id="media-status" value={status} onChange={(e) => setStatus(e.target.value)} className={styles.input}>
              <option value="" disabled>
                Оберіть статус
              </option>
              <option value={"announced"}>Аноносвано</option>
              <option value={"available"}>Доступно</option>
              <option value={"processing"}>Завантажується (приховано)</option>
              <option value={"hidden"}>Приховано</option>
            </select>
          </div>
        </div>
        <div className={styles.group}>
          <label htmlFor="media-genres">Жанри</label>
          <TagSelector
            availableValues={availableGenres}
            selectedIds={selectedGenreIds}
            onChange={setSelectedGenreIds}
            inputId="media-genres"
            placeholder={categoryId === "" ? "Спочатку оберіть категорію" : "Почніть вводити жанр..."}
            isDisable={categoryId === ""}
          />
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Медіа та Деталі</legend>

        <div className={styles.rowGroup}>
          <div className={styles.group}>
            <label htmlFor="media-release-year">Рік випуску</label>
            <NumericInput
              id="media-release-year"
              type="text"
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
              className={styles.input}
              autoComplete="off"
              required
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="media-rating">Рейтинг</label>
            <input
              id="media-rating"
              type="text"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className={styles.input}
              autoComplete="off"
            />
          </div>
        </div>

        <div className={styles.rowGroup}>
          <div className={styles.group}>
            <label htmlFor="media-countries">Країни</label>
            <input
              id="media-countries"
              type="text"
              value={countries}
              onChange={(e) => setCountries(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="media-age-restriction">Вікові обмеження</label>
            <input
              id="media-age-restriction"
              type="text"
              value={ageRestriction}
              onChange={(e) => setAgeRestriction(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.group}>
          <label htmlFor="media-poster-url">URL Постера</label>
          <input
            id="media-poster-url"
            type="url"
            value={posterURL}
            onChange={(e) => setPosterURL(e.target.value)}
            placeholder="https://example.com/poster.jpg"
            className={styles.input}
            autoComplete="off"
          />
        </div>
      </fieldset>

      <button type="submit" disabled={isLoading} className={styles.submitBtn}>
        {isLoading ? "Збереження..." : initialData ? "Оновити медіа" : "Створити медіа"}
      </button>
    </form>
  );
}
export default MediaForm;
