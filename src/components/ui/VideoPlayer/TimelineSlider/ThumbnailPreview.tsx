"use client";

import styles from "./TimelineSlider.module.css";

interface Props {
  hoverTime: number;
  // У майбутньому сюди можна передавати URL спрайту та його сітку
  spriteUrl?: string;
  enabled: boolean;
}

function ThumbnailPreview({ hoverTime, spriteUrl, enabled }: Props) {
  if (!enabled) return null;

  // Логіка для спрайту (приклад).
  // Наприклад, сітка 10x10, кожен кадр 160x90 px, 1 кадр = 10 секунд відео
  /*
  const frameIndex = Math.floor(hoverTime / 10);
  const xOffset = -(frameIndex % 10) * 160;
  const yOffset = -Math.floor(frameIndex / 10) * 90;
  */

  return (
    <div className={styles.thumbnailContainer}>
      {spriteUrl ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${spriteUrl})`,
            // backgroundPosition: `${xOffset}px ${yOffset}px`,
            backgroundSize: "cover",
          }}
        />
      ) : (
        // Красивий плейсхолдер, якщо спрайту немає
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#222",
          }}
        >
          <span style={{ color: "#666", fontSize: "10px" }}>Прев'ю</span>
        </div>
      )}
    </div>
  );
}
export default ThumbnailPreview;
