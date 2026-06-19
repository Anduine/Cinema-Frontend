import { useEffect, RefObject, useRef } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";

export const usePlayerShortcuts = (
  videoRef: RefObject<HTMLVideoElement | null>,
  containerRef: RefObject<HTMLDivElement | null>,
) => {
  const scrollPosRef = useRef(0);
  const { toggleFullscreen, toggleMute } = usePlayerStore();

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFull = !!document.fullscreenElement;

      usePlayerStore.setState({ isFullscreen: isFull });

      if (!isFull) {
        window.scrollTo(0, scrollPosRef.current);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    // Для Safari
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, [containerRef]);

  const handleFullscreenToggle = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      scrollPosRef.current = window.scrollY;

      if (container.requestFullscreen) container.requestFullscreen();

      toggleFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();

      toggleFullscreen();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const video = videoRef.current;
      if (!video) return;

      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;

      switch (e.code) {
        case "Space":
        case "KeyK":
          e.preventDefault();
          if (video.paused) video.play();
          else video.pause();
          break;
        case "KeyF":
          e.preventDefault();
          handleFullscreenToggle();
          break;
        case "KeyM":
          e.preventDefault();
          video.muted = !video.muted;
          toggleMute();
          break;
        case "ArrowRight":
          e.preventDefault();
          video.currentTime = Math.min(video.currentTime + 10, video.duration);
          break;
        case "ArrowLeft":
          e.preventDefault();
          video.currentTime = Math.max(video.currentTime - 10, 0);
          break;
        case "ArrowUp":
          e.preventDefault();
          video.volume = Math.min(video.volume + 0.1, 1);
          break;
        case "ArrowDown":
          e.preventDefault();
          video.volume = Math.max(video.volume - 0.1, 0);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return { handleFullscreenToggle };
};
