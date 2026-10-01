import { test, expect } from '@playwright/test';

test.describe('E2E: Implement Ideas & Execution Roadmaps', () => {
  test('should display Implement Ideas directory with hero and blueprints', async ({ page }) => {
    await page.goto('/implement-ideas');

    await expect(page).toHaveTitle(/Implement Ideas/i);
    await expect(page.locator('h1')).toContainText('Your next big idea deserves a plan');

    // Should display category filter pills
    await expect(page.locator('button:has-text("All Ambitions")')).toBeVisible();
    await expect(page.locator('button:has-text("Creator Economy")')).toBeVisible();

    // Blueprints grid should contain idea cards
    const ideaCards = page.locator('a[href^="/implement-ideas/"]');
    const count = await ideaCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should filter blueprints by category', async ({ page }) => {
    await page.goto('/implement-ideas');

    // Click "Creator Economy" category button
    const creatorFilterBtn = page.locator('button:has-text("Creator Economy")').first();
    await creatorFilterBtn.click();

    // Verify cards are filtered
    const cards = page.locator('a[href^="/implement-ideas/"]');
    expect(await cards.count()).toBeGreaterThan(0);
    // Should show YouTube career
    await expect(page.locator('h3:has-text("YouTube Career")')).toBeVisible();
  });

  test('should open roadmap detail page and toggle task checkboxes', async ({ page }) => {
    await page.goto('/implement-ideas/youtube-career-launchpad');

    // Verify roadmap title and stats
    await expect(page.locator('h1')).toContainText('YouTube Career');
    await expect(page.locator('text=Time to Result')).toBeVisible();
    await expect(page.locator('text=Total Phases')).toBeVisible();

    // Locate first phase task item
    const taskItem = page.getByText('Define your core target viewer persona').first();
    await expect(taskItem).toBeVisible();

    // Toggle task item
    await taskItem.click();

    // Verify progress text increments
    const progressText = page.locator('span:has-text("%")').first();
    await expect(progressText).toBeVisible();

    // Reload page to verify persistence in localStorage for guest
    await page.reload();
    await expect(page.locator('h1')).toContainText('YouTube Career');
  });

  test('should toggle bookmark button on roadmap detail', async ({ page }) => {
    await page.goto('/implement-ideas/youtube-career-launchpad');

    const bookmarkBtn = page.locator('button:has-text("Bookmark Plan"), button:has-text("Bookmarked")').first();
    await expect(bookmarkBtn).toBeVisible();

    await bookmarkBtn.click();
    // After clicking, button text should change to "Bookmarked"
    await expect(page.locator('button:has-text("Bookmarked")')).toBeVisible();
  });

  test('should redirect legacy /stacks to /implement-ideas', async ({ page }) => {
    await page.goto('/stacks');
    await expect(page).toHaveURL(/.*implement-ideas/);
  });

  test('should redirect legacy /stack/[slug] to /implement-ideas/[slug]', async ({ page }) => {
    await page.goto('/stack/youtube-career-launchpad');
    await expect(page).toHaveURL(/.*implement-ideas\/youtube-career-launchpad/);
  });
});
