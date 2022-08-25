import { ServiceType } from '../../models';
import { InvalidParameterError } from '../../errors/InvalidParameterError';
import { ModelNotFoundError } from '../../errors/ModelNotFoundError';
import { ServiceTypeSerializer } from '../../serializer/ServiceTypeSerializer';

import type * as Express from 'express';

export async function ShowServiceTypeController(req: Express.Request<{ id: string }>, res: Express.Response, next: Express.NextFunction) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    next(new InvalidParameterError('`id` must be an integer.', 'id'));
    return;
  }

  if (id < 1) {
    next(new InvalidParameterError('`id` must be greater than 0.', 'id'));
    return;
  }

  const model = await ServiceType.findByPk(id);

  if (!model) {
    next(new ModelNotFoundError(`No ServiceType found with id ${id}`, 'ServiceType'));
    return;
  }

  res.send(await ServiceTypeSerializer.serialize(model.toJSON(), { relators: [] }));
}
