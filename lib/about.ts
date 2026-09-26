import aboutJson from "@/data/about.json";

export type AboutImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type AboutContent = {
  id: string;
  eyebrow: string;
  headline: string;
  lead: string;
  paragraphs: string[];
  images: AboutImage[];
};

export function getAboutContent(): AboutContent {
  return aboutJson;
}
