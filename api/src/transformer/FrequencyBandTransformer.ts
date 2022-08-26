import { TransformerFunction } from '.';
import { FrequencyBand } from '../models';
import { AddSitesCountTransformer } from './AddSitesCountTransformer';

async function FrequencyBandTransformerFunc(models: FrequencyBand | FrequencyBand[]): Promise<FrequencyBand | FrequencyBand[]> {
  const m = await AddSitesCountTransformer<FrequencyBand>(models, 'frequency_band_id');

  return m;
}

export const FrequencyBandTransformer: TransformerFunction<FrequencyBand> = FrequencyBandTransformerFunc;
