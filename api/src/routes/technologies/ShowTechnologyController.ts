import { Technology } from '../../models';
import { InvalidParameterError } from '../../errors/InvalidParameterError';
import { ModelNotFoundError } from '../../errors/ModelNotFoundError';
import { TechnologySerializer } from '../../serializer/TechnologySerializer';

import type * as Express from 'express';

export async function ShowTechnologyController(req: Express.Request<{ id: string }>, res: Express.Response, next: Express.NextFunction) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    next(new InvalidParameterError('`id` must be an integer.', 'id'));
    return;
  }

  if (id < 1) {
    next(new InvalidParameterError('`id` must be greater than 0.', 'id'));
    return;
  }

  const model = await Technology.findByPk(id);

  if (!model) {
    next(new ModelNotFoundError(`No Technology found with id ${id}`, 'Technology'));
    return;
  }

  res.send(await TechnologySerializer.serialize(model.toJSON(), { relators: [] }));
}
