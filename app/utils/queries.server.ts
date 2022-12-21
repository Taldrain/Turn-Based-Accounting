import { db } from './db.server';

function getUser(email: string) {
  return db.user.findUnique({ where: { email }});
}

function createUser(email: string) {
  return db.user.create({ data: { email }});
}

function getPunctuals(userId: string, start: Date, end: Date) {
  return db.punctual.findMany({
    where: {
      userId,
      date: {
        gte: start,
        lte: end,
      },
    },
  });
}

export {
  getUser,
  createUser,
  getPunctuals,
};
