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
import { getConnection } from './database/connection';

import { jsonApiErrorHandler } from 'json-api-error/middlewares';
import path from 'path';
import { ShowSiteController } from './controllers/Site/ShowSiteController';

if (!process.env.PORT) {
  logger.error('Missing environment variable "PORT"');
  process.exit(1);
}

if (!process.env.API_BASE_URL) {
  logger.error('Missing environment variable "API_BASE_URL"');
  process.exit(1);
}

getConnection()
  .then(() => {
    logger.info('Database connection successful.');
  })
  .catch(() => {
    logger.error('Database connection failed.');
    process.exit(1);
  });

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  await initModels();

  next();
});

app.use(async (req, res, next) => {
  res.setHeader('X-Powered-By', 'davw.network');
  res.setHeader('X-Source-Code', 'https://github.com/davwheat/mastedatabasen-dk-api');

  res.setHeader('Cache-Control', 'public, max-age=120');

  next();
});

app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
});

app.get('/frequency-bands/:id', async (...args) => new ShowFrequencyBandController().onRequest(...args));
app.get('/frequency-bands', async (...args) => new ListFrequencyBandController().onRequest(...args));

app.get('/operators/:id', async (...args) => new ShowOperatorController().onRequest(...args));
app.get('/operators', async (...args) => new ListOperatorController().onRequest(...args));

app.get('/service-types/:id', async (...args) => new ShowServiceTypeController().onRequest(...args));
app.get('/service-types', async (...args) => new ListServiceTypeController().onRequest(...args));

app.get('/technologies/:id', async (...args) => new ShowTechnologyController().onRequest(...args));
app.get('/technologies', async (...args) => new ListTechnologyController().onRequest(...args));

app.get('/sites/:id', async (...args) => new ShowSiteController().onRequest(...args));
app.get('/sites', async (...args) => new ListSiteController().onRequest(...args));

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, '../documentation/index.html'));
});

// Error handling
app.use(jsonApiErrorHandler);
