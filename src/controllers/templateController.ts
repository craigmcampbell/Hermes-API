import { Request, Response } from 'express';
import Debug from 'debug';
import {
  buildErrorResponse,
  buildSuccessResponse,
} from '../helpers/jsonApiResponseHelper';
import { addTemplate } from '../db/command/templateCommand';
import AddTemplateDto from '../models/AddTemplateDto';

const debug = Debug('app:templateController');

const get = async () => {};

const post = async (req: Request, res: Response) => {
  try {
    const template = req.body as AddTemplateDto;

    const applicationId = res.locals.applicationId;

    const newTemplate = await addTemplate(applicationId, template);

    res.json(buildSuccessResponse(newTemplate));
  } catch (error) {
    debug(error);
    res.send(
      buildErrorResponse(
        '400',
        'Template Error',
        error,
        'templateController',
        ''
      )
    );
  }
};

const put = async () => {};

export { get, post, put };
