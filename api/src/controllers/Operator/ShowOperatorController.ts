import { Operator } from '../../models';

import { ShowModelController } from '../../controllers/ShowModelController';
import { OperatorPresenter } from '../../presenters';
import { OperatorTransformer } from '../../transformer';

export class ShowOperatorController extends ShowModelController<Operator> {
  constructor() {
    super(Operator, 'operators', OperatorPresenter, OperatorTransformer);
  }
}
