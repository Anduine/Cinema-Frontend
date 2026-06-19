"use client";

import { RefObject } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";
import { formatTime } from "@/utils/formatTime";
import playIcon from "@/assets/icons/play.svg";
import pauseIcon from "@/assets/icons/pause.svg";
import PlayerSettings from "../PlayerSettings/PlayerSettings";
import VolumeControl from "../VolumeControl/VolumeControl";
import fullscreenIcon from "@/assets/icons/fullscreen.svg";
import quitFullscreenIcon from "@/assets/icons/quitFullscreen.svg";
import TimelineSlider from "../TimelineSlider/TimelineSlider";
import styles from "./BottomControls.module.css";

interface Props {
  videoRef: RefObject<HTMLVideoElement | null>;
  onToggleFullscreen: () => void;
  onTogglePlay: () => void;
}

function BottomControls({ videoRef, onToggleFullscreen, onTogglePlay }: Props) {
  const { isPlaying, duration, currentTime, isFullscreen } = usePlayerStore();

  return (
    <div className={styles.container}>
      {/* Пауза, Час */}
      <div className={styles.leftActions}>
        <button onClick={onTogglePlay} className={styles.playPauseBtn}>
          {isPlaying ? (
            <svg>
              <use xlinkHref={pauseIcon.src} />
            </svg>
          ) : (
            <svg>
              <use xlinkHref={playIcon.src} />
            </svg>
          )}
        </button>

        <p className={styles.time}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </p>
      </div>

      <TimelineSlider videoRef={videoRef} showThumbnails={false} />

      <div className={styles.actionBtns}>
        {/* Налаштування, Фулскрін */}
        <div className={styles.rightActions}>
          <VolumeControl videoRef={videoRef} />
          <PlayerSettings videoRef={videoRef} />

          <button onClick={onToggleFullscreen} className={styles.fullscreenBtn}>
            {isFullscreen ? (
              <svg>
                <use xlinkHref={quitFullscreenIcon.src} />
              </svg>
            ) : (
              <svg>
                <use xlinkHref={fullscreenIcon.src} />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
export default BottomControls;
