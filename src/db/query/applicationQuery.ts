import Debug from 'debug';
import { PrismaClient } from '@prisma/client';

const debug = Debug('app:applicationQuery');
const prisma = new PrismaClient();

const getApplications = async () => {
  return await prisma.applications.findMany();
};

const getApplicationByToken = async (token: string) => {
  return await prisma.applications.findUnique({
    where: {
      token: token ?? '',
    },
  });
};

export { getApplications, getApplicationByToken };
