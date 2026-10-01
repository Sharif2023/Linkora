import { test, expect } from '@playwright/test';
import { generateTestUser } from '../helpers/test-data';

test.describe('API: /api/auth/forgot-password & reset-password', () => {
  test('should accept valid email and return 200 without email enumeration', async ({ request }) => {
    // Non-existent email should still return 200 success for privacy/enumeration safety
    const res = await request.post('/api/auth/forgot-password', {
      data: { email: 'nonexistent.user.testing@example.com' },
    });

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.message).toContain('password reset instructions');
  });

  test('should return 400 Bad Request for malformed email on forgot-password', async ({ request }) => {
    const res = await request.post('/api/auth/forgot-password', {
      data: { email: 'not-an-email' },
    });

    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.message).toBeDefined();
  });

  test('should return 400 when reset-password is submitted with invalid/fake token', async ({ request }) => {
    const res = await request.post('/api/auth/reset-password', {
      data: {
        email: 'test@example.com',
        token: 'invalid-fake-token-1234567890',
        password: 'NewSecurePassword123!',
      },
    });

    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.message).toContain('Invalid or expired password reset token');
  });

  test('should return 400 when reset-password password is shorter than 6 characters', async ({ request }) => {
    const res = await request.post('/api/auth/reset-password', {
      data: {
        email: 'test@example.com',
        token: 'some-token-string-12345',
        password: 'short',
      },
    });

    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.message).toContain('at least 6 characters');
  });

  test('should successfully complete full forgot -> reset flow for registered user in local dev', async ({ request }) => {
    const user = generateTestUser();
    // 1. Register user
    const regRes = await request.post('/api/auth/register', {
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    expect(regRes.status()).toBe(201);

    // 2. Request reset
    const forgotRes = await request.post('/api/auth/forgot-password', {
      data: { email: user.email },
    });
    expect(forgotRes.status()).toBe(200);
    const forgotBody = await forgotRes.json();
    expect(forgotBody.success).toBe(true);

    // If local dev returns devResetUrl, extract token and test reset-password
    if (forgotBody.devResetUrl) {
      const url = new URL(forgotBody.devResetUrl);
      const token = url.searchParams.get('token');
      expect(token).toBeTruthy();

      const newPassword = 'BrandNewPassword999!';
      const resetRes = await request.post('/api/auth/reset-password', {
        data: {
          email: user.email,
          token,
          password: newPassword,
        },
      });

      expect(resetRes.status()).toBe(200);
      const resetBody = await resetRes.json();
      expect(resetBody.success).toBe(true);
    }
  });
});
