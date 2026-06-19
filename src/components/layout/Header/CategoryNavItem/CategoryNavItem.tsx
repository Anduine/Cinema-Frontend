import Link from "next/link";
import { Category } from "@/types";
import { getGenresByCategory } from "@/services/genres.service";
import GenresDropdown from "./GenresDropdown/GenresDropdown";
import styles from "./CategoryNavItem.module.css";

interface Props {
  category: Category;
}

async function CategoryNavItem({ category }: Props) {
  const genres = await getGenresByCategory(category.slug);

  return (
    <li className={styles.navItem}>
      <Link href={`/${category.slug}`} className={styles.navLink}>
        {category.name}
      </Link>
      <GenresDropdown categorySlug={category.slug} genres={genres?.data} />
    </li>
  );
}
export default CategoryNavItem;
