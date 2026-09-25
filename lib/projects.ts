import projectsJson from "@/data/projects.json";

export type ProjectItem = {
  title: string;
  category: string;
  body: string;
  image: string;
  imageAlt: string;
};

export type ProjectsContent = {
  id: string;
  headline: string;
  body: string;
  items: ProjectItem[];
};

export function getProjectsContent(): ProjectsContent {
  return projectsJson;
}
