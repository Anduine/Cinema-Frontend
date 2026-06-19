"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { getMe, register } from "@/services/auth.service";
import Link from "next/link";
import styles from "./AuthForms.module.css";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Паролі не співпадають");
      setIsSubmitting(false);
      return;
    }

    const res = await register({ username, email, password });

    if (!res) {
      setError(res.message || "Помилка при реєстрації");
      setIsSubmitting(false);
      return;
    }

    setUser(res.data);
    setIsSubmitting(false);
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Створення акаунту</h2>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.inputGroup}>
          <label htmlFor="reg-username">Username</label>
          <input
            id="reg-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="reg-email">Email</label>
          <input
            id="reg-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="reg-password">Пароль</label>
          <input
            id="reg-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            required
            minLength={4}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="reg-confirm">Підтвердження паролю</label>
          <input
            id="reg-confirm"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="off"
            required
          />
        </div>

        <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
          {isSubmitting ? "Створення..." : "Зареєструватися"}
        </button>

        <p className={styles.footerText}>
          Вже є акаунт? <Link href="/login">Увійти</Link>
        </p>
      </form>
    </div>
  );
}
