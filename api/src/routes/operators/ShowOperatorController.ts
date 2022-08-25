import { Operator } from '../../models';
import { OperatorSerializer } from '../../serializer/OperatorSerializer';
import { InvalidParameterError } from '../../errors/InvalidParameterError';
import { ModelNotFoundError } from '../../errors/ModelNotFoundError';

import type * as Express from 'express';

export async function ShowOperatorController(req: Express.Request<{ id: string }>, res: Express.Response, next: Express.NextFunction) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    next(new InvalidParameterError('`id` must be an integer.', 'id'));
    return;
  }

  if (id < 1) {
    next(new InvalidParameterError('`id` must be greater than 0.', 'id'));
    return;
  }

  const op = await Operator.findByPk(id);

  if (!op) {
    next(new ModelNotFoundError(`No Operator found with id ${id}`, 'Operator'));
    return;
  }

  res.send(await OperatorSerializer.serialize(op.toJSON(), { relators: [] }));
}
