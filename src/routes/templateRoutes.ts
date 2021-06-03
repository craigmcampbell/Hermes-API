import express from 'express';
import { get, getById, post, put } from '../controllers/templateController';

export const templateRouter = express.Router();

templateRouter.route('/').get(get).post(post).put(put);

templateRouter.route('/:id').get(getById);
