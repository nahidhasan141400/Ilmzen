"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ServiceItem } from "@/lib/services";

type ServiceCardsProps = {
  items: ServiceItem[];
};

export function ServiceCards({ items }: ServiceCardsProps) {
  const root = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const rows = gsap.utils.toArray<HTMLElement>(".service-card-row");

      rows.forEach((row) => {
        const card = row.querySelector<HTMLElement>(".service-card");
        const depth = row.querySelector<HTMLElement>(".service-card-depth");

        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 92%",
              end: "top 58%",
              scrub: 0.7,
            },
          },
        );

        if (!depth) return;

        gsap.fromTo(
          depth,
          { yPercent: 14 },
          {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.9,
            },
          },
        );
      });

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, [items]);

  return (
    <ul ref={root}>
      {items.map((item, index) => {
        const number = String(index + 1).padStart(2, "0");

        return (
          <li
            key={item.title}
            className="service-card-row relative overflow-hidden border-b border-slate-200 px-5 py-10 last:border-b-0 sm:px-8 sm:py-12 md:px-10 md:py-14 lg:px-12 lg:py-16"
          >
            <p
              className="service-card-depth pointer-events-none absolute -right-1 top-2 hidden select-none text-[6.5rem] font-bold leading-none text-slate-950/4 will-change-transform md:block lg:text-[8rem]"
              aria-hidden="true"
            >
              {number}
            </p>
            <article className="service-card relative z-10 grid max-w-xl grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-3 sm:gap-x-6">
              <p className="pt-1.5 text-sm font-medium tracking-[0.16em] text-slate-600">
                {number}
              </p>
              <div>
                <h3 className="text-[1.65rem] font-semibold leading-[1.15] tracking-tight text-slate-950 sm:text-4xl lg:text-[2.5rem]">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600 sm:mt-5 sm:text-lg">
                  {item.body}
                </p>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
