import { FrequencyBand } from '../../models';
import { FrequencyBandPresenter } from '../../presenters';
import { FrequencyBandTransformer } from '../../transformer';
import { AbstractListModelController } from '../AbstractListModelController';

export class ListFrequencyBandController extends AbstractListModelController<FrequencyBand> {
  constructor() {
    super(FrequencyBand, 'frequency-bands', FrequencyBandPresenter, FrequencyBandTransformer);
  }
}
