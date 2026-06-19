import { describe, it, expect } from "vitest";
import {
  contact,
  education,
  experience,
  getNarrative,
  getProject,
  missingExternalLinks,
  narratives,
  profile,
  projects,
  skillGroups,
} from "@/data/portfolio";

describe("portfolio data integrity", () => {
  it("separates experience, projects, and skills", () => {
    expect(experience.length).toBeGreaterThanOrEqual(5);
    expect(projects).toHaveLength(4);
    expect(skillGroups.length).toBeGreaterThanOrEqual(4);
    expect(education).toHaveLength(2);
  });

  it("every experience role has required fields", () => {
    for (const role of experience) {
      expect(role.role).toBeTruthy();
      expect(role.org).toBeTruthy();
      expect(role.start).toBeTruthy();
      expect(role.end).toBeTruthy();
      expect(role.bullets.length).toBeGreaterThan(0);
      expect(role.stack.length).toBeGreaterThan(0);
    }
  });

  it("every project has required fields", () => {
    for (const project of projects) {
      expect(project.name).toBeTruthy();
      expect(project.summary).toBeTruthy();
      expect(project.bullets.length).toBeGreaterThan(0);
      expect(project.metrics.length).toBeGreaterThan(0);
      expect(project.tech.length).toBeGreaterThan(0);
    }
  });

  it("uses real contact info and the UC Berkeley profile", () => {
    expect(contact.email).toBe("pamela.quartson@berkeley.edu");
    expect(contact.berkeleyProfile).toBe(
      "https://www.ischool.berkeley.edu/people/pamela-quartson",
    );
    expect(contact.github).toBe("https://github.com/pam-quartson");
    expect(profile.name).toBe("Pamela Quartson");
    expect(JSON.stringify(profile)).not.toContain("pamela@example.com");
  });

  it("links every project to its GitHub repo", () => {
    for (const project of projects) {
      expect(project.links.github).toMatch(/^https:\/\/github\.com\/pam-quartson\//);
    }
  });

  it("has no em dashes or en dashes in user-facing copy", () => {
    const copy = JSON.stringify({ profile, experience, projects, skillGroups, education });
    expect(copy).not.toContain("—"); // em dash
    expect(copy).not.toContain("–"); // en dash
  });

  it("keeps the single Systems Journey narrative with a resume path", () => {
    expect(narratives).toHaveLength(1);
    expect(getNarrative("systems").title).toBe("Systems Journey");
    expect(narratives[0]!.resumePath).toMatch(/^\/resumes\/.+\.pdf$/);
  });

  it("getProject resolves known ids", () => {
    expect(getProject("graphrag").name).toContain("GraphRAG");
    expect(getProject("satellite-disaster").name).toContain("Satellite");
  });

  it("surfaces missing external links without using href=#", () => {
    const missing = missingExternalLinks();
    expect(Array.isArray(missing)).toBe(true);
    for (const key of missing) {
      expect(key).not.toBe("#");
    }
  });

  it("preserves documented metrics from the CVs", () => {
    const allMetrics = [
      ...experience.flatMap((r) => (r.metrics ?? []).map((m) => m.value)),
      ...projects.flatMap((p) => p.metrics.map((m) => m.value)),
    ];
    expect(allMetrics).toContain("2,100+");
    expect(allMetrics).toContain("80%");
    expect(allMetrics).toContain("30%");
    expect(allMetrics).toContain("10K+");
    expect(allMetrics).toContain("+21%");
  });
});
