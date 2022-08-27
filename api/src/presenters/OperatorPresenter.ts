import { Operator } from '../models';
import { ModelPresenter } from './ModelPresenter';

export class OperatorPresenter extends ModelPresenter<Operator> {
  static type: string = 'operators';
}

OperatorPresenter.prototype.type = OperatorPresenter.type;
