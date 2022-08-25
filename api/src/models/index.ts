import { getConnection } from '../database/connection';
import { FrequencyBand } from './FrequencyBand';
import { Operator } from './Operator';
import { ServiceType } from './ServiceType';
import { Site } from './Site';
import { Technology } from './Technology';

export { Operator } from './Operator';

export async function initModels() {
  const sequelize = await getConnection();

  const models = [FrequencyBand, Operator, ServiceType, Site, Technology];

  models.forEach((m) => m.initModel(sequelize));

  // This must be called after model init
  // https://github.com/sequelize/sequelize/issues/11691
  models.forEach((m) => m.initAssociations());
}
