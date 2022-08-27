import { FrequencyBand } from '../../models';
import { FrequencyBandPresenter } from '../../presenters/FrequencyBandPresenter';
import { AbstractShowModelController } from '../AbstractShowModelController';
import { FrequencyBandTransformer } from '../../transformer';

export class ShowFrequencyBandController extends AbstractShowModelController<FrequencyBand> {
  constructor() {
    super(FrequencyBand, 'frequency-bands', FrequencyBandPresenter, FrequencyBandTransformer);
  }
}
