"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Genre } from "@/types";
import TagSelector from "../TagSelector/TagSelector";
import styles from "./FiltersSidebar.module.css";
import CustomDropdown from "../CustomDropdown/CustomDropdown";

interface Props {
  availableGenres: Genre[];
}

function FiltersSidebar({ availableGenres }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [draftGenreIds, setDraftGenreIds] = useState<number[]>([]);
  const [draftSort, setDraftSort] = useState<string>("newest");
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const currentGenresStr = searchParams.get("genres");
    if (currentGenresStr) {
      const slugs = currentGenresStr.split(",");
      const ids = availableGenres?.filter((genre) => slugs.includes(genre.slug)).map((genre) => genre.id);
      setDraftGenreIds(ids);
    } else {
      setDraftGenreIds([]);
    }

    setDraftSort(searchParams.get("sort") || "newest");
  }, [searchParams, availableGenres]);

  const handleApplyFilters = () => {
    setIsPending(true);
    const params = new URLSearchParams(searchParams.toString());

    if (draftGenreIds.length > 0) {
      const selectedSlugs = availableGenres
        .filter((genre) => draftGenreIds.includes(genre.id))
        .map((genre) => genre.slug)
        .join(",");
      params.set("genres", selectedSlugs);
    } else {
      params.delete("genres");
    }

    if (draftSort !== "newest") {
      params.set("sort", draftSort);
    } else {
      params.delete("sort");
    }

    params.delete("page");

    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    setTimeout(() => setIsPending(false), 300);
  };

  const handleResetFilters = () => {
    setDraftGenreIds([]);
    setDraftSort("newest");
    router.push(pathname, { scroll: false });
  };

  const hasChanges = draftGenreIds?.length > 0 || draftSort !== "newest";

  return (
    <aside className={styles.topbar}>
      <div className={styles.filtersWrapper}>
        <div className={styles.filterSection}>
          <h4>Жанри</h4>
          <TagSelector
            availableValues={availableGenres}
            selectedIds={draftGenreIds}
            onChange={setDraftGenreIds}
            placeholder="Виберіть жанри..."
            inputId="genres-filter"
          />
        </div>

        <div className={styles.filterSection}>
          <h4>Сортування</h4>
          <CustomDropdown
            value={draftSort}
            options={[
              { value: "newest", label: "Найновіші" },
              { value: "oldest", label: "Найстаріші" },
              { value: "rating", label: "За рейтингом" },
              { value: "title", label: "За назвою" },
            ]}
            onChange={(value) => setDraftSort(String(value))}
          />
        </div>

        <div className={styles.actionsGroup}>
          <div className={styles.applyBtnWrapper}>
            <button onClick={handleApplyFilters} className={styles.applyBtn} disabled={isPending}>
              {isPending ? "Шукаємо..." : "Застосувати"}
            </button>
          </div>
          <button
            onClick={handleResetFilters}
            className={`${styles.resetBtn} ${hasChanges ? styles.visible : styles.hidden}`}
            disabled={!hasChanges}
          >
            Скинути
          </button>
        </div>
      </div>
    </aside>
  );
}

export default FiltersSidebar;
