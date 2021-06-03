import { Request, Response } from 'express';
import Debug from 'debug';

import {
  buildErrorResponse,
  buildSuccessResponse,
} from '../helpers/jsonApiResponseHelper';

import { addTemplate, updateTemplate } from '../db/command/templateCommand';
import { getTemplateById } from '../db/query/templateQuery';
import { getTemplates } from '../services/templateService';
import AddTemplateDto from '../interfaces/AddTemplateDto';
import EditTemplateDto from '../interfaces/EditTemplateDto';

const debug = Debug('app:templateController');

const get = async (req: Request, res: Response) => {
  try {
    const applicationId = res.locals.applicationId;
    const page = req.query?.page?.toString();
    const nameFilter = req.query?.name?.toString();

    const templates = await getTemplates(applicationId, page, nameFilter);
    return res.json(buildSuccessResponse(templates));
  } catch (error) {
    returnErrorResponse(res, error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id !== undefined ? Number(req.params.id) : 0;

    const template = await getTemplateById(id);

    if (template === undefined || template === null) throw 'Template not found';

    res.json(buildSuccessResponse(template));
  } catch (error) {
    returnErrorResponse(res, error);
  }
};

const post = async (req: Request, res: Response) => {
  try {
    const template = req.body as AddTemplateDto;

    const applicationId = res.locals.applicationId;

    const newTemplate = await addTemplate(applicationId, template);

    res.json(buildSuccessResponse(newTemplate));
  } catch (error) {
    returnErrorResponse(res, error);
  }
};

const put = async (req: Request, res: Response) => {
  try {
    const template = req.body as EditTemplateDto;

    const updatedTemplate = await updateTemplate(template);

    res.json(buildSuccessResponse(updatedTemplate));
  } catch (error) {
    returnErrorResponse(res, error);
  }
};

const returnErrorResponse = (res: Response, error: any) => {
  res.send(
    buildErrorResponse('400', 'Template Error', error, 'templateController', '')
  );
};

export { get, getById, post, put };
