import { test, expect } from "@playwright/test";

test.describe("portfolio", () => {
  test("landing page renders differentiated sections and real content", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Systems thinking/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /^Experience$/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /^Projects$/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /^Skills$/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Lead Data Engineer/i })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Privacy Regulation GraphRAG System/i }),
    ).toBeVisible();
  });

  test("links to the UC Berkeley profile", async ({ page }) => {
    await page.goto("/");
    const profileLink = page.getByRole("link", { name: /UC Berkeley/i }).first();
    await expect(profileLink).toHaveAttribute(
      "href",
      "https://www.ischool.berkeley.edu/people/pamela-quartson",
    );
  });

  test("resume download link points to a real PDF", async ({ page }) => {
    await page.goto("/");
    const cvLink = page.getByRole("link", { name: /Download CV/i }).first();
    await expect(cvLink).toHaveAttribute("href", "/resumes/generalist.pdf");
  });

  test("404 for unknown routes", async ({ page }) => {
    await page.goto("/nonexistent");
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  });
});

test.describe("responsive layout", () => {
  test("mobile viewport has no horizontal overflow on landing", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto("/");
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(overflow).toBe(false);
  });
});
