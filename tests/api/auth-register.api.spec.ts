import { test, expect } from '@playwright/test';
import { generateTestUser } from '../helpers/test-data';

test.describe('API: /api/auth/register', () => {
  test('should successfully register a new user with valid credentials', async ({ request }) => {
    const user = generateTestUser();
    const response = await request.post('/api/auth/register', {
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.message).toBe('User created successfully');
    expect(body.user).toBeDefined();
    expect(body.user.name).toBe(user.name);
    expect(body.user.email).toBe(user.email.toLowerCase().trim());
    expect(body.user.id).toBeDefined();
    expect(body.user.password).toBeUndefined(); // Ensure sensitive data is not leaked
  });

  test('should return 409 Conflict when attempting to register an existing email', async ({ request }) => {
    const user = generateTestUser();

    // First registration
    const firstRes = await request.post('/api/auth/register', {
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    expect(firstRes.status()).toBe(201);

    // Duplicate registration attempt
    const dupRes = await request.post('/api/auth/register', {
      data: {
        name: 'Duplicate Person',
        email: user.email,
        password: 'AnotherPassword123!',
      },
    });

    expect(dupRes.status()).toBe(409);
    const body = await dupRes.json();
    expect(body.message).toContain('User with this email already exists');
  });

  test('should return 400 Bad Request when name is shorter than 2 characters', async ({ request }) => {
    const response = await request.post('/api/auth/register', {
      data: {
        name: 'A',
        email: 'valid.email@example.com',
        password: 'ValidPassword123!',
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message).toBe('Invalid input data');
  });

  test('should return 400 Bad Request when email format is invalid', async ({ request }) => {
    const response = await request.post('/api/auth/register', {
      data: {
        name: 'Valid Name',
        email: 'invalid-email-string',
        password: 'ValidPassword123!',
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message).toBe('Invalid input data');
  });

  test('should return 400 Bad Request when password is shorter than 6 characters', async ({ request }) => {
    const response = await request.post('/api/auth/register', {
      data: {
        name: 'Valid Name',
        email: 'valid.email@example.com',
        password: '123',
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message).toBe('Invalid input data');
  });

  test('should return 400 Bad Request when required fields are missing', async ({ request }) => {
    const response = await request.post('/api/auth/register', {
      data: {},
    });

    expect(response.status()).toBe(400);
  });

  test('should normalize email to lowercase and prevent duplicate case variation (REGRESSION BUG-01)', async ({ request }) => {
    const rawEmail = `CASE_${Date.now()}@Example.COM`;
    const res1 = await request.post('/api/auth/register', {
      data: {
        name: 'Case Test',
        email: rawEmail,
        password: 'ValidPassword123!',
      },
    });
    expect(res1.status()).toBe(201);
    const body1 = await res1.json();
    expect(body1.user.email).toBe(rawEmail.toLowerCase().trim());

    // Try registering the lowercase variation - should be rejected as 409 duplicate
    const res2 = await request.post('/api/auth/register', {
      data: {
        name: 'Case Test 2',
        email: rawEmail.toLowerCase(),
        password: 'ValidPassword123!',
      },
    });
    expect(res2.status()).toBe(409);
  });
});
