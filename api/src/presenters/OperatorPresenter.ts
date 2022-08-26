import { Operator } from '../models';
import { ModelPresenter } from './ModelPresenter';

export class OperatorPresenter extends ModelPresenter<Operator> {
  type: string = 'operators';
}
