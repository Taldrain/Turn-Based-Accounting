import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

function getPunctuals() {
  return [
    {
      amount: 13.1,
      date: '2022-06-18T14:08:35.205Z',
      name: 'movie',
      isPositive: false,
    },
  ];
}

function getRecurrents() {
  return [
    {
      amount: 56.9,
      name: 'HelloFresh',
      isPositive: false,
      startDate: '2022-06-06T14:08:35.205Z',
      recurrence: 'week',
    },
  ];
}


async function seed() {
  const user = await db.user.create({
    data: {
      email: 'test@example.com',
    },
  });

  await db.settings.create({
    data: {
      locale: 'fr-FR',
      userId: user.id,
      currency: 'EUR',
    },
  });

  await Promise.all([
    ...getPunctuals().map((punctual) => {
      const data = { userId: user.id, ...punctual };
      return db.punctual.create({ data });
    }),
    ...getRecurrents().map((recurrent) => {
      const data = { userId: user.id, ...recurrent };
      return db.recurrent.create({ data });
    }),
  ]);
}

seed();
