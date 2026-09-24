import heroJson from "@/data/hero.json";

export type HeroCta = {
  href: string;
  label: string;
};

export type HeroClient = {
  name: string;
};

export type HeroContent = {
  intervalMs: number;
  cta: HeroCta;
  clientsLabel: string;
  clients: HeroClient[];
  titles: string[];
};

export function getHeroContent(): HeroContent {
  return heroJson;
}

export function flattenTitle(title: string) {
  return title.replace(/\n+/g, " ").trim();
}
