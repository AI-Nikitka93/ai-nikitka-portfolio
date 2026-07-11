"use client";

import React, { ReactNode, useEffect, useState, useRef } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let fallbackTimer: number;
    let reducedMotionTimer: number;

    if (isReducedMotion) {
      reducedMotionTimer = window.setTimeout(() => {
        setIsVisible(true);
      }, 0);
    } else {
      fallbackTimer = window.setTimeout(() => {
        setIsVisible(true);
      }, 600);
    }

    // 3. Intersection Observer (only if not reduced motion)
    let observer: IntersectionObserver | null = null;
    const currentRef = domRef.current;

    if (!isReducedMotion) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              if (fallbackTimer) window.clearTimeout(fallbackTimer);
              observer?.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.02,
          rootMargin: "0px 0px -20px 0px",
        }
      );

      if (currentRef) {
        observer.observe(currentRef);
      }
    }

    return () => {
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      if (reducedMotionTimer) window.clearTimeout(reducedMotionTimer);
      if (observer && currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`${className} transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : "translateY(12px)", // Smaller offset for smoother feel
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
