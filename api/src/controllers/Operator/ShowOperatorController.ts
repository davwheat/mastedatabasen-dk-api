import { Operator } from '../../models';

import { AbstractShowModelController } from '../AbstractShowModelController';
import { OperatorPresenter } from '../../presenters';
import { OperatorTransformer } from '../../transformer';

export class ShowOperatorController extends AbstractShowModelController<Operator> {
  constructor() {
    super(Operator, 'operators', OperatorPresenter, OperatorTransformer);
  }
}
