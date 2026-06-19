import Link from "next/link";
import { MediaItem } from "@/types/MediaItem";
import styles from "./MediaCard.module.css";
import ImageWithFallback from "../ImageWithFallback/ImageWithFallback";
import { PAGES } from "@/config/pages.config";

interface Props {
  item: MediaItem;
  imageSizes?: "default" | "compact";
  imageClassName?: string;
}

function MediaCard({ item, imageClassName, imageSizes }: Props) {
  return (
    <article className={`${styles.card} ${imageSizes === "compact" ? styles.compactCard : ""}`}>
      <Link href={PAGES.MEDIA_PAGE(item.slug)} className={styles.link}>
        <div className={styles.imageWrapper}>
          <ImageWithFallback
            src={item.posterURL}
            alt={`Постер ${item.title}`}
            fill
            sizes={"(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"}
            className={imageClassName || styles.image}
            loading="eager"
          />
          {item.rating && <div className={styles.rating}>{item.rating.toFixed(1)}</div>}
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{item.title}</h3>
          <span className={styles.year}>{item.releaseYear}</span>
        </div>
      </Link>
    </article>
  );
}
export default MediaCard;
