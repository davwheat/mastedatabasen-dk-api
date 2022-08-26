import { Technology } from '../../models';
import { ShowModelController } from '../../controllers/ShowModelController';
import { TechnologyPresenter } from '../../presenters';
import { TechnologyTransformer } from '../../transformer';

export class ShowTechnologyController extends ShowModelController<Technology> {
  constructor() {
    super(Technology, 'technologies', TechnologyPresenter, TechnologyTransformer);
  }
}
