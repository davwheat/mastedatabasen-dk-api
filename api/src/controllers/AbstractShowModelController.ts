import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { InvalidParameterError } from '../errors/InvalidParameterError';

import { ModelNotFoundError } from '../errors/ModelNotFoundError';
import { AbstractPresentController } from './AbstractPresentController';

export interface IListModelControllerPagingParams {
  limit: number;
  offset: number;
}

export abstract class AbstractShowModelController<
  M extends Model<InferAttributes<M>, InferCreationAttributes<M>>
> extends AbstractPresentController<M> {
  protected readonly maxLimit: number = 20;

  protected async data(): Promise<M | M[] | void> {
    const id = parseInt(this.request.params.id);

    if (isNaN(id)) {
      this.next(new InvalidParameterError('`id` must be an integer.', 'id'));
      return;
    }

    if (id < 1) {
      this.next(new InvalidParameterError('`id` must be greater than 0.', 'id'));
      return;
    }

    const op = await this.model.findByPk(id);

    if (!op) {
      this.next(new ModelNotFoundError(`No model found with id ${id}`, this.modelName));
      return;
    }

    return op;
  }
}
