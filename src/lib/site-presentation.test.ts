import { describe, expect, it } from "vitest";
import { certifications, clientLogos, guideTopics, outreachStats } from "./site-presentation";
import { caseStudy } from "./case-study";

describe("Supplied Digital Wave content", () => {
  it("keeps the four supplied outreach figures", () => {
    expect(outreachStats.map((stat) => stat.value)).toEqual([100, 1000, 35, 20]);
    expect(outreachStats[0]?.unit.pt).toBe("mil");
  });
  it("uses only the two supplied tool certifications", () => {
    expect(certifications.map((cert) => cert.src)).toEqual(["/awards/clay-cert.png", "/awards/plusvibe-cert.png"]);
  });
  it("keeps client logos unpublished until supplied", () => {
    expect(clientLogos).toEqual([]);
  });
  it("keeps guide topics unpublished until supplied", () => {
    expect(guideTopics).toEqual([]);
  });
  it("keeps case-study details unpublished and uses the supplied video", () => {
    expect(caseStudy.youtubeId).toBe("wBfk9ibO37A");
    expect(caseStudy.company).toBe("");
    expect(caseStudy.sector).toEqual({ pt: "", en: "" });
    expect(caseStudy.paragraph).toEqual({ pt: "", en: "" });
    expect(caseStudy.metrics).toEqual([]);
  });
});