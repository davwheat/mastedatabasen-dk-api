import { Technology } from '../../models';
import { AbstractShowModelController } from '../AbstractShowModelController';
import { TechnologyPresenter } from '../../presenters';
import { TechnologyTransformer } from '../../transformer';

export class ShowTechnologyController extends AbstractShowModelController<Technology> {
  constructor() {
    super(Technology, 'technologies', TechnologyPresenter, TechnologyTransformer);
  }
}
