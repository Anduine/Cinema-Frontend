import { MediaDetail } from "@/types/MediaDetail";
import ImageWithFallback from "../ImageWithFallback/ImageWithFallback";
import MediaActions from "./MediaActions/MediaActions";
import MediaRating from "./MediaRating/MediaRating";
import styles from "./MediaHeader.module.css";

interface Props {
  media: MediaDetail;
}

function MediaHeader({ media }: Props) {
  return (
    <section className={styles.hero}>
      <div className={styles.posterWrapper}>
        <ImageWithFallback
          src={media.posterURL}
          alt={`Постер ${media.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className={styles.poster}
          preload
        />
      </div>

      <div className={styles.info}>
        <h1 className={styles.title}>{media.title}</h1>
        <div className={styles.metaBlock}>
          <span>Рейтинг:</span>
          <span className={styles.rating}>{media.rating.toFixed(1)}</span>
          <span>Дата виходу:</span>
          <span className={styles.metaItem}>{media.releaseYear}</span>
          <span>Країна:</span>
          <span className={styles.metaItem}>{media.countries || "США"}</span>
          <span>Вік:</span>
          <span className={styles.metaItem}>{media.ageRestriction || "16+"}</span>
          <span>Тривалість:</span>
          <span className={styles.metaItem}>{media.duration || "120 хв"}</span>
          <span>Категорія:</span>
          <span className={styles.metaItem}>{media.category.name}</span>
        </div>

        <h2>Жанри</h2>
        <ul className={styles.genres}>
          {media.genres?.map((genre) => (
            <li key={genre.id} className={styles.genreTag}>
              {genre.name}
            </li>
          ))}
        </ul>

        <MediaActions mediaId={media.id} />

        <MediaRating mediaId={media.id} />

        {media.actors && (
          <div className={styles.actorsBlock}>
            <h2 className={styles.sectionTitle}>У ролях</h2>
            <p className={styles.actors}>{media.actors?.map((actor) => actor.name).join(", ")}</p>
          </div>
        )}
      </div>
      <div className={styles.descriptionBlock}>
        <h2 className={styles.sectionTitle}>Опис</h2>
        <p className={styles.description}>{media.description}</p>
      </div>
    </section>
  );
}
export default MediaHeader;
