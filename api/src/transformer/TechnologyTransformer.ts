import { TransformerFunction } from '.';
import { Technology } from '../models';
import { AddSitesCountTransformer } from './AddSitesCountTransformer';

async function TechnologyTransformerFunc(models: Technology | Technology[]): Promise<Technology | Technology[]> {
  const m = await AddSitesCountTransformer<Technology>(models, 'technology_id');

  return m;
}

export const TechnologyTransformer: TransformerFunction<Technology> = TechnologyTransformerFunc;
