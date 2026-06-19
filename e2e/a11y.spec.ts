import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const ROUTES = ["/"] as const;

const VIEWPORTS = [
  { name: "mobile-360", width: 360, height: 800 },
  { name: "mobile-390", width: 390, height: 844 },
] as const;

test.describe("axe accessibility", () => {
  test.beforeEach(({ }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "Axe runs once on mobile project");
  });

  for (const route of ROUTES) {
    for (const viewport of VIEWPORTS) {
      test(`${route} at ${viewport.name} has no serious violations`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(route);

        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          .analyze();

        const serious = results.violations.filter(
          (v) => v.impact === "serious" || v.impact === "critical",
        );
        expect(serious, formatViolations(serious)).toEqual([]);
      });
    }
  }
});

test.describe("mobile focus order with section sheet", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "Focus tests run once on mobile project");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
  });

  test("sheet items are keyboard reachable in order", async ({ page }) => {
    await page.getByRole("button", { name: /Sections/i }).click();
    const dialog = page.getByRole("dialog", { name: "Section navigation" });

    await expect(dialog).toBeVisible();
    await page.keyboard.press("Tab");

    const focusedInDialog = await page.evaluate(() => {
      const dialogEl = document.querySelector('[role="dialog"]');
      return dialogEl?.contains(document.activeElement) ?? false;
    });
    expect(focusedInDialog).toBe(true);
  });

  test("escape closes sheet and restores page interactivity", async ({ page }) => {
    await page.getByRole("button", { name: /Sections/i }).click();
    await expect(page.getByRole("dialog", { name: "Section navigation" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Section navigation" })).not.toBeVisible();
    await expect(page.getByRole("button", { name: /Sections/i })).toBeVisible();
  });
});

function formatViolations(
  violations: { id: string; impact?: string; nodes: { target: string[] }[] }[],
): string {
  if (violations.length === 0) return "";
  return violations
    .map(
      (v) =>
        `[${v.impact}] ${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`,
    )
    .join("\n");
}
