import { AbstractShowModelController } from '../AbstractShowModelController';
import { ServiceType } from '../../models';
import { ServiceTypePresenter } from '../../presenters';
import { ServiceTypeTransformer } from '../../transformer';

export class ShowServiceTypeController extends AbstractShowModelController<ServiceType> {
  constructor() {
    super(ServiceType, 'service-types', ServiceTypePresenter, ServiceTypeTransformer);
  }
}
