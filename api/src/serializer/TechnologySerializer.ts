import { InferAttributes } from 'sequelize/types';
import { Serializer, Relator } from 'ts-japi';
import { DefaultSerializerOptions } from '.';
import { Site } from '../models/Site';
import { Technology } from '../models/Technology';
import { SiteSerializer } from './SiteSerializer';

export const TechnologySerializer = new Serializer<InferAttributes<Technology>>('technologies', {
  ...DefaultSerializerOptions,
  depth: 0,
  projection: null,
});

export function setUpTechnologyRelators() {
  const TechnologySiteRelator = new Relator<InferAttributes<Technology>, Site>(async (technology: InferAttributes<Technology>) => {
    return await Site.findAll({
      where: {
        technologyId: technology.id,
      },
    });
  }, SiteSerializer);

  TechnologySerializer.setRelators([TechnologySiteRelator]);
}
