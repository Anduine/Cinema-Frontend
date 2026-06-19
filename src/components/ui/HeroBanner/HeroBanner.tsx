import Link from "next/link";
import { getMediaDetailById } from "@/services/media.service";
import ImageWithFallback from "@/components/ui/ImageWithFallback/ImageWithFallback";
import ButtonFavorite from "../ButtonFavorite/ButtonFavorite";
import styles from "./HeroBanner.module.css";

interface Props {
  mediaId: string;
}

async function HeroBanner({ mediaId }: Props) {
  const { data: media } = await getMediaDetailById(mediaId);

  return (
    <div className={styles.hero}>
      <div className={styles.background}>
        <ImageWithFallback src={media.posterURL} alt={media.title} fill preload className={styles.image} />
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>{media.title}</h1>

        <div className={styles.meta}>
          <span className={styles.rating}>★ {media.rating?.toFixed(1)}</span>
          <span className={styles.year}>{media.releaseYear}</span>
          <span>{media.category.name}</span>
        </div>

        <p className={styles.description}>
          {media.description?.length > 200 ? `${media.description.substring(0, 200)}...` : media.description}
        </p>

        <div className={styles.actions}>
          <Link href={`/m/${media.slug}`} className={styles.playBtn}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Дивитися
          </Link>
          <ButtonFavorite mediaId={mediaId} />
        </div>
      </div>
    </div>
  );
}
export default HeroBanner;
