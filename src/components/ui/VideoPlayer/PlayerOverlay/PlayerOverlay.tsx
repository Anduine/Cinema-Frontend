"use client";

import { useEffect, useState, useRef, RefObject } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";
import TopControls from "../TopControls/TopControls";
import CenterControls from "../CenterControls/CenterControls";
import BottomControls from "../BottomControls/BottomControls";
import styles from "./PlayerOverlay.module.css";

interface Props {
  videoRef: RefObject<HTMLVideoElement | null>;
  isVideoReady: boolean;
  onToggleFullscreen: () => void;
  mediaTitle?: string;
}

function PlayerOverlay({ videoRef, isVideoReady, onToggleFullscreen, mediaTitle }: Props) {
  const { isPlaying } = usePlayerStore();
  const [showControls, setShowControls] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      setShowControls(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    } else {
      handleMouseMove();
    }
  }, [isPlaying]);

  const handleMouseMove = () => {
    setShowControls(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (isPlaying) {
      timeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  const handleMouseLeave = () => {
    if (isPlaying) setShowControls(false);
  };

  const onTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${styles.overlay} ${styles.visibleControls} ${showControls ? styles.visibleControls : ""}`}
    >
      <TopControls title={mediaTitle} />

      {isVideoReady ? (
        <>
          <CenterControls onTogglePlay={onTogglePlay} />
          <BottomControls videoRef={videoRef} onToggleFullscreen={onToggleFullscreen} onTogglePlay={onTogglePlay} />
        </>
      ) : (
        <div style={{ flex: 1 }} />
      )}
    </div>
  );
}
export default PlayerOverlay;
