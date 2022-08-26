import { Technology } from '../models';
import { ModelPresenter } from './ModelPresenter';

export class TechnologyPresenter extends ModelPresenter<Technology> {
  type: string = 'technologies';
}
