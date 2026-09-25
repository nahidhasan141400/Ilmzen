"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getProjectsContent } from "@/lib/projects";

const tileSpans = ["md:col-span-7", "md:col-span-5", "md:col-span-12"];
const frameHeights = ["md:h-[30rem]", "md:h-[30rem]", ""];

export function Projects() {
  const content = getProjectsContent();
  const lines = content.headline.split("\n").filter(Boolean);
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.utils.toArray<HTMLElement>(".project-tile").forEach((tile) => {
        gsap.from(tile, {
          y: 32,
          opacity: 0,
          duration: 1.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: tile,
            start: "top 86%",
            once: true,
          },
        });
      });

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id={content.id}
      aria-labelledby="projects-heading"
      className="scroll-mt-20 bg-white text-charcoal"
    >
      <div className="flex flex-col gap-6 px-5 pt-16 sm:px-8 sm:pt-20 md:flex-row md:items-end md:justify-between lg:px-10 lg:pt-24">
        <h2
          id="projects-heading"
          className="text-[2.15rem] font-bold leading-[1.08] tracking-tight sm:text-6xl"
        >
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className="max-w-sm text-base leading-relaxed text-charcoal/65 sm:text-lg">
          {content.body}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 items-stretch gap-10 px-5 pb-6 sm:px-8 md:grid-cols-12 md:gap-6 lg:px-10">
        {content.items.map((project, index) => (
          <article
            key={project.title}
            className={`project-tile border-b border-cool pb-10 last:border-b-0 last:pb-0 md:border-b-0 md:pb-0 ${tileSpans[index] ?? "md:col-span-6"} ${index === 2 ? "md:mt-4 md:border-t md:border-cool md:pt-6" : ""}`}
          >
            <div className="relative h-full">
              <div
                className={`overflow-hidden rounded-[1.75rem] bg-white sm:rounded-[2rem] ${frameHeights[index] ?? ""}`}
              >
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  width={2752}
                  height={1536}
                  sizes={
                    index === 2
                      ? "100vw"
                      : index === 0
                        ? "(min-width: 768px) 58vw, 100vw"
                        : "(min-width: 768px) 42vw, 100vw"
                  }
                  className={`h-auto w-full ${index < 2 ? "md:h-full md:object-contain md:object-top" : ""}`}
                />
              </div>
              <div className="max-w-xl px-1 pt-5 md:absolute md:bottom-4 md:left-4 md:z-10 md:max-w-sm md:rounded-2xl md:border md:border-cool md:bg-white/80 md:p-5 md:pt-5 md:backdrop-blur-md">
                <div className="space-y-2">
                  <p className="text-xs font-medium tracking-[0.16em] text-charcoal/65 uppercase">
                    {project.category}
                  </p>
                  <h3 className="text-2xl font-semibold tracking-tight text-charcoal sm:text-3xl md:text-xl">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-charcoal/65 sm:text-base md:text-sm">
                    {project.body}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
