import Link from "next/link";
import { PAGES } from "@/config/pages.config";
import homeIcon from "@/assets/icons/home.svg";
import styles from "./AdminHeader.module.css";

const AdminHeader = () => {
  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Управління контентом</h1>
        <nav className={styles.nav}>
          <Link href={PAGES.ADMIN.CATEGORIES} className={styles.navButton}>
            Категорії
          </Link>
          <Link href={PAGES.ADMIN.GENRES} className={styles.navButton}>
            Жанри
          </Link>
          <Link href={PAGES.ADMIN.MEDIA} className={styles.navButton}>
            Медіа
          </Link>
          <Link href={PAGES.ADMIN.TRANSLATIONS} className={styles.navButton}>
            Озвучки
          </Link>
        </nav>
        <div className={styles.actions}>
          <Link href="/">
            <div className={styles.homeBtnWrapper}>
              <svg>
                <use xlinkHref={homeIcon.src} />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AdminHeader;
