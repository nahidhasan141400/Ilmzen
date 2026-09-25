"use client";

import { useEffect, useState } from "react";

type HeroTitleProps = {
  titles: string[];
  intervalMs: number;
};

export function HeroTitle({ titles, intervalMs }: HeroTitleProps) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [offscreen, setOffscreen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [root, setRoot] = useState<HTMLDivElement | null>(null);

  const canRotate = titles.length > 1 && !reduceMotion;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    setAnimated(true);
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOffscreen(!entry.isIntersecting),
      { threshold: 0.35 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [root]);

  useEffect(() => {
    if (!canRotate || offscreen) return;

    const timer = window.setInterval(() => {
      setIndex((current) => {
        setLeaving(current);
        return (current + 1) % titles.length;
      });
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [canRotate, offscreen, intervalMs, titles.length]);

  useEffect(() => {
    if (leaving === null) return;
    const timer = window.setTimeout(() => setLeaving(null), 780);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  if (titles.length === 0) return null;

  return (
    <div ref={setRoot} className="max-w-4xl">
      <h1
        className={`hero-title text-[2.15rem] font-bold leading-[1.12] tracking-tight text-charcoal sm:text-6xl lg:text-[4.35rem] ${
          animated && canRotate ? "is-animated" : ""
        }`}
      >
        {titles.map((title, titleIndex) => {
          const isCurrent = titleIndex === index;
          const isLeaving = titleIndex === leaving;
          const lines = title.split("\n");
          let wordIndex = 0;

          return (
            <span
              key={title}
              className={`hero-title-item ${isCurrent ? "is-current" : ""} ${
                isLeaving ? "is-leaving" : ""
              }`}
              aria-hidden={!isCurrent}
            >
              {lines.map((line) => {
                const words = line.split(/\s+/).filter(Boolean);

                return (
                  <span key={`${title}-${line}`} className="hero-line">
                    {words.map((word) => {
                      const indexForWord = wordIndex;
                      wordIndex += 1;

                      return (
                        <span
                          key={`${title}-${indexForWord}`}
                          className="hero-word"
                          style={{ ["--i" as string]: indexForWord }}
                        >
                          {word}
                        </span>
                      );
                    })}
                  </span>
                );
              })}
            </span>
          );
        })}
      </h1>
    </div>
  );
}
