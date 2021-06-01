import { Request, Response } from 'express';
import Debug from 'debug';
import { sendEmailFromTemplate } from '../services/sendTemplatedEmailService';
import { sendEmailNoTemplate } from '../services/sendNonTemplatedEmailService';
import TemplatedEmailDto from '../models/TemplatedEmailDto';

import {
  buildErrorResponse,
  buildSuccessResponse,
} from '../helpers/jsonApiResponseHelper';

const debug = Debug('app:sendEmailController');

export const templatedEmailPost = async (req: Request, res: Response) => {
  try {
    const dto = req.body as TemplatedEmailDto;

    const applicationId = res.locals.applicationId;

    const savedEmail = await sendEmailFromTemplate(applicationId, dto);

    res.status(200).json({ id: savedEmail.id, sent: savedEmail.sent });
  } catch (error) {
    debug(error);
    res.send(
      buildErrorResponse(
        '400',
        'Send Email Error',
        error,
        'sendEmailController',
        ''
      )
    );
  }
};

export const nonTemplatedEmailPost = async (req: Request, res: Response) => {
  try {
    const dto = req.body as TemplatedEmailDto;

    const applicationId = res.locals.applicationId;

    const savedEmail = await sendEmailNoTemplate(applicationId, dto);

    res.status(200).json({ id: savedEmail.id, sent: savedEmail.sent });
  } catch (error) {
    res.send(
      buildErrorResponse(
        '400',
        'Send Email Error',
        error,
        'sendEmailController',
        ''
      )
    );
  }
};
