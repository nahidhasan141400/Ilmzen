import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { Cta } from "@/components/sections/cta";
import { getAboutContent } from "@/lib/about";
import { siteName } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = false;

export function generateMetadata(): Metadata {
  const about = getAboutContent();
  const title = about.headline.replaceAll("\n", " ");

  return {
    title: {
      absolute: `${siteName} - About`,
    },
    description: about.lead,
    openGraph: {
      title,
      description: about.lead,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: about.lead,
    },
  };
}

export default function AboutPage() {
  return (
    <>
      <About />
      <Cta />
    </>
  );
}
