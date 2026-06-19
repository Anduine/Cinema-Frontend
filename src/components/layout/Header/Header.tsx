import Link from "next/link";
import { getCategories } from "@/services/categories.service";
import CategoriesMenu from "./CategoriesMenu/CategoriesMenu";
import HeaderActions from "./HeaderActions/HeaderActions";
import SearchInput from "@/components/ui/SearchInput/SearchInput";
import styles from "./Header.module.css";

async function Header() {
  const res = await getCategories();

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <SearchInput />

        <div className={styles.center}>
          <div className={styles.logo}>
            <Link href="/">Cinema</Link>
          </div>

          <CategoriesMenu categories={res?.data} />
        </div>

        <HeaderActions />
      </div>
    </header>
  );
}
export default Header;
