import express, { application } from 'express';
import { get, getById, post, put } from '../controllers/applicationController';

export const applicationRouter = express.Router();

applicationRouter.route('/').get(get).post(post).put(put);

applicationRouter.route('/:id').get(getById);
