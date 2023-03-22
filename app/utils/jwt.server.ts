import type { JwtPayload } from 'jsonwebtoken'
import { sign, verify, JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET must be set');
}

function signLoginToken(email: string, redirectTo: string) {
  return sign({ email, redirectTo }, String(jwtSecret), { expiresIn: '10m' });
}

function verifyLoginToken(token: string) {
  return verify(token, String(jwtSecret)) as JwtPayload;
}

export {
  signLoginToken,
  verifyLoginToken,

  JsonWebTokenError,
  TokenExpiredError,
};
