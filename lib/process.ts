import processJson from "@/data/process.json";

export type ProcessStep = {
  title: string;
  body: string;
};

export type ProcessContent = {
  id: string;
  headline: string;
  body: string;
  steps: ProcessStep[];
};

export function getProcessContent(): ProcessContent {
  return processJson;
}
