import { Site } from '../models';
import { FrequencyBandPresenter } from './FrequencyBandPresenter';
import { ModelPresenter } from './ModelPresenter';
import { OperatorPresenter } from './OperatorPresenter';
import { ServiceTypePresenter } from './ServiceTypePresenter';
import { TechnologyPresenter } from './TechnologyPresenter';

export class SitePresenter extends ModelPresenter<Site> {
  static type: string = 'sites';

  relationships() {
    return {
      FrequencyBand: FrequencyBandPresenter,
      Operator: OperatorPresenter,
      ServiceType: ServiceTypePresenter,
      Technology: TechnologyPresenter,
    };
  }
}
