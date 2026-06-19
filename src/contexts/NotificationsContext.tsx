"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { NOTIFY_DURATION } from "@/config/notify.config";
import Notification from "@/components/ui/Notification/Notification";
import styles from "@/components/ui/Notification/Notification.module.css";

export type NotificationType = "success" | "error" | "info";

export interface NotificationMessage {
  id: string;
  type: NotificationType;
  message: string;
}

interface NotificationContextProps {
  showNotify: (message: string, type?: NotificationType, secsToHide?: number) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications повинен використовуватися всередині NotificationsProvider");
  }
  return context;
};

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const [notify, setNotify] = useState<NotificationMessage[]>([]);

  const showNotify = useCallback(
    (message: string, type: NotificationType = "info", secsToHide: number | undefined = undefined) => {
      const id = Math.random().toString(36).substring(2, 9);
      setNotify((prev) => [...prev, { id, type, message }]);

      setTimeout(
        () => {
          setNotify((prev) => prev.filter((notify) => notify.id !== id));
        },
        secsToHide !== undefined ? secsToHide * 1000 : NOTIFY_DURATION * 1000,
      );
    },
    [],
  );

  const removeNotification = useCallback((id: string) => {
    setNotify((prev) => prev.filter((notify) => notify.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotify }}>
      {children}
      <div className={styles.notifyWrapper}>
        {notify.map((notify) => (
          <Notification key={notify.id} notification={notify} onClose={() => removeNotification(notify.id)} />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
