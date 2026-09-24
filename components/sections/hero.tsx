import Image from "next/image";
import { HeroLogos } from "@/components/sections/hero-logos";
import { HeroMedia } from "@/components/sections/hero-media";
import { HeroTitle } from "@/components/sections/hero-title";
import { getHeroContent } from "@/lib/hero";

export function Hero() {
  const hero = getHeroContent();

  return (
    <section className="relative isolate min-h-dvh overflow-hidden rounded-b-[2.25rem] bg-[#d7e2f4] text-slate-950 sm:rounded-b-[3rem] lg:rounded-b-[4rem]">
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />
      <HeroMedia />
      <div
        className="absolute inset-0 bg-linear-to-r from-[#e7eef8]/85 via-[#e7eef8]/45 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-linear-to-t from-[#d7e2f4]/50 via-transparent to-black/5"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-dvh w-full items-end px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-10 lg:pb-24">
        <div className="w-full max-w-5xl">
          <HeroTitle
            titles={hero.titles}
            intervalMs={hero.intervalMs}
          />
          <HeroLogos label={hero.clientsLabel} clients={hero.clients} />
        </div>
      </div>
    </section>
  );
}
