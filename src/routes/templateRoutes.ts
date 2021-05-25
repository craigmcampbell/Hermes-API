import express from 'express';
import { get, post, put } from '../controllers/templateController';

export const templateRouter = express.Router();

templateRouter.route('/').get(get).post(post).put(put);
