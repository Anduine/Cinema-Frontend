"use client";

import { NotificationMessage } from "@/contexts/NotificationsContext";
import styles from "./Notification.module.css";

interface Props {
  notification: NotificationMessage;
  onClose: () => void;
}

function Notification({ notification, onClose }: Props) {
  const typeClass = styles[notification.type];

  return (
    <div className={`${styles.notify} ${typeClass}`}>
      <div className={styles.content}>
        <span className={styles.message}>{notification.message}</span>
      </div>
      <button onClick={onClose} className={styles.closeBtn} aria-label="Закрити">
        &times;
      </button>
    </div>
  );
}
export default Notification;
