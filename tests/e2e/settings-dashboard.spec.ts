import { test, expect } from '@playwright/test';
import { generateTestUser } from '../helpers/test-data';

test.describe('E2E: Settings & Dashboard Flow', () => {
  test('authenticated user can view dashboard, navigate to settings, and update profile name', async ({ page, request }) => {
    const user = generateTestUser();

    // 1. Create user via API
    await request.post('/api/auth/register', {
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    // 2. Log in
    await page.goto('/login');
    await page.locator('input[type="email"]').fill(user.email);
    await page.locator('input[type="password"]').fill(user.password);
    await page.locator('button[type="submit"]').click();

    // 3. Confirm on dashboard
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 15000 });
    await expect(page.locator('h1')).toContainText(user.name);

    // 4. Navigate to Settings via sidebar
    await page.locator('aside a[href="/settings"]').click();
    await expect(page).toHaveURL(/.*settings/);
    await expect(page.locator('h1')).toContainText('Settings & Profile');

    // 5. Update Full Name in ProfileForm
    const nameInput = page.locator('input[type="text"]').first();
    await expect(nameInput).toHaveValue(user.name);

    const updatedName = `${user.name} Senior`;
    await nameInput.fill(updatedName);

    const saveChangesBtn = page.locator('button:has-text("Save Changes")');
    await expect(saveChangesBtn).toBeEnabled();
    await saveChangesBtn.click();

    // Verify success banner appears
    await expect(page.locator('text=Profile updated successfully!')).toBeVisible({ timeout: 10000 });
  });

  test('authenticated user dashboard displays Active Roadmaps tab with navigation', async ({ page, request }) => {
    const user = generateTestUser();

    // Pre-create user
    await request.post('/api/auth/register', {
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    // Log in
    await page.goto('/login');
    await page.locator('input[type="email"]').fill(user.email);
    await page.locator('input[type="password"]').fill(user.password);
    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL(/.*dashboard/, { timeout: 15000 });

    // Click Active Roadmaps in sidebar
    await page.locator('aside a[href="/dashboard/roadmaps"]').click();
    await expect(page).toHaveURL(/.*dashboard\/roadmaps/);
    await expect(page.locator('h1')).toContainText('Active Implementation Plans');
  });
});
