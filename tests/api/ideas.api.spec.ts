import { test, expect } from '@playwright/test';

test.describe('API: /api/ideas/bookmark & /api/ideas/progress', () => {
  test('GET /api/ideas/bookmark should return empty array for guest user without error', async ({ request }) => {
    const res = await request.get('/api/ideas/bookmark');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.bookmarkedIdeaIds).toBeDefined();
    expect(Array.isArray(body.bookmarkedIdeaIds)).toBe(true);
  });

  test('POST /api/ideas/bookmark should return 401 Unauthorized for unauthenticated requests', async ({ request }) => {
    const res = await request.post('/api/ideas/bookmark', {
      data: { ideaId: 'youtube-career' },
    });

    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body.message).toContain('Unauthorized');
  });

  test('GET /api/ideas/progress should return empty arrays for guest user without error', async ({ request }) => {
    const res = await request.get('/api/ideas/progress');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.completedTaskIds).toBeDefined();
    expect(Array.isArray(body.completedTaskIds)).toBe(true);
    expect(body.startedIdeaIds).toBeDefined();
    expect(Array.isArray(body.startedIdeaIds)).toBe(true);
  });

  test('POST /api/ideas/progress should return 401 Unauthorized for unauthenticated requests', async ({ request }) => {
    const res = await request.post('/api/ideas/progress', {
      data: {
        ideaId: 'youtube-career',
        taskId: 'some-task-id',
        completed: true,
      },
    });

    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body.message).toContain('Unauthorized');
  });
});
