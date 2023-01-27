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

function createPunctual(userId: string, name: string, amount: number, isPositive: boolean, date: Date) {
  return db.punctual.create({
    data: {
      userId,
      name,
      amount,
      isPositive,
      date,
    },
  });
}

function updatePunctual(id: string, name: string, amount: number, isPositive: boolean, date: Date) {
  return db.punctual.update({
    where: {
      id,
    },
    data: {
      name,
      amount,
      isPositive,
      date,
    },
  });
}

function deletePunctual(id: string) {
  return db.punctual.delete({
    where: {
      id,
    },
  });
}

function getRecurrents(userId: string, start: Date, end: Date) {
  return db.recurrent.findMany({
    where: {
      userId,
      startDate: {
        gte: start,
      },
      endDate: {
        lte: end,
      },
    },
  });
}

function getSettings(userId: string) {
  return db.settings.findUnique({
    where: {
      userId,
    }
  });
}

export {
  getUser,
  createUser,
  getPunctuals,
  createPunctual,
  updatePunctual,
  deletePunctual,
  getRecurrents,
  getSettings,
};
