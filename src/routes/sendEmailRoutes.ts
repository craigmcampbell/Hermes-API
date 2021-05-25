import express from 'express';
import {
  templatedEmailPost,
  nonTemplatedEmailPost,
} from '../controllers/sendEmailController';

export const sendEmailRouter = express.Router();

sendEmailRouter.route('/templated').post(templatedEmailPost);

sendEmailRouter.route('/').post(nonTemplatedEmailPost);
