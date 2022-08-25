import { InferAttributes } from 'sequelize/types';
import { Serializer, Relator } from 'ts-japi';
import { DefaultSerializerOptions } from '.';
import { ServiceType } from '../models/ServiceType';
import { Site } from '../models/Site';
import { SiteSerializer } from './SiteSerializer';

export const ServiceTypeSerializer = new Serializer<InferAttributes<ServiceType>>('service-types', {
  ...DefaultSerializerOptions,
  depth: 0,
  projection: null,
});

export function setUpServiceTypeRelators() {
  const ServiceTypeSiteRelator = new Relator<InferAttributes<ServiceType>, Site>(async (serviceType: InferAttributes<ServiceType>) => {
    return await Site.findAll({
      where: {
        serviceTypeId: serviceType.id,
      },
    });
  }, SiteSerializer);

  ServiceTypeSerializer.setRelators([ServiceTypeSiteRelator]);
}
