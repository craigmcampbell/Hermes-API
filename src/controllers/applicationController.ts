import { Request, Response } from 'express';
import Debug from 'debug';
import { getApplications } from '../db/query/applicationQuery';
import { addApplication } from '../db/command/applicationCommand';

import {
  buildErrorResponse,
  buildSuccessResponse,
} from '../helpers/jsonApiResponseHelper';

const debug = Debug('app:applicationController');

export const get = async (req: Request, res: Response) => {
  try {
    const applications = await getApplications();
    res.json(buildSuccessResponse(applications));
  } catch (error) {
    res.send(
      buildErrorResponse(
        '400',
        'Get Applications Error',
        error,
        'applicationController',
        ''
      )
    );
  }
};

export const post = async (req: Request, res: Response) => {
  try {
    const { name, token, isactive } = req.body;
    debug(name);

    const application = await addApplication(name, token, Boolean(isactive));

    res.json(buildSuccessResponse(application));
  } catch (error) {
    res.send(
      buildErrorResponse(
        '400',
        'Get Applications Error',
        error,
        'applicationController',
        ''
      )
    );
  }
};
