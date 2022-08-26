import { Site } from '../models';
import { ModelPresenter } from './ModelPresenter';

export class SitePresenter extends ModelPresenter<Site> {
  type: string = 'sites';
}
