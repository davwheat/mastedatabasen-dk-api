import { Dictionary, SerializerOptions } from 'ts-japi';
import { setUpFrequencyBandRelators } from './FrequencyBandSerializer';
import { setUpOperatorRelators } from './OperatorSerializer';
import { setUpServiceTypeRelators } from './ServiceTypeSerializer';
import { setUpSiteRelators } from './SiteSerializer';
import { setUpTechnologyRelators } from './TechnologySerializer';

export function setUpAllRelators() {
  setUpFrequencyBandRelators();
  setUpOperatorRelators();
  setUpServiceTypeRelators();
  setUpSiteRelators();
  setUpTechnologyRelators();
}

export const DefaultSerializerOptions: Partial<Omit<SerializerOptions, 'idKey'>> = {
  version: null,
};
