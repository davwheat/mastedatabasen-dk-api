import { Operator } from '../../models';
import { OperatorPresenter } from '../../presenters/OperatorPresenter';
import { OperatorTransformer } from '../../transformer';
import { AbstractListModelController } from '../AbstractListModelController';

export class ListOperatorController extends AbstractListModelController<Operator> {
  constructor() {
    super(Operator, 'operators', OperatorPresenter, OperatorTransformer);
  }
}
