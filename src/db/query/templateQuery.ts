import Debug from 'debug';
import { PrismaClient } from '@prisma/client';

const debug = Debug('app:templateQuery');
const prisma = new PrismaClient();

const getTemplates = async () => {
  return await prisma.templates.findMany();
};

const getTemplateByName = async (
  applicationId: number,
  name: string,
  tenantId: string | undefined = undefined
) => {
  if (tenantId === undefined) {
    return await prisma.templates.findFirst({
      where: {
        application_id: applicationId,
        name,
      },
    });
  }

  return await prisma.templates.findFirst({
    where: {
      application_id: applicationId,
      name,
      tenant_id: tenantId,
    },
  });
};

export { getTemplates, getTemplateByName };
