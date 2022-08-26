import { Technology } from '../../models';
import { TechnologyPresenter } from '../../presenters/TechnologyPresenter';
import { TechnologyTransformer } from '../../transformer';
import { ListModelController } from '../ListModelController';

export class ListTechnologyController extends ListModelController<Technology> {
  constructor() {
    super(Technology, 'technologies', TechnologyPresenter, TechnologyTransformer);
  }
}
