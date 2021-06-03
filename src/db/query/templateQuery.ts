import Debug from 'debug';
import { PrismaClient } from '@prisma/client';
import PagedTemplateListDto from '../../models/PagedTemplateListDto';

const debug = Debug('app:templateQuery');
const prisma = new PrismaClient();

const getTemplatesByApplication = async (applicationId: number) => {
  return await prisma.templates.findMany({
    where: {
      application_id: applicationId,
    },
    orderBy: [
      {
        name: 'asc',
      },
    ],
  });
};

const getTemplateById = async (id: number) => {
  return await prisma.templates.findUnique({
    where: {
      id,
    },
  });
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

const getPagedTemplates = async (
  currentPage: number,
  pageSize: number,
  applicationId: number
) => {
  const recordsToSkip = currentPage === 1 ? 0 : (currentPage - 1) * pageSize;

  const templates = await prisma.templates.findMany({
    skip: recordsToSkip,
    take: pageSize,
    where: {
      application_id: applicationId,
    },
    orderBy: [
      {
        name: 'asc',
      },
    ],
  });

  const templateCount = await getCount();

  return new PagedTemplateListDto(
    currentPage,
    pageSize,
    templateCount,
    templates
  );
};

const filterByTemplateName = async (applicationId: number, name: string) => {
  return await prisma.templates.findMany({
    where: {
      application_id: applicationId,
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
    orderBy: {
      name: 'asc',
    },
  });
};

const getCount = async () => {
  return await prisma.templates.count();
};

export {
  getTemplatesByApplication,
  getTemplateById,
  getTemplateByName,
  getPagedTemplates,
  filterByTemplateName,
};
