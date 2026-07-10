"use client";

import React, { ElementType, useEffect, useState, useRef, useCallback } from "react";

type ScrambleTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
};

const GLYPHS = "01$#?@_[]{}X%&+-=*/<>SYSTEM_ERROR_ACTIVE_SIGNAL_";

export function ScrambleText({
  text,
  as: Component = "span",
  className,
  delay = 0,
}: ScrambleTextProps) {
  const [prevText, setPrevText] = useState(text);
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);

  // Synchronize state when text prop changes (React-recommended pattern)
  if (text !== prevText) {
    setPrevText(text);
    setDisplayText(text);
  }

  // Define the scramble loop function with useCallback
  const startScramble = useCallback(() => {
    if (isRunningRef.current) {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    }
    isRunningRef.current = true;

    let iteration = 0;
    const maxIterations = text.length;

    const tick = () => {
      const scrambled = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < iteration) {
            return text[index];
          }
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      setDisplayText(scrambled);

      if (iteration >= maxIterations) {
        setDisplayText(text);
        isRunningRef.current = false;
      } else {
        iteration += 1 / 3; // Speed of decoding (adjust to make it smooth)
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  }, [text]);

  useEffect(() => {
    timeoutRef.current = window.setTimeout(() => {
      startScramble();
    }, delay);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [delay, startScramble]);

  const handleMouseEnter = () => {
    startScramble();
  };

  return (
    <Component 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ cursor: "default" }}
    >
      {displayText}
    </Component>
  );
}
