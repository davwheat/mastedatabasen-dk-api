// import * as dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { logger } from './logger';
import { initModels } from './models';
import compression from 'compression';
import { ListOperatorController } from './routes/operators/ListOperatorController';
import { setUpAllRelators } from './serializer';
import { ErrorSerializer, JapiError } from 'ts-japi';
import { InternalServerError } from './errors/InternalServerError';

import type * as Express from 'express';
import { ShowOperatorController } from './routes/operators/ShowOperatorController';
import { ShowTechnologyController } from './routes/technologies/ShowTechnologyController';
import { ListTechnologyControllder } from './routes/technologies/ListTechnologyController';

if (!process.env.PORT) {
  logger.error("Missing environment variable 'PORT'");
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  await initModels();

  setUpAllRelators();

  next();
});

app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
});

app.get('/', async (req, res) => {
  res.send('Hello!');
});

app.get('/operators/:id', ShowOperatorController);
app.get('/operators', ListOperatorController);

app.get('/technologies/:id', ShowTechnologyController);
app.get('/technologies', ListTechnologyControllder);

// Error handling
app.use(async (err: any | JapiError, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  console.log('err');

  if (res.headersSent) {
    return next(err);
  }

  if (!(err instanceof JapiError)) {
    err = new InternalServerError(err.message);
  }

  res.status(err.status);
  res.send(new ErrorSerializer().serialize(err));
});
