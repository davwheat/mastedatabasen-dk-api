import { ServiceType } from '../../models';
import { ServiceTypePresenter } from '../../presenters';
import { ServiceTypeTransformer } from '../../transformer';
import { ListModelController } from '../ListModelController';

export class ListServiceTypeController extends ListModelController<ServiceType> {
  constructor() {
    super(ServiceType, 'service-types', ServiceTypePresenter, ServiceTypeTransformer);
  }
}
