import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const db = new PrismaClient();

function getPunctuals(nb: number, userId: string) {
  return [...Array(nb).keys()].map(() => ({
    amount: parseInt(faker.commerce.price(), 10),
    name: faker.commerce.productName(),
    isPositive: faker.datatype.boolean(),
    date: faker.date.recent(5),
    userId,
  }));
}

function getRecurrents(nb: number, userId: string) {
  return [...Array(nb).keys()].map(() => ({
    amount: parseInt(faker.commerce.price(), 10),
    name: faker.commerce.productName(),
    isPositive: faker.datatype.boolean(),
    startDate: faker.date.recent(20),
    recurrence: faker.helpers.arrayElement(['day', 'week', 'month', 'year']),
    userId,
  }));
}


async function seed() {
  const user = await db.user.upsert({
    where: {
      email: 'test@example.com',
    },
    update: {},
    create: {
      email: 'test@example.com',
    },
  });

  await db.settings.upsert({
    where: {
      userId: user.id,
    },
    update: {},
    create: {
      locale: 'fr-FR',
      userId: user.id,
      currency: 'EUR',
    },
  });

  await Promise.all([
    ...getPunctuals(20, user.id).map(data => db.punctual.create({ data })),
    ...getRecurrents(20, user.id).map(data => db.recurrent.create({ data })),
  ]);
}

seed();
