import { InferAttributes } from 'sequelize/types';
import { Serializer, Relator } from 'ts-japi';
import { DefaultSerializerOptions } from '.';
import { Operator } from '../models';
import { Site } from '../models/Site';
import { SiteSerializer } from './SiteSerializer';

export const OperatorSerializer = new Serializer<InferAttributes<Operator>>('operators', {
  ...DefaultSerializerOptions,
  depth: 0,
  projection: null,
});

export function setUpOperatorRelators() {
  const OperatorSiteRelator = new Relator<InferAttributes<Operator>, Site>(async (operator: InferAttributes<Operator>) => {
    return await Site.findAll({
      where: {
        operatorId: operator.id,
      },
    });
  }, SiteSerializer);

  OperatorSerializer.setRelators([OperatorSiteRelator]);
}
