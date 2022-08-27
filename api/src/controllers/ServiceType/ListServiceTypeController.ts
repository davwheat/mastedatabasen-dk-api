import { ServiceType } from '../../models';
import { ServiceTypePresenter } from '../../presenters';
import { ServiceTypeTransformer } from '../../transformer';
import { AbstractListModelController } from '../AbstractListModelController';

export class ListServiceTypeController extends AbstractListModelController<ServiceType> {
  constructor() {
    super(ServiceType, 'service-types', ServiceTypePresenter, ServiceTypeTransformer);
  }
}
