"use client";

import { useEffect, useRef, useState } from "react";

type UseIntersectionAnimationOptions = {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
};

type UseIntersectionAnimationReturn<T extends HTMLElement = HTMLElement> = {
  ref: React.RefObject<T | null>;
  isIntersecting: boolean;
  hasTriggered: boolean;
};

export function useIntersectionAnimation<T extends HTMLElement = HTMLElement>(
  options: UseIntersectionAnimationOptions = {}
): UseIntersectionAnimationReturn<T> {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;

  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyIntersecting = entry.isIntersecting;
        setIsIntersecting(isCurrentlyIntersecting);

        if (isCurrentlyIntersecting && !hasTriggered) {
          setHasTriggered(true);
        }

        // If triggerOnce is false, allow re-triggering
        if (!triggerOnce && !isCurrentlyIntersecting && hasTriggered) {
          setHasTriggered(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return {
    ref,
    isIntersecting,
    hasTriggered,
  };
}
