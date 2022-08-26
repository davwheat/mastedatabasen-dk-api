// import * as dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { logger } from './logger';
import { initModels } from './models';
import compression from 'compression';

import {
  ListFrequencyBandController,
  ListOperatorController,
  ListServiceTypeController,
  ListSiteController,
  ListTechnologyController,
  ShowFrequencyBandController,
  ShowOperatorController,
  ShowServiceTypeController,
  ShowTechnologyController,
} from './controllers';

import { jsonApiErrorHandler } from 'json-api-error/middlewares';

if (!process.env.PORT) {
  logger.error('Missing environment variable "PORT"');
  process.exit(1);
}s

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  await initModels();

  next();
});

app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
});

app.get('/', async (req, res) => {
  res.send('Hello!');
});

app.get('/frequency-bands/:id', async (...args) => new ShowFrequencyBandController().onRequest(...args));
app.get('/frequency-bands', async (...args) => new ListFrequencyBandController().onRequest(...args));

app.get('/operators/:id', async (...args) => new ShowOperatorController().onRequest(...args));
app.get('/operators', async (...args) => new ListOperatorController().onRequest(...args));

app.get('/service-types/:id', async (...args) => new ShowServiceTypeController().onRequest(...args));
app.get('/service-types', async (...args) => new ListServiceTypeController().onRequest(...args));

app.get('/technologies/:id', async (...args) => new ShowTechnologyController().onRequest(...args));
app.get('/technologies', async (...args) => new ListTechnologyController().onRequest(...args));

// app.get('/sites/:id', ShowTechnologyController);
app.get('/sites', async (...args) => new ListSiteController().onRequest(...args));

// Error handling
app.use(jsonApiErrorHandler);
// app.use(async (err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
//   console.log('err');

//   if (res.headersSent) {
//     return next(err);
//   }

//   if (!(err instanceof JapiError)) {
//     err = new InternalServerError(err.message);
//   }

//   res.status(err.status);
//   res.send(new ErrorSerializer().serialize(err));
// });
