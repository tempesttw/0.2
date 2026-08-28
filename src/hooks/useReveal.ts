import { useEffect, useRef, useState } from "react";

export type RevealDirection = "up" | "down" | "left" | "right" | "zoom" | "none";

type UseRevealOptions = {
  threshold?: number;
  rootMargin?: string;
  direction?: RevealDirection;
  distance?: number;
};

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: UseRevealOptions
) {
  const {
    threshold = 0.15,
    rootMargin = "0px 0px -10% 0px",
    direction = "up",
    distance = 28,
  } = options ?? {};

  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  // Store direction on the element so Reveal can pick the right CSS class
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.dataset.reveal = direction;
    node.style.setProperty('--reveal-distance', `${distance}px`);
  }, [direction, distance]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, visible };
}
