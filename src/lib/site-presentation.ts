import type { Lang } from "./content";

// Publish only assets and details explicitly supplied for these sections.
export const clientLogos: { src: string; name: string }[] = [];
export const guideTopics: { title: Record<Lang, string>; description: Record<Lang, string> }[] = [];
export const certifications = [
  { src: "/awards/clay-cert.png", alt: "Clay University Automated Outbound Certification" },
  { src: "/awards/plusvibe-cert.png", alt: "PlusVibe Certified Agency Partner" },
];
export const outreachStats = [
  { value: 100, unit: { pt: "mil", en: "k" } },
  { value: 1000, unit: { pt: "", en: "" } },
  { value: 35, unit: { pt: "", en: "" } },
  { value: 20, unit: { pt: "", en: "" } },
];