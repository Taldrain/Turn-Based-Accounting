import { db } from './db.server';

function getUser(email: string) {
  return db.user.findUnique({ where: { email }});
}

function createUser(email: string) {
  return db.user.create({ data: { email }});
}

export {
  getUser,
  createUser,
};
