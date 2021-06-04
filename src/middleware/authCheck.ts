import { Request, Response, NextFunction } from 'express';
import Debug from 'debug';
import jwt from 'jsonwebtoken';
import { getApplicationByToken } from '../db/query/applicationQuery';
import { buildErrorResponse } from '../helpers/jsonApiResponseHelper';

const debug = Debug('app:auth');
const title = 'Authentication Middleware';

const authorizedApplicationCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req != null && req.headers != null && req.headers.authorization != null) {
    const token = req.headers.authorization.split(' ')[1];

    const application = await getApplicationByToken(token);
    if (application !== null) {
      res.locals.applicationId = application?.id;
      next();
    } else {
      returnUnauthorized(req, res);
    }
  } else {
    returnUnauthorized(req, res);
  }
};

const authCheck = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (
      req != null &&
      req.headers != null &&
      req.headers.authorization != null
    ) {
      const token = req.headers.authorization.split(' ')[1];
      if (token === process.env.INTERNAL_AUTH_TOKEN) {
        next();
      } else {
        returnUnauthorized(req, res);
      }
    } else {
      returnUnauthorized(req, res);
    }
  } catch (error: any) {
    returnUnauthorized(req, res);
  }
};

const returnUnauthorized = (req: Request, res: Response) => {
  let errorResponse = buildErrorResponse(
    '401',
    title,
    'Unauthorized',
    req.path,
    JSON.stringify(req.query)
  );
  res.status(401).json(errorResponse);
};

export { authorizedApplicationCheck, authCheck };
