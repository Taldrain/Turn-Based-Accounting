import { vi } from 'vitest';

vi.stubEnv('JWT_SECRET', 'foo');
function importJwtServer() {
  return import('./jwt.server');
}

test('signLoginToken returns a token encrypted', async () => {
  const { signLoginToken } = await importJwtServer();
  expect(signLoginToken('foo@example.com', '/bar')).toMatch(/[a-zA-Z0-9.]+/);
});

test('verifyLoginToken returns a token', async () => {
  const { verifyLoginToken, signLoginToken } = await importJwtServer();
  const token = verifyLoginToken(signLoginToken('foo@example.com', '/bar'));

  expect(token.email).toBe('foo@example.com');
  expect(token.redirectTo).toBe('/bar');
});
