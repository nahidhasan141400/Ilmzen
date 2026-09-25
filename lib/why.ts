import whyJson from "@/data/why.json";

export type WhyBenefit = {
  title: string;
  body: string;
};

export type WhyContent = {
  id: string;
  headline: string;
  lead: string;
  paragraphs: string[];
  closing: string;
  benefits: WhyBenefit[];
};

export function getWhyContent(): WhyContent {
  return whyJson;
}
