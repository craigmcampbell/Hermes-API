import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const emailHistoryRouter = express.Router();

emailHistoryRouter.get('/', async (req, res) => {
  // const { rows } = await db.query('select * from emails');
  // res.json(rows);

  const applications = await prisma.applications.findMany();
  await prisma.$disconnect();
  res.json(applications);
});
