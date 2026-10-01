import { test, expect } from '@playwright/test';
import { generateTestUser } from '../helpers/test-data';

test.describe('E2E: Authentication & Authorization Flow', () => {
  test('should register a new user and redirect to dashboard', async ({ page }) => {
    const user = generateTestUser();

    await page.goto('/register');
    await expect(page).toHaveTitle(/Linkora/i);
    await expect(page.locator('h1')).toContainText('Create an account');

    // Fill form
    await page.locator('input[placeholder="John Doe"]').fill(user.name);
    await page.locator('input[type="email"]').fill(user.email);
    await page.locator('input[type="password"]').fill(user.password);

    // Submit form
    await page.locator('button[type="submit"]').click();

    // Verify redirect to dashboard or logged in state
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 15000 });
    await expect(page.locator('h1')).toContainText('Welcome back');
  });

  test('should display validation error when registering with an existing email', async ({ page, request }) => {
    const user = generateTestUser();

    // Pre-create user via API
    await request.post('/api/auth/register', {
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await page.goto('/register');
    await page.locator('input[placeholder="John Doe"]').fill('Another Name');
    await page.locator('input[type="email"]').fill(user.email);
    await page.locator('input[type="password"]').fill('Password123!');
    await page.locator('button[type="submit"]').click();

    // Error alert should appear
    const errorBox = page.locator('div:has-text("User with this email already exists")').first();
    await expect(errorBox).toBeVisible({ timeout: 10000 });
  });

  test('should log in with valid credentials and redirect to dashboard', async ({ page, request }) => {
    const user = generateTestUser();

    // Pre-create user
    await request.post('/api/auth/register', {
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await page.goto('/login');
    await expect(page.locator('h1')).toContainText('Welcome back');

    await page.locator('input[type="email"]').fill(user.email);
    await page.locator('input[type="password"]').fill(user.password);
    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL(/.*dashboard/, { timeout: 15000 });
    await expect(page.locator('h1')).toContainText(user.name);
  });

  test('should display error message when login fails with invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.locator('input[type="email"]').fill('nonexistent@example.com');
    await page.locator('input[type="password"]').fill('WrongPassword123!');
    await page.locator('button[type="submit"]').click();

    const errorAlert = page.locator('text=Invalid email or password');
    await expect(errorAlert).toBeVisible({ timeout: 10000 });
  });

  test('should redirect unauthenticated guest away from protected /dashboard to /login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/.*login/, { timeout: 10000 });
  });

  test('should redirect unauthenticated guest away from protected /settings to /login', async ({ page }) => {
    await page.goto('/settings');
    await expect(page).toHaveURL(/.*login/, { timeout: 10000 });
  });

  test('should open and submit forgot password modal from login page', async ({ page }) => {
    await page.goto('/login');

    // Click "Forgot password?"
    const forgotBtn = page.locator('button:has-text("Forgot password?")');
    await expect(forgotBtn).toBeVisible();
    await forgotBtn.click();

    // Verify modal appears
    await expect(page.locator('h2:has-text("Reset password")')).toBeVisible();

    // Fill email
    await page.locator('input[placeholder="you@example.com"]').last().fill('recovery.test@example.com');
    await page.locator('button:has-text("Send Link")').click();

    // Verify success confirmation in modal
    await expect(page.locator('text=/Email dispatched!|Reset link generated!/')).toBeVisible({ timeout: 10000 });
  });
});
