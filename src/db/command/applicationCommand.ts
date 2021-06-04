import Debug from 'debug';
import { PrismaClient } from '@prisma/client';
import EditApplicationDto from '../../interfaces/EditApplicationDto';

const debug = Debug('app:applicationCommand');
const prisma = new PrismaClient();

const addApplication = async (
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

const updateApplication = async (application: EditApplicationDto) => {
  return await prisma.applications.update({
    where: {
      id: application.id,
    },
    data: {
      name: application.name,
      token: application.token,
      isactive: application.isActive,
    },
  });
};

export { addApplication, updateApplication };
