import { InferAttributes } from 'sequelize/types';
import { Serializer, Relator } from 'ts-japi';
import { DefaultSerializerOptions } from '.';
import { FrequencyBand } from '../models/FrequencyBand';
import { Site } from '../models/Site';
import { SiteSerializer } from './SiteSerializer';

export const FrequencyBandSerializer = new Serializer<InferAttributes<FrequencyBand>>('frequency-bands', {
  ...DefaultSerializerOptions,
  depth: 0,
  projection: null,
});

export function setUpFrequencyBandRelators() {
  const FrequencyBandSiteRelator = new Relator<InferAttributes<FrequencyBand>, Site>(async (frequencyBand: InferAttributes<FrequencyBand>) => {
    return await Site.findAll({
      where: {
        frequencyBandId: frequencyBand.id,
      },
    });
  }, SiteSerializer);

  FrequencyBandSerializer.setRelators([FrequencyBandSiteRelator]);
}
