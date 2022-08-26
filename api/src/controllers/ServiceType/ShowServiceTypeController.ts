import { ShowModelController } from '../../controllers/ShowModelController';
import { ServiceType } from '../../models';
import { ServiceTypePresenter } from '../../presenters';
import { ServiceTypeTransformer } from '../../transformer';

export class ShowServiceTypeController extends ShowModelController<ServiceType> {
  constructor() {
    super(ServiceType, 'service-types', ServiceTypePresenter, ServiceTypeTransformer);
  }
}
