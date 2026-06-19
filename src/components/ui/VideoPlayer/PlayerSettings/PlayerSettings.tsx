"use client";

import { RefObject, useState } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";
import settingsIcon from "@/assets/icons/settings.svg";
import styles from "./PlayerSettings.module.css";

interface Props {
  videoRef: RefObject<HTMLVideoElement | null>;
}

function PlayerSettings({ videoRef }: Props) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleSpeedChange = (speed: number) => {
    if (videoRef.current) videoRef.current.playbackRate = speed;
    setIsSettingsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className={styles.settingsBtn}>
        <svg>
          <use xlinkHref={settingsIcon.src} />
        </svg>
      </button>

      {isSettingsOpen && (
        <div className={styles.container}>
          <div className={styles.speedTab}>Швидкість</div>
          {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
            <button key={speed} onClick={() => handleSpeedChange(speed)} className={styles.speedBtn}>
              {speed}x
            </button>
          ))}
        </div>
      )}
    </>
  );
}
export default PlayerSettings;
