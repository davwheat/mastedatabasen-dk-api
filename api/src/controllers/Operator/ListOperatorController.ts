import { Operator } from '../../models';
import { OperatorPresenter } from '../../presenters/OperatorPresenter';
import { OperatorTransformer } from '../../transformer';
import { ListModelController } from '../ListModelController';

export class ListOperatorController extends ListModelController<Operator> {
  constructor() {
    super(Operator, 'operators', OperatorPresenter, OperatorTransformer);
  }
}
