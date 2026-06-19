import { MediaItem } from "@/types/MediaItem";
import MediaCard from "../MediaCard/MediaCard";
import styles from "./MediaGrid.module.css";

interface Props {
  items: MediaItem[];
  variant?: "default" | "compact";
}

function MediaGrid({ items, variant }: Props) {
  if (!items || items.length === 0) {
    return <div className={styles.empty}>У цьому розділі поки що нічого немає</div>;
  }

  return (
    <div className={variant === "compact" ? styles.compactGrid : styles.grid}>
      {items.map((item) => (
        <MediaCard key={item.id} item={item} imageSizes={variant} />
      ))}
    </div>
  );
}
export default MediaGrid;
