"use client";

import { useRef, useState, useEffect, useCallback, RefObject } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";
import { formatTime } from "@/utils/formatTime";
import ThumbnailPreview from "./ThumbnailPreview";
import styles from "./TimelineSlider.module.css";

interface Props {
  videoRef: RefObject<HTMLVideoElement | null>;
  showThumbnails?: boolean;
}

function TimelineSlider({ videoRef, showThumbnails = true }: Props) {
  const { currentTime, duration, setIsPlaying } = usePlayerStore();
  const timelineRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const [hoverProgress, setHoverProgress] = useState(0);
  const [bufferProgress, setBufferProgress] = useState(0);
  const [wasPlayingBeforeDrag, setWasPlayingBeforeDrag] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateBuffer = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        setBufferProgress(bufferedEnd / video.duration);
      }
    };

    video.addEventListener("progress", updateBuffer);
    return () => video.removeEventListener("progress", updateBuffer);
  }, [videoRef]);

  const getCalculateProgress = useCallback((clientX: number) => {
    if (!timelineRef.current) return 0;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    return percentage;
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!videoRef.current || duration === 0) return;

    const video = videoRef.current;
    setWasPlayingBeforeDrag(!video.paused);
    video.pause();
    setIsPlaying(false);

    setIsDragging(true);

    const progress = getCalculateProgress(e.clientX);
    setDragProgress(progress);
    video.currentTime = progress * duration;
  };

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!videoRef.current || duration === 0) return;
      // Щоб браузер не виділяв текст при перетягуванні
      e.preventDefault();

      const progress = getCalculateProgress(e.clientX);
      setDragProgress(progress);
      videoRef.current.currentTime = progress * duration;
    },
    [duration, getCalculateProgress, videoRef],
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);

    // Якщо відео грало до того, як ми почали тягнути повзунок - відновлюємо відтворення
    if (wasPlayingBeforeDrag && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [wasPlayingBeforeDrag, videoRef, setIsPlaying]);

  useEffect(() => {
    if (isDragging) {
      document.body.style.userSelect = "none";

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointercancel", handlePointerUp);

      return () => {
        // React гарантує, що тут будуть правильні посилання на функції для видалення
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("pointercancel", handlePointerUp);

        // Повертаємо можливість виділяти текст
        document.body.style.userSelect = "";
      };
    }
  }, [isDragging, handlePointerMove, handlePointerUp]);

  // 4. Обробник Hover (тултип)
  const handleHoverMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (duration === 0) return;
    const progress = getCalculateProgress(e.clientX);
    setHoverProgress(progress);
  };

  // 5. Фінальні розрахунки для рендеру
  // Якщо ми тягнемо, показуємо локальний dragProgress. Якщо ні - реальний currentTime зі стора
  const displayProgress = isDragging ? dragProgress : duration > 0 ? currentTime / duration : 0;
  const hoverTime = hoverProgress * duration;

  // Запобігаємо виходу тултипа за межі екрана (CSS)
  const tooltipLeft = `calc(${hoverProgress * 100}% - 0px)`;

  return (
    <div
      className={`${styles.timelineWrapper} ${isDragging ? styles.isDragging : ""}`}
      ref={timelineRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handleHoverMove}
    >
      <div className={styles.hoverTooltip} style={{ left: tooltipLeft }}>
        <ThumbnailPreview enabled={showThumbnails} hoverTime={hoverTime} />
        <div className={styles.hoverTime}>{formatTime(hoverTime)}</div>
      </div>

      <div className={styles.track}>
        <div className={styles.buffer} style={{ width: `${bufferProgress * 100}%` }} />
        <div className={styles.progress} style={{ width: `${displayProgress * 100}%` }} />
        <div className={styles.thumb} style={{ left: `${displayProgress * 100}%` }} />
      </div>
    </div>
  );
}
export default TimelineSlider;
