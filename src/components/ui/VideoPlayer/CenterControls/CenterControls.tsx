"use client";

import { usePlayerStore } from "@/store/usePlayerStore";
import playIcon from "@/assets/icons/play.svg";
import styles from "./CenterControls.module.css";

interface Props {
  onTogglePlay: () => void;
}

function CenterControls({ onTogglePlay }: Props) {
  const { isPlaying } = usePlayerStore();

  return (
    <div className={styles.container} onClick={onTogglePlay}>
      {!isPlaying && (
        <div className={styles.playBtnWrapper}>
          <svg>
            <use xlinkHref={playIcon.src} />
          </svg>
        </div>
      )}
    </div>
  );
}
export default CenterControls;
