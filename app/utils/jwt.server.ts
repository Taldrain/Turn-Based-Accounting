import { sign, verify } from 'jsonwebtoken';

const jwtSecret = 'process.env.JWT_SECRET';
if (!jwtSecret) {
  throw new Error('JWT_SECRET must be set');
}

function signLoginToken(email: string) {
  return sign({ email }, jwtSecret, { expiresIn: '10m' });
}

function verifyLoginToken(token: string) {
  return verify(token, jwtSecret);
}

export {
  signLoginToken, 
  verifyLoginToken
}
