import { db } from './db.server';

function getUser(email: string) {
  return db.user.findUnique({ where: { email }});
}

function getUserById(id: string) {
  return db.user.findUnique({ where: { id }});
}

function createUser(email: string) {
  return db.user.create({ data: { email }});
}

function getPunctual(id: string) {
  return db.punctual.findUnique({
    where: {
      id,
    },
  });
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

async function updatePunctual(userId: string, id: string, name: string, amount: number, isPositive: boolean, date: Date) {
  const punctual = await getPunctual(id);
  if (punctual?.userId !== userId) {
    throw new Error('UserId does not match');
  }

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

function getRecurrent(id: string) {
  return db.recurrent.findUnique({
    where: {
      id,
    },
  });
}

function getRecurrents(userId: string, start: Date, end: Date) {
  return db.recurrent.findMany({
    where: {
      userId,
      OR: [
        {
          startDate: {
            lte: start
          },
          endDate: {
            equals: null,
          },
        },
        {
          // the display date interval in inside the entry date interval
          startDate: {
            lte: start,
          },
          endDate: {
            gte: end,
          },
        },
        {
          // the display date interval is around the entry start date interval
          // or
          // the display date interval is around the whole entry date interval
          startDate: {
            gte: start,
            lte: end,
          },
        },
        {
          // the display date interval is around the end start date interval
          // or
          // the display date interval is around the whole entry date interval
          endDate: {
            gte: start,
            lte: end,
          },
        },
      ]
    },
  });
}

function createRecurrent(
  userId: string,
  name: string,
  amount: number,
  isPositive: boolean,
  recurrence: string,
  startDate: Date,
  endDate: Date | null,
) {
  return db.recurrent.create({
    data: {
      userId,
      name,
      amount,
      isPositive,
      recurrence,
      startDate,
      endDate,
    },
  });
}

async function updateRecurrent(
  userId: string,
  id: string,
  name: string,
  amount: number,
  isPositive: boolean,
  recurrence: string,
  startDate: Date,
  endDate: Date | null,
) {
  const recurrent = await getRecurrent(id);
  if (recurrent?.userId !== userId) {
    throw new Error('UserId does not match');
  }
  return db.recurrent.update({
    where: {
      id,
    },
    data: {
      name,
      amount,
      isPositive,
      recurrence,
      startDate,
      endDate,
    },
  });
}

function deleteRecurrent(id: string) {
  return db.recurrent.delete({
    where: {
      id,
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

function updateSettings(userId: string, currency: string, locale: string) {
  return db.settings.upsert({
    where: {
      userId,
    },
    update: {
      currency,
      locale,
    },
    create: {
      userId,
      currency,
      locale,
    },
  })
}

export {
  getUser,
  getUserById,
  createUser,
  getPunctuals,
  createPunctual,
  updatePunctual,
  deletePunctual,
  getRecurrents,
  createRecurrent,
  updateRecurrent,
  deleteRecurrent,
  getSettings,
  updateSettings,
};
