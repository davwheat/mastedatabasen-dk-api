import { Technology } from '../../models';
import { TechnologyPresenter } from '../../presenters/TechnologyPresenter';
import { TechnologyTransformer } from '../../transformer';
import { AbstractListModelController } from '../AbstractListModelController';

export class ListTechnologyController extends AbstractListModelController<Technology> {
  constructor() {
    super(Technology, 'technologies', TechnologyPresenter, TechnologyTransformer);
  }
}
