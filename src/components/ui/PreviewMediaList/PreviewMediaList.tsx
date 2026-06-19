"use client";

import Link from "next/link";
import { MediaItem } from "@/types";
import MediaGrid from "../MediaGrid/MediaGrid";
import styles from "./PreviewMediaList.module.css";

interface Props {
  title: string;
  linkHref: string;
  items: MediaItem[];
  emptyMessage: string;
  variant?: "default" | "compact";
}

function PreviewMediaList({ title, linkHref, items, emptyMessage, variant }: Props) {
  return (
    <div className={styles.previewSection}>
      <div className={styles.previewHeader}>
        <Link href={linkHref}>
          <h3 className={styles.previewTitle}>
            {title} <span>&rarr;</span>
          </h3>
        </Link>
      </div>

      {items && items.length > 0 ? (
        <MediaGrid items={items} variant={variant || "compact"} />
      ) : (
        <div className={styles.emptyText}>{emptyMessage}</div>
      )}
    </div>
  );
}
export default PreviewMediaList;
