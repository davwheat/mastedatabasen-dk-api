import { Sequelize } from 'sequelize';
import { logger } from '../logger';

import * as SequelizeTypes from 'sequelize/types';

function validateEnv() {
  if (process.env.DB_PORT) {
    if (isNaN(parseInt(process.env.DB_PORT))) return false;
  }

  if (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_DATABASE || !process.env.DB_HOST) return false;

  return true;
}

let sequelize: SequelizeTypes.Sequelize | null = null;

async function getConnection() {
  if (sequelize) return sequelize;

  if (!validateEnv()) {
    logger.error('Missing DB environment variables. Ensure you have set `DB_DATABASE`, `DB_USER` and `DB_PASSWORD`.');
    process.exit(1);
  }

  sequelize = new Sequelize(process.env.DB_DATABASE!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '0') || undefined,
    dialect: 'mysql',
    logging: (msg) => logger.debug(msg),
    dialectOptions: { decimalNumbers: true },
  });

  await sequelize.authenticate();

  return sequelize;
}

export { getConnection };
