import { Technology } from '../models';
import { ModelPresenter } from './ModelPresenter';

export class TechnologyPresenter extends ModelPresenter<Technology> {
  static type: string = 'technologies';
}

TechnologyPresenter.prototype.type = TechnologyPresenter.type;
