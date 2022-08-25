import { Serializer, Relator } from 'ts-japi';
import { DefaultSerializerOptions } from '.';
import { Operator } from '../models';
import { FrequencyBand } from '../models/FrequencyBand';
import { ServiceType } from '../models/ServiceType';
import { Site } from '../models/Site';
import { Technology } from '../models/Technology';
import { FrequencyBandSerializer } from './FrequencyBandSerializer';
import { OperatorSerializer } from './OperatorSerializer';
import { ServiceTypeSerializer } from './ServiceTypeSerializer';
import { TechnologySerializer } from './TechnologySerializer';

const SiteSerializer = new Serializer<Site>('sites', {
  ...DefaultSerializerOptions,
  depth: 1,
  projection: null,
});

export function setUpSiteRelators() {
  const SiteFrequencyBandRelator = new Relator<Site, FrequencyBand>(async (site: Site) => {
    return site.frequencyBand;
  }, FrequencyBandSerializer);

  const SiteOperatorRelator = new Relator<Site, Operator>(async (site: Site) => {
    return site.operator;
  }, OperatorSerializer);

  const SiteServiceTypeRelator = new Relator<Site, ServiceType>(async (site: Site) => {
    return site.serviceType;
  }, ServiceTypeSerializer);

  const SiteTechnologyRelator = new Relator<Site, Technology>(async (site: Site) => {
    return site.technology;
  }, TechnologySerializer);

  SiteSerializer.setRelators([SiteFrequencyBandRelator, SiteOperatorRelator, SiteServiceTypeRelator, SiteTechnologyRelator]);
}

export { SiteSerializer };
