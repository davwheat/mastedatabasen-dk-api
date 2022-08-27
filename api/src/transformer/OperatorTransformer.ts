import { Sequelize } from 'sequelize';
import { TransformerFunction } from '.';
import { Operator, Site } from '../models';
import { AddSitesCountTransformer } from './AddSitesCountTransformer';

async function OperatorTransformerFunc(models: Operator | Operator[]): Promise<Operator | Operator[]> {
  const m = await AddSitesCountTransformer<Operator>(models, 'operator_id');

  return m;
}

export const OperatorTransformer: TransformerFunction<Operator> = OperatorTransformerFunc;
