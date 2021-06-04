import { applications } from '@prisma/client';
import Debug from 'debug';
import R from 'ramda';
import {
  getAllApplications,
  getApplicationById,
  filterByApplicationName,
} from '../db/query/applicationQuery';
import ApplicationDto from '../models/ApplicationDto';

const debug = Debug('app:applicationService');

const getApplications = async (name: string | undefined = undefined) => {
  if (name !== undefined) {
    return await filterByApplicationName(name);
  }

  const applications = await getAllApplications();

  return applicationsToDtoList(applications);
};

const getAppById = async (id: number) => {
  const application = await getApplicationById(id);
  if (application === undefined || application === null)
    throw 'Application not found';

  return new ApplicationDto(
    application.id,
    application.name,
    application.token,
    application.isactive ?? false
  );
};

function applicationsToDtoList(applicationList: Array<applications>) {
  let dto: Array<ApplicationDto> = [];

  const addToDtoList = (apps: applications) => {
    const appDto = new ApplicationDto(
      apps.id,
      apps.name,
      apps.token,
      apps.isactive ?? false
    );

    dto.push(appDto);
  };

  R.forEach(addToDtoList, applicationList);

  return dto;
}

export { getApplications, getAppById };
