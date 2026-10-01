import { test, expect } from '@playwright/test';

test.describe('API: /api/profile & /api/profile/password', () => {
  test('PUT /api/profile should return 401 Unauthorized without session', async ({ request }) => {
    const res = await request.put('/api/profile', {
      data: { name: 'New Name' },
    });

    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body.message).toContain('Unauthorized');
  });

  test('PUT /api/profile/password should return 401 Unauthorized without session', async ({ request }) => {
    const res = await request.put('/api/profile/password', {
      data: {
        currentPassword: 'OldPassword123!',
        newPassword: 'NewPassword123!',
      },
    });

    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body.message).toContain('Unauthorized');
  });
});
