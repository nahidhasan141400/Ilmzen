import ctaJson from "@/data/cta.json";

export type CtaLink = {
  href: string;
  label: string;
};

export type CtaContent = {
  id: string;
  headline: string;
  body: string;
  cta: CtaLink;
};

export function getCtaContent(): CtaContent {
  return ctaJson;
}
