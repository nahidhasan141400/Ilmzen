import servicesJson from "@/data/services.json";

export type ServiceCta = {
  href: string;
  label: string;
};

export type ServiceItem = {
  title: string;
  body: string;
};

export type ServicesContent = {
  id: string;
  headline: string;
  body: string;
  cta: ServiceCta;
  items: ServiceItem[];
};

export function getServicesContent(): ServicesContent {
  return servicesJson;
}
