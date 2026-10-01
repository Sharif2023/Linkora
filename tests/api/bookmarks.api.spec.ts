import { test, expect } from '@playwright/test';

test.describe('API: /api/bookmarks', () => {
  test('should return 401 Unauthorized when POST /api/bookmarks is called without authentication', async ({ request }) => {
    const res = await request.post('/api/bookmarks', {
      data: { resourceId: 'test-resource-id' },
    });

    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body.message).toContain('Unauthorized');
  });

  test('should return 401 Unauthorized when DELETE /api/bookmarks/[id] is called without authentication', async ({ request }) => {
    const res = await request.delete('/api/bookmarks/some-saved-item-id');

    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body.message).toContain('Unauthorized');
  });
});
