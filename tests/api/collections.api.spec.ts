import { test, expect } from '@playwright/test';

test.describe('API: /api/collections', () => {
  test('should return 401 Unauthorized when POST /api/collections is called without session', async ({ request }) => {
    const res = await request.post('/api/collections', {
      data: { title: 'My QA Collection' },
    });

    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body.message).toContain('Unauthorized');
  });
});
