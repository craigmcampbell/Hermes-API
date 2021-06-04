import Debug from 'debug';
import { PrismaClient, applications } from '@prisma/client';
import ApplicationDto from '../../models/ApplicationDto';
import R from 'ramda';

const debug = Debug('app:applicationQuery');
const prisma = new PrismaClient();

const getAllApplications = async () => {
  //TODO: Move this up to the service level
  // let dto: Array<ApplicationDto> = [];

  return await prisma.applications.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  // const addToDtoList = (application: applications) => {
  //   const appDto = new ApplicationDto(
  //     application.id,
  //     application.name,
  //     application.token,
  //     application.isactive ?? false
  //   );

  //   dto.push(appDto);
  // };

  // const applications = await prisma.applications.findMany({
  //   orderBy: {
  //     name: 'asc',
  //   },
  // });

  // R.forEach(addToDtoList, applications);

  // return dto;
};

const getApplicationByToken = async (token: string) => {
  return await prisma.applications.findUnique({
    where: {
      token: token ?? '',
    },
  });
};

const getApplicationById = async (id: number) => {
  return await prisma.applications.findUnique({
    where: {
      id,
    },
  });
};

const filterByApplicationName = async (name: string) => {
  return await prisma.applications.findMany({
    where: {
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

export {
  getAllApplications,
  getApplicationByToken,
  getApplicationById,
  filterByApplicationName,
};
