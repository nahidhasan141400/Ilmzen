"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getProcessContent } from "@/lib/process";

export function Process() {
  const content = getProcessContent();
  const lines = content.headline.split("\n").filter(Boolean);
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.from(".process-reveal", {
        y: 40,
        opacity: 0,
        duration: 1.15,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 72%",
          once: true,
        },
      });

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id={content.id}
      aria-labelledby="process-heading"
      className="scroll-mt-20 border-t border-cool bg-white text-charcoal"
    >
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
        <div className="grid items-end gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-16">
          <h2
            id="process-heading"
            className="process-reveal text-[2.15rem] font-bold leading-[1.08] tracking-tight text-charcoal sm:text-6xl lg:text-7xl"
          >
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="process-reveal max-w-sm text-base leading-relaxed text-charcoal/65 sm:text-lg md:pb-2">
            {content.body}
          </p>
        </div>

        <ol className="mt-16 border-t border-cool sm:mt-20 lg:mt-24 lg:grid lg:grid-cols-4">
          {content.steps.map((step, index) => {
            const number = String(index + 1).padStart(2, "0");

            return (
              <li
                key={step.title}
                className="process-reveal border-b border-cool py-8 last:border-b-0 lg:border-b-0 lg:border-l lg:py-10 lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
              >
                <p className="text-sm font-medium tracking-[0.16em] text-charcoal/65">
                  {number}
                </p>
                <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-charcoal">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs text-base leading-relaxed text-charcoal/65">
                  {step.body}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
