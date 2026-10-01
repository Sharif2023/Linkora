import { test, expect } from '@playwright/test';

test.describe('E2E: Curated Collections Feature', () => {
  test('should display Curated Collections directory page', async ({ page }) => {
    await page.goto('/collections');

    await expect(page).toHaveTitle(/Collections | Linkora/i);
    await expect(page.locator('h1')).toContainText('Collections');

    // Should display collection cards
    const cards = page.locator('a[href^="/collections/"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should open collection detail page and display associated blueprints and tools', async ({ page }) => {
    await page.goto('/collections/creator-economy');

    // Verify header title
    await expect(page.locator('h1')).toContainText('The Creator Economy');

    // Verify sections
    await expect(page.locator('text=Recommended Implementation Blueprints')).toBeVisible();
    await expect(page.locator('text=Core Tools in this Collection')).toBeVisible();
    await expect(page.locator('text=Related Collections')).toBeVisible();
  });
});
