import { ServiceType } from '../models/ServiceType';
import { ModelPresenter } from './ModelPresenter';

export class ServiceTypePresenter extends ModelPresenter<ServiceType> {
  static type: string = 'service-types';
}
