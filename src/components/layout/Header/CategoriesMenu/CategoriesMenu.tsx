import { Category } from "@/types/Category";
import CategoryNavItem from "../CategoryNavItem/CategoryNavItem";
import styles from "./CategoriesMenu.module.css";

function CategoriesMenu({ categories }: { categories: Category[] }) {
  if (!categories || categories.length === 0) {
    return <div>Помилка завантаження категорій</div>;
  }

  return (
    <nav>
      <ul className={styles.categoriesMenu}>
        {categories.map((category) => (
          <CategoryNavItem key={category.id} category={category} />
        ))}
      </ul>
    </nav>
  );
}
export default CategoriesMenu;
