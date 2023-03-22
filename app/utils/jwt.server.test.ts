import { vi } from 'vitest';

vi.stubEnv('JWT_SECRET', 'foo');

// eslint-disable-next-line
import { signLoginToken, verifyLoginToken } from './jwt.server';

test('signLoginToken returns a token encrypted', () => {
  expect(signLoginToken('foo@example.com', '/bar')).toMatch(/[a-zA-Z0-9.]+/);
});

test('verifyLoginToken returns a token', () => {
  const token = verifyLoginToken(signLoginToken('foo@example.com', '/bar'));

  expect(token.email).toBe('foo@example.com');
  expect(token.redirectTo).toBe('/bar');
});
