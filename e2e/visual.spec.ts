import { test, expect } from "@playwright/test";

const DEVICES = [
  { name: "mobile-360", width: 360, height: 800 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1440", width: 1440, height: 900 },
] as const;

test.describe("visual regression baselines", () => {
  test.beforeEach(({ }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "Visual baselines run once");
  });

  for (const device of DEVICES) {
    test(`systems journey ${device.name}`, async ({ page }) => {
      await page.setViewportSize({ width: device.width, height: device.height });
      await page.goto("/");
      await page.waitForLoadState("networkidle");
      await expect(page.getByRole("heading", { name: /Systems thinking/i })).toBeVisible();

      await expect(page).toHaveScreenshot(`systems-journey-${device.name}.png`, {
        fullPage: true,
      });
    });
  }

  for (const device of DEVICES.filter((d) => d.width < 768)) {
    test(`section sheet open ${device.name}`, async ({ page }) => {
      await page.setViewportSize({ width: device.width, height: device.height });
      await page.goto("/");
      await page.getByRole("button", { name: /Sections/i }).click();
      await expect(page.getByRole("dialog", { name: "Section navigation" })).toBeVisible();

      await expect(page).toHaveScreenshot(`section-sheet-${device.name}.png`);
    });
  }
});
