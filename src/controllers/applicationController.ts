import { Request, Response, application } from 'express';
import Debug from 'debug';
import { v4 as uuidv4 } from 'uuid';
import {
  addApplication,
  updateApplication,
} from '../db/command/applicationCommand';
import { getApplications, getAppById } from '../services/applicationService';
import EditApplicationDto from '../interfaces/EditApplicationDto';

import {
  buildErrorResponse,
  buildSuccessResponse,
} from '../helpers/jsonApiResponseHelper';

const debug = Debug('app:applicationController');

const get = async (req: Request, res: Response) => {
  try {
    const nameFilter = req.query?.name?.toString();
    const applications = await getApplications(nameFilter);

    res.json(buildSuccessResponse(applications));
  } catch (error) {
    returnErrorResponse(res, error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id !== undefined ? Number(req.params.id) : 0;

    const application = await getAppById(id);

    res.json(buildSuccessResponse(application));
  } catch (error) {
    returnErrorResponse(res, error);
  }
};

const post = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const token = uuidv4();
    const isActive = true;

    const application = await addApplication(name, token, isActive);

    res.json(buildSuccessResponse(application));
  } catch (error) {
    returnErrorResponse(res, error);
  }
};

const put = async (req: Request, res: Response) => {
  try {
    const application = req.body as EditApplicationDto;

    const updatedApplication = await updateApplication(application);

    res.json(buildSuccessResponse(updatedApplication));
  } catch (error) {
    returnErrorResponse(res, error);
  }
};

const returnErrorResponse = (res: Response, error: any) => {
  res.send(
    buildErrorResponse(
      '400',
      'Get Applications Error',
      error,
      'applicationController',
      ''
    )
  );
};

export { get, getById, post, put };
