"use client";

import { useEffect, useState } from "react";
import style from "./CircleTimer.module.css";

interface Props {
  seconds?: number;
  onTimeEnd?: () => void;
}

const CircleTimer = ({ seconds, onTimeEnd }: Props) => {
  const dotsCount = 6;
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft === undefined) return;

    if (timeLeft === 0) {
      if (onTimeEnd) onTimeEnd();
      return;
    }

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => (prev !== undefined ? prev - 1 : undefined));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timeLeft, onTimeEnd]);

  const dots = Array.from({ length: dotsCount });

  return (
    <div className={style.timerWrapper}>
      {timeLeft !== undefined && <span className={style.counter}>{timeLeft}</span>}

      {dots.map((_, index) => {
        const rotation = index * (360 / dotsCount);
        const animDuration = dotsCount * (dotsCount / 20);
        const delay = animDuration * (index / dotsCount) - animDuration;

        return (
          <div
            key={index}
            className={style.dot}
            style={
              {
                "--rotation": `${rotation}deg`,
                "--delay": `${delay}s`,
                "--anim-duration": `${animDuration}s`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
};
export default CircleTimer;
