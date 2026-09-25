"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getWhyContent } from "@/lib/why";

export function Why() {
  const content = getWhyContent();
  const leadLines = content.lead.split("\n").filter(Boolean);
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const card = root.current;
      if (!card) return;

      gsap.fromTo(
        ".why-photo",
        { scale: 1.16, yPercent: 6 },
        {
          scale: 1,
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.6,
          },
        },
      );

      gsap.from(".why-reveal", {
        y: 56,
        opacity: 0,
        duration: 1.35,
        stagger: 0.18,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 62%",
          once: true,
        },
      });

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={content.id}
      aria-labelledby="why-heading"
      className="scroll-mt-20 bg-white"
    >
      <div className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div
          ref={root}
          className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-cool bg-white text-charcoal sm:rounded-[2.25rem] lg:rounded-[2.75rem]"
        >
          <Image
            src="/images/why-bg.jpg"
            alt=""
            fill
            sizes="(min-width: 80rem) 80rem, 100vw"
            className="why-photo object-cover object-[72%_42%] will-change-transform"
          />
          <div
            className="absolute inset-0 bg-linear-to-r from-white/94 via-white/88 to-white/78"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-white/95 via-white/80 to-transparent"
            aria-hidden="true"
          />

          <div className="relative z-10 px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
            <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20">
              <div className="why-reveal max-w-xl">
                <h2
                  id="why-heading"
                  className="text-[2.15rem] font-bold leading-[1.08] tracking-tight text-charcoal sm:text-5xl lg:text-6xl"
                >
                  {content.headline}
                </h2>
                <p className="mt-6 text-xl font-medium leading-snug tracking-tight text-charcoal sm:text-2xl lg:text-[1.75rem] lg:leading-[1.2]">
                  {leadLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>

              <div className="why-reveal max-w-lg space-y-5 lg:pt-2">
                {content.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-relaxed text-charcoal/65 sm:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
                <p className="text-base font-medium leading-relaxed text-charcoal sm:text-lg">
                  {content.closing}
                </p>
              </div>
            </div>

            <ul className="mt-16 border-t border-cool sm:mt-20 lg:mt-28 lg:grid lg:grid-cols-3">
              {content.benefits.map((benefit, index) => {
                const number = String(index + 1).padStart(2, "0");

                return (
                  <li
                    key={benefit.title}
                    className="why-reveal border-b border-cool py-8 last:border-b-0 lg:border-b-0 lg:border-l lg:py-10 lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
                  >
                    <p className="text-sm font-medium tracking-[0.16em] text-charcoal/65">
                      {number}
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-charcoal sm:text-[1.75rem]">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-base leading-relaxed text-charcoal/65">
                      {benefit.body}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
