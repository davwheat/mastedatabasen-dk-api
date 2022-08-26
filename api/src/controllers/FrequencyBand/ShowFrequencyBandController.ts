import { FrequencyBand } from '../../models';
import { FrequencyBandPresenter } from '../../presenters/FrequencyBandPresenter';
import { ShowModelController } from '../ShowModelController';
import { FrequencyBandTransformer } from '../../transformer';

export class ShowFrequencyBandController extends ShowModelController<FrequencyBand> {
  constructor() {
    super(FrequencyBand, 'frequency-bands', FrequencyBandPresenter, FrequencyBandTransformer);
  }
}
