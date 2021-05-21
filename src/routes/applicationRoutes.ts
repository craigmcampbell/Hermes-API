import express from 'express';
import { get, post } from '../controllers/applicationController';

export const applicationRouter = express.Router();

applicationRouter.route('/').get(get).post(post);
