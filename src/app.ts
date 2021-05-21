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
import { emailHistoryRouter } from './routes/emailHistoryRoutes';
import { applicationRouter } from './routes/applicationRoutes';

const debug = Debug('app');
const app = express();

// Middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());

// Routes
app.use('/emailHistory', emailHistoryRouter);
app.use('/application', applicationRouter);

app.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
