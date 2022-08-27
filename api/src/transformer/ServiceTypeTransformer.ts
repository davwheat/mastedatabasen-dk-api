import { TransformerFunction } from '.';
import { ServiceType } from '../models';
import { AddSitesCountTransformer } from './AddSitesCountTransformer';

async function ServiceTypeTransformerFunc(models: ServiceType | ServiceType[]): Promise<ServiceType | ServiceType[]> {
  const m = await AddSitesCountTransformer<ServiceType>(models, 'service_type_id');

  return m;
}

export const ServiceTypeTransformer: TransformerFunction<ServiceType> = ServiceTypeTransformerFunc;
