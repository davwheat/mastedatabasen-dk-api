import { InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';
import { Site } from '../models';

export async function AddSitesCountTransformer<M extends Model<InferAttributes<M>, InferCreationAttributes<M>>>(
  models: M | M[],
  foreignKeyAttribute: string
): Promise<M | M[]> {
  const m = Array.isArray(models) ? models : [models];

  const allModelIds = m.reduce((acc, curr, i) => {
    acc[(curr as any).id] = i;
    return acc;
  }, {} as Record<number, number>);

  const sites = await Site.findAll({
    attributes: [foreignKeyAttribute, [Sequelize.fn('COUNT', '*'), 'sitesCount']],
    where: {
      [foreignKeyAttribute]: Object.keys(allModelIds),
    },
    group: foreignKeyAttribute,
  });

  sites.forEach((site) => {
    m[allModelIds[site.get(foreignKeyAttribute) as number]].set('sitesCount' as any, site.get('sitesCount') as number);
  });

  m.forEach((m) => {
    if (!m.get('sitesCount')) m.set('sitesCount' as any, 0);
  });

  return Array.isArray(models) ? m : m[0];
}
