"use client";

import { RefObject, useState } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";
import volumeMuteIcon from "@/assets/icons/volumeMute.svg";
import volumeLowIcon from "@/assets/icons/volumeLow.svg";
import volumeHighIcon from "@/assets/icons/volumeHigh.svg";
import styles from "./VolumeControl.module.css";

interface Props {
  videoRef: RefObject<HTMLVideoElement | null>;
}

function VolumeControl({ videoRef }: Props) {
  const { volume, setVolume, isMuted, toggleMute } = usePlayerStore();
  const [isHovered, setIsHovered] = useState(false);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
      setVolume(newVolume);
    }
  };

  const handleMuteClick = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      toggleMute();
    }
  };

  return (
    <div className={styles.wrapper} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <button className={styles.soundBtn} onClick={handleMuteClick}>
        {isMuted || volume === 0 ? (
          <svg>
            <use xlinkHref={volumeMuteIcon.src} />
          </svg>
        ) : volume > 0.5 ? (
          <svg>
            <use xlinkHref={volumeHighIcon.src} />
          </svg>
        ) : (
          <svg>
            <use xlinkHref={volumeLowIcon.src} />
          </svg>
        )}
      </button>

      <div className={styles.sliderWrapper}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className={styles.slider}
        />
      </div>
    </div>
  );
}
export default VolumeControl;
