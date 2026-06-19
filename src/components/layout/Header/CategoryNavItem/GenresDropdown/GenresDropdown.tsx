import Link from "next/link";
import { Genre } from "@/types/Genre";
import styles from "./GenresDropdown.module.css";

interface Props {
  categorySlug: string;
  genres: Genre[] | undefined;
}

function GenresDropdown({ categorySlug, genres }: Props) {
  if (!genres || !genres.length)
    return (
      <div className={styles.container}>
        <ul className={styles.list}>
          <li>Немає жанрів</li>
        </ul>
      </div>
    );

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {genres.map((genre) => (
          <li key={genre.id}>
            <Link href={`/${categorySlug}?genres=${genre.slug}`} className={styles.item}>
              {genre.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default GenresDropdown;
