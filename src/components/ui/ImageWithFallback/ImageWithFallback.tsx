"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import styles from "./ImageWithFallback.module.css";

interface ImageWithFallbackProps extends ImageProps {
  fallbackClassName?: string;
  nextImage?: boolean;
}

function ImageWithFallback({ src, alt, className, fallbackClassName, nextImage = true, ...props }: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className={`${styles.fallbackContainer} ${fallbackClassName || ""}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-text-muted)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.fallbackIcon}
        >
          <line x1="3" y1="3" x2="21" y2="21" />
          <path d="M10.5 10.5 13.5 13.5" />
          <path d="M19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1.5" />
          <path d="M21 15V7a2 2 0 0 0-2-2h-8.5" />
        </svg>
        <span className={styles.fallbackText}>Немає постеру</span>
      </div>
    );
  }

  if (nextImage) {
    return <Image src={src} alt={alt} className={className} onError={() => setHasError(true)} {...props} />;
  }

  return (
    <img src={src.toString()} alt={alt} className={className} loading="eager" onError={() => setHasError(true)} {...props} />
  );
}
export default ImageWithFallback;
