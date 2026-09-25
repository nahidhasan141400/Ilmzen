import type { Metadata } from "next";
import { Cta } from "@/components/sections/cta";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Why } from "@/components/sections/why";
import { flattenTitle, getHeroContent } from "@/lib/hero";
import { siteName } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = false;

export function generateMetadata(): Metadata {
  const hero = getHeroContent();
  const primaryTitle = flattenTitle(hero.titles[0] ?? siteName);

  return {
    title: {
      absolute: `${siteName} - ${primaryTitle}`,
    },
    description: primaryTitle,
    keywords: hero.titles.map(flattenTitle),
    openGraph: {
      title: primaryTitle,
      description: primaryTitle,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: primaryTitle,
      description: primaryTitle,
    },
  };
}

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Why />
      <Cta />
    </>
  );
}
