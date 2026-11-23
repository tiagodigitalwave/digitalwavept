import type { Lang } from "./content";

// Leave unpublished details empty until the real values are supplied.
export const caseStudy = {
  youtubeId: "wBfk9ibO37A",
  company: "",
  sector: { pt: "", en: "" } satisfies Record<Lang, string>,
  linkedin: "",
  paragraph: { pt: "", en: "" } satisfies Record<Lang, string>,
  metrics: [] as { value: string; label: Record<Lang, string> }[],
};