"use client";

import { useSearchParams } from "next/navigation";
import { MediaItem, Genre } from "@/types";
import FiltersSidebar from "../FiltersSidebar/FiltersSidebar";
import MediaGrid from "../MediaGrid/MediaGrid";
import Pagination from "../Pagination/Pagination";
import styles from "./CatalogTemplate.module.css";

interface Props {
  title: string;
  initialData: MediaItem[];
  availableGenres: Genre[];
  totalPages: number;
  currentPage: number;
}

function CatalogTemplate({ title, initialData, availableGenres, totalPages, currentPage }: Props) {
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <FiltersSidebar availableGenres={availableGenres} />
      </div>

      <div className={styles.contentWrapper}>
        <MediaGrid items={initialData} />

        <div className={styles.paginationWrapper}>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
export default CatalogTemplate;
