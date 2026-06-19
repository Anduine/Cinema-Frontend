"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ModalWindow.module.css";

interface Props extends React.PropsWithChildren {
  headerText?: string;
  onClose?: () => void;
}

function ModalWindow({ headerText, onClose, children }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          {headerText && <h3>{headerText}</h3>}
          <button className={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
        </div>

        {children}
      </div>
    </div>,
    document.body,
  );
}
export default ModalWindow;
