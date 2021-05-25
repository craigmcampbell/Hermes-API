import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import morgan from 'morgan';
import Debug from 'debug';
import bodyParser from 'body-parser';
import helmet from 'helmet';

// Middleware
import { authCheck } from './middleware/authCheck';

// Routes
import { applicationRouter } from './routes/applicationRoutes';
import { emailHistoryRouter } from './routes/emailHistoryRoutes';
import { sendEmailRouter } from './routes/sendEmailRoutes';
import { templateRouter } from './routes/templateRoutes';

const debug = Debug('app');
const app = express();

// Middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());

// Routes
app.use('/application', applicationRouter);
app.use('/emailHistory', emailHistoryRouter);
app.use('/template', templateRouter);
app.use('/sendEmail', sendEmailRouter);

app.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
