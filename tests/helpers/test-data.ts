/**
 * Test data utilities for Linkora automated tests.
 */
export function generateRandomEmail(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `qa.tester_${timestamp}_${random}@linkora-test.io`;
}

export function generateTestUser() {
  const email = generateRandomEmail();
  return {
    name: 'QA Automation Engineer',
    email,
    password: 'TestPassword123!',
  };
}

export const TEST_CONSTANTS = {
  KNOWN_IDEA_SLUG: 'youtube-career',
  KNOWN_COLLECTION_SLUG: 'youtube-creator-toolkit',
  VALID_PASSWORD_MIN_LENGTH: 6,
};
