import Debug from 'debug';
import { PrismaClient } from '@prisma/client';

const debug = Debug('app:applicationQuery');
const prisma = new PrismaClient();

export const getApplications = async () => {
  return await prisma.applications.findMany();
};
