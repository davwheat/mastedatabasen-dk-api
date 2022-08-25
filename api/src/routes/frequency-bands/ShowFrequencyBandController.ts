import { FrequencyBand } from '../../models';
import { InvalidParameterError } from '../../errors/InvalidParameterError';
import { ModelNotFoundError } from '../../errors/ModelNotFoundError';

import type * as Express from 'express';
import { FrequencyBandSerializer } from '../../serializer/FrequencyBandSerializer';

export async function ShowFrequencyBandController(req: Express.Request<{ id: string }>, res: Express.Response, next: Express.NextFunction) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    next(new InvalidParameterError('`id` must be an integer.', 'id'));
    return;
  }

  if (id < 1) {
    next(new InvalidParameterError('`id` must be greater than 0.', 'id'));
    return;
  }

  const model = await FrequencyBand.findByPk(id);

  if (!model) {
    next(new ModelNotFoundError(`No FrequencyBand found with id ${id}`, 'FrequencyBand'));
    return;
  }

  res.send(await FrequencyBandSerializer.serialize(model.toJSON(), { relators: [] }));
}
