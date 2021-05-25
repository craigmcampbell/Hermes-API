import { Request, Response } from 'express';
import Debug from 'debug';
import {
  sendTemplatedEmail,
  sendNonTemplatedEmail,
} from '../services/sendGridService';
import Email from '../models/Email';
import TemplatedEmailDto from '../models/TemplatedEmailDto';

import {
  buildErrorResponse,
  buildSuccessResponse,
} from '../helpers/jsonApiResponseHelper';

const debug = Debug('app:sendEmailController');

export const templatedEmailPost = async (req: Request, res: Response) => {
  try {
    const dto = req.body as TemplatedEmailDto;

    await sendTemplatedEmail(dto);

    res.status(200).end();
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
    const email = req.body as Email;

    await sendNonTemplatedEmail(email);

    res.status(200).end();
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
