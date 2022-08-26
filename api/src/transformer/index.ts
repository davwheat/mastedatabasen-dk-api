import { InferAttributes, InferCreationAttributes, Model } from 'sequelize/types';

type AsyncIdentityFunction<M> = (m: M) => Promise<M>;
export type TransformerFunction<M extends Model<InferAttributes<M>, InferCreationAttributes<M>>> = AsyncIdentityFunction<M | M[]>;

export * from './FrequencyBandTransformer';
export * from './OperatorTransformer';
export * from './ServiceTypeTransformer';
export * from './TechnologyTransformer';
