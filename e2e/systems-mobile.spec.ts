import { test, expect } from "@playwright/test";

test.describe("mobile section navigation", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "Touch nav runs on mobile project");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
  });

  test("opens bottom sheet and closes on section select", async ({ page }) => {
    await page.getByRole("button", { name: /Sections/i }).click();
    const dialog = page.getByRole("dialog", { name: "Section navigation" });
    await expect(dialog).toBeVisible();

    await dialog.getByRole("button", { name: /Experience/i }).click();
    await expect(dialog).not.toBeVisible();

    await expect(page.locator("#experience")).toBeInViewport();
    await expect(page.getByTestId("mobile-section-bar")).toContainText("Experience");
  });

  test("scroll-spy updates bottom bar while scrolling", async ({ page }) => {
    await page.locator("#skills").scrollIntoViewIfNeeded();
    await expect(page.getByTestId("mobile-section-bar")).toContainText("Skills", {
      timeout: 5000,
    });

    await page.locator("#experience").scrollIntoViewIfNeeded();
    await expect(page.getByTestId("mobile-section-bar")).toContainText("Experience", {
      timeout: 5000,
    });
  });

  test("closes sheet via backdrop tap", async ({ page }) => {
    await page.getByRole("button", { name: /Sections/i }).click();
    await expect(page.getByRole("dialog", { name: "Section navigation" })).toBeVisible();

    await page.getByRole("button", { name: "Close section navigation" }).click({
      position: { x: 10, y: 10 },
    });
    await expect(page.getByRole("dialog", { name: "Section navigation" })).not.toBeVisible();
  });

  test("returns focus to trigger after closing sheet", async ({ page }) => {
    const trigger = page.getByRole("button", { name: /Sections/i });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "Section navigation" });
    await dialog.getByRole("button", { name: /III\. Experience/i }).click();
    await expect(trigger).toBeFocused();
  });
});
