import { AbstractShowModelController } from '../AbstractShowModelController';
import { Site } from '../../models';
import { SitePresenter } from '../../presenters';

export class ShowSiteController extends AbstractShowModelController<Site> {
  constructor() {
    super(Site, 'sites', SitePresenter);
  }
}
