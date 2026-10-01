import { test, expect } from '@playwright/test';

test.describe('E2E: Explore Directory & Resource Discovery', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/explore');
  });

  test('should display directory header and list of resources', async ({ page }) => {
    await expect(page).toHaveTitle(/Explore | Linkora/i);
    await expect(page.locator('h1')).toContainText('Directory');

    // Should display search input
    const searchInput = page.locator('input[placeholder="Search links..."]');
    await expect(searchInput).toBeVisible();

    // Should display categories in sidebar
    const allLinksBtn = page.locator('button:has-text("All Links")');
    await expect(allLinksBtn).toBeVisible();
  });

  test('should filter resources dynamically when user types in search bar', async ({ page }) => {
    const searchInput = page.locator('input[placeholder="Search links..."]');
    
    // Type a specific term
    await searchInput.fill('ChatGPT');

    // Wait for filtered result cards
    const results = page.locator('main a[href^="/resource/"]');
    const count = await results.count();
    expect(count).toBeGreaterThan(0);

    // Each matching card should contain the query in title or description
    const firstTitle = await results.first().locator('h4').textContent();
    expect(firstTitle?.toLowerCase()).toContain('chatgpt');
  });

  test('should display empty state when search query matches no resources', async ({ page }) => {
    const searchInput = page.locator('input[placeholder="Search links..."]');
    await searchInput.fill('xyz_non_existent_tool_query_99999');

    // Empty state should be visible
    const emptyState = page.locator('text=No resources found for your query');
    await expect(emptyState).toBeVisible({ timeout: 5000 });
  });

  test('should toggle between grid and list views', async ({ page }) => {
    const listViewBtn = page.locator('button[title="List View"]');
    const gridViewBtn = page.locator('button[title="Grid View"]');

    // Switch to list view
    await listViewBtn.click();
    // Verify list view container is active
    const listCards = page.locator('main a[href^="/resource/"] > div');
    await expect(listCards.first()).toBeVisible();

    // Switch back to grid view
    await gridViewBtn.click();
    const gridCards = page.locator('main a[href^="/resource/"] > div');
    await expect(gridCards.first()).toBeVisible();
  });

  test('should navigate to resource detail page when clicking a card', async ({ page }) => {
    const firstResource = page.locator('main a[href^="/resource/"]').first();
    await expect(firstResource).toBeVisible();

    const expectedTitle = await firstResource.locator('h4').textContent();
    await Promise.all([
      page.waitForURL(/.*\/resource\/.+/, { timeout: 15000 }),
      firstResource.locator('h4').click(),
    ]);

    await expect(page.locator('h1')).toContainText(expectedTitle?.trim() || '');
    await expect(page.locator('text=Visit Website')).toBeVisible();
    await expect(page.locator('text=Back to Explore')).toBeVisible();
  });
});
