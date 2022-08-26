import { FrequencyBand } from '../../models';
import { FrequencyBandPresenter } from '../../presenters';
import { FrequencyBandTransformer } from '../../transformer';
import { ListModelController } from '../ListModelController';

export class ListFrequencyBandController extends ListModelController<FrequencyBand> {
  constructor() {
    super(FrequencyBand, 'frequency-bands', FrequencyBandPresenter, FrequencyBandTransformer);
  }
}
