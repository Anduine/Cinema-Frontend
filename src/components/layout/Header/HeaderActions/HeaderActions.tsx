"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import adminIcon from "@/assets/icons/admin.svg";
import userIcon from "@/assets/icons/user.svg";
import styles from "./HeaderActions.module.css";

function HeaderActions() {
  const { user, isLoading, logout } = useAuthStore();

  if (isLoading) {
    return (
      <div className={styles.actions}>
        <div className={styles.loader}>Завантаження...</div>
      </div>
    );
  }

  return (
    <div className={styles.actions}>
      {user ? (
        <>
          {user?.role === "admin" && (
            <Link href="/admin" title="Панель адміністратора">
              <div className={styles.adminBtn}>
                <svg>
                  <use xlinkHref={adminIcon.src} />
                </svg>
              </div>
            </Link>
          )}

          <Link href="/profile" title="Профіль користувача">
            <div className={styles.profileBtn}>
              <svg>
                <use xlinkHref={userIcon.src} />
              </svg>
            </div>
          </Link>

          <button onClick={logout} className={styles.logoutBtn}>
            Вийти
          </button>
        </>
      ) : (
        <>
          <Link href="/login">
            <div className={styles.loginBtn}>Увійти</div>
          </Link>
          <Link href="/register">
            <div className={styles.registerBtn}>Реєстрація</div>
          </Link>
        </>
      )}
    </div>
  );
}
export default HeaderActions;
