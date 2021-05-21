import Debug from 'debug';
import { PrismaClient } from '@prisma/client';

const debug = Debug('app:applicationCommand');
const prisma = new PrismaClient();

export const addApplication = async (
  name: string,
  token: string,
  isactive: boolean
) => {
  return await prisma.applications.create({
    data: {
      name,
      token,
      isactive,
    },
  });
};
